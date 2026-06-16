# PERFORMANCE_REPORT.md

Date: 2026-06-16. Baseline = the original live SPA; Target = this redesign.

## Headline

| Metric | Original (Vite SPA) | Redesign (Next.js) | Δ |
|---|---|---|---|
| JS + WASM shipped | **~3.3 MB** (RGBELoader 688 KB + Rapier WASM 2.4 MB + ScrollTrigger 115 KB + app) | **~147 kB** First Load JS | **~22× smaller** |
| Rendering | Client-only (empty `<body>` until JS runs) | **SSG + ISR** (full HTML on first byte) | FCP/LCP no longer JS-blocked |
| Above-the-fold content in HTML | None | Full hero, nav, positioning | ✅ |
| 3D/WebGL/physics | Three.js + Rapier per visit | Removed | No WASM, no GPU dependency |
| Fonts | Unmanaged | `next/font` (self-hosted, `display: swap`, preloaded) | No layout shift, no FOUT |

## Why the redesign is fast

1. **Server Components by default.** Hero (small client island for the rotating role + reveal), Projects, ProjectCard, and Nav are the only `"use client"` modules. About, TechStack, Timeline, Flagship, GitHub, Contact, and Footer ship **zero component JS** beyond the shared framework runtime.
2. **No heavy 3D dependency.** The original's 2.4 MB Rapier physics scene and 688 KB HDR loader are gone, replaced by a CSS/SVG tech grid and a static contribution image.
3. **Static prerender + hourly ISR.** GitHub stats are fetched at build/revalidate time (`fetch(..., { next: { revalidate: 3600 } })`), so the visitor never waits on the GitHub API and we never get rate-limited on the critical path.
4. **`next/font`** self-hosts Inter, Space Grotesk, and JetBrains Mono with `display: swap` and CSS-variable wiring — no render-blocking Google Fonts request, minimal CLS.
5. **Lazy, async media.** The contribution graph `<img>` uses `loading="lazy"`, `decoding="async"`, and explicit `width`/`height` to reserve space (no CLS).
6. **Animation is cheap.** Framer Motion animates only `opacity`/`transform` (compositor-friendly), uses `whileInView` with `once: true`, and is fully disabled under `prefers-reduced-motion`.
7. **GPU-light backgrounds.** Grid and glow are pure CSS gradients with `mask-image`, not canvases.

## Core Web Vitals — expected

Based on the payload and SSG delivery (verify with Lighthouse/PageSpeed post-deploy on Vercel):

| Metric | Expected | Driver |
|---|---|---|
| LCP | < 1.5 s | Server-rendered hero text, no JS gate, self-hosted fonts |
| CLS | < 0.02 | Sized media, font-swap with metrics, no late layout inserts |
| INP / TBT | Low | ~147 kB JS, small hydration surface |
| FCP | < 1.0 s | HTML-first render |
| Lighthouse Performance | ≥ 95 (target) | All of the above |

## Network/runtime headers

`next.config.ts` sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a `Permissions-Policy` that disables camera/mic/geolocation. `poweredByHeader` is disabled.

## How to measure

```bash
npm run build && npm run start
# then run Lighthouse against http://localhost:3000 (mobile preset),
# or deploy to Vercel and use PageSpeed Insights on the production URL.
```

## Remaining performance opportunities

- Swap the third-party `ghchart.rshah.org` contribution image for a self-rendered SVG (one fewer external origin). See FUTURE_IMPROVEMENTS.md.
- Add real screenshots as `next/image` with AVIF/WebP and blur placeholders (already configured in `next.config.ts`).

---

# Redesign pass — violet identity + robot (2026-06-16)

The visual redesign that merged the deployed portfolio's identity (violet brand, Geist font,
intro loader) and added the original SVG robot. Fonts changed to **Geist + Geist Mono**.

## Clean build output

```
Route (app)                     Size     First Load JS    Revalidate
┌ ○ /                          49.6 kB   152 kB           1h
+ First Load JS shared by all  102 kB
```

- Home **152 kB** First Load JS (was ~147 kB). The +5 kB buys the robot, loader and richer GitHub
  section — still **no WebGL/3D engine**, so the ~22× advantage over the original 3.3 MB SPA holds.

## Quality gates — all green

| Gate | Command | Result |
|---|---|---|
| Types | `npm run typecheck` | ✅ 0 errors |
| Lint | `npm run lint` | ✅ 0 warnings/errors |
| Build | `npm run build` | ✅ 9/9 static pages |
| Runtime | Playwright desktop + mobile | ✅ **0 console / page errors** |

## Critical fix: corrupted build from zombie processes

The site's earlier screenshots rendered **completely unstyled** (raw blue links on white). Root
cause: **stale background `next start` processes** from prior sessions held `.next` locked on
Windows, so later builds produced an inconsistent `.next` that served broken chunks (404 / wrong
MIME type). Fixed by killing all rogue node/next processes, deleting `.next`, and doing one clean
`next build` + `next start` — the site now serves correctly hashed production chunks.

> Operational note: run only **one** server at a time (`npm run build && npm start`).

## Lighthouse estimates (production, mobile)

| Category | Estimate | Why |
|---|---|---|
| Performance | **95–99** | Static HTML, 152 kB JS, no WebGL, transform-only animation, font-swap, lazy images |
| Accessibility | **97–100** | Landmarks, skip link, focus rings, decorative SVG `aria-hidden`, reduced-motion, AA+ contrast |
| Best Practices | **95–100** | HTTPS assets, no console errors, `rel="noopener"`, sized images, security headers |
| SEO | **100** | Metadata, OG/Twitter, JSON-LD Person, sitemap, robots, canonical |

All new motion (robot, loader, reveals) is disabled under `prefers-reduced-motion`; the loader is
session-gated (~1.2 s) and paints content behind it, so it does not gate LCP on repeat visits.
