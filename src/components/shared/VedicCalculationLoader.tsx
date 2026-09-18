"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, ShieldCheck } from "lucide-react";

interface VedicLoaderProps {
  title?: string;
  stages?: string[];
  estimatedSeconds?: number;
}

const DEFAULT_STAGES = [
  "Aligning Navagraha Planetary Ephemeris & Degree Positions...",
  "Calculating Classical Ashtakoot Guna Resonance & Karmic Pillars...",
  "Consulting Brihat Parashara Hora Shastra & Vedic Puranas...",
  "Synthesizing Pandit Ji's Auspicious Insights & Non-Fearful Remedies...",
  "Consecrating Your Personalized Vedic Dossier...",
];

export default function VedicCalculationLoader({
  title = "Casting Sacred Vedic Calculation",
  stages = DEFAULT_STAGES,
  // Unhurried pacing — the progress + stage text should feel deliberate, not fast-forwarded.
  estimatedSeconds = 11,
}: VedicLoaderProps) {
  const [progress, setProgress] = useState(12);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const intervalTime = (estimatedSeconds * 1000) / 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95; // Hold at 95% until API response completes
        const next = prev + Math.floor(Math.random() * 4) + 1;
        return next > 95 ? 95 : next;
      });
    }, intervalTime);

    const stageInterval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % stages.length);
    }, (estimatedSeconds * 1000) / stages.length);

    return () => {
      clearInterval(interval);
      clearInterval(stageInterval);
    };
  }, [estimatedSeconds, stages.length]);

  return (
    <div className="my-8 rounded-3xl border-2 border-[#d4af37]/70 bg-gradient-to-b from-[#1b0e08] via-[#28130a] to-[#120704] p-8 sm:p-12 shadow-[0_20px_70px_rgba(212,175,55,0.25)] text-center relative overflow-hidden animate-fadeIn">
      {/* Background Sacred Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d4af37]/15 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[#72232b]/25 blur-[100px]" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Animated Sacred Mandala / Sri Yantra Visual */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center my-4">
          {/* Outer Rotating Star Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-[#d4af37]/40"
          />

          {/* Middle Counter-Rotating Celestial Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-3 rounded-full border-2 border-[#d4af37]/60"
          />

          {/* Central Pulsating Diya Flame */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] via-[#b38918] to-[#603b05] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.7)] border-2 border-amber-200">
            {/* Gentle diya flicker (scale + subtle sway) — calmer than a bounce */}
            <motion.div
              animate={{ scale: [1, 1.08, 0.98, 1.05, 1], rotate: [0, 1.5, -1.5, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            >
              <Flame className="w-10 h-10 text-[#1a0c06]" />
            </motion.div>
          </div>

          {/* Orbiting Navagraha Dots */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute inset-0 flex items-start justify-center"
          >
            <span className="w-3 h-3 rounded-full bg-[#ffd700] shadow-[0_0_12px_#ffd700]" />
          </motion.div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-extrabold uppercase tracking-widest my-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>

        {/* Percentage Counter */}
        <div className="my-2 flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
            {progress}%
          </span>
          <span className="text-xs text-gray-400 font-mono">Calculated</span>
        </div>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden my-3 border border-white/15 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-[#d4af37] to-amber-300 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)]"
            initial={{ width: "10%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Rotating Sanskrit / Vedic Stage Subtitle */}
        <div className="h-10 flex items-center justify-center my-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={stageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm font-serif text-[#ffd700] font-semibold text-center italic"
            >
              &ldquo;{stages[stageIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 mt-2 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Authentic Astrological Ephemeris • 100% Traditional Calculation</span>
        </div>
      </div>
    </div>
  );
}
