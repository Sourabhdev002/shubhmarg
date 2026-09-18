"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * CosmicReadingLoader — a "Pandit Ji is consulting the cosmos" ritual loader shown
 * while the free reading generates. It turns dead wait time into anticipation:
 *  - walks through the real Vedic steps (Kundli → Rashi → Nakshatra → Navagraha → compose)
 *  - an honest progress bar that eases toward ~95% and only completes when the
 *    reading actually arrives (parent unmounts this component)
 *  - a live elapsed-seconds reassurance so it never feels frozen
 *  - transform/opacity-only motion, respects reduced-motion
 *
 * Brand: marble/cream surface, saffron + gold, dark ink text.
 */

const STEPS: { hi: string; en: string }[] = [
  { hi: "जन्म कुण्डली की गणना", en: "Casting your birth chart (Kundli)" },
  { hi: "चन्द्र राशि का निर्धारण", en: "Locating your Moon sign (Rashi)" },
  { hi: "नक्षत्रों का संरेखण", en: "Aligning the 27 Nakshatras" },
  { hi: "नवग्रह परामर्श", en: "Consulting the Navagraha (9 planets)" },
  { hi: "आपका पठन रचा जा रहा है", en: "Composing your personal reading" },
];

const STEP_MS = 1600;

export default function CosmicReadingLoader() {
  const reduce = useReducedMotion();
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(6);
  const [elapsed, setElapsed] = useState(0);

  // Advance the ritual steps (stops on the last one until the reading arrives).
  useEffect(() => {
    const t = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
    }, STEP_MS);
    return () => clearInterval(t);
  }, []);

  // Ease the progress bar toward ~95% — never fake-completes. Decelerates as it
  // approaches the cap so a long wait still feels like steady forward motion.
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 95 ? 95 : p + Math.max(0.4, (95 - p) * 0.06)));
    }, 220);
    return () => clearInterval(t);
  }, []);

  // Live elapsed seconds for gentle reassurance.
  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const step = STEPS[stepIdx];
  const patience =
    elapsed < 6
      ? "Aligning the celestial bodies…"
      : elapsed < 12
      ? "Almost there — precision takes a moment."
      : "Deep calculation in progress — thank you for your patience.";

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FBF6EC] to-[#F5EAD6] border border-[#D4AF37]/40 p-8 sm:p-10 shadow-[0_20px_55px_-26px_rgba(107,42,20,0.3)] overflow-hidden text-center">
        {/* Ambient warm glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#E8791E]/12 blur-[70px]" />

        {/* Rotating celestial ring with a steady ॐ core */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          {/* Outer dashed orbit */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/50"
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          {/* Orbiting planet dot */}
          {!reduce && (
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#E8791E] shadow-[0_0_10px_#E8791E]" />
            </motion.div>
          )}
          {/* Pulsing halo */}
          <motion.div
            className="absolute inset-3 rounded-full bg-[#D4AF37]/15"
            animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* ॐ core */}
          <motion.span
            className="relative font-devanagari text-3xl font-black text-[#C25E10] drop-shadow-[0_2px_8px_rgba(232,121,30,0.6)]"
            animate={reduce ? {} : { scale: [1, 1.06, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ॐ
          </motion.span>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#B8860B] mb-2">
          Pandit Ji is consulting the cosmos
        </p>

        {/* Current ritual step (crossfades) */}
        <div className="min-h-[3.4rem] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-devanagari text-[#8B1A1A] text-base font-bold leading-tight">
                {step.hi}
              </p>
              <p className="text-[#2A1810] text-sm font-serif italic mt-0.5">
                {step.en}…
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Honest progress bar */}
        <div className="mt-5 h-2 rounded-full bg-[#B8860B]/15 overflow-hidden p-[1px]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#E8791E] via-[#F5A623] to-[#D4A537]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Step dots + elapsed reassurance */}
        <div className="mt-3.5 flex items-center justify-center gap-2">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= stepIdx ? "w-5 bg-[#E8791E]" : "w-1.5 bg-[#B8860B]/30"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-[11px] text-[#6B5A48] font-medium">
          {patience} <span className="font-mono text-[#B8860B]">({elapsed}s)</span>
        </p>
        <p className="mt-1 text-[10px] text-[#6B5A48]/70">
          Usually takes 5–15 seconds — please keep this page open.
        </p>
      </div>
    </div>
  );
}
