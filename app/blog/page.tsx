import PageTransition from '@/components/page-transition';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60; // Revalidate every 60 seconds

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

export default async function BlogPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: posts, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
  }

  if (!posts || posts.length === 0) {
    return (
      <PageTransition className="pt-32 pb-16 px-6 md:px-12 xl:px-24 w-full mx-auto max-w-7xl">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Writing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">No blog posts available yet.</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-32 pb-16 px-6 md:px-12 xl:px-24 w-full mx-auto max-w-7xl">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Writing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thoughts on software engineering, design, and building products.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <article className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-foreground/30 transition-colors">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
                {post.read_time && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.read_time}
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:gap-3 transition-all">
                Read article <ArrowRight size={16} />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </PageTransition>
  );
}
