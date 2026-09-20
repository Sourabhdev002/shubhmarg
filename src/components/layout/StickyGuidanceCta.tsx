"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { pixelContact } from "@/components/analytics/pixelEvents";

// Always-visible mobile conversion bar. Sits ABOVE the FloatingNav pill so both
// stay readable. Two actions: a free taste (left) and the Rs 11 first-yes (right).
// On the homepage both scroll to the Rashi section (single source of truth for
// the unlock flow); elsewhere they route to /quick-answer.

const RASHI_ANCHOR = "rashi-today";

export default function StickyGuidanceCta() {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [show, show_set] = useState(false);

  // Reveal after the user has scrolled past the hero (avoids covering the fold).
  useEffect(() => {
    const onScroll = () => show_set(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  const goRashi = useCallback(() => {
    if (isHome) {
      const el = document.getElementById(RASHI_ANCHOR);
      if (el) { el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); return; }
    }
    router.push("/quick-answer");
  }, [isHome, reduce, router]);

  const onFree = useCallback(() => {
    pixelContact("sticky_cta_free");
    goRashi();
  }, [goRashi]);

  const onUnlock = useCallback(() => {
    pixelContact("sticky_cta_11");
    goRashi();
  }, [goRashi]);

  // Never over payment (ChromeGate already hides on /payment, but be defensive).
  if (pathname?.startsWith("/payment")) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="fixed left-1/2 -translate-x-1/2 z-40 md:hidden w-[calc(100%-1.5rem)] max-w-[420px] bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] pointer-events-none"
        >
          <div className="pointer-events-auto flex items-stretch gap-2 rounded-2xl p-1.5 bg-[#FFFDF8]/95 backdrop-blur-sm border border-[#B8860B]/35 shadow-[0_10px_30px_-8px_rgba(107,42,20,0.35)]">
            {/* FREE taste */}
            <button
              type="button"
              onClick={onFree}
              className="flex-1 min-h-[46px] inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 font-bold text-[13px] text-[#C25E10] bg-gradient-to-r from-[#FDF3E2] to-[#F5EAD6] border border-[#B8860B]/30 active:scale-[0.97] transition-transform"
            >
              <Sparkles className="w-4 h-4 text-[#E8791E]" />
              <span>Free Rashi</span>
            </button>

            {/* Rs 11 first-yes */}
            <button
              type="button"
              onClick={onUnlock}
              className="relative flex-[1.15] min-h-[46px] inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 font-black text-[13px] text-white bg-gradient-to-r from-[#E8791E] via-[#F5A623] to-[#E8791E] shadow-[0_6px_18px_-4px_rgba(232,121,30,0.6)] active:scale-[0.97] transition-transform overflow-hidden"
            >
              {/* subtle light sweep */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-0 left-[-60%] w-[45%] h-full -skew-x-[18deg]"
                animate={reduce ? undefined : { left: ["-60%", "160%"] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
              />
              <span className="relative z-10">Aashirwad</span>
              <span className="relative z-10 px-1.5 py-0.5 rounded-md bg-white/25 text-[11px] font-black leading-none">{"\u20B9"}11</span>
              <ArrowRight className="relative z-10 w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}