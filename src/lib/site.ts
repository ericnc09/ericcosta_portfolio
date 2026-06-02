export const SITE = {
  name: "Eric Costa",
  role: "Product Manager",
  tagline: "Product Manager shipping AI products inside a regulated telecom.",
  email: "ericcosta.public@gmail.com",
  phone: "(416) 573-1986",
  location: "Toronto, Canada · TN-visa eligible",
  linkedin: "https://www.linkedin.com/in/ericcostanil",
  github: "https://github.com/ericnc09",
  substack: "https://ericccosta.substack.com",
  headshot: "/eric-headshot.jpg",
};

export const WORKS = [
  {
    slug: "madrid-betar",
    title: "Madrid Betar: Real Madrid Fan Platform",
    kicker: "Startup · 0→1 · Founder",
    summary:
      "Co-founded a Real Madrid fan-media startup and grew it from zero to 30,000 monthly active users across web and podcasts, with a paid subscription tier.",
    metric: "0 → 30K MAU",
    sub: "50K monthly visitors in 6 months · paid Prime tier",
  },
  {
    slug: "3gpp-rag",
    title: "Telecom Standards Assistant: 3GPP RAG",
    kicker: "AI · 0→1 · Production",
    summary:
      "A retrieval assistant over 37 3GPP specs that turns hours of manual spec hunting into seconds, with citations on every answer.",
    metric: "43,121 chunks indexed",
    sub: "37 specs · 100% context precision · $0 per query",
  },
  {
    slug: "taylor-swift",
    title: "Taylor Swift Eras Tour: Under-Seat DOT",
    kicker: "Telecom · Hardware · Capital",
    summary:
      "First under-seat DOT deployment in Canada: 256 units across Rogers Centre and BC Place, delivered three days before showtime.",
    metric: "7.4 TB in one night",
    sub: "Single-event data record on Rogers 5G + LTE",
  },
  {
    slug: "ttc-5g",
    title: "TTC 5G Subway Launch",
    kicker: "Telecom · 5G · Award-winning",
    summary:
      "Brought 5G to the Toronto subway, 85 stations and 15 km of tunnels, on a federal deadline, with three carriers sharing one network via MOCN.",
    metric: "Ted Rogers Award 2024",
    sub: "Innovation in 5G deployment · delivered ahead of deadline",
  },
  {
    slug: "manitoba",
    title: "Manitoba MOCN → MORAN Decoupling",
    kicker: "Program Strategy · Cross-carrier",
    summary:
      "Exited a shared-network arrangement with another carrier on a two-year regulatory clock, working inside a four-month outdoor build season.",
    metric: "On time, on budget",
    sub: "Brandon cluster green in program review",
  },
  {
    slug: "insights-stocks",
    title: "Insights Stocks: Smart Money Signals",
    kicker: "0→1 Side Build · ML",
    summary:
      "A trade-signal platform that ingests insider and congressional disclosures and pushes scored calls to a real-time dashboard and Slack.",
    metric: "9 quant models",
    sub: "FDR control · 4-model agreement gate · Granger validation",
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
    title: "First under-seat DOT deployment in Canada",
    body: "Led the first under-seat distributed antenna (DOT) deployment in Canada, 256 units, for the Taylor Swift Eras Tour at Rogers Centre.",
  },
  {
    title: "Provincial network decoupling",
    body: "Owned in-building decoupling for the provincial decouple program, with another carrier and Rogers exiting MOCN network sharing.",
  },
  {
    title: "$35M in-building capital framework",
    body: "Own prioritization and capital allocation for Rogers' Canada-wide in-building portfolio (~$35M/year, zero-rollover). Built a five-layer matrix and defended every line through three steering committees. High-ROI wins: a BC provincial health authority (~$10M/yr of business for a ~$3M build) and EQ Bank (~$400K build securing ~$700K/yr over 10 years).",
  },
  {
    title: "Ted Rogers Award for Innovation in 5G (2024)",
    body: "Led the TTC 5G subway launch, 85 stations and 15 km of tunnels, delivered under a federal regulatory deadline via a MOCN solution integrating Bell and Telus into the TTC DAS.",
  },
] as const;

export const POSTS = [
  {
    title: "The Hardest Part of Building an AI Product Isn't the AI",
    blurb:
      "42 vulnerabilities, a hanging GPU, and 2007-era file formats: the gap between demo and deploy.",
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
