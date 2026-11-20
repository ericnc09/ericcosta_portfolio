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
          "Technical product manager at Rogers (functional role), MSc in CS (AI/Data Science), Ted Rogers Award for Innovation, directs AI projects with Claude Code.",
      },
      { property: "og:title", content: "About Eric Costa" },
      {
        property: "og:description",
        content:
          "From RF designer to a functional PM role at Rogers, with AI projects on the side.",
      },
    ],
  }),
  component: About,
});

const SKILLS = [
  "Product Strategy",
  "Prioritization & Capital Allocation",
  "RAG / LLM Systems",
  "Business Cases",
  "Acceptance Testing",
  "Claude Code",
  "Python",
  "SQL",
  "Jira",
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
            <p>Toronto, Canada</p>
            <p className="mt-3 text-muted-foreground">Currently</p>
            <p>Product Manager, In-Building Portfolio, Rogers (functional role)</p>
            <p className="mt-3 text-muted-foreground">Education</p>
            <p>MSc Computer Science (AI & Data Science), York University</p>
          </div>
        </div>

        <div className="space-y-6 text-[15px] leading-relaxed text-foreground/85">
          <p>
            I joined Rogers in 2020 as an RF Designer, planning wireless coverage for buildings most
            people never look up at. Since July 2024 I've worked as the product manager for the
            in-building portfolio. I built the prioritization framework and authored the proposed{" "}
            <strong>$35.6M</strong> annual capital plan from about $50M in requests; my manager and
            director approve it.
          </p>
          <p>
            Along the way I was technical prime for Rogers' TTC subway wireless build, handling the
            Bell and Telus connection work and the MOCN connection (it earned the{" "}
            <strong>Ted Rogers Award for Innovation</strong>, Dec 2023). I owned system planning and
            funding for an $8M Rogers Centre 5G upgrade, including 256 under-seat units; the network
            carried a venue-record <strong>7.4 TB</strong> during one Taylor Swift show.
          </p>

          <div className="rounded-lg border border-border bg-secondary/50 p-6">
            <SectionLabel>On the "no PM on paper" question</SectionLabel>
            <p className="mt-3 text-foreground/85">
              My PM role at Rogers is functional; the payroll title is Sr Network Designer. The work
              is product work: a $35.6M capital plan I authored and defended line by line,
              enterprise customers I've met as technical focal point, and network cutovers I signed
              off. Outside work, I direct AI projects with Claude Code.
            </p>
          </div>

          <p>
            Outside Rogers I direct personal AI projects with Claude Code: the{" "}
            <strong>Telecom Standards Assistant (3GPP RAG)</strong>, a public demo that answers
            standards questions with citations; <strong>finAlyse</strong>, which runs several models
            together to analyze public trading disclosures; and{" "}
            <strong>Football Intelligently</strong>, a graph neural network research project on open
            StatsBomb data.
          </p>
          <p>
            I have an MSc in Computer Science from York (AI & Data Science, full-ride scholarship),
            peer-reviewed publications, and a Substack about building AI products. Before Rogers I
            was an analyst at EY in EMEIA, on CyberArk and IBM QRadar implementations.
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
