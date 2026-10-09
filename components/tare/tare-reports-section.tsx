"use client";

import React, { useState } from "react";
import Image from "next/image";
import TareDeviceFrame from "./tare-device-frame";
import { 
  CalendarRange, 
  ArrowUpRight, 
  ArrowDownRight, 
  Flame, 
  BarChart3,
  Check
} from "lucide-react";
import styles from "./tare.module.css";

export default function TareReportsSection() {
  const [reportMode, setReportMode] = useState<"yoy" | "daterange">("yoy");

  return (
    <section id="reports" className="relative py-24 sm:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <BarChart3 size={13} className="text-neutral-400" />
            <span>Deep Retrospective Analysis</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-neutral-100">
            Less guesswork.
            <br />
            More perspective.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl">
            Compare entire seasons and multi-year shifts without sending a single line of your financial history to a cloud server. 
            Tare reveals how your habits change over time.
          </p>

          {/* Mode Switcher */}
          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={() => setReportMode("yoy")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                reportMode === "yoy"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/10"
              }`}
            >
              Year-over-Year (2025 vs 2026)
            </button>
            <button
              onClick={() => setReportMode("daterange")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                reportMode === "daterange"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/10"
              }`}
            >
              Custom 30-Day Date Range
            </button>
          </div>
        </div>

        {/* Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Authentic Device Screenshot */}
          <div className="lg:col-span-6 flex justify-center">
            {reportMode === "yoy" ? (
              <div className="w-full max-w-[340px] sm:max-w-[370px] space-y-4">
                <div className="relative rounded-3xl p-2 bg-[#0e0e11] border border-white/10 shadow-2xl overflow-hidden">
                  <div className="text-[11px] font-mono text-neutral-400 px-3 py-1.5 flex justify-between items-center border-b border-white/10 mb-2">
                    <span>Year-over-Year Ledger</span>
                    <span className="text-neutral-500">Full Scroll Capture</span>
                  </div>
                  {/* Scrollable container for the extended tall screenshot */}
                  <div className="relative h-[560px] sm:h-[620px] overflow-y-auto rounded-2xl border border-white/5 scrollbar-thin scrollbar-thumb-white/10 bg-black">
                    <Image
                      src="/assets/tare-year-comparison.png"
                      alt="Tare Year-over-Year comparison report between October 2025 and October 2026"
                      width={413}
                      height={2560}
                      className="w-full h-auto select-none"
                    />
                  </div>
                </div>
                <p className="text-xs font-mono text-neutral-400 text-center">
                  Scroll container showing deep category breakdown (Oct 2025 vs Oct 2026)
                </p>
              </div>
            ) : (
              <TareDeviceFrame
                key="reports-daterange"
                src="/assets/tare-reports.png"
                alt="Tare Date Range report showing 30 days summary, daily spend, and single highest spend day"
                badge="30-Day Period Analysis"
                caption="Day velocity: ₹12,454/day across 161 payments"
              />
            )}
          </div>

          {/* Right Column: Real Extracted Insights */}
          <div className="lg:col-span-6 space-y-6">
            
            {reportMode === "yoy" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-200">
                    October 2025 vs October 2026
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Multi-period delta highlighting shifts in lifestyle and spending buckets.
                  </p>
                </div>

                {/* Primary Comparison Metric Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Oct 2025 Spent</span>
                    <div className="text-lg font-semibold text-neutral-300">₹1,93,737.00</div>
                    <span className="text-xs text-neutral-500">73 payments</span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Oct 2026 Spent</span>
                    <div className="text-lg font-semibold text-neutral-100">₹2,37,045.36</div>
                    <span className="text-xs text-red-400 flex items-center gap-0.5">
                      <ArrowUpRight size={12} />
                      +₹43,308.36 (+22.4%)
                    </span>
                  </div>
                </div>

                {/* Category Deltas directly from screenshot */}
                <div className="p-5 rounded-2xl bg-neutral-900/30 border border-white/10 space-y-3">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Where Spending Changed Most:
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                      <span className="text-neutral-200 font-medium">🍔 Saved on Food & Dining</span>
                      <span className="text-emerald-400 font-mono">Saved ₹14,471.00 (-25.9%)</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-red-950/20 border border-red-500/20">
                      <span className="text-neutral-200 font-medium">🛍️ Spent More on Shopping</span>
                      <span className="text-red-400 font-mono">+₹65,817.00 (+230.7%)</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-neutral-950/40 border border-white/5">
                      <span className="text-neutral-300 font-medium">🚗 Commute Optimization</span>
                      <span className="text-emerald-400 font-mono">Saved ₹8,762.64 (-41.8%)</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-neutral-950/40 border border-white/5">
                      <span className="text-neutral-300 font-medium">⚡ Utility Reductions</span>
                      <span className="text-emerald-400 font-mono">Saved ₹4,362.00 (-18.5%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-200">
                    30-Day Window: 10 Sep – 9 Oct
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Continuous cadence analysis to identify velocity anomalies and payment frequencies.
                  </p>
                </div>

                {/* Total Spent & Outlier Card */}
                <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Total Money Spent (30 Days)
                    </span>
                    <div className="text-3xl font-semibold text-neutral-100 mt-1">
                      ₹3,73,630.36
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      161 payments made • ₹12,454.35 spent per day
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">Average Per Payment</span>
                      <div className="text-lg font-medium text-neutral-200 mt-0.5">₹2,320.69</div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">Cash Inflow</span>
                      <div className="text-lg font-medium text-neutral-200 mt-0.5">₹3,35,119.00</div>
                    </div>
                  </div>
                </div>

                {/* Single Day Spike Highlight */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
                      <Flame size={16} />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase text-neutral-400">Single Highest Spend Day</span>
                      <div className="text-sm font-semibold text-neutral-200">2 Oct 2026</div>
                    </div>
                  </div>
                  <div className="text-base font-mono font-semibold text-neutral-100">
                    ₹70,418.00
                  </div>
                </div>

              </div>
            )}

            {/* Philosophy quote */}
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-white/5 text-xs text-neutral-400 italic">
              &ldquo;Remove the noise. See the true number.&rdquo; — The foundational design principle of Tare.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
