import type { Metadata } from "next";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { stack } from "@/data/stack";
import { certifications } from "@/data/stack";
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
    <h2 className="mb-2 border-b border-border pb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent print:border-zinc-300 print:text-zinc-800 print:text-[10px]">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  // Only take top 4 projects for resume (fit on 1 page)
  const resumeProjects = projects.slice(0, 4);
  // Only take top 5 skills categories
  const resumeStack = stack.slice(0, 5);
  // Only top 3 certs
  const resumeCerts = certifications.slice(0, 3);

  return (
    <main id="main" className="min-h-screen bg-bg px-4 py-10 print:bg-white print:p-0 sm:px-6">
      <div className="mx-auto w-full max-w-[820px]">
        <ResumeActions />

        {/* Resume document */}
        <article className="resume-doc rounded-2xl border border-border bg-surface/50 p-8 text-fg print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black sm:p-10 print:text-[11px]">
          {/* Header — compact */}
          <header className="border-b border-border pb-3 print:border-zinc-300 print:pb-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl print:text-2xl">
                {site.name}
              </h1>
              <span className="font-display text-sm text-accent print:text-zinc-600 print:text-xs">
                {site.role} · {site.tagline}
              </span>
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted print:text-zinc-600 print:text-[10px] print:gap-x-3">
              <li>
                <a href={site.socials.email} className="inline-flex items-center gap-1 hover:text-fg">
                  <Mail className="h-3 w-3" /> {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-1">
                <Phone className="h-3 w-3" /> {site.phone}
              </li>
              <li className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {site.location}
              </li>
              <li>
                <a href={site.socials.github} className="inline-flex items-center gap-1 hover:text-fg">
                  <Github className="h-3 w-3" /> github.com/{site.githubUser}
                </a>
              </li>
              <li>
                <a href={site.socials.linkedin} className="inline-flex items-center gap-1 hover:text-fg">
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={site.url} className="inline-flex items-center gap-1 hover:text-fg">
                  <Globe className="h-3 w-3" /> Portfolio
                </a>
              </li>
            </ul>
          </header>

          {/* Summary — shorter */}
          <section className="mt-3 print:mt-2">
            <SectionTitle>Summary</SectionTitle>
            <p className="text-sm leading-snug text-muted print:text-zinc-700 print:text-[11px]">{resumeSummary}</p>
          </section>

          {/* Skills — compact inline */}
          <section className="mt-3 print:mt-2">
            <SectionTitle>Technical Skills</SectionTitle>
            <ul className="space-y-0.5 text-sm print:text-[11px]">
              {resumeStack.map((cat) => (
                <li key={cat.domain} className="flex flex-col gap-0 sm:flex-row sm:gap-2">
                  <span className="min-w-[120px] shrink-0 font-semibold text-fg print:text-black print:min-w-[100px]">
                    {cat.domain}
                  </span>
                  <span className="text-muted print:text-zinc-700">{cat.items.join(" · ")}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Experience — tighter bullets */}
          <section className="mt-3 print:mt-2">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-3 print:space-y-2">
              {resumeExperience.map((exp) => (
                <div key={exp.role}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-sm font-semibold text-fg print:text-black">{exp.role}</h3>
                    <span className="font-mono text-[11px] text-muted print:text-zinc-600 print:text-[10px]">{exp.period}</span>
                  </div>
                  <p className="text-xs text-accent print:text-zinc-700">{exp.org}</p>
                  <ul className="mt-1 space-y-0.5 print:space-y-0">
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-1.5 text-sm leading-snug text-muted print:text-zinc-700 print:text-[11px]"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent print:bg-zinc-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {exp.tech && (
                    <p className="mt-1 font-mono text-[10px] text-muted/80 print:text-zinc-600">
                      {exp.tech.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Selected Projects — only top 4, compact */}
          <section className="mt-3 print:mt-2">
            <SectionTitle>Selected Projects</SectionTitle>
            <div className="space-y-2 print:space-y-1.5">
              {resumeProjects.map((p) => (
                <div key={p.slug}>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-sm font-semibold text-fg print:text-black">{p.name}</h3>
                    <span className="text-[11px] text-muted print:text-zinc-600">— {p.tagline}</span>
                    {p.live && (
                      <a
                        href={p.live}
                        className="inline-flex items-center gap-0.5 font-mono text-[10px] text-accent hover:text-fg print:text-zinc-600"
                      >
                        <ExternalLink className="h-2.5 w-2.5" /> live
                      </a>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs leading-snug text-muted print:text-zinc-700 print:text-[10px]">
                    {p.description}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted/80 print:text-zinc-600">
                    {p.stack.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education + Certifications — side by side, compact */}
          <div className="mt-3 grid gap-4 sm:grid-cols-2 print:mt-2 print:gap-3">
            <section>
              <SectionTitle>Education</SectionTitle>
              <div>
                <h3 className="text-sm font-semibold text-fg print:text-black">B.Tech, Computer Science &amp; Engineering</h3>
                <p className="text-xs text-muted print:text-zinc-700">Indore Institute of Science and Technology, Indore</p>
                <p className="font-mono text-[10px] text-muted/80 print:text-zinc-600">2024 — 2028</p>
                <p className="mt-0.5 text-[10px] leading-snug text-muted print:text-zinc-700">
                  Coursework: Data Structures, Algorithms, OOP, DBMS, Operating Systems, Computer Networks.
                </p>
              </div>
            </section>

            <section>
              <SectionTitle>Certifications</SectionTitle>
              <ul className="space-y-1">
                {resumeCerts.map((c) => (
                  <li key={c.name} className="text-sm print:text-[11px]">
                    <span className="font-medium text-fg print:text-black">{c.name}</span>
                    <span className="block text-[10px] text-muted print:text-zinc-600">{c.issuer}</span>
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
