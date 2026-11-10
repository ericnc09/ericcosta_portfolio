import process from "node:process";

// Free-tier model router for the Ask AI chat.
//
// Every provider below accepts an OpenAI-style chat completion request, so one
// fetch client covers all of them. A question goes to the first provider in the
// list; on a rate limit, error, empty answer or timeout it moves to the next.
//
// Config (all optional, read per request because Cloudflare binds env then):
//   <ID>_API_KEY         provider is skipped when its key is missing
//   <ID>_MODEL           override the default model id
//   ASK_PROVIDER_ORDER   comma list, e.g. "gemini,groq" (reorders and disables)

export type ChatTurn = { role: "user" | "assistant"; content: string };

type Provider = {
  id: string;
  label: string;
  url: string;
  keyEnv: string;
  modelEnv: string;
  defaultModel: string;
  extra?: Record<string, unknown>;
};

// Model ids checked against each provider's model list on 2026-11-10.
const PROVIDERS: Provider[] = [
  {
    id: "groq",
    label: "Groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    keyEnv: "GROQ_API_KEY",
    modelEnv: "GROQ_MODEL",
    defaultModel: "openai/gpt-oss-120b",
    extra: { reasoning_effort: "low" },
  },
  {
    id: "gemini",
    label: "Gemini",
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    keyEnv: "GEMINI_API_KEY",
    modelEnv: "GEMINI_MODEL",
    defaultModel: "gemini-3.5-flash-lite",
  },
  {
    id: "cerebras",
    label: "Cerebras",
    url: "https://api.cerebras.ai/v1/chat/completions",
    keyEnv: "CEREBRAS_API_KEY",
    modelEnv: "CEREBRAS_MODEL",
    defaultModel: "gpt-oss-120b",
    extra: { reasoning_effort: "low" },
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    keyEnv: "OPENROUTER_API_KEY",
    modelEnv: "OPENROUTER_MODEL",
    defaultModel: "google/gemma-4-31b-it:free",
  },
];

const TIMEOUT_MS = 8000;
const MAX_TOKENS = 700;

type ActiveProvider = Provider & { key: string; model: string };

function activeProviders(): ActiveProvider[] {
  const env = process.env;
  const order = (env.ASK_PROVIDER_ORDER ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const listed = order.length
    ? order.flatMap((id) => PROVIDERS.filter((p) => p.id === id))
    : PROVIDERS;

  return listed.flatMap((p) => {
    const key = env[p.keyEnv];
    return key ? [{ ...p, key, model: env[p.modelEnv] || p.defaultModel }] : [];
  });
}

async function askProvider(p: ActiveProvider, system: string, turns: ChatTurn[]) {
  const res = await fetch(p.url, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${p.key}` },
    body: JSON.stringify({
      model: p.model,
      messages: [{ role: "system", content: system }, ...turns],
      max_tokens: MAX_TOKENS,
      temperature: 0.3,
      ...p.extra,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const data = (await res.json()) as { choices?: { message?: { content?: unknown } }[] };
  const content = data.choices?.[0]?.message?.content;
  const text = typeof content === "string" ? content.trim() : "";
  if (!text) throw new Error("empty answer");
  return text;
}

// `code` is a short, non-sensitive summary that is safe to return to the client.
export type Attempt = { provider: string; error: string; code: string; ms: number };

function failureCode(error: unknown) {
  const text = String(error);
  const status = text.match(/HTTP (\d{3})/)?.[1];
  if (status) return `http_${status}`;
  if (/Timeout|AbortError/i.test(text)) return "timeout";
  if (/empty answer/.test(text)) return "empty";
  return "error";
}
export type RouteResult =
  | { ok: true; text: string; via: string; attempts: Attempt[] }
  | { ok: false; attempts: Attempt[] };

export async function routeChat(system: string, turns: ChatTurn[]): Promise<RouteResult> {
  const attempts: Attempt[] = [];
  for (const provider of activeProviders()) {
    const started = Date.now();
    try {
      const text = await askProvider(provider, system, turns);
      console.log(
        `[ask] answered by ${provider.id} in ${Date.now() - started}ms` +
          (attempts.length ? `; failed first: ${attempts.map((a) => a.provider).join(", ")}` : ""),
      );
      return { ok: true, text, via: provider.label, attempts };
    } catch (error) {
      attempts.push({
        provider: provider.id,
        error: String(error),
        code: failureCode(error),
        ms: Date.now() - started,
      });
    }
  }
  console.error(
    attempts.length
      ? `[ask] all providers failed: ${JSON.stringify(attempts)}`
      : "[ask] no provider API keys configured",
  );
  return { ok: false, attempts };
}
