import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SITE, WORKS, POSTS, HIGHLIGHTS } from "@/lib/site";
import { MetricStat, Pill, SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eric Costa · Product Manager · AI & Telecom" },
      {
        name: "description",
        content:
          "PM at Rogers shipping AI products in a regulated telecom. Eras Tour, TTC 5G, MOCN decoupling, 3GPP RAG. $35M portfolio.",
      },
      { property: "og:title", content: "Eric Costa, Product Manager" },
      {
        property: "og:description",
        content:
          "Data-driven PM. AI products in production, $35M in-building portfolio, Ted Rogers Award.",
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
            <SectionLabel>Product Manager · Toronto</SectionLabel>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              I build AI products, both as an employee and a founder.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
              PM at Rogers Communications. Six years across Canadian telecom delivery, now owning a
              $35M in-building portfolio, one production RAG system, and three product-grade side
              builds.
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
          <MetricStat value="$35M" label="Portfolio owned" />
          <MetricStat value="7.4 TB" label="Single-event record" />
          <MetricStat value="80%" label="RAG retrieval acc." />
          <MetricStat value="+16%" label="911 call accuracy" />
          <MetricStat value="30K" label="MAU built solo" />
          <MetricStat value="2024" label="Ted Rogers Award" />
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
          {WORKS.map((w) => (
            <Link
              key={w.slug}
              to="/work/$slug"
              params={{ slug: w.slug }}
              className="group flex flex-col justify-between gap-8 bg-background p-8 transition-colors hover:bg-secondary/50"
            >
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
            </Link>
          ))}
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
            My job at Rogers is product strategy and prioritization on a $35M portfolio, even when
            the org chart called it RF Planning. Outside the office, I ship the things I'd otherwise
            pitch in a case interview.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                t: "Strategy & prioritization",
                d: "Five-layer capital allocation matrix for Rogers in-building, defended through three steering committees. Wins: BC health authority (~$10M/yr for $3M build), EQ Bank (~$700K/yr over 10 years).",
              },
              {
                t: "Shipping AI in production",
                d: "Telecom Standards Assistant (3GPP RAG): user research, defined accuracy and latency metrics, two security hardening rounds, public deploy. 37 specs, 43,121 chunks, 100% context precision.",
              },
              {
                t: "0→1 builder",
                d: "Insights Stocks (9-model ensemble with FDR control), Football Intelligently (GATv2 on StatsBomb 360, AUC 0.760), Madrid Betar (0 → 30K MAU and a paid Prime tier).",
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
