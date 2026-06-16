import {
  Code2,
  LayoutDashboard,
  Server,
  BrainCircuit,
  Database,
  Cloud,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { stack } from "@/data/stack";
import { SectionHeading } from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";

const domainIcon: Record<string, LucideIcon> = {
  Languages: Code2,
  Frontend: LayoutDashboard,
  Backend: Server,
  "AI / ML": BrainCircuit,
  Databases: Database,
  "DevOps & Cloud": Cloud,
  Security: ShieldCheck,
};

export function TechStack() {
  return (
    <section id="stack" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Toolbox"
          title="Tech stack, by domain."
          description="What I reach for across frontend, backend, AI, data, and infrastructure."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((cat) => {
            const Icon = domainIcon[cat.domain] ?? Code2;
            return (
              <RevealItem
                key={cat.domain}
                className="card p-5 transition-colors hover:border-accent/40"
              >
                <h3 className="flex items-center gap-2.5 text-sm font-semibold text-fg">
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  {cat.domain}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {cat.items.map((i) => (
                    <li key={i} className="chip text-fg/80">
                      {i}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
