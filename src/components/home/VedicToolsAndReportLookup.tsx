"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import PanditJiVoiceBlessing from "@/components/audio/PanditJiVoiceBlessing";
import ServiceIcon from "@/components/ui/service-icons/ServiceIcon";
import type { ServiceIconName } from "@/components/ui/service-icons/registry";
import { useT } from "@/context/LanguageContext";

type ToolCategory = "timing" | "love" | "self" | "ritual" | "cosmic";

interface ToolItem {
  titleKey: string;
  hindiTitle: string;
  descKey: string;
  href: string;
  artifact: ServiceIconName;
  actionKey: string;
  category: ToolCategory;
  badgeKey?: string;
}

const CATEGORIES: { id: ToolCategory; labelKey: string; hi: string }[] = [
  { id: "timing", labelKey: "tools.cat.timing", hi: "मुहूर्त" },
  { id: "love",   labelKey: "tools.cat.love",   hi: "विवाह"  },
  { id: "self",   labelKey: "tools.cat.self",   hi: "आत्म"   },
  { id: "ritual", labelKey: "tools.cat.ritual", hi: "साधना" },
  { id: "cosmic", labelKey: "tools.cat.cosmic", hi: "ब्रह्मांड" },
];

const ALL_VEDIC_TOOLS: ToolItem[] = [
  {
    titleKey: "tools.decisionClock.title",
    hindiTitle: "काल चक्र",
    descKey: "tools.decisionClock.desc",
    href: "/decision-clock",
    artifact: "decision-clock",
    actionKey: "tools.decisionClock.action",
    category: "timing",
    badgeKey: "tools.decisionClock.badge",
  },
  {
    titleKey: "tools.sankalp.title",
    hindiTitle: "दीप संकल्प",
    descKey: "tools.sankalp.desc",
    href: "/digital-sankalp",
    artifact: "diya-shrine",
    actionKey: "tools.sankalp.action",
    category: "ritual",
    badgeKey: "tools.sankalp.badge",
  },
  {
    titleKey: "tools.prashna.title",
    hindiTitle: "प्रश्न कुंडली",
    descKey: "tools.prashna.desc",
    href: "/prashna-kundli",
    artifact: "kundli-engine",
    actionKey: "tools.prashna.action",
    category: "timing",
    badgeKey: "tools.prashna.badge",
  },
  {
    titleKey: "tools.namkaran.title",
    hindiTitle: "नाम संस्कार",
    descKey: "tools.namkaran.desc",
    href: "/name-calculator",
    artifact: "name-analysis",
    actionKey: "tools.namkaran.action",
    category: "ritual",
  },
  {
    titleKey: "tools.vastu.title",
    hindiTitle: "वास्तु मंडल",
    descKey: "tools.vastu.desc",
    href: "/vastu-scanner",
    artifact: "vastu-scanner",
    actionKey: "tools.vastu.action",
    category: "cosmic",
    badgeKey: "tools.vastu.badge",
  },
  {
    titleKey: "tools.kundliMilan.title",
    hindiTitle: "गुण मिलान",
    descKey: "tools.kundliMilan.desc",
    href: "/compatibility",
    artifact: "kundli-milan",
    actionKey: "tools.kundliMilan.action",
    category: "love",
    badgeKey: "tools.kundliMilan.badge",
  },
  {
    titleKey: "tools.transit.title",
    hindiTitle: "ग्रह गोचर",
    descKey: "tools.transit.desc",
    href: "/transit-wheel",
    artifact: "planetary-transits",
    actionKey: "tools.transit.action",
    category: "cosmic",
    badgeKey: "tools.transit.badge",
  },
  {
    titleKey: "tools.pastLife.title",
    hindiTitle: "पूर्वजन्म कर्म",
    descKey: "tools.pastLife.desc",
    href: "/past-life-reader",
    artifact: "karma-reader",
    actionKey: "tools.pastLife.action",
    category: "self",
    badgeKey: "tools.pastLife.badge",
  },
  {
    titleKey: "tools.spouse.title",
    hindiTitle: "जीवनसाथी योग",
    descKey: "tools.spouse.desc",
    href: "/spouse-predictor",
    artifact: "spouse-blueprint",
    actionKey: "tools.spouse.action",
    category: "love",
    badgeKey: "tools.spouse.badge",
  },
  {
    titleKey: "tools.manglik.title",
    hindiTitle: "मांगलिक शोधन",
    descKey: "tools.manglik.desc",
    href: "/manglik-rescue",
    artifact: "manglik-rescue",
    actionKey: "tools.manglik.action",
    category: "love",
  },
  {
    titleKey: "tools.muhurta.title",
    hindiTitle: "शुभ मुहूर्त",
    descKey: "tools.muhurta.desc",
    href: "/muhurta-finder",
    artifact: "muhurta-finder",
    actionKey: "tools.muhurta.action",
    category: "timing",
    badgeKey: "tools.muhurta.badge",
  },
  {
    titleKey: "tools.garbh.title",
    hindiTitle: "गर्भ संस्कार",
    descKey: "tools.garbh.desc",
    href: "/garbh-sanskar",
    artifact: "garbh-sanskar",
    actionKey: "tools.garbh.action",
    category: "ritual",
  },
  {
    titleKey: "tools.dream.title",
    hindiTitle: "स्वप्न विचार",
    descKey: "tools.dream.desc",
    href: "/dream-decoder",
    artifact: "dream-decoder",
    actionKey: "tools.dream.action",
    category: "cosmic",
  },
  {
    titleKey: "tools.chakra.title",
    hindiTitle: "चक्र जागरण",
    descKey: "tools.chakra.desc",
    href: "/chakra-scanner",
    artifact: "chakra-scanner",
    actionKey: "tools.chakra.action",
    category: "self",
    badgeKey: "tools.chakra.badge",
  },
  {
    titleKey: "tools.japa.title",
    hindiTitle: "जप माला",
    descKey: "tools.japa.desc",
    href: "/japa-mala",
    artifact: "japa-mala",
    actionKey: "tools.japa.action",
    category: "ritual",
  },
  {
    titleKey: "tools.karmicDebt.title",
    hindiTitle: "पितृ ऋण",
    descKey: "tools.karmicDebt.desc",
    href: "/karmic-debt",
    artifact: "karmic-debt",
    actionKey: "tools.karmicDebt.action",
    category: "self",
  },
  {
    titleKey: "tools.ayurveda.title",
    hindiTitle: "प्रकृति विश्लेषण",
    descKey: "tools.ayurveda.desc",
    href: "/ayurveda-prakriti",
    artifact: "ayurveda-prakriti",
    actionKey: "tools.ayurveda.action",
    category: "self",
  },
  {
    titleKey: "tools.dishaShoola.title",
    hindiTitle: "दिशा शूल",
    descKey: "tools.dishaShoola.desc",
    href: "/disha-shoola",
    artifact: "disha-shoola",
    actionKey: "tools.dishaShoola.action",
    category: "timing",
    badgeKey: "tools.dishaShoola.badge",
  },
  {
    titleKey: "tools.palm.title",
    hindiTitle: "सामुद्रिक लक्षण",
    descKey: "tools.palm.desc",
    href: "/palm-scanner",
    artifact: "palm-scanner",
    actionKey: "tools.palm.action",
    category: "self",
  },
  {
    titleKey: "tools.gemstone.title",
    hindiTitle: "रत्न परामर्श",
    descKey: "tools.gemstone.desc",
    href: "/gemstone-calculator",
    artifact: "gemstone-calculator",
    actionKey: "tools.gemstone.action",
    category: "ritual",
    badgeKey: "tools.gemstone.badge",
  },
];

