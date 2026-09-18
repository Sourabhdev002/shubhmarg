import React from "react";

/**
 * Bespoke hand-drawn inline-SVG glyph set for ShubhMarg service/tool lists.
 *
 * ONE shared convention for the whole family so the set reads as cohesive:
 *   - viewBox "0 0 24 24"
 *   - fill "none", stroke "currentColor"
 *   - single shared strokeWidth (1.6)
 *   - round caps + joins, transparent background
 *
 * Every glyph inherits its color from the parent (currentColor), so the chip's
 * saffron text color flows straight through. No raster, no emoji, no network.
 */

type GlyphProps = { className?: string };

// Shared root props — the single source of the family's stroke/grid convention.
const G = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Wrapper enforcing the shared convention on every glyph. */
function Svg({ className, children }: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg className={className} {...G} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Neutral default glyph — last-resort safety net only (never blank). */
/* ------------------------------------------------------------------ */
export const DefaultGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />
  </Svg>
);

/* ================================================================== */
/* SACRED_SERVICES glyphs                                             */
/* ================================================================== */

/** Diya flame rising over an offering bowl. */
export const SacredOfferingsGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 3c1.4 1.2 2 2.4 2 3.6A2 2 0 0 1 10 6.6c0-1.2.6-2.4 2-3.6Z" />
    <path d="M4 13h16M5 13c.6 3.4 3.2 5.5 7 5.5s6.4-2.1 7-5.5" />
  </Svg>
);

/** Temple shikhara / mandir arch. */
export const TemplePujaGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 3l6 6H6l6-6Z" />
    <path d="M7 9v11h10V9M10 20v-4a2 2 0 0 1 4 0v4" />
  </Svg>
);

/** Swift bolt through a bell — tatkal express. */
export const TatkalExpressGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M6 17c0-4 1.5-8 6-8s6 4 6 8H6ZM10 20h4" />
    <path d="M13 3l-4 6h3l-1 4 4-6h-3l1-4Z" />
  </Svg>
);

/** Conch shell (shankh) sound. */
export const VoiceDossierGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M4 15c0-4 3-8 8-8 4 0 6 3 6 6 0 3-2 5-5 5H7l-3-3Z" />
    <path d="M9 13c1-1 3-1 4 0" />
  </Svg>
);

/** Open pothi / almanac book. */
export const AnnualVarshphalGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 6c-2-1.5-4.5-1.5-7-1v12c2.5-.5 5-.5 7 1 2-1.5 4.5-1.5 7-1V5c-2.5-.5-5-.5-7 1Z" />
    <path d="M12 6v13" />
  </Svg>
);

/* ================================================================== */
/* VEDIC_TOOLS — NEW bespoke glyphs                                   */
/* ================================================================== */

/** Crown / royal throne — raja yoga. */
export const RajaYogaGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M4 8l3 8h10l3-8-4 3-4-5-4 5-4-3Z" />
    <path d="M7 19h10" />
  </Svg>
);

/** 27-spoke star wheel — nakshatra yoni wheel. */
export const YoniWheelGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
  </Svg>
);

/** 8-direction compass rose — vastu radar. */
export const VastuCompassGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 5l2.2 4.8L19 12l-4.8 2.2L12 19l-2.2-4.8L5 12l4.8-2.2L12 5Z" />
  </Svg>
);

/** Balance scale — karmic rin resolver. */
export const KarmicRinGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 4v16M6 20h12M5 8h14M12 4l-7 4M12 4l7 4" />
    <path d="M3 12a2 2 0 0 0 4 0M17 12a2 2 0 0 0 4 0" />
  </Svg>
);

/** Protective shield — shani sade sati armor. */
export const ShaniShieldGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);

/** Twin lotus / joined — navamsha D9 soulmate. */
export const NavamshaGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M8 8a4 4 0 0 0 0 8M16 8a4 4 0 0 1 0 8" />
    <path d="M12 6c1.6 1.5 2.4 3 2.4 4.5A2.4 2.4 0 0 1 9.6 10.5C9.6 9 10.4 7.5 12 6Z" />
  </Svg>
);

/** Vault door / kalash urn — pitru vault. */
export const PitruVaultGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="5" width="16" height="14" rx="1.5" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 12v2.5M15.5 15.5l1 1M8.5 15.5l-1 1" />
  </Svg>
);

