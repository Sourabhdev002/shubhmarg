"use client";

import React from "react";
import PremiumVedicIcon, {
  PremiumVedicIconName,
  VEDIC_ICON_TITLES,
} from "./PremiumVedicIcon";

export type VedicArtifactName =
  | "decision-clock"
  | "diya-shrine"
  | "kundli-engine"
  | "name-analysis"
  | "vastu-scanner"
  | "kundli-milan"
  | "planetary-transits"
  | "karma-reader"
  | "spouse-blueprint"
  | "manglik-rescue"
  | "muhurta-finder"
  | "garbh-sanskar"
  | "dream-decoder"
  | "chakra-scanner"
  | "japa-mala"
  | "karmic-debt"
  | "ayurveda-prakriti"
  | "disha-shoola"
  | "palm-scanner"
  | "gemstone-calculator"
  | "kula-calculator";

interface Props {
  name: VedicArtifactName | PremiumVedicIconName | string;
  size?: number;
  className?: string;
  ariaLabel?: string;
  priority?: boolean;
}

/**
 * VedicArtifactIcon
 * Seamlessly integrates the premium 3D gold & obsidian Vedic medallion system.
 */
export default function VedicArtifactIcon({
  name,
  size = 52,
  className = "",
  ariaLabel,
  priority = false,
}: Props) {
  return (
    <PremiumVedicIcon
      name={name}
      size={size}
      className={className}
      ariaLabel={ariaLabel}
      priority={priority}
    />
  );
}

export { PremiumVedicIcon, VEDIC_ICON_TITLES };
