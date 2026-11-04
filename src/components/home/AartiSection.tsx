"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useT } from "@/context/LanguageContext";
import { glassClass, type Surface } from "@/lib/home-surfaces";
import type { VerifiedAarti } from "@/lib/aarti/types";

/**
 * AartiSection: shows today's verified aarti. The deity text and (optional) audio
 * come only from the Owner / Pandit Ji, and this section is rendered by the page
 * only when a verified aarti exists — so unverified text never appears.
 *
 * The Diya_Button lets the devotee "wave the diya": each press runs a short aarti
 * circle (a motion.div keyed by the wave counter animating only rotate/y/scale/
 * opacity). With reduced motion the wave is skipped and a glow briefly brightens
 * instead. There are no fake "N people did aarti" counts anywhere.
 */
export default function AartiSection({
  aarti,
  weekday,
  surface,
}: {
  aarti: VerifiedAarti;
  weekday: number;
  surface: Surface;
}) {
  const t = useT();
  const reduce = useReducedMotion();

  // Each press bumps the wave counter; the keyed motion.div remounts and replays.
  const [wave, setWave] = useState(0);
  // Reduced-motion fallback: a short opacity bump on the glow instead of the wave.
  const [glow, setGlow] = useState(false);
  const glowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Audio: only present when the Owner supplied a file. onError hides the control.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);

  useEffect(() => {
    return () => {
      if (glowTimer.current) clearTimeout(glowTimer.current);
    };
  }, []);

  function handleDiya() {
    if (reduce) {
      setGlow(true);
      if (glowTimer.current) clearTimeout(glowTimer.current);
      glowTimer.current = setTimeout(() => setGlow(false), 600);
      return;
    }
    setWave((w) => w + 1);
  }

  function toggleAudio() {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      // No autoplay: only plays on an explicit tap.
      void el.play().then(() => setPlaying(true)).catch(() => setAudioFailed(true));
    }
  }

  const showAudio = Boolean(aarti.audioSrc) && !audioFailed;

  return (
    <section
      aria-labelledby="aarti-title"
      className={`relative pt-8 sm:pt-12 pb-10 sm:pb-14 overflow-hidden ${glassClass(surface)}`}
    >
      <span className="glow-fill" aria-hidden="true" />
      <div className="relative z-10 max-w-2xl mx-auto section-px text-center">
        {/* Eyebrow: Today's Aarti · <weekday> */}
        <p className="text-[10.5px] sm:text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#8C3F08] uppercase">
          {t("aarti.eyebrow")} · {t(`day.${weekday}`)}
        </p>

        {/* Title: Devanagari large, English smaller beneath */}
        <h2 id="aarti-title" className="mt-2">
          <span className="block font-devanagari text-2xl sm:text-3xl font-bold text-[#8B1A1A] leading-tight">
            {aarti.titleHi}
          </span>
          <span className="mt-1 block text-[13px] sm:text-sm font-medium text-[#6B5A48]">
            {aarti.titleEn}
          </span>
        </h2>

        <div className="gold-divider mx-auto my-6" aria-hidden="true" />

        {/* Lyrics: Devanagari lines, readable ink, centered, airy line-height */}
        <div className="font-devanagari text-[#2A1810] text-[15px] sm:text-[17px] leading-[2] space-y-1">
          {aarti.lyrics.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* Diya_Button + the aarti wave */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center">
            {/* Reduced-motion glow fallback: opacity bump for ~600ms */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -m-4 rounded-full bg-[#F5A623] blur-2xl transition-opacity duration-500"
              style={{ opacity: glow ? 0.6 : 0 }}
            />

            {/* The wave: a flame/glow keyed by `wave`, only transform + opacity animate */}
            {!reduce && wave > 0 && (
              <motion.div
                key={wave}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -m-5 rounded-full bg-gradient-to-t from-[#E8791E]/0 via-[#F5A623]/50 to-[#FFE8B0]/70 blur-xl"
                initial={{ opacity: 0.85, scale: 0.6, rotate: -18, y: 6 }}
                animate={{ opacity: 0, scale: 1.25, rotate: 18, y: -10 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            )}

            <button
              type="button"
              aria-label={t("aarti.diya_label")}
              onClick={handleDiya}
              className="relative z-10 grid place-items-center w-16 h-16 min-h-[44px] min-w-[44px] rounded-full bg-[#FFFDF8] border border-[#D4A537]/50 shadow-[0_10px_28px_-12px_rgba(232,121,30,0.6)] transition-transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]"
            >
              {/* Inline SVG diya: a lamp bowl with a flame */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
              >
                {/* flame */}
                <path
                  d="M20 4c2.6 3 3.6 5.4 3.6 7.6 0 2.4-1.6 3.9-3.6 3.9s-3.6-1.5-3.6-3.9c0-2.2 1-4.6 3.6-7.6Z"
                  fill="#F5A623"
                />
                <path
                  d="M20 7.5c1.3 1.7 1.8 3 1.8 4.2 0 1.3-.8 2.1-1.8 2.1s-1.8-.8-1.8-2.1c0-1.2.5-2.5 1.8-4.2Z"
                  fill="#E8791E"
                />
                {/* lamp bowl */}
                <path
                  d="M6 20h28c0 0-1.6 9-14 9S6 20 6 20Z"
                  fill="#C25E10"
                />
                <path
                  d="M6 20h28l-2.4-2.4a3 3 0 0 0-2.1-.9H10.5a3 3 0 0 0-2.1.9L6 20Z"
                  fill="#E8791E"
                />
                <ellipse cx="20" cy="20" rx="14" ry="2.4" fill="#D4A537" opacity="0.5" />
              </svg>
            </button>
          </div>

          {/* Optional audio: only when the Owner supplied a file and it hasn't errored */}
          {showAudio && (
            <>
              <button
                type="button"
                onClick={toggleAudio}
                className="inline-flex items-center gap-2 min-h-[44px] rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 px-4 py-2 text-[13px] font-semibold text-[#8C3F08] hover:border-[#E8791E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]"
              >
                {playing ? (
                  <Pause className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Play className="w-4 h-4" aria-hidden="true" />
                )}
                {playing ? t("aarti.audio_pause") : t("aarti.audio_play")}
              </button>
              <audio
                ref={audioRef}
                preload="none"
                src={aarti.audioSrc}
                onEnded={() => setPlaying(false)}
                onError={() => {
                  setAudioFailed(true);
                  setPlaying(false);
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
