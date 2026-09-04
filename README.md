# Nitin Singh — Portfolio

A production-grade personal portfolio for **Nitin Singh**, Full-Stack + AI Developer. Dark-theme, mobile-first, server-rendered, SEO-complete, and built around real GitHub projects — led by the flagship **[Nitin-AI](https://github.com/nitinsingh2006/Nitin-AI)** (an open-source AI workstation in Rust + Tauri).

> Live URL: **[nitin-portfolio-orpin.vercel.app](https://nitin-portfolio-orpin.vercel.app/)**

## Tech Stack

- **Next.js 15** (App Router, Server Components, SSG + ISR)
- **TypeScript** (Strict mode)
- **Tailwind CSS 3.4** (Token-driven, channel-triplet color system)
- **Framer Motion 11** (Reduced-motion aware)
- **lucide-react** Icons
- **Live GitHub Integration** (Data-driven contribution graph, repositories, achievements)

## GitHub Integration Architecture

The GitHub data layer is organized into modular server-side submodules (`src/lib/github/`):

- **`contributions.ts`**: Chronologically sorted 365+ day calendar with exact daily contribution counts, month label alignment, and continuous grid positioning. Supports GraphQL API + direct HTML calendar parser fallback.
- **`profile.ts`**: Fetches GitHub profile statistics, followers, member year, and language distribution percentages.
- **`repos.ts`**: Dynamically syncs public repositories with star count, forks, language, and relative pushed timestamps.
- **`achievements.ts`**: Synchronizes official GitHub badges (Quickdraw, YOLO, Pair Extraordinaire) with CDN icon asset fallback.

## Highlights

- 🌑 Dark, mobile-first, WCAG-AA accessible (skip link, focus rings, labelled icons, reduced-motion support)
- ⚡ ~150 kB First Load JS, statically prerendered with Next.js ISR (20-minute revalidation)
- 📊 Interactive Contribution Calendar with hover & touch tooltips (`0 contributions on Sep 4, 2026`, `7 contributions on Sep 2, 2026`)
- 🏆 Verified GitHub Achievements display
- 🔎 Full SEO: metadata, OpenGraph, Twitter, sitemap, robots, manifest, structured JSON-LD data

---

## Getting Started

### Prerequisites
- **Node.js 20+** and npm

### Install & Run

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint checks |
| `npm run typecheck` | `tsc --noEmit` validation |

### Environment Variables (Optional)

| Variable | Purpose |
|---|---|
| `GITHUB_TOKEN` | Increases GitHub API rate limit (60 ➔ 5,000/hr). The portfolio works seamlessly without it via server-side HTML calendar fallback. |

Create `.env.local`:

```bash
GITHUB_TOKEN=ghp_xxx   # optional
```

---

## License

MIT © 2026 Nitin Singh.
