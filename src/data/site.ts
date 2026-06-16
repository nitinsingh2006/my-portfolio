/**
 * Single source of truth for all site content.
 * Every factual claim here is sourced from the live portfolio or the owner's
 * public GitHub (github.com/nitinsingh2006). Nothing is invented.
 */

export const site = {
  name: "Nitin Singh",
  firstName: "Nitin",
  /** GitHub bio — the owner's own current positioning. */
  role: "Full-Stack + AI Developer",
  tagline: "Building for Bharat 🇮🇳",
  headline: "I build local-first AI tools and full-stack products.",
  subhead:
    "B.Tech CSE '28 at IIST Indore. I ship real software — an open-source AI workstation in Rust, AI-powered SaaS, and developer tools — with a bias for shipping and an eye for security.",
  availability: "Open to internships, freelance & collaborations",
  location: "Indore, Madhya Pradesh, India",
  email: "nsingh987610@gmail.com",
  phone: "+91 80851 49264",
  url: "https://nitin-portfolio-orpin.vercel.app",
  githubUser: "nitinsingh2006",
  socials: {
    github: "https://github.com/nitinsingh2006",
    linkedin: "https://www.linkedin.com/in/nitin-singh-657089339/",
    email: "mailto:nsingh987610@gmail.com",
  },
  resumeUrl: "/resume",
} as const;

export const about = {
  /** Verbatim factual basis from the original portfolio, re-presented. */
  paragraphs: [
    "I'm a Computer Science student at Indore Institute of Science and Technology (CSE '28) who learns by shipping. Over the last year I've gone from practicing DSA and JavaScript to designing and building production-grade systems — an open-source AI desktop app in Rust, AI-powered SaaS for Indian businesses, and automation that runs end to end.",
    "My core interest is local-first, provider-agnostic AI tooling: software that respects users, keeps their keys on their own machines, and doesn't put a middleman in the request path. Alongside that I care about security and infrastructure — Linux, Docker, networking, and ethical hacking are part of how I think about building.",
    "I'm building for Bharat: tools that work on real devices, on real networks, for real people — and I'm open to internships, freelance work, and collaborations.",
  ],
  strengths: [
    {
      title: "Full-stack engineering",
      detail:
        "React / Next.js + TypeScript on the front, Node and Python services behind, Postgres/Prisma and SQLite for data.",
    },
    {
      title: "Applied AI",
      detail:
        "Local + cloud LLMs, agent runtimes, provider registries, Ollama, and AI-in-the-loop product features.",
    },
    {
      title: "Systems & Rust",
      detail:
        "A Tauri + Rust desktop core with a sandboxed agent runtime, OS-keychain secrets, and SQLite persistence.",
    },
    {
      title: "Security & DevOps",
      detail:
        "Linux, Docker, networking, CI, and an ethical-hacking mindset (CEH) applied to how I design systems.",
    },
  ],
  currentFocus: [
    "Shipping Nitin-AI v0.1.0-beta toward signed installers",
    "Daily DSA practice",
    "AI-powered SaaS for Indian freelancers & SMBs",
  ],
} as const;
