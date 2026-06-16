import { Sparkles } from "lucide-react";
import { about } from "@/data/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="About"
          title="A student who learns by shipping."
          description="From DSA practice to production AI products in under a year — here's how I think and what I'm building."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="space-y-5 text-pretty leading-relaxed text-muted">
            {about.paragraphs.map((p, idx) => (
              <p key={idx} className={idx === 0 ? "text-lg text-fg/90" : ""}>
                {p}
              </p>
            ))}

            <div className="!mt-8 rounded-2xl border border-border bg-surface/60 p-5">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <Sparkles className="h-4 w-4" /> Currently focused on
              </p>
              <ul className="mt-3 space-y-2">
                {about.currentFocus.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-fg/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {about.strengths.map((s) => (
              <RevealItem
                key={s.title}
                className="card p-5 transition-colors hover:border-accent/40"
              >
                <h3 className="font-display font-semibold text-fg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
