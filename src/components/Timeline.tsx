import { GraduationCap, Award, Rocket, Milestone } from "lucide-react";
import { timeline, certifications, type TimelineItem } from "@/data/stack";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const icons: Record<TimelineItem["kind"], typeof Award> = {
  education: GraduationCap,
  cert: Award,
  work: Rocket,
  milestone: Milestone,
};

export function Timeline() {
  return (
    <section id="journey" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Journey"
          title="Learning, milestones & credentials."
          description="The path from coursework to shipping production AI tools."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ol className="relative border-l border-border pl-8">
            {timeline.map((t, i) => {
              const Icon = icons[t.kind];
              return (
                <Reveal key={t.title} delay={i * 0.05}>
                  <li className="relative pb-9 last:pb-0">
                    <span className="absolute -left-[42px] grid h-7 w-7 place-items-center rounded-full border border-border bg-surface text-accent">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-mono text-xs text-accent">{t.period}</span>
                    <h3 className="mt-1 font-display font-semibold text-fg">{t.title}</h3>
                    <p className="text-sm text-muted">{t.org}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.detail}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          <Reveal className="h-fit card p-6">
            <h3 className="flex items-center gap-2 font-display font-semibold">
              <Award className="h-5 w-5 text-accent" /> Certifications
            </h3>
            <RevealGroup className="mt-4 space-y-3">
              {certifications.map((c) => (
                <RevealItem
                  key={c.name}
                  className="rounded-xl border border-border bg-bg/40 p-3"
                >
                  <p className="text-sm font-medium text-fg">{c.name}</p>
                  <p className="text-xs text-muted">{c.issuer}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
