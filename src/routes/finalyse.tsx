import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MetricStat, Pill, SectionLabel } from "@/components/site/primitives";

const DATA_BASE = "https://raw.githubusercontent.com/ericnc09/financial-planner/digests";
const PAGE_SIZE = 50;

type Trade = {
  ticker: string;
  actor: string;
  direction: "buy" | "sell";
  value: number | null;
  trade_date: string;
  filing_date: string | null;
  source: string;
  sector: string | null;
};

type Highlight = { kind: string; ticker: string; sector: string | null; headline: string };

type Digest = {
  date: string;
  generated_at: string;
  counts: { trades: number; tickers: number; actors: number; buys: number; sells: number };
  highlights: Highlight[];
  trades: Trade[];
};

const SOURCE_LABELS: Record<string, string> = {
  insider: "Insider (Form 4)",
  institutional: "Institution (13F)",
  congressional: "Congress",
};

const HIGHLIGHT_LABELS: Record<string, string> = {
  cluster: "Several insiders",
  large_buy: "Large purchase",
  congressional: "Congress",
};

const fieldClass = "h-10 rounded-md border border-border bg-background px-3 text-sm";

export const Route = createFileRoute("/finalyse")({
  head: () => ({
    meta: [
      { title: "finAlyse disclosures · Eric Costa" },
      {
        name: "description",
        content:
          "A daily compilation of public insider trading disclosures filed with the SEC. Research and education only, not investment advice.",
      },
      { property: "og:title", content: "finAlyse disclosures" },
      {
        property: "og:description",
        content: "Every open-market insider trade from recent SEC filings, compiled daily.",
      },
    ],
  }),
  component: Finalyse,
});

function money(value: number | null) {
  if (!value) return "—";
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${Math.round(value)}`;
}

async function fetchJson<T>(name: string): Promise<T> {
  const response = await fetch(`${DATA_BASE}/${name}`);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

function Finalyse() {
  const [dates, setDates] = useState<string[]>([]);
  const [selected, setSelected] = useState("latest");
  const [digest, setDigest] = useState<Digest | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetchJson<{ dates: string[] }>("index.json")
      .then((index) => setDates(index.dates))
      .catch(() => setDates([]));
  }, []);

  useEffect(() => {
    let current = true;
    setStatus("loading");
    fetchJson<Digest>(`${selected}.json`)
      .then((data) => {
        if (!current) return;
        setDigest(data);
        setStatus("ready");
      })
      .catch(() => {
        if (current) setStatus("error");
      });
    return () => {
      current = false;
    };
  }, [selected]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionLabel>finAlyse · Public disclosures</SectionLabel>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] md:text-6xl">
        Insider trades, compiled daily.
      </h1>
      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-foreground/85">
        Every open-market purchase and sale reported on SEC Form 4, plus quarterly 13F position
        changes. Highlights follow fixed rules: several insiders buying the same stock, then the
        largest purchases.
      </p>

      {status === "loading" && (
        <p role="status" className="mt-16 text-sm text-muted-foreground">
          Loading disclosures…
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-16 text-sm text-muted-foreground">
          These disclosures couldn't be loaded. Please try again shortly.
        </p>
      )}
      {status === "ready" && digest && (
        <DigestView digest={digest} dates={dates} selected={selected} onSelect={setSelected} />
      )}

      <p className="mt-16 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
        Research and education only. Not investment advice or a recommendation to buy or sell any
        security. Data comes from public SEC filings, which are published after the trades occur and
        can contain filer errors. Values are shown as a dash when the reported price looks
        unreliable.
      </p>
    </div>
  );
}

function DigestView({
  digest,
  dates,
  selected,
  onSelect,
}: {
  digest: Digest;
  dates: string[];
  selected: string;
  onSelect: (date: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const [direction, setDirection] = useState("all");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const sources = useMemo(() => [...new Set(digest.trades.map((t) => t.source))], [digest]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return digest.trades.filter(
      (t) =>
        (source === "all" || t.source === source) &&
        (direction === "all" || t.direction === direction) &&
        (!term || t.ticker.toLowerCase().includes(term) || t.actor.toLowerCase().includes(term)),
    );
  }, [digest, query, source, direction]);

  useEffect(() => setLimit(PAGE_SIZE), [digest, query, source, direction]);

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <label htmlFor="digest-date" className="text-sm text-muted-foreground">
          Showing
        </label>
        <select
          id="digest-date"
          className={fieldClass}
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="latest">Latest ({digest.date})</option>
          {dates.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
        <MetricStat value={digest.counts.trades.toLocaleString()} label="Trades" />
        <MetricStat value={digest.counts.tickers.toLocaleString()} label="Tickers" />
        <MetricStat value={digest.counts.buys.toLocaleString()} label="Buys" />
        <MetricStat value={digest.counts.sells.toLocaleString()} label="Sells" />
      </div>

      <section className="mt-16" aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className="font-serif text-3xl">
          Highlighted trades
        </h2>
        {digest.highlights.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Nothing stood out in this batch.</p>
        ) : (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {digest.highlights.map((h) => (
              <li key={h.ticker} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4">
                <span className="w-16 font-medium">{h.ticker}</span>
                <span className="min-w-0 flex-1 text-sm text-foreground/85">{h.headline}</span>
                <Pill>{HIGHLIGHT_LABELS[h.kind] ?? h.kind}</Pill>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-16" aria-labelledby="trades-heading">
        <h2 id="trades-heading" className="font-serif text-3xl">
          All trades
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <input
            type="search"
            aria-label="Search by ticker or name"
            placeholder="Search ticker or name"
            className={`${fieldClass} w-full sm:w-64`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            aria-label="Filter by source"
            className={fieldClass}
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="all">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {SOURCE_LABELS[s] ?? s}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by direction"
            className={fieldClass}
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="all">Buys and sells</option>
            <option value="buy">Buys</option>
            <option value="sell">Sells</option>
          </select>
        </div>

        <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
          {filtered.length.toLocaleString()} of {digest.trades.length.toLocaleString()} trades
        </p>

        {filtered.length > 0 && (
          <div className="mt-3 overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticker</th>
                  <th className="px-4 py-3 font-medium">Who</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                  <th className="px-4 py-3 text-right font-medium">Value</th>
                  <th className="px-4 py-3 font-medium">Traded</th>
                  <th className="px-4 py-3 font-medium">Filed</th>
                  <th className="px-4 py-3 font-medium">Sector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.slice(0, limit).map((t, i) => (
                  <tr key={`${t.ticker}-${t.actor}-${t.trade_date}-${i}`}>
                    <td className="px-4 py-3 font-medium">{t.ticker}</td>
                    <td className="max-w-[260px] truncate px-4 py-3" title={t.actor}>
                      {t.actor}
                    </td>
                    <td className="px-4 py-3">{t.direction === "buy" ? "Bought" : "Sold"}</td>
                    <td className="tnum px-4 py-3 text-right">{money(t.value)}</td>
                    <td className="tnum whitespace-nowrap px-4 py-3">{t.trade_date}</td>
                    <td className="tnum whitespace-nowrap px-4 py-3">{t.filing_date ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.sector ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > limit && (
          <button
            type="button"
            onClick={() => setLimit((n) => n + PAGE_SIZE)}
            className="mt-4 rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary"
          >
            Show more
          </button>
        )}
      </section>
    </>
  );
}
