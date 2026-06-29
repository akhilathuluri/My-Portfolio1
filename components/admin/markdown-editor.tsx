"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Bold, Italic, Link as LinkIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const replacement = `${before}${selected}${after}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    // Reset selection after state updates
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const supabase = createBrowserSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      insertText(`![Image](${data.url})`);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border overflow-hidden bg-card">
      <div className="flex items-center gap-1 border-b border-border p-2 bg-muted/30">
        <button
          type="button"
          onClick={() => insertText("**", "**")}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => insertText("*", "*")}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button
          type="button"
          onClick={() => insertText("[", "](url)")}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          title="Link"
        >
          <LinkIcon size={16} />
        </button>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            disabled={isUploading}
            title="Upload Image"
          />
          <button
            type="button"
            className="p-2 hover:bg-muted rounded-md transition-colors flex items-center gap-2"
            disabled={isUploading}
          >
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-4 resize-none outline-none bg-transparent font-mono text-sm border-r border-border focus:ring-2 focus:ring-primary/20"
          placeholder="Write your markdown here..."
        />
        <div className="p-4 bg-muted/10 overflow-y-auto max-h-[600px]">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
