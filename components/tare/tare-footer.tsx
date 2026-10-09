"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function TareFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#080808] py-16 px-6 sm:px-8 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand & Statement */}
        <div className="space-y-2 max-w-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-neutral-900 border border-white/15 flex items-center justify-center font-mono font-bold text-xs text-neutral-200">
              T
            </div>
            <span className="font-semibold text-neutral-200 tracking-tight">Tare</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
              v1.0 Local-First
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            &ldquo;Remove the noise. See the true number.&rdquo; Personal finance, offline-first. Your financial data stays permanently on your device.
          </p>
        </div>

        {/* Section Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
          <a href="/tare#features" className="hover:text-neutral-200 transition-colors">
            Features
          </a>
          <a href="/tare#budgets" className="hover:text-neutral-200 transition-colors">
            Budgets
          </a>
          <a href="/tare#analytics" className="hover:text-neutral-200 transition-colors">
            Analytics
          </a>
          <a href="/tare#privacy" className="hover:text-neutral-200 transition-colors">
            Architecture
          </a>
          <a href="/tare#reports" className="hover:text-neutral-200 transition-colors">
            Reports
          </a>
          <Link href="/tare/privacy-policy" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
            Privacy Policy
          </Link>
        </div>

        {/* Portfolio Link & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 transition-all font-mono"
          >
            <ArrowLeft size={13} />
            <span>By Akhil Athuluri</span>
          </Link>

          <span className="font-mono text-[11px] text-neutral-400">
            © {currentYear} Tare. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
