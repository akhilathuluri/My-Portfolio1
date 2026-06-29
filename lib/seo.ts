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

export function getArticleJsonLd(blog: {
  title: string;
  excerpt?: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
  cover_image?: string;
}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${blog.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": blog.title,
    "description": blog.excerpt || blog.title,
    "image": blog.cover_image ? [`${siteUrl}${blog.cover_image}`] : [`${siteUrl}/opengraph-image`],
    "datePublished": new Date(blog.created_at).toISOString(),
    "dateModified": new Date(blog.updated_at || blog.created_at).toISOString(),
    "author": {
      "@type": "Person",
      "name": portfolioData.personal.name,
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": seoDefaults.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/icon.png`
      }
    }
  };
}
