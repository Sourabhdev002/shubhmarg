"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { resolveIcon, SERVICE_ICON_TITLES, type ServiceIconName } from "./registry";

interface ServiceIconProps {
  iconKey: ServiceIconName;
  /** Chip diameter in px. Default 30 (menu row). */
  size?: number;
  className?: string;
  ariaLabel?: string;
  priority?: boolean;
  /** "cream" = light marble tile (default). "obsidian" = rich dark gold-ringed podium. */
  tone?: "cream" | "obsidian";
}

/**
 * Premium service icon chip.
 *
 * Renders the rich gold Vedic medallion asset (/vedic-icons/[key].webp) inside a
 * warm cream, gold-ringed tile. If the image is missing or fails to load, it
 * gracefully falls back to the bespoke inline-SVG glyph in saffron — so a broken
 * image box is NEVER shown.
 */
export default function ServiceIcon({
  iconKey,
  size = 30,
  className,
  ariaLabel,
  priority = false,
  tone = "cream",
}: ServiceIconProps) {
  const [failed, setFailed] = useState(false);
  const { Glyph } = resolveIcon(iconKey);
  const label = ariaLabel ?? SERVICE_ICON_TITLES[iconKey] ?? `${iconKey} icon`;
  const isObsidian = tone === "obsidian";

  return (
    <span
      role="img"
      aria-label={label}
      style={{ width: size, height: size }}
      className={cn(
        "group/icon relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-2xl",
        isObsidian
          // Ultra-rich dark obsidian podium with gold ring + warm glow (matches Services page).
          ? "bg-[#0D0907] ring-2 ring-[#D4AF37]/60 shadow-[0_6px_18px_-4px_rgba(201,162,74,0.45),inset_0_1px_1px_rgba(245,200,66,0.25)]"
          // Warm marble tile with a crisp gold ring + soft inner bevel = jewel-like depth.
          : "bg-gradient-to-b from-[#FFFDF8] to-[#FBEFD6] ring-1 ring-[#B8860B]/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(184,134,11,0.15),0_2px_8px_-2px_rgba(107,42,20,0.25)]",
        "text-[#C25E10] transition-all duration-300 ease-out",
        "group-hover:scale-105 group-hover:ring-[#E8791E]/60 motion-reduce:transform-none",
        className,
      )}
    >
      {!failed ? (
        <Image
          src={`/vedic-icons/${iconKey}.webp`}
          alt={label}
          width={Math.max(size * 2, 96)}
          height={Math.max(size * 2, 96)}
          priority={priority}
          onError={() => setFailed(true)}
          // Bold but safe fill (1.3×) — fills the tile richly without cropping the
          // medallion edges. Gentle hover zoom adds a crafted, premium feel.
          className="w-full h-full object-cover scale-[1.3] transition-transform duration-500 ease-out group-hover:scale-[1.4] motion-reduce:transform-none"
        />
      ) : (
        <Glyph className="w-[64%] h-[64%]" />
      )}
      {/* Subtle top gloss highlight for a polished, lacquered finish */}
      <span aria-hidden className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b to-transparent",
        isObsidian ? "from-white/12" : "from-white/35",
      )} />
    </span>
  );
}
