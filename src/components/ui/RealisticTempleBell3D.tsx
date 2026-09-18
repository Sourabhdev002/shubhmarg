"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RealisticTempleBell3DProps {
  isRinging: boolean;
  onStrike?: () => void;
  className?: string;
  size?: number; // size in px, default 76
}

export const RealisticTempleBell3D: React.FC<RealisticTempleBell3DProps> = ({
  isRinging,
  onStrike,
  className = "",
  size = 76,
}) => {
  return (
    <div
      onClick={onStrike}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onStrike?.();
        }
      }}
      aria-label="Strike Consecrated Panchadhatu Temple Bell"
      title="Tap to strike sacred temple bell"
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group outline-none ${className}`}
      style={{ width: size, height: size + 20 }}
    >
      {/* Divine Golden Ambient Aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/25 via-[#E8791E]/15 to-transparent blur-xl rounded-full pointer-events-none scale-125" />

      {/* Concentric Golden Sound Waves when ringing */}
      <AnimatePresence>
        {isRinging && (
          <>
            <motion.div
              key="wave-1"
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              className="pointer-events-none absolute w-16 h-16 rounded-full border-2 border-[#D4AF37] shadow-[0_0_24px_rgba(212,175,55,0.7)]"
              style={{ bottom: "6px" }}
            />
            <motion.div
              key="wave-2"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
              className="pointer-events-none absolute w-16 h-16 rounded-full border border-[#FFD166]/80 shadow-[0_0_20px_rgba(255,209,102,0.5)]"
              style={{ bottom: "6px" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Suspended Bell with Pendulum Physics Pivot at Top Chain Hook */}
      <motion.div
        animate={
          isRinging
            ? {
                rotate: [0, -22, 18, -14, 10, -6, 3, 0],
                scale: [1, 1.05, 0.98, 1.02, 1],
              }
            : {
                y: [0, -3, 0],
                rotate: [0, -1, 1, 0],
              }
        }
        transition={
          isRinging
            ? { duration: 3.2, ease: "easeOut" }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          transformOrigin: "50% 4px",
        }}
        className="relative w-full h-full filter drop-shadow-[0_10px_16px_rgba(42,24,16,0.38)] group-hover:drop-shadow-[0_12px_22px_rgba(212,175,55,0.55)] transition-all duration-300"
      >
        <svg
          viewBox="0 0 100 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Panchadhatu 3D Cylindrical Gradient */}
            <linearGradient id="bellMetalBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A2A04" />
              <stop offset="12%" stopColor="#8C520C" />
              <stop offset="28%" stopColor="#D4AF37" />
              <stop offset="42%" stopColor="#FFF2B2" />
              <stop offset="56%" stopColor="#F5B32A" />
              <stop offset="78%" stopColor="#995E0E" />
              <stop offset="100%" stopColor="#3D2002" />
            </linearGradient>

            {/* Specular Highlight Sheen */}
            <linearGradient id="metalSpecular" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FFEAA7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* Crown & Finial 3D Brass */}
            <linearGradient id="brassFinial" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6E3E07" />
              <stop offset="35%" stopColor="#F5D061" />
              <stop offset="50%" stopColor="#FFF9E0" />
              <stop offset="70%" stopColor="#E2A520" />
              <stop offset="100%" stopColor="#472603" />
            </linearGradient>

            {/* Chain Metallic Rings */}
            <linearGradient id="chainMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3B8" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="85%" stopColor="#784408" />
              <stop offset="100%" stopColor="#472603" />
            </linearGradient>

            {/* Inner Bell Cavity Dark Depth */}
            <radialGradient id="innerCavity" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#1A0D04" />
              <stop offset="70%" stopColor="#2E1707" />
              <stop offset="100%" stopColor="#5C340B" />
            </radialGradient>

            {/* Clapper Ball 3D Shading */}
            <radialGradient id="clapperShading" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFF5CE" />
              <stop offset="40%" stopColor="#E5B22A" />
              <stop offset="80%" stopColor="#7D4609" />
              <stop offset="100%" stopColor="#3B1E02" />
            </radialGradient>

            {/* Drop Shadow filter for internal parts */}
            <filter id="partShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#1A0D04" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* 1. TOP SUSPENSION CHAIN (3 Interlocking 3D Oval Links) */}
          <g id="topChain" filter="url(#partShadow)">
            {/* Top link anchored into temple beam */}
            <ellipse cx="50" cy="5" rx="4.5" ry="6" stroke="url(#chainMetal)" strokeWidth="2.5" fill="none" />
            {/* Sacred Red Mauli Thread Tied around the link */}
            <path d="M46 5 Q50 7 54 5" stroke="#C51818" strokeWidth="2" strokeLinecap="round" />
            
            {/* Middle link */}
            <ellipse cx="50" cy="14" rx="4.5" ry="6.5" stroke="url(#chainMetal)" strokeWidth="2.8" fill="none" />
            <path d="M47 13 Q50 15 53 13" stroke="#E63946" strokeWidth="1.8" strokeLinecap="round" />

            {/* Lower heavy cast mounting loop */}
            <ellipse cx="50" cy="23" rx="5.5" ry="7" stroke="url(#chainMetal)" strokeWidth="3.2" fill="none" />
          </g>

          {/* 2. CROWN ARCH / GOPURAM FINIAL */}
          <g id="crownFinial">
            {/* Decorative base ring */}
            <rect x="42" y="27" width="16" height="4.5" rx="2" fill="url(#brassFinial)" />
            
            {/* Sacred Kalash stepped top */}
            <path
              d="M45 27 C45 22 47 19 50 18 C53 19 55 22 55 27 Z"
              fill="url(#brassFinial)"
            />
            {/* Trishul / Spire Tip */}
            <path d="M50 14 L50 18" stroke="#FFEAA7" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="50" cy="14" r="1.5" fill="#FFEAA7" />

            {/* Stepped decorative collar */}
            <path d="M38 31 L62 31 L64 36 L36 36 Z" fill="url(#bellMetalBody)" />
            <ellipse cx="50" cy="36" rx="14" ry="2" fill="url(#brassFinial)" />
          </g>

          {/* 3. INTERNAL CLAPPER (Swings counter-phase when struck) */}
          <motion.g
            id="clapperTongue"
            animate={
              isRinging
                ? {
                    rotate: [0, 18, -16, 12, -8, 4, -2, 0],
                  }
                : {
                    rotate: [0, 1.5, -1.5, 0],
                  }
            }
            transition={
              isRinging
                ? { duration: 3.2, ease: "easeOut", delay: 0.05 }
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }
            style={{
              transformOrigin: "50px 36px",
            }}
          >
            {/* Clapper Stem */}
            <line x1="50" y1="36" x2="50" y2="92" stroke="url(#chainMetal)" strokeWidth="2.8" strokeLinecap="round" />
            {/* Clapper Heavy Ball (Panchadhatu Lolak) */}
            <circle cx="50" cy="94" r="6.5" fill="url(#clapperShading)" filter="url(#partShadow)" />
            {/* Highlight on clapper ball */}
            <circle cx="48" cy="92" r="2.2" fill="#FFFFFF" opacity="0.65" />
          </motion.g>

          {/* 4. MAIN 3D CURVED BELL BODY (Sculpted Panchadhatu Flare) */}
          <g id="mainBody">
            {/* Outer Bell Flare Profile */}
            <path
              d="M36 36 C37 54 30 72 16 86 C25 90 75 90 84 86 C70 72 63 54 64 36 Z"
              fill="url(#bellMetalBody)"
            />

            {/* Cylindrical Specular Glint Overlay */}
            <path
              d="M36 36 C37 54 30 72 16 86 C25 90 75 90 84 86 C70 72 63 54 64 36 Z"
              fill="url(#metalSpecular)"
              opacity="0.7"
            />

            {/* Engraved Upper Mantra Band */}
            <path
              d="M33 50 C44 53 56 53 67 50"
              stroke="#542E04"
              strokeWidth="2.5"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M33 51 C44 54 56 54 67 51"
              stroke="#FFF1B8"
              strokeWidth="1"
              fill="none"
              opacity="0.9"
            />

            {/* Sacred ॐ Relic Embossed on Center Body */}
            <g transform="translate(43, 56) scale(0.65)" opacity="0.9">
              <text
                x="0"
                y="15"
                fontFamily="'Tiro Devanagari Hindi', 'Cinzel', serif"
                fontSize="18"
                fontWeight="bold"
                fill="#542E04"
              >
                ॐ
              </text>
              <text
                x="-0.5"
                y="14.5"
                fontFamily="'Tiro Devanagari Hindi', 'Cinzel', serif"
                fontSize="18"
                fontWeight="bold"
                fill="#FFEAA7"
              >
                ॐ
              </text>
            </g>

            {/* Lower Embossed Lotus Petal Filigree Band */}
            <path
              d="M25 72 C33 76 67 76 75 72"
              stroke="#542E04"
              strokeWidth="2.8"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M25 73 C33 77 67 77 75 73"
              stroke="#FFF1B8"
              strokeWidth="1.2"
              fill="none"
              opacity="0.95"
            />

            {/* Decorative Beaded Pellets around lower band */}
            {[29, 36, 43, 50, 57, 64, 71].map((cx, i) => (
              <circle key={i} cx={cx} cy={74 + Math.sin((i / 6) * Math.PI) * 2.2} r="1.3" fill="#FFEAA7" />
            ))}

            {/* Inner Bell Cavity Rim Ellipse (Dark Interior Depth) */}
            <ellipse cx="50" cy="86" rx="34" ry="7.5" fill="url(#innerCavity)" />

            {/* Thick Beveled Bell Lip / Sound Ring */}
            <path
              d="M16 86 C16 91 30 95 50 95 C70 95 84 91 84 86 C84 83 70 80 50 80 C30 80 16 83 16 86 Z"
              fill="url(#bellMetalBody)"
              stroke="#5C340B"
              strokeWidth="0.8"
            />

            {/* High-Gloss Rim Specular Reflection */}
            <ellipse cx="50" cy="88" rx="31" ry="4.5" stroke="url(#metalSpecular)" strokeWidth="1.5" fill="none" opacity="0.8" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
