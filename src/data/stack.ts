export type StackCategory = {
  domain: string;
  items: string[];
};

/** Categorized tech stack — grounded in technologies actually used across the projects. */
export const stack: StackCategory[] = [
  {
    domain: "Languages",
    items: ["TypeScript", "Python", "Rust", "JavaScript", "SQL"],
  },
  {
    domain: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js / R3F", "shadcn/ui"],
  },
  {
    domain: "Backend",
    items: ["Node.js", "Next.js API", "Prisma", "REST APIs", "Tauri (Rust)"],
  },
  {
    domain: "AI / ML",
    items: ["Ollama", "OpenAI", "Anthropic", "Google Gemini", "OpenRouter", "Pyodide"],
  },
  {
    domain: "Databases",
    items: ["PostgreSQL", "SQLite", "Prisma ORM"],
  },
  {
    domain: "DevOps & Cloud",
    items: ["Docker", "Git", "GitHub Actions", "Linux", "Oracle Cloud (OCI)", "Vercel"],
  },
  {
    domain: "Security",
    items: ["Ethical Hacking (CEH)", "Networking", "OS Keychain / Secrets"],
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  detail: string;
  kind: "education" | "cert" | "work" | "milestone";
};

/** Experience & learning journey — from the live portfolio's career section + GitHub history. */
export const timeline: TimelineItem[] = [
  {
    period: "2024 — 2028",
    title: "B.Tech, Computer Science & Engineering",
    org: "Indore Institute of Science and Technology, Indore",
    detail:
      "Coursework: Data Structures, Algorithms, OOP, DBMS, Operating Systems, Computer Networks.",
    kind: "education",
  },
  {
    period: "2025",
    title: "Started shipping in public",
    org: "GitHub @nitinsingh2006",
    detail:
      "Moved from DSA & JavaScript practice to building real products — AI SaaS, automation, and developer tools.",
    kind: "milestone",
  },
  {
    period: "2025",
    title: "Oracle Cloud Infrastructure — Developer & DevOps Professional",
    org: "Oracle (OCI 2025)",
    detail: "OCI Developer Professional and OCI DevOps Professional certifications.",
    kind: "cert",
  },
  {
    period: "2025",
    title: "Certified Ethical Hacker (CEH) & Networking Foundations",
    org: "Certification",
    detail:
      "Security-first mindset applied to system design; plus Full-Stack Web Development with AI training.",
    kind: "cert",
  },
  {
    period: "2026",
    title: "Nitin-AI — open-source AI workstation",
    org: "Rust + Tauri · v0.1.0-beta",
    detail:
      "Designed and built a local-first, provider-agnostic AI desktop app: 7 Rust crates, sandboxed agent runtime, OS-keychain secrets.",
    kind: "work",
  },
];

export type Certification = { name: string; issuer: string };
export const certifications: Certification[] = [
  { name: "OCI Developer Professional", issuer: "Oracle Cloud Infrastructure 2025" },
  { name: "OCI DevOps Professional", issuer: "Oracle Cloud Infrastructure 2025" },
  { name: "Certified Ethical Hacker (CEH)", issuer: "Certification" },
  { name: "Full-Stack Web Development with AI", issuer: "Training" },
  { name: "Networking Foundations", issuer: "Certification" },
];
