import type { MetadataRoute } from "next";
import { portfolioData } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    name: `${portfolioData.personal.name} Portfolio`,
    short_name: portfolioData.personal.name,
    description: portfolioData.personal.shortBio,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfc",
    theme_color: "#121212",
    id: siteUrl,
  };
}
