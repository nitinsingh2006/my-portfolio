# AUDIT_REPORT.md

Quality gates run on the redesigned portfolio. Date: 2026-06-16.

## Automated checks

| Gate | Command | Result |
|---|---|---|
| Type safety | `npm run typecheck` (`tsc --noEmit`) | ✅ **Pass** — 0 errors, `strict: true` |
| Linting | `npm run lint` (`next lint`) | ✅ **Pass** — 0 warnings, 0 errors |
| Production build | `npm run build` | ✅ **Pass** — compiled in ~3s, 9/9 static pages generated |
| Server render smoke test | `curl` of `npm run start` | ✅ **Pass** — HTTP 200; all content + JSON-LD present in initial HTML |
| Generated routes | OG image / sitemap / robots / manifest / icon | ✅ All 200, correct content types |

### Build output

```
Route (app)                      Size    First Load JS   Revalidate
┌ ○ /                          44.7 kB        147 kB         1h
├ ○ /opengraph-image            133 B         103 kB
├ ○ /sitemap.xml                133 B
├ ○ /robots.txt                 133 B
└ ○ /manifest.webmanifest       133 B
+ First Load JS shared          102 kB
```

The home page is **statically prerendered** with **ISR (revalidate 3600s)** — GitHub stats refresh hourly without a rebuild. Total First Load JS **147 kB** (budget was <200 kB).

## Accessibility review (manual, WCAG 2.1 AA)

| Item | Status | Notes |
|---|---|---|
| Semantic landmarks | ✅ | `<header>`, `<main id="main">`, `<nav>`, `<footer>`, `<section>` with ids |
| Skip-to-content link | ✅ | First focusable element, visible on focus |
| Single H1 + ordered headings | ✅ | One `<h1>`; sections use `<h2>`, cards `<h3>/<h4>` |
| Keyboard navigation | ✅ | All interactive elements are real `<a>`/`<button>`; visible `:focus-visible` ring |
| Icon-only links labelled | ✅ | `aria-label` on every icon link (GitHub, LinkedIn, social, back-to-top) |
| Mobile menu | ✅ | `aria-expanded`, `aria-label` toggle, focus-manageable |
| Color contrast | ✅ | fg `#f3f5f8` on `#08090c` ≈ 18:1; muted `#8b93a1` on bg ≈ 7.4:1; accent text on bg ≈ 9:1 (all ≥ AA) |
| Reduced motion | ✅ | Global `prefers-reduced-motion` CSS kill-switch + framer-motion respects it |
| Images have alt text | ✅ | Contribution graph + OG image carry descriptive `alt` |
| Language graph | ✅ | `role="img"` with `aria-label` on the stacked bar |
| Touch targets | ✅ | Nav/menu/contact targets ≥ 40px |

## Cross-cutting fixes applied during the build

1. **Tailwind `/alpha` modifiers on themed colors** failed the build (`bg-surface/60` on a `var()` color). Converted the entire palette to channel-triplet CSS variables consumed via `rgb(var(--x) / <alpha-value>)` — alpha modifiers now work everywhere.
2. **`next/og` Satori constraint** — elements with multiple children require explicit `display: flex`. Fixed the OG title/headline nodes.
3. **Next.js security advisory** (CVE-2025-66478 in 15.1.6) — upgraded to patched **15.5.19**.
4. **Stray parent lockfile** caused a wrong workspace-root inference — pinned `outputFileTracingRoot` to the project.

## Residual notes (non-blocking)

- `npm audit` reports 2 moderate advisories in transitive dev/build deps; none affect the shipped client bundle. Track and bump on the next dependency refresh.
- `resume.pdf` is a wired placeholder — drop the real file into `/public` (see `public/resume.txt`).
- Real product screenshots are not yet included; layout slots are ready (see FUTURE_IMPROVEMENTS.md).
