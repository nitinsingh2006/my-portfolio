# Portfolio Redesign Plan

Principal-level redesign of `my_portfolio` — merging the signature visual identity of
the deployed portfolio (`nitin-portfolio-orpin.vercel.app`) into the canonical
Next.js source of truth, **without touching a single fact**.

## 1. Analysis

### Local project (source of truth)
- **Stack:** Next.js 15 (App Router, SSG + ISR) · TypeScript · Tailwind 3.4 · Framer Motion.
- **Content model:** all facts live in `src/data/{site,projects,stack}.ts`. Components are presentation-only.
- **State before redesign:** solid structure, emerald/cyan theme, Inter/Space Grotesk fonts. Functionally complete but visually generic; **no hero visual / robot**.
- **Critical defect discovered:** the previously-captured screenshots were broken/unstyled — traced to a **rogue zombie `next start` process** holding `.next` locked on Windows, which corrupted later builds. Fixed during this pass (see Performance Report).

### Deployed project (visual reference)
- A **Vite + React SPA** (151 KB bundle). Probed the live JS/CSS directly.
- **No Three.js / Rapier / GLB in the shipped bundle** — the heavy 3D robot lived only in the *original lost* build. The current deployment is a lighter recreation.
- **Recoverable signature identity:**
  - Violet brand: accent `#c2a4ff`, deep-violet glow `#a87cff`, near-black bg `#0b080c`, off-white text `#eae5ec`.
  - **Geist** typeface.
  - A premium **expanding-circle intro loader**.
  - Large uppercase display typography + motion.

## 2. Strategy

Rather than ship a heavy WebGL engine (which would break the Lighthouse 95+ / "no heavy
animations" requirements), **recreate an original robot** as animated SVG + transforms, and
**adopt the deployed violet + Geist identity** so the rebuilt site reads as the same brand —
only stronger.

| Goal | Decision |
|---|---|
| Preserve deployed robot experience | Original SVG AI-robot companion (cursor-tracking eyes, blink, equalizer mouth, energy ring, orbiting tech nodes) — **zero WebGL** |
| Preserve deployed identity | Violet palette + Geist font + intro loader ported into the design system |
| Protect performance | SVG/CSS transforms only, `prefers-reduced-motion` everywhere, loader is session-gated & non-blocking |
| Protect truth | All `src/data/*` facts untouched; only presentation changed |

## 3. Workstreams

1. **Brand system** — rewrite design tokens in `globals.css`, swap fonts in `layout.tsx`, retune `tailwind.config.ts`, update favicon + OG image.
2. **Robot hero** — new `RobotHero.tsx`; rebuild `Hero.tsx` as a two-column (copy + robot) layout.
3. **Intro loader** — new `Loader.tsx`, mounted in `layout.tsx`.
4. **GitHub credibility** — extend `lib/github.ts` (total stars + latest repos) and `GitHubSection.tsx` (stars stat, live "Latest repositories" grid).
5. **Case-study polish** — featured-aware `ProjectCard.tsx`, full-width featured rows, iconified `TechStack.tsx`, higher-converting `Contact.tsx`.
6. **Verify** — typecheck + lint + build green; Playwright screenshots with zero console errors.

## 4. Guardrails (non-negotiable)
- No project removed, no fact changed, no content deleted.
- Every animation degrades gracefully under reduced motion.
- Each phase ends green on `typecheck`, `lint`, `build`.
