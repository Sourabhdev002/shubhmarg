// ShubhMarg — Premium Vedic Astrology Visual Asset & Iconography System
// Handcrafted vector paths, gold-line glyphs, sacred ornaments & material tokens

export interface PlanetMeta {
  key: string;
  sanskrit: string;
  name: string;
  symbol: string;
  gemstone: string;
  color: string;
  glow: string;
}

export interface EnergyMeta {
  key: string;
  name: string;
  sanskrit: string;
  color: string;
  description: string;
}

export interface BadgeMeta {
  key: string;
  label: string;
  sanskrit: string;
  color: string;
}

// 12 Gold-Line Zodiac Vector Glyphs (Master line construction matching reference)
export const ZODIAC_GLYPH_PATHS: Record<string, string> = {
  Mesh: "M12 21V9M12 9C9 9 6 6.5 6 4C6 2.5 7.5 1.5 9 2.5C10.5 3.5 11.5 6 12 9ZM12 9C15 9 18 6.5 18 4C18 2.5 16.5 1.5 15 2.5C13.5 3.5 12.5 6 12 9Z", // Aries ram horns
  Vrishabh: "M6 4C6 6.5 8.7 8.5 12 8.5C15.3 8.5 18 6.5 18 4M12 9C8.7 9 6 11.7 6 15C6 18.3 8.7 21 12 21C15.3 21 18 18.3 18 15C18 11.7 15.3 9 12 9Z", // Taurus bull head + horns
  Mithun: "M4 3H20M4 21H20M8 3V21M16 3V21M8 8H16M8 16H16", // Gemini twins column
  Kark: "M6 10C8.2 10 10 8.2 10 6C10 3.8 8.2 2 6 2C3.8 2 2 3.8 2 6C2 8.2 3.8 10 6 10ZM6 10C9.3 10 15 11.5 18 14M18 14C20.2 14 22 15.8 22 18C22 20.2 20.2 22 18 22C15.8 22 14 20.2 14 18C14 15.8 15.8 14 18 14ZM18 14C14.7 14 9 12.5 6 10Z", // Cancer crab claws
  Simha: "M6 19C4.3 19 3 17.7 3 16C3 14.3 4.3 13 6 13C7.7 13 9 14.3 9 16M6 13C6 8 10 4 15 4C18.3 4 21 6.7 21 10C21 13.5 18 16.5 18 20", // Leo lion mane
  Kanya: "M3 4V16C3 18.2 4.8 20 7 20C9.2 20 11 18.2 11 16V4M7 4V16M11 4V16C11 18.2 12.8 20 15 20C17.2 20 19 18.2 19 16V4M15 16L19 22M21 16L17 22", // Virgo maiden
  Tula: "M4 19H20M3 15H8C8.5 12 10 10 12 10C14 10 15.5 12 16 15H21M8 15C8.5 12 10 10 12 10C14 10 15.5 12 16 15", // Libra balance scales
  Vrishchik: "M3 4V16C3 18.2 4.8 20 7 20C9.2 20 11 18.2 11 16V4M7 4V16M11 4V16C11 18.2 12.8 20 15 20C17.2 20 19 18.2 19 16V4M19 16V18C19 19.1 19.9 20 21 20H22M22 20L20 18M22 20L20 22", // Scorpio scorpion tail stinger
  Dhanu: "M5 19L19 5M19 5H12M19 5V12M9 11L13 15", // Sagittarius archer bow & arrow
  Makar: "M4 4V15C4 17.8 6.2 20 9 20C11.8 20 14 17.8 14 15V8C14 6.3 15.3 5 17 5C18.7 5 20 6.3 20 8C20 11.5 16 17 16 20", // Capricorn sea-goat
  Kumbh: "M3 8L6 5L9 8L12 5L15 8L18 5L21 8M3 16L6 13L9 16L12 13L15 16L18 13L21 16", // Aquarius celestial waves
  Meen: "M4 3C8 8 8 16 4 21M20 3C16 8 16 16 20 21M2 12H22", // Pisces twin fish arc
};

