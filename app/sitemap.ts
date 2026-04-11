import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const routes = ["", "/about", "/expertise", "/experience", "/projects", "/blog", "/contact"];

  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
