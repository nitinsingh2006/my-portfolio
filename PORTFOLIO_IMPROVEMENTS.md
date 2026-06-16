# Portfolio Improvements

What changed in this redesign pass, section by section. **No factual content was altered** —
every claim still traces to `src/data/*` and GitHub `@nitinsingh2006`.

## Brand identity (preserved from the deployed site)
- **Violet palette** adopted as the design system: `--accent #c2a4ff`, `--accent-2 #a87cff`,
  background `#0b080c`, text `#eae5ec`, violet-tinted surfaces & borders.
- **Geist** + **Geist Mono** fonts (the deployed typeface, and Vercel's own).
- New ambient utilities: `aurora`, `conic-ring`, `text-glow`, `animate-float`, `animate-spin-slow`,
  plus violet favicon, OG image, scrollbar and selection colors.

## Hero — rebuilt
- **Two-column layout**: positioning/CTAs on the left, the **robot** on the right (stacks on mobile, robot first).
- **Original AI-robot companion** (`RobotHero.tsx`): glowing violet eyes that **track the cursor**,
  periodic **blink**, an **equalizer "mouth"**, pulsing antenna + chest reactor, a rotating
  **energy ring**, and **orbiting tech-node chips** (Rust · AI · TS). Pure SVG + transforms.
- Stronger typography (larger Geist display, violet gradient + glow on the role), refined motion,
  ambient aurora/grid/glow. Quick-stats bar retained.

## Projects — case-study cards
- `ProjectCard` is now **featured-aware**: featured projects (CodeQuest AI, Invo) render with a
  violet gradient surface, a **"Featured" badge**, and **span the full width** as case-study rows.
- Explicit footer CTA — **"Live demo"** when a live URL exists, **"Source"** otherwise — alongside
  the existing architecture callout, highlights, stack chips, GitHub/live icon links and license.
- All six projects preserved, descriptions unchanged.

## Nitin-AI flagship
- Unchanged in content (architecture, crates, provider matrix, roadmap, security) — now rendered in
  the upgraded violet system so it reads as the centerpiece.

## GitHub — open-source credibility
- `lib/github.ts` extended to compute **total stars** and a **latest-repositories** feed from the live API.
- Section now shows a 4-up stat grid (repos · **stars** · followers · member-since), the live
  top-languages bar, a **"Latest repositories"** grid (language, stars, forks, relative "updated" time),
  and the contribution graph recolored to violet. Graceful fallback if the API is rate-limited.

## Tech stack — visual + iconified
- Each domain now carries a **lucide icon** in an accent tile (Languages, Frontend, Backend, AI/ML,
  Databases, DevOps & Cloud, Security). Same categories and items.

## About / Experience
- Content preserved. About paragraphs, strengths, and "currently building" intact; timeline +
  certifications unchanged — both inherit the elevated type and violet accents.

## Contact — higher conversion
- Added a prominent primary CTA row (**Email me** + **Download résumé**) above the channel grid,
  keeping the availability badge, all channels, and location.

## Intro loader (preserved from the deployed site)
- `Loader.tsx`: brief expanding-circle reveal over the **NS** mark with a sweeping bar and
  "Booting workstation". Auto-dismisses (~1.2 s), **skips on reduced motion**, and shows **once per
  session** so it never blocks repeat navigation or LCP.

## Résumé — real, next-level, ATS-friendly (new `/resume` route)
- Replaced the placeholder `resume.pdf` (which had no content) with a proper **`/resume` page**
  generated entirely from the truthful site data — nothing invented.
- **Premium dark** on screen (matches the portfolio); **clean light A4** when printed/saved as PDF
  via a dedicated `@media print` stylesheet.
- **One-click "Download PDF"** (`window.print()` → browser "Save as PDF"), plus "Back to portfolio".
- **ATS-safe**: single-column, real selectable text, semantic headings — sections: Summary,
  Technical Skills (by domain), Experience (Nitin-AI + independent dev work), Selected Projects
  (all 6), Education, Certifications, with full contact line (email, phone, location, GitHub,
  LinkedIn, portfolio).
- The intro loader is now `no-print` so it never bleeds into the exported PDF.
- All résumé buttons (Hero, Contact ×2) now point to `/resume` (`site.resumeUrl`); `/resume` added
  to the sitemap; obsolete `public/resume.txt` removed.

## Files
**Added:** `src/components/RobotHero.tsx`, `src/components/Loader.tsx`,
`src/app/resume/page.tsx`, `src/app/resume/ResumeActions.tsx`, `src/data/resume.ts`,
`scripts/shot-resume.mjs`, `PORTFOLIO_REDESIGN_PLAN.md`, `PORTFOLIO_IMPROVEMENTS.md`.
**Modified:** `src/app/globals.css`, `src/app/layout.tsx`, `src/app/icon.svg`,
`src/app/opengraph-image.tsx`, `tailwind.config.ts`, `src/lib/github.ts`,
`src/components/Hero.tsx`, `src/components/Projects.tsx`, `src/components/ProjectCard.tsx`,
`src/components/TechStack.tsx`, `src/components/GitHubSection.tsx`, `src/components/Contact.tsx`,
`scripts/screenshot.mjs`, `PERFORMANCE_REPORT.md`.
**Untouched (by design):** all of `src/data/*`, `About.tsx`, `Flagship.tsx`, `Timeline.tsx`,
`Nav.tsx`, `Footer.tsx`, `SectionHeading.tsx`, `Reveal.tsx`.
