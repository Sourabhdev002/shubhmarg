"use client";

import React from "react";
import Link from "next/link";

interface ShubhMargLogoProps {
  variant?: "full" | "horizontal" | "icon" | "badge";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withLink?: boolean;
}

export function ShubhMargEmblem({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-[0_2px_12px_rgba(201,162,74,0.35)] ${className}`}
      aria-label="ShubhMarg Sacred Vedic Emblem"
    >
      <defs>
        {/* Master Antique Gold Gradient */}
        <linearGradient id="shubhGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A24A" />
          <stop offset="35%" stopColor="#F0E8D8" />
          <stop offset="65%" stopColor="#E0C36A" />
          <stop offset="100%" stopColor="#9E782F" />
        </linearGradient>

        <linearGradient id="shubhDarkGold" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A6520" />
          <stop offset="50%" stopColor="#C9A24A" />
          <stop offset="100%" stopColor="#E0C36A" />
        </linearGradient>

        <radialGradient id="shubhEmblemAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E0C36A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#080604" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle Inner Aura Glow */}
      <circle cx="50" cy="50" r="46" fill="url(#shubhEmblemAura)" />

      {/* Outer Sacred Geometry Kalash & Arch */}
      <path
        d="M50 8C30 8 16 26 16 52C16 74 32 88 50 92C68 88 84 74 84 52C84 26 70 8 50 8Z"
        stroke="url(#shubhGoldGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Fine Astral Ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="url(#shubhDarkGold)"
        strokeWidth="0.8"
        strokeDasharray="2 3"
        opacity="0.6"
      />

      {/* Base Sacred Lotus Petals */}
      <path
        d="M50 84C42 80 34 72 30 64C38 67 46 72 50 78C54 72 62 67 70 64C66 72 58 80 50 84Z"
        fill="url(#shubhGoldGrad)"
        opacity="0.9"
      />
      <path
        d="M50 78C45 74 38 70 24 70C32 76 42 82 50 86C58 82 68 76 76 70C62 70 55 74 50 78Z"
        stroke="url(#shubhGoldGrad)"
        strokeWidth="1.2"
      />

      {/* Central Sculpted 'Sh' / 'S' + Sacred Flame Spine */}
      <path
        d="M50 20C54 26 56 32 52 38C48 44 42 46 42 52C42 60 52 64 56 60C59 57 58 52 54 50C48 48 44 42 46 34C48 26 50 20 50 20Z"
        fill="url(#shubhGoldGrad)"
      />

      {/* Top Bindu / Starlight Crown Node */}
      <path
        d="M50 14L51.5 17.5L55 19L51.5 20.5L50 24L48.5 20.5L45 19L48.5 17.5L50 14Z"
        fill="url(#shubhGoldGrad)"
      />
    </svg>
  );
}

export function ShubhMargLogo({
  variant = "horizontal",
  size = "md",
  className = "",
  withLink = true,
}: ShubhMargLogoProps) {
  const sizeMap = {
    sm: { emblem: 32, title: "text-lg", sub: "text-[9px]" },
    md: { emblem: 44, title: "text-xl sm:text-2xl", sub: "text-[10px]" },
    lg: { emblem: 56, title: "text-2xl sm:text-3xl", sub: "text-xs" },
    xl: { emblem: 72, title: "text-3xl sm:text-4xl", sub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div
      className={`inline-flex items-center gap-3.5 select-none ${
        variant === "full" ? "flex-col text-center" : "flex-row"
      } ${className}`}
    >
      <ShubhMargEmblem size={currentSize.emblem} />

      {variant !== "icon" && (
        <div className="flex flex-col">
          <span
            className={`font-serif font-bold tracking-[0.22em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24A] via-[#F0E8D8] to-[#E0C36A] drop-shadow-[0_1px_6px_rgba(201,162,74,0.3)] ${currentSize.title}`}
          >
            ShubhMarg
          </span>
          <span
            className={`font-sans uppercase tracking-[0.32em] text-[#9D968C] font-semibold mt-0.5 ${currentSize.sub}`}
          >
            Vedic Guidance &bull; Modern Life
          </span>
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="group inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}

export default ShubhMargLogo;
