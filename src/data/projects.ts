export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** One-line architecture / engineering highlight. */
  architecture: string;
  stack: string[];
  language: string;
  repo: string;
  live?: string;
  license?: string;
  featured?: boolean;
  status?: string;
  highlights?: string[];
};

/**
 * Projects sourced from github.com/nitinsingh2006. Descriptions and tech are
 * taken from each repository's own README — factual, not embellished.
 */
export const projects: Project[] = [
  {
    slug: "codequest-ai",
    name: "CodeQuest AI",
    tagline: "Gamified coding learning platform with a local AI mentor",
    description:
      "An AI-powered, gamified platform to learn Python by solving quests, battling bosses, and leveling up — with a local AI mentor that runs on Ollama, so learners aren't gated behind paid API keys.",
    architecture:
      "Next.js App Router + Prisma/Postgres, in-browser Python via Pyodide, and a local LLM (deepseek-coder via Ollama) for mentoring. Dockerized full stack.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Ollama", "Pyodide", "Docker"],
    language: "TypeScript",
    repo: "https://github.com/nitinsingh2006/codequest-ai",
    live: "https://codequest-ai-one.vercel.app",
    featured: true,
    highlights: [
      "In-browser Python execution with Pyodide (no server round-trip)",
      "Local AI mentor via Ollama — zero API cost for learners",
      "Quests, bosses, XP and a leaderboard for retention",
    ],
  },
  {
    slug: "invo",
    name: "Invo",
    tagline: "AI-powered, GST-compliant invoicing for Indian SMBs",
    description:
      "A production-ready SaaS for Indian freelancers and small businesses to create GST-compliant invoices, manage clients, take payments, and automate AI-written follow-ups.",
    architecture:
      "Next.js 14 + TypeScript, Clerk auth, Razorpay payment links, Google Gemini for personalized reminder emails, and server-side PDF generation. Freemium model.",
    stack: ["Next.js", "TypeScript", "Clerk", "Razorpay", "Gemini AI", "Tailwind"],
    language: "TypeScript",
    repo: "https://github.com/nitinsingh2006/invo",
    featured: true,
    highlights: [
      "Automatic GST calculation across 0/5/12/18/28% slabs",
      "Razorpay payment links generated straight from an invoice",
      "AI-written payment reminders via Google Gemini",
    ],
  },
  {
    slug: "portfoliosathi",
    name: "PortfolioSathi",
    tagline: "Generate a portfolio from a GitHub username + LinkedIn PDF",
    description:
      "Turns two inputs — a GitHub username and a LinkedIn PDF export — into a polished, animated developer portfolio, using only free public data and server-side parsing (no paid APIs, no AI calls).",
    architecture:
      "Next.js 14 App Router with server-side PDF parsing (pdf-parse), GitHub public REST API, three theme systems, Three.js/R3F visuals, and Zustand state persisted to local storage.",
    stack: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "Zustand", "pdf-parse"],
    language: "TypeScript",
    repo: "https://github.com/nitinsingh2006/portfoliosathi",
    highlights: [
      "Server-side LinkedIn PDF → structured profile parsing",
      "Three swappable themes (Cosmic, Minimal Pro, Terminal)",
      "100% free public data sources — no API keys required",
    ],
  },
  {
    slug: "resume-forge",
    name: "ResumeForge",
    tagline: "ATS-friendly resume builder with live preview & cloud sync",
    description:
      "A professional resume builder with live preview, multiple templates, PDF export, and cloud sync — designed to produce clean, ATS-parseable output.",
    architecture:
      "Next.js 15 + TypeScript, Prisma + database-backed cloud sync, Tailwind CSS 4, Dockerized for deployment.",
    stack: ["Next.js", "TypeScript", "Prisma", "Tailwind", "Docker"],
    language: "TypeScript",
    repo: "https://github.com/nitinsingh2006/resume-forge",
    license: "MIT",
    highlights: [
      "Live preview with multiple ATS-friendly templates",
      "PDF export + authenticated cloud sync",
    ],
  },
  {
    slug: "lead-gen-automation",
    name: "Lead-Gen Automation",
    tagline: "End-to-end automated outreach for local businesses",
    description:
      "A fully automated pipeline that finds local businesses without websites, generates demo sites with AI, deploys them to GitHub Pages, and sends personalized outreach — on a daily schedule across 12 cities.",
    architecture:
      "Python orchestrator: Apify (Google Maps) scraping → Gemini 2.5 Pro site generation → GitHub Pages deploy → Hinglish outreach email, with daily reports and multi-city rotation.",
    stack: ["Python", "Gemini 2.5 Pro", "Apify", "GitHub Pages", "Automation"],
    language: "Python",
    repo: "https://github.com/nitinsingh2006/lead-gen-automation",
    highlights: [
      "Scrape → generate → deploy → email, fully unattended",
      "AI-generated demo sites per lead via Gemini 2.5 Pro",
      "Scheduled daily runs rotating across 12 Indian cities",
    ],
  },
  {
    slug: "github-roaster",
    name: "GitHub Roaster",
    tagline: "AI that roasts your GitHub profile",
    description:
      "A playful Next.js app that pulls a GitHub profile and generates an AI 'roast' — a fun, shareable take on someone's public activity.",
    architecture: "Next.js App Router + GitHub API, with an LLM generating the roast copy.",
    stack: ["Next.js", "TypeScript", "GitHub API", "LLM"],
    language: "TypeScript",
    repo: "https://github.com/nitinsingh2006/github-roaster",
    highlights: ["Shareable, fun developer-marketing hook"],
  },
];

