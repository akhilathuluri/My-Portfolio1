"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const supabase = createBrowserSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const res = await fetch("/api/admin/blogs", {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const supabase = createBrowserSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const res = await fetch(`/api/admin/blogs/${id}`, { 
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        }
      });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageTransition className="pt-32 pb-16 px-6 md:px-12 xl:px-24 w-full mx-auto max-w-7xl">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Admin Panel
      </Link>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold">Manage Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors"
        >
          <Plus size={18} /> New Blog
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 border border-border rounded-xl bg-card">
          <p className="text-muted-foreground animate-pulse">Loading blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center p-12 border border-border rounded-xl bg-card">
          <p className="text-muted-foreground">No blogs found. Create one to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-6 bg-card border border-border rounded-xl hover:border-foreground/30 transition-colors">
              <div>
                <h3 className="font-semibold text-xl mb-1">{blog.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.published ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                  <span className="font-mono text-xs opacity-70">/{blog.slug}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/blogs/${blog.id}`}
                  className="p-2.5 bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                  title="Edit Blog"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="p-2.5 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                  title="Delete Blog"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
