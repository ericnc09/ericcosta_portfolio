import type { ReactNode } from "react";
import { CaseSection, Prose } from "@/components/site/primitives";

export type CaseStudy = {
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  hero: { value: string; label: string }[];
  body: ReactNode;
  links?: { label: string; href: string }[];
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "3gpp-rag": {
    slug: "3gpp-rag",
    kicker: "AI · 0 → 1 · Production",
    title: "Telecom Standards Assistant: 3GPP RAG",
    subtitle:
      "A retrieval assistant that turns hours of manual spec hunting into seconds, grounding every answer in the source text with a citation. 37 specs, 43,121 chunks, runs fully local at zero cost per query.",
    meta: [
      { label: "Role", value: "Product + Builder" },
      { label: "Timeline", value: "3-week sprint, then multi-spec phases" },
      { label: "Stack", value: "Python · ChromaDB · Ollama · FastAPI · Streamlit" },
      { label: "Outcome", value: "37 specs, 43,121 chunks, public demo" },
    ],
    hero: [
      { value: "37", label: "Specs indexed" },
      { value: "43,121", label: "Chunks indexed" },
      { value: "100%", label: "Context precision" },
      { value: "$0", label: "Cost per query" },
    ],
    body: (
      <>
        <CaseSection label="Challenge" title="Engineers were losing hours to spec hunts.">
          <Prose>
            <p>
              During 5G deployments at Rogers, I watched engineers spend hours searching dense 3GPP
              specifications to answer basic architecture questions. A single query could mean
              skimming hundreds of pages across multiple documents (TS 38.300 plus 38.401 plus
              23.501), all written for compliance rather than for reading. Keyword search in PDFs
              has low recall on conceptual questions, and generic web search returns outdated blog
              posts.
            </p>
            <p>
              I wanted a conversational interface that grounded every answer in the spec text
              itself, with citations, so an engineer could trust it inside a time-sensitive change
              window.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Research" title="RAG over fine-tuning, and the right small model.">
          <Prose>
            <p>
              I chose retrieval-augmented generation over fine-tuning for three reasons: specs
              change every 3GPP release cycle (RAG re-indexes instantly), no labelled 3GPP Q&A pairs
              exist publicly, and standards work demands citations and traceability.
            </p>
            <p>
              I benchmarked embedding models and selected <strong>BAAI bge-small-en-v1.5</strong>{" "}
              for the best accuracy-to-size ratio on technical text, with bge-base available for
              maximum accuracy. Chunking is sentence-boundary aware at 1,000 characters with
              200-character overlap, plus 3GPP-specific header and footer stripping and table
              extraction. The work is structured around six documented user personas, from core
              telecom engineer to a grad student who cannot afford API subscriptions, each with
              explicit acceptance criteria.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Architecture" title="Local first, modular, citation-driven.">
          <Prose>
            <p>
              The pipeline runs fully local: ChromaDB persists the vector index,
              sentence-transformers generates embeddings, and Ollama serves the LLM (llama3.2 by
              default) with no API keys and zero cost per query. A FastAPI backend exposes query,
              streaming, history, health, catalog, and eval endpoints; a Streamlit UI provides the
              chat surface with domain and generation filters.
            </p>
            <p>
              Every layer is independently testable and swappable, answers stream token by token,
              and metadata (domain, generation, spec number) is stored per chunk so a query can be
              scoped to, say, 5G RAN only. The public Streamlit demo swaps the local model for a
              hosted LLM so anyone can try it in the browser.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Shipping" title="The hardest part wasn't the AI.">
          <Prose>
            <p>
              Between "demo works on my laptop" and "here's a public link" lived a security review
              that surfaced <strong>42 vulnerabilities</strong>: rate-limiting gaps,
              prompt-injection vectors, SSRF, session handling, and missing security headers. Two
              rounds of hardening later, the tool cleared review and shipped to a public URL with a
              legal disclaimer and source-text truncation that respects 3GPP's IP rules. I wrote
              that gap up on Substack.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Results" title="Measured, not vibed.">
          <Prose>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>37 specs, 43,121 chunks</strong> indexed across 5G NR RAN, LTE RAN, 5G Core,
                and LTE Core.
              </li>
              <li>
                <strong>100% context precision</strong>, <strong>80% context recall</strong>, and{" "}
                <strong>50ms p50</strong> retrieve latency on a held-out evaluation set.
              </li>
              <li>
                <strong>152 unit tests</strong>, fully mocked, running without any live services.
              </li>
              <li>
                <strong>$0 cost per query</strong>: the entire pipeline runs locally, deployable via
                Docker Compose.
              </li>
            </ul>
          </Prose>
        </CaseSection>
      </>
    ),
    links: [
      { label: "Live demo", href: "https://3gpp-rag-assistant.streamlit.app" },
      { label: "GitHub", href: "https://github.com/ericnc09/3gpp-rag-assistant" },
      {
        label: "Substack: Building the knowledge base",
        href: "https://ericccosta.substack.com/p/building-my-first-intelligent-knowledge",
      },
      {
        label: "Substack: The hardest part of building an AI",
        href: "https://ericccosta.substack.com/p/the-hardest-part-of-building-an-ai",
      },
    ],
  },

  "taylor-swift": {
    slug: "taylor-swift",
    kicker: "Telecom · Hardware · Capital",
    title: "Taylor Swift Eras Tour: Under-Seat DOT",
    subtitle:
      "256 units, $400K of capital, a US-to-Canada supply chain, three days before showtime. The Toronto night set a single-event data record on Rogers' network, and Vancouver broke it.",
    meta: [
      { label: "Role", value: "Owner: trade study, capital, delivery" },
      { label: "Venues", value: "Rogers Centre · BC Place" },
      { label: "Capex", value: "$400K (under-seat DOT)" },
      { label: "Outcome", value: "7.4 TB Toronto, 11+ TB Vancouver" },
    ],
    hero: [
      { value: "7.4 TB", label: "Toronto single-event record" },
      { value: "256", label: "Under-seat DOT units" },
      { value: "3×", label: "Stadium capacity added" },
      { value: "$400K", label: "Capital allocated" },
    ],
    body: (
      <>
        <CaseSection label="Context" title="A stadium designed for crowds, not 5G.">
          <Prose>
            <p>
              Stadium roofs are great for sightlines and terrible for radio. Macro signal collapses
              the moment 50,000 fans walk in, and overhead antennas cannot reliably reach seats
              wedged under concrete. The Eras Tour was the highest-profile network test Rogers had
              ever faced, and "good enough" was not going to be acceptable.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Decision" title="Ericsson DOT vs Crossfire BTI: a trade study.">
          <Prose>
            <p>
              I led the trade study comparing Ericsson DOT against Crossfire BTI for under-seat
              deployment. The decision rested on three axes: thermal behavior in an enclosed seat
              cavity, Safety Code 6 RF exposure compliance with humans{" "}
              <em>literally sitting on top of the radio</em>, and supply-chain certainty inside the
              window.
            </p>
            <p>
              Ericsson DOT won on compliance and on the thermal envelope. I specced a custom
              enclosure for the under-seat mount and defended the $400K capex allocation.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Execution" title="A US-to-Canada supply chain on a 3-day buffer.">
          <Prose>
            <p>
              The 256 units shipped from the US into a customs and logistics pipeline that did not
              exist as a template. I built it. The last unit was installed three days before the
              first Toronto show, and we staged the same configuration at BC Place.
            </p>
            <figure className="mt-2">
              <img
                src="/rogers-centre.jpg"
                alt="Eric Costa on site at Rogers Centre during the under-seat DOT build, beside a 500-level seating map"
                className="w-full max-w-sm rounded-lg border border-border object-cover"
                loading="lazy"
              />
              <figcaption className="mt-2 text-xs text-muted-foreground">
                On site at Rogers Centre during the under-seat DOT build.
              </figcaption>
            </figure>
          </Prose>
        </CaseSection>

        <CaseSection label="The network" title="What it took to hold 50,000 phones.">
          <Prose>
            <p>
              The under-seat DOT sat inside a full in-stadium redesign. Rogers and Ericsson deployed
              the Ericsson Radio Dot System with Massive MIMO and lightweight antenna-integrated
              radios, tuned with uplink carrier aggregation for the upload bursts that hit when fans
              all post at once, and beamforming to serve thousands of users simultaneously. The
              system supports 50,000+ concurrent connections at multi-gigabit throughput.
            </p>
            <p>
              At Rogers Centre, the build was an $8M investment that tripled network capacity,
              roughly the coverage of 33 downtown Toronto towers in a single venue. Vancouver's BC
              Place went further: a $10M program that lifted 5G capacity 38×, the equivalent of 20
              Vancouver towers, with two temporary cells on wheels outside the venue.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Outcome" title="A record, then a bigger one.">
          <Prose>
            <p>
              Taylor Swift's Toronto opening night (November 21, 2024) moved{" "}
              <strong>7.4 TB of mobile data</strong> across Rogers 5G and LTE, a single-event record
              at Rogers Centre. Across all six Toronto shows the network carried roughly{" "}
              <strong>42 TB</strong>, more traffic every night than any other event at the venue.
            </p>
            <p>
              Then Vancouver topped it: <strong>11+ TB in a single night</strong> at BC Place and{" "}
              <strong>32 TB across three shows</strong>. Destination Toronto projected over $282M in
              economic impact from the six Toronto dates. The deployment cleared the regulator and
              held performance across every night of the run.
            </p>
          </Prose>
        </CaseSection>
      </>
    ),
    links: [
      {
        label: "Rogers: Vancouver fans break the data record",
        href: "https://about.rogers.com/news-ideas/taylor-swift-fans-in-vancouver-break-record-for-most-data-ever-used-at-single-event-on-rogers-5g-network/",
      },
      {
        label: "Global News: Eras Tour in Toronto",
        href: "https://globalnews.ca/news/10886670/taylor-swift-eras-tour-videos/",
      },
      {
        label: "Ericsson: transforming the Rogers Centre",
        href: "https://www.ericsson.com/en/cases/2025/ericsson-and-rogers-partnered-to-transform-the-rogers-centre",
      },
    ],
  },

  "ttc-5g": {
    slug: "ttc-5g",
    kicker: "Telecom · 5G · Award-winning",
    title: "TTC 5G Subway Launch",
    subtitle:
      "Brought 5G to 85 Toronto subway stations and 15 km of tunnels on a federal deadline, with three carriers sharing one network through MOCN. Winner of the 2024 Ted Rogers Award for Innovation in 5G.",
    meta: [
      { label: "Role", value: "Delivery lead: MOCN integration" },
      { label: "Scope", value: "85 stations · 15 km tunnels" },
      { label: "Solution", value: "MOCN (Rogers + Bell + Telus)" },
      { label: "Outcome", value: "Delivered ahead of federal deadline" },
    ],
    hero: [
      { value: "85", label: "Stations covered" },
      { value: "15 km", label: "Tunnels covered" },
      { value: "3", label: "Carriers on one network" },
      { value: "2024", label: "Ted Rogers Award" },
    ],
    body: (
      <>
        <CaseSection label="Context" title="A federal deadline to connect the subway.">
          <Prose>
            <p>
              Toronto's subway was one of the last major transit systems in North America without
              reliable cellular service underground. A federal regulatory deadline required the
              carriers to deliver coverage across the TTC, with riders expecting not just calls and
              texts but 5G, and 911 access in the tunnels as a safety baseline.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Solution" title="One shared network, three carriers.">
          <Prose>
            <p>
              Rather than three operators building three overlapping systems in the same confined
              tunnels, I delivered a <strong>Multi-Operator Core Network (MOCN)</strong> solution
              that integrated Bell and Telus alongside Rogers into the TTC distributed antenna
              system. One shared radio layer, three independent cores: less hardware in the tunnels,
              a cleaner regulatory story, and a faster path to coverage for every rider regardless
              of carrier.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Execution" title="Built in the only window the subway allows.">
          <Prose>
            <p>
              Tunnel work could only happen when the trains stopped. I ran the integration across
              overnight maintenance windows, roughly <strong>2am to 5am</strong>, over four months,
              the narrow nightly slot when the system is closed. Coordinating three carriers'
              engineering teams against a hard public deadline, in a space with zero margin for
              schedule slip, was the core of the job.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Outcome" title="Ahead of deadline, and an award.">
          <Prose>
            <p>
              The launch covered <strong>85 stations and 15 km of tunnels</strong> and delivered
              ahead of the federal deadline. The work won the{" "}
              <strong>2024 Ted Rogers Award for Innovation in 5G deployment</strong>, Rogers' top
              internal recognition for the year's standout 5G project.
            </p>
          </Prose>
        </CaseSection>
      </>
    ),
  },

  manitoba: {
    slug: "manitoba",
    kicker: "Program Strategy · Cross-carrier",
    title: "Manitoba MOCN → MORAN Decoupling",
    subtitle:
      "Exited a shared-network arrangement with another carrier on a two-year regulatory clock, working inside a four-month outdoor build season.",
    meta: [
      { label: "Role", value: "In-building program owner" },
      { label: "Counterparty", value: "Another carrier" },
      { label: "Constraint", value: "2-yr deadline · 4-mo build season" },
      { label: "Outcome", value: "On time, on budget, green status" },
    ],
    hero: [
      { value: "2 yrs", label: "Regulatory clock" },
      { value: "4 mo", label: "Build season / year" },
      { value: "Green", label: "Program review status" },
      { value: "On budget", label: "Capex variance" },
    ],
    body: (
      <>
        <CaseSection label="Problem" title="A breakup with a clock attached.">
          <Prose>
            <p>
              Another carrier and Rogers had been sharing a Multi-Operator Core Network (MOCN)
              across parts of Manitoba. The decision came down to decouple, fully exiting shared
              infrastructure, within a two-year window. Manitoba adds two complications: an outdoor
              build season of roughly four months, and a cross-carrier coordination burden that no
              internal team alone can solve.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Strategy" title="MORAN as the path of least resistance.">
          <Prose>
            <p>
              I chose MORAN (Multi-Operator RAN) as the intermediate architecture rather than a full
              hard split. MORAN let both carriers keep shared radios while separating cores: a
              smaller engineering surface, a shorter timeline, and a cleaner regulatory story. The
              trade-off was an extra coordination layer, which I owned.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Operating model" title="Cadence does the heavy lifting.">
          <Prose>
            <p>
              I ran weekly working syncs with the other carrier's program lead and monthly program
              reviews with both carriers' engineering and ops teams. Continuous discovery sessions
              surfaced what was actually blocking each cluster, instead of guessing from the plan.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Sequencing" title="Year 1 transport, Year 2 baseband.">
          <Prose>
            <p>
              I sequenced the build to land transport infrastructure in the first outdoor season and
              baseband and radio work in the second. Brandon, the largest cluster, delivered on time
              and stayed green in program review, with capex landing as forecast.
            </p>
          </Prose>
        </CaseSection>
      </>
    ),
  },

  "insights-stocks": {
    slug: "insights-stocks",
    kicker: "0 → 1 Side Build · ML",
    title: "Insights Stocks: Smart Money Signals",
    subtitle:
      "An automated trade-signal platform that ingests insider and congressional disclosures, runs nine quant models per ticker, and pushes scored, ranked calls to a React dashboard and Slack.",
    meta: [
      { label: "Role", value: "Solo: PM + Engineering" },
      { label: "Stack", value: "Python / FastAPI · React / TypeScript" },
      { label: "Models", value: "9 quant + institutional bias controls" },
      { label: "Status", value: "Production, private beta" },
    ],
    hero: [
      { value: "9", label: "Quant models ensembled" },
      { value: "4 / 9", label: "Model-agreement gate" },
      { value: "BH-FDR", label: "False-discovery control" },
      { value: "18", label: "API routes" },
    ],
    body: (
      <>
        <CaseSection label="Premise" title="Most signal tools confuse you with confidence.">
          <Prose>
            <p>
              Retail trade-signal apps tend to be one of two things: a wrapper around a single model
              with a confident UI, or a firehose of indicators you have to interpret yourself. I
              wanted a third thing, an ensemble that is honest about uncertainty and only fires when
              several independent models agree.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Pipeline" title="Ingest, enrich, model, score, alert.">
          <Prose>
            <p>
              The platform pulls insider trades from SEC EDGAR Form 4 filings and congressional
              disclosures from Capitol Trades over a rolling 14-day window, deduplicates them, and
              enriches each ticker with fundamentals via yfinance (P/E, market cap, momentum, RSI,
              drawdown). It layers in macro context from FRED, the yield curve, CPI, VIX, M2,
              classifying the regime as expansion, transition, or recession.
            </p>
            <p>
              Each ticker then runs through <strong>nine quantitative models</strong>: Monte Carlo
              (10,000-path), Hidden Markov regime detection, GARCH volatility, the Fama-French
              5-factor model, an event study with cumulative abnormal returns, a Student-t copula
              tail-risk model, Bayesian signal decay, mean-variance optimization, and options-flow
              analysis. An ensemble combines them into a single 0-100 score with a recommendation.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="The PM bit" title="False-positive control is the product.">
          <Prose>
            <p>
              What separates this from a typical ML side build is the layer that decides when{" "}
              <em>not</em> to fire a signal:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Benjamini-Hochberg FDR correction</strong> across the full ticker universe,
                so the more you test the harder it is to claim a hit.
              </li>
              <li>
                <strong>4-of-9 agreement gate</strong>: at least four models must independently
                concur before a buy or sell is issued, which removes roughly 30% of spurious
                signals.
              </li>
              <li>
                <strong>Granger causality</strong> to confirm a source actually predicts returns,
                plus <strong>conformal prediction intervals</strong> and{" "}
                <strong>adversarial validation</strong> for distribution shift.
              </li>
              <li>
                <strong>Deflated Sharpe ratio</strong>, isotonic calibration, rolling IC/ICIR
                monitoring, and structural-break detection to keep the backtest honest.
              </li>
            </ul>
            <p>
              Conviction scoring then blends signal strength, fundamental quality, and a regime
              modifier into a 0-1 score with a threshold that adapts to volatility.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Surfaces" title="A signal a person can act on with coffee.">
          <Prose>
            <p>
              An 18-route FastAPI backend feeds a React dashboard, sortable signal table, macro
              regime gauge, mean-variance efficient frontier, a backtest engine with an equity
              curve, and a per-ticker drill-down showing every model's output. High-conviction calls
              also post to Slack. The output is a message a real person can act on, not a 50-row
              table.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Why it's here" title="PM rigor, applied to my own product.">
          <Prose>
            <p>
              Insider-trade signal platforms are a crowded space, and most of them quietly leak
              survivorship and selection bias. The reason I am proud of this build is not the model
              count, it is that the guardrails were a product decision before they were a math
              decision.
            </p>
          </Prose>
        </CaseSection>
      </>
    ),
    links: [{ label: "GitHub", href: "https://github.com/ericnc09/financial-planner" }],
  },
};
