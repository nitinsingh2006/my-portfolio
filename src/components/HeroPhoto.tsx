"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ORBIT_NODES = ["Rust", "AI", "TS"];

export function HeroPhoto() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/20 blur-[90px]" />

      {/* Rotating energy ring */}
      <div className="absolute inset-[4%] rounded-full p-px">
        <div
          className={`h-full w-full rounded-full conic-ring opacity-70 ${
            reduce ? "" : "animate-spin-slow"
          }`}
          style={{
            WebkitMask: "radial-gradient(closest-side, transparent 78%, #000 79%)",
            mask: "radial-gradient(closest-side, transparent 78%, #000 79%)",
          }}
        />
      </div>
      <div className="absolute inset-[10%] rounded-full border border-border/70" />
      <div className="absolute inset-[16%] rounded-full border border-dashed border-accent/20" />

      {/* Orbiting tech nodes */}
      {!reduce && (
        <motion.div
          className="absolute inset-[10%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {ORBIT_NODES.map((label, i) => {
            const angle = (i / ORBIT_NODES.length) * 360;
            return (
              <div
                key={label}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `rotate(${angle}deg) translateY(-50%)` }}
              >
                <motion.span
                  className="absolute -translate-x-1/2 rounded-full border border-accent/40 bg-surface/90 px-2.5 py-1 font-mono text-[11px] font-medium text-accent backdrop-blur-md shadow-lg"
                  style={{ top: "-10px" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, ease: "linear", repeat: Infinity }}
                >
                  {label}
                </motion.span>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Hero profile photo inside circular frame */}
      <motion.div
        className="absolute inset-[18%] grid place-items-center overflow-hidden rounded-full border-2 border-accent/40 bg-surface/80 p-1.5 shadow-[0_0_50px_rgba(194,164,255,0.25)] backdrop-blur-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src="/profile.jpg"
            alt="Nitin Singh — Full-Stack & AI Developer"
            fill
            sizes="(max-width: 768px) 280px, 340px"
            priority
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </motion.div>

      {/* Floating status pill */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-accent/30 bg-surface/90 px-3.5 py-1.5 shadow-xl backdrop-blur-md"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="flex items-center gap-2 text-xs font-medium text-fg">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to Opportunities
        </span>
      </motion.div>
    </div>
  );
}
