import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import PageTransition from "@/components/page-transition";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cache } from "react";
import { AiSummary } from "@/components/blog/ai-summary";
import { getArticleJsonLd } from "@/lib/seo";

export const revalidate = 60; // Revalidate every 60 seconds

type Props = {
  params: Promise<{ slug: string }>;
};

const getBlogBySlug = cache(async (slug: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !blog) return null;
  return blog;
});

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: `${blog.title} | Athuluri Akhil`,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      type: "article",
      publishedTime: blog.created_at,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd(blog)) }}
      />
      <PageTransition className="pt-32 pb-24 px-6 md:px-12 xl:px-24 w-full mx-auto max-w-7xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft size={16} /> Back to all articles
      </Link>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Main Content (Left) */}
        <div className="lg:col-span-8 xl:col-span-8">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              {blog.read_time && (
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {blog.read_time}
                </div>
              )}
            </div>
          </header>

          <div className="prose prose-lg prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="lg:col-span-4 xl:col-span-4">
          <div className="sticky top-32">
            <AiSummary title={blog.title} content={blog.content} />
          </div>
        </div>
      </div>
    </PageTransition>
    </>
  );
}
