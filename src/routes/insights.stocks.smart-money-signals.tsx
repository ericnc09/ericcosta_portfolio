import { createFileRoute, Link } from "@tanstack/react-router";
import { FINALYSE_DEMO_URL as DEMO_URL, SITE } from "@/lib/site";
import { ArrowRight, CalendarDays, FileSearch, Layers, ShieldCheck } from "lucide-react";

const REPOSITORY_URL = "https://github.com/ericnc09/financial-planner";
const AUDIT_URL = REPOSITORY_URL + "/blob/main/reports/model_status_report.json";
const primaryAction =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium bg-black text-white hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4";

export const Route = createFileRoute("/insights/stocks/smart-money-signals")({
  head: () => ({
    meta: [
      { title: "finAlyse: Explainable Equity Research · Eric Costa" },
      {
        name: "description",
        content:
          "A fintech product case study by Eric Costa: explore public trading disclosures, supporting evidence, and the limits of experimental models in a historical research demo.",
      },
      { property: "og:title", content: "finAlyse: Explainable Equity Research" },
      {
        property: "og:description",
        content:
          "From public disclosures to inspectable research. Explore the historical demo and the product decisions behind it.",
      },
    ],
  }),
  component: SmartMoneySignals,
});

const decisions = [
  {
    icon: FileSearch,
    title: "Put evidence beside the output.",
    body: "Show the actor, transaction date, disclosure date, and available source. A reader should be able to trace what happened and when the information became available.",
    tradeoff:
      "More context to read; summaries and expandable details keep the first step approachable.",
  },
  {
    icon: ShieldCheck,
    title: "Explain what a model cannot tell you.",
    body: "Label experimental outputs and missing data. Model coverage describes how much analysis is available; it does not establish the probability that an investment will succeed.",
    tradeoff: "Less apparent certainty; a clearer basis for interpreting the research.",
  },
  {
    icon: CalendarDays,
    title: "Make the first visit dependable.",
    body: "Bundle reviewed historical data with the interface. Visitors can explore without a login, a running pipeline, or a market-data provider responding in real time.",
    tradeoff:
      "An explicitly dated snapshot; fresh data and custom analysis are deferred until a user need justifies them.",
  },
];

