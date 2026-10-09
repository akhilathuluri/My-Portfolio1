"use client";

import React from "react";

interface TareStoreButtonsProps {
  className?: string;
  size?: "sm" | "default" | "lg";
}

export default function TareStoreButtons({
  className = "",
  size = "default",
}: TareStoreButtonsProps) {
  // Configurable dummy links (to be updated once published)
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.tare.finance";
  const appStoreUrl = "https://apps.apple.com/app/tare-finance/id000000000";

  const isSmall = size === "sm";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Google Play Button */}
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-3 rounded-xl bg-[#0f0f12] hover:bg-[#16161b] border border-white/10 hover:border-white/25 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] ${
          isSmall ? "px-3.5 py-2" : "px-4.5 py-2.5 sm:px-5 sm:py-3"
        }`}
        title="Get Tare on Google Play (Coming Soon)"
      >
        {/* Play Store SVG Icon */}
        <svg
          className={`${isSmall ? "w-5 h-5" : "w-6 h-6"} shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.609 1.813A1.5 1.5 0 0 0 3 3.125v17.75c0 .53.27.994.61 1.312l9.907-9.943L3.61 1.813Z"
            fill="#00E676"
          />
          <path
            d="m16.89 8.924-3.373 3.32 3.373 3.32 3.86-2.18c.95-.537.95-1.943 0-2.48l-3.86-2.18Z"
            fill="#FFD600"
          />
          <path
            d="M3.61 1.813c.23-.17.52-.257.83-.083l12.45 7.194-3.373 3.32-9.907-10.43Z"
            fill="#00B0FF"
          />
          <path
            d="M13.517 12.244l3.373 3.32-12.45 7.194c-.31.174-.6.087-.83-.083l9.907-10.43Z"
            fill="#FF3D00"
          />
        </svg>

        <div className="flex flex-col text-left leading-none">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors">
            Get it on
          </span>
          <span className={`${isSmall ? "text-xs" : "text-sm"} font-semibold text-neutral-100 group-hover:text-white transition-colors mt-0.5`}>
            Google Play
          </span>
        </div>
      </a>

      {/* Apple App Store Button */}
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-3 rounded-xl bg-[#0f0f12] hover:bg-[#16161b] border border-white/10 hover:border-white/25 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] ${
          isSmall ? "px-3.5 py-2" : "px-4.5 py-2.5 sm:px-5 sm:py-3"
        }`}
        title="Download Tare on the App Store (Coming Soon)"
      >
        {/* Apple SVG Icon */}
        <svg
          className={`${isSmall ? "w-5 h-5" : "w-6 h-6"} shrink-0 fill-current text-neutral-100 group-hover:text-white transition-colors`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.84.94-2.92-1 .04-2.16.67-2.82 1.44-.57.65-1.07 1.74-.93 2.8 1.11.09 2.2-.57 2.81-1.32" />
        </svg>

        <div className="flex flex-col text-left leading-none">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors">
            Download on the
          </span>
          <span className={`${isSmall ? "text-xs" : "text-sm"} font-semibold text-neutral-100 group-hover:text-white transition-colors mt-0.5`}>
            App Store
          </span>
        </div>
      </a>
    </div>
  );
}
