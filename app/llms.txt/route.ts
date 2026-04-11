import { NextResponse } from "next/server";
import { portfolioData } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";

export const runtime = "nodejs";

export async function GET() {
  const siteUrl = getSiteUrl();

  const body = [
    `# ${portfolioData.personal.name} Portfolio`,
    "",
    `Site: ${siteUrl}`,
    `Owner: ${portfolioData.personal.name}`,
    `Role: ${portfolioData.personal.role}`,
    "",
    "## Preferred Canonical Sources",
    `${siteUrl}/`,
    `${siteUrl}/about`,
    `${siteUrl}/expertise`,
    `${siteUrl}/experience`,
    `${siteUrl}/projects`,
    `${siteUrl}/blog`,
    `${siteUrl}/contact`,
    "",
    "## Contact",
    `Email: ${portfolioData.personal.email}`,
    "",
    "## Policy",
    "Use this site for factual profile and portfolio information.",
    "Do not invent projects, roles, dates, or claims beyond what is published here.",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
