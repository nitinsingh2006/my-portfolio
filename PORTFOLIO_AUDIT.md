# PORTFOLIO_AUDIT.md

Deep audit of the **original** live portfolio (`nitin-portfolio-orpin.vercel.app`), with the concrete fix applied in the redesign for each finding. Severity: 🔴 critical · 🟠 high · 🟡 medium.

---

## 1. Design & visual language
- 🟠 **Spectacle over substance.** A 3D physics scene (Three.js + Rapier WASM) and a custom cursor dominate, while the content (3 generic projects) is thin. Effort is spent on gimmicks recruiters don't reward.
  → **Fix:** Premium-but-restrained motion (scroll reveals, gradient mesh, magnetic CTAs) with `prefers-reduced-motion` support; the visual weight now serves real content.
- 🟡 **No consistent design system** — ad-hoc spacing/colors baked into one CSS blob.
  → **Fix:** Token-driven system (CSS variables + Tailwind theme): one accent (emerald→cyan), defined type scale, radius, and elevation.
- 🟡 **Custom cursor** hurts usability on hybrid/touch devices and accessibility.
  → **Fix:** Removed; native cursor + clear focus/hover states retained.

## 2. Layout & information architecture
- 🟠 **Positioning buried.** The hero leads with "A Creative Developer"; the real story (ships AI + full-stack products) never surfaces.
  → **Fix:** Hero leads with **"Full-Stack + AI Developer · Building for Bharat"** + a one-line value prop and live availability.
- 🟠 **No flagship.** Nitin-AI (an open-source Rust+Tauri AI workstation) isn't shown at all.
  → **Fix:** Dedicated flagship section with architecture, features, provider matrix, and roadmap.
- 🟡 **Single undifferentiated scroll** with no sticky nav anchors or section progress.
  → **Fix:** Sticky nav with active-section tracking, scroll-to anchors, keyboard accessible.

## 3. Typography
- 🟡 Single font, weak hierarchy, low contrast on secondary text.
  → **Fix:** Space Grotesk (display) + Inter (body) + JetBrains Mono (code/stats), a deliberate modular scale, and `text-balance`/`text-pretty` for headings.

## 4. Project presentation
- 🔴 **Placeholder projects.** "Responsive Web Applications", "Reusable UI Component Library", "Python Automation Scripts" are categories, not products — zero credibility for recruiters/CTOs.
  → **Fix:** Replaced with **real GitHub repos** as source of truth, each with problem statement, architecture highlight, tech badges, live + repo links, language, and license.
- 🟠 No GitHub links, no live demos, no tech badges, no metrics on the original cards.
  → **Fix:** Every card carries repo link, live link (where deployed), primary-language bar, and stack chips.

## 5. GitHub integration
- 🔴 **None.** GitHub is one icon in the footer.
  → **Fix:** Live GitHub section (ISR, server-fetched): repo count, top languages computed from the languages API, member-since, top repos, and a contribution graph. Source of truth for projects.

## 6. Mobile UX
- 🟠 A WebGL/physics scene + smooth-scroll hijacking is hostile on mid-range Android (the owner's target — "Building for Bharat").
  → **Fix:** Mobile-first layout, no scroll hijack, native momentum scroll, lightweight DOM, tap targets ≥44px.

## 7. Accessibility
- 🔴 SPA with empty server HTML, custom cursor, scroll hijacking, no skip link, unlabeled icon links, motion with no reduced-motion path.
  → **Fix:** Semantic landmarks, skip-to-content link, `aria-label`s on every icon link, visible focus rings, WCAG-AA contrast, full `prefers-reduced-motion` handling, keyboard nav.

## 8. Performance
- 🔴 **~3.3 MB JS/WASM** (`RGBELoader` 688 KB, `TechStack` Rapier WASM 2.4 MB, ScrollTrigger 115 KB) for a content-light page; client-rendered (blank HTML until JS executes) → poor FCP/LCP/TBT, bad on slow networks.
  → **Fix:** Next.js App Router, mostly Server Components, near-zero client JS for static sections, `next/font`, no WASM. Target Lighthouse ≥95.

## 9. SEO
- 🔴 **Effectively invisible.** Empty `<body>` server HTML, no meta description, no OpenGraph/Twitter, no structured data, no sitemap/robots, commented-out favicon.
  → **Fix:** Server-rendered content, full metadata, OpenGraph + Twitter cards, dynamic OG image, `Person` + `WebSite` JSON-LD, `sitemap.ts`, `robots.ts`, canonical URL.

## 10. Conversion
- 🟠 Weak CTA (a single RESUME button), availability not surfaced, no clear "hire/contact me" path above the fold.
  → **Fix:** Above-the-fold availability badge + primary "Get in touch" and secondary "View work" CTAs; a dedicated contact section with email, LinkedIn, GitHub, and resume.

## 11. Personal branding
- 🟠 Generic "Creative Developer" identity; the distinctive, credible angle ("Building for Bharat", open-source AI tooling, local-first) is absent.
  → **Fix:** Consistent narrative across hero, about, and flagship; India-builder angle made explicit and tasteful.

## 12. Credibility signals
- 🟠 No certifications surfaced, no open-source license/CI signals, no real product evidence.
  → **Fix:** Certifications (Oracle OCI ×2, CEH, etc.), Apache-2.0/MIT licenses, CI badges, live demos, and an honest "beta" status on the flagship — credibility through transparency, not inflation.

---

### Summary scorecard (original → redesign target)

| Dimension | Original | Target |
|---|:--:|:--:|
| Performance (Lighthouse) | ~40–60 | ≥95 |
| SEO | ~30 | 100 |
| Accessibility | ~60 | ≥95 |
| Content credibility | 2/10 | 9/10 |
| Mobile UX | 4/10 | 9/10 |
| JS payload | ~3.3 MB | <200 KB |
