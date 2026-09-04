import { site } from "@/data/site";
import {
  GitHubAchievement,
  GitHubAchievementData,
  AchievementTier,
} from "./types";
import { VERIFIED_ACHIEVEMENTS, ACHIEVEMENT_CATALOG } from "@/data/achievements";

/**
 * Synchronizes GitHub achievement state from GitHub profile HTML while maintaining
 * verified fallback data. Cached via Next.js ISR (revalidate every 3600s / 1 hour).
 * Never exposes secrets to the browser.
 */
export async function getGitHubAchievements(): Promise<GitHubAchievementData> {
  const now = new Date().toISOString();
  const fallbackResult: GitHubAchievementData = {
    achievements: VERIFIED_ACHIEVEMENTS,
    lastSyncedAt: now,
    source: "verified-fallback",
  };

  try {
    const res = await fetch(`https://github.com/${site.githubUser}?tab=achievements`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return fallbackResult;
    }

    const html = await res.text();
    const parsedMap = new Map<string, GitHubAchievement>();

    // Match achievement image elements from GitHub profile HTML flexible to attribute order
    const imgTagRegex = /<img[^>]*alt=["']Achievement:\s*([^"']+)["'][^>]*>/gi;
    let match;

    while ((match = imgTagRegex.exec(html)) !== null) {
      const fullTag = match[0];
      const name = match[1].trim();
      const srcMatch = fullTag.match(/src=["']([^"']+)["']/i);
      const iconUrl = srcMatch ? srcMatch[1] : "";

      const slug = name.toLowerCase().replace(/\s+/g, "-");
      if (parsedMap.has(slug)) continue;

      const catalogMeta = ACHIEVEMENT_CATALOG[slug];

      let tier: AchievementTier = "default";
      if (iconUrl.includes("-bronze")) tier = "bronze";
      else if (iconUrl.includes("-silver")) tier = "silver";
      else if (iconUrl.includes("-gold")) tier = "gold";

      parsedMap.set(slug, {
        slug,
        name: catalogMeta?.name ?? name,
        description: catalogMeta?.description ?? `GitHub achievement: ${name}`,
        tier,
        iconUrl: iconUrl || catalogMeta?.defaultIconUrl || "",
        link: `https://github.com/${site.githubUser}?tab=achievements`,
        verified: true,
      });
    }

    const parsedAchievements = Array.from(parsedMap.values());

    if (parsedAchievements.length === 0) {
      return fallbackResult;
    }

    return {
      achievements: parsedAchievements,
      lastSyncedAt: now,
      source: "live",
    };
  } catch {
    return fallbackResult;
  }
}
