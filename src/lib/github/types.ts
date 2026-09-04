export type AchievementTier = "default" | "bronze" | "silver" | "gold";

export type GitHubAchievement = {
  slug: string;
  name: string;
  description: string;
  tier: AchievementTier;
  unlockedAt?: string;
  iconUrl: string;
  link: string;
  verified: boolean;
};

export type AchievementMeta = {
  slug: string;
  name: string;
  description: string;
  defaultIconUrl: string;
  githubDocsLink: string;
};

export type RepoSummary = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
};

export type ContribDay = {
  date: string; // YYYY-MM-DD
  count: number; // Exact count
  level: 0 | 1 | 2 | 3 | 4; // Visual intensity
  displayDate: string; // e.g. "Sep 4, 2026"
};

export type ContribWeek = ContribDay[];

export type MonthLabel = {
  name: string; // e.g. "Sep"
  weekIndex: number; // Column position in the grid
};

export type ContributionsData = {
  total: number;
  weeks: ContribWeek[];
  months: MonthLabel[];
  lastSyncedAt: string;
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

export type GitHubAchievementData = {
  achievements: GitHubAchievement[];
  lastSyncedAt: string;
  source: "live" | "verified-fallback";
};
