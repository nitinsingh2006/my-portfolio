"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight, Boxes, Star, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { fadeUp } from "@/lib/motion";

const langColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f0db4f",
  Python: "#3776ab",
  Rust: "#dea584",
  Go: "#00add8",
};

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const color = langColor[project.language] ?? "#a87cff";
  return (
    <motion.article
      variants={fadeUp}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-colors ${
        featured
          ? "border-accent/30 bg-gradient-to-b from-accent/[0.06] to-surface/60 hover:border-accent/50"
          : "border-border bg-surface/60 hover:border-accent/40"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-fg">{project.name}</h3>
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                <Star className="h-3 w-3" /> Featured
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-accent">{project.tagline}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-fg"
          >
            <Github className="h-4 w-4" />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live demo`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-fg"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-border/70 bg-bg/40 p-3">
        <Boxes className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p className="text-xs leading-relaxed text-muted">
          <span className="font-medium text-fg/80">Architecture — </span>
          {project.architecture}
        </p>
      </div>

      {project.highlights && (
        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} aria-hidden />
          {project.language}
          {project.license && <span className="ml-1 text-muted/70">· {project.license}</span>}
        </span>
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-fg"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live demo
          </a>
        ) : (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
          >
            <Github className="h-3.5 w-3.5" /> Source
          </a>
        )}
      </div>
    </motion.article>
  );
}
