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
 * Sourced from official GitHub asset CDN URLs.
 */
export const ACHIEVEMENT_CATALOG: Record<string, AchievementMeta> = {
  "quickdraw": {
    slug: "quickdraw",
    name: "Quickdraw",
    description: "Closed an issue or pull request within 5 minutes of opening",
    defaultIconUrl: "https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "yolo": {
    slug: "yolo",
    name: "YOLO",
    description: "Merged a pull request without code review",
    defaultIconUrl: "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "pair-extraordinaire": {
    slug: "pair-extraordinaire",
    name: "Pair Extraordinaire",
    description: "Co-authored commits on a merged pull request",
    defaultIconUrl: "https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "pull-shark": {
    slug: "pull-shark",
    name: "Pull Shark",
    description: "Opened pull requests that have been merged",
    defaultIconUrl: "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "starstruck": {
    slug: "starstruck",
    name: "Starstruck",
    description: "Created a repository that has earned many stars",
    defaultIconUrl: "https://github.githubassets.com/assets/starstruck-default-b6fa0f074d08.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "galaxy-brain": {
    slug: "galaxy-brain",
    name: "Galaxy Brain",
    description: "Answered discussions with accepted solutions",
    defaultIconUrl: "https://github.githubassets.com/assets/galaxy-brain-default-5561a349c289.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
  "open-sourcerer": {
    slug: "open-sourcerer",
    name: "Open Sourcerer",
    description: "Contributed to open source projects across the GitHub ecosystem",
    defaultIconUrl: "https://github.githubassets.com/assets/open-sourcerer-default-29fa378297b8.png",
    githubDocsLink: "https://github.com/nitinsingh2006?tab=achievements",
  },
};

/**
 * Fallback verified achievement data for nitinsingh2006.
 * Sourced directly from verified GitHub profile presence for nitinsingh2006.
 * Contains ALL THREE verified achievements present on profile.
 */
export const VERIFIED_ACHIEVEMENTS: GitHubAchievement[] = [
  {
    slug: "quickdraw",
    name: "Quickdraw",
    description: "Closed an issue or pull request within 5 minutes of opening",
    tier: "default",
    iconUrl: "https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png",
    link: "https://github.com/nitinsingh2006?tab=achievements",
    verified: true,
  },
  {
    slug: "yolo",
    name: "YOLO",
    description: "Merged a pull request without code review",
    tier: "default",
    iconUrl: "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
    link: "https://github.com/nitinsingh2006?tab=achievements",
    verified: true,
  },
  {
    slug: "pair-extraordinaire",
    name: "Pair Extraordinaire",
    description: "Co-authored commits on a merged pull request",
    tier: "default",
    iconUrl: "https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png",
    link: "https://github.com/nitinsingh2006?tab=achievements",
    verified: true,
  },
];
