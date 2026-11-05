"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/hooks/useIsClient";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Search, ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  SACRED_SERVICES,
  VEDIC_TOOLS,
  type ServiceEntry,
} from "@/data/services";
import ServiceIcon from "@/components/ui/service-icons/ServiceIcon";
import { LISTED_PAATHS } from "@/lib/paath/registry";
import { ctaPriceLabel } from "@/lib/service-catalog";
import PremiumVedicIcon, { type PremiumVedicIconName } from "@/components/ui/PremiumVedicIcon";

// ── The few things people come for: paid steps, daily paath, free checks ──
const PRIMARY: { name: string; sub: string; href: string; icon: PremiumVedicIconName }[] = [
  { name: "Quick Answer", sub: `One question, reply in 1 hour · ${ctaPriceLabel("quick-answer")}`, href: "/quick-answer", icon: "tatkal-express" },
  { name: "Personal Guidance", sub: `Birth-chart based answer · ${ctaPriceLabel("vedic-guidance")}`, href: "/request-guidance?service=vedic-guidance", icon: "kundli-engine" },
  { name: "Temple Sankalp Puja", sub: `Puja in your name & Gotra · ${ctaPriceLabel("temple-puja")}`, href: "/request-guidance?service=temple-puja", icon: "temple-puja" },
  { name: "Free Reading", sub: "Ask one question free", href: "/free-reading", icon: "sacred-offerings" },
  ...LISTED_PAATHS.map((p) => ({ name: p.titleEn, sub: p.titleHi, href: `/${p.slug}`, icon: "japa-mala" as PremiumVedicIconName })),
  { name: "Festival Calendar", sub: "Upcoming festivals & panchang", href: "/shubh-calendar", icon: "shubh-calendar" },
  { name: "Shani Sade Sati Check", sub: "Free check", href: "/shani-sade-sati", icon: "shani-sade-sati" },
  { name: "Marriage Matching", sub: "Free 36-point check", href: "/compatibility", icon: "kundli-milan" },
];

// Long category lists removed for a calmer menu. Search above still finds every page.
const GROUPS: { label: string; Icon: LucideIcon; match: string[] }[] = [];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useIsClient();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => { setIsOpen(false); setQuery(""); };

  const allItems: ServiceEntry[] = useMemo(
    () => [...SACRED_SERVICES, ...VEDIC_TOOLS],
    []
  );

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allItems.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.subtitle && i.subtitle.toLowerCase().includes(q))
    );
  }, [allItems, query]);

  const drawer = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] flex flex-col bg-[#FBF6EC] text-[#2A1810]"
          style={{ height: "100dvh" }}
        >
          {/* Header bar */}
          <div className="shrink-0 flex items-center justify-between px-5 h-14 border-b border-[#D4AF37]/25 bg-[#FFFDF8]">
            <div className="flex items-center gap-2">
              <span className="font-devanagari text-[#E8791E] text-xl font-black leading-none">&#2384;</span>
              <span className="font-serif font-bold text-[#2A1810] text-lg">ShubhMarg</span>
            </div>
            <button
              onClick={close}
              aria-label="Close menu"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/40 bg-[#FBF6EC] text-[#C25E10] flex items-center justify-center active:scale-95 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scroll area */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 pb-[calc(6rem+env(safe-area-inset-bottom,16px))]">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8860B]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-[#FFFDF8] border border-[#D4AF37]/35 text-sm text-[#2A1810] placeholder-[#9E8F7A] focus:outline-none focus:border-[#E8791E]"
              />
            </div>

            {query.trim() ? (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#B8860B]">
                  {searchResults.length} result{searchResults.length === 1 ? "" : "s"}
                </p>
                {searchResults.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFFDF8] border border-[#D4AF37]/20 active:scale-[0.98] transition-transform"
                  >
                    <ServiceIcon iconKey={item.iconKey} size={34} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#2A1810] leading-tight">{item.name}</p>
                      {item.subtitle && <p className="text-[11px] text-[#6B5A48] truncate">{item.subtitle}</p>}
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#B8860B] shrink-0" />
                  </Link>
                ))}
                {searchResults.length === 0 && (
                  <p className="text-sm text-[#6B5A48] py-6 text-center">No services found. Try another word.</p>
                )}
              </div>
            ) : (
              <>
                {/* Primary quick actions */}
                <div className="space-y-2.5">
                  {PRIMARY.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={close}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#D4AF37]/30 shadow-[0_2px_10px_-6px_rgba(107,42,20,0.2)] active:scale-[0.98] transition-transform"
                    >
                      <PremiumVedicIcon name={p.icon} size={44} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-bold text-[#2A1810] leading-tight">{p.name}</p>
                        <p className="text-[12px] text-[#6B5A48]">{p.sub}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#E8791E] shrink-0" />
                    </Link>
                  ))}
                </div>

                {/* Service groups */}
                <div className="space-y-5">
                  {GROUPS.map((g) => {
                    const items = allItems.filter((i) => i.category && g.match.includes(i.category));
                    if (items.length === 0) return null;
                    const GIcon = g.Icon;
                    return (
                      <div key={g.label}>
                        <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#B8860B] mb-2.5">
                          <GIcon className="w-4 h-4 text-[#E8791E]" strokeWidth={2.2} /> {g.label}
                        </p>
                        <div className="space-y-1.5">
                          {items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={close}
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FFFDF8]/70 border border-[#D4AF37]/15 active:scale-[0.98] transition-transform"
                            >
                              <ServiceIcon iconKey={item.iconKey} size={30} />
                              <span className="text-[13px] font-semibold text-[#2A1810] leading-tight flex-1 min-w-0">{item.name}</span>
                              <ChevronRight className="w-4 h-4 text-[#B8860B] shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href="/support"
                  onClick={close}
                  className="block text-center py-3 rounded-full border border-[#D4AF37]/40 text-[13px] font-bold text-[#C25E10] bg-[#FFFDF8]"
                >
                  Need help? Talk to us &rarr;
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E8791E]/40 bg-[#FFFDF8] text-[#C25E10] hover:border-[#E8791E] hover:bg-[#FDF3E2] active:scale-95 transition-all shadow-[0_2px_10px_rgba(107,42,20,0.12)]"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
