"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DailyPanchang, CalendarEventWithOccurrence } from "@/types/calendar";
import { getDailyMuhuratTimings, MuhuratWindow } from "@/lib/vedic-clock";

interface Props {
  panchang?: DailyPanchang | null;
  event?: CalendarEventWithOccurrence | null;
}

/**
 * CelestialLiveTicker — "COSMIC NOW" live Vedic clock.
 *
 * Not a static repeat of the Hero (which shows today's tithi/nakshatra). This is
 * a LIVE-MOMENT signal — which sacred window is active RIGHT NOW, how long it
 * remains, and a live progress bar. Uses the real vedic-clock engine, updates
 * every 15s. Unique to ShubhMarg — no astrology site shows a live cosmic clock
 * this way.
 *
 * Colour: emerald when the active window is auspicious (Abhijit / Brahma / Godhuli),
 * rose when inauspicious (Rahu Kaal / Yamaganda), warm cream when nothing active.
 */

// Parse "11:54 AM – 12:46 PM" → { startMin, endMin } (minutes from midnight, IST-ish).
function parseTimeRange(range: string): { startMin: number; endMin: number } | null {
  const m = range.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  const to24 = (h: number, ap: string) => {
    const up = ap.toUpperCase();
    if (up === "AM") return h === 12 ? 0 : h;
    return h === 12 ? 12 : h + 12;
  };
  const sh = to24(parseInt(m[1], 10), m[3]);
  const eh = to24(parseInt(m[4], 10), m[6]);
  return {
    startMin: sh * 60 + parseInt(m[2], 10),
    endMin: eh * 60 + parseInt(m[5], 10),
  };
}

