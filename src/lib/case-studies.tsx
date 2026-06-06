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
  "madrid-betar": {
    slug: "madrid-betar",
    kicker: "Startup · 0 → 1 · Founder",
    title: "Madrid Betar: Real Madrid Fan Platform",
    subtitle:
      "Co-founded a Real Madrid fan-media startup and grew it from zero to 30,000 monthly active users across websites and football podcasts, then built and priced a paid subscription tier.",
    meta: [
      { label: "Role", value: "Co-founder: product, growth, monetization" },
      { label: "Surfaces", value: "Websites · football podcasts" },
      { label: "Team", value: "5 writers (editorial)" },
      { label: "Outcome", value: "30K MAU · paid Prime tier" },
    ],
    hero: [
      { value: "30K", label: "Monthly active users" },
      { value: "50K", label: "Monthly visitors in 6 months" },
      { value: "60", label: "Paying Prime subscribers" },
      { value: "5", label: "Writers in editorial" },
    ],
    body: (
      <>
        <CaseSection label="Premise" title="A fan base underserved by generic coverage.">
          <Prose>
            <p>
              Real Madrid has one of the largest fan bases in the world, but most coverage is either
              club-controlled or generic aggregation. I co-founded Madrid Betar to build a dedicated
              home for serious, opinionated Real Madrid analysis across written pieces and football
              podcasts.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Growth" title="Zero to 30K monthly active users.">
          <Prose>
            <p>
              We grew from a standing start to <strong>30,000 monthly active users</strong>, with{" "}
              <strong>50,000 monthly visitors within six months</strong>, across the website and
              podcast channels. I ran editorial across <strong>five writers</strong>, setting the
              publishing cadence and the topics that actually moved engagement.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="The data" title="What the audience actually engaged with.">
          <Prose>
            <p>
              I ran the page on its analytics, not on instinct. A few patterns from the Facebook
              Page insights shaped editorial:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Reach skewed to discovery.</strong> <strong>60.6%</strong> of views came
                from <strong>non-followers</strong> versus 39.4% from followers, so the content was
                traveling well beyond our existing base, not just preaching to the choir.
              </li>
              <li>
                <strong>Format decided everything.</strong> Photos drove <strong>89.1%</strong> of
                all views, far ahead of links (4.4%), text (4.2%), reels (1.8%), and multi-photo
                posts (0.5%).
              </li>
              <li>
                <strong>Peaks near 40,000 views</strong> in a reporting window across the December
                to March span, with a clear upward trajectory.
              </li>
            </ul>
            <p>
              The read was straightforward: lead with photo posts, write headlines and captions for
              shareability, and optimize for the non-follower discovery surface rather than just
              feeding the followers we already had.
            </p>
            <p className="text-xs text-muted-foreground">
              Source: Madrid Betar Facebook Page insights (views by content type and followers vs
              non-followers).
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Monetization" title="Madrid Betar Prime: the free-to-paid funnel.">
          <Prose>
            <p>
              I built and launched the paid subscription tier, <strong>Madrid Betar Prime</strong>,
              owning pricing, packaging, and the free-to-paid conversion funnel. The first cohort
              converted <strong>60 paying subscribers</strong>, validating that a niche, high-intent
              audience will pay for depth over volume.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Why it's here" title="Product and growth, end to end.">
          <Prose>
            <p>
              Madrid Betar is the clearest example of me owning a product from zero: audience
              growth, editorial operations, and a monetization model with a real conversion funnel,
              not just a content hobby.
            </p>
          </Prose>
        </CaseSection>
      </>
    ),
    links: [{ label: "Facebook", href: "https://www.facebook.com/madridbetar" }],
  },

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
      { value: "25+", label: "Users in first 3 months" },
      { value: "$0", label: "Cost per query" },
    ],
    body: (
      <>
        <CaseSection label="Problem" title="Engineers were losing hours to spec hunts.">
          <Prose>
            <p>
              During 5G deployments at Rogers, I watched engineers spend hours digging through dense
              3GPP specifications to answer basic architecture questions. A single query could span
              hundreds of pages across multiple documents (TS 38.300 plus 38.401 plus 23.501), all
              written for compliance rather than for reading. Keyword search in PDFs has low recall
              on conceptual questions, and standards work needs citations an engineer can trust
              inside a time-sensitive change window.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="User stories" title="Who it's for, and what 'done' means.">
          <Prose>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>5G RAN engineer:</strong> ask in plain English, get a cited answer in
                seconds, and resolve implementation questions in minutes instead of hours.
              </li>
              <li>
                <strong>Standards researcher:</strong> query across releases at once to track how a
                feature evolved across spec versions.
              </li>
              <li>
                <strong>New engineer:</strong> ask the "dumb questions" about 5G architecture
                without blocking a senior, in a multi-turn chat that remembers context.
              </li>
              <li>
                <strong>Grad student:</strong> use it for research with no API subscription, because
                the whole thing runs free and local.
              </li>
            </ul>
          </Prose>
        </CaseSection>

        <CaseSection label="Features" title="What shipped.">
          <Prose>
            <ul className="list-disc space-y-2 pl-5">
              <li>Semantic search with a source citation and similarity score on every answer.</li>
              <li>
                Domain and generation filters (5G/LTE, RAN/Core) to scope a query to the right spec
                subset.
              </li>
              <li>Token-by-token streaming and multi-turn conversation memory.</li>
              <li>
                <strong>37 specs, 43,121 chunks</strong>, fully local on ChromaDB + Ollama at{" "}
                <strong>$0 per query</strong>.
              </li>
              <li>A public Streamlit demo so anyone can try it in the browser.</li>
            </ul>
          </Prose>
        </CaseSection>

        <CaseSection label="Usage" title="Real users, measured quality.">
          <Prose>
            <p>
              The public demo reached <strong>25+ users in its first three months</strong>. On a
              held-out evaluation set it scores <strong>100% context precision</strong>,{" "}
              <strong>80% context recall</strong>, and ~<strong>50ms p50</strong> retrieve latency,
              backed by 152 fully-mocked unit tests. Getting it public also meant clearing two
              security-hardening rounds (<strong>42 findings</strong>: rate-limiting gaps, prompt
              injection, SSRF, missing headers), which I wrote up on Substack.
            </p>
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
        <figure className="mb-2">
          <img
            src="/eras-tour.jpg"
            alt="The Eras Tour stage at Rogers Centre, Toronto, with the stadium full"
            className="w-full rounded-lg border border-border"
            loading="lazy"
          />
          <figcaption className="mt-2 text-xs text-muted-foreground">
            The Eras Tour at Rogers Centre, Toronto.
          </figcaption>
        </figure>
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
        <figure className="mb-2">
          <img
            src="/ttc.jpg"
            alt="On site in a TTC equipment room during the subway 5G integration"
            className="w-full max-w-sm rounded-lg border border-border"
            loading="lazy"
          />
          <figcaption className="mt-2 text-xs text-muted-foreground">
            Working on the ground to ensure the federal deadline was met.
          </figcaption>
        </figure>
        <CaseSection label="Context" title="A federal deadline to connect the subway.">
          <Prose>
            <p>
              Toronto's subway was one of the last major transit systems in North America without
              reliable cellular service underground. Rogers operated the TTC's connectivity network,
              and a federal mandate required that it carry not just its own customers but{" "}
              <strong>Bell's and Telus's too</strong>, so every rider on every carrier gets 5G and
              911 access in the tunnels as a safety baseline, all against a hard government
              deadline.
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
    links: [
      {
        label: "Rogers: 5G and 911 calling come to the TTC subway",
        href: "https://about.rogers.com/news-ideas/rogers-steps-up-to-bring-5g-full-services-to-ttc-subway-including-911-calling/",
      },
      {
        label: "Rogers: 5G live at every TTC subway station",
        href: "https://about.rogers.com/news-ideas/rogers-turns-on-5g-service-for-its-customers-at-all-ttc-subway-stations/",
      },
      {
        label: "CTV News: cell service reaches the remaining stations",
        href: "https://www.ctvnews.ca/toronto/article/rogers-turns-on-cell-service-at-remaining-ttc-subway-stations-for-its-own-customers/",
      },
      {
        label: "City of Toronto: TTC connectivity report",
        href: "https://www.toronto.ca/legdocs/mmis/2025/ttc/bgrd/backgroundfile-256307.pdf",
      },
    ],
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
        <CaseSection label="Problem" title="Most signal tools confuse you with confidence.">
          <Prose>
            <p>
              Retail trade-signal apps tend to be one of two things: a wrapper around a single model
              with a confident UI, or a firehose of indicators you have to interpret yourself. Both
              quietly leak survivorship and selection bias, and the raw inputs, insider and
              congressional buys, are noisy on their own. I wanted a third thing: an ensemble that
              is honest about uncertainty and only fires when several independent models agree.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="User stories" title="Who it's for.">
          <Prose>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Self-directed investor:</strong> give me a short, vetted shortlist with a
                single score I can act on, not a 50-row table I have to decode.
              </li>
              <li>
                <strong>Smart-money follower:</strong> tell me when insiders and Congress are
                actually buying something worth attention, and ping me on Slack when conviction is
                high.
              </li>
              <li>
                <strong>Quant-curious analyst:</strong> let me drill into every model's output and a
                backtest, so I can see why a call fired before I trust it.
              </li>
            </ul>
          </Prose>
        </CaseSection>

        <CaseSection label="Solution" title="Ingest, enrich, model, score, alert.">
          <Prose>
            <p>
              The platform pulls insider trades from SEC EDGAR Form 4 filings and congressional
              disclosures from Capitol Trades over a rolling 14-day window, deduplicates them, and
              enriches each ticker with fundamentals via yfinance (P/E, market cap, momentum, RSI,
              drawdown) plus a macro regime read from FRED (yield curve, CPI, VIX, M2). Each ticker
              then runs through <strong>nine quantitative models</strong>, Monte Carlo, Hidden
              Markov regime, GARCH, Fama-French 5-factor, event study, copula tail risk, Bayesian
              decay, mean-variance, and options flow, which an ensemble combines into a single 0-100
              score and recommendation. An 18-route FastAPI backend feeds a React dashboard and
              posts high-conviction calls to Slack: a message a real person can act on, not a 50-row
              table.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Product sense" title="False-positive control is the product.">
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
                concur before a buy or sell is issued, removing roughly 30% of spurious signals.
              </li>
              <li>
                <strong>Granger causality</strong>, <strong>conformal prediction intervals</strong>,
                and <strong>adversarial validation</strong> to confirm a source predicts returns and
                to catch distribution shift.
              </li>
              <li>
                <strong>Deflated Sharpe ratio</strong> and isotonic calibration to keep the backtest
                honest.
              </li>
            </ul>
            <p>
              The reason I'm proud of this build isn't the model count. It's that the guardrails
              were a product decision before they were a math decision.
            </p>
          </Prose>
        </CaseSection>
      </>
    ),
    links: [{ label: "GitHub", href: "https://github.com/ericnc09/financial-planner" }],
  },

  "football-intelligently": {
    slug: "football-intelligently",
    kicker: "AI · ML Research · 0 → 1",
    title: "Football Intelligently: GNN Expected Goals",
    subtitle:
      "A graph neural network that models players as nodes and their spatial interactions as edges to value shots from StatsBomb 360 freeze frames, reaching 95.7% of StatsBomb's proprietary xG using only free, open data.",
    meta: [
      { label: "Role", value: "Solo: research + engineering" },
      { label: "Model", value: "HybridGATv2 + temperature scaling" },
      { label: "Data", value: "StatsBomb 360 · 326 matches · 7 comps" },
      { label: "Status", value: "MIT Sloan paper in progress" },
    ],
    hero: [
      { value: "0.760", label: "Shot xG AUC" },
      { value: "95.7%", label: "Of StatsBomb's proprietary xG" },
      { value: "8,013", label: "Shots modeled" },
      { value: "0.148", label: "Brier score" },
    ],
    body: (
      <>
        <CaseSection label="Premise" title="A shot is a relationship, not a coordinate.">
          <Prose>
            <p>
              Classic expected-goals (xG) models treat a shot as a handful of scalar features:
              distance, angle, body part. But whether a shot goes in depends on where every other
              player is standing. I modeled each shot as a graph, players as nodes and their spatial
              interactions as edges, so the model can reason about defensive shape and goalkeeper
              positioning as relational structure.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Model" title="HybridGATv2 on freeze frames.">
          <Prose>
            <p>
              The production model is a <strong>HybridGAT+T</strong>: a GATv2 graph-attention
              network over the StatsBomb 360 freeze frame, fused with 27 dimensions of shot metadata
              (post-shot xG placement, goalkeeper geometry, defensive blocking, foot preference),
              with per-competition temperature scaling for calibration. It scores{" "}
              <strong>AUC 0.760</strong> and a <strong>Brier of 0.148</strong> on 8,013 shots across
              seven competitions.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Result" title="95.7% of a proprietary model, on open data.">
          <Prose>
            <p>
              The model reaches <strong>95.7% of StatsBomb's proprietary xG AUC</strong> using only
              free, open data, validated across men's and women's competitions (World Cups, Euros,
              Bundesliga). Permutation importance across 12 feature groups showed goalkeeper
              distance dominates (+0.223 AUC when shuffled), ahead of shot distance and the header
              flag.
            </p>
          </Prose>
        </CaseSection>

        <CaseSection label="Dashboard" title="An interactive analyst tool.">
          <Prose>
            <p>
              The dashboard turns the model into something an analyst can use: shot maps coloured by
              model xG, a shot inspector with gradient-saliency and attention overlays showing which
              players the model attended to, calibration and reliability diagrams, full match
              reports with cumulative xG timelines, and a "surprise goals" view that surfaces
              sub-15% xG strikes.
            </p>
            <figure className="mt-2">
              <img
                src="/football-dashboard.jpg"
                alt="Football Intelligently dashboard: shot map, freeze frame, gradient saliency, and xG comparison"
                className="w-full rounded-lg border border-border"
                loading="lazy"
              />
              <figcaption className="mt-2 text-xs text-muted-foreground">
                The dashboard: shot map, freeze frame, saliency overlay, and xG comparison.
              </figcaption>
            </figure>
          </Prose>
        </CaseSection>

        <CaseSection label="Why it's here" title="Research rigor, shipped.">
          <Prose>
            <p>
              Five novel contributions are confirmed against the literature, and a paper targeting
              the MIT Sloan Sports Analytics Conference is in progress. It is the side of me that
              takes an idea from raw open data to a calibrated, evaluated model with an interface,
              not just a notebook.
            </p>
          </Prose>
        </CaseSection>
      </>
    ),
    links: [{ label: "GitHub", href: "https://github.com/ericnc09/football-analysis" }],
  },
};
