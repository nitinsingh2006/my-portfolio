import { site } from "@/data/site";
import { ContribDay, ContribWeek, MonthLabel, ContributionsData } from "./types";

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function formatDisplayDate(dateStr: string): string {
  try {
    const d = new Date(`${dateStr}T00:00:00Z`);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

function parseMonthLabels(weeks: ContribWeek[]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let lastMonth = "";

  weeks.forEach((week, weekIdx) => {
    const firstDay = week[0];
    if (!firstDay) return;

    try {
      const d = new Date(`${firstDay.date}T00:00:00Z`);
      const monthName = d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });

      if (monthName !== lastMonth) {
        // Prevent label overlap if months are too close (e.g. less than 3 columns apart)
        const lastLabel = labels[labels.length - 1];
        if (!lastLabel || weekIdx - lastLabel.weekIndex >= 3) {
          labels.push({ name: monthName, weekIndex: weekIdx });
          lastMonth = monthName;
        }
      }
    } catch {
      // Ignore date parse error
    }
  });

  return labels;
}

/**
 * Primary GraphQL fetcher when GITHUB_TOKEN is available.
 */
async function fetchViaGraphQL(token: string): Promise<ContributionsData | null> {
  const query = `query($login:String!){
    user(login:$login){
      contributionsCollection{
        contributionCalendar{
          totalContributions
          weeks{ contributionDays{ date contributionCount contributionLevel } }
        }
      }
    }
  }`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: site.githubUser } }),
      next: { revalidate: 1200 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal || !Array.isArray(cal.weeks)) return null;

    let total = cal.totalContributions ?? 0;
    const weeks: ContribWeek[] = cal.weeks.map(
      (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVEL_MAP[d.contributionLevel] ?? 0,
          displayDate: formatDisplayDate(d.date),
        })),
    );

    const months = parseMonthLabels(weeks);
    return {
      total,
      weeks,
      months,
      lastSyncedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/**
 * Direct HTML parser fetcher for GitHub contribution calendar.
 * Works server-side without an API token, parsing real GitHub contribution data.
 */
async function fetchViaHtml(): Promise<ContributionsData | null> {
  try {
    const res = await fetch(`https://github.com/users/${site.githubUser}/contributions`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      next: { revalidate: 1200 },
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Extract tooltips map
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/gi;
    const tooltips = new Map<string, string>();
    let tipMatch;
    while ((tipMatch = tooltipRegex.exec(html)) !== null) {
      tooltips.set(tipMatch[1], tipMatch[2].trim());
    }

    // Match all contribution day cells
    const tdRegex = /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/gi;
    const allDays: ContribDay[] = [];
    let tdMatch;

    while ((tdMatch = tdRegex.exec(html)) !== null) {
      const tag = tdMatch[0];
      const dateMatch = tag.match(/data-date="([^"]+)"/i);
      const levelMatch = tag.match(/data-level="([^"]+)"/i);
      const idMatch = tag.match(/id="([^"]+)"/i);

      if (dateMatch && levelMatch) {
        const date = dateMatch[1];
        const level = (parseInt(levelMatch[1], 10) || 0) as 0 | 1 | 2 | 3 | 4;
        const id = idMatch ? idMatch[1] : "";
        const tipText = id ? tooltips.get(id) || "" : "";

        let count = 0;
        const countMatch = tipText.match(/^(\d+|No)\s+contribution/i);
        if (countMatch) {
          count = countMatch[1].toLowerCase() === "no" ? 0 : parseInt(countMatch[1], 10);
        }

        allDays.push({
          date,
          count,
          level,
          displayDate: formatDisplayDate(date),
        });
      }
    }

    if (allDays.length === 0) return null;

    // Group into 7-day weeks
    const weeks: ContribWeek[] = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }

    const total = allDays.reduce((sum, day) => sum + day.count, 0);
    const months = parseMonthLabels(weeks);

    return {
      total,
      weeks,
      months,
      lastSyncedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/**
 * Server-side GitHub contribution calendar.
 * Uses GitHub GraphQL API if token is present, otherwise direct GitHub HTML calendar parsing.
 * Revalidated via Next.js ISR (20 minutes).
 */
export async function getContributions(): Promise<ContributionsData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const gqlData = await fetchViaGraphQL(token);
    if (gqlData) return gqlData;
  }

  return await fetchViaHtml();
}
