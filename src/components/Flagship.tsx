import { Github, ShieldCheck, Check, Circle } from "lucide-react";
import { flagship } from "@/data/projects";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const statusStyle: Record<string, string> = {
  live: "text-accent border-accent/40 bg-accent/10",
  "mock-tested": "text-amber-400 border-amber-400/30 bg-amber-400/10",
  "code-complete": "text-muted border-border bg-surface-2",
};

export function Flagship() {
  return (
    <section id="nitin-ai" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60" aria-hidden />
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-accent" aria-hidden />
            Flagship · Open source
          </span>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              {flagship.name}
            </h2>
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted">
              {flagship.status}
            </span>
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted">
              {flagship.license}
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-pretty text-lg text-fg/90">{flagship.tagline}</p>
          <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-muted">{flagship.pitch}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {flagship.pillars.map((p) => (
              <span key={p} className="chip border-accent/30 text-accent">
                {p}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={flagship.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              <Github className="h-4 w-4" /> View on GitHub
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* Architecture */}
          <Reveal className="card p-6">
            <h3 className="font-display text-lg font-semibold">Architecture</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{flagship.architecture.summary}</p>
            <ol className="mt-5 space-y-3">
              {flagship.architecture.layers.map((l, i) => (
                <li key={l.name} className="relative rounded-xl border border-border bg-bg/40 p-4">
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-surface-2 font-mono text-xs text-accent">
                      {i + 1}
                    </span>
                    <span className="font-medium text-fg">{l.name}</span>
                  </div>
                  <p className="mt-1.5 pl-8 text-xs leading-relaxed text-muted">{l.note}</p>
                </li>
              ))}
            </ol>
            <div className="mt-5">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Rust workspace</p>
              <ul className="mt-2 grid gap-1.5">
                {flagship.crates.map((c) => (
                  <li key={c} className="font-mono text-xs text-muted">
                    <span className="text-accent">▸</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Features + providers */}
          <div className="flex flex-col gap-5">
            <RevealGroup className="card grid gap-px overflow-hidden bg-border sm:grid-cols-2">
              {flagship.features.map((f) => (
                <RevealItem key={f.title} className="bg-surface p-4">
                  <h4 className="text-sm font-semibold text-fg">{f.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{f.detail}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="card p-6">
              <h3 className="font-display text-lg font-semibold">Provider matrix</h3>
              <p className="mt-1 text-xs text-muted">
                One unified registry · <span className="text-accent">live</span> = validated end-to-end
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {flagship.providers.map((p) => (
                  <li
                    key={p.name}
                    className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${
                      statusStyle[p.status] ?? "border-border text-muted"
                    }`}
                    title={`${p.family} · ${p.status}`}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Roadmap + security */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal className="card p-6">
            <h3 className="font-display text-lg font-semibold">Roadmap</h3>
            <ul className="mt-4 space-y-2.5">
              {flagship.roadmap.map((r) => (
                <li key={r.text} className="flex items-start gap-2.5 text-sm">
                  {r.done ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted/50" />
                  )}
                  <span className={r.done ? "text-muted line-through decoration-border" : "text-fg/90"}>
                    {r.text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="card p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <ShieldCheck className="h-5 w-5 text-accent" /> Why it matters
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{flagship.why}</p>
            <p className="mt-4 rounded-xl border border-border bg-bg/40 p-3 text-xs leading-relaxed text-muted">
              Secrets live <span className="text-fg">only</span> in the OS keychain as zeroized leases —
              never logged or serialized. The built-in agent runs in a workdir jail with path-traversal
              protection and timeout-bounded processes. <span className="text-accent">No Nitin-AI server</span>{" "}
              sits in the AI request path.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
