"use client";

import { useState, useRef } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { site } from "@/data/site";
import type { ContributionsData, ContribDay } from "@/lib/github/types";

const LEVEL_BG: Record<number, string> = {
  0: "bg-surface-2 hover:border-accent/40 border border-transparent",
  1: "bg-accent/30 hover:bg-accent/40 border border-accent/20",
  2: "bg-accent/55 hover:bg-accent/65 border border-accent/30",
  3: "bg-accent/80 hover:bg-accent/90 border border-accent/40 shadow-[0_0_8px_rgba(194,164,255,0.3)]",
  4: "bg-accent hover:bg-accent/90 border border-accent/60 shadow-[0_0_12px_rgba(194,164,255,0.5)]",
};

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

export function ContributionGraph({ data }: { data: ContributionsData | null }) {
  const [activeDay, setActiveDay] = useState<{
    day: ContribDay;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  if (!data || !data.weeks || data.weeks.length === 0) {
    return null;
  }

  const handleDayHoverOrTap = (
    day: ContribDay,
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Relative to graph container
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setActiveDay({ day, x, y });
  };

  const handleMouseLeave = () => {
    setActiveDay(null);
  };

  return (
    <div className="card relative p-6">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-fg">
            <Calendar className="h-4 w-4 text-accent" />
            Contribution Activity
          </h3>
          <p className="mt-0.5 text-xs text-muted">
            Public contribution history over the past year
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 font-mono text-xs font-medium text-accent backdrop-blur-sm">
            <span className="font-bold">{data.total.toLocaleString()}</span> contributions in the last year
          </div>
        </div>
      </div>

      {/* Interactive Tooltip popup */}
      {activeDay && (
        <div
          className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-xl border border-accent/40 bg-surface/95 px-3 py-2 text-center text-xs shadow-2xl backdrop-blur-md transition-all duration-150"
          style={{
            left: `${Math.max(80, Math.min(activeDay.x, (containerRef.current?.offsetWidth || 600) - 80))}px`,
            top: `${Math.max(10, activeDay.y - 12)}px`,
          }}
        >
          <div className="font-semibold text-fg">
            {activeDay.day.count === 1
              ? "1 contribution"
              : `${activeDay.day.count.toLocaleString()} contributions`}{" "}
            <span className="font-normal text-muted">on</span>
          </div>
          <div className="font-mono text-[11px] text-accent">{activeDay.day.displayDate}</div>
        </div>
      )}

      {/* Contribution Calendar Grid */}
      <div
        ref={containerRef}
        onMouseLeave={handleMouseLeave}
        className="relative mt-6 overflow-x-auto pb-2 pt-1 select-none"
      >
        <div className="inline-block min-w-[720px]">
          {/* Month labels row */}
          <div className="mb-2 flex h-4 text-[11px] font-medium text-muted pl-8">
            {data.weeks.map((_, weekIdx) => {
              const monthLabel = data.months.find((m) => m.weekIndex === weekIdx);
              return (
                <div key={weekIdx} className="w-[15px] shrink-0 text-left">
                  {monthLabel ? <span>{monthLabel.name}</span> : null}
                </div>
              );
            })}
          </div>

          {/* Grid area with day labels and squares */}
          <div className="flex gap-2">
            {/* Weekday labels column */}
            <div className="grid grid-rows-7 gap-[3px] pr-1 text-[10px] font-mono text-muted">
              {WEEKDAYS.map((label, idx) => (
                <div key={idx} className="h-[12px] leading-[12px] text-right">
                  {label}
                </div>
              ))}
            </div>

            {/* Weeks columns */}
            <div className="flex gap-[3px]">
              {data.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="grid grid-rows-7 gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      tabIndex={0}
                      role="button"
                      aria-label={`${day.count} contributions on ${day.displayDate}`}
                      onMouseEnter={(e) => handleDayHoverOrTap(day, e)}
                      onTouchStart={(e) => handleDayHoverOrTap(day, e)}
                      onFocus={(e) => {
                        if (!containerRef.current) return;
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        const cRect = containerRef.current.getBoundingClientRect();
                        setActiveDay({
                          day,
                          x: rect.left - cRect.left + rect.width / 2,
                          y: rect.top - cRect.top,
                        });
                      }}
                      className={`h-[12px] w-[12px] cursor-pointer rounded-[3px] transition-all duration-100 ${
                        LEVEL_BG[day.level]
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer controls: Legend + Sync Status + GitHub CTA */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-4 text-xs text-muted">
        {/* Legend */}
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_BG[level]}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>

        {/* Sync indicator & CTA */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live GitHub sync active
          </span>
          <a
            href={`https://github.com/${site.githubUser}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1 font-medium text-accent hover:text-accent/80"
          >
            View on GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
