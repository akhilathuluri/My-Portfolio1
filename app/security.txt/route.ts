import { NextResponse } from "next/server";
import { portfolioData } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";

export const runtime = "nodejs";

export async function GET() {
  const siteUrl = getSiteUrl();

  const body = [
    `Contact: mailto:${portfolioData.personal.email}`,
    `Expires: ${new Date(Date.now() + 31536000000).toISOString()}`,
    `Canonical: ${siteUrl}/security.txt`,
    "Preferred-Languages: en",
    `Policy: ${siteUrl}/contact`,
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
