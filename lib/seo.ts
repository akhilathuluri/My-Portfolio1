import { portfolioData } from "@/lib/data";

function normalizeUrl(input: string) {
  const trimmed = input.trim().replace(/\/$/, "");

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (/^localhost[:/]/i.test(trimmed)) {
    return `http://${trimmed}`;
  }

  return `https://${trimmed}`;
}

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || process.env.VERCEL_URL;

  if (fromEnv) {
    return normalizeUrl(fromEnv);
  }

  return process.env.NODE_ENV === "production"
    ? "https://athuluriakhil.vercel.app"
    : "https://athuluriakhil.vercel.app";
}

export const seoDefaults = {
  siteName: `${portfolioData.personal.name} Portfolio`,
  title: `${portfolioData.personal.name} | ${portfolioData.personal.role}`,
  description: portfolioData.personal.shortBio,
  keywords: [
    portfolioData.personal.name,
    portfolioData.personal.role,
    "Full Stack Developer",
    "Cloud Engineer",
    "React",
    "Next.js",
    "AWS",
    "DevOps",
    "Software Engineering",
    "Portfolio",
    "Personal Website",
    "artificial intelligence",
    "AI",
    "data science",
    "programming",
    "technology",
    "software development",
    "open source",
    "Retrival Augmented Generation",
    "Large Language Models",
    "Model Context Protocol",
    "Freelance",
    "Entrepreneurship",
    "web development",
    "cloud computing",
    "machine learning",
    "deep learning",
    "natural language processing",
    "computer vision",
    "neural networks",
    "algorithms",
    "data analysis",
    "big data",
    "analytics",
    "software architecture",
    "system design",
    "clean code",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
    "Athuluri Akhil",
  ],
};
