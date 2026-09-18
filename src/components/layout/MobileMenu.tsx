"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Search,
  Calendar,
  LifeBuoy,
  Sparkles,
  Grid3X3,
  Layers,
  Volume2,
  VolumeX,
  Clock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/utils/cn";
import {
  SACRED_SERVICES,
  VEDIC_TOOLS,
  type ServiceEntry,
  type ServiceCategory,
} from "@/data/services";
import ServiceIcon from "@/components/ui/service-icons/ServiceIcon";
import type { ServiceIconName } from "@/components/ui/service-icons/registry";
import { ImpactStyle } from "@capacitor/haptics";
import { cosmicAudio, REALM_FREQUENCIES } from "@/utils/cosmicResonance";

/* ─────────────────────────────────────────────────────────────
   COSMIC REALM DEFINITIONS (CONCEPT A: HAPTIC COSMIC ARC WHEEL)
   ───────────────────────────────────────────────────────────── */

interface CosmicRealm {
  id: string;
  categoryFilter: ServiceCategory | "muhurat";
  sanskrit: string;
  englishTitle: string;
  tagline: string;
  heroIcon: ServiceIconName;
  frequency: string;
  frequencyHz: number;
  statusBadge: string;
  statusColor: "emerald" | "amber" | "gold" | "rose";
  ephemerisSnippet: string;
  primaryHref: string;
  primaryAction: string;
  arcIcon: string;
  arcLabel: string;
  description: string;
}

const COSMIC_REALMS: CosmicRealm[] = [
  {
    id: "muhurat",
    categoryFilter: "muhurat",
    sanskrit: "शुभ मुहूर्त एवं काल",
    englishTitle: "Sacred Timing & Ephemeris",
    tagline: "Surya Siddhanta Astronomical Hora & Choghadiya",
    heroIcon: "decision-clock",
    frequency: "432 Hz • Cosmic Harmonic",
    frequencyHz: REALM_FREQUENCIES.muhurat,
    statusBadge: "ABHIJIT ACTIVE",
    statusColor: "emerald",
    ephemerisSnippet: "Pushya Nakshatra • Shukla Navami",
    primaryHref: "/shubh-calendar",
    primaryAction: "OPEN SHUBH PANCHANG",
    arcIcon: "✨",
    arcLabel: "Muhurat",
    description: "Real-time auspicious windows for wealth, travel & new beginnings",
  },
  {
    id: "jyotish",
    categoryFilter: "kundli",
    sanskrit: "कुण्डली एवं ज्योतिष",
    englishTitle: "Parashara Kundli Engine",
    tagline: "12 Planetary Bhavas, D9 Navamsha & Raja Yogas",
    heroIcon: "kundli-engine",
    frequency: "528 Hz • Planetary Matrix",
    frequencyHz: REALM_FREQUENCIES.jyotish,
    statusBadge: "12 BHAVAS LIVE",
    statusColor: "gold",
    ephemerisSnippet: "Guru in Taurus • Shani in Aquarius",
    primaryHref: "/rajayoga-scanner",
    primaryAction: "SCAN RAJA YOGAS",
    arcIcon: "📜",
    arcLabel: "Jyotish",
    description: "Deep astrological blueprints, divisional charts & planetary transits",
  },
  {
    id: "offerings",
    categoryFilter: "offerings",
    sanskrit: "पवित्र पूजा अनुष्ठान",
    englishTitle: "Temple Sankalp & Pujas",
    tagline: "Consecrated Shastric Yagyas & Archana Havans",
    heroIcon: "sacred-offerings",
    frequency: "639 Hz • Sacred Devotion",
    frequencyHz: REALM_FREQUENCIES.offerings,
    statusBadge: "ALTARS CONSECRATED",
    statusColor: "amber",
    ephemerisSnippet: "Kashi • Ujjain • Haridwar Sanctums",
    primaryHref: "/sacred-offerings",
    primaryAction: "EXPLORE TEMPLE PUJAS",
    arcIcon: "🪔",
    arcLabel: "Pujas",
    description: "Personalized remote sankalp pujas at revered Jyotirlingas & Peethas",
  },
  {
    id: "love",
    categoryFilter: "love",
    sanskrit: "विवाह एवं संबंध",
    englishTitle: "Soulmate & Vivah Milan",
    tagline: "36-Guna Ashtakoot Harmony & Navamsha Bonds",
    heroIcon: "kundli-milan",
    frequency: "528 Hz • Harmonic Union",
    frequencyHz: REALM_FREQUENCIES.love,
    statusBadge: "36 GUNA MATCHING",
    statusColor: "rose",
    ephemerisSnippet: "Nadi • Bhakoot • Yoni Compatibility",
    primaryHref: "/compatibility",
    primaryAction: "CHECK 36-GUNA MILAN",
    arcIcon: "❤️",
    arcLabel: "Vivah",
    description: "Comprehensive matrimonial alignment, Manglik rescue & soulmate indicators",
  },
  {
    id: "remedies",
    categoryFilter: "remedies",
    sanskrit: "वैदिक उपाय एवं रक्षा",
    englishTitle: "Karmic Armor & Remedies",
    tagline: "Pran-Pratishtha Gemstones, Yantras & Sound Sanctum",
    heroIcon: "raksha-kavach",
    frequency: "741 Hz • Karmic Cleansing",
    frequencyHz: REALM_FREQUENCIES.remedies,
    statusBadge: "SHANI PROTECTION",
    statusColor: "gold",
    ephemerisSnippet: "Sade Sati Phase II • 4 Karmic Rins",
    primaryHref: "/shani-sade-sati",
    primaryAction: "RESOLVE SADE SATI",
    arcIcon: "🛡️",
    arcLabel: "Remedies",
    description: "Authentic Vedic remedies, energized gemstones, Yantras & 432Hz mantras",
  },
  {
    id: "wealth",
    categoryFilter: "wealth",
    sanskrit: "वास्तु एवं समृद्धि",
    englishTitle: "16-Zone Spatial Vastu",
    tagline: "Cardinal Energy Alignment & Wealth Inflow",
    heroIcon: "vastu-compass",
    frequency: "852 Hz • Kubera Grid",
    frequencyHz: REALM_FREQUENCIES.wealth,
    statusBadge: "16 ZONES ACTIVE",
    statusColor: "amber",
    ephemerisSnippet: "Ishanya Northeast • Brahmasthan Flow",
    primaryHref: "/vastu-compass",
    primaryAction: "ANALYZE 16-ZONE VASTU",
    arcIcon: "💰",
    arcLabel: "Vastu",
    description: "Spatial energy matrix analyzer, home balance & commercial prosperity",
  },
  {
    id: "family",
    categoryFilter: "family",
    sanskrit: "कुल एवं संस्कार",
    englishTitle: "Ancestral & Lineage Vault",
    tagline: "Saptarishi Gotra, Kuldevta & Sacred Samskaras",
    heroIcon: "kuldevta-resolver",
    frequency: "963 Hz • Crown Connection",
    frequencyHz: REALM_FREQUENCIES.family,
    statusBadge: "GOTRA LEDGER",
    statusColor: "gold",
    ephemerisSnippet: "Pitru Tarpan • Namkaran • Garbh Sanskar",
    primaryHref: "/kuldevta-resolver",
    primaryAction: "RESOLVE KULDEVTA",
    arcIcon: "🌿",
    arcLabel: "Family",
    description: "Preserving generational blessings, Vedic baby names & ancestral harmony",
  },
];

