"use client";

import { useState, useEffect } from "react";
import { Sparkles, AlertCircle } from "lucide-react";

interface AiSummaryProps {
  title: string;
  content: string;
}

export function AiSummary({ title, content }: AiSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchSummary() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/blog/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate summary");
      }

      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden group">
      <div className="flex items-center gap-2 mb-3 text-primary font-medium">
        <Sparkles size={18} className="animate-pulse" />
        <h3>AI Summary</h3>
      </div>
      
      {!summary && !loading && !error ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">
            Want a quick overview? Ask AI to summarize this post for you!
          </p>
          <button
            onClick={fetchSummary}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
          >
            <Sparkles size={16} />
            Generate Summary
          </button>
        </div>
      ) : loading ? (
        <div className="space-y-3 mt-4">
          <div className="h-4 bg-primary/10 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-primary/10 rounded w-[90%] animate-pulse"></div>
          <div className="h-4 bg-primary/10 rounded w-[75%] animate-pulse"></div>
        </div>
      ) : error ? (
        <div className="flex items-start gap-2 text-sm text-muted-foreground mt-4">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : (
        <p className="text-muted-foreground leading-relaxed mt-4">
          {summary}
        </p>
      )}
      
      {/* Decorative gradient blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
