"use client";

import React, { useState } from "react";
import Image from "next/image";

export type PremiumVedicIconName =
  | "shubh-calendar"
  | "help-support"
  | "sacred-offerings"
  | "temple-puja"
  | "tatkal-express"
  | "voice-dossier"
  | "annual-varshphal"
  | "energized-gemstone"
  | "gemstone-ring"
  | "rajayoga-scanner"
  | "yoni-wheel"
  | "vastu-compass"
  | "karmic-rin-resolver"
  | "shani-sade-sati"
  | "navamsha-d9"
  | "pitru-vault"
  | "yantra-altar"
  | "sound-sanctuary"
  | "deepdaan-sanctum"
  | "prasad-tracker"
  | "kundli-xray"
  | "kuldevta-resolver"
  | "palm-scanner"
  | "chakra-scanner"
  | "planetary-transits"
  | "kundli-milan"
  | "dream-decoder"
  | "decision-clock"
  | "gemstone-calculator"
  | "karmic-debt"
  | "ayurveda-prakriti"
  | "vastu-scanner"
  | "japa-mala"
  | "diya-shrine"
  | "disha-shoola"
  | "kundli-engine"
  | "name-analysis"
  | "baby-cosmic"
  | "graha-sos"
  | "kaal-sarp"
  | "wealth-calendar"
  | "raksha-kavach"
  | "karma-reader"
  | "spouse-blueprint"
  | "manglik-rescue"
  | "muhurta-finder"
  | "garbh-sanskar"
  | string;

export const VEDIC_ICON_TITLES: Record<string, string> = {
  "shubh-calendar": "Shubh Calendar",
  "help-support": "Help & Support",
  "sacred-offerings": "Sacred Offerings & Pujas",
  "temple-puja": "Remote Temple Sankalp Puja",
  "tatkal-express": "2-Hour Tatkal Express",
  "voice-dossier": "Pandit Ji Audio Dossier",
  "annual-varshphal": "365-Day Varshphal Book",
  "energized-gemstone": "Consecrated Gemstone Ring",
  "gemstone-ring": "Consecrated Gemstone Ring",
  "rajayoga-scanner": "Raja Yoga Scanner",
  "yoni-wheel": "27 Nakshatra Yoni Wheel",
  "vastu-compass": "16-Zone Vastu Radar",
  "karmic-rin-resolver": "4-Rin Karmic Resolver",
  "shani-sade-sati": "Shani Sade Sati Armor",
  "navamsha-d9": "Navamsha D9 Soulmate",
  "pitru-vault": "Golden Pitru Vault",
  "yantra-altar": "24K Gold Yantra Altar",
  "sound-sanctuary": "432Hz Sound Sanctum",
  "deepdaan-sanctum": "Virtual Deepdaan Altar",
  "prasad-tracker": "Live Prasad Tracker",
  "kundli-xray": "12-House Kundli X-Ray",
  "kuldevta-resolver": "Gotra Rishi & Kuldevta",
  "palm-scanner": "Samudrika Palm Scanner",
  "chakra-scanner": "7-Chakra Aura Scanner",
  "planetary-transits": "3D Planetary Transits",
  "kundli-milan": "36-Guna Kundli Milan",
  "dream-decoder": "Swapna Dream Decoder",
  "decision-clock": "Live Decision Clock",
  "gemstone-calculator": "Ratna & Rudraksha",
  "karmic-debt": "Ancestral Karmic Debt",
  "ayurveda-prakriti": "Ayurveda Prakriti Diet",
  "vastu-scanner": "Vedic Vastu Scanner",
  "japa-mala": "108 Digital Japa Mala",
  "diya-shrine": "Virtual Diya Shrine",
  "disha-shoola": "Disha Shoola Radar",
  "kundli-engine": "Prashna Horary Engine",
  "name-analysis": "Vedic Namkaran Engine",
  "baby-cosmic": "Baby Cosmic Birth Insights",
  "graha-sos": "Emergency Graha SOS",
  "kaal-sarp": "Kaal Sarp Dosha Scanner",
  "wealth-calendar": "Vedic Wealth Calendar",
  "raksha-kavach": "Raksha Kavach QR Card",
  "karma-reader": "Past-Life Karmic Reader",
  "spouse-blueprint": "Future Spouse Blueprint",
  "manglik-rescue": "Manglik Marriage Rescue",
  "muhurta-finder": "Universal Muhurta Finder",
  "garbh-sanskar": "Garbh Sanskar Sanctum",
};

export interface PremiumVedicIconProps {
  name: PremiumVedicIconName;
  size?: number;
  className?: string;
  ariaLabel?: string;
  priority?: boolean;
}

export default function PremiumVedicIcon({
  name,
  size = 52,
  className = "",
  ariaLabel,
  priority = false,
}: PremiumVedicIconProps) {
  const [hasError, setHasError] = useState(false);
  const normalizedName = name.toLowerCase().trim();
  const label = ariaLabel || VEDIC_ICON_TITLES[normalizedName] || `${name} Icon`;
  
  // Default to WebP with PNG fallback on error
  const assetSrc = hasError
    ? `/vedic-icons/${normalizedName}.png`
    : `/vedic-icons/${normalizedName}.webp`;

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative inline-flex items-center justify-center shrink-0 select-none group/icon transition-transform duration-500 ease-out motion-reduce:transform-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Bronze-Gold Glow under the medallion */}
      <span
        aria-hidden="true"
        className="absolute inset-1 rounded-2xl bg-[#C9A646]/18 blur-md group-hover:bg-[#E2C875]/35 group-hover:blur-lg transition-all duration-500 pointer-events-none motion-reduce:transition-none"
      />

      {/* 3D Gold & Obsidian Pedestal Card */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-400 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_8px_20px_rgba(201,166,70,0.38)] motion-reduce:transform-none border border-[#D4AF37]/35 shadow-md">
        <Image
          src={assetSrc}
          alt={label}
          width={256}
          height={256}
          priority={priority}
          sizes={`${size}px`}
          onError={() => setHasError(true)}
          // Bold fill without edge-cropping (source art has padding).
          className="w-full h-full object-cover scale-[1.3] pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
        />
      </div>
    </div>
  );
}
