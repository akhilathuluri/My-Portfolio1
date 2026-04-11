import { getPortfolioData } from '@/lib/portfolio-content';
import PageTransition from '@/components/page-transition';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing on software engineering, architecture, and building reliable digital products.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Athuluri Akhil',
    description: 'Articles and writing focused on software engineering and technical execution.',
    url: '/blog',
    type: 'website',
  },
};

export default async function Blog() {
  const portfolioData = await getPortfolioData();
  const post = portfolioData.blog[0];
  const articleLink = post?.link?.trim() ? post.link : 'https://example.com/article';

  if (!post) {
    return (
      <PageTransition className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Writing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">No blog posts available yet.</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Writing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thoughts on software engineering, design, and building products.
        </p>
      </div>

      <div className="space-y-8">
        <a
          href={articleLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <article className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-foreground/30 transition-colors">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:gap-3 transition-all">
              Read article <ArrowRight size={16} />
            </div>
          </article>
        </a>
      </div>
    </PageTransition>
  );
}