export const flagship = {
  name: "Nitin-AI",
  tagline: "Open-source AI workstation for local and cloud models",
  pitch:
    "One desktop app for every AI provider — run local models for free, bring your own cloud keys, and drive coding agents in a sandbox. No middleman. No resold credits. Your keys stay on your machine.",
  why: "Most AI apps are a thin client in front of one vendor's billing. Nitin-AI is the opposite: a trusted local core (Rust + Tauri) that talks directly to whatever provider you choose — a local Ollama model, your own OpenAI/Anthropic key, or an agentic CLI like Claude Code — and keeps your secrets in the OS keychain. There is no Nitin-AI server in the request path.",
  repo: "https://github.com/nitinsingh2006/Nitin-AI",
  status: "v0.1.0-beta",
  license: "Apache-2.0",
  pillars: [
    "Local-first",
    "Provider-agnostic",
    "Bring your own account",
    "Never sells credits",
  ],
  features: [
    {
      title: "Unified streaming chat",
      detail: "One chat across local and cloud providers, with full conversation history.",
    },
    {
      title: "Agent workspace",
      detail: "Drive Claude Code, Gemini CLI, Codex, and OpenCode from a single panel.",
    },
    {
      title: "Built-in sandboxed agent",
      detail:
        "A workdir jail with per-action approval and an auditable log; runaway commands are actually killed on timeout.",
    },
    {
      title: "Local model management",
      detail: "Pull, list, and remove Ollama models with live progress.",
    },
    {
      title: "Secrets in the OS keychain",
      detail: "API keys are stored in the OS keychain as zeroized leases — never logged or serialized.",
    },
    {
      title: "Keyboard-first, dark UI",
      detail: "Ctrl/Cmd+1..5 to switch tabs; persistence verified with on-disk restart tests.",
    },
  ],
  architecture: {
    summary:
      "Two processes, a trusted Rust core, and a strict trust gradient. Secrets never leave the core; AI traffic always goes device → provider directly.",
    layers: [
      {
        name: "React + TypeScript frontend",
        note: "Presentation only — no secrets, no provider access.",
      },
      {
        name: "Tauri IPC",
        note: "A single typed chokepoint between UI and core.",
      },
      {
        name: "Rust core (Tauri v2) — trusted",
        note: "Provider registry · agent runtime (jail · approval · log) · auth + secrets (OS keychain) · SQLite (WAL).",
      },
      {
        name: "Local runtimes & cloud APIs",
        note: "Ollama / LM Studio locally; your own cloud accounts and agent CLIs — no middleman.",
      },
    ],
  },
  crates: [
    "nitin-contracts — cross-boundary types (mirrored in TS)",
    "nitin-db — SQLite persistence + migrations",
    "nitin-secrets — OS keychain + zeroizing leases",
    "nitin-providers — registry + Local/Chat/Agent adapters",
    "nitin-agent-runtime — sandbox · approval · exec",
    "nitin-auth — credential storage + state machine",
    "nitin-core — composition root + IPC handlers",
  ],
  providers: [
    { name: "Ollama", family: "Local", status: "live" },
    { name: "Claude Code", family: "Agent", status: "live" },
    { name: "Gemini CLI", family: "Agent", status: "live" },
    { name: "Codex", family: "Agent", status: "live" },
    { name: "OpenCode", family: "Agent", status: "live" },
    { name: "OpenAI", family: "Chat API", status: "mock-tested" },
    { name: "Anthropic", family: "Chat API", status: "mock-tested" },
    { name: "Gemini API", family: "Chat API", status: "mock-tested" },
    { name: "OpenRouter", family: "Chat API", status: "mock-tested" },
    { name: "LM Studio", family: "Local", status: "code-complete" },
  ],
  roadmap: [
    { text: "Local + agent providers validated live", done: true },
    { text: "Security hardening pass (key-leak redaction, sandbox timeout-kill)", done: true },
    { text: "In-flight cancellation / stop for chat & agents", done: false },
    { text: "Signed installers for Windows / macOS / Linux", done: false },
    { text: "First-run onboarding + connect-a-provider flow", done: false },
    { text: "Nitin Account — optional sign-in, settings & chat sync", done: false },
    { text: "Opt-in encrypted DB at rest", done: false },
  ],
} as const;
