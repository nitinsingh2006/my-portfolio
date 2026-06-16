"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Original, lightweight AI-robot companion for the hero — an SVG character that
 * tracks the cursor, blinks, "talks" with an equalizer mouth, and floats inside
 * a rotating energy ring with orbiting tech nodes. Pure SVG + transforms (no
 * WebGL), so it stays cheap on the main thread and respects reduced motion.
 *
 * This recreates the signature "robot" experience of the deployed portfolio
 * without shipping a heavy 3D engine — keeping Lighthouse green.
 */

const ORBIT_NODES = ["Rust", "AI", "TS"];

export function RobotHero() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Pointer → spring-smoothed motion values that drive eyes + head tilt.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.4 });

  const eyeX = useTransform(sx, [-1, 1], [-7, 7]);
  const eyeY = useTransform(sy, [-1, 1], [-5, 5]);
  const headTilt = useTransform(sx, [-1, 1], [4, -4]);
  const headShift = useTransform(sx, [-1, 1], [-5, 5]);

  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      px.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 1.4))));
      py.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 1.4))));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      setBlink(true);
      t = setTimeout(() => {
        setBlink(false);
        t = setTimeout(loop, 2200 + Math.random() * 2600);
      }, 130);
    };
    t = setTimeout(loop, 1800);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      aria-hidden
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/20 blur-[90px]" />

      {/* Rotating energy ring */}
      <div className="absolute inset-[8%] rounded-full p-px">
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
      <div className="absolute inset-[14%] rounded-full border border-border/70" />
      <div className="absolute inset-[20%] rounded-full border border-dashed border-accent/15" />

      {/* Orbiting tech nodes */}
      {!reduce && (
        <motion.div
          className="absolute inset-[14%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
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
                  className="absolute -translate-x-1/2 rounded-full border border-accent/40 bg-surface/90 px-2 py-0.5 font-mono text-[10px] text-accent backdrop-blur-sm"
                  style={{ top: "-9px" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                >
                  {label}
                </motion.span>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* The robot */}
      <motion.div
        className={`absolute inset-0 grid place-items-center ${reduce ? "" : "animate-float"}`}
        style={reduce ? undefined : { x: headShift, rotate: headTilt }}
      >
        <svg
          viewBox="0 0 400 400"
          className="h-[78%] w-[78%] drop-shadow-[0_24px_50px_rgba(168,124,255,0.25)]"
          role="img"
          aria-label="Animated AI robot companion"
        >
          <defs>
            <linearGradient id="r-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#231a2e" />
              <stop offset="1" stopColor="#0d0a12" />
            </linearGradient>
            <radialGradient id="r-visor" cx="0.5" cy="0.4" r="0.8">
              <stop offset="0" stopColor="#1b1326" />
              <stop offset="1" stopColor="#08060b" />
            </radialGradient>
            <linearGradient id="r-accent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#c2a4ff" />
              <stop offset="1" stopColor="#a87cff" />
            </linearGradient>
            <filter id="r-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Antenna */}
          <line x1="200" y1="96" x2="200" y2="70" stroke="#5b4d72" strokeWidth="4" strokeLinecap="round" />
          <motion.circle
            cx="200"
            cy="64"
            r="7"
            fill="url(#r-accent)"
            filter="url(#r-glow)"
            animate={reduce ? undefined : { opacity: [0.55, 1, 0.55], scale: [1, 1.18, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "200px 64px" }}
          />

          {/* Side modules ("ears") */}
          <rect x="104" y="150" width="16" height="44" rx="7" fill="url(#r-body)" stroke="#3a3048" strokeWidth="2" />
          <rect x="280" y="150" width="16" height="44" rx="7" fill="url(#r-body)" stroke="#3a3048" strokeWidth="2" />
          <circle cx="112" cy="172" r="3" fill="#a87cff" />
          <circle cx="288" cy="172" r="3" fill="#a87cff" />

          {/* Head shell */}
          <rect x="118" y="98" width="164" height="138" rx="40" fill="url(#r-body)" stroke="#4a3d5e" strokeWidth="2" />
          <rect x="118" y="98" width="164" height="138" rx="40" fill="none" stroke="#c2a4ff" strokeOpacity="0.18" strokeWidth="1" />

          {/* Visor */}
          <rect x="136" y="120" width="128" height="94" rx="28" fill="url(#r-visor)" stroke="#2a2234" strokeWidth="2" />

          {/* Scan line */}
          {!reduce && (
            <motion.rect
              x="140"
              width="120"
              height="2.5"
              rx="1.25"
              fill="#c2a4ff"
              opacity="0.5"
              animate={{ y: [126, 206, 126] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Eyes (cursor-tracking + blink) */}
          <motion.g
            filter="url(#r-glow)"
            style={reduce ? undefined : { x: eyeX, y: eyeY }}
          >
            <motion.rect
              x="163"
              y="150"
              width="26"
              height="30"
              rx="13"
              fill="url(#r-accent)"
              animate={{ scaleY: blink ? 0.1 : 1 }}
              transition={{ duration: 0.1 }}
              style={{ transformOrigin: "176px 165px" }}
            />
            <motion.rect
              x="211"
              y="150"
              width="26"
              height="30"
              rx="13"
              fill="url(#r-accent)"
              animate={{ scaleY: blink ? 0.1 : 1 }}
              transition={{ duration: 0.1 }}
              style={{ transformOrigin: "224px 165px" }}
            />
          </motion.g>

          {/* Equalizer "mouth" */}
          <g>
            {[0, 1, 2, 3].map((i) => (
              <motion.rect
                key={i}
                x={172 + i * 16}
                width="7"
                rx="3.5"
                fill="#a87cff"
                opacity="0.85"
                animate={
                  reduce
                    ? { y: 192, height: 8 }
                    : { height: [6, 16, 9, 14, 6], y: [193, 188, 191, 189, 193] }
                }
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.12,
                }}
              />
            ))}
          </g>

          {/* Neck + chest core */}
          <rect x="188" y="232" width="24" height="20" fill="url(#r-body)" stroke="#3a3048" strokeWidth="2" />
          <rect x="150" y="248" width="100" height="74" rx="26" fill="url(#r-body)" stroke="#4a3d5e" strokeWidth="2" />
          <motion.circle
            cx="200"
            cy="285"
            r="15"
            fill="url(#r-accent)"
            filter="url(#r-glow)"
            animate={reduce ? undefined : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "200px 285px" }}
          />
          <circle cx="200" cy="285" r="6" fill="#0b080c" opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  );
}
