import React from "react";
import {
  DefaultGlyph,
  SacredOfferingsGlyph, TemplePujaGlyph, TatkalExpressGlyph,
  VoiceDossierGlyph, AnnualVarshphalGlyph,
  RajaYogaGlyph, YoniWheelGlyph, VastuCompassGlyph, KarmicRinGlyph,
  ShaniShieldGlyph, NavamshaGlyph, PitruVaultGlyph, YantraAltarGlyph,
  SoundSanctuaryGlyph, PrasadTrackerGlyph, KundliXrayGlyph, KuldevtaGlyph,
  BabyCosmicGlyph, GrahaSosGlyph, KaalSarpGlyph, WealthCalendarGlyph,
  RakshaKavachGlyph,
  PalmScannerGlyph, ChakraScannerGlyph, PlanetaryTransitsGlyph, KundliMilanGlyph,
  DreamDecoderGlyph, DecisionClockGlyph, GemstoneGlyph, KarmicDebtGlyph,
  AyurvedaGlyph, VastuScannerGlyph, JapaMalaGlyph, DiyaShrineGlyph,
  DishaShoolaGlyph, KundliEngineGlyph, NameAnalysisGlyph, KarmaReaderGlyph,
  SpouseBlueprintGlyph, ManglikRescueGlyph, MuhurtaFinderGlyph, GarbhSanskarGlyph,
} from "./glyphs";

type Glyph = React.FC<{ className?: string }>;

export type ServiceIconName =
  | "decision-clock" | "diya-shrine" | "kundli-engine" | "name-analysis"
  | "vastu-scanner" | "kundli-milan" | "planetary-transits" | "karma-reader"
  | "spouse-blueprint" | "manglik-rescue" | "muhurta-finder" | "garbh-sanskar"
  | "dream-decoder" | "chakra-scanner" | "japa-mala" | "karmic-debt"
  | "ayurveda-prakriti" | "disha-shoola" | "palm-scanner" | "gemstone-calculator"
  | "kula-calculator"
  | "rajayoga-scanner" | "yoni-wheel" | "vastu-compass" | "karmic-rin-resolver"
  | "shani-sade-sati" | "navamsha-d9" | "pitru-vault" | "yantra-altar"
  | "sound-sanctuary" | "deepdaan-sanctum" | "prasad-tracker" | "kundli-xray"
  | "kuldevta-resolver" | "baby-cosmic" | "graha-sos" | "kaal-sarp"
  | "wealth-calendar" | "raksha-kavach"
  | "sacred-offerings" | "temple-puja" | "tatkal-express" | "voice-dossier"
  | "annual-varshphal" | "energized-gemstone";

export type IconResolution =
  | { kind: "svg"; Glyph: Glyph }
  | { kind: "default"; Glyph: Glyph };

export const SERVICE_ICON_TITLES: Record<ServiceIconName, string> = {
  "decision-clock": "Live Decision Clock",
  "diya-shrine": "Virtual Diya Shrine",
  "kundli-engine": "Prashna Horary Engine",
  "name-analysis": "Vedic Namkaran Engine",
  "vastu-scanner": "Vedic Vastu Scanner",
  "kundli-milan": "36-Guna Kundli Milan",
  "planetary-transits": "3D Planetary Transits",
  "karma-reader": "Past-Life Karmic Reader",
  "spouse-blueprint": "Future Spouse Blueprint",
  "manglik-rescue": "Manglik Marriage Rescue",
  "muhurta-finder": "Universal Muhurta Finder",
  "garbh-sanskar": "Garbh Sanskar Sanctum",
  "dream-decoder": "Swapna Dream Decoder",
  "chakra-scanner": "7-Chakra Aura Scanner",
  "japa-mala": "108 Digital Japa Mala",
  "karmic-debt": "Ancestral Karmic Debt",
  "ayurveda-prakriti": "Ayurveda Prakriti Diet",
  "disha-shoola": "Disha Shoola Radar",
  "palm-scanner": "Samudrika Palm Scanner",
  "gemstone-calculator": "Ratna & Rudraksha",
  "kula-calculator": "Rama & Radha Kula Calculator",
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
  "baby-cosmic": "Baby Cosmic Certificate",
  "graha-sos": "Emergency Graha SOS",
  "kaal-sarp": "Kaal Sarp Dosha Scanner",
  "wealth-calendar": "Vedic Wealth Calendar",
  "raksha-kavach": "Raksha Kavach QR Card",
  "sacred-offerings": "Sacred Offerings & Pujas",
  "temple-puja": "Remote Temple Sankalp Puja",
  "tatkal-express": "2-Hour Tatkal Express",
  "voice-dossier": "Pandit Ji Audio Dossier",
  "annual-varshphal": "365-Day Varshphal Book",
  "energized-gemstone": "Consecrated Gemstone Ring",
};