export default function VedicToolsAndReportLookup() {
  const t = useT();
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("timing");
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const activeTools = ALL_VEDIC_TOOLS.filter((tool) => tool.category === activeCategory);

  // ── Celestial Dial: per-card focus (1 = centered, →0 = far). Drives scale +
  //    opacity + gold-ring so the centered card reads as "in focus", like planets
  //    crossing the ecliptic. Transform/opacity only → GPU-cheap, iOS-safe. ──
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [focus, setFocus] = useState<number[]>([]);
  const rafRef = useRef<number | null>(null);

  const recomputeFocus = useCallback(() => {
    const deck = scrollRef.current;
    if (!deck) return;
    const rect = deck.getBoundingClientRect();
    const deckCenter = rect.left + rect.width / 2;
    // Distance at which a card is considered "fully receded".
    const falloff = rect.width * 0.6;
    const next = cardRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const dist = Math.abs(cardCenter - deckCenter);
      return Math.max(0, 1 - dist / falloff); // 1 centered → 0 far
    });
    setFocus(next);
  }, []);

  const handleDeckScroll = useCallback(() => {
    if (reduceMotion) return;
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      recomputeFocus();
    });
  }, [recomputeFocus, reduceMotion]);

  // Initial focus pass + recompute when the category (card set) changes.
  useEffect(() => {
    if (reduceMotion) return;
    cardRefs.current = cardRefs.current.slice(0, activeTools.length);
    const id = requestAnimationFrame(recomputeFocus);
    return () => cancelAnimationFrame(id);
    // activeCategory drives the visible card set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, reduceMotion, recomputeFocus]);

  // One-time "tug" nudge when the deck first scrolls into view, so seekers learn
  // it is swipeable. Gentle drift + spring back; skipped for reduced-motion.
  const nudgedRef = useRef(false);
  useEffect(() => {
    if (reduceMotion) return;
    const deck = scrollRef.current;
    if (!deck) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !nudgedRef.current) {
            nudgedRef.current = true;
            // Only nudge if there is actually more to scroll.
            if (deck.scrollWidth > deck.clientWidth + 24) {
              setTimeout(() => deck.scrollTo({ left: 46, behavior: "smooth" }), 700);
              setTimeout(() => deck.scrollTo({ left: 0, behavior: "smooth" }), 1250);
            }
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(deck);
    return () => io.disconnect();
  }, [reduceMotion]);

  const scrollDeck = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="section-py relative overflow-hidden surface-obsidian">
      <span className="glow-fill" />
      
      {/* Subtle golden atmospheric background caustics */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[600px] bg-[#F5A623]/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/[0.08] blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto section-px relative z-10">
        
        {/* Section Header with Royal Vedic Crest & Typography */}
        <div className="text-center mb-8 sm:mb-11">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF9EE] via-[#FFF3D6] to-[#FFF9EE] border border-[#D4AF37]/60 mb-3.5 shadow-[0_4px_14px_rgba(184,134,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-[#C25E10] animate-pulse" />
            <span className="text-[10.5px] sm:text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#8C3F08] uppercase">
              {t("tools.hdr.eyebrow")}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C25E10] animate-pulse" />
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2.5 font-cormorant text-[#22130A]"
          >
            {t("tools.hdr.title")}
          </h2>

          {/* Sacred Lotus Divider */}
          <div className="flex items-center justify-center gap-3 my-2.5">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-[#B8860B]" />
            <span className="text-[#C25E10] text-sm">𑁍</span>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#D4AF37] to-[#B8860B]" />
          </div>

          <p className="text-xs sm:text-sm lg:text-[15px] text-[#2E1D14] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            {t("tools.hdr.sub")}
          </p>
        </div>

        {/* ── 1. Sacred Spoken Blessing (Compact Mobile Jewel Pod) ── */}
        <div className="mb-3 sm:mb-4 max-w-3xl mx-auto">
          <PanditJiVoiceBlessing />
        </div>

        {/* ── 1b. Live Auspicious Timing & Real-Time Choghadiya Ticker (Daily Habit Hook) ── */}
        <div className="mb-3 sm:mb-4 max-w-3xl mx-auto px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-[#FFF9EE] via-[#FDF3DE] to-[#FFF9EE] border border-[#D4AF37]/45 flex items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            <div className="min-w-0">
              <span className="font-bold text-[#22130A] mr-1.5 font-sans">{t("tools.ticker.label")}</span>
              <span className="text-[#8C5212] font-medium truncate inline-block align-bottom max-w-[200px] sm:max-w-none font-sans">
                {t("tools.ticker.value")}
              </span>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#9E430A] bg-[#FFF2DE] px-2.5 py-0.5 rounded-full border border-[#E8791E]/30 shrink-0">
            ⚡ {t("tools.ticker.refresh")}
          </span>
        </div>

        {/* ── 2. Category Tabs + Horizontal Sliding Deck (Pristine Royal Carousel) ── */}
        <div className="mb-10">
          {/* Category chips + Carousel Nav Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="scroll-snap-row hide-scrollbar flex gap-2 pb-1 -mx-1 px-1 overflow-x-auto">
              {CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategory;
                const count = ALL_VEDIC_TOOLS.filter((tp) => tp.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-sans font-bold tracking-wide transition-all duration-300 border cursor-pointer active:scale-95 ${
                      isActive
                        ? "bg-gradient-to-r from-[#9E430A] via-[#C25E10] to-[#D4AF37] text-white border-transparent shadow-[0_6px_20px_-4px_rgba(194,94,16,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                        : "bg-gradient-to-b from-[#FFFDF9] to-[#FDF8EE] text-[#6B5542] hover:text-[#9E430A] border-[#D4AF37]/35 hover:border-[#D4AF37]/80 shadow-[0_2px_8px_rgba(184,134,11,0.08)]"
                    }`}
                  >
                    <span>{t(cat.labelKey)}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/25 text-white font-black" : "bg-[#F5EAD4] text-[#843D0A]"}`}>{count}</span>
                    <span className={`text-[10px] font-serif italic ${isActive ? "text-amber-100" : "text-[#C25E10]"}`}>({cat.hi})</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop / Tablet Navigation Controls */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => scrollDeck("left")}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full bg-[#FFFDF8] hover:bg-[#FDF3E2] border border-[#D4AF37]/40 text-[#843D0A] flex items-center justify-center shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollDeck("right")}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full bg-[#FFFDF8] hover:bg-[#FDF3E2] border border-[#D4AF37]/40 text-[#843D0A] flex items-center justify-center shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sliding deck — horizontal snap scroll with rich gold depth (ZERO OVERLAYS / NO FOG) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                ref={scrollRef}
                onScroll={handleDeckScroll}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-snap-row hide-scrollbar flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 -mx-1 px-1 scroll-smooth snap-x snap-mandatory"
              >
                {activeTools.map((tool, i) => {
                  // Celestial-dial transform: centered card = full; neighbors recede.
                  const f = reduceMotion ? 1 : (focus[i] ?? 1);
                  const scale = 0.9 + 0.1 * f;      // 0.90 → 1.00
                  const opacity = 0.55 + 0.45 * f;  // 0.55 → 1.00
                  const ringLit = f > 0.6;
                  return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    style={{
                      transform: `scale(${scale})`,
                      opacity,
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease, box-shadow 0.4s ease",
                      willChange: reduceMotion ? undefined : "transform, opacity",
                    }}
                    className={`card-light-sweep group relative shrink-0 snap-center w-[80vw] xs:w-[290px] sm:w-[325px] rounded-[22px] p-4 sm:p-5 bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F1] to-[#F8F1E2] border hover:border-[#D4AF37]/85 flex flex-col justify-between overflow-hidden ${
                      ringLit
                        ? "border-[#E8791E]/70 shadow-[0_22px_45px_-12px_rgba(184,134,11,0.3),0_0_26px_rgba(232,121,30,0.2)]"
                        : "border-[#D4AF37]/35 shadow-[0_10px_28px_-12px_rgba(74,38,14,0.16),inset_0_1px_2px_rgba(255,255,255,0.95)]"
                    }`}
                  >
                    {/* Corner Royal Filigree Accents */}
                    <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#D4AF37]/50 rounded-tl pointer-events-none group-hover:border-[#E8791E] transition-colors duration-400" />
                    <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#D4AF37]/50 rounded-br pointer-events-none group-hover:border-[#E8791E] transition-colors duration-400" />

                    {/* Sacred Sri Yantra / 12-Fold Lotus Watermark */}
                    <svg
                      aria-hidden="true"
                      className="absolute -right-8 -bottom-8 w-36 h-36 text-[#D4AF37] opacity-[0.05] group-hover:opacity-[0.14] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none"
                      viewBox="0 0 100 100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.8"
                    >
                      <circle cx="50" cy="50" r="46" strokeDasharray="2 2" />
                      <circle cx="50" cy="50" r="38" />
                      <circle cx="50" cy="50" r="28" strokeDasharray="4 2" />
                      <circle cx="50" cy="50" r="18" />
                      <circle cx="50" cy="50" r="8" />
                      <polygon points="50,6 62,38 94,50 62,62 50,94 38,62 6,50 38,38" />
                      <polygon points="50,16 60,40 84,50 60,60 50,84 40,60 16,50 40,40" strokeDasharray="1 2" />
                    </svg>

                    <div className="relative z-10">
                      {/* Top Row: 3D Medallion on 24K Cushion + Consecrated Sanskrit Seal */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="relative group-hover:scale-105 transition-transform duration-400 shrink-0">
                          {/* Warm gold aura behind the obsidian podium */}
                          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#D4AF37]/55 to-[#E8791E]/35 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          {/* Ultra-rich dark obsidian podium (matches the Services page medallions) */}
                          <div className="relative p-1 rounded-2xl bg-[#0D0907] border-2 border-[#D4AF37]/60 shadow-[0_6px_18px_-4px_rgba(201,162,74,0.4)]">
                            <ServiceIcon iconKey={tool.artifact} size={56} tone="obsidian" />
                          </div>
                        </div>

                        <span
                          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-serif italic font-bold text-[#843D0A] bg-gradient-to-r from-[#FFF8EB] to-[#FDE8C4] px-2.5 sm:px-3 py-1 rounded-full border border-[#D4AF37]/60 shadow-[0_2px_8px_rgba(184,134,11,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] tracking-wide group-hover:border-[#E8791E]/70 transition-colors"
                          style={{ fontFamily: "var(--font-tiro, serif)" }}
                        >
                          <span className="text-[#C25E10] text-[9px]">✦</span>
                          {tool.hindiTitle}
                        </span>
                      </div>

                      {/* Value Hook Badge */}
                      {tool.badgeKey && (
                        <div className="mb-1.5">
                          <span className="inline-flex items-center gap-1 text-[9px] font-sans font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#8B3A05] via-[#A84A0A] to-[#C25E10] text-[#FFF9E6] px-2 py-0.5 rounded-md shadow-[0_2px_6px_rgba(139,58,5,0.2)]">
                            ✦ {t(tool.badgeKey)}
                          </span>
                        </div>
                      )}

                      {/* Tool Title */}
                      <h4 className="text-[16.5px] sm:text-[18.5px] font-bold text-[#22130A] group-hover:text-[#9E430A] transition-colors leading-tight mb-1 font-cormorant">
                        {t(tool.titleKey)}
                      </h4>

                      {/* Tool Description */}
                      <p className="text-[11.5px] sm:text-[12.5px] text-[#2E1D14] leading-relaxed line-clamp-2 min-h-[34px] sm:min-h-[38px] font-sans font-medium mb-3">
                        {t(tool.descKey)}
                      </p>
                    </div>

                    {/* Bottom Gate: Live Shastra Status + Molten 24K Gold CTA Button */}
                    <div className="relative z-10 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between gap-2 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-medium text-[#2E1D14]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-semibold text-[#2A1810]">{t("tools.card.live")}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#E8791E] hover:from-[#E8791E] hover:to-[#D4AF37] text-[#120B07] shadow-[0_3px_12px_rgba(212,175,55,0.35)] group-hover:shadow-[0_6px_20px_rgba(232,121,30,0.5)] transition-all duration-300 font-sans font-extrabold text-[11px] sm:text-xs uppercase tracking-wider active:scale-95 group-hover:scale-[1.02]">
                        <span>{t(tool.actionKey)}</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swipe hint + full-directory link */}
          <div className="flex items-center justify-between mt-2.5 px-1">
            <span className="text-[11.5px] text-[#2E1D14] font-medium font-sans inline-flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-[#C25E10]" />
              {t("tools.swipe.hint")}
            </span>
            <Link href="/services" className="text-[11.5px] font-sans font-bold text-[#C25E10] hover:text-[#9E430A] transition-colors uppercase tracking-wider inline-flex items-center gap-1">
              <span>{t("tools.viewall").replace("{n}", String(ALL_VEDIC_TOOLS.length))}</span>
              <span>→</span>
            </Link>
          </div>

          {/* ── Daily Habit Return Banner (Keeps seekers coming back every day) ── */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-[#FFF9EE] via-[#FDF3DE] to-[#FFF9EE] border border-[#D4AF37]/50 shadow-[0_6px_20px_-6px_rgba(184,134,11,0.18)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9E430A] to-[#C25E10] text-[#FFF4D9] flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h4 className="text-sm font-bold font-cormorant text-[#22130A]">
                    {t("tools.return.title")}
                  </h4>
                  <span className="px-2 py-0.5 text-[9px] font-sans font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                    {t("tools.return.badge")}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#2E1D14] font-sans mt-0.5">
                  {t("tools.return.desc")}
                </p>
              </div>
            </div>
            <Link
              href="/decision-clock"
              className="shrink-0 px-4 py-2 rounded-xl bg-[#22130A] hover:bg-[#3D2317] text-[#FFF7E8] text-xs font-sans font-bold tracking-wider uppercase shadow-md transition-all flex items-center gap-1.5"
            >
              <span>{t("tools.return.cta")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* NOTE: The archival "Access Your Consecrated Record" lookup was removed here —
            report verification now lives in the premium VerifiedDelivery section
            (single, consistent Reference-ID entry across the homepage). */}
      </div>
    </section>
  );
}
