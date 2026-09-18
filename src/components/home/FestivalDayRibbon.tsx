"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CalendarEventWithOccurrence } from "@/types/calendar";

/**
 * FestivalDayRibbon — a slim, animated "Today is Sacred" strip that appears ONLY
 * on days where the ShubhMarg calendar has a festival event (with an image).
 *
 * Complements FestivalGreeting: that popup fires once per day and can be dismissed;
 * this ribbon persists all day so seekers always know "today is a sacred day here."
 *
 * Design: warm maroon → gold gradient band, festival deity image in a gold ring,
 * gentle falling petal particles in the background, subtle shimmer sweep on the
 * top edge. Auto-hides when there is no festival event or the event has no image.
 *
 * Motion is transform/opacity only, respects reduced-motion, and stays cheap.
 */

interface Props {
  event?: CalendarEventWithOccurrence | null;
}

export default function FestivalDayRibbon({ event }: Props) {
  const reduce = useReducedMotion();

  // Only render when the calendar festival event has a REAL image (no logo fallback —
  // a generic emblem in the ribbon looks off). No image → ribbon simply hides.
  if (!event || !event.image_url) return null;
  const imgSrc = event.image_url;

  const cleanName = event.name.replace(/^[\d\s-]+\s*/, "");
  const subtitle = event.tithi_name || event.description?.split(".")[0] || "Consecrated Vedic day";

  // Falling petals — cheap transform-only motion.
  const petals = reduce
    ? []
    : Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${(i * 12 + (i % 3) * 5) % 100}%`,
        delay: (i % 4) * 0.9,
        dur: 5 + (i % 3) * 1.2,
        size: 6 + (i % 2) * 3,
        drift: (i % 2 === 0 ? 1 : -1) * (18 + (i % 3) * 8),
        color: i % 3 === 0 ? "#F5A623" : i % 3 === 1 ? "#E8791E" : "#D4A537",
      }));

  return (
    <a
      href="#todays-panchang"
      className="group block relative overflow-hidden bg-gradient-to-r from-[#4B1515] via-[#6B1E1E] to-[#4B1515] border-y border-[#D4AF37]/45 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.35)] transition-all"
      aria-label={`Sacred day: ${cleanName}`}
    >
      {/* Animated gold shimmer sweep across the top edge */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 h-[2px] w-1/3"
          style={{
            background: "linear-gradient(90deg, transparent, #F5D77E, transparent)",
          }}
          animate={{ x: ["-40%", "340%"] }}
          transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
        />
      )}

      {/* Falling petals — behind the content, subtle */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {petals.map((p) => (
          <motion.span
            key={p.id}
            className="absolute top-[-8%] rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle at 35% 30%, ${p.color}, ${p.color}00)`,
              opacity: 0.55,
            }}
            initial={{ y: "-30%", x: 0, rotate: 0, opacity: 0 }}
            animate={{ y: "260%", x: p.drift, rotate: 120, opacity: [0, 0.65, 0.65, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeIn" }}
          />
        ))}
      </div>

      {/* Content row */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center gap-3 sm:gap-4">
        {/* Deity in gold ring with pulsing halo */}
        <span className="relative shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[1.5px] shadow-[0_4px_14px_-3px_rgba(212,175,55,0.55)]">
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-1 rounded-full bg-[#F5A623]/30 blur-md"
              animate={{ opacity: [0.35, 0.75, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <span className="relative w-full h-full rounded-full overflow-hidden bg-[#0B0807]">
            <Image
              src={imgSrc}
              alt={cleanName}
              width={44}
              height={44}
              className="w-full h-full object-cover"
              unoptimized
            />
          </span>
        </span>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="text-[9.5px] sm:text-[10px] font-sans font-bold tracking-[0.22em] text-[#F5D77E] uppercase leading-tight">
            🌸 आज · Sacred day today
          </p>
          <p className="text-[13px] sm:text-[14.5px] font-bold font-serif text-white leading-tight truncate mt-0.5">
            {cleanName}
            <span className="hidden sm:inline text-[#F5C879]/85 font-normal font-sans text-[11px] ml-2">
              · {subtitle}
            </span>
          </p>
        </div>

        {/* CTA */}
        <span className="shrink-0 inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-bold text-[#FFEAA7] group-hover:text-white uppercase tracking-wider transition-colors">
          <span className="hidden xs:inline">Puja Vidhi</span>
          <span className="group-hover:translate-x-0.5 transition-transform text-[#F5A623] group-hover:text-white">→</span>
        </span>
      </div>
    </a>
  );
}
