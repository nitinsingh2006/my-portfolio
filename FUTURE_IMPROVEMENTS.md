# FUTURE_IMPROVEMENTS.md

Prioritized backlog for the next iterations. The current build is production-ready; these are upside, not blockers.

## P0 — content the owner should supply (highest ROI)

1. **Real résumé PDF.** Drop `resume.pdf` into `/public` (replaces the wired placeholder `public/resume.txt`). All "Résumé" buttons already point at `/resume.pdf`.
2. **Project screenshots.** Add 1–2 images per flagship/project under `/public/projects/`. `next.config.ts` already enables AVIF/WebP; render with `next/image` + blur placeholder. Slots exist in `ProjectCard` and the Nitin-AI section.
3. **A real photo or branded portrait** for the hero/about (currently an `NS` monogram). Improves trust and recruiter recall.
4. **LinkedIn/X handles** — none were recoverable from the original bundle; add when available (footer + JSON-LD `sameAs`).

## P1 — engineering upgrades

5. **Per-project routes `/work/[slug]`.** Generate a static page per repo with README highlights, larger architecture diagrams, and `SoftwareSourceCode` JSON-LD — multiplies indexable surface and gives shareable deep links.
6. **Self-rendered contribution graph.** Replace the third-party `ghchart.rshah.org` image with an SVG built from the GitHub GraphQL contributions API (needs a `GITHUB_TOKEN`) — removes an external origin and unlocks live data.
7. **Live repo cards.** Fetch stars/forks/last-commit per featured repo at ISR time and show them on cards (the `getGitHubStats` lib is the natural home).
8. **`GITHUB_TOKEN` in env.** Raises the GitHub API rate limit from 60→5000/hr and enables GraphQL — wire `GITHUB_TOKEN` in Vercel project env (the lib already reads it).
9. **View-transition / route animations** once multi-page is added (Next.js View Transitions).

## P2 — polish & reach

10. **Blog / writing section** (`/notes`) — MDX posts on building Nitin-AI, local-first AI, etc. Compounding SEO + credibility.
11. **Contact form** with a serverless action + spam protection (Vercel BotID) instead of mailto-only.
12. **Analytics** — Vercel Analytics + Speed Insights to track real Core Web Vitals and referrers.
13. **Testimonials / endorsements** once available (recruiter-facing social proof).
14. **i18n** — a Hindi toggle would reinforce the "Building for Bharat" positioning.
15. **Automated Lighthouse CI** in GitHub Actions to guard the performance budget on every PR.

## P3 — flagship deepening

16. **Embed a short Nitin-AI demo** (muted, lazy-loaded `<video>` or animated GIF/WebP) once the beta UI is screenshot-ready.
17. **Architecture diagram as an interactive SVG** with hover annotations (still cheap vs. the old WebGL scene).
18. **"What I'm building now" live strip** sourced from recent GitHub events.

## Housekeeping

- Refresh dependencies and re-run `npm audit` periodically (2 moderate transitive advisories currently noted).
- When `next lint` is removed in Next 16, migrate to the ESLint CLI (`@next/codemod next-lint-to-eslint-cli`).
- Delete `docs/_recovered/` from the deploy if bundle-archive privacy is a concern (it's reference-only and not imported by the app).