/** Sri Yantra triangles — yantra altar. */
export const YantraAltarGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 3.5l8 14H4l8-14Z" />
    <path d="M12 20.5l-8-14h16l-8 14Z" />
    <circle cx="12" cy="12" r="1.2" />
  </Svg>
);

/** Om / sound waveform — sound sanctuary. */
export const SoundSanctuaryGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M3 12h2l2-5 3 10 3-13 3 16 2-8h3" />
  </Svg>
);

/** Offering thali / parcel — prasad tracker. */
export const PrasadTrackerGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M4 9l8-4 8 4-8 4-8-4Z" />
    <path d="M4 9v6l8 4 8-4V9M12 13v6" />
  </Svg>
);

/** North-Indian kundli chart — kundli x-ray. */
export const KundliXrayGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <path d="M4 4l8 8 8-8M4 20l8-8 8 8M12 4v0M4 12l8-8M20 12l-8-8" />
    <path d="M12 4L4 12l8 8 8-8-8-8Z" />
  </Svg>
);

/** Temple shrine / deity niche — kuldevta. */
export const KuldevtaGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 3l5 4v3H7V7l5-4Z" />
    <path d="M7 10v10h10V10M11 20v-4a1 1 0 0 1 2 0v4" />
  </Svg>
);

/** Cradle under a star — baby cosmic certificate. */
export const BabyCosmicGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M4 14a8 8 0 0 1 16 0v1H4v-1ZM4 15v3M20 15v3M4 18h16" />
    <path d="M12 3l.9 1.8 2 .3-1.4 1.4.3 2L12 7.5 10.2 8.5l.3-2L9.1 5.1l2-.3L12 3Z" />
  </Svg>
);

/** Alert planet / beacon — graha SOS. */
export const GrahaSosGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="13" r="6" />
    <path d="M12 10v3M12 15.5v.5" />
    <path d="M12 3v2M5 5l1.5 1.5M19 5l-1.5 1.5" />
  </Svg>
);

/** Coiled serpent (naga) — kaal sarp dosha. */
export const KaalSarpGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M7 5c4 0 4 4 0 4s-4 4 0 4 5 3 5 5" />
    <path d="M7 5c-1.5 0-2.5 1-2.5 2M18 20c1.5-.5 2.5-2 2-4" />
    <path d="M17 17l1.5 1M20 16.5l-1.5.5" />
  </Svg>
);

/** Calendar with coin/lotus — wealth calendar. */
export const WealthCalendarGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 9h16M8 3v4M16 3v4" />
    <circle cx="12" cy="14.5" r="2.5" />
    <path d="M12 13v3" />
  </Svg>
);

/** Kavach amulet / talisman — raksha kavach. */
export const RakshaKavachGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 3l6 2.5v5c0 4-2.6 7-6 8.5-3.4-1.5-6-4.5-6-8.5v-5L12 3Z" />
    <path d="M12 8v6M9 11h6" />
  </Svg>
);

/* ================================================================== */
/* VEDIC_TOOLS — inline-SVG glyphs for reused semantic keys           */
/* (PremiumVedicIcon is raster-only, so list glyphs are drawn fresh)  */
/* ================================================================== */

/** Open palm with lines — samudrika palm scanner. */
export const PalmScannerGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M8 11V6a1.3 1.3 0 0 1 2.6 0v4M10.6 10V5a1.3 1.3 0 0 1 2.6 0v5M13.2 10V6a1.3 1.3 0 0 1 2.6 0v6c0 3.5-2 6-5 6s-5-2-5-5v-2a1.3 1.3 0 0 1 2.6 0v1" />
  </Svg>
);

/** Stacked chakra column — 7-chakra aura. */
export const ChakraScannerGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 3v18" />
    <circle cx="12" cy="6" r="1.6" />
    <circle cx="12" cy="12" r="2.4" />
    <circle cx="12" cy="18" r="1.6" />
  </Svg>
);

/** Orbiting planets — 3D planetary transits. */
export const PlanetaryTransitsGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="9" ry="4" />
    <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(45 12 12)" />
  </Svg>
);

/** Joined charts — 36-guna kundli milan. */
export const KundliMilanGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <rect x="3" y="7" width="9" height="9" rx="1" transform="rotate(45 7.5 11.5)" />
    <rect x="12" y="7" width="9" height="9" rx="1" transform="rotate(45 16.5 11.5)" />
  </Svg>
);

