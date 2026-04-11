import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { portfolioData } from '@/lib/data';
import { getSiteUrl, seoDefaults } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const siteUrl = getSiteUrl();

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: portfolioData.personal.name,
      jobTitle: portfolioData.personal.role,
      description: portfolioData.personal.shortBio,
      email: portfolioData.personal.email,
      url: siteUrl,
      sameAs: [
        portfolioData.personal.socials.github,
        portfolioData.personal.socials.linkedin,
        portfolioData.personal.socials.twitter,
      ],
    },
    {
      '@type': 'WebSite',
      name: seoDefaults.siteName,
      url: siteUrl,
      description: seoDefaults.description,
      inLanguage: 'en',
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoDefaults.title,
    template: `%s | ${portfolioData.personal.name}`,
  },
  description: seoDefaults.description,
  applicationName: seoDefaults.siteName,
  keywords: seoDefaults.keywords,
  authors: [{ name: portfolioData.personal.name, url: siteUrl }],
  creator: portfolioData.personal.name,
  publisher: portfolioData.personal.name,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${siteUrl}/rss.xml`,
    },
  },
  verification: {
    google: '6OjjQTH2q4WA7KPU2r1XwKXRPuI5BqM_9cBjHZ4ZXcY',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: seoDefaults.title,
    description: seoDefaults.description,
    url: siteUrl,
    siteName: seoDefaults.siteName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: seoDefaults.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoDefaults.title,
    description: seoDefaults.description,
    images: ['/twitter-image'],
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Header />
          <main className="flex-grow flex">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
