"use client";

import React from "react";
import Image from "next/image";
import styles from "./tare.module.css";

interface TareDeviceFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  cropStatusBar?: boolean;
  badge?: string;
  caption?: string;
  onClick?: () => void;
  aspectRatioCustom?: string;
}

export default function TareDeviceFrame({
  src,
  alt,
  priority = false,
  className = "",
  cropStatusBar = true,
  badge,
  caption,
  onClick,
  aspectRatioCustom,
}: TareDeviceFrameProps) {
  return (
    <div
      className={`group relative flex flex-col items-center ${className}`}
      onClick={onClick}
    >
      {badge && (
        <div className="mb-3 z-10">
          <span className={styles.subtleBadge}>{badge}</span>
        </div>
      )}

      {/* Outer Phone Chassis */}
      <div
        className={`${styles.deviceFrame} w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] group-hover:scale-[1.01] transition-transform duration-500`}
      >
        {/* Dynamic Island / Top Bezel hardware */}
        <div className={styles.dynamicIsland} />

        {/* Screen container */}
        <div
          className={`${styles.deviceScreen}`}
          style={aspectRatioCustom ? { aspectRatio: aspectRatioCustom } : undefined}
        >
          {/* Status bar mask & image container */}
          <div
            className={`relative w-full h-full overflow-hidden ${
              cropStatusBar ? "mt-[-3.8%] h-[104%]" : ""
            }`}
          >
            <Image
              src={src}
              alt={alt}
              width={1080}
              height={2340}
              priority={priority}
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 360px"
              className="w-full h-full object-cover object-top select-none pointer-events-none"
            />
          </div>

          {/* Screen subtle sheen / reflection */}
          <div className={styles.screenReflection} />

          {/* Sleek bottom home pill indicator */}
          <div className={styles.homeIndicator} />
        </div>
      </div>

      {caption && (
        <p className="mt-4 text-xs font-mono tracking-tight text-neutral-400 text-center max-w-[300px]">
          {caption}
        </p>
      )}
    </div>
  );
}
