# Nitin Singh — Portfolio

A production-grade personal portfolio for **Nitin Singh**, Full-Stack + AI Developer. Dark-theme, mobile-first, server-rendered, SEO-complete, and built around real GitHub projects — led by the flagship **[Nitin-AI](https://github.com/nitinsingh2006/Nitin-AI)** (an open-source AI workstation in Rust + Tauri).

> This repository is a ground-up **reconstruction and redesign** of a previously-lost portfolio. See [`RECOVERY_REPORT.md`](RECOVERY_REPORT.md) for how the original was reverse-engineered and [`PORTFOLIO_AUDIT.md`](PORTFOLIO_AUDIT.md) for the redesign rationale.

## Tech stack

- **Next.js 15** (App Router, Server Components, SSG + ISR)
- **TypeScript** (strict)
- **Tailwind CSS 3.4** (token-driven, channel-triplet color system)
- **Framer Motion 11** (reduced-motion aware)
- **lucide-react** icons
- Live **GitHub API** integration · dynamic **OG image** via `next/og` · `Person` **JSON-LD**

## Highlights

- 🌑 dark, mobile-first, WCAG-AA accessible (skip link, focus rings, labelled icons, reduced-motion)
- ⚡ ~147 kB First Load JS, statically prerendered, GitHub stats via hourly ISR
- 🔎 Full SEO: metadata, OpenGraph, Twitter, sitemap, robots, manifest, structured data
- 🧩 All content lives in `src/data/` — edit one file, not the components

---

## Getting started

### Prerequisites
- **Node.js 20+** and npm

### Install & run

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals + TS) |
| `npm run typecheck` | `tsc --noEmit` |

### Environment variables (optional)

| Var | Purpose |
|---|---|
| `GITHUB_TOKEN` | Raises the GitHub API rate limit (60→5000/hr) for the live stats fetch. The site works without it (graceful fallback). |

Create `.env.local`:

```bash
GITHUB_TOKEN=ghp_xxx   # optional
```

---

## Editing content

Everything factual is centralized — no need to touch JSX:

| File | What it controls |
|---|---|
| `src/data/site.ts` | Name, role, tagline, bio, availability, contact links, résumé URL |
| `src/data/projects.ts` | Project cards **and** the full Nitin-AI flagship section |
| `src/data/stack.ts` | Tech-stack categories, experience timeline, certifications |

Add your résumé: drop `resume.pdf` into `/public` (replaces `public/resume.txt`).

---

## Folder structure

```
my_portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # fonts, metadata, JSON-LD, skip link
│   │   ├── page.tsx             # composes all sections (Server Component, fetches GitHub)
│   │   ├── globals.css          # design tokens + Tailwind layers
│   │   ├── opengraph-image.tsx  # dynamic 1200×630 OG image (next/og)
│   │   ├── sitemap.ts           # /sitemap.xml
│   │   ├── robots.ts            # /robots.txt
│   │   ├── manifest.ts          # PWA web manifest
│   │   └── icon.svg             # favicon / app icon
│   ├── components/
│   │   ├── Nav.tsx              # sticky nav, active-section tracking, mobile menu
│   │   ├── Hero.tsx             # animated intro, rotating role, availability, stats
│   │   ├── About.tsx            # builder story + strengths + current focus
│   │   ├── Projects.tsx         # real GitHub projects grid
│   │   ├── ProjectCard.tsx      # rich card: architecture, stack, links, language
│   │   ├── Flagship.tsx         # Nitin-AI: architecture, features, providers, roadmap
│   │   ├── TechStack.tsx        # categorized stack
│   │   ├── Timeline.tsx         # journey + certifications
│   │   ├── GitHubSection.tsx    # live stats, top languages, contribution graph
│   │   ├── Contact.tsx          # email, GitHub, LinkedIn, résumé
│   │   ├── Footer.tsx
│   │   ├── SectionHeading.tsx   # shared heading
│   │   └── Reveal.tsx           # scroll-reveal primitives (client)
│   ├── data/                    # ← single source of truth for all content
│   │   ├── site.ts
│   │   ├── projects.ts
│   │   └── stack.ts
│   └── lib/
│       ├── github.ts            # server-side GitHub stats (ISR + graceful fallback)
│       └── motion.ts            # shared Framer Motion variants
├── public/                      # static assets (drop resume.pdf here)
├── docs/_recovered/             # archived original bundle (reference for RECOVERY_REPORT)
├── next.config.ts · tailwind.config.ts · tsconfig.json · postcss.config.mjs
├── RECOVERY_REPORT.md · PORTFOLIO_AUDIT.md · ARCHITECTURE.md
└── AUDIT_REPORT.md · PERFORMANCE_REPORT.md · SEO_REPORT.md · FUTURE_IMPROVEMENTS.md
```

---

## Deployment (Vercel — recommended)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected; no config needed.
3. (Optional) Add `GITHUB_TOKEN` under **Settings → Environment Variables**.
4. Deploy. The home page is static + ISR (revalidates hourly), so GitHub stays fresh without rebuilds.
5. Set a custom domain and update `site.url` in `src/data/site.ts` (drives canonical URL, OG, sitemap).

### CLI alternative

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

### Any Node host

```bash
npm run build && npm run start   # serves on PORT (default 3000)
```

---

## License

MIT © 2026 Nitin Singh.
