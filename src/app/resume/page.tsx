import type { Metadata } from "next";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { stack, timeline, certifications } from "@/data/stack";
import { projects } from "@/data/projects";
import { resumeSummary, resumeExperience } from "@/data/resume";
import { ResumeActions } from "./ResumeActions";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name} — ${site.role}. ${resumeSummary}`,
  alternates: { canonical: `${site.url}/resume` },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-border pb-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent print:border-zinc-300 print:text-zinc-900">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const education = timeline.filter((t) => t.kind === "education");

  return (
    <main id="main" className="min-h-screen bg-bg px-4 py-10 print:bg-white print:p-0 sm:px-6">
      <div className="mx-auto w-full max-w-[820px]">
        <ResumeActions />

        {/* Resume document */}
        <article className="resume-doc rounded-2xl border border-border bg-surface/50 p-8 text-fg print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black sm:p-10">
          {/* Header */}
          <header className="border-b border-border pb-5 print:border-zinc-300">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {site.name}
            </h1>
            <p className="mt-1 font-display text-lg text-accent print:text-zinc-700">
              {site.role} · {site.tagline}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted print:text-zinc-600">
              <li>
                <a href={site.socials.email} className="inline-flex items-center gap-1.5 hover:text-fg">
                  <Mail className="h-3.5 w-3.5" /> {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> {site.phone}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {site.location}
              </li>
              <li>
                <a href={site.socials.github} className="inline-flex items-center gap-1.5 hover:text-fg">
                  <Github className="h-3.5 w-3.5" /> github.com/{site.githubUser}
                </a>
              </li>
              <li>
                <a href={site.socials.linkedin} className="inline-flex items-center gap-1.5 hover:text-fg">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={site.url} className="inline-flex items-center gap-1.5 hover:text-fg">
                  <Globe className="h-3.5 w-3.5" /> Portfolio
                </a>
              </li>
            </ul>
          </header>

          {/* Summary */}
          <section className="mt-6">
            <SectionTitle>Summary</SectionTitle>
            <p className="text-sm leading-relaxed text-muted print:text-zinc-700">{resumeSummary}</p>
          </section>

          {/* Skills */}
          <section className="mt-6">
            <SectionTitle>Technical Skills</SectionTitle>
            <ul className="space-y-1.5 text-sm">
              {stack.map((cat) => (
                <li key={cat.domain} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                  <span className="min-w-[140px] shrink-0 font-semibold text-fg print:text-black">
                    {cat.domain}
                  </span>
                  <span className="text-muted print:text-zinc-700">{cat.items.join(" · ")}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Experience */}
          <section className="mt-6">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-5">
              {resumeExperience.map((exp) => (
                <div key={exp.role}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="font-semibold text-fg print:text-black">{exp.role}</h3>
                    <span className="font-mono text-xs text-muted print:text-zinc-600">{exp.period}</span>
                  </div>
                  <p className="text-sm text-accent print:text-zinc-700">{exp.org}</p>
                  <ul className="mt-2 space-y-1.5">
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted print:text-zinc-700"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent print:bg-zinc-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {exp.tech && (
                    <p className="mt-2 font-mono text-xs text-muted/80 print:text-zinc-600">
                      {exp.tech.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Selected Projects */}
          <section className="mt-6">
            <SectionTitle>Selected Projects</SectionTitle>
            <div className="space-y-3.5">
              {projects.map((p) => (
                <div key={p.slug}>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-semibold text-fg print:text-black">{p.name}</h3>
                    <span className="text-xs text-muted print:text-zinc-600">— {p.tagline}</span>
                    {p.live && (
                      <a
                        href={p.live}
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:text-fg print:text-zinc-600"
                      >
                        <ExternalLink className="h-3 w-3" /> live
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted print:text-zinc-700">
                    {p.description}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted/80 print:text-zinc-600">
                    {p.stack.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education + Certifications */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <section>
              <SectionTitle>Education</SectionTitle>
              {education.map((e) => (
                <div key={e.title}>
                  <h3 className="font-semibold text-fg print:text-black">{e.title}</h3>
                  <p className="text-sm text-muted print:text-zinc-700">{e.org}</p>
                  <p className="font-mono text-xs text-muted/80 print:text-zinc-600">{e.period}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted print:text-zinc-700">{e.detail}</p>
                </div>
              ))}
            </section>

            <section>
              <SectionTitle>Certifications</SectionTitle>
              <ul className="space-y-1.5">
                {certifications.map((c) => (
                  <li key={c.name} className="text-sm">
                    <span className="font-medium text-fg print:text-black">{c.name}</span>
                    <span className="block text-xs text-muted print:text-zinc-600">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
