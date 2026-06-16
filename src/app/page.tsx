import { getGitHubStats } from "@/lib/github";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Flagship } from "@/components/Flagship";
import { TechStack } from "@/components/TechStack";
import { Timeline } from "@/components/Timeline";
import { GitHubSection } from "@/components/GitHubSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// Revalidate the page (and its GitHub data) every 20 minutes.
export const revalidate = 1200;

export default async function Home() {
  const stats = await getGitHubStats();

  return (
    <>
      <Nav />
      <main id="main">
        <Hero stats={stats} />
        <About />
        <Projects />
        <Flagship />
        <TechStack />
        <Timeline />
        <GitHubSection stats={stats} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
