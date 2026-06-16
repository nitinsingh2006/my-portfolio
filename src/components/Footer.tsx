import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <a href="#home" className="flex items-center gap-2 font-display font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-border bg-surface font-mono text-xs text-accent">
              NS
            </span>
            {site.name}
          </a>
          <p className="text-xs text-muted">
            {site.role} · {site.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: site.socials.github, icon: Github, label: "GitHub" },
            { href: site.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
            { href: site.socials.email, icon: Mail, label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-fg"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-fg"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-2 border-t border-border/60 py-5 text-xs text-muted sm:flex-row">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p className="font-mono">Built with Next.js · TypeScript · Tailwind · Framer Motion</p>
      </div>
    </footer>
  );
}
