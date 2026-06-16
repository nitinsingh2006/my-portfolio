# RECOVERY_REPORT.md

**Project:** Nitin Singh — Personal Portfolio
**Live URL audited:** https://nitin-portfolio-orpin.vercel.app/
**Recovery date:** 2026-06-16
**Method:** Black-box reconstruction from the deployed production bundle (HTML + hashed JS/CSS chunks) and cross-referencing with the owner's GitHub account as source of truth.

> The original source code was lost. This report documents what was recovered from the live build, how the stack was inferred, what could not be recovered, and the assumptions made before the redesign in this repository.

---

## 1. Inferred original stack

The deployed site is a **client-rendered Single Page Application** built with **Vite + React**. Evidence:

| Signal | Found in | Conclusion |
|---|---|---|
| `<div id="root"></div>` + a single `<script type="module" crossorigin src="/assets/index-*.js">` | `index.html` (518 bytes, empty body) | Vite production build, client-side rendered React |
| `__vite__mapDeps([...])`, hashed chunk filenames, `import("./MainContainer-*.js")` | `assets/index-*.js` | Vite code-splitting / lazy routes |
| `RGBELoader`, `.glb`/HDR environment loading, WebGL material classes (`EffectMaterial`, `GainMapDecoderMaterial`, `CopyMaterial`, `DepthDownsamplingMaterial`) | `assets/RGBELoader-*.js` (688 KB) | **Three.js** + postprocessing (likely `@react-three/fiber` + `@react-three/drei` + `postprocessing`) |
| `ScrollTrigger`, `SplitText`-style `"chars,lines"` / `"lines,words"`, `smooth-wrapper`/`smooth-content`, `power2.inOut`/`power3.out`, `pin`, `scrub` | `assets/ScrollTrigger-*.js` (115 KB) + `MainContainer` | **GSAP** + ScrollTrigger + ScrollSmoother |
| A 2.4 MB chunk containing Rust panics for `rapier3d`, `parry3d`, `nalgebra`, `dlmalloc`, `js-sys` (author path `/Users/sebcrozet/...`) | `assets/TechStack-*.js` | **Rapier 3D physics (WASM)** powering an interactive 3D "My Techstack" scene |
| Custom cursor logic (`data-cursor`, lerped follow with `requestAnimationFrame`), magnetic hover | `MainContainer` | Bespoke custom-cursor component |
| React 18 production runtime, `createRoot` | `index-*.js` | React 18 |

**Reconstructed original dependency set (high confidence):**
`react`, `react-dom`, `three`, `@react-three/fiber`, `@react-three/drei`, `postprocessing`, `gsap` (ScrollTrigger + ScrollSmoother + SplitText), `@dimforge/rapier3d` (or `@react-three/rapier`), `vite`.

**Hosting:** Vercel (static SPA). No server runtime, no API routes, no SSR.

---

## 2. Recovered structure

The SPA mounts a `MainContainer` that renders a single long-scroll page with these sections (recovered from JSX class names and text nodes):

```
#root
└── MainContainer
    ├── CustomCursor            (data-cursor, magnetic, lerp follow)
    ├── InitialFX / Loader      ("Loading...." preloader, initialFX chunk)
    ├── Navbar                  (lazy chunk: Navbar-*.js + .css)
    ├── Landing / Hero          (.landing-section, .landing-container)
    │     "Hello! I'm" · "Nitin Singh" · "A Creative" + rotating role
    ├── About ("About Me")      (.what-content)
    ├── Work / Projects         (.work-container, .work-section, .work-box) — 3 cards
    ├── TechStack ("My Techstack")  (lazy 3D physics scene — Three.js + Rapier WASM)
    ├── Career / Timeline       (.career-section, .career-timeline, .career-info-box)
    └── Contact ("Contact")     (.contact-section, .contact-social) + RESUME button
```

Behavioral details recovered: ScrollSmoother smooth scrolling, pinned/`scrub` scroll animations, `SplitText` character/line reveals on headings, a `play pause resume reverse` ScrollTrigger toggle, lazy-loaded video blobs fetched from `src/assets/${video}` for project previews, and a `/images/placeholder.webp` fallback image.

---

## 3. Recovered content (verbatim where possible)

**Identity**
- Name: **Nitin Singh**
- Title (HTML `<title>`): *"Nitin Singh - Python Developer | Cybersecurity Enthusiast"*
- Hero: "Hello! I'm" / "Nitin Singh" / "A Creative" + rotating roles (Developer, Frontend Developer, Cybersecurity, DevOps, Hacker)

**About (verbatim)**
> "B.Tech Computer Science student at Indore Institute of Science and Technology with a strong interest in software development, web technologies, and cybersecurity. Currently developing skills in Python, DSA, and Web Development using React. My learning includes Linux, Git, Docker, networking, and ethical hacking. Open to internships, freelance, and collaborations."

