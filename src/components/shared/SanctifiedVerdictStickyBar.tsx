"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { waLink } from "@/config/contact";

interface StickyBarProps {
  serviceId?: string;
  serviceName?: string;
  price?: number | string;
  badge?: string;
}

export default function SanctifiedVerdictStickyBar({
  serviceId = "vedic-guidance",
  serviceName = "Pandit Ji Personalized Remedial Guidance",
  price = 501,
  badge = "Live Consecration Session Open",
}: StickyBarProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 350px (when they start reading results)
      if (window.scrollY > 350) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappHref = waLink(
    `Namaste Pandit Ji 🙏 I am reviewing my Vedic assessment on ShubhMarg and wish to unlock my personalized Gotra Sankalp remedy for *${serviceName}* (${typeof price === "number" ? `₹${price}` : price}).`
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#120704]/95 border-t-2 border-[#d4af37]/60 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl px-4 py-3 sm:py-3.5"
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left status */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[#d4af37] shrink-0">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37]">
                    {badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold font-serif text-white truncate">
                  Neutralize Planetary Friction with Pandit Ji&apos;s Sankalp
                </p>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400/20" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              <Link
                href={`/request-guidance?service=${serviceId}`}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Unlock Personal Remedy ({typeof price === "number" ? `₹${price}` : price})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
