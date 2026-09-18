"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { playPanchangChime } from "@/lib/celestialAudio";

interface PremiumPanchangMasterpieceProps {
  tithi?: string;
  nakshatra?: string;
  sunrise?: string;
  sunset?: string;
  paksha?: string;
  month?: string;
}

export function PremiumPanchangMasterpiece({
  tithi = "Krishna Panchami",
  nakshatra = "Bharani",
  sunrise = "05:59",
  sunset = "18:41",
  paksha = "Krishna",
  month = "Bhadrapada",
}: PremiumPanchangMasterpieceProps) {
  // Live IST Solar Calculation
  const getLiveISTMinutes = () => {
    const now = new Date();
    const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    return ist.getHours() * 60 + ist.getMinutes();
  };

  const [currentMinutes, setCurrentMinutes] = useState<number>(getLiveISTMinutes);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMinutes(getLiveISTMinutes());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Robust 12-hour time formatter (handles "5:59", "05:59:00", etc.)
  const formatTime12h = (timeStr?: string, defaultHour = 5, defaultMin = 59) => {
    if (!timeStr) {
      return `${defaultHour.toString().padStart(2, "0")}:${defaultMin.toString().padStart(2, "0")}`;
    }
    const match = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (!match) {
      return `${defaultHour.toString().padStart(2, "0")}:${defaultMin.toString().padStart(2, "0")}`;
    }
    const h = parseInt(match[1], 10);
    const m = match[2];
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${h12.toString().padStart(2, "0")}:${m}`;
  };

  const cleanSunrise = formatTime12h(sunrise, 5, 59);
  const cleanSunset = formatTime12h(sunset, 6, 41);

  // Sunrise = 05:59 (359 mins), Sunset = 18:41 (1121 mins)
  const sunriseMins = 359;
  const sunsetMins = 1121;
  const daylightDuration = sunsetMins - sunriseMins;

  const isDay = currentMinutes >= sunriseMins && currentMinutes <= sunsetMins;
  const dayProgress = isDay
    ? Math.max(0, Math.min(1, (currentMinutes - sunriseMins) / daylightDuration))
    : 0.5;

  const solarAltitudeDeg = Math.round(Math.sin(dayProgress * Math.PI) * 90);

  // Formatted Tithi lines to prevent any truncation
  const tithiWords = tithi.split(" ");
  const tithiLine1 = tithiWords[0] || "Krishna";
  const tithiLine2 = tithiWords.slice(1).join(" ") || "Panchami";

  const handleComplicationClick = (freq: number) => {
    playPanchangChime(freq, 2.2);
  };

  return (
    <div className="w-full select-none text-left">
      {/* ── 4 Haute-Horology Micro-Sculpted Complication Pods ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-5">
        
        {/* ════════════ 1. TITHI COMPLICATION (3D PHOTOREALISTIC MOON) ════════════ */}
        <motion.div
          whileHover={{ scale: 1.025, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleComplicationClick(486)}
          className="relative p-4 rounded-3xl bg-gradient-to-b from-[#180f0a] via-[#0d0704] to-[#040201] border-2 border-[#d4af37]/50 hover:border-[#fde68a] shadow-[0_15px_35px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.25)] flex flex-col items-center justify-between min-h-[225px] sm:min-h-[240px] cursor-pointer group transition-all duration-300 overflow-hidden"
        >
          {/* Beveled Sapphire Glass Glare */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent pointer-events-none rounded-3xl" />
          <div className="absolute inset-1 rounded-[1.35rem] border border-[#d4af37]/20 pointer-events-none" />

          {/* Pod Header: Centered Vertical Stack */}
          <div className="w-full flex flex-col items-center justify-center text-center z-10">
            <span
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#d4af37] group-hover:text-[#fde68a] transition-colors"
            >
              Tithi
            </span>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[11px] italic text-[#fde68a]/80"
            >
              सोम धारा
            </span>
          </div>

          {/* 🌑 3D Photorealistic Dimensional Moon Sphere with Crater Relief */}
          <div className="relative my-2 flex items-center justify-center">
            {/* Soft Ambient Lunar Halo */}
            <div className="absolute w-24 h-24 rounded-full bg-amber-100/10 blur-xl pointer-events-none" />

            {/* Milled 24K Gold Coin-Edge Housing Ring */}
            <div className="relative w-19 h-19 sm:w-21 sm:h-21 rounded-full p-1 bg-gradient-to-br from-[#ffd700] via-[#99701a] to-[#2a1708] shadow-[0_6px_20px_rgba(0,0,0,0.95),inset_0_1px_3px_#ffffff] flex items-center justify-center">
              {/* Deep Smoked Obsidian Bed */}
              <div className="w-full h-full rounded-full bg-[#070402] border border-[#d4af37]/50 relative overflow-hidden flex items-center justify-center shadow-inner">
                {/* 30-Tithi Calibration Chapter Ring */}
                <div className="absolute inset-0.5 rounded-full border border-dashed border-[#d4af37]/25 pointer-events-none" />

                {/* SVG 3D Textured Moon Sphere with Accurate Lunar Maria & Relief */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]">
                  <defs>
                    {/* Spherical 3D Lighting Gradient */}
                    <radialGradient id="lunarSphere" cx="72%" cy="28%" r="75%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#e2e8f0" />
                      <stop offset="65%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </radialGradient>

                    {/* Basaltic Lunar Maria (Dark Plains) */}
                    <radialGradient id="mareTexture" cx="60%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#0f172a" stopOpacity="0.75" />
                      <stop offset="50%" stopColor="#1e293b" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#334155" stopOpacity="0" />
                    </radialGradient>

                    {/* Terminator Twilight Shadow (Krishna Panchami Waning) */}
                    <linearGradient id="terminatorShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#020101" stopOpacity="0.98" />
                      <stop offset="42%" stopColor="#050302" stopOpacity="0.88" />
                      <stop offset="55%" stopColor="#0a0604" stopOpacity="0.45" />
                      <stop offset="68%" stopColor="#0a0604" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Moon Base Sphere */}
                  <circle cx="50" cy="50" r="45" fill="url(#lunarSphere)" />

                  {/* Lunar Maria (Sea of Tranquility & Oceanus Procellarum) */}
                  <path
                    d="M36 24 Q50 18 64 26 Q76 34 70 54 Q60 64 44 58 Q30 48 36 24 Z"
                    fill="url(#mareTexture)"
                  />
                  <path
                    d="M46 62 Q58 56 68 68 Q62 82 44 80 Q32 74 46 62 Z"
                    fill="url(#mareTexture)"
                  />

                  {/* Micro-Craters with Realistic Illuminated Rims */}
                  <circle cx="68" cy="36" r="3.2" fill="#cbd5e1" stroke="#334155" strokeWidth="0.8" />
                  <circle cx="72" cy="56" r="4.8" fill="#94a3b8" stroke="#1e293b" strokeWidth="1" />
                  <circle cx="56" cy="74" r="3.5" fill="#64748b" stroke="#0f172a" strokeWidth="0.8" />
                  <circle cx="52" cy="30" r="2.2" fill="#e2e8f0" stroke="#475569" strokeWidth="0.6" />

                  {/* Tycho Crater Ejecta Ray Filaments */}
                  <line x1="72" y1="56" x2="90" y2="42" stroke="#ffffff" strokeWidth="0.8" opacity="0.65" />
                  <line x1="72" y1="56" x2="84" y2="78" stroke="#ffffff" strokeWidth="0.8" opacity="0.55" />
                  <line x1="72" y1="56" x2="52" y2="68" stroke="#ffffff" strokeWidth="0.7" opacity="0.45" />

                  {/* Krishna Panchami Waning Terminator Shadow */}
                  <rect x="0" y="0" width="100" height="100" fill="url(#terminatorShadow)" />

                  {/* Sunlit Limb Specular Glint */}
                  <path
                    d="M50 5 A45 45 0 0 1 95 50"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.6"
                    opacity="0.85"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Clean, Non-Truncated 24K Gold Typography */}
          <div className="text-center w-full z-10">
            <p
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-xs sm:text-sm font-bold bg-gradient-to-b from-[#FFFDF0] via-[#F3E5AB] via-[#D4AF37] to-[#99701A] bg-clip-text text-transparent leading-tight"
            >
              {tithiLine1}<br />{tithiLine2}
            </p>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[10px] italic text-[#fde68a]/75 block mt-1"
            >
              Lunar Day • 486Hz
            </span>
          </div>
        </motion.div>


        {/* ════════════ 2. NAKSHATRA COMPLICATION (HAUTE-JEWELRY GOLD STAR & RUBY) ════════════ */}
        <motion.div
          whileHover={{ scale: 1.025, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleComplicationClick(432)}
          className="relative p-4 rounded-3xl bg-gradient-to-b from-[#180f0a] via-[#0d0704] to-[#040201] border-2 border-[#d4af37]/50 hover:border-[#fde68a] shadow-[0_15px_35px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.25)] flex flex-col items-center justify-between min-h-[225px] sm:min-h-[240px] cursor-pointer group transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent pointer-events-none rounded-3xl" />
          <div className="absolute inset-1 rounded-[1.35rem] border border-[#d4af37]/20 pointer-events-none" />

          {/* Pod Header: Centered Vertical Stack */}
          <div className="w-full flex flex-col items-center justify-center text-center z-10">
            <span
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#d4af37] group-hover:text-[#fde68a] transition-colors"
            >
              Nakshatra
            </span>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[11px] italic text-[#fde68a]/80"
            >
              यम देव
            </span>
          </div>

          {/* 🌟 3D Chiseled 8-Point Gold Star with Synthetic Pigeon-Blood Ruby */}
          <div className="relative my-2 flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full bg-amber-300/15 blur-xl pointer-events-none" />

            <div className="relative w-19 h-19 sm:w-21 sm:h-21 rounded-full p-1 bg-gradient-to-br from-[#ffd700] via-[#99701a] to-[#2a1708] shadow-[0_6px_20px_rgba(0,0,0,0.95),inset_0_1px_3px_#ffffff] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#070402] border border-[#d4af37]/50 relative overflow-hidden flex items-center justify-center shadow-inner">
                {/* Guilloché Sunburst Engraved Lines */}
                <div className="absolute inset-1 rounded-full border border-dashed border-[#d4af37]/25 pointer-events-none" />
                <div className="absolute inset-2.5 rounded-full border border-[#d4af37]/15 pointer-events-none" />

                {/* 3D Chiseled Faceted Star SVG */}
                <div className="relative w-14 h-14 sm:w-15 sm:h-15 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_14px_rgba(255,215,0,0.85)]">
                      <defs>
                        {/* Light Facet: 24K Mirror Bullion */}
                        <linearGradient id="facetLight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="35%" stopColor="#fffdf0" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        {/* Shaded Facet: Deep Antique Bronze Gold */}
                        <linearGradient id="facetDark" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d97706" />
                          <stop offset="60%" stopColor="#92400e" />
                          <stop offset="100%" stopColor="#451a03" />
                        </linearGradient>
                      </defs>

                      {/* 8-Point Diamond Bevel Facets (Alternating Light & Dark for Real 3D Depth) */}
                      {/* North Point */}
                      <polygon points="50,4 50,50 63,37" fill="url(#facetLight)" />
                      <polygon points="50,4 37,37 50,50" fill="url(#facetDark)" />
                      {/* East Point */}
                      <polygon points="96,50 50,50 63,63" fill="url(#facetLight)" />
                      <polygon points="96,50 63,37 50,50" fill="url(#facetDark)" />
                      {/* South Point */}
                      <polygon points="50,96 50,50 37,63" fill="url(#facetLight)" />
                      <polygon points="50,96 63,63 50,50" fill="url(#facetDark)" />
                      {/* West Point */}
                      <polygon points="4,50 50,50 37,37" fill="url(#facetLight)" />
                      <polygon points="4,50 37,63 50,50" fill="url(#facetDark)" />

                      {/* Secondary Diagonal Diamond Points */}
                      <polygon points="82,18 50,50 63,37" fill="url(#facetLight)" opacity="0.9" />
                      <polygon points="82,82 50,50 63,63" fill="url(#facetDark)" opacity="0.9" />
                      <polygon points="18,82 50,50 37,63" fill="url(#facetLight)" opacity="0.9" />
                      <polygon points="18,18 50,50 37,37" fill="url(#facetDark)" opacity="0.9" />
                    </svg>
                  </motion.div>

                  {/* Central Synthetic Pigeon-Blood Ruby Jewel Bearing */}
                  <div className="absolute w-4 h-4 rounded-full p-[1.5px] bg-gradient-to-br from-[#ffd700] via-[#f43f5e] to-[#881337] shadow-[0_0_10px_#e11d48] flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ff2e63] via-[#be123c] to-[#4c0519] border border-white/80 shadow-inner flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white/95" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Typography */}
          <div className="text-center w-full z-10">
            <p
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-xs sm:text-sm font-bold bg-gradient-to-b from-[#FFFDF0] via-[#F3E5AB] via-[#D4AF37] to-[#99701A] bg-clip-text text-transparent leading-tight"
            >
              {nakshatra}<br />Mansion
            </p>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[10px] italic text-[#fde68a]/75 block mt-1"
            >
              Venus • 432Hz Sound
            </span>
          </div>
        </motion.div>


        {/* ════════════ 3. PAKSHA COMPLICATION (BREGUET RETROGRADE LUNAR REGISTER) ════════════ */}
        <motion.div
          whileHover={{ scale: 1.025, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleComplicationClick(528)}
          className="relative p-4 rounded-3xl bg-gradient-to-b from-[#180f0a] via-[#0d0704] to-[#040201] border-2 border-[#d4af37]/50 hover:border-[#fde68a] shadow-[0_15px_35px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.25)] flex flex-col items-center justify-between min-h-[225px] sm:min-h-[240px] cursor-pointer group transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent pointer-events-none rounded-3xl" />
          <div className="absolute inset-1 rounded-[1.35rem] border border-[#d4af37]/20 pointer-events-none" />

          {/* Pod Header: Centered Vertical Stack */}
          <div className="w-full flex flex-col items-center justify-center text-center z-10">
            <span
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#d4af37] group-hover:text-[#fde68a] transition-colors"
            >
              Paksha
            </span>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[11px] italic text-[#fde68a]/80"
            >
              क्षीयमाण
            </span>
          </div>

          {/* 🌗 Breguet-Style Retrograde Moon Phase Register */}
          <div className="relative my-2 flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full bg-amber-300/10 blur-xl pointer-events-none" />

            <div className="relative w-19 h-19 sm:w-21 sm:h-21 rounded-full p-1 bg-gradient-to-br from-[#ffd700] via-[#99701a] to-[#2a1708] shadow-[0_6px_20px_rgba(0,0,0,0.95),inset_0_1px_3px_#ffffff] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#060302] border border-[#d4af37]/50 relative overflow-hidden flex items-center justify-center shadow-inner">
                {/* Deep Midnight Aventurine Register Dial */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <radialGradient id="pakshaGold" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFFDF0" />
                      <stop offset="45%" stopColor="#F5D061" />
                      <stop offset="100%" stopColor="#B45309" />
                    </radialGradient>
                    <radialGradient id="pakshaDark" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0d0806" />
                      <stop offset="100%" stopColor="#020101" />
                    </radialGradient>
                  </defs>

                  {/* Chapter Ring Ticks */}
                  <circle cx="50" cy="50" r="44" stroke="#d4af37" strokeWidth="0.8" fill="none" opacity="0.4" />
                  <circle cx="50" cy="50" r="41" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="1.5,4" fill="none" opacity="0.6" />

                  {/* Graduated Retrograde Moon Disc */}
                  <path d="M50 8 A42 42 0 0 1 50 92 Z" fill="url(#pakshaGold)" />
                  <path d="M50 8 A42 42 0 0 0 50 92 Z" fill="url(#pakshaDark)" />

                  {/* 24K Gold Filigree Needle / Divider */}
                  <line x1="50" y1="8" x2="50" y2="92" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />
                  <circle cx="50" cy="50" r="4" fill="#ffd700" stroke="#ffffff" strokeWidth="0.8" />
                  <circle cx="50" cy="50" r="1.5" fill="#451a03" />

                  {/* Micro Golden Constellation Stars */}
                  <circle cx="70" cy="30" r="1" fill="#fffdf0" />
                  <circle cx="65" cy="70" r="1.2" fill="#fffdf0" />
                  <circle cx="80" cy="52" r="0.8" fill="#fffdf0" />
                </svg>
              </div>
            </div>
          </div>

          {/* Clean Typography */}
          <div className="text-center w-full z-10">
            <p
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-xs sm:text-sm font-bold bg-gradient-to-b from-[#FFFDF0] via-[#F3E5AB] via-[#D4AF37] to-[#99701A] bg-clip-text text-transparent leading-tight"
            >
              {paksha}<br />Paksha
            </p>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[10px] italic text-[#fde68a]/75 block mt-1"
            >
              Waning Fortnight • Soma
            </span>
          </div>
        </motion.div>


        {/* ════════════ 4. MONTH COMPLICATION (RENAISSANCE BRASS ARMILLARY ORRERY) ════════════ */}
        <motion.div
          whileHover={{ scale: 1.025, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleComplicationClick(648)}
          className="relative p-4 rounded-3xl bg-gradient-to-b from-[#180f0a] via-[#0d0704] to-[#040201] border-2 border-[#d4af37]/50 hover:border-[#fde68a] shadow-[0_15px_35px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(255,255,255,0.25)] flex flex-col items-center justify-between min-h-[225px] sm:min-h-[240px] cursor-pointer group transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent pointer-events-none rounded-3xl" />
          <div className="absolute inset-1 rounded-[1.35rem] border border-[#d4af37]/20 pointer-events-none" />

          {/* Pod Header: Centered Vertical Stack */}
          <div className="w-full flex flex-col items-center justify-center text-center z-10">
            <span
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#d4af37] group-hover:text-[#fde68a] transition-colors"
            >
              Month
            </span>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[11px] italic text-[#fde68a]/80"
            >
              सूर्य मण्डल
            </span>
          </div>

          {/* 🪐 Renaissance Brass Armillary Orrery Sphere */}
          <div className="relative my-2 flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full bg-amber-400/15 blur-xl pointer-events-none" />

            <div className="relative w-19 h-19 sm:w-21 sm:h-21 rounded-full p-1 bg-gradient-to-br from-[#ffd700] via-[#99701a] to-[#2a1708] shadow-[0_6px_20px_rgba(0,0,0,0.95),inset_0_1px_3px_#ffffff] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#060302] border border-[#d4af37]/50 relative overflow-hidden flex items-center justify-center shadow-inner">
                {/* Armillary Rings SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="brassRing" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fffdf0" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>
                  </defs>

                  {/* Outer Armillary Horizon Ring */}
                  <circle cx="50" cy="50" r="43" stroke="url(#brassRing)" strokeWidth="1.5" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#d4af37" strokeWidth="0.6" strokeDasharray="2,3" fill="none" opacity="0.7" />

                  {/* Inclined Ecliptic Orbit Band (23.5° obliquity) */}
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="38"
                    ry="15"
                    stroke="url(#brassRing)"
                    strokeWidth="2.2"
                    fill="none"
                    transform="rotate(-28 50 50)"
                    className="drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]"
                  />

                  {/* Central Radiant Golden Surya Medallion */}
                  <circle cx="50" cy="50" r="14" fill="url(#brassRing)" stroke="#ffffff" strokeWidth="1" />
                  <circle cx="50" cy="50" r="11" fill="#fffdf0" opacity="0.9" />
                  <circle cx="50" cy="50" r="4" fill="#b45309" />
                  <circle cx="50" cy="50" r="1.5" fill="#ffffff" />
                </svg>
              </div>
            </div>
          </div>

          {/* Clean Typography */}
          <div className="text-center w-full z-10">
            <p
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-xs sm:text-sm font-bold bg-gradient-to-b from-[#FFFDF0] via-[#F3E5AB] via-[#D4AF37] to-[#99701A] bg-clip-text text-transparent leading-tight"
            >
              {month}<br />Masa
            </p>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[10px] italic text-[#fde68a]/75 block mt-1"
            >
              Solar Zodiac Cycle
            </span>
          </div>
        </motion.div>

      </div>


      {/* ════════════ ARCHITECTURAL SOLAR HORIZON BRIDGE (SUNRISE & SUNSET) ════════════ */}
      <div className="w-full rounded-3xl bg-gradient-to-b from-[#180f0a]/95 via-[#0d0704]/98 to-[#040201] border-2 border-[#d4af37]/50 p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.2)] flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Sub-dial: UDAYA (Sunrise) */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Milled 24K Gold Sunrise Medallion */}
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#2a170a] via-[#140a04] to-[#050201] border-2 border-[#d4af37]/70 shadow-[0_0_16px_rgba(245,158,11,0.35),inset_0_1px_2px_#ffffff] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#fbbf24] drop-shadow-[0_0_10px_#fbbf24]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v5m0 10v5M4.93 4.93l3.54 3.54m7.06 7.06l3.54 3.54M2 12h5m10 0h5M4.93 19.07l3.54-3.54m7.06-7.06l3.54-3.54" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="4.5" fill="#ffd700" stroke="#ffffff" strokeWidth="1.2"/>
            </svg>
          </div>

          <div className="text-left">
            <span
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-[9.5px] uppercase tracking-[0.2em] font-bold text-[#d4af37] block"
            >
              Udaya (Sunrise)
            </span>
            <span
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-lg sm:text-xl font-bold text-white block leading-tight drop-shadow-sm"
            >
              {cleanSunrise} AM
            </span>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[10.5px] italic text-[#fde68a]/75 block"
            >
              ब्रह्म मुहूर्त वेला
            </span>
          </div>
        </div>

        {/* Center: Redesigned Elegant Solar Horizon Track */}
        <div className="flex-1 w-full flex flex-col items-center justify-center px-2 py-1">
          {/* Status Header: Single-line clean badge, zero awkward wrapping */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] bg-black/60 px-3 py-0.5 rounded-full border border-[#d4af37]/30 shadow-sm"
            >
              {isDay ? `Surya Kaal • ${solarAltitudeDeg}° Zenith` : "Surya Asta • Night Horizon"}
            </span>
          </div>

          {/* Calibrated Horizon Progress Track with Ticks */}
          <div className="w-full flex items-center justify-between text-[8.5px] font-mono text-white/50 mb-1 px-1">
            <span>05:59 Udaya</span>
            <span>12:00 Madhyahna</span>
            <span>18:41 Asta</span>
          </div>

          <div className="relative w-full h-3 bg-[#080402] rounded-full border border-[#d4af37]/40 overflow-hidden flex items-center p-0.5 shadow-inner">
            {/* Daylight Golden Progress Track */}
            <div
              style={{ width: `${dayProgress * 100}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#d4af37] via-[#fde68a] to-[#fffdf0] shadow-[0_0_12px_#ffd700] transition-all duration-700"
            />
          </div>
        </div>

        {/* Right Sub-dial: ASTA (Sunset) */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end md:justify-start">
          <div className="text-right md:text-left">
            <span
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-[9.5px] uppercase tracking-[0.2em] font-bold text-[#d4af37] block"
            >
              Asta (Sunset)
            </span>
            <span
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-lg sm:text-xl font-bold text-white block leading-tight drop-shadow-sm"
            >
              {cleanSunset} PM
            </span>
            <span
              style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
              className="text-[10.5px] italic text-[#fde68a]/75 block"
            >
              गोधूलि सन्ध्या
            </span>
          </div>

          {/* Milled 24K Gold Sunset Medallion */}
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#2a170a] via-[#140a04] to-[#050201] border-2 border-[#d4af37]/70 shadow-[0_0_16px_rgba(234,88,12,0.35),inset_0_1px_2px_#ffffff] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#ea580c] drop-shadow-[0_0_10px_#ea580c]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 18a5 5 0 0 0-10 0" strokeLinecap="round"/>
              <path d="M12 9V2M4.22 10.22l-1.42-1.42M19.78 10.22l1.42-1.42M1 18h22" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PremiumPanchangMasterpiece;
