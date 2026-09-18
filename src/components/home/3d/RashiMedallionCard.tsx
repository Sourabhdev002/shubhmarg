"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { RashiInfo } from "@/lib/zodiac-data";
import { ZODIAC_GLYPH_PATHS } from "@/lib/shubhmarg-assets";

interface RashiMedallionCardProps {
  rashi: RashiInfo;
  isActive: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
}

export function RashiMedallionCard({
  rashi,
  isActive,
  isDisabled = false,
  onSelect,
}: RashiMedallionCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  });
  // Keep isTouch in sync if the pointer type changes (e.g. tablet with mouse attached)
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll spotlight: on touch, a card pops when it enters the center band of the screen.
  // margin trims the viewport to a horizontal band in the middle so only centered cards light up.
  const inSpotlight = useInView(cardRef, {
    margin: "-42% 0px -42% 0px",
    amount: 0.2,
  });

  // Card is "raised" when: desktop hover, tapped, selected, or (on touch) scrolled into the spotlight
  const isTapped = isHovered;
  const isRaised =
    !isDisabled && (isActive || isTapped || (isTouch && inSpotlight));

  // On touch, tapping gives an immediate rich lift
  const handleTouchPop = () => {
    if (isDisabled) return;
    setIsHovered(true);
  };

  // Mouse position normalized (-0.5 to 0.5) for physical 3D perspective
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 280 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  // Dynamic Specular Glare (Light follow effect)
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const glyphPath = ZODIAC_GLYPH_PATHS[rashi.key] || "";

  return (
    <motion.button
      ref={cardRef}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-label={`${rashi.key} (${rashi.en}) - ${rashi.sanskrit}`}
      disabled={isDisabled}
      onClick={onSelect}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchPop}
      whileTap={{ scale: isDisabled ? 1 : 0.97 }}
      animate={
        isTouch && !isDisabled
          ? {
              y: isRaised ? -8 : 0,
              scale: isRaised ? 1.05 : 0.97,
            }
          : { y: 0, scale: 1 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={`relative group w-full flex flex-col items-center justify-start gap-1.5 pt-2 pb-1 outline-none select-none transition-all duration-300 ${
        isDisabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {/* ── Element-coloured ambient bloom behind the medallion ── */}
      <motion.div
        className="pointer-events-none absolute top-1 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full -z-10 blur-xl"
        animate={{
          opacity: isActive ? 0.55 : isHovered || (isTouch && isRaised) ? 0.35 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{ backgroundColor: rashi.elementColor }}
      />

      {/* ── The circular medallion — the icon IS the button, no card ── */}
      <motion.div
        style={{
          rotateX: !isDisabled && isHovered ? rotateX : 0,
          rotateY: !isDisabled && isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center overflow-hidden transition-all duration-400 bg-gradient-to-br from-[#1a1206] to-[#0d0906] ${
          isActive
            ? "ring-[2.5px] ring-[#C25E10] shadow-[0_0_0_4px_rgba(232,121,30,0.15),0_8px_22px_-6px_rgba(232,121,30,0.55)] scale-105"
            : isHovered || (isTouch && isRaised)
            ? "ring-2 ring-[#E8791E]/70 shadow-[0_8px_20px_-8px_rgba(107,42,20,0.4)] scale-[1.06]"
            : "ring-[1.5px] ring-[#B8860B]/35 shadow-[0_4px_12px_-6px_rgba(107,42,20,0.25)]"
        }`}
      >
        {rashi.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={rashi.image}
            alt={`${rashi.key} 3D Medallion`}
            className="w-full h-full object-cover rounded-full select-none pointer-events-none scale-[1.6] transition-transform duration-500 group-hover:scale-[1.72]"
            loading="lazy"
          />
        ) : glyphPath ? (
          <div
            className={`w-full h-full rounded-full flex items-center justify-center transition-colors ${
              isActive
                ? "bg-gradient-to-br from-[#E8791E] via-[#F5A623] to-[#C25E10] text-white"
                : "bg-gradient-to-br from-[#FFFDF8] to-[#F3E6CE] text-[#B8860B]"
            }`}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={isActive ? "2.2" : "1.8"}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={glyphPath} />
            </svg>
          </div>
        ) : (
          <span className="text-xl font-bold text-[#B8860B]">{rashi.glyph}</span>
        )}

        {/* Specular glare on desktop hover */}
        {!isDisabled && isHovered && !isTouch && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full mix-blend-overlay opacity-50"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.85) 0%, rgba(245,166,35,0.3) 40%, transparent 78%)`,
            }}
          />
        )}
      </motion.div>

      {/* ── Label — sits directly on obsidian, radiant gold ── */}
      <p
        className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] leading-none text-center transition-colors ${
          isActive ? "text-[#FFEAA7]" : "text-[#C4B59D] group-hover:text-[#FFFDF8]"
        }`}
      >
        {rashi.en}
      </p>
      <span className={`text-[9px] font-serif leading-none transition-colors ${isActive ? "text-[#E8791E]" : "text-[#D4AF37]/80 group-hover:text-[#FFEAA7]"}`}>
        {rashi.sanskrit}
      </span>

      {/* Active dot indicator */}
      {isActive && (
        <motion.div
          layoutId="activeRashiPill"
          className="w-4 h-1 rounded-full bg-[#E8791E] shadow-[0_0_8px_#E8791E] mt-0.5"
        />
      )}
    </motion.button>
  );
}

export default RashiMedallionCard;