function SmartMoneySignals() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fcfcfc] text-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-black focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <nav
        aria-label="finAlyse navigation"
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 min-h-16 py-3 flex items-center justify-between gap-4">
          <Link
            to="/"
            aria-label="Eric Costa portfolio"
            className="font-serif font-bold text-xl tracking-tight"
          >
            finAlyse.
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#workflow" className="hover:text-gray-900">
              Workflow
            </a>
            <a href="#decisions" className="hover:text-gray-900">
              Decisions
            </a>
            <a href="#evidence" className="hover:text-gray-900">
              Evidence
            </a>
            <Link to="/" className="hover:text-gray-900">
              Portfolio
            </Link>
          </div>
          <a href={DEMO_URL} className={primaryAction + " !px-4 !py-2 text-sm"}>
            Demo setup <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <main id="main-content" className="flex-grow">
        <section className="pt-24 md:pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium border border-gray-200 bg-gray-100 text-gray-700">
            Historical research prototype
          </span>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Equity research, with the{" "}
            <span className="italic text-gray-600">evidence in view.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore public trading disclosures, supporting context, and the limits of experimental
            models. A product case study by Eric Costa.
          </p>
          <p className="mt-5 text-sm text-gray-500">
            Historical demo · Data through June 22, 2026 · Run locally without API keys
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={DEMO_URL} className={primaryAction + " w-full sm:w-auto"}>
              Run the demo locally <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </a>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg px-6 py-3 font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
            >
              Explore the code
            </a>
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-left border-t border-gray-200 pt-8 max-w-3xl mx-auto">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">Role</p>
              <p className="mt-2 text-sm font-medium">Independent project owner</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">Focus</p>
              <p className="mt-2 text-sm font-medium">Scope, evidence, and research UX</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">Next milestone</p>
              <p className="mt-2 text-sm font-medium">Task-based usability research</p>
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="scroll-mt-24 py-20 md:py-24 px-6 max-w-7xl mx-auto border-t border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
                The product question
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                What should a disclosure help someone understand?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                A reported trade is a starting point for research. I am testing whether bringing its
                timing, sources, and available analysis together helps a reader form a
                better-informed question.
              </p>
              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-semibold">Audience hypothesis</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Self-directed investors who already research individual stocks and want to
                  interpret public trading disclosures.
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  This audience and need have not yet been validated through user research.
                </p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-7 md:p-10 text-white shadow-xl">
              <p className="text-xs uppercase tracking-widest text-gray-400">
                Explore in three minutes
              </p>
              <h3 className="font-serif text-3xl mt-3 mb-8">Follow the evidence.</h3>
              <ol className="space-y-7">
                {[
                  [
                    "Find a disclosure",
                    "Filter the historical examples and open an event that interests you.",
                  ],
                  [
                    "Inspect its context",
                    "Read the original dates, available source, and research outputs for that ticker.",
                  ],
                  [
                    "Identify the open questions",
                    "Check coverage and limitations before deciding what to research next.",
                  ],
                ].map(([title, description], index) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-gray-600 text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold">{title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-400">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href={DEMO_URL}
                className="mt-9 inline-flex items-center gap-2 font-medium underline underline-offset-4"
              >
                View local setup instructions <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="decisions"
          className="scroll-mt-24 py-20 md:py-24 px-6 bg-gray-50 border-y border-gray-200"
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
                MVP decisions
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                A focused journey, with explicit tradeoffs.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The repository spans ingestion, modeling, an API, and a dashboard. For the public
                demo, I narrowed that breadth to one complete research task.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {decisions.map((decision) => (
                <article
                  key={decision.title}
                  className="rounded-xl border border-gray-200 bg-white p-7"
                >
                  <decision.icon aria-hidden="true" className="h-6 w-6 mb-6" />
                  <h3 className="font-serif text-2xl font-bold">{decision.title}</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">{decision.body}</p>
                  <p className="mt-6 pt-5 border-t border-gray-100 text-sm text-gray-500 leading-relaxed">
                    <span className="font-semibold text-gray-700">Tradeoff: </span>
                    {decision.tradeoff}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="evidence" className="scroll-mt-24 py-20 md:py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
                Evidence and limits
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Separate what works from what is still unproven.
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                The saved research audit makes incomplete coverage visible. Its June 22, 2026 report
                covers the full research database; the demo uses a selected subset chosen for data
                coverage.
              </p>
              <div className="grid grid-cols-2 gap-5 mt-8">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="font-serif text-4xl font-bold">202</p>
                  <p className="mt-2 text-sm text-gray-600">Events in the saved audit</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="font-serif text-4xl font-bold">3 of 7</p>
                  <p className="mt-2 text-sm text-gray-600">Reported validation gates passing</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-gray-500 leading-relaxed">
                XGBoost is untrained in that report. Historical evaluation has unresolved
                methodology issues. These figures describe research status and do not establish
                investment effectiveness.
              </p>
              <a
                href={AUDIT_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-medium underline underline-offset-4"
              >
                Inspect the dated audit <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-7 md:p-9">
              <Layers aria-hidden="true" className="h-6 w-6 mb-5" />
              <h3 className="font-serif text-2xl font-bold">What this project demonstrates</h3>
              <dl className="mt-6 divide-y divide-gray-100">
                <div className="py-4">
                  <dt className="font-semibold">Working implementation</dt>
                  <dd className="mt-2 text-gray-600">
                    A data pipeline, research code, and an interactive historical demo.
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="font-semibold">Product judgment</dt>
                  <dd className="mt-2 text-gray-600">
                    A bounded MVP, inspectable evidence, and a delivery approach built around the
                    first visitor experience.
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="font-semibold">Still to measure</dt>
                  <dd className="mt-2 text-gray-600">
                    Usability, repeat use, demand, and whether the proposed audience finds the
                    workflow useful.
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-sm text-gray-500 leading-relaxed">
                Independent project by Eric Costa. The September 2026 review and demo implementation
                use Codex assistance. No user or investment outcome is claimed here.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
              Next experiment
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Can a reader explain the evidence and its limits?
            </h2>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              The next step is five to eight task-based sessions with people who research individual
              equities. Ask each person to explain a disclosure, when it became available, and what
              they would need to check next.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold">Task completion</h3>
                <p className="mt-2 text-gray-400">
                  Can they identify the actor, direction, timing, and source without help?
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Time to evidence</h3>
                <p className="mt-2 text-gray-400">
                  Where does finding a sourced explanation become difficult?
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Understanding uncertainty</h3>
                <p className="mt-2 text-gray-400">
                  Can they distinguish model coverage from a prediction of success?
                </p>
              </div>
            </div>
            <p className="mt-8 text-sm text-gray-400">
              Proposed measures; sessions and results are not yet available.
            </p>
            <a
              href={DEMO_URL}
              className="inline-flex mt-9 items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium bg-white text-gray-900 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-gray-900"
            >
              Run the demo locally <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section aria-labelledby="live-disclosures" className="py-20 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
              Live companion
            </p>
            <h2 id="live-disclosures" className="font-serif text-3xl md:text-4xl font-bold">
              See today's disclosures in finAlyse.
            </h2>
            <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
              A daily compilation of open-market insider trades from recent SEC filings, with the
              filing dates and sources beside each trade.
            </p>
            <Link
              to="/finalyse"
              className="group mt-10 flex w-full items-center justify-between gap-6 rounded-2xl bg-black px-7 py-8 md:px-10 md:py-10 text-white shadow-xl transition-all hover:bg-gray-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
            >
              <span className="text-left">
                <span className="block font-serif text-2xl md:text-4xl font-bold">
                  Open finAlyse
                </span>
                <span className="mt-2 block text-sm md:text-base text-gray-300">
                  Browse the latest insider trade disclosures
                </span>
              </span>
              <span className="flex h-12 w-12 md:h-16 md:w-16 flex-shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">
                <ArrowRight aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7" />
              </span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-serif font-bold text-xl tracking-tight">finAlyse.</p>
            <p className="mt-2 text-xs text-gray-500">
              Historical research prototype. Not investment advice.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900">
              Portfolio
            </Link>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900"
            >
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900"
            >
              LinkedIn
            </a>
            <a href={"mailto:" + SITE.email} className="hover:text-gray-900">
              Contact
            </a>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Eric Costa.</p>
        </div>
      </footer>
    </div>
  );
}
