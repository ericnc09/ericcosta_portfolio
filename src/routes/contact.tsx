import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Eric Costa" },
      {
        name: "description",
        content:
          "Get in touch with Eric Costa, Product Manager based in Toronto, TN-visa eligible.",
      },
      { property: "og:title", content: "Contact Eric Costa" },
      { property: "og:description", content: "Email, LinkedIn, GitHub, Substack." },
    ],
  }),
  component: Contact,
});

const LINKS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/[^0-9+]/g, "")}` },
  { label: "LinkedIn", value: "/in/ericcostanil", href: SITE.linkedin },
  { label: "GitHub", value: "@ericnc09", href: SITE.github },
  { label: "Substack", value: "ericccosta.substack.com", href: SITE.substack },
];

function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="mt-4 font-serif text-5xl md:text-6xl">Let's talk.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        I'm in the Greater Toronto Area, open to PM roles across Canada and the US (TN-visa
        eligible). Quickest way to reach me is email.
      </p>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex items-center justify-between py-5 transition-colors hover:bg-secondary/50"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {l.label}
            </span>
            <span className="font-serif text-xl group-hover:text-[var(--accent-blue)]">
              {l.value} →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
