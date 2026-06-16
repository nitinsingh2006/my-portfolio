/**
 * Resume-specific content. Every line is a re-framing of facts already present in
 * site.ts / projects.ts / stack.ts — nothing new is invented.
 */

export const resumeSummary =
  "Full-Stack + AI developer (B.Tech CSE '28, IIST Indore) who ships production software end to end. " +
  "Creator of Nitin-AI, an open-source, local-first AI workstation in Rust + Tauri. Experienced across " +
  "Next.js/TypeScript front-ends, Node/Python services, and applied LLM tooling, with a security-first " +
  "mindset (CEH) and a strong bias for shipping.";

export type ResumeExperience = {
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
  tech?: string[];
};

/** Experience framed for a CV — sourced from the flagship + projects + timeline. */
export const resumeExperience: ResumeExperience[] = [
  {
    role: "Creator & Lead Engineer — Nitin-AI (open source)",
    org: "Rust + Tauri · v0.1.0-beta · Apache-2.0",
    period: "2026 — Present",
    bullets: [
      "Designed and built a local-first, provider-agnostic AI desktop app across 7 Rust crates with a typed Tauri IPC boundary between a React/TS UI and a trusted Rust core.",
      "Implemented a sandboxed agent runtime (workdir jail, per-action approval, auditable log, timeout-kill) and a provider registry unifying Ollama, OpenAI, Anthropic, Gemini, OpenRouter and agent CLIs.",
      "Hardened secrets handling: API keys stored in the OS keychain as zeroized leases — never logged or serialized; no server sits in the AI request path.",
    ],
    tech: ["Rust", "Tauri", "TypeScript", "SQLite", "Ollama"],
  },
  {
    role: "Independent Full-Stack + AI Developer",
    org: "Building in public · GitHub @nitinsingh2006",
    period: "2025 — Present",
    bullets: [
      "Shipped CodeQuest AI — a gamified Python-learning platform with in-browser execution (Pyodide) and a local AI mentor (Ollama), on Next.js + Prisma/Postgres, fully Dockerized.",
      "Built Invo — a GST-compliant invoicing SaaS for Indian SMBs with Clerk auth, Razorpay payment links, and AI-written reminders via Google Gemini.",
      "Automated end-to-end lead generation in Python (Apify → Gemini site generation → GitHub Pages deploy → outreach) running daily across 12 cities.",
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Python", "Gemini"],
  },
];
