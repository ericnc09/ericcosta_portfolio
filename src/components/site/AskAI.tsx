import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, CornerDownLeft, RotateCcw, Sparkles, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { SITE } from "@/lib/site";

const SUGGESTED: { label: string; questions: { q: string; hint: string }[] }[] = [
  {
    label: "Who is Eric",
    questions: [
      { q: "Walk me through your career", hint: "RF engineer to PM" },
      { q: "What do you own at Rogers today?", hint: "$35M portfolio" },
      { q: "What is your technical background?", hint: "MSc in AI" },
      { q: "What do you write about?", hint: "Substack" },
    ],
  },
  {
    label: "The work",
    questions: [
      { q: "What AI products have you shipped?", hint: "RAG, finAlyse, GNN" },
      { q: "How did you bring 5G to the Toronto subway?", hint: "Ted Rogers Award" },
      { q: "What was the Taylor Swift Eras Tour project?", hint: "7.4 TB in a night" },
      { q: "Tell me about Madrid Betar", hint: "0 to 30K MAU" },
    ],
  },
  {
    label: "Working with Eric",
    questions: [
      { q: "What kind of roles are you looking for?", hint: "AI product" },
      { q: "How do you decide what to build?", hint: "Prioritization" },
      { q: "Where are you based, and can you work in the US?", hint: "Toronto · TN" },
      { q: "What is the best way to reach you?", hint: "Email" },
    ],
  },
];

const MAX_CHARS = 1000;

type Message =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string; via: string }
  | { role: "error"; kind: "unavailable" | "rate_limited" };

function track(event: string, props?: Record<string, unknown>) {
  const ph = (
    globalThis as { posthog?: { capture?: (e: string, p?: Record<string, unknown>) => void } }
  ).posthog;
  if (ph && typeof ph.capture === "function") ph.capture(event, props);
}

export function AskAI() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) track("ask_ai_opened");
  }, [open]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const ask = useCallback(
    async (question: string) => {
      const content = question.trim().slice(0, MAX_CHARS);
      if (!content || pending) return;

      const next: Message[] = [...messages, { role: "user", content }];
      setMessages(next);
      setInput("");
      setPending(true);

      let reply: Message = { role: "error", kind: "unavailable" };
      try {
        // Drop error rows and any user question that never got an answer, so
        // the history sent to the model alternates cleanly.
        const history = next
          .filter(
            (m, i) => m.role !== "error" && !(m.role === "user" && next[i + 1]?.role === "error"),
          )
          .map((m) => ({ role: m.role, content: (m as { content: string }).content }));
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });
        if (res.ok) {
          const data = (await res.json()) as { text: string; via: string };
          reply = { role: "assistant", content: data.text, via: data.via };
        } else if (res.status === 429) {
          reply = { role: "error", kind: "rate_limited" };
        }
      } catch {
        // network failure: keep the "unavailable" reply
      }
      track("ask_ai_answered", {
        ok: reply.role === "assistant",
        via: reply.role === "assistant" ? reply.via : null,
      });
      setMessages([...next, reply]);
      setPending(false);
      inputRef.current?.focus();
    },
    [messages, pending],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  const started = messages.length > 0;
  const current = SUGGESTED[category];
  const page = (delta: number) =>
    setCategory((c) => (c + delta + SUGGESTED.length) % SUGGESTED.length);

  // With an empty input on the suggestions screen, 1-4 pick a question and
  // the arrow keys page through categories.
  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (started || input) return;
    const picked = current.questions[Number(e.key) - 1];
    if (picked) {
      e.preventDefault();
      void ask(picked.q);
    } else if (e.key === "ArrowLeft") page(-1);
    else if (e.key === "ArrowRight") page(1);
  };

  const iconButton =
    "grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-blue" aria-hidden />
          Ask AI
          <kbd className="hidden rounded border border-border bg-secondary px-1 font-sans text-[10px] text-muted-foreground md:inline">
            {isMac ? "⌘K" : "Ctrl K"}
          </kbd>
        </button>
      </DialogPrimitive.Trigger>

      <DialogPortal>
        <DialogOverlay className="bg-black/40 backdrop-blur-[2px]" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-x-3 top-[8vh] z-50 mx-auto flex h-[min(34rem,84vh)] max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl duration-200 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="flex items-center justify-between border-b border-border py-3 pl-5 pr-3">
            <DialogPrimitive.Title className="font-serif text-xl">
              What are you curious about?
            </DialogPrimitive.Title>
            <div className="flex items-center gap-0.5">
              {started ? (
                <button
                  type="button"
                  className={iconButton}
                  aria-label="Start over"
                  title="Start over"
                  onClick={() => setMessages([])}
                  disabled={pending}
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={iconButton}
                    aria-label="Previous category"
                    onClick={() => page(-1)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className={iconButton}
                    aria-label="Next category"
                    onClick={() => page(1)}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}
              <DialogPrimitive.Close className={iconButton} aria-label="Close Ask AI">
                <X className="h-4 w-4" />
              </DialogPrimitive.Close>
            </div>
          </div>

          <div ref={threadRef} className="flex-1 overflow-y-auto px-5 py-4">
            {!started ? (
              <>
                <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em]">
                  <span className="text-accent-blue">{current.label}</span>
                  <span className="tnum text-muted-foreground">
                    {category + 1} / {SUGGESTED.length}
                  </span>
                </div>
                <ul className="mt-3 space-y-1">
                  {current.questions.map((item, i) => (
                    <li key={item.q}>
                      <button
                        type="button"
                        onClick={() => void ask(item.q)}
                        className="group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-border text-xs tnum text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground">
                          {i + 1}
                        </span>
                        <span className="flex-1 text-[15px]">{item.q}</span>
                        <span className="hidden text-xs text-muted-foreground sm:block">
                          {item.hint}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="space-y-4" aria-live="polite">
                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <div key={i} className="flex justify-end">
                      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2 text-[15px] text-background">
                        {m.content}
                      </p>
                    </div>
                  ) : m.role === "assistant" ? (
                    <div key={i} className="max-w-[92%]">
                      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
                        {m.content}
                      </p>
                      <p className="mt-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                        via {m.via}
                      </p>
                    </div>
                  ) : (
                    <p
                      key={i}
                      className="max-w-[92%] rounded-lg border border-border bg-secondary/60 px-3.5 py-3 text-sm leading-relaxed text-foreground/85"
                    >
                      {m.kind === "rate_limited"
                        ? "That's a lot of questions in a short time. Give it a minute, or reach me directly: "
                        : "The AI is out of free capacity right now, so I can't answer that here. Reach me directly: "}
                      <a className="underline underline-offset-2" href={`mailto:${SITE.email}`}>
                        {SITE.email}
                      </a>{" "}
                      or{" "}
                      <a
                        className="underline underline-offset-2"
                        href={SITE.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>
                      .
                    </p>
                  ),
                )}
                {pending && (
                  <div className="flex gap-1 py-2" role="status" aria-label="Thinking">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-border px-3 pb-2.5 pt-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-4 pr-1 focus-within:ring-2 focus-within:ring-ring">
              <input
                ref={inputRef}
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onInputKey}
                maxLength={MAX_CHARS}
                placeholder="Ask anything about Eric..."
                aria-label="Your question"
                className="h-9 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Send question"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-30"
              >
                <CornerDownLeft className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 px-2 text-[11px] text-muted-foreground">
              Please don't share personal info here. AI answers can be wrong; the case studies are
              the source of truth.
            </p>
          </form>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}