/** Crescent moon + cloud — dream decoder. */
export const DreamDecoderGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M16 4a6 6 0 1 0 4 10 7 7 0 0 1-4-10Z" />
    <path d="M5 17h7a2.5 2.5 0 0 0 0-5 3.5 3.5 0 0 0-6.8-1A2.6 2.6 0 0 0 5 17Z" />
  </Svg>
);

/** Clock dial — live decision clock. */
export const DecisionClockGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

/** Faceted gem — ratna & rudraksha / gemstone. */
export const GemstoneGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M6 4h12l3 5-9 11L3 9l3-5Z" />
    <path d="M3 9h18M9 4l-3 5 6 11 6-11-3-5M12 4v16" />
  </Svg>
);

/** Ledger / knot — ancestral karmic debt. */
export const KarmicDebtGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <rect x="5" y="4" width="14" height="16" rx="1.5" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </Svg>
);

/** Herb leaf / mortar — ayurveda prakriti. */
export const AyurvedaGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 20c-5 0-8-3-8-8 5 0 8 3 8 8ZM12 20c5 0 8-3 8-8-5 0-8 3-8 8ZM12 20V9" />
  </Svg>
);

/** Floor-plan grid — vedic vastu scanner. */
export const VastuScannerGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <path d="M4 11h9M13 4v16M13 15h7" />
  </Svg>
);

/** Mala beads — 108 digital japa mala. */
export const JapaMalaGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="5" r="1.3" />
    <circle cx="19" cy="12" r="1.3" />
    <circle cx="12" cy="19" r="1.3" />
    <circle cx="5" cy="12" r="1.3" />
    <path d="M12 21l-1.5 1.5h3L12 21Z" />
  </Svg>
);

/** Diya lamp — virtual diya shrine / deepdaan. */
export const DiyaShrineGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 4c1.3 1.1 1.9 2.2 1.9 3.3A1.9 1.9 0 0 1 10.1 7.3C10.1 6.2 10.7 5.1 12 4Z" />
    <path d="M5 12h14c-.7 3.3-3.4 5.5-7 5.5S5.7 15.3 5 12Z" />
  </Svg>
);

/** Direction arrows — disha shoola radar. */
export const DishaShoolaGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 6l2.5 6-2.5-1.5L9.5 12 12 6Z" />
    <path d="M12 12v6" />
  </Svg>
);

/** Chart engine — prashna horary kundli engine. */
export const KundliEngineGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <path d="M4 4l16 16M20 4L4 20" />
  </Svg>
);

/** Devanagari akshar (om-like) — vedic namkaran. */
export const NameAnalysisGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M5 8h11M13 5v6a4 4 0 0 1-8 0" />
    <path d="M16 8c2 0 3 1.5 3 4s-1.5 4-3.5 4" />
    <circle cx="17" cy="5" r="1" />
  </Svg>
);

/** Karmic wheel — past-life karma reader. */
export const KarmaReaderGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5" />
  </Svg>
);

/** Paired figures — future spouse blueprint. */
export const SpouseBlueprintGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="16" cy="8" r="2.5" />
    <path d="M4 19c0-2.8 1.8-5 4-5s4 2.2 4 5M12 19c0-2.8 1.8-5 4-5s4 2.2 4 5" />
  </Svg>
);

/** Mars / union knot — manglik marriage rescue. */
export const ManglikRescueGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <circle cx="10" cy="14" r="5" />
    <path d="M14 10l5-5M15 5h4v4" />
  </Svg>
);

/** Auspicious hourglass — universal muhurta finder. */
export const MuhurtaFinderGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M6 4h12M6 20h12M7 4c0 4 5 5 5 8s-5 4-5 8M17 4c0 4-5 5-5 8s5 4 5 8" />
  </Svg>
);

/** Lotus womb / cradle — garbh sanskar sanctum. */
export const GarbhSanskarGlyph: React.FC<GlyphProps> = ({ className }) => (
  <Svg className={className}>
    <path d="M12 20a8 6 0 0 1 0-12 8 6 0 0 1 0 12Z" />
    <path d="M12 8c-2 2-3 4-3 6M12 8c2 2 3 4 3 6" />
  </Svg>
);