type FilterTab = "all" | ServiceCategory;

const CATEGORY_TABS: { id: FilterTab; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "✨" },
  { id: "offerings", label: "Pujas", icon: "🪔" },
  { id: "kundli", label: "Kundli", icon: "📜" },
  { id: "love", label: "Marriage", icon: "❤️" },
  { id: "remedies", label: "Remedies", icon: "🛡️" },
  { id: "wealth", label: "Vastu", icon: "💰" },
  { id: "family", label: "Family", icon: "🌿" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [activeRealmIndex, setActiveRealmIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"wheel" | "grid">("wheel");
  const [isSearching, setIsSearching] = useState(false);
  const [isAudioResonating, setIsAudioResonating] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState("07:42 AM");

  // Wheel gesture dragging state
  const [dragOffsetDeg, setDragOffsetDeg] = useState(0);
  const [isDraggingWheel, setIsDraggingWheel] = useState(false);
  const dragStartRef = useRef<{ x: number; activeIdx: number }>({ x: 0, activeIdx: 0 });
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  // Center stage swipe gesture
  const stageSwipeStartRef = useRef<number | null>(null);

  useEffect(() => {
    // Standard mount guard for client-only rendering; safe one-time set.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Real-time live clock for Muhurat telemetry capsule
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cleanup audio when closing menu or unmounting
  useEffect(() => {
    if (!isOpen && isAudioResonating) {
      cosmicAudio.stopResonance();
      // Syncs external audio engine state back into React on menu close.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAudioResonating(false);
    }
  }, [isOpen, isAudioResonating]);

  // Lock background scrolling when menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;

    // NOTE: do NOT set `position: fixed` on <body> — that reparents the
    // containing block of every `position: fixed` popup (top-up drawer,
    // greeting, etc.), making them jump to the top / get cut off. Locking
    // scroll with overflow:hidden alone is safe and keeps fixed children
    // anchored to the viewport.
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = () => {
    cosmicAudio.triggerHaptic(ImpactStyle.Light);
    if (isAudioResonating) {
      cosmicAudio.stopResonance();
      setIsAudioResonating(false);
    }
    setIsOpen(false);
    setSearchQuery("");
    setIsSearching(false);
  };

  // Combine all items
  const allItems: ServiceEntry[] = useMemo(() => {
    return [...SACRED_SERVICES, ...VEDIC_TOOLS];
  }, []);

  // Compute counts per category tab
  const tabCounts = useMemo(() => {
    const counts: Record<FilterTab, number> = {
      all: allItems.length,
      offerings: 0,
      kundli: 0,
      love: 0,
      remedies: 0,
      wealth: 0,
      family: 0,
    };
    allItems.forEach((item) => {
      if (item.category && counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return counts;
  }, [allItems]);

  // Current active realm
  const currentRealm = COSMIC_REALMS[activeRealmIndex] || COSMIC_REALMS[0];

  // Sub-tools for current realm
  const realmTools = useMemo(() => {
    if (currentRealm.categoryFilter === "muhurat") {
      return allItems.filter(
        (item) =>
          item.iconKey === "decision-clock" ||
          item.iconKey === "disha-shoola" ||
          item.iconKey === "muhurta-finder" ||
          item.iconKey === "wealth-calendar" ||
          item.href.includes("calendar") ||
          item.href.includes("clock")
      );
    }
    return allItems.filter((item) => item.category === currentRealm.categoryFilter);
  }, [allItems, currentRealm]);

  // Filter items for Grid / Search view
  const filteredItems = useMemo(() => {
    let list = allItems;

    if (activeTab !== "all") {
      list = list.filter((item) => item.category === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
          (item.badge && item.badge.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allItems, activeTab, searchQuery]);

  // Handle switching realm with sound & haptic detent
  const handleSelectRealm = useCallback((index: number, playChime: boolean = true) => {
    const bounded = Math.max(0, Math.min(COSMIC_REALMS.length - 1, index));
    if (bounded !== activeRealmIndex) {
      setActiveRealmIndex(bounded);
      cosmicAudio.playDialTick();

      if (playChime) {
        const realmFreq = COSMIC_REALMS[bounded].frequencyHz;
        cosmicAudio.playSacredChime(realmFreq, 2.2);
      }
    }
  }, [activeRealmIndex]);

  // Next / Previous realm navigation
  const cycleRealm = useCallback((direction: 1 | -1) => {
    setActiveRealmIndex((prev) => {
      const next = Math.max(0, Math.min(COSMIC_REALMS.length - 1, prev + direction));
      if (next !== prev) {
        cosmicAudio.playDialTick();
        cosmicAudio.playSacredChime(COSMIC_REALMS[next].frequencyHz, 2.0);
      }
      return next;
    });
  }, []);

  // Toggle sustained Solfeggio audio resonance
  const handleToggleAudio = () => {
    // Play a real recorded mantra (warm, authentic) instead of a synth tone.
    const newState = cosmicAudio.toggleMantraLoop("/audio/shanti-path.mp3");
    setIsAudioResonating(newState);
  };

  /* ─────────────────────────────────────────────────────────────
     RADIAL ASTROLABE WHEEL GEOMETRY CALCULATIONS
     ───────────────────────────────────────────────────────────── */
  // Arc layout constants tuned for zero clipping and perfect thumb curvature
  const STEP_DEG = 24; // Angular separation between realms
  const ARC_RADIUS = 170; // Radius of thumb sweep track
  const CY_CENTER = 210; // Vertical pivot point

  // Pointer drag event handlers for radial wheel
  const handleWheelPointerDown = (e: React.PointerEvent) => {
    setIsDraggingWheel(true);
    dragStartRef.current = { x: e.clientX, activeIdx: activeRealmIndex };
    (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
  };

  const handleWheelPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingWheel) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    // Map horizontal travel to rotation degrees (smooth 1:1 thumb sweep)
    const deg = (deltaX / 300) * 55;
    setDragOffsetDeg(deg);
  };

  const handleWheelPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingWheel) return;
    setIsDraggingWheel(false);
    try {
      (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
    } catch {}

    const deltaSteps = -Math.round(dragOffsetDeg / STEP_DEG);
    const targetIdx = Math.max(
      0,
      Math.min(COSMIC_REALMS.length - 1, dragStartRef.current.activeIdx + deltaSteps)
    );

    setDragOffsetDeg(0);
    handleSelectRealm(targetIdx, true);
  };

  // Center stage touch swipe handlers
  const handleStageTouchStart = (e: React.TouchEvent) => {
    stageSwipeStartRef.current = e.touches[0].clientX;
  };

  const handleStageTouchEnd = (e: React.TouchEvent) => {
    if (stageSwipeStartRef.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - stageSwipeStartRef.current;
    stageSwipeStartRef.current = null;

    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        cycleRealm(1); // Swipe left -> next realm
      } else {
        cycleRealm(-1); // Swipe right -> prev realm
      }
    }
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="fixed inset-0 z-[99999] flex flex-col overflow-hidden text-[#FFFDF8] bg-[#05060A]"
          style={{
            height: "100dvh",
            overscrollBehavior: "contain",
            backgroundColor: "#05060A",
            background:
              "radial-gradient(ellipse at 50% -10%, #171A2C 0%, #0C0E1B 45%, #05060A 100%)",
          }}
        >
          {/* Subtle Celestial Ambient Stardust Grid */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_180px,rgba(212,175,55,0.09)_0%,transparent_65%)]" />
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D4AF37_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

          {/* Twinkling Stardust Points */}
          <div className="absolute top-24 left-8 w-1 h-1 rounded-full bg-[#FFEAA7] animate-ping opacity-60 pointer-events-none" style={{ animationDuration: "3s" }} />
          <div className="absolute top-44 right-12 w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse opacity-70 pointer-events-none" />
          <div className="absolute top-72 left-20 w-1 h-1 rounded-full bg-white animate-pulse opacity-50 pointer-events-none" />

          {/* ─────────────────────────────────────────────────────────────
              1. ROYAL TEMPLE TOP CONTROLS (OBSIDIAN CRYSTAL GLASS)
             ───────────────────────────────────────────────────────────── */}
          <div className="relative z-30 shrink-0 bg-[#0A0B13]/94 backdrop-blur-2xl border-b border-[#D4AF37]/25 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              {/* Consecrated Om Seal + Brand */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2A1E10] via-[#1F160C] to-[#120D07] border border-[#D4AF37]/65 shadow-[0_0_16px_rgba(212,175,55,0.3),inset_0_1px_1.5px_rgba(255,234,167,0.6)] flex items-center justify-center shrink-0">
                  <span className="font-devanagari text-[#F59E0B] text-[17px] font-black leading-none select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    ॐ
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-devanagari text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF8] via-[#FFEAA7] to-[#F59E0B] text-[17px] font-extrabold leading-none tracking-wide">
                      शुभ मार्ग
                    </span>
                    <span className="text-[9.5px] uppercase tracking-[0.22em] text-[#D4AF37] font-serif font-bold">
                      Sanctum
                    </span>
                  </div>
                  <p className="text-[9px] text-[#A89B8C] font-medium tracking-wide mt-0.5">
                    Cosmic Arc Wheel • Astrolabe
                  </p>
                </div>
              </div>

              {/* Action Buttons: Mode Switcher + Search + Close */}
              <div className="flex items-center gap-1.5">
                {/* Switcher: Wheel vs Grid View */}
                <button
                  onClick={() => {
                    cosmicAudio.triggerHaptic();
                    setViewMode((prev) => (prev === "wheel" ? "grid" : "wheel"));
                  }}
                  className={cn(
                    "h-8 px-2.5 rounded-full border text-[10.5px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs",
                    viewMode === "wheel"
                      ? "bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#FFEAA7] hover:bg-[#D4AF37]/25"
                      : "bg-white/5 border-white/15 text-[#A89B8C] hover:text-white"
                  )}
                  title={viewMode === "wheel" ? "Switch to 44 Grid" : "Switch to Cosmic Dial"}
                >
                  {viewMode === "wheel" ? (
                    <>
                      <Grid3X3 className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span className="hidden xs:inline">Grid</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span className="hidden xs:inline">Dial</span>
                    </>
                  )}
                </button>

                {/* Quick Search Toggle */}
                <button
                  onClick={() => {
                    cosmicAudio.triggerHaptic();
                    setIsSearching((prev) => !prev);
                    if (!isSearching) setViewMode("grid");
                  }}
                  className={cn(
                    "w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-xs",
                    isSearching
                      ? "bg-[#E8791E] border-[#FFEAA7] text-white"
                      : "bg-white/5 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20"
                  )}
                  aria-label="Search"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>

                {/* Frosted Close Button */}
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/5 border border-[#D4AF37]/35 shadow-sm text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/25 hover:border-[#FFEAA7] active:scale-95 transition-all flex items-center justify-center cursor-pointer ml-0.5"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expandable Search Input */}
            {(isSearching || viewMode === "grid") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-2.5"
              >
                <div className="relative flex items-center rounded-full bg-[#10121D]/95 backdrop-blur-xl border border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.08)] p-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#241C14] to-[#120D08] border border-[#D4AF37]/50 flex items-center justify-center text-[#F59E0B] shrink-0 shadow-xs ml-0.5">
                    <Search className="w-3 h-3" />
                  </div>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 44 Vedic tools, doshas, remedies..."
                    autoFocus={isSearching}
                    className="w-full px-2.5 py-1 bg-transparent text-xs text-[#FFFDF8] placeholder-[#8E877D]/80 font-medium focus:outline-none"
                  />

                  {searchQuery && (
                    <div className="flex items-center gap-1.5 pr-2 shrink-0">
                      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#FFEAA7] border border-[#F59E0B]/40">
                        {filteredItems.length}
                      </span>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="w-4 h-4 rounded-full bg-white/10 hover:bg-[#E8791E] text-[#A89B8C] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Grid Category Filter Bar (Visible in Grid View) */}
            {viewMode === "grid" && (
              <div className="px-4 pb-2.5">
                <div className="p-0.5 rounded-full bg-[#0C0D16]/90 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex items-center gap-1 overflow-x-auto hide-scrollbar">
                  {CATEGORY_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const count = tabCounts[tab.id];

                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          cosmicAudio.triggerHaptic();
                          setActiveTab(tab.id);
                        }}
                        className={cn(
                          "relative px-3 py-1.5 rounded-full text-[10.5px] font-bold tracking-wider uppercase whitespace-nowrap flex items-center gap-1 shrink-0 cursor-pointer select-none transition-colors duration-200",
                          isActive ? "text-white" : "text-[#9E9589] hover:text-[#FFFDF8]"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="cosmicGridFilterActive"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] shadow-[0_0_16px_rgba(245,158,11,0.55),inset_0_1px_1.5px_rgba(255,255,255,0.6)]"
                            transition={{
                              type: "spring",
                              stiffness: 480,
                              damping: 28,
                            }}
                          />
                        )}
                        <span className="relative z-10 text-[10px]">{tab.icon}</span>
                        <span className="relative z-10">{tab.label}</span>
                        <span
                          className={cn(
                            "relative z-10 text-[9px] px-1 py-0.2 rounded-full font-black leading-none transition-all",
                            isActive ? "bg-black/30 text-[#FFEAA7]" : "bg-white/5 text-[#7E776E]"
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              2. VIEWPORT CONTENT (WHEEL MODE vs GRID MODE)
             ───────────────────────────────────────────────────────────── */}
          {viewMode === "wheel" ? (
            /* ═══════════════════════════════════════════════════════════
               🌟 CONCEPT A: THE NEXT-LEVEL HAPTIC COSMIC ARC WHEEL 🌟
               ═══════════════════════════════════════════════════════════ */
            <div className="flex-1 flex flex-col justify-between overflow-hidden relative select-none">
              {/* ── STAGE TOP: FLOATING VISION-OS TELEMETRY CAPSULES ── */}
              <div className="relative z-20 px-3.5 pt-2.5 flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar">
                {/* Capsule 1: Live Muhurat Clock & Ephemeris */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121424]/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,234,167,0.25)] shrink-0">
                  <Clock className="w-3 h-3 text-[#F59E0B] shrink-0" />
                  <span className="text-[10px] font-mono text-[#FFEAA7] font-semibold">
                    {currentTimeStr}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse shrink-0",
                      currentRealm.statusColor === "emerald"
                        ? "bg-emerald-400 shadow-[0_0_8px_#34D399]"
                        : currentRealm.statusColor === "rose"
                        ? "bg-rose-400 shadow-[0_0_8px_#FB7185]"
                        : "bg-amber-400 shadow-[0_0_8px_#FBBF24]"
                    )}
                  />
                  <span className="text-[9.5px] font-mono font-bold tracking-wider text-[#FFEAA7] uppercase truncate max-w-[110px]">
                    {currentRealm.statusBadge}
                  </span>
                </div>

                {/* Capsule 2: Interactive Sacred Solfeggio Resonance Generator */}
                <button
                  onClick={handleToggleAudio}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all shrink-0 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,234,167,0.25)]",
                    isAudioResonating
                      ? "bg-[#D97706]/35 border-[#FFEAA7] text-[#FFFDF8] shadow-[0_0_16px_rgba(245,158,11,0.6)]"
                      : "bg-[#121424]/90 border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37]/15"
                  )}
                  title="Tap to listen to sacred harmonic frequency"
                >
                  {isAudioResonating ? (
                    <Volume2 className="w-3 h-3 text-[#F59E0B] animate-pulse" />
                  ) : (
                    <VolumeX className="w-3 h-3 text-[#A89B8C]" />
                  )}

                  <span className="text-[9.5px] font-mono font-bold tracking-tight">
                    {currentRealm.frequencyHz} Hz
                  </span>

                  {/* Animated soundwave mini EQ bars */}
                  <div className="flex items-center gap-0.5 h-2.5 ml-0.5">
                    <span
                      className={cn(
                        "w-0.5 bg-[#F59E0B] rounded-full transition-all duration-200",
                        isAudioResonating ? "h-2.5 animate-bounce" : "h-1"
                      )}
                    />
                    <span
                      className={cn(
                        "w-0.5 bg-[#FFEAA7] rounded-full transition-all duration-300",
                        isAudioResonating ? "h-3 animate-pulse" : "h-1.5"
                      )}
                    />
                    <span
                      className={cn(
                        "w-0.5 bg-[#F59E0B] rounded-full transition-all duration-150",
                        isAudioResonating ? "h-2 animate-bounce" : "h-1"
                      )}
                    />
                  </div>
                </button>

                {/* Capsule 3: Instant Consultation Link */}
                <Link
                  href="/support"
                  onClick={() => {
                    cosmicAudio.triggerHaptic();
                    handleClose();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8791E]/20 border border-[#E8791E]/60 text-[#FFEAA7] hover:bg-[#E8791E]/30 shrink-0 text-[10px] font-mono font-bold transition-all shadow-xs"
                >
                  {/* Miniature Acharya Avatar */}
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#B45309] border border-[#FFEAA7] flex items-center justify-center text-[7px] text-white font-serif">
                    ॐ
                  </div>
                  <span>Acharya Desk</span>
                  <ChevronRight className="w-3 h-3 text-[#F59E0B]" />
                </Link>
              </div>

              {/* ── STAGE CENTER: ZERO-GRAVITY 3D SPATIAL RELIQUARY ── */}
              <div
                onTouchStart={handleStageTouchStart}
                onTouchEnd={handleStageTouchEnd}
                className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-1 min-h-0"
              >
                {/* Volumetric Radial Sunburst Aura Behind Relic */}
                <div className="absolute w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.22)_0%,rgba(212,175,55,0.08)_42%,transparent_70%)] blur-2xl pointer-events-none" />

                {/* Astrolabe Celestial Degree Rings (Dual Counter-Rotating Astrolabe) */}
                <div className="absolute w-64 h-64 rounded-full border border-[#D4AF37]/25 pointer-events-none flex items-center justify-center opacity-70">
                  {/* Outer Ring: Rotating Clockwise with 12 Zodiac Notches */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#FFEAA7]/20 animate-[spin_100s_linear_infinite]" />
                  {/* Inner Ring: Counter-Rotating with 27 Nakshatra Ticks */}
                  <div className="w-52 h-52 rounded-full border border-dotted border-[#D4AF37]/35 animate-[spin_70s_linear_infinite_reverse]" />
                  {/* Innermost Horizon Circle */}
                  <div className="w-40 h-40 rounded-full border border-[#D4AF37]/15" />
                </div>

                {/* 3D Sacred Floating Relic with Breathing Levitation */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={currentRealm.id}
                    initial={{ opacity: 0, scale: 0.88, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -12 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    className="relative flex flex-col items-center select-none"
                  >
                    {/* Floating 3D Icon on Elevated Astral Plinth with Diya Flame */}
                    <div className="relative mb-2.5 flex flex-col items-center">
                      <motion.div
                        animate={{
                          y: [0, -7, 0],
                          rotate: [0, 1, -1, 0],
                        }}
                        transition={{
                          duration: 4.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative group cursor-pointer"
                        onClick={() => {
                          cosmicAudio.triggerHaptic(ImpactStyle.Light);
                          cosmicAudio.playSacredChime(currentRealm.frequencyHz, 2.5);
                        }}
                      >
                        {/* Outer 24K Gold Glowing Halo */}
                        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-b from-[#F59E0B]/35 via-[#D4AF37]/20 to-transparent blur-md" />

                        {/* Illuminated Glass & Obsidian Pedestal */}
                        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-b from-[#262B44] via-[#141628] to-[#0A0B14] border-2 border-[#FFEAA7]/70 shadow-[0_14px_40px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.45),0_0_28px_rgba(212,175,55,0.4)] p-2 flex items-center justify-center overflow-hidden">
                          <ServiceIcon
                            iconKey={currentRealm.heroIcon}
                            size={80}
                            priority={true}
                            className="w-full h-full rounded-2xl object-cover drop-shadow-[0_6px_18px_rgba(0,0,0,0.85)]"
                          />
                        </div>
                      </motion.div>

                      {/* Sacred Ghee Diya Flame at Plinth Base (Echoing Benchmark Astrolabe & Lamp) */}
                      <div className="relative -mt-2 flex flex-col items-center z-20 pointer-events-none">
                        {/* Flame flickering aura */}
                        <motion.div
                          animate={{
                            scale: [1, 1.15, 0.95, 1],
                            opacity: [0.85, 1, 0.8, 0.85],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-4 h-6 rounded-full bg-gradient-to-t from-[#FF4500] via-[#F59E0B] to-[#FFFDF8] blur-xs shadow-[0_0_14px_#F59E0B]"
                        />
                        {/* Brass Diya Base */}
                        <div className="w-7 h-2 rounded-full bg-gradient-to-r from-[#8C5D19] via-[#D4AF37] to-[#8C5D19] border border-[#FFEAA7]/60 shadow-[0_2px_8px_rgba(0,0,0,0.8)] -mt-1" />
                      </div>
                    </div>

                    {/* Bilingual Sacred Realm Typography */}
                    <div className="text-center max-w-[320px] px-2">
                      {/* Sanskrit Devanagari Shimmer Title */}
                      <h2 className="font-devanagari text-[21px] sm:text-[23px] font-black leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF8] via-[#FFEAA7] to-[#F59E0B] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {currentRealm.sanskrit}
                      </h2>

                      {/* English Sovereign Title */}
                      <p className="text-[12.5px] font-serif font-bold text-[#FFFDF8] mt-0.5 tracking-wider uppercase">
                        {currentRealm.englishTitle}
                      </p>

                      {/* 1-Line Vedic Ephemeris Subtitle */}
                      <p className="text-[10.5px] text-[#A89B8C] font-medium leading-snug mt-1 line-clamp-1">
                        {currentRealm.description}
                      </p>
                    </div>

                    {/* Pagination Indicators (7 Realm Beads) */}
                    <div className="flex items-center gap-1.5 mt-2 mb-1">
                      {COSMIC_REALMS.map((r, i) => (
                        <button
                          key={r.id}
                          onClick={() => handleSelectRealm(i)}
                          className={cn(
                            "rounded-full transition-all duration-300 cursor-pointer",
                            i === activeRealmIndex
                              ? "w-5 h-1.5 bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]"
                              : "w-1.5 h-1.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60"
                          )}
                          aria-label={`Go to ${r.arcLabel}`}
                        />
                      ))}
                    </div>

                    {/* Sovereign Primary Golden CTA Pill */}
                    <div className="mt-1.5">
                      <Link
                        href={currentRealm.primaryHref}
                        onClick={() => {
                          cosmicAudio.triggerHaptic(ImpactStyle.Heavy);
                          handleClose();
                        }}
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] text-white font-serif font-extrabold text-[11.5px] uppercase tracking-widest shadow-[0_6px_24px_rgba(245,158,11,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.6)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.7)] active:scale-95 transition-all"
                      >
                        <Sparkles
                          className="w-3.5 h-3.5 text-amber-100 animate-spin"
                          style={{ animationDuration: "8s" }}
                        />
                        <span>{currentRealm.primaryAction}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-100 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── STAGE BOTTOM-MID: GLANCEABLE SUB-TOOL FLOATING DECK ── */}
              <div className="relative z-10 px-4 pb-1.5 shrink-0">
                <div className="flex items-center justify-between mb-1 px-1">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#A89B8C]">
                    Tools in this Realm ({realmTools.length})
                  </span>
                  <span className="text-[8px] font-mono text-[#FFEAA7] bg-[#D4AF37]/15 px-2 py-0.2 rounded-full border border-[#D4AF37]/35">
                    Instant Launch
                  </span>
                </div>

                {/* Horizontal Floating Sub-Tool Pill Strip */}
                <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-0.5">
                  {realmTools.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => {
                        cosmicAudio.triggerHaptic();
                        handleClose();
                      }}
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-b from-[#191B2C]/90 to-[#0D0E19]/95 border border-[#D4AF37]/30 hover:border-[#FFEAA7] shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,234,167,0.2)] active:scale-95 transition-all shrink-0 min-w-[130px] max-w-[165px]"
                    >
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-b from-[#252840] to-[#121320] border border-[#D4AF37]/40 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <ServiceIcon
                          iconKey={tool.iconKey}
                          size={24}
                          className="w-full h-full rounded-lg object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10.5px] font-serif font-bold text-[#FFFDF8] group-hover:text-[#FFEAA7] transition-colors truncate">
                          {tool.name}
                        </span>
                        <span className="text-[8px] font-sans text-[#A89B8C] block truncate">
                          {tool.badge || "Vedic Tool"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── STAGE BOTTOM: THE ERGONOMIC HOROLOGICAL RADIAL ASTROLABE WHEEL ── */}
              <div
                ref={wheelContainerRef}
                onPointerDown={handleWheelPointerDown}
                onPointerMove={handleWheelPointerMove}
                onPointerUp={handleWheelPointerUp}
                onPointerCancel={handleWheelPointerUp}
                className="relative z-30 shrink-0 bg-gradient-to-t from-[#05060A] via-[#090A14] to-[#0A0B16]/98 border-t border-[#D4AF37]/40 shadow-[0_-10px_36px_rgba(0,0,0,0.95)] pt-1 pb-[calc(1.2rem+env(safe-area-inset-bottom,12px))] overflow-hidden touch-none"
                style={{ height: "165px" }}
              >
                {/* 24K Molten Gold Apex Laser Beam Projecting Upwards from Active Sector */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-8 bg-[radial-gradient(ellipse,rgba(245,158,11,0.75)_0%,transparent_75%)] blur-xs pointer-events-none" />

                {/* Astrolabe Graduation Arc SVG Background (Ticks & Concentric Orbit Rings) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none select-none"
                  viewBox="0 0 390 165"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <radialGradient id="arcGlow" cx="50%" cy="170%" r="90%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                      <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="goldBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Concentric Horological Astrolabe Tracks */}
                  <path
                    d="M 25 160 A 185 185 0 0 1 365 160"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    strokeOpacity="0.3"
                  />
                  <path
                    d="M 45 160 A 160 160 0 0 1 345 160"
                    fill="none"
                    stroke="#FFEAA7"
                    strokeWidth="0.8"
                    strokeDasharray="2 4"
                    strokeOpacity="0.2"
                  />
                  <path
                    d="M 65 160 A 135 135 0 0 1 325 160"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                  />

                  {/* Radiating Astrolabe Graduation Ticks (55 ticks from -68° to +68°) */}
                  {Array.from({ length: 55 }).map((_, i) => {
                    const angleDeg = -68 + i * 2.5;
                    const isMajor = i % 5 === 0;
                    const rad = (angleDeg * Math.PI) / 180;
                    const cx = 195;
                    const cy = CY_CENTER;
                    const rOuter = ARC_RADIUS + 18;
                    const rInner = isMajor ? ARC_RADIUS + 7 : ARC_RADIUS + 12;

                    const x1 = cx + rOuter * Math.sin(rad);
                    const y1 = cy - rOuter * Math.cos(rad);
                    const x2 = cx + rInner * Math.sin(rad);
                    const y2 = cy - rInner * Math.cos(rad);

                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isMajor ? "#FFEAA7" : "#D4AF37"}
                        strokeWidth={isMajor ? 1.2 : 0.7}
                        strokeOpacity={isMajor ? 0.6 : 0.25}
                      />
                    );
                  })}

                  {/* Apex Indicator Triangle Needle */}
                  <polygon
                    points="195,14 191,7 199,7"
                    fill="#FFEAA7"
                    stroke="#F59E0B"
                    strokeWidth="0.5"
                    filter="drop-shadow(0 0 4px #F59E0B)"
                  />
                </svg>

                {/* Curved Radial Realm Sector Wedges */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {COSMIC_REALMS.map((realm, idx) => {
                    // Angular position along arc track
                    const baseAngle = (idx - activeRealmIndex) * STEP_DEG;
                    const currentAngle = baseAngle + dragOffsetDeg;
                    const isSelected = Math.abs(currentAngle) < STEP_DEG / 2;

                    // Visibility culling: hide sectors beyond arc edges
                    if (Math.abs(currentAngle) > 74) return null;

                    const rad = (currentAngle * Math.PI) / 180;
                    // Circle center relative to container
                    const cx = 0; // centered via flex
                    const cy = CY_CENTER - 42; // offset so card sits comfortably inside
                    const x = cx + ARC_RADIUS * Math.sin(rad);
                    const y = cy - ARC_RADIUS * Math.cos(rad);

                    // Dynamic scale and opacity based on radial distance from apex
                    const distanceFactor = Math.abs(currentAngle) / 74;
                    const scale = isSelected ? 1.12 : Math.max(0.72, 1 - distanceFactor * 0.4);
                    const opacity = isSelected ? 1 : Math.max(0.4, 1 - distanceFactor * 0.7);

                    return (
                      <motion.button
                        key={realm.id}
                        onClick={() => handleSelectRealm(idx, true)}
                        style={{
                          transform: `translate(${x}px, ${y}px) rotate(${currentAngle}deg) scale(${scale})`,
                          opacity,
                        }}
                        className={cn(
                          "absolute flex flex-col items-center justify-center cursor-pointer transition-opacity duration-150 select-none",
                          isSelected ? "z-30" : "z-10 hover:opacity-100"
                        )}
                      >
                        {/* Sector Card Body Curved Wedge */}
                        <div
                          className={cn(
                            "relative flex flex-col items-center justify-center px-2.5 py-1 rounded-2xl transition-all duration-300 min-w-[56px]",
                            isSelected
                              ? "bg-gradient-to-b from-[#2A2417] via-[#1A160F] to-[#0D0B07] border-2 border-[#FFEAA7] shadow-[0_0_24px_rgba(245,158,11,0.7),inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
                              : "bg-[#111322]/85 border border-[#D4AF37]/30 hover:border-[#FFEAA7]/60 shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                          )}
                        >
                          {/* Selected Molten Bevel Highlight */}
                          {isSelected && (
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-[#F59E0B]/50 to-transparent blur-xs pointer-events-none" />
                          )}

                          {/* Realm Icon Badge */}
                          <div
                            className={cn(
                              "relative z-10 w-7 h-7 rounded-xl flex items-center justify-center text-[14px] transition-all",
                              isSelected
                                ? "bg-gradient-to-b from-[#F59E0B] to-[#D97706] text-white shadow-[0_2px_12px_rgba(245,158,11,0.7)]"
                                : "bg-[#16182B] text-[#FFEAA7]"
                            )}
                          >
                            <span>{realm.arcIcon}</span>
                          </div>

                          {/* Realm Label */}
                          <span
                            className={cn(
                              "relative z-10 text-[9px] font-serif font-extrabold mt-0.5 tracking-tight leading-none transition-colors whitespace-nowrap",
                              isSelected
                                ? "text-[#FFEAA7] font-black drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                                : "text-[#9E9589]"
                            )}
                          >
                            {realm.arcLabel}
                          </span>

                          {/* Active Jewel Dot Indicator */}
                          {isSelected && (
                            <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-0.5 shadow-[0_0_8px_#F59E0B] animate-pulse" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Inner Bezel Bottom Medallion Hub */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]/60" />
                    <span className="text-[8.5px] font-mono font-bold tracking-[0.24em] text-[#D4AF37] uppercase">
                      Haptic Cosmic Arc Wheel • 7 Realms
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]/60" />
                  </div>

                  {/* Sacred Golden Surya Crest at Base Hub */}
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#2D2110] to-[#120D06] border border-[#D4AF37]/60 flex items-center justify-center text-[10px] text-[#F59E0B] shadow-[0_0_10px_rgba(212,175,55,0.4)] mt-0.5">
                    ☀️
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ═══════════════════════════════════════════════════════════
               ⊞ 44 BENTO JEWEL GRID MODE (FROM BACKUP GOD MODE) ⊞
               ═══════════════════════════════════════════════════════════ */
            <div className="flex-1 overflow-y-auto px-4 pt-3.5 space-y-2.5 hide-scrollbar pb-[calc(6.5rem+env(safe-area-inset-bottom,16px))]">
              {/* Quick Calendar & Acharya Quick-Banners */}
              {!searchQuery && activeTab === "all" && (
                <div className="grid grid-cols-2 gap-2.5 mb-2">
                  <Link
                    href="/shubh-calendar"
                    onClick={() => {
                      cosmicAudio.triggerHaptic();
                      handleClose();
                    }}
                    className="group flex items-center gap-2.5 bg-gradient-to-br from-[#1E2034]/90 via-[#121322]/95 to-[#080911] border border-[#D4AF37]/35 rounded-2xl p-2.5 text-xs font-bold text-[#FFFDF8] hover:border-[#FFEAA7]/80 shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,234,167,0.25)] active:scale-[0.98] transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2E2416] to-[#140E06] border border-[#D4AF37]/60 flex items-center justify-center text-[#F59E0B] group-hover:scale-108 transition-transform shadow-sm">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[12px] font-serif font-bold leading-tight">
                        Shubh Calendar
                      </span>
                      <span className="text-[9.5px] text-[#A89B8C] font-normal">
                        Panchang &amp; Tithis
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/support"
                    onClick={() => {
                      cosmicAudio.triggerHaptic();
                      handleClose();
                    }}
                    className="group flex items-center gap-2.5 bg-gradient-to-br from-[#1E2034]/90 via-[#121322]/95 to-[#080911] border border-[#D4AF37]/35 rounded-2xl p-2.5 text-xs font-bold text-[#FFFDF8] hover:border-[#FFEAA7]/80 shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,234,167,0.25)] active:scale-[0.98] transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2E2416] to-[#140E06] border border-[#D4AF37]/60 flex items-center justify-center text-[#F59E0B] group-hover:scale-108 transition-transform shadow-sm">
                      <LifeBuoy className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[12px] font-serif font-bold leading-tight">
                        Acharya Desk
                      </span>
                      <span className="text-[9.5px] text-[#A89B8C] font-normal">
                        Direct Consultation
                      </span>
                    </div>
                  </Link>
                </div>
              )}

              {/* Zero Results State */}
              {filteredItems.length === 0 && (
                <div className="py-12 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#161828] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mx-auto shadow-inner">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-serif font-bold text-[#FFFDF8]">
                    No Vedic services found
                  </p>
                  <p className="text-xs text-[#A89B8C]">
                    Try clearing the search or picking another category tab.
                  </p>
                </div>
              )}

              {/* 2-Column High-Density Bento Jewel Grid */}
              {filteredItems.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_10px_#F59E0B] animate-pulse" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A89B8C]">
                        Bento Sanctum • {filteredItems.length} Sacred Artifacts
                      </span>
                    </div>
                    <span className="text-[8.5px] font-mono font-bold text-[#FFEAA7] bg-[#D4AF37]/15 px-2 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-2xs">
                      Tap to Enter
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                    {filteredItems.map((item, index) => {
                      const isUrgent = item.badge === "URGENT";
                      const isFeatured =
                        item.highlight || item.badge === "FEATURED" || item.badge === "POPULAR";

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.2,
                            delay: Math.min(index * 0.015, 0.2),
                            ease: "easeOut",
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => {
                              cosmicAudio.triggerHaptic();
                              handleClose();
                            }}
                            className={cn(
                              "group relative flex flex-col justify-between p-3 rounded-2xl transition-all duration-300 overflow-hidden select-none cursor-pointer h-full min-h-[150px]",
                              "bg-gradient-to-b from-[#191B2C]/95 via-[#10111E]/98 to-[#070810]",
                              "border border-[#D4AF37]/35 hover:border-[#FFEAA7]/90 shadow-[0_8px_28px_rgba(0,0,0,0.65),inset_0_1px_1.5px_rgba(255,234,167,0.35),0_0_15px_rgba(212,175,55,0.12)] active:scale-[0.97]",
                              isUrgent
                                ? "border-[#C0392B]/55 hover:border-[#E74C3C]"
                                : isFeatured
                                ? "border-[#F59E0B]/55 hover:border-[#FFEAA7]"
                                : "border-[#D4AF37]/35 hover:border-[#FFEAA7]/80"
                            )}
                          >
                            {/* Ambient Volumetric Back-glow */}
                            <div
                              className={cn(
                                "absolute -top-6 -left-6 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 opacity-25 group-hover:opacity-60",
                                isUrgent ? "bg-red-500" : isFeatured ? "bg-amber-400" : "bg-[#D4AF37]"
                              )}
                            />

                            {/* Top Bar: Icon + Badge */}
                            <div className="relative z-10 flex items-start justify-between gap-1.5 w-full">
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden transition-all duration-300 group-hover:scale-108 shadow-[0_6px_16px_rgba(0,0,0,0.7)]",
                                  "bg-gradient-to-b from-[#2A2E48] via-[#161828] to-[#0A0B14] border p-1",
                                  isUrgent
                                    ? "border-[#C0392B]/70"
                                    : isFeatured
                                    ? "border-[#F59E0B]/70"
                                    : "border-[#D4AF37]/50"
                                )}
                              >
                                <ServiceIcon
                                  iconKey={item.iconKey}
                                  size={48}
                                  className="w-full h-full rounded-xl object-cover"
                                />
                              </div>

                              <div className="flex items-center justify-end">
                                {item.badge ? (
                                  <span
                                    className={cn(
                                      "text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border leading-none shadow-sm text-right whitespace-nowrap backdrop-blur-md",
                                      isUrgent
                                        ? "bg-rose-950/85 text-rose-200 border-rose-500/60"
                                        : isFeatured
                                        ? "bg-emerald-950/85 text-emerald-200 border-emerald-500/60"
                                        : "bg-amber-950/85 text-amber-200 border-amber-500/60"
                                    )}
                                  >
                                    • {item.badge}
                                  </span>
                                ) : (
                                  <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:text-white group-hover:bg-[#D4AF37]/30 transition-all shrink-0">
                                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Typography */}
                            <div className="relative z-10 mt-3 flex-1 flex flex-col justify-end">
                              <span className="font-serif font-extrabold text-[12.5px] leading-snug text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF8] via-[#FFEAA7] to-[#F59E0B] group-hover:from-white group-hover:to-[#FFEAA7] transition-all line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                                {item.name}
                              </span>
                              {item.subtitle && (
                                <p className="text-[9.5px] text-[#A89B8C] line-clamp-1 mt-0.5 font-sans leading-tight">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      {/* Menu Trigger Button */}
      <button
        onClick={() => {
          cosmicAudio.triggerHaptic(ImpactStyle.Light);
          cosmicAudio.playDialTick();
          setIsOpen(true);
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E8791E]/40 bg-[#FFFDF8] text-[#C25E10] hover:border-[#E8791E] hover:bg-[#FDF3E2] active:scale-95 transition-all focus:outline-none shadow-[0_2px_10px_rgba(107,42,20,0.12)] cursor-pointer"
        aria-label="Open cosmic menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Render via Portal to avoid stacking context issues */}
      {mounted && createPortal(drawerContent, document.body)}
    </div>
  );
}
