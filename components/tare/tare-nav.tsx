"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X, ShieldCheck } from "lucide-react";

export default function TareNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080808]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Wordmark & Portfolio Back link */}
          <div className="flex items-center gap-6">
            <Link
              href="/tare"
              className="flex items-center gap-2.5 text-neutral-100 hover:text-white transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center font-mono font-bold text-xs text-neutral-200 group-hover:border-white/30 transition-colors shadow-sm">
                T
              </div>
              <span className="font-semibold text-lg tracking-tight">Tare</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                <ShieldCheck size={11} className="text-emerald-400" />
                Local-First
              </span>
            </Link>

            <div className="hidden lg:block h-4 w-px bg-white/10" />

            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to portfolio</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <a
              href="/tare#features"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="/tare#budgets"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Budgets
            </a>
            <a
              href="/tare#analytics"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Analytics
            </a>
            <a
              href="/tare#privacy"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Architecture
            </a>
            <a
              href="/tare#reports"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Reports
            </a>
            <Link
              href="/tare/privacy-policy"
              className="text-sm text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10"
            >
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Privacy Policy</span>
            </Link>
          </nav>

          {/* Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/tare#features"
              className="hidden sm:inline-flex items-center justify-center text-xs font-medium px-4 py-2 rounded-lg bg-neutral-100 text-neutral-950 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
            >
              Explore Tare
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-10">
          <nav className="flex flex-col gap-4">
            <a
              href="/tare#features"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-medium text-neutral-300 hover:text-white py-2 border-b border-white/5"
            >
              Features
            </a>
            <a
              href="/tare#budgets"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-medium text-neutral-300 hover:text-white py-2 border-b border-white/5"
            >
              Budgets
            </a>
            <a
              href="/tare#analytics"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-medium text-neutral-300 hover:text-white py-2 border-b border-white/5"
            >
              Analytics
            </a>
            <a
              href="/tare#privacy"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-medium text-neutral-300 hover:text-white py-2 border-b border-white/5"
            >
              Architecture
            </a>
            <a
              href="/tare#reports"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-medium text-neutral-300 hover:text-white py-2 border-b border-white/5"
            >
              Reports
            </a>

            <Link
              href="/tare/privacy-policy"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-medium text-emerald-400 hover:text-emerald-300 py-2 border-b border-white/5 flex items-center gap-2"
            >
              <ShieldCheck size={18} />
              <span>Detailed Privacy Policy</span>
            </Link>

            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white pt-4"
            >
              <ArrowLeft size={16} />
              Return to Akhil&apos;s Portfolio
            </Link>
          </nav>

          <div className="pt-6 border-t border-white/10">
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center text-sm font-semibold py-3 rounded-xl bg-neutral-100 text-neutral-950"
            >
              Explore Tare
            </a>
          </div>
        </div>
      )}
    </>
  );
}
