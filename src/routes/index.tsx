import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SITE, WORKS, POSTS, HIGHLIGHTS } from "@/lib/site";
import { MetricStat, Pill, SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eric Costa · Technical Product Manager · Telecom & AI" },
      {
        name: "description",
        content:
          "PM at Rogers shipping AI products in a regulated telecom. Eras Tour, TTC 5G, MOCN decoupling, 3GPP RAG. $35M portfolio.",
      },
      { property: "og:title", content: "Eric Costa, Product Manager" },
      {
        property: "og:description",
        content:
          "Technical PM in Canadian telecom: authored a $35.6M capital plan, Ted Rogers Award for Innovation, directs AI projects with Claude Code.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid items-center gap-10 md:grid-cols-3 md:gap-12">
          <div className="md:col-span-2">
            <SectionLabel>Technical Product Manager · Toronto</SectionLabel>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Technical product manager for Canadian telecom infrastructure.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
              I authored Rogers' proposed $35.6M annual in-building capital plan and direct AI
              projects with Claude Code. Product manager for the in-building portfolio since 2024
              (functional role; official title Sr Network Designer), after four years as an RF
              Designer.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
              >
                See selected work
              </a>
              <Link
                to="/about"
                className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                About me
              </Link>
            </div>
          </div>
          <div className="md:col-span-1">
            <img
              src={SITE.headshot}
              alt="Portrait of Eric Costa"
              className="mx-auto aspect-[4/5] w-full max-w-[260px] rounded-lg border border-border object-cover md:max-w-none"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Metric strip */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-3 lg:grid-cols-6">
          <MetricStat value="$35.6M" label="Capital plan authored" />
          <MetricStat value="7.4 TB" label="Single-event record" />
          <MetricStat value="256" label="Under-seat units" />
          <MetricStat value="$8M" label="Venue upgrade planned" />
          <MetricStat value="~$50M" label="Requests prioritized" />
          <MetricStat value="2023" label="Ted Rogers Award" />
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>Selected work</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Strategy meets shipping.</h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            A startup, AI products, telecom hardware, 5G transit, cross-carrier programs, and ML
            side builds.
          </p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {WORKS.map((w) => {
            // insights-stocks links to its dedicated finAlyse microsite; the rest use the case-study route.
            const isFinalyse = w.slug === "insights-stocks";
            const wide = isFinalyse || w.slug === "football-intelligently";
            const className = `group flex flex-col justify-between gap-8 bg-background p-8 transition-colors hover:bg-secondary/50 ${
              wide ? "md:col-span-2" : ""
            }`;
            const inner = (
              <>
                <div>
                  <Pill>{w.kicker}</Pill>
                  <h3 className="mt-5 font-serif text-2xl">{w.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{w.summary}</p>
                </div>
                <div className="flex items-end justify-between border-t border-border pt-5">
                  <div>
                    <p className="font-serif text-2xl tnum">{w.metric}</p>
                    <p className="text-xs text-muted-foreground">{w.sub}</p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-[var(--accent-blue)]">
                    Read →
                  </span>
                </div>
              </>
            );

            return isFinalyse ? (
              <Link key={w.slug} to="/insights/stocks/smart-money-signals" className={className}>
                {inner}
              </Link>
            ) : (
              <Link key={w.slug} to="/work/$slug" params={{ slug: w.slug }} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Career Highlights */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionLabel>Career highlights</SectionLabel>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Six years, in highlights.</h2>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {HIGHLIGHTS.map((h, i) => (
              <div key={h.title} className="flex gap-5 border-t border-border pt-6">
                <span className="font-serif text-2xl tnum text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-xl">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PM Gap */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionLabel>The PM gap, addressed</SectionLabel>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl md:text-4xl">
            I don't have a decade of PM titles. I have product outcomes you can verify.
          </h2>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            My job at Rogers is prioritization and capital planning for the in-building portfolio. Outside the office, I ship the things I'd otherwise
            pitch in a case interview.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                t: "Strategy & prioritization",
                d: "Prioritization framework and the proposed $35.6M annual capital plan from about $50M in requests. Examples: about $3M of hospital builds for a BC health authority tied to about $10M a year of existing revenue; a $400K system for a Canadian bank backed by $700K a year over 10 years.",
              },
              {
                t: "AI projects, directed with Claude Code",
                d: "Telecom Standards Assistant (3GPP RAG): a public demo with a retrieval evaluation set and 42 security fixes before release.",
              },
              {
                t: "0→1 builder",
                d: "finAlyse (several models run together on public trading disclosures), Football Intelligently (graph neural network on open StatsBomb data), Madrid Betar (fan-media platform co-founded with friends, with a paid Prime tier).",
              },
            ].map((c) => (
              <div key={c.t}>
                <h3 className="font-serif text-xl">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionLabel>Writing</SectionLabel>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">Notes from building.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {POSTS.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block border-t border-border pt-5"
            >
              <h3 className="font-serif text-lg leading-snug group-hover:text-[var(--accent-blue)]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.blurb}</p>
              <span className="mt-4 inline-block text-xs uppercase tracking-widest text-muted-foreground">
                Substack →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-2xl font-serif text-3xl md:text-4xl">
            Hiring a PM who already ships? Let's talk.
          </h2>
          <Link
            to="/contact"
            className="rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: SITE.name,
            jobTitle: "Product Manager",
            worksFor: { "@type": "Organization", name: "Rogers Communications" },
            url: "https://ericcosta.com",
            sameAs: [SITE.linkedin, SITE.github, SITE.substack],
          }),
        }}
      />
    </div>
  );
}
