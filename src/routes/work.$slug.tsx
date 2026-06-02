import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SectionLabel, Pill } from "@/components/site/primitives";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    if (!CASE_STUDIES[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const cs = CASE_STUDIES[params.slug];
    if (!cs) return { meta: [{ title: "Case study not found" }] };
    return {
      meta: [
        { title: `${cs.title} · Eric Costa` },
        { name: "description", content: cs.subtitle },
        { property: "og:title", content: cs.title },
        { property: "og:description", content: cs.subtitle },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl">Case study not found</h1>
      <Link to="/" className="mt-6 inline-block text-[var(--accent-blue)]">
        ← Back to work
      </Link>
    </div>
  ),
  component: WorkPage,
});

function WorkPage() {
  const { slug } = Route.useParams();
  const cs = CASE_STUDIES[slug];
  if (!cs) return null;

  return (
    <article>
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            ← Selected work
          </Link>
          <div className="mt-6">
            <Pill>{cs.kicker}</Pill>
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
            {cs.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{cs.subtitle}</p>

          <dl className="mt-12 grid gap-x-8 gap-y-6 border-y border-border py-8 sm:grid-cols-2 md:grid-cols-4">
            {cs.meta.map((m) => (
              <div key={m.label}>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4">
          {cs.hero.map((h) => (
            <div key={h.label} className="border-l border-border pl-4">
              <p className="font-serif text-3xl tnum">{h.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {h.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-8">{cs.body}</div>

      {cs.links && (
        <div className="mx-auto max-w-4xl px-6 pb-12">
          <SectionLabel>Links</SectionLabel>
          <div className="mt-4 flex flex-wrap gap-3">
            {cs.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary"
              >
                {l.label} →
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-4xl border-t border-border px-6 py-12">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← All work
        </Link>
      </div>
    </article>
  );
}
