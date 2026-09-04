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

/**
 * Metadata catalog for official GitHub Achievements.
 * Extensible for future badges exposed by GitHub.
 */
export const ACHIEVEMENT_CATALOG: Record<string, AchievementMeta> = {
  "pair-extraordinaire": {
    slug: "pair-extraordinaire",
    name: "Pair Extraordinaire",
    description: "Co-authored commits on a merged pull request",
    defaultIconUrl: "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "pull-shark": {
    slug: "pull-shark",
    name: "Pull Shark",
    description: "Opened pull requests that have been merged",
    defaultIconUrl: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "quickdraw": {
    slug: "quickdraw",
    name: "Quickdraw",
    description: "Closed an issue or pull request within 5 minutes of opening",
    defaultIconUrl: "https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "yolo": {
    slug: "yolo",
    name: "YOLO",
    description: "Merged a pull request without code review",
    defaultIconUrl: "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "starstruck": {
    slug: "starstruck",
    name: "Starstruck",
    description: "Created a repository that has earned many stars",
    defaultIconUrl: "https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "galaxy-brain": {
    slug: "galaxy-brain",
    name: "Galaxy Brain",
    description: "Answered discussions with accepted solutions",
    defaultIconUrl: "https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "open-sourcerer": {
    slug: "open-sourcerer",
    name: "Open Sourcerer",
    description: "Contributed to open source projects across the GitHub ecosystem",
    defaultIconUrl: "https://github.githubassets.com/images/modules/profile/achievements/open-sourcerer-default.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
};

/**
 * Fallback verified achievement data for nitinsingh2006.
 * Sourced directly from verified GitHub profile presence.
 * NEVER uses fake statistics or fake unlock dates.
 */
export const VERIFIED_ACHIEVEMENTS: GitHubAchievement[] = [
  {
    slug: "pair-extraordinaire",
    name: "Pair Extraordinaire",
    description: "Co-authored commits on a merged pull request",
    tier: "default",
    iconUrl: "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png",
    link: "https://github.com/nitinsingh2006?tab=achievements",
    verified: true,
  },
];