function fmtCountdown(mins: number): string {
  if (mins <= 0) return "moment";
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function getIstMinutes(): number {
  const now = new Date();
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  return ist.getHours() * 60 + ist.getMinutes();
}

export default function CelestialLiveTicker({ panchang, event }: Props) {
  const [muhurat, setMuhurat] = useState<ReturnType<typeof getDailyMuhuratTimings> | null>(null);
  const [nowMin, setNowMin] = useState<number>(0);

  useEffect(() => {
    // Client-only: reads Date; run post-mount to avoid SSR mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMuhurat(getDailyMuhuratTimings());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNowMin(getIstMinutes());
    const id = setInterval(() => {
      setMuhurat(getDailyMuhuratTimings());
      setNowMin(getIstMinutes());
    }, 15_000);
    return () => clearInterval(id);
  }, []);

  const scrollToPanchang = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("todays-panchang")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Compute what to display: active window (if any) with a live countdown +
  // progress; otherwise the next upcoming window today.
  type Display = {
    key: string;
    kind: "active" | "upcoming";
    label: string;
    sanskrit: string;
    tagline: string;
    isAuspicious: boolean;
    progress: number;   // 0..1 through the window (for active only)
    countdown: string;
  };

  let display: Display | null = null;

  if (muhurat) {
    const windows: MuhuratWindow[] = [
      muhurat.brahmaMuhurta,
      muhurat.abhijit,
      muhurat.godhuli,
      muhurat.rahuKaal,
      muhurat.yamaganda,
    ];
    const active = muhurat.activeWindow;

    if (active) {
      const parsed = parseTimeRange(active.timeRange);
      const remaining = parsed ? Math.max(0, parsed.endMin - nowMin) : 0;
      const total = parsed ? parsed.endMin - parsed.startMin : 1;
      const elapsed = parsed ? Math.max(0, nowMin - parsed.startMin) : 0;
      display = {
        key: `active-${active.sanskrit}`,
        kind: "active",
        label: active.name,
        sanskrit: active.sanskrit,
        tagline: active.isAuspicious ? "Peak auspicious · book now" : "Inauspicious · pause new ventures",
        isAuspicious: active.isAuspicious,
        progress: Math.min(1, elapsed / Math.max(1, total)),
        countdown: `ends in ${fmtCountdown(remaining)}`,
      };
    } else {
      // Find the next upcoming window today.
      const next = windows
        .map((w) => {
          const p = parseTimeRange(w.timeRange);
          if (!p) return null;
          return { w, start: p.startMin };
        })
        .filter((x): x is { w: MuhuratWindow; start: number } => !!x && x.start > nowMin)
        .sort((a, b) => a.start - b.start)[0];

      if (next) {
        display = {
          key: `next-${next.w.sanskrit}`,
          kind: "upcoming",
          label: next.w.name,
          sanskrit: next.w.sanskrit,
          tagline: next.w.isAuspicious ? "Upcoming blessed window" : "Upcoming caution window",
          isAuspicious: next.w.isAuspicious,
          progress: 0,
          countdown: `begins in ${fmtCountdown(next.start - nowMin)}`,
        };
      }
    }
  }

  // Fallback text (before hydration or after all windows have passed today).
  const fallbackTithi =
    (panchang?.tithi?.split("-")[1] || panchang?.tithi || "").replace(/^(Krishna|Shukla)\s*/i, "").trim();
  const showFallback = !display;

  const theme = !display
    ? { bar: "#D4AF37", chip: "bg-[#FFF8EB] border-[#D4AF37]/40 text-[#8C5212]", dot: "bg-[#E8791E]" }
    : display.isAuspicious
    ? { bar: "#22A55B", chip: "bg-emerald-50 border-emerald-600/40 text-emerald-800", dot: "bg-emerald-500" }
    : { bar: "#C0392B", chip: "bg-rose-50 border-rose-600/40 text-rose-800", dot: "bg-rose-500" };

  return (
    <div className="w-full bg-gradient-to-r from-[#FAF4E8] via-[#FFFDF9] to-[#FAF4E8] border-y border-[#D4AF37]/35 relative z-20 shadow-[0_2px_12px_rgba(212,175,55,0.08)] overflow-hidden">
      {/* Live progress bar (only during active window) */}
      {display?.kind === "active" && (
        <div className="absolute top-0 left-0 h-[2px] w-full bg-[#D4AF37]/10">
          <motion.div
            className="h-full"
            style={{ background: theme.bar }}
            animate={{ width: `${Math.round(display.progress * 100)}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-[11px] sm:text-xs">
        {/* Left: eyebrow + LIVE cosmic status */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/15 via-white to-amber-500/15 border border-[#D4AF37]/50 text-[#C25E10] font-sans font-extrabold tracking-wider text-[10px] uppercase shadow-2xs shrink-0">
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
            <span>Cosmic Now · IST</span>
          </div>

          <AnimatePresence mode="wait">
            {display ? (
              <motion.div
                key={display.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 flex-wrap min-w-0"
              >
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-sans font-bold border shadow-2xs ${theme.chip}`}>
                  {display.kind === "active" ? "🟢 Active" : "⏳ Next"} · {display.sanskrit}
                </span>
                <span className="text-[#2A1810] font-medium">
                  <span className="font-serif font-bold">{display.label}</span>
                  <span className="text-[#D4AF37] mx-1.5">•</span>
                  <span className="text-[#6B5A48] font-medium">{display.countdown}</span>
                  <span className="hidden md:inline text-[#D4AF37] mx-1.5">•</span>
                  <span className="hidden md:inline text-[#8C5212] italic">{display.tagline}</span>
                </span>
                {event && display.kind === "active" && display.isAuspicious && (
                  <span className="hidden lg:inline text-[10.5px] text-[#C25E10] font-semibold">
                    ✨ {event.name.replace(/^[\d\s-]+\s*/, "")}
                  </span>
                )}
              </motion.div>
            ) : showFallback ? (
              <motion.div
                key="fallback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[#6B5A48] font-medium truncate"
              >
                {fallbackTithi ? `${fallbackTithi} • ${panchang?.nakshatra ?? ""} Nakshatra` : "Aligning celestial clock…"}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Right: anchor to the deep Panchang */}
        <a
          href="#todays-panchang"
          onClick={scrollToPanchang}
          className="inline-flex items-center gap-1 text-[11px] text-[#8B1A1A] hover:text-[#5C0A0A] font-sans font-bold tracking-wide transition-colors group cursor-pointer shrink-0"
        >
          <span className="hidden xs:inline">Full Panchang</span>
          <span className="xs:hidden">Panchang</span>
          <span className="group-hover:translate-y-0.5 transition-transform text-xs text-[#E8791E]">↓</span>
        </a>
      </div>
    </div>
  );
}
