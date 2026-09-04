"use client";

import { Award, ExternalLink, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";
import { site } from "@/data/site";
import type { GitHubAchievementData } from "@/lib/github";
import type { AchievementTier } from "@/data/achievements";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const TIER_COLORS: Record<AchievementTier, { badge: string; text: string; border: string }> = {
  default: {
    badge: "bg-accent/10 text-accent border-accent/30",
    text: "text-accent",
    border: "border-accent/30",
  },
  bronze: {
    badge: "bg-amber-950/40 text-amber-400 border-amber-600/40",
    text: "text-amber-400",
    border: "border-amber-600/40",
  },
  silver: {
    badge: "bg-slate-800/50 text-slate-300 border-slate-400/40",
    text: "text-slate-300",
    border: "border-slate-400/40",
  },
  gold: {
    badge: "bg-yellow-950/40 text-yellow-300 border-yellow-500/50",
    text: "text-yellow-300",
    border: "border-yellow-500/50",
  },
};

function formatSyncTime(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recently";
  }
}

export function Achievements({ data }: { data: GitHubAchievementData }) {
  const { achievements, lastSyncedAt, source } = data;

  return (
    <section id="achievements" className="section relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-96 -translate-y-1/2 opacity-40 blur-3xl glow"
        aria-hidden
      />

      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="GitHub Achievements"
            title="Verified open-source recognition."
            description="Real achievements earned through open-source contributions on GitHub."
          />
          <a
            href={`${site.socials.github}?tab=achievements`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline shrink-0 text-sm"
          >
            <Award className="h-4 w-4 text-accent" /> View on GitHub <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-10">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item) => {
              const tierStyle = TIER_COLORS[item.tier] ?? TIER_COLORS.default;

              return (
                <RevealItem key={item.slug}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
                    {/* Top ambient glow on hover */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgb(var(--accent)), transparent)",
                      }}
                      aria-hidden
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-surface-2/80 p-2.5 shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:border-accent/40">
                        {/* Soft icon background glow */}
                        <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-sm" aria-hidden />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.iconUrl}
                          alt={`GitHub Achievement badge: ${item.name}`}
                          className="relative z-10 h-full w-full object-contain"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            // Graceful fallback icon if CDN image fails
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement?.classList.add("achievement-fallback-icon");
                          }}
                        />
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${tierStyle.badge}`}
                        >
                          <ShieldCheck className="h-3 w-3" />
                          {item.tier !== "default" ? item.tier : "Verified"}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted/70">
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" /> GitHub Verified
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex-1">
                      <h3 className="font-display text-lg font-semibold text-fg transition-colors group-hover:text-accent">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-fg"
                      >
                        Verify on profile <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal className="mt-6 flex items-center justify-between text-xs text-muted/70">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <RefreshCw className="h-3 w-3 text-muted/50" />
              <span>
                Synced with GitHub {formatSyncTime(lastSyncedAt)} ({source === "live" ? "Live ISR" : "Verified Fallback"})
              </span>
            </div>
            <span className="hidden font-mono text-[11px] sm:inline">
              Auto-syncs when new achievements unlock
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
