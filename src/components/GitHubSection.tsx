import { Github, GitBranch, Users, Calendar, Star, GitFork, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import type { GitHubStats } from "@/lib/github";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const langColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f0db4f",
  Python: "#3776ab",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Go: "#00add8",
  Shell: "#89e051",
};

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function GitHubSection({ stats }: { stats: GitHubStats }) {
  const statItems = [
    { icon: GitBranch, k: `${stats.repos}`, v: "Public repositories" },
    { icon: Star, k: `${stats.totalStars}`, v: "Stars earned" },
    { icon: Users, k: `${stats.followers}`, v: "Followers" },
    { icon: Calendar, k: stats.memberSince, v: "Member since" },
  ];

  return (
    <section id="github" className="section">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Open source"
            title="Building in the open."
            description="Live from the GitHub API — refreshed every 20 minutes."
          />
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline shrink-0 text-sm"
          >
            <Github className="h-4 w-4" /> @{site.githubUser}
          </a>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:col-span-1 lg:grid-cols-2">
            {statItems.map((s) => (
              <div key={s.v} className="flex flex-col gap-1 bg-surface p-5">
                <s.icon className="h-4 w-4 text-accent" />
                <span className="font-mono text-2xl font-semibold text-fg">{s.k}</span>
                <span className="text-xs text-muted">{s.v}</span>
              </div>
            ))}
          </Reveal>

          <Reveal className="card p-6 lg:col-span-2">
            <h3 className="font-display font-semibold">Top languages</h3>
            <div
              className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-bg"
              role="img"
              aria-label="Language distribution"
            >
              {stats.topLanguages.map((l) => (
                <span
                  key={l.name}
                  style={{ width: `${l.percent}%`, background: langColor[l.name] ?? "#a87cff" }}
                  title={`${l.name} ${l.percent}%`}
                />
              ))}
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {stats.topLanguages.map((l) => (
                <li key={l.name} className="flex items-center gap-2 text-sm text-muted">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: langColor[l.name] ?? "#a87cff" }}
                    aria-hidden
                  />
                  {l.name} <span className="font-mono text-xs text-muted/70">{l.percent}%</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Latest repositories */}
        {stats.latestRepos.length > 0 && (
          <div className="mt-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display font-semibold">Latest repositories</h3>
              <a
                href={`${site.socials.github}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm"
              >
                View all <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stats.latestRepos.map((r) => (
                <RevealItem key={r.name}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-mono text-sm font-medium text-fg">
                        <Github className="h-4 w-4 text-muted" />
                        {r.name}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                    <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
                      {r.description ?? "No description provided."}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                      {r.language && (
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: langColor[r.language] ?? "#a87cff" }}
                            aria-hidden
                          />
                          {r.language}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Star className="h-3.5 w-3.5" /> {r.stars}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono">
                        <GitFork className="h-3.5 w-3.5" /> {r.forks}
                      </span>
                      <span className="ml-auto font-mono text-muted/70">{relativeTime(r.updatedAt)}</span>
                    </div>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}

        {/* Contribution graph (no API key required) — cache-busted per 20-min window */}
        <Reveal className="mt-5 card overflow-hidden p-6">
          <h3 className="font-display font-semibold">Contribution activity</h3>
          <p className="mt-1 text-xs text-muted">Public contributions over the past year</p>
          <div className="mt-5 overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/a87cff/${site.githubUser}?v=${Math.floor(Date.now() / 1_200_000)}`}
              alt={`GitHub contribution graph for ${site.githubUser}`}
              loading="lazy"
              decoding="async"
              width={840}
              height={128}
              className="min-w-[640px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
