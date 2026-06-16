# SEO_REPORT.md

Date: 2026-06-16.

## The core problem with the original

The original SPA served an **empty `<body>`** (`<div id="root"></div>`) with a single `<title>` and no meta description, no OpenGraph, no structured data, and a commented-out favicon. To a crawler that doesn't execute JS, the page was effectively blank. The redesign fixes this at the root by **server-rendering all content**.

## What the redesign ships

| SEO surface | Implementation | Status |
|---|---|---|
| Server-rendered content | Next.js App Router SSG — full hero/about/projects/flagship in initial HTML | ✅ Verified via `curl` (Nitin-AI appears 27×, positioning + JSON-LD present) |
| `<title>` + template | `metadata.title` with `%s · Nitin Singh` template | ✅ |
| Meta description | Rich, keyword-aware description | ✅ |
| Keywords / author / creator | `metadata.keywords`, `authors`, `creator` | ✅ |
| Canonical URL | `alternates.canonical` | ✅ |
| OpenGraph | `og:title/description/url/type/locale/site_name/image` | ✅ verified in HTML |
| Twitter Card | `summary_large_image` + title/description/image | ✅ |
| Dynamic OG image | `opengraph-image.tsx` via `next/og` — 1200×630 branded PNG | ✅ 200, `image/png`, ~89 KB |
| Structured data | `Person` JSON-LD (name, jobTitle, email, address, alumniOf, knowsAbout, sameAs) | ✅ injected in `<body>` |
| `sitemap.xml` | `sitemap.ts` | ✅ 200, `application/xml` |
| `robots.txt` | `robots.ts` (allow all, sitemap + host) | ✅ 200 |
| Web manifest | `manifest.ts` (PWA-installable, theme color) | ✅ 200 |
| Favicon / app icon | `icon.svg` monogram (was commented out originally) | ✅ 200 |
| Semantic HTML | landmarks + heading hierarchy (one H1) | ✅ |
| `metadataBase` | set to production URL so relative OG/image URLs resolve | ✅ |
| `themeColor` / viewport | dark theme color, responsive viewport | ✅ |

## Structured data emitted

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nitin Singh",
  "jobTitle": "Full-Stack + AI Developer",
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Indore Institute of Science and Technology" },
  "knowsAbout": ["Full-Stack Development", "Artificial Intelligence", "Rust", "Next.js", "Cybersecurity", "DevOps"],
  "sameAs": ["https://github.com/nitinsingh2006", "https://www.linkedin.com/in/nitin-singh-657089339/"]
}
```

This makes the page eligible for rich results and ties the identity to its GitHub + LinkedIn profiles (entity disambiguation).

## Keyword & positioning strategy

- Primary entity: **"Nitin Singh"** + **"Full-Stack + AI Developer"** (consistent across title, H1, OG, JSON-LD, GitHub bio).
- Long-tail: "open-source AI workstation", "Rust Tauri AI app", "Nitin-AI", "IIST Indore CSE".
- Project pages-as-content: each real repo (Nitin-AI, CodeQuest AI, Invo, PortfolioSathi, ResumeForge) adds indexable, unique, factual copy.

## Validation checklist (post-deploy)

1. Google Rich Results Test on the production URL → expect a valid `Person`.
2. `https://<domain>/sitemap.xml` and `/robots.txt` reachable.
3. Share the URL on LinkedIn/X/Slack → confirm the OG card renders (`/opengraph-image`).
4. Google Search Console: submit sitemap, request indexing.

## Opportunities (see FUTURE_IMPROVEMENTS.md)

- Add per-project routes (`/work/[slug]`) to multiply indexable surface and earn long-tail traffic.
- Add `BreadcrumbList` + `CreativeWork`/`SoftwareSourceCode` JSON-LD for the flagship.
