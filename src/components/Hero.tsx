"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, FileText, MapPin } from "lucide-react";
import { site } from "@/data/site";
import type { GitHubStats } from "@/lib/github";
import { RobotHero } from "./RobotHero";

const roles = ["Full-Stack Developer", "AI Engineer", "Rust + Tauri Builder", "Open-Source Maker"];

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block align-baseline text-accent">
      <motion.span
        key={i}
        initial={{ opacity: 0, y: "0.4em" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {roles[i]}
      </motion.span>
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ stats }: { stats: GitHubStats }) {
  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] glow" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-10 -z-10 hidden h-[520px] w-[520px] aurora lg:block" aria-hidden />

      <div className="container-page pb-16 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* Copy column */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {site.availability}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.1rem]"
            >
              {site.name} —{" "}
              <span className="text-gradient text-glow">{site.role}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-lg text-muted sm:text-2xl"
            >
              <span>Currently a</span>
              <RotatingRole />
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
            >
              {site.subhead}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                View my work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/50"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
              <a
                href={site.resumeUrl}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                <FileText className="h-4 w-4" />
                Résumé
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" />
                {site.location}
              </span>
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="link-underline">
                <Github className="h-4 w-4" /> @{site.githubUser}
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </motion.div>
          </motion.div>

          {/* Robot column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="order-first lg:order-last"
          >
            <RobotHero />
          </motion.div>
        </div>

        {/* Quick stats */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
        >
          {[
            { k: `${stats.repos}+`, v: "Public repos" },
            { k: "7", v: "Real products" },
            { k: "Rust · TS · Py", v: "Daily drivers" },
            { k: `Since ${stats.memberSince}`, v: "Shipping in public" },
          ].map((s) => (
            <div key={s.v} className="bg-surface px-4 py-5">
              <dt className="font-mono text-lg font-semibold text-fg sm:text-xl">{s.k}</dt>
              <dd className="mt-1 text-xs text-muted">{s.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
