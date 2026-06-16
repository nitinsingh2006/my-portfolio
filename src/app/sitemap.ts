import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date("2026-06-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/resume`,
      lastModified: new Date("2026-06-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
