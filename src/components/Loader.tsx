"use client";

import { useEffect, useState } from "react";

/**
 * Brief intro reveal echoing the deployed portfolio's premium loading screen —
 * an expanding-circle wipe over a brand mark. Kept short (~1.2s) and CSS-driven;
 * skipped entirely for reduced-motion users and on repeat visits within a
 * session, so it never blocks content or hurts perceived performance.
 */
export function Loader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen =
      typeof window !== "undefined" && sessionStorage.getItem("intro-seen") === "1";

    if (reduce || seen) {
      setPhase("done");
      return;
    }

    sessionStorage.setItem("intro-seen", "1");
    const t1 = setTimeout(() => setPhase("out"), 950);
    const t2 = setTimeout(() => setPhase("done"), 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className="no-print fixed inset-0 z-[9999] grid place-items-center bg-bg"
      style={
        phase === "out"
          ? { animation: "loader-out 0.8s cubic-bezier(0.65,0,0.35,1) forwards" }
          : undefined
      }
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-64 -translate-y-1/2 glow" />
      <div className="flex flex-col items-center gap-6">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-accent/40 bg-surface font-mono text-xl font-semibold text-accent">
          NS
        </div>
        <div className="relative h-px w-40 overflow-hidden rounded-full bg-border">
          <span
            className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
            style={{ animation: "loader-sweep 1s ease-in-out infinite" }}
          />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          Booting workstation
        </p>
      </div>
    </div>
  );
}