// Navagraha (Planetary) Master Metadata
export const NAVAGRAHAS: Record<string, PlanetMeta> = {
  Sun: {
    key: "Sun",
    sanskrit: "Surya (सूर्य)",
    name: "Sun",
    symbol: "☉",
    gemstone: "Manikya (Ruby)",
    color: "#E0A030",
    glow: "rgba(224,160,48,0.4)",
  },
  Moon: {
    key: "Moon",
    sanskrit: "Chandra (चन्द्र)",
    name: "Moon",
    symbol: "☽",
    gemstone: "Moti (Natural Pearl)",
    color: "#D0DCE5",
    glow: "rgba(208,220,229,0.35)",
  },
  Mars: {
    key: "Mars",
    sanskrit: "Mangal (मङ्गल)",
    name: "Mars",
    symbol: "♂",
    gemstone: "Moonga (Red Coral)",
    color: "#D64527",
    glow: "rgba(214,69,39,0.4)",
  },
  Mercury: {
    key: "Mercury",
    sanskrit: "Budha (बुध)",
    name: "Mercury",
    symbol: "☿",
    gemstone: "Panna (Emerald)",
    color: "#2EAA68",
    glow: "rgba(46,170,104,0.35)",
  },
  Jupiter: {
    key: "Jupiter",
    sanskrit: "Guru (बृहस्पति)",
    name: "Jupiter",
    symbol: "♃",
    gemstone: "Pukhraj (Yellow Sapphire)",
    color: "#E5B83B",
    glow: "rgba(229,184,59,0.4)",
  },
  Venus: {
    key: "Venus",
    sanskrit: "Shukra (शुक्र)",
    name: "Venus",
    symbol: "♀",
    gemstone: "Heera (Diamond / White Opal)",
    color: "#E8C2D8",
    glow: "rgba(232,194,216,0.35)",
  },
  Saturn: {
    key: "Saturn",
    sanskrit: "Shani (शनि)",
    name: "Saturn",
    symbol: "♄",
    gemstone: "Neelam (Blue Sapphire)",
    color: "#466B99",
    glow: "rgba(70,107,153,0.4)",
  },
  Rahu: {
    key: "Rahu",
    sanskrit: "Rahu (राहु)",
    name: "North Node",
    symbol: "☊",
    gemstone: "Gomed (Hessonite)",
    color: "#8B5FBF",
    glow: "rgba(139,95,191,0.35)",
  },
  Ketu: {
    key: "Ketu",
    sanskrit: "Ketu (केतु)",
    name: "South Node",
    symbol: "☋",
    gemstone: "Lehsunia (Cat's Eye)",
    color: "#B87333",
    glow: "rgba(184,115,51,0.35)",
  },
};

// 9 Life Aspect Badges
export const LIFE_BADGES: Record<string, BadgeMeta> = {
  Love: { key: "Love", label: "Love & Harmony", sanskrit: "Prema", color: "#E05A5A" },
  Career: { key: "Career", label: "Career & Karma", sanskrit: "Karma", color: "#E0C36A" },
  Finance: { key: "Finance", label: "Wealth & Lakshmi", sanskrit: "Artha", color: "#38BDF8" },
  Health: { key: "Health", label: "Vitality & Prana", sanskrit: "Arogya", color: "#34D399" },
  Spiritual: { key: "Spiritual", label: "Spiritual Grace", sanskrit: "Dharma", color: "#C084FC" },
  Wisdom: { key: "Wisdom", label: "Divine Intellect", sanskrit: "Jnana", color: "#FBBF24" },
  Power: { key: "Power", label: "Inner Authority", sanskrit: "Tejas", color: "#F97316" },
  Success: { key: "Success", label: "Victory & Fruit", sanskrit: "Siddhi", color: "#E0C36A" },
  Peace: { key: "Peace", label: "Inner Serenity", sanskrit: "Shanti", color: "#93C5FD" },
};

// 5 Vedic Elements (Pancha Mahabhuta) & Energies
export const VEDIC_ENERGIES: Record<string, EnergyMeta> = {
  Fire: { key: "Fire", name: "Agni (Fire)", sanskrit: "अग्नि", color: "#F87171", description: "Transformation, willpower, courage & vitality" },
  Water: { key: "Water", name: "Jala (Water)", sanskrit: "जल", color: "#60A5FA", description: "Intuition, emotional flow, devotion & healing" },
  Earth: { key: "Earth", name: "Prithvi (Earth)", sanskrit: "पृथ्वी", color: "#34D399", description: "Grounded stability, endurance & material foundation" },
  Air: { key: "Air", name: "Vayu (Air)", sanskrit: "वायु", color: "#38BDF8", description: "Intellect, communication, freedom & movement" },
  Ether: { key: "Ether", name: "Akasha (Ether)", sanskrit: "आकाश", color: "#A78BFA", description: "Infinite space, consciousness & cosmic vibration" },
};
