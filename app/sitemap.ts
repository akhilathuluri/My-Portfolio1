import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  // 1. Define static routes
  const staticRoutes = ["", "/about", "/expertise", "/experience", "/projects", "/blog", "/contact"].map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: (route === "" ? "weekly" : "monthly") as any,
    priority: index === 0 ? 1 : 0.8,
  }));

  // 2. Fetch dynamic blog routes
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: blogs } = await supabase
      .from("blogs")
      .select("slug, updated_at, created_at")
      .eq("published", true);

    if (blogs) {
      dynamicRoutes = blogs.map((blog) => ({
        url: `${siteUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at || blog.created_at),
        changeFrequency: "weekly" as any,
        priority: 0.7,
      }));
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}
