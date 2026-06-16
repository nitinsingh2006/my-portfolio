import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import { Loader } from "@/components/Loader";
import "./globals.css";

/* Geist — the typeface from the deployed portfolio (and Vercel's own font). */
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const description =
  "Nitin Singh — Full-Stack + AI Developer building local-first AI tools and full-stack products. Creator of Nitin-AI, an open-source AI workstation in Rust. CSE '28, IIST Indore.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    "Nitin Singh",
    "Full-Stack Developer",
    "AI Developer",
    "Rust",
    "Next.js",
    "Tauri",
    "Open Source",
    "Nitin-AI",
    "Indore",
    "IIST",
    "Portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description,
    siteName: `${site.name} · Portfolio`,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0b080c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    description,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    address: { "@type": "PostalAddress", addressLocality: "Indore", addressRegion: "MP", addressCountry: "IN" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indore Institute of Science and Technology",
    },
    knowsAbout: ["Full-Stack Development", "Artificial Intelligence", "Rust", "Next.js", "Cybersecurity", "DevOps"],
    sameAs: [site.socials.github, site.socials.linkedin],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Loader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-black"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
