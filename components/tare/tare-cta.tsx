"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import TareStoreButtons from "./tare-store-buttons";

export default function TareCta() {
  return (
    <section className="relative py-28 sm:py-36 border-t border-white/5 bg-gradient-to-b from-transparent via-[#0d0d10] to-[#080808]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Independent Software</span>
        </div>

        {/* Editorial Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-neutral-100 leading-[1.08]">
          Know your numbers.
          <br />
          <span className="text-neutral-500">Keep them yours.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed">
          A clearer picture of your money, without handing your financial life to another online service.
        </p>

        {/* Store Download Buttons */}
        <div className="pt-2 flex flex-col items-center gap-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Get Tare for your mobile device
          </span>
          <TareStoreButtons />
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 text-neutral-950 font-medium text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
          >
            <span>Review product features</span>
            <ArrowRight size={15} />
          </a>

          <Link
            href="/tare/privacy-policy"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 font-medium text-sm hover:text-white hover:border-white/20 transition-all"
          >
            <ShieldCheck size={15} className="text-emerald-400" />
            <span>Read Privacy Policy</span>
          </Link>
        </div>

        {/* Discreet Notice */}
        <p className="text-xs font-mono text-neutral-500 max-w-md mx-auto pt-4">
          Tare is an independent, offline-first personal financial system architected by Akhil Athuluri. 100% on-device data sovereignty.
        </p>

      </div>
    </section>
  );
}