**Projects on the live site (3, generic/category-style):**
1. **Responsive Web Applications** — "Building responsive web applications using React.js, HTML, CSS, and JavaScript. Reusable UI components, REST API integration, state management with hooks, and responsive layouts." — `React.js, HTML, CSS, JavaScript, REST APIs`
2. **Reusable UI Component Library** — `React.js, Hooks, State Management, CSS`
3. **Python Automation Scripts** — `Python, Automation, Linux, Docker`

**Career / Timeline:**
- **Bachelor of Technology – CSE**, Indore Institute of Science and Technology, Indore — **2024 — 2028**. Coursework: Data Structures, Algorithms, OOP, DBMS, Operating Systems, Computer Networks.
- **Certified DevOps & Developer Professional** — Oracle Cloud Infrastructure 2025. (Oracle OCI DevOps Professional, OCI Developer Professional, Certified Ethical Hacker (CEH), Full Stack Web Development with AI Training, Networking Foundations.)
- **Self Projects / Freelance** — Frontend Developer.

**Tech-stack categories:** Web Development & Programming · Security, Cloud & Infrastructure · Scripting & Tools (React.js, HTML, CSS, JavaScript, Node.js, Python, Linux, Docker, Git, Oracle Cloud, Networking, Ethical Hacking, REST APIs).

**Contact (verbatim):**
- Email: `nsingh987610@gmail.com`
- Phone: `+91 80851 49264`
- GitHub: `https://github.com/nitinsingh2006`
- LinkedIn: `https://www.linkedin.com/in/nitin-singh-657089339/`
- Instagram: `https://www.instagram.com` (no handle baked into the bundle)
- Twitter/X: icon present, no URL recovered
- A **RESUME** button (target file not embedded in the recovered bundle).

---

## 4. Missing / non-recoverable assets

| Asset | Status | Handling in redesign |
|---|---|---|
| Original project source (TSX/JS components) | **Lost** | Rebuilt from scratch (this repo) |
| Profile photo / avatar image | Not in bundle (only `/images/placeholder.webp` referenced) | Redesign uses an initials monogram + space for a real photo |
| Project screenshots / preview videos | Referenced (`src/assets/${video}`) but binaries not recoverable | Redesign links live demos + repos; screenshot slots ready |
| Resume PDF | RESUME button present, file URL not in bundle | Redesign wires a `/resume.pdf` slot (drop-in) |
| HDR environment map (`.hdr`) for the 3D scene | Loaded at runtime, not captured | Redesign replaces the heavy WASM 3D scene with a fast CSS/SVG tech grid |
| `favicon` | Commented out in original `index.html` | Redesign ships a generated SVG favicon + OG image |
| Instagram/Twitter handles | Not embedded | Omitted (no invented handles) |

Raw recovered bundles are archived under [`docs/_recovered/`](docs/_recovered/) for reference.

---

## 5. Assumptions made

1. **The three "projects" on the live site are placeholders/categories, not real shipped products.** The owner's GitHub (`nitinsingh2006`, 12 public repos) contains substantially stronger, real projects. Per the brief ("use GitHub repositories as source of truth"), the redesign presents the **real** repositories (Nitin-AI, CodeQuest AI, Invo, PortfolioSathi, ResumeForge, Lead-Gen Automation, GitHub Roaster) instead of the generic placeholders. No facts were invented — every project claim is sourced from the repo's own README.
2. **Positioning is upgraded to match reality.** The live `<title>` ("Python Developer | Cybersecurity Enthusiast") undersells the work. The GitHub bio — *"Full-Stack + AI Developer | Building for Bharat 🇮🇳 | IIST Indore CSE '28"* — is the owner's own, current self-description and is adopted as the headline positioning.
3. **The 3D Rapier/Three.js tech-stack scene was a performance liability** (≈3.3 MB of JS/WASM for one section). The redesign intentionally drops it in favor of a fast, accessible categorized stack grid (see PORTFOLIO_AUDIT.md).
4. **Availability = "Open to internships, freelance, and collaborations"** is taken verbatim from the original About copy and surfaced as a live availability badge.
5. **Education dates 2024–2028** and the **CSE '28** graduation are consistent between the live site and the GitHub bio; used as-is.
6. Contact details (email, phone, GitHub, LinkedIn) are reused verbatim. Twitter/Instagram links are omitted because no handles were recoverable and none should be fabricated.

---

## 6. Net assessment

The original is a visually ambitious but content-thin, heavy SPA: ~3.3 MB of JavaScript/WASM, no SSR, no SEO, three placeholder projects, and a positioning that hides the owner's actual strength (shipping real AI/full-stack products). The reconstruction confirmed the stack and harvested all real content; the redesign in this repository keeps the factual content, replaces the generic projects with the real GitHub portfolio, and re-engineers the delivery (Next.js, SSR/ISR, SEO, accessibility, performance) — see `PORTFOLIO_AUDIT.md` and `ARCHITECTURE.md`.
