import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

const NAV: { to: "/" | "/about" | "/contact"; label: string; exact?: boolean }[] = [
  { to: "/", label: "Work", exact: true },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-[11px] font-semibold text-background tnum">
            EC
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">
            {SITE.name} <span className="text-muted-foreground">· PM</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact }}
              className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="ml-2 hidden rounded-md border border-border bg-foreground px-3 py-1.5 text-background transition-opacity hover:opacity-90 sm:inline-block"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}
