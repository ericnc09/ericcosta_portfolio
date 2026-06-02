import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { SectionLabel, Pill } from "@/components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Eric Costa" },
      {
        name: "description",
        content:
          "PM at Rogers, MSc in CS (AI/Data Science), Ted Rogers Award winner, AI builder shipping production RAG systems.",
      },
      { property: "og:title", content: "About Eric Costa" },
      {
        property: "og:description",
        content: "From RF engineer to PM at Rogers, with AI products shipped on the side.",
      },
    ],
  }),
  component: About,
});

const SKILLS = [
  "Product Strategy",
  "Prioritization & Capital Allocation",
  "RAG / LLM Systems",
  "Prompt Engineering",
  "A/B Testing",
  "User Research",
  "PostHog",
  "Python",
  "SQL",
  "Databricks",
  "Telecom (3GPP, DAS, MOCN/MORAN)",
  "Cross-carrier program management",
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionLabel>About</SectionLabel>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] md:text-6xl">
        Engineer who learned to ship product the way good PMs do.
      </h1>

      <div className="mt-16 grid gap-12 md:grid-cols-[280px_1fr]">
        <div>
          <img
            src={SITE.headshot}
            alt="Portrait of Eric Costa"
            className="w-full rounded-lg border border-border object-cover"
          />
          <div className="mt-6 space-y-2 text-sm">
            <p className="text-muted-foreground">Based in</p>
            <p>Toronto, Canada · TN-visa eligible</p>
            <p className="mt-3 text-muted-foreground">Currently</p>
            <p>Product Manager, Rogers Communications</p>
            <p className="mt-3 text-muted-foreground">Education</p>
            <p>MSc Computer Science (AI & Data Science), York University</p>
          </div>
        </div>

        <div className="space-y-6 text-[15px] leading-relaxed text-foreground/85">
          <p>
            I started as an RF engineer at Rogers, planning radios and DAS for buildings most people
            never look up at. Six years later I'm a Product Manager owning Rogers' Canada-wide
            in-building portfolio, roughly <strong>$35M a year</strong>, with a zero-rollover
            constraint and steering committees that don't take "trust me" for an answer.
          </p>
          <p>
            Along the way I built a five-layer prioritization matrix to defend the line items, led
            the cross-carrier MOCN integration that delivered TTC 5G ahead of a federal deadline
            (and won the <strong>Ted Rogers Award for Innovation in 5G</strong>, 2024), and ran the
            first under-seat DOT deployment in Canada for Taylor Swift's Eras Tour at Rogers Centre
            and BC Place. The Toronto night set a single-event data record on Rogers' network:{" "}
            <strong>7.4 TB</strong>.
          </p>

          <div className="rounded-lg border border-border bg-secondary/50 p-6">
            <SectionLabel>On the "no PM on paper" question</SectionLabel>
            <p className="mt-3 text-foreground/85">
              I get it. I don't have a decade of Senior PM titles. What I do have: a current PM role
              with measurable scope, one production AI system I designed and shipped end-to-end
              (with user interviews, success metrics, A/B testing, and two security audits), and
              three side products that exist in the wild, including one with 30K monthly active
              users and a paid tier. If the bar is "would I build this here from day one," the work
              answers yes.
            </p>
          </div>

          <p>
            Outside Rogers I built the <strong>Telecom Standards Assistant (3GPP RAG)</strong> (37
            specs, 43,121 chunks, 100% context precision, deployed publicly after two security
            hardening rounds), <strong>Insights Stocks</strong> (9 quant models with
            Benjamini-Hochberg FDR control and a Granger causality gate, pushing trade signals to
            Slack), and <strong>Football Intelligently</strong> (a GATv2 graph neural network on
            StatsBomb 360 freeze frames that hits 95.7% of StatsBomb's proprietary xG performance
            using only open data).
          </p>
          <p>
            I have an MSc in Computer Science from York (AI & Data Science, full-ride scholarship),
            two peer-reviewed publications, and a Substack where I write bi-weekly about building AI
            products in the real world. Before Rogers I was a cyber-security analyst at EY in EMEIA,
            managing CyberArk and QRadar across 1,500 servers.
          </p>

          <div className="pt-4">
            <SectionLabel>Skills</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Link
              to="/contact"
              className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
            >
              Get in touch
            </Link>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
