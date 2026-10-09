"use client";

import React, { useState } from "react";
import TareDeviceFrame from "./tare-device-frame";
import { 
  CreditCard, 
  AlertTriangle, 
  PieChart, 
  TrendingUp, 
  Check, 
  ArrowRight,
  Sliders,
  Calendar,
  Layers
} from "lucide-react";
import styles from "./tare.module.css";

export default function TareShowcase() {
  const [transactionTab, setTransactionTab] = useState<"ledger" | "entry">("ledger");
  const [analyticsTab, setAnalyticsTab] = useState<"overview" | "categories">("overview");

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Intro */}
        <div className="max-w-3xl mb-24 sm:mb-32">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
            Product Architecture
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-100">
            Everything you need to understand where your money goes.
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed">
            Designed from the ground up for speed, visual clarity, and complete on-device sovereignty.
            Every view answers a specific financial question without distraction.
          </p>
        </div>

        {/* ======================================================== */}
        {/* FEATURE 1: TRANSACTIONS & ENTRY (Split with Tab Toggle) */}
        {/* ======================================================== */}
        <div className="mb-32 sm:mb-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
              <CreditCard size={12} className="text-neutral-400" />
              <span>Ledger & Entry</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-semibold text-neutral-100 tracking-tight">
              Every transaction, in perspective.
            </h3>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              Recording transactions shouldn&apos;t feel like filling out tax forms. Tare gives you a tactile, 
              single-thumb keypad with direct category, merchant, and note tagging — automatically 
              plotting every expense onto your monthly cash curve.
            </p>

            {/* Interactive Toggle for Visitors */}
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400 mr-2">Preview screen:</span>
              <button
                onClick={() => setTransactionTab("ledger")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  transactionTab === "ledger"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                Ledger Timeline
              </button>
              <button
                onClick={() => setTransactionTab("entry")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  transactionTab === "entry"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                Keypad Entry
              </button>
            </div>

            {/* Feature Bullets */}
            <div className="pt-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-neutral-300" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-200">Continuous Sparkline Curve</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Visual curve across months (Apr–Oct) reveals balance trends at a single glance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-neutral-300" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-200">Merchant & Sub-category Tags</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Categorize by exact merchant name, sub-category, or custom notes with zero latency.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-neutral-300" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-200">Daily Running Aggregates</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Clear date dividers with daily net sums (e.g. 6 Oct: ₹9,988.64, 7 Oct: -₹90.00).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Device Presentation */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative">
              {transactionTab === "ledger" ? (
                <TareDeviceFrame
                  key="ledger"
                  src="/assets/tare-ledger.png"
                  alt="Tare transaction ledger screen displaying balance of ₹2,37,045.36 with historical sparkline and transactions"
                  badge="Ledger Interface"
                  caption="Clean date grouping with instant expense/income tagging"
                />
              ) : (
                <TareDeviceFrame
                  key="entry"
                  src="/assets/tare-transaction-entry.png"
                  alt="Tare transaction entry keypad with instant category, sub-category, and merchant tagging"
                  badge="Rapid Keypad Entry"
                  caption="Optimized numeric pad with one-tap category assignment"
                />
              )}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FEATURE 2: BUDGETS & OVERRUNS (Reversed Layout) */}
        {/* ======================================================== */}
        <div id="budgets" className="mb-32 sm:mb-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Device Presentation */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Overrun highlight badge */}
              <div className="absolute -top-4 -right-2 sm:-right-6 z-20 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 font-mono text-[11px] backdrop-blur-md shadow-xl flex items-center gap-1.5">
                <AlertTriangle size={13} className="text-red-400" />
                <span>OVER BUDGET • +₹62,694.36</span>
              </div>

              <TareDeviceFrame
                src="/assets/tare-budgets.png"
                alt="Tare Budgets view displaying budgeted spending ₹2,35,694.36 of ₹1,73,000.00 with over budget indicators"
                badge="Active Budgets"
                caption="Multi-category progress bars with exact overage amounts"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400">
              <AlertTriangle size={12} />
              <span>Proactive Limits</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-semibold text-neutral-100 tracking-tight">
              Know when you&apos;re crossing the line.
            </h3>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              Budgets are useless if you only discover overspending weeks later. Tare tracks active category 
              thresholds against real-time ledger entries, signaling precisely how much you have exceeded 
              by category before small leaks become big debts.
            </p>

            {/* Real metrics callout cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-neutral-400 uppercase">Budgeted Total</div>
                <div className="text-xl font-semibold text-neutral-100">₹2,35,694.36</div>
                <div className="text-xs text-neutral-400">of ₹1,73,000.00 cap</div>
              </div>

              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1">
                <div className="text-[11px] font-mono text-red-400 uppercase">Overrun Delta</div>
                <div className="text-xl font-semibold text-red-400">+₹62,694.36</div>
                <div className="text-xs text-red-400/80">Active alert triggered</div>
              </div>
            </div>

            {/* Breakdown item list */}
            <div className="pt-2 space-y-2 text-xs font-mono text-neutral-400">
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-neutral-300">⚡ Bills & Utilities</span>
                <span className="text-red-400">₹19,171 / ₹18,000 (+₹1,171)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-neutral-300">🚗 Commute</span>
                <span className="text-red-400">₹12,203 / ₹12,000 (+₹203)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-neutral-300">🏫 Education</span>
                <span className="text-red-400">₹20,681 / ₹20,000 (+₹681)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-neutral-300">🍔 Food & Dining</span>
                <span className="text-emerald-400">₹41,323 / ₹48,000 (Safe)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FEATURE 3: ANALYTICS & CATEGORIES (Wide Duo Showcase) */}
        {/* ======================================================== */}
        <div id="analytics" className="mb-32 sm:mb-40">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
              <PieChart size={12} className="text-neutral-400" />
              <span>Cash Flow & Distribution</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-semibold text-neutral-100 tracking-tight">
              Patterns, without the guesswork.
            </h3>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              High-level numbers don&apos;t tell the full story. Tare dissects your financial reality with 
              radial category share distributions, net monthly cash flow calculations, and day-by-day 
              spending velocity indicators.
            </p>

            {/* Switch tabs for duo views */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setAnalyticsTab("overview")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  analyticsTab === "overview"
                    ? "bg-white text-black font-semibold"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                Analytics Dashboard
              </button>
              <button
                onClick={() => setAnalyticsTab("categories")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  analyticsTab === "categories"
                    ? "bg-white text-black font-semibold"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                13 Categories Ranked
              </button>
            </div>
          </div>

          {/* Side by side display of Analytics & Category details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Primary Device in Focus */}
            <div className="lg:col-span-6 flex justify-center">
              {analyticsTab === "overview" ? (
                <TareDeviceFrame
                  key="analytics-main"
                  src="/assets/tare-analytics.png"
                  alt="Tare Analytics view with total expenses ₹2,37,045.36 and donut chart showing 40% top share"
                  badge="Analytics Overview"
                  caption="Net Cash Flow: +₹48,073.64 with category segment wheel"
                />
              ) : (
                <TareDeviceFrame
                  key="categories-main"
                  src="/assets/tare-categories.png"
                  alt="Tare category spending breakdown showing ranked categories and transaction counts"
                  badge="Category Hierarchy"
                  caption="Shopping: ₹94,351 (39.8%), Food: ₹41,323 (17.4%)"
                />
              )}
            </div>

            {/* Editorial Stats Panel */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Net Cash Flow Breakdown
                  </h4>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-lg bg-neutral-950 border border-white/5">
                      <div className="text-[10px] font-mono text-neutral-400">SPENT</div>
                      <div className="text-sm sm:text-base font-semibold text-neutral-200 mt-1">₹2,37,045.36</div>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-950 border border-white/5">
                      <div className="text-[10px] font-mono text-neutral-400">INCOME</div>
                      <div className="text-sm sm:text-base font-semibold text-neutral-200 mt-1">₹2,85,119.00</div>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                      <div className="text-[10px] font-mono text-emerald-400">NET FLOW</div>
                      <div className="text-sm sm:text-base font-semibold text-emerald-400 mt-1">+₹48,073.64</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/5">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingUp size={12} className="text-neutral-300" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-neutral-200">Peak Velocity Detection</span>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Identifies anomalies like Day 2&apos;s ₹70,418.00 single-day spike so you know exactly when cash flowed out.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Layers size={12} className="text-neutral-300" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-neutral-200">Segmented Ring Visualization</span>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Shopping takes 40% top share (₹94,351 across 7 txns), while food & dining represents 17.4% (34 txns).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FEATURE 4: REPORTS & TRENDS (See the bigger picture) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
              <Calendar size={12} className="text-neutral-400" />
              <span>Multi-Period Intelligence</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-semibold text-neutral-100 tracking-tight">
              See the bigger picture.
            </h3>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              True financial clarity requires stepping back from the daily weeds. Tare gives you date-range analysis, 
              custom multi-week windows, and year-over-year category comparisons — showing where your spending shifted, 
              which days had peak outflows, and where your money actually stayed.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-neutral-300" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-200">Date-Range Velocity</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Filter by 7 days, 30 days, or custom calendar ranges with daily burn rates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-neutral-300" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-200">Year-over-Year Category Shifts</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Track category migration between consecutive years (e.g. food optimization vs shopping increases).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#reports"
                className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all"
              >
                <span>Jump to interactive report breakdown below</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Right Device Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <TareDeviceFrame
              src="/assets/tare-reports.png"
              alt="Tare Reports & Insights interface showing date range 10 Sep to 9 Oct with total spent ₹3,73,630.36"
              badge="Reports & Insights"
              caption="30-day aggregate velocity with peak spend date detection"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