const BESPOKE_SVG_MAP: Record<ServiceIconName, Glyph> = {
  "decision-clock": DecisionClockGlyph,
  "diya-shrine": DiyaShrineGlyph,
  "kundli-engine": KundliEngineGlyph,
  "name-analysis": NameAnalysisGlyph,
  "vastu-scanner": VastuScannerGlyph,
  "kundli-milan": KundliMilanGlyph,
  "planetary-transits": PlanetaryTransitsGlyph,
  "karma-reader": KarmaReaderGlyph,
  "spouse-blueprint": SpouseBlueprintGlyph,
  "manglik-rescue": ManglikRescueGlyph,
  "muhurta-finder": MuhurtaFinderGlyph,
  "garbh-sanskar": GarbhSanskarGlyph,
  "dream-decoder": DreamDecoderGlyph,
  "chakra-scanner": ChakraScannerGlyph,
  "japa-mala": JapaMalaGlyph,
  "karmic-debt": KarmicDebtGlyph,
  "ayurveda-prakriti": AyurvedaGlyph,
  "disha-shoola": DishaShoolaGlyph,
  "palm-scanner": PalmScannerGlyph,
  "gemstone-calculator": GemstoneGlyph,
  "kula-calculator": GemstoneGlyph,
  "rajayoga-scanner": RajaYogaGlyph,
  "yoni-wheel": YoniWheelGlyph,
  "vastu-compass": VastuCompassGlyph,
  "karmic-rin-resolver": KarmicRinGlyph,
  "shani-sade-sati": ShaniShieldGlyph,
  "navamsha-d9": NavamshaGlyph,
  "pitru-vault": PitruVaultGlyph,
  "yantra-altar": YantraAltarGlyph,
  "sound-sanctuary": SoundSanctuaryGlyph,
  "deepdaan-sanctum": DiyaShrineGlyph,
  "prasad-tracker": PrasadTrackerGlyph,
  "kundli-xray": KundliXrayGlyph,
  "kuldevta-resolver": KuldevtaGlyph,
  "baby-cosmic": BabyCosmicGlyph,
  "graha-sos": GrahaSosGlyph,
  "kaal-sarp": KaalSarpGlyph,
  "wealth-calendar": WealthCalendarGlyph,
  "raksha-kavach": RakshaKavachGlyph,
  "sacred-offerings": SacredOfferingsGlyph,
  "temple-puja": TemplePujaGlyph,
  "tatkal-express": TatkalExpressGlyph,
  "voice-dossier": VoiceDossierGlyph,
  "annual-varshphal": AnnualVarshphalGlyph,
  "energized-gemstone": GemstoneGlyph,
};

export function resolveIcon(key: ServiceIconName): IconResolution {
  // Indexed as a plain record so an out-of-union runtime key is treated as a
  // possible miss (defensive safety net), not a compile-time certainty.
  const map = BESPOKE_SVG_MAP as Record<string, Glyph | undefined>;
  const Glyph = map[key];
  if (Glyph) return { kind: "svg", Glyph };
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[service-icons] unknown iconKey "${String(key)}" - using default glyph`);
  }
  return { kind: "default", Glyph: DefaultGlyph };
}

