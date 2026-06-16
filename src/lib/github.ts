import { site } from "@/data/site";

export type RepoSummary = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
};

export type ContribDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = {
  total: number;
  weeks: ContribDay[][];
};

export type GitHubStats = {
  repos: number;
  followers: number;
  memberSince: string;
  totalStars: number;
  topLanguages: { name: string; percent: number }[];
  latestRepos: RepoSummary[];
  ok: boolean;
};

const GITHUB_API = "https://api.github.com";

/**
 * Server-side GitHub stats. Cached with ISR (revalidate every 20 minutes).
 * Degrades gracefully: if the API is unavailable or rate-limited, returns
 * sensible fallbacks so the page still renders fully.
 */
export async function getGitHubStats(): Promise<GitHubStats> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const fallback: GitHubStats = {
    repos: 12,
    followers: 0,
    memberSince: "2025",
    totalStars: 0,
    topLanguages: [
      { name: "TypeScript", percent: 55 },
      { name: "Rust", percent: 24 },
      { name: "Python", percent: 13 },
      { name: "JavaScript", percent: 8 },
    ],
    latestRepos: [],
    ok: false,
  };

  try {
    const userRes = await fetch(`${GITHUB_API}/users/${site.githubUser}`, {
      headers,
      next: { revalidate: 1200 },
    });
    if (!userRes.ok) return fallback;
    const user = await userRes.json();

    const reposRes = await fetch(
      `${GITHUB_API}/users/${site.githubUser}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 1200 } },
    );
    type RawRepo = {
      name: string;
      description: string | null;
      language: string | null;
      size: number;
      fork: boolean;
      stargazers_count: number;
      forks_count: number;
      html_url: string;
      updated_at: string;
      pushed_at: string;
    };
    const repos: RawRepo[] = reposRes.ok ? await reposRes.json() : [];

    const langTotals = new Map<string, number>();
    let totalStars = 0;
    for (const r of repos) {
      if (r.fork) continue;
      totalStars += r.stargazers_count || 0;
      if (!r.language) continue;
      langTotals.set(r.language, (langTotals.get(r.language) ?? 0) + (r.size || 1));
    }
    const total = [...langTotals.values()].reduce((a, b) => a + b, 0) || 1;
    const topLanguages = [...langTotals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, size]) => ({ name, percent: Math.round((size / total) * 100) }));

    const latestRepos: RepoSummary[] = repos
      .filter((r) => !r.fork)
      .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        url: r.html_url,
        updatedAt: r.pushed_at,
      }));

    return {
      repos: user.public_repos ?? fallback.repos,
      followers: user.followers ?? 0,
      memberSince: user.created_at ? new Date(user.created_at).getFullYear().toString() : "2025",
      totalStars,
      topLanguages: topLanguages.length ? topLanguages : fallback.topLanguages,
      latestRepos,
      ok: true,
    };
  } catch {
    return fallback;
  }
}

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/**
 * Real contribution calendar via the GitHub GraphQL API. Requires GITHUB_TOKEN
 * (GraphQL is authenticated-only). Returns null when no token is set or the call
 * fails — callers fall back to the third-party chart image.
 */
export async function getContributions(): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

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
    if (!cal) return null;

    const weeks: ContribDay[][] = cal.weeks.map(
      (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVEL_MAP[d.contributionLevel] ?? 0,
        })),
    );

    return { total: cal.totalContributions ?? 0, weeks };
  } catch {
    return null;
  }
}
