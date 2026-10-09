"use client";

import React from "react";
import { ArrowDown, Shield, Database, Lock, EyeOff } from "lucide-react";
import TareDeviceFrame from "./tare-device-frame";
import TareStoreButtons from "./tare-store-buttons";
import styles from "./tare.module.css";

export default function TareHero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-24 md:pb-36 overflow-hidden">
      {/* Background Lighting */}
      <div className={styles.ambientGlowTop} />
      <div className={styles.gridBackground} style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Privacy statement badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Local-first. No accounts. No telemetry. No cloud.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-[-0.04em] text-neutral-100 leading-[1.02]">
            Your money.
            <br />
            <span className="text-neutral-500">Nothing else.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Tare is a personal finance app built around a simple idea: your financial
            life should stay yours. Track spending, understand your habits, and plan your
            money — with your data stored on your device.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 text-neutral-950 font-medium text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all"
            >
              <span>Explore the features</span>
              <ArrowDown size={15} />
            </a>

            <a
              href="#privacy"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 font-medium text-sm hover:text-white hover:border-white/20 hover:bg-neutral-850 transition-all"
            >
              <Shield size={15} className="text-neutral-400" />
              <span>Why Tare is different</span>
            </a>
          </div>

          {/* Download on Stores */}
          <div className="pt-3 flex flex-col items-center gap-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              Download application
            </span>
            <TareStoreButtons />
          </div>

          {/* Four Core Trust Indicators */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-neutral-400">
              <Database size={12} className="text-neutral-300" />
              <span>On-device only</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-neutral-400">
              <EyeOff size={12} className="text-neutral-300" />
              <span>Zero telemetry</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-neutral-400">
              <Lock size={12} className="text-neutral-300" />
              <span>No user accounts</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-neutral-400">
              <Shield size={12} className="text-neutral-300" />
              <span>Offline-first</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Composition: Layered Authentic Hardware Devices */}
        <div id="hero-preview" className="mt-16 sm:mt-24 relative flex items-center justify-center">
          {/* Subtle Ambient Radial Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[450px] bg-white/[0.035] rounded-full blur-[100px] pointer-events-none" />

          {/* Composition Container */}
          <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 lg:gap-12">
            
            {/* Primary Phone (Ledger Interface) */}
            <div className="relative z-20 w-full max-w-[310px] sm:max-w-[340px] transform hover:-translate-y-1 transition-transform duration-500">
              {/* Feature Pill Callout */}
              <div className="hidden sm:flex absolute -left-12 top-24 z-30 items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141416]/90 backdrop-blur-md border border-white/10 shadow-2xl text-[11px] font-mono text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>₹2,37,045.36 Ledger Balance</span>
              </div>

              <TareDeviceFrame
                src="/assets/tare-ledger.png"
                alt="Tare Transaction Ledger showing monthly spending trendline and categorized transactions"
                priority={true}
                badge="Primary Ledger"
                caption="Clean timeline with cumulative cash curve"
              />
            </div>

            {/* Secondary Phone (Budgets & Over-budget Warning) */}
            <div className="relative z-10 w-full max-w-[290px] sm:max-w-[320px] md:-ml-8 md:mt-12 opacity-95 hover:opacity-100 hover:z-25 transform hover:-translate-y-1 transition-all duration-500">
              {/* Over-budget Indicator Callout */}
              <div className="hidden sm:flex absolute -right-8 top-28 z-30 items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141416]/90 backdrop-blur-md border border-red-500/30 shadow-2xl text-[11px] font-mono text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>Over Budget: +₹62,694.36</span>
              </div>

              <TareDeviceFrame
                src="/assets/tare-budgets.png"
                alt="Tare Budgets screen displaying active category budgets and over-budget warning indicators"
                priority={true}
                badge="Active Budgets"
                caption="Instant overrun indicators without cloud latency"
              />
            </div>

          </div>
        </div>

        {/* Ambient bottom divider line */}
        <div className="mt-24 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
