export const SITE = {
  name: "Eric Costa",
  role: "Product Manager",
  tagline: "Technical product manager in Canadian telecom infrastructure, directing AI projects on the side.",
  email: "ericcosta.public@gmail.com",
  phone: "(416) 573-1986",
  location: "Toronto, Canada",
  linkedin: "https://www.linkedin.com/in/ericcostanil",
  github: "https://github.com/ericnc09",
  substack: "https://ericccosta.substack.com",
  headshot: "/eric-headshot.jpg",
};

// Replace with the verified deployment URL before publishing the finAlyse pages.
export const FINALYSE_DEMO_URL =
  "https://github.com/ericnc09/financial-planner/tree/codex/fintech-demo#try-the-demo-locally";

export const WORKS = [
  {
    slug: "3gpp-rag",
    title: "AI-Powered Wiki - Telecom RAG",
    kicker: "AI · Personal project · Public demo",
    summary:
      "A personal assistant for 3GPP telecom standards questions, with citations on every answer. I directed it; Claude Code built and tested it, and I approved or rejected its changes. 20 people used it at launch.",
    metric: "Public demo",
    sub: "Retrieval eval set in the public repo · 42 security fixes before release",
  },
  {
    slug: "ttc-5g",
    title: "5G in Toronto Subway",
    kicker: "Telecom · 5G · Award-winning",
    summary:
      "Technical prime for Rogers' TTC subway wireless build: handled the Bell and Telus connection work, spearheaded the MOCN connection and coordinated engineers from all three carriers.",
    metric: "Ted Rogers Award (Dec 2023)",
    sub: "Ted Rogers Award for Innovation",
  },
  {
    slug: "insights-stocks",
    title: "finAlyse: Explainable Equity Research",
    kicker: "Fintech · Product Prototype",
    summary:
      "A historical research demo for exploring public trading disclosures, supporting evidence, and the limits of experimental models.",
    metric: "Interactive research demo",
    sub: "Source traceability · Model coverage · Explicit limitations",
  },
  {
    slug: "taylor-swift",
    title: "Taylor Swift Eras Tour: Under-Seat DOT",
    kicker: "Telecom · Hardware · Capital",
    summary:
      "Owned system planning and funding allocation for an $8M Rogers Centre 5G upgrade, including about $400K of under-seat scope and 256 installed units.",
    metric: "7.4 TB in one night",
    sub: "Venue data record during one Taylor Swift show at Rogers Centre",
  },
  {
    slug: "madrid-betar",
    title: "Madrid Betar: Real Madrid Fan Platform",
    kicker: "Startup · 0→1 · Founder",
    summary:
      "Co-founded a Real Madrid fan-media platform with friends, across websites and football podcasts, with a paid subscription tier.",
    metric: "0 → 30K MAU",
    sub: "50K monthly visitors in 6 months · paid Prime tier",
  },
  {
    slug: "football-intelligently",
    title: "Football Intelligently: GNN xG",
    kicker: "AI · ML Research · 0→1",
    summary:
      "A graph neural network that values shots from StatsBomb 360 freeze frames, reaching 95.7% of StatsBomb's proprietary xG using only free, open data.",
    metric: "0.760 AUC",
    sub: "8,013 shots · 7 competitions · MIT Sloan paper in progress",
  },
] as const;

export type WorkSlug = (typeof WORKS)[number]["slug"];

export const HIGHLIGHTS = [
  {
    title: "Rogers Centre 5G upgrade",
    body: "Owned system planning and funding allocation for an $8M Rogers Centre 5G upgrade, including about $400K of under-seat scope and 256 installed units. The network carried a venue-record 7.4 TB during one Taylor Swift show.",
  },
  {
    title: "Manitoba network cutovers",
    body: "Led acceptance testing and sign-off for the Brandon and Winnipeg network cutovers in the Manitoba decoupling program, running night-one tests and multi-day soaks with KPI monitoring.",
  },
  {
    title: "$35.6M in-building capital plan",
    body: "Built the prioritization framework, decided and defended every line item, and authored the proposed $35.6M annual capital plan from about $50M in regional requests; my manager and director gave final approval. Examples: about $3M of hospital builds for a BC provincial health authority tied to about $10M a year of existing Rogers revenue, and a $400K system for a Canadian bank backed by $700K a year in contract revenue over 10 years.",
  },
  {
    title: "Ted Rogers Award for Innovation (Dec 2023)",
    body: "Technical prime for Rogers' TTC subway wireless build: handled the Bell and Telus connection work, spearheaded the MOCN connection and coordinated engineers from all three carriers, vendors and field operations.",
  },
] as const;

export const POSTS = [
  {
    title: "The Hardest Part of Building an AI Product Isn't the AI",
    blurb:
      "42 security fixes, a hanging GPU, and 2007-era file formats: the gap between demo and deploy.",
    href: "https://ericccosta.substack.com/p/the-hardest-part-of-building-an-ai",
  },
  {
    title: "We Simulated the 2022 World Cup 10,000 Times",
    blurb:
      "Germany got a 69.6% chance and went out in the group stage. Why that's the model working, not failing.",
    href: "https://ericccosta.substack.com",
  },
  {
    title: "Grimaldo, a Left-Back, Outscores Every Forward in My Dataset",
    blurb: "619,407 actions across 7 competitions, measured with Expected Threat instead of xG.",
    href: "https://ericccosta.substack.com",
  },
];
