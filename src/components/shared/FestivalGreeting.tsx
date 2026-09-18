"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { getActiveFestival } from "@/lib/festivals-registry";
import type { CalendarEventWithOccurrence } from "@/types/calendar";

// Persist "seen" per calendar day so the festival popup fires ONCE each day it
// is shown (resets automatically when the local date changes). Uses localStorage
// so it survives reloads/new sessions within the same day, but re-triggers the
// next day if that day also has a festival.
const SEEN_KEY = "shubhmarg:festival-seen-day";

// Local (device-timezone) YYYY-MM-DD stamp — festivals are day-scoped.
function todayStamp(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Normalised shape the card renders from — sourced from either the live
// calendar event or the hardcoded fallback registry.
interface Greeting {
  key: string;      // unique id for "seen once per session"
  name: string;     // festival / event name
  hindi?: string;   // optional Devanagari subtitle
  greeting: string; // blessing / description line
  image: string;    // image url (public path or remote)
  accent: string;   // hex accent for glow + petals
  petal: string;    // petal colour
  glyph?: string;   // small emoji/symbol
}

const DEFAULT_ACCENT = "#E8791E";
const DEFAULT_PETAL = "#F5A623";

/**
 * FestivalGreeting — a premium festive welcome that fires for ANY festival in
 * the ShubhMarg calendar (Supabase). On a day that has a published calendar
 * event WITH an image, it shows a celebratory card (deity image + falling
 * petals) using that event's real name/image/description.
 *
 * Falls back to the hardcoded registry when the calendar has no event today.
 * Shows once per browser session per event, is dismissible, respects reduced-motion.
 *
 * `event` is today's calendar event, fetched server-side and passed from layout.
 */
export default function FestivalGreeting({ event }: { event?: CalendarEventWithOccurrence | null }) {
  const reduce = useReducedMotion();
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 1) Prefer the live calendar event — but only if it has an image (Option A:
    //    only visually-rich festival entries get the full-screen greeting).
    let g: Greeting | null = null;
    if (event && event.image_url) {
      g = {
        key: `evt:${event.occurrence_id || event.id}`,
        name: event.name,
        hindi: event.tithi_name || undefined,
        greeting: event.significance || event.description || `Wishing you a blessed ${event.name}.`,
        image: event.image_url,
        accent: DEFAULT_ACCENT,
        petal: DEFAULT_PETAL,
        glyph: "✦",
      };
    } else {
      // 2) Fallback: hardcoded registry (e.g. launch-day festival with no calendar row)
      const active = getActiveFestival();
      if (active) {
        g = {
          key: active.key,
          name: active.name,
          hindi: active.hindi,
          greeting: active.greeting,
          image: active.image,
          accent: active.accent,
          petal: active.petal,
          glyph: active.glyph,
        };
      }
    }

    if (!g) return;

    // Show once per calendar day per festival. The stored token is
    // "<YYYY-MM-DD>|<festival-key>" so a new day (or a different festival on the
    // same day) re-triggers the popup.
    const seenToken = `${todayStamp()}|${g.key}`;
    let seen = false;
    try { seen = localStorage.getItem(SEEN_KEY) === seenToken; } catch { /* ignore */ }
    if (seen) return;

    // Client-only: localStorage read must run after mount (no SSR access).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(g);
    // Small delay so it lands after first paint (feels intentional, not jarring).
    const t = setTimeout(() => setOpen(true), 650);
    return () => clearTimeout(t);
  }, [event]);

  function dismiss() {
    setOpen(false);
    if (greeting) {
      try { localStorage.setItem(SEEN_KEY, `${todayStamp()}|${greeting.key}`); } catch { /* ignore */ }
    }
  }

  if (!greeting) return null;

  // Falling petals — cheap transform-only motion. Skipped for reduced-motion.
  const petals = reduce ? [] : Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 8.3 + (i % 3) * 4) % 100}%`,
    delay: (i % 6) * 0.5,
    dur: 6 + (i % 4) * 1.5,
    size: 8 + (i % 3) * 4,
    drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 12),
    rot: (i % 2 === 0 ? 1 : -1) * 180,
  }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-label={`${greeting.name} greeting`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#2A1810]/45 backdrop-blur-[3px]" onClick={dismiss} />

          {/* Falling petals layer (behind the card, over the backdrop) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {petals.map((p) => (
              <motion.span
                key={p.id}
                className="absolute top-[-6%] rounded-full"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: `radial-gradient(circle at 35% 30%, ${greeting.petal}, ${greeting.accent})`,
                  opacity: 0.85,
                }}
                initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
                animate={{ y: "110vh", x: p.drift, rotate: p.rot, opacity: [0, 0.9, 0.9, 0] }}
                transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeIn" }}
              />
            ))}
          </div>

          {/* Greeting card */}
          <motion.div
            className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-[#FFFDF8] border border-[#B8860B]/30 shadow-[0_30px_80px_-20px_rgba(107,42,20,0.5)]"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            {/* Gold top ribbon */}
            <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E8791E] to-transparent" />

            {/* Close */}
            <button
              onClick={dismiss}
              aria-label="Close greeting"
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#FFFDF8]/80 border border-[#B8860B]/25 flex items-center justify-center text-[#6B5A48] hover:text-[#C25E10] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Deity image with glow + gentle breathing */}
            <div className="relative pt-8 pb-2 flex items-center justify-center">
              <div
                className="absolute w-40 h-40 rounded-full blur-2xl opacity-40"
                style={{ background: `radial-gradient(circle, ${greeting.accent}, transparent 70%)` }}
              />
              <motion.div
                className="relative w-32 h-32 rounded-full overflow-hidden ring-[3px] ring-[#D4A537] shadow-[0_10px_30px_-8px_rgba(107,42,20,0.4)]"
                animate={reduce ? {} : { scale: [1, 1.035, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={greeting.image}
                  alt={greeting.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  unoptimized
                  priority
                />
              </motion.div>
            </div>

            {/* Text */}
            <div className="px-6 pb-7 pt-2 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C25E10] mb-2">
                {greeting.glyph} Happy {greeting.name.split(" ").slice(-1)[0]}
              </p>
              <h2 className="text-[1.7rem] font-bold font-cormorant gold-foil leading-tight">
                {greeting.name}
              </h2>
              {greeting.hindi && (
                <p className="font-devanagari text-[#B8860B] text-lg mt-0.5 mb-3">{greeting.hindi}</p>
              )}

              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B8860B]/60" />
                <span className="text-[#E8791E] text-xs">✦</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B8860B]/60" />
              </div>

              <p className="text-[13.5px] text-[#6B5A48] leading-relaxed mb-6 font-sans line-clamp-4">
                {greeting.greeting}
              </p>

              <button
                onClick={dismiss}
                className="btn-gold w-full text-[13px] justify-center"
              >
                Enter ShubhMarg
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
