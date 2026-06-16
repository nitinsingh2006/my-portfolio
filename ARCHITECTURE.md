# ARCHITECTURE.md

How the portfolio is built and why. This is a content-driven, mostly-static Next.js App Router site with a thin client-interactivity layer and a single live data dependency (GitHub).

## 1. Principles

1. **Content is data, not markup.** Every fact lives in `src/data/*`. Components are presentational and render from typed data. One edit updates the site, the OG image, the JSON-LD, and the metadata together.
2. **Server-first, client only where needed.** Default to Server Components. Promote to `"use client"` only for scroll reveals, the rotating role, the nav, and card hover.
3. **Fast by default.** Static prerender + ISR; no WebGL/WASM; compositor-only animations; self-hosted fonts.
4. **Accessible and resilient.** Semantic HTML, reduced-motion, and graceful degradation if GitHub is unreachable.
5. **Factual integrity.** Projects are sourced from the owner's GitHub READMEs; nothing is invented (see `RECOVERY_REPORT.md`).

## 2. Rendering & data flow

```
Build / ISR (hourly)                         Request
─────────────────────                        ───────
src/data/* (static facts)                    Browser
        │                                        │  HTML (fully rendered)
        ▼                                        ▼
app/page.tsx  ──await──►  lib/github.ts  ──►  GitHub REST API
 (Server Component)        (revalidate 3600,   (user + repos → langs)
        │                   graceful fallback)
        ▼
Server-rendered HTML  ──►  hydrate client islands (Nav, Hero, Projects, Reveal)
```

- `app/page.tsx` is an **async Server Component**. It calls `getGitHubStats()` once and passes the result into `Hero` and `GitHubSection` as props.
- `export const revalidate = 3600` makes the whole page **SSG + ISR**: prerendered at build, regenerated at most hourly. Visitors never block on the GitHub API.
- `lib/github.ts` wraps `fetch` with `next: { revalidate: 3600 }` and returns a **typed fallback** on any error or rate-limit, so the page always renders fully.

## 3. Component topology

| Layer | Modules | Runtime |
|---|---|---|
| Shell | `layout.tsx` (fonts, metadata, JSON-LD, skip link) | Server |
| Page | `page.tsx` (composition + data fetch) | Server (async) |
| Static sections | `About`, `TechStack`, `Timeline`, `Flagship`, `GitHubSection`, `Contact`, `Footer`, `SectionHeading` | Server |
| Client islands | `Nav`, `Hero`, `Projects`, `ProjectCard`, `Reveal` (+ group/item) | Client |
| Data | `data/site.ts`, `data/projects.ts`, `data/stack.ts` | Build-time |
| Libs | `lib/github.ts`, `lib/motion.ts` | Server / shared |

Server sections still get scroll-reveal animation by composing the **`Reveal` client primitives** as children — the animation logic is isolated to a tiny client boundary while the content stays server-rendered.

## 4. Design system

- **Tokens** in `globals.css` as channel-triplet CSS variables (`--bg: 8 9 12`), consumed by Tailwind via `rgb(var(--x) / <alpha-value>)`. This is what makes `bg-surface/60`, `border-accent/40`, etc. work with a themeable palette.
- **One accent** (emerald `#34d399` → cyan `#22d3ee`) used consistently for signal, links, and the availability state.
- **Type**: Space Grotesk (display), Inter (body), JetBrains Mono (code/stats), all via `next/font` with CSS-variable wiring and `display: swap`.
- **Reusable utilities/components**: `.card`, `.chip`, `.eyebrow`, `.section`, `.container-page`, `.text-gradient`, `.grid-bg`, `.glow`.
- **Motion**: shared variants in `lib/motion.ts` (`fadeUp`, `stagger`, `scaleIn`) with a `once` viewport; globally disabled under `prefers-reduced-motion`.

## 5. SEO & metadata pipeline

- `metadata` + `viewport` exports in `layout.tsx` drive title/description/keywords/canonical/OpenGraph/Twitter/robots.
- `opengraph-image.tsx` renders a branded 1200×630 PNG at the edge via `next/og` (`ImageResponse`), referenced by `/opengraph-image`.
- `sitemap.ts`, `robots.ts`, `manifest.ts`, and `icon.svg` are file-based metadata routes.
- `Person` **JSON-LD** is injected in `layout.tsx`, tying the identity to GitHub + LinkedIn (`sameAs`).
- `metadataBase` resolves all relative URLs from `site.url`.

## 6. Security & headers

`next.config.ts` sets `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, and a restrictive `Permissions-Policy`; `poweredByHeader` is off. `remotePatterns` allowlists only GitHub image hosts.

## 7. Extensibility

- **Add a project** → append to `projects` in `data/projects.ts` (the grid and counts update automatically).
- **Edit the flagship** → the `flagship` object in the same file feeds the entire Nitin-AI section.
- **Change identity/contact** → `data/site.ts` (propagates to nav, hero, contact, footer, metadata, OG, JSON-LD).
- **Per-project pages** → add `app/work/[slug]/page.tsx` reading the same `projects` array (see `FUTURE_IMPROVEMENTS.md`).

## 8. Trade-offs made

| Decision | Why | Cost |
|---|---|---|
| Dropped the original Three.js + Rapier 3D scene | ~3.3 MB JS/WASM for one section; bad mobile UX/SEO | Less visual spectacle (replaced by a fast CSS/SVG treatment) |
| Static + ISR over fully dynamic | Fast, cache-friendly, no API on the critical path | GitHub stats lag up to 1 hour |
| Third-party contribution-graph image | Zero-config, no token required | One extra external origin (replaceable — see backlog) |
| Tailwind v3 over v4 | Maximum build reliability for delivery | Not on the newest engine (low impact) |
| Content in `data/*` vs a CMS | Zero infra, version-controlled, type-safe | Edits require a commit/redeploy |
