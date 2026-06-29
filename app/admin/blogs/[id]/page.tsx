"use client";

import { useEffect, useState, use } from "react";
import PageTransition from "@/components/page-transition";
import { BlogForm } from "@/components/admin/blog-form";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        const res = await fetch(`/api/admin/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          }
        });
        if (res.ok) {
          const data = await res.json();
          setBlog(data.blog);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <PageTransition className="pt-32 pb-16 px-6 md:px-12 xl:px-24 w-full mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Blog</h1>
        <p className="text-muted-foreground">Update your existing article.</p>
      </div>

      {isLoading ? (
        <p className="animate-pulse">Loading blog data...</p>
      ) : blog ? (
        <BlogForm initialData={blog} isEdit={true} />
      ) : (
        <p className="text-red-500">Blog not found.</p>
      )}
    </PageTransition>
  );
}
