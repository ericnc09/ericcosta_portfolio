# Eric Costa — PM Portfolio Plan

A minimalist, gray-palette, data-driven portfolio designed to address the "PM-in-title vs PM-in-practice" narrative and showcase shipped AI products + telecom outcomes.

## Design direction

- **Palette:** monochrome grays (near-black `#0A0A0A` foreground, layered neutrals `#171717 / #525252 / #A3A3A3 / #E5E5E5`, off-white `#FAFAFA` background). Single restrained accent: soft electric blue `#3B82F6` reserved for links + metric highlights.
- **Typography:** Inter (body) + Instrument Serif (display headings) for an editorial, data-journal feel. Tabular numerals for metrics.
- **Style:** generous whitespace, thin dividers, left-aligned editorial layout, large numerical stats (Stripe Press / Linear changelog meets analyst report). No flashy motion — only subtle fades on scroll.
- **Components:** sticky top nav (Work · About · Writing · Contact), monospaced metric chips, footnote-style citations under case studies.

## Site structure (TanStack routes)

```
/                  Landing
/work/3gpp-rag     Case study 1 — 3GPP RAG Assistant
/work/taylor-swift Case study 2 — Eras Tour under-seat DOT
/work/manitoba     Case study 3 — Manitoba MOCN decoupling
/work/insights-stocks  Bonus build — Smart Money / Insights Stocks
/about             Story + background
/contact           Contact + links
```

Each route gets its own `head()` meta (title + description + og). Headshot used at `/about` and as small avatar in landing hero.

## Page contents

### `/` Landing

- **Hero:** name, one-line positioning ("Product Manager shipping AI products inside a regulated telecom"), short value prop, primary CTA → Work, secondary → Resume.
- **Metric strip:** $35M portfolio owned · 7.4 TB single-event record · 80% RAG retrieval accuracy · 16% lift in 911 accuracy · 30K MAU built solo · Ted Rogers Award 2024.
- **Selected Work:** 3 case study cards with thumbnail metric + one-line outcome.
- **The PM Gap (narrative section):** directly addresses "no PM on paper" — frames Rogers PM title + shipped products + side builds as proof of practice. Three columns: _Strategy & Prioritization_, _Shipping AI in production_, _0→1 builder_.
- **Writing:** 3 Substack post cards (3GPP deploy story, World Cup sim, xT/Grimaldo).
- **Footer:** email · LinkedIn · GitHub · Substack.

### `/work/3gpp-rag` — flagship AI case study

Challenge → Approach → Discovery (10 user interviews, success metrics) → Architecture (Groq llama-3.3-70b, ChromaDB, Streamlit, 42K chunks across 37 specs) → Security hardening (42 vulns, ISO 27001) → Results (80% retrieval accuracy, 100% context precision, 50ms p50, 2→15 users / 650% growth, 3x A/B validated) → What I learned about shipping AI in regulated environments. Links to live app + GitHub + Substack write-up.

### `/work/taylor-swift` — Eras Tour DOT deployment

Context (Rogers Centre + BC Place) → Decision (Ericsson DOT vs Crossfire BTI trade study) → Constraints (Safety Code 6, thermal, $400K capex, cross-border supply chain, 3-day pre-show delivery) → Execution (256 units, custom enclosure) → Outcome (7.4 TB single-event record on Rogers 5G/LTE).

### `/work/manitoba` — MOCN→MORAN decoupling

Problem (Bell + Rogers exit shared network, 2-yr regulatory clock, 4-month build season) → Strategic choice (MORAN as path of least resistance) → Stakeholder ops (weekly Bell syncs, monthly program reviews) → Sequencing (Y1 transport, Y2 baseband) → Outcome (Brandon cluster on-time, green program status, capex on forecast).

### `/work/insights-stocks` — 0→1 builder proof

Problem → 9-model ensemble (Monte Carlo, HMM, GARCH, Fama-French, options flow…) → False-positive control (Benjamini-Hochberg FDR, 4-model agreement gate, Granger causality) → Stack (FastAPI + React) → Slack delivery. Frames it as "PM rigor applied to my own product."

### `/about`

Headshot left, story right. Threads: telecom engineer → senior planner → PM at Rogers → AI builder. Ted Rogers Award. MSc CS (AI/Data Science, York). Published research. Substack. Direct paragraph on the PM-gap narrative. Skills grid: Product Strategy · Prioritization & Capital Allocation · RAG/LLM · A/B Testing · User Research · PostHog · Python · SQL · Telecom (3GPP, DAS, MOCN/MORAN).

### `/contact`

Email (ericcosta.public@gmail.com), phone, location (Toronto, TN-visa eligible), LinkedIn, GitHub, Substack. Simple — no form needed (mailto link).

## Technical notes

- TanStack Start file-routes under `src/routes/`, each with `head()` meta (unique title/description/og:title/og:description; leaf og:image only on case studies).
- Headshot via `lovable-assets create` from `/mnt/user-uploads/IMG_0363_optimized_800.jpeg`, imported as JSON pointer.
- Shared `<SiteHeader/>` + `<SiteFooter/>` in `__root.tsx` (with `<Outlet/>`).
- Tokens defined in `src/styles.css` as oklch (grays + single blue accent), Tailwind v4 `@theme inline` mapping.
- Reusable components: `MetricStat`, `CaseStudyHero`, `SectionLabel`, `Callout`, `WorkCard`.
- Mobile-first; semantic HTML; single H1 per page; alt text on headshot; JSON-LD Person on `/`.
- No backend / Cloud needed.

## Out of scope (call out)

- No CMS — content lives in TSX.
- No contact form (mailto only) — avoids needing backend.
- Case studies 4 & 5 from the brief were marked as placeholders, so they're not included; the Insights Stocks build replaces them as a third strong example. I can add more later if you share details.

Ready to build on approval.
