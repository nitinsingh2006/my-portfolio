import { Mail, Github, Linkedin, FileText, ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";

const channels = [
  { label: "Email", value: site.email, href: site.socials.email, icon: Mail },
  { label: "GitHub", value: `@${site.githubUser}`, href: site.socials.github, icon: Github },
  { label: "LinkedIn", value: "Nitin Singh", href: site.socials.linkedin, icon: Linkedin },
  { label: "Résumé", value: "Download PDF", href: site.resumeUrl, icon: FileText },
];

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 glow" aria-hidden />

          <span className="eyebrow">
            <span className="h-px w-6 bg-accent" aria-hidden />
            Contact
          </span>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something worth shipping.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted">
            {site.availability}. The fastest way to reach me is email — I reply quickly.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available now
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.socials.email}
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              Email me
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={site.resumeUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg/40 px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/50"
            >
              <FileText className="h-4 w-4" />
              Download résumé
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-bg/40 p-4 transition-colors hover:border-accent/50"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface text-accent">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-muted">{c.label}</span>
                  <span className="block truncate font-medium text-fg">{c.value}</span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>

          <p className="mt-8 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4 text-accent" /> {site.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
