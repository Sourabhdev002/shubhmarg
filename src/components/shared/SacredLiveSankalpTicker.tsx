"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck, Flame, X } from "lucide-react";

// `label` = short, pill-friendly service name (never clips); `service` kept for context.
const LIVE_SANKALPS = [
  { name: "Rajesh V.", city: "New Jersey", label: "Kashi Sankalp Puja", service: "Remote Kashi Sankalp Puja", time: "3 mins ago", icon: Flame, color: "text-amber-400" },
  { name: "Ananya M.", city: "Bengaluru", label: "Tatkal Guidance", service: "2-Hour Tatkal Express Guidance", time: "7 mins ago", icon: Sparkles, color: "text-red-400" },
  { name: "Vikram S.", city: "London", label: "Annual Varshphal", service: "365-Day Varshphal Annual Book", time: "12 mins ago", icon: ShieldCheck, color: "text-[#d4af37]" },
  { name: "Meera D.", city: "Mumbai", label: "Audio Dossier", service: "Pandit Ji Spoken Audio Dossier", time: "18 mins ago", icon: Sparkles, color: "text-purple-400" },
  { name: "Siddharth K.", city: "Toronto", label: "Consecrated Gemstone", service: "Consecrated Gemstone Ring", time: "24 mins ago", icon: Flame, color: "text-emerald-400" },
  { name: "Pooja & Rohan", city: "Delhi NCR", label: "Kundli Milan", service: "36-Guna Kundli Milan & Marriage Guidance", time: "31 mins ago", icon: ShieldCheck, color: "text-pink-400" },
];

export default function SacredLiveSankalpTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          // Auto-dismiss after showing every entry once — stops it blocking content forever.
          if (next >= LIVE_SANKALPS.length) {
            setIsDismissed(true);
            return prev;
          }
          return next;
        });
        setIsVisible(true);
      }, 600);
    }, 6000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = LIVE_SANKALPS[currentIndex];
  const Icon = current.icon;

  return (
    // Anchored bottom-LEFT, well clear of the mobile bottom-nav (which sits centered)
    // and the right-side chat FAB. Auto-widths to content — never full-bleed.
    <div className="fixed left-3 sm:left-6 z-40 pointer-events-auto bottom-[calc(8.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-6">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex items-center gap-2.5 pl-2 pr-8 py-1.5 rounded-full bg-gradient-to-r from-[#1a0f09]/95 via-[#241209]/95 to-[#160a06]/95 border border-[#d4af37]/45 shadow-[0_8px_26px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden max-w-[300px] sm:max-w-[320px]"
          >
            {/* Premium gold shimmer sweep across the top edge */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 h-px w-1/3"
              style={{ background: "linear-gradient(90deg, transparent, #F5D77E, transparent)" }}
              animate={{ x: ["-40%", "340%"] }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
            />

            {/* Compact seal medallion */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-black/50 border border-[#d4af37]/40 flex items-center justify-center">
                <Icon className={`w-4 h-4 ${current.color}`} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#160a06] animate-pulse" />
            </div>

            {/* Single-line content: name booked service · time */}
            <div className="min-w-0">
              <p className="text-[11px] leading-tight text-gray-200 truncate">
                <span className="font-bold text-white">{current.name}</span>
                <span className="text-gray-400"> booked </span>
                <span className="font-semibold text-[#F0D48A]">{current.label}</span>
              </p>
              <div className="flex items-center gap-1.5 text-[8.5px] leading-tight text-gray-400 mt-0.5">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Live
                </span>
                <span>•</span>
                <span className="truncate">{current.city}</span>
                <span>•</span>
                <span className="text-[#d4af37]">{current.time}</span>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="absolute top-1/2 -translate-y-1/2 right-1.5 text-gray-500 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Dismiss live ticker"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
