import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  );
}

export function MetricStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-border pl-4">
      <p className="font-serif text-3xl tnum text-foreground md:text-4xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-5 text-[15px] leading-relaxed text-foreground/85">{children}</div>;
}

export function CaseSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-border py-12 md:grid-cols-[200px_1fr]">
      <div>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-2 font-serif text-2xl">{title}</h2>
      </div>
      <div className="max-w-2xl">{children}</div>
    </section>
  );
}
