"use client";

import React, { useState } from "react";
import Link from "next/link";
import TareDeviceFrame from "./tare-device-frame";
import { 
  ShieldCheck, 
  Smartphone, 
  CloudOff, 
  Lock, 
  FileDown, 
  AlertCircle,
  XCircle,
  CheckCircle2,
  BellRing,
  ExternalLink
} from "lucide-react";
import styles from "./tare.module.css";

export default function TarePrivacy() {
  const [privacyView, setPrivacyView] = useState<"modal" | "settings">("modal");
  return (
    <section id="privacy" className="relative py-24 sm:py-36 border-t border-white/5 bg-[#09090b]/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <ShieldCheck size={13} />
            <span>Local-First Data Sovereignty</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-neutral-100">
            Your finances aren&apos;t our business.
          </h2>

          <p className="text-base sm:text-xl text-neutral-400 leading-relaxed">
            Tare is designed to keep your financial life on your device. No account to create. 
            No cloud account holding your transactions. No telemetry following your activity.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ARCHITECTURAL MODEL & SETTINGS SCREENSHOT */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 sm:mb-32">
          
          {/* Architectural Diagram (Left) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 rounded-3xl bg-[#0e0e11] border border-white/10 relative overflow-hidden shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="text-neutral-300" size={20} />
                  <span className="font-mono text-sm tracking-wider uppercase font-semibold text-neutral-200">
                    YOUR DEVICE BOUNDARY
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase font-medium">
                  Air-Gapped Storage
                </span>
              </div>

              {/* Items in Device */}
              <div className="py-6 space-y-3">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                  Data Resident Exclusively In Device Sandbox:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-xs text-neutral-200 font-mono">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Transactions</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-xs text-neutral-200 font-mono">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Budgets</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-xs text-neutral-200 font-mono">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Categories</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-xs text-neutral-200 font-mono">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Reports</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-xs text-neutral-200 font-mono col-span-2 sm:col-span-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Atomic .tare Backup Files</span>
                  </div>
                </div>
              </div>

              {/* Slashed Cloud Boundary */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <CloudOff className="text-neutral-500" size={16} />
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Eliminated Network Transit
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center gap-2 text-xs text-neutral-400 line-through">
                    <XCircle size={13} className="text-red-400 shrink-0" />
                    <span>Remote Database</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center gap-2 text-xs text-neutral-400 line-through">
                    <XCircle size={13} className="text-red-400 shrink-0" />
                    <span>Analytics / SDKs</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center gap-2 text-xs text-neutral-400 line-through">
                    <XCircle size={13} className="text-red-400 shrink-0" />
                    <span>Account Servers</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Honest Disclosure Box */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 flex items-start gap-3">
              <AlertCircle size={18} className="text-neutral-400 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-400 leading-relaxed">
                <strong className="text-neutral-200 font-medium block mb-1">
                  Responsible Data Stewardship Notice:
                </strong>
                Because Tare stores your financial data entirely on your device with no remote cloud copy,
                manually exported <code className="text-neutral-300 font-mono bg-white/5 px-1 py-0.5 rounded">.tare</code> backup files
                must be handled and archived responsibly by you. Exported files can be encrypted with AES-256 PBKDF2.
              </div>
            </div>

            {/* Direct Link to Privacy Policy */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/tare/privacy-policy"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all"
              >
                <ExternalLink size={14} />
                <span>Read Detailed Privacy Policy</span>
              </Link>

              <span className="text-xs font-mono text-neutral-500">
                100% compliant with Google Play Data Safety & Apple Privacy
              </span>
            </div>
          </div>

          {/* Right: Authentic In-App Privacy & Settings Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* View switcher */}
            <div className="mb-4 flex items-center gap-2">
              <button
                onClick={() => setPrivacyView("modal")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  privacyView === "modal"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                In-App Privacy Modal
              </button>
              <button
                onClick={() => setPrivacyView("settings")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  privacyView === "settings"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                Settings & Backup
              </button>
            </div>

            <TareDeviceFrame
              src={privacyView === "modal" ? "/assets/tare-privacy-security.png" : "/assets/tare-settings.png"}
              alt={privacyView === "modal" ? "Tare Privacy & Security in-app modal" : "Tare Settings with atomic backup and alert detection"}
              badge={privacyView === "modal" ? "In-App Privacy Spec" : "Settings & Data Custody"}
              caption={privacyView === "modal" ? "Zero telemetry & total offline privacy by design" : "Atomic offline export & on-device UPI listener"}
            />
          </div>

        </div>

        {/* ======================================================== */}
        {/* FOUR PILLARS EXPLANATION */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-neutral-900/30 border border-white/5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200">
              <Smartphone size={18} />
            </div>
            <h4 className="text-base font-semibold text-neutral-100">Local Storage</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Every ledger entry, budget balance, and category mapping is stored inside your phone&apos;s sandboxed local database.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/30 border border-white/5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200">
              <Lock size={18} />
            </div>
            <h4 className="text-base font-semibold text-neutral-100">No Account Required</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              No email addresses, phone numbers, or passwords. Tare works immediately when launched without identity verification.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/30 border border-white/5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200">
              <CloudOff size={18} />
            </div>
            <h4 className="text-base font-semibold text-neutral-100">Zero Cloud Transit</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              No central server exists to be subpoenaed, sold to credit bureaus, or breached. Your records never touch the internet.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/30 border border-white/5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200">
              <FileDown size={18} />
            </div>
            <h4 className="text-base font-semibold text-neutral-100">Atomic .tare Backups</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Export and restore full-state offline snapshots on demand. You maintain full ownership over your financial files.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
