"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "./markdown-editor";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function calculateReadTime(text: string): string {
  if (!text.trim()) return "1 min read";
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    read_time: initialData?.read_time || "",
    content: initialData?.content || "",
    published: initialData?.published || false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      
      // Auto-generate slug if title changes and we haven't manually edited the slug
      if (field === "title" && !isEdit && !prev.slug) {
        newData.slug = generateSlug(value);
      }
      
      // Auto-calculate read time when content changes
      if (field === "content") {
        newData.read_time = calculateReadTime(value);
      }
      
      return newData;
    });
  };

  const handleSlugBlur = () => {
    if (!formData.slug && formData.title) {
      handleChange("slug", generateSlug(formData.title));
    } else if (formData.slug) {
      handleChange("slug", generateSlug(formData.slug)); // Sanitize
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = isEdit ? `/api/admin/blogs/${initialData.id}` : `/api/admin/blogs`;
      const method = isEdit ? "PUT" : "POST";

      const supabase = createBrowserSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save blog");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            required
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Blog Title"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug (URL)</label>
          <input
            required
            value={formData.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            onBlur={handleSlugBlur}
            className="w-full rounded-xl border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono text-sm"
            placeholder="blog-title"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Read Time (Auto-generated)</label>
          <input
            readOnly
            value={formData.read_time}
            className="w-full rounded-xl border border-border bg-muted/50 px-4 py-2 focus:outline-none text-muted-foreground cursor-not-allowed"
            placeholder="e.g. 5 min read"
          />
        </div>
        <div className="space-y-2 flex items-end pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => handleChange("published", e.target.checked)}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Publish instantly</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Excerpt</label>
        <textarea
          rows={2}
          value={formData.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          placeholder="Brief summary for the blog list..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content (Markdown)</label>
        <MarkdownEditor
          value={formData.content}
          onChange={(val) => handleChange("content", val)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="px-6 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Blog"}
        </button>
      </div>
    </form>
  );
}
