import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolio-content";
import { getSiteUrl, seoDefaults } from "@/lib/seo";

export const runtime = "nodejs";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const portfolioData = await getPortfolioData();
  const posts = (portfolioData.blog ?? []).slice(0, 20);

  const items = posts
    .map((post) => {
      const link = post.link?.trim() || `${siteUrl}/blog`;

      return `\n<item>\n  <title>${escapeXml(post.title)}</title>\n  <link>${escapeXml(link)}</link>\n  <guid>${escapeXml(link)}</guid>\n  <description>${escapeXml(post.excerpt)}</description>\n  <pubDate>${escapeXml(post.date || new Date().toUTCString())}</pubDate>\n</item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>${escapeXml(seoDefaults.siteName)}</title>\n  <link>${escapeXml(`${siteUrl}/blog`)}</link>\n  <description>${escapeXml(seoDefaults.description)}</description>\n  <language>en-us</language>\n  ${items}\n</channel>\n</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
