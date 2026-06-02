import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">{SITE.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{SITE.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <a className="mt-2 block hover:text-[var(--accent-blue)]" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          <p className="mt-1 text-muted-foreground">{SITE.location}</p>
        </div>
        <div className="text-sm">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</p>
          <ul className="mt-2 space-y-1">
            <li>
              <a
                className="hover:text-[var(--accent-blue)]"
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="hover:text-[var(--accent-blue)]"
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="hover:text-[var(--accent-blue)]"
                href={SITE.substack}
                target="_blank"
                rel="noreferrer"
              >
                Substack
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. Built with TanStack Start.
      </div>
    </footer>
  );
}
