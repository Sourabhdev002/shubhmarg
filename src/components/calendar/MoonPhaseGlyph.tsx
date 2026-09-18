"use client";

/**
 * MoonPhaseGlyph — a small live SVG moon that visualizes today's tithi.
 *
 * In Vedic astronomy the tithi IS the moon phase — each tithi = 1/30 of a lunar
 * cycle. Shukla Paksha (waxing) goes new → full over 15 tithis; Krishna Paksha
 * (waning) goes full → new. This glyph shows the correct illuminated crescent
 * or gibbous so the abstract tithi becomes visually poetic.
 *
 * Pure SVG — no external deps, GPU-cheap, no motion. Renders identically on
 * every device.
 */

// Tithi names in Vedic order (1..15). Case-insensitive lookup.
const TITHI_ORDER = [
  "pratipada",
  "dwitiya",
  "tritiya",
  "chaturthi",
  "panchami",
  "shashthi",
  "saptami",
  "ashtami",
  "navami",
  "dashami",
  "ekadashi",
  "dwadashi",
  "trayodashi",
  "chaturdashi",
  // 15th: Purnima in Shukla, Amavasya in Krishna — special cases.
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

/** Parse tithi name → { index 1..15, isFull, isNew }. Handles Purnima/Amavasya. */
function tithiToIndex(tithi: string, paksha: string): { index: number; isFull: boolean; isNew: boolean } {
  const n = normalize(tithi);
  const p = normalize(paksha);
  if (n === "purnima") return { index: 15, isFull: true, isNew: false };
  if (n === "amavasya") return { index: 15, isFull: false, isNew: true };
  const idx = TITHI_ORDER.indexOf(n);
  if (idx >= 0) {
    // 15th tithi depends on paksha; here we only handle 1..14 by name (Purnima/Amavasya cover 15).
    return { index: idx + 1, isFull: false, isNew: false };
  }
  // Unknown → treat as mid-cycle so nothing looks broken.
  return { index: 8, isFull: false, isNew: p === "krishna" };
}

/**
 * Illumination fraction (0 = new, 1 = full) and waxing flag from tithi + paksha.
 * Shukla Paksha (waxing): illum = tithi/15 (Pratipada 0.07 → Purnima 1)
 * Krishna Paksha (waning): illum = (15 - tithi)/15 (Pratipada 0.93 → Amavasya 0)
 */
function tithiToPhase(tithi: string, paksha: string): { illumination: number; waxing: boolean } {
  const { index, isFull, isNew } = tithiToIndex(tithi, paksha);
  if (isFull) return { illumination: 1, waxing: true };
  if (isNew) return { illumination: 0, waxing: true };
  const isShukla = normalize(paksha).startsWith("shukla");
  const illum = isShukla ? index / 15 : (15 - index) / 15;
  return { illumination: Math.max(0, Math.min(1, illum)), waxing: isShukla };
}

interface Props {
  paksha: string;
  tithi: string;
  size?: number;
  className?: string;
}

export default function MoonPhaseGlyph({ paksha, tithi, size = 26, className = "" }: Props) {
  const { illumination, waxing } = tithiToPhase(tithi, paksha);

  // Terminator ellipse: its horizontal radius = |1 - 2*illum|. At illum=0 or 1 the
  // terminator is the full diameter (fully dark or fully lit); at illum=0.5 it's a
  // straight line (half moon).
  const rx = Math.abs(1 - 2 * illumination);

  // Build the "lit region" path:
  //   Start at top (0,-1), sweep along the OUTER circle to bottom (0,+1) on the
  //   lit side (right for waxing, left for waning), then sweep back along the
  //   terminator ELLIPSE to close.
  const outerSweep = waxing ? 1 : 0;
  const innerSweep =
    illumination < 0.5
      ? (waxing ? 0 : 1) // crescent: ellipse arcs INWARD (concave into the disk)
      : (waxing ? 1 : 0); // gibbous: ellipse arcs OUTWARD (convex, sliver of dark)

  const litPath = `M 0 -1 A 1 1 0 0 ${outerSweep} 0 1 A ${rx} 1 0 0 ${innerSweep} 0 -1 Z`;
  const pct = Math.round(illumination * 100);
  const label = illumination >= 0.99
    ? "Full Moon"
    : illumination <= 0.01
    ? "New Moon"
    : `${waxing ? "Waxing" : "Waning"} · ${pct}%`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 shrink-0 ${className}`}
      title={`Moon phase: ${label}`}
      aria-label={`Moon phase: ${label}`}
    >
      <svg viewBox="-1.15 -1.15 2.3 2.3" width={size} height={size} className="shrink-0">
        <defs>
          <radialGradient id="moon-lit-grad" cx="0.4" cy="0.35" r="0.9">
            <stop offset="0%" stopColor="#FFF5D6" />
            <stop offset="60%" stopColor="#F5D77E" />
            <stop offset="100%" stopColor="#D4A537" />
          </radialGradient>
          <radialGradient id="moon-glow-grad" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#F5D77E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F5D77E" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Soft outer glow */}
        <circle cx="0" cy="0" r="1.12" fill="url(#moon-glow-grad)" />
        {/* Dark side of the disk */}
        <circle cx="0" cy="0" r="1" fill="#2A1810" stroke="#8C5212" strokeWidth="0.04" />
        {/* Lit region (crescent or gibbous) */}
        {illumination > 0.005 && illumination < 0.995 && (
          <path d={litPath} fill="url(#moon-lit-grad)" />
        )}
        {/* Special cases: full disk fully lit or fully dark */}
        {illumination >= 0.995 && <circle cx="0" cy="0" r="1" fill="url(#moon-lit-grad)" stroke="#8C5212" strokeWidth="0.04" />}
      </svg>
    </span>
  );
}
