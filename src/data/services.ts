import type { ServiceIconName } from "@/components/ui/service-icons/registry";

export type ServiceCategory =
  | "offerings"
  | "kundli"
  | "love"
  | "remedies"
  | "wealth"
  | "family";

export interface ServiceEntry {
  /** Display label, emoji-free. */
  name: string;
  /** Route beginning with "/". */
  href: string;
  /** Canonical icon key from the registry union. */
  iconKey: ServiceIconName;
  /** Optional featured row (saffron gradient treatment). */
  highlight?: boolean;
  /** Authentic 1-line Vedic subtitle explaining the tool. */
  subtitle?: string;
  /** Premium status or category badge. */
  badge?: string;
  /** Broad thematic category for directory filter tabs. */
  category?: ServiceCategory;
}

export const SACRED_SERVICES: ServiceEntry[] = [
  {
    name: "Sacred Offerings & Pujas",
    href: "/sacred-offerings",
    iconKey: "sacred-offerings",
    highlight: true,
    subtitle: "Authentic Shastric rituals & consecrated temple sanctum pujas",
    badge: "FEATURED",
    category: "offerings",
  },
  {
    name: "Remote Temple Sankalp Puja",
    href: "/request-guidance?service=temple-puja",
    iconKey: "temple-puja",
    subtitle: "Personalized rituals conducted in ancient Jyotirlinga & Shakti Peethas",
    badge: "CONSECRATED",
    category: "offerings",
  },
  {
    name: "2-Hour Tatkal Express",
    href: "/request-guidance?service=tatkal-express",
    iconKey: "tatkal-express",
    subtitle: "Urgent astrological diagnosis & emergency remedies within 120 mins",
    badge: "EXPRESS",
    category: "offerings",
  },
  {
    name: "Pandit Ji Audio Dossier",
    href: "/request-guidance?service=voice-dossier",
    iconKey: "voice-dossier",
    subtitle: "Deep personalized voice reading of your Kundli & doshas by senior acharyas",
    badge: "POPULAR",
    category: "offerings",
  },
  {
    name: "365-Day Varshphal Book",
    href: "/request-guidance?service=annual-varshphal",
    iconKey: "annual-varshphal",
    subtitle: "Comprehensive month-by-month annual cosmic roadmap & planetary transitions",
    category: "offerings",
  },
  {
    name: "Consecrated Gemstone Ring",
    href: "/request-guidance?service=energized-gemstone",
    iconKey: "energized-gemstone",
    subtitle: "Pran-pratishtha energized Vedic gemstones tailored to your Janma Kundli",
    badge: "PURIFIED",
    category: "offerings",
  },
];

export const VEDIC_TOOLS: ServiceEntry[] = [
  {
    name: "Raja Yoga Scanner",
    href: "/rajayoga-scanner",
    iconKey: "rajayoga-scanner",
    subtitle: "Detect imperial wealth, power & leadership yoga combinations in your chart",
    badge: "ROYAL",
    category: "kundli",
  },
  {
    name: "27 Nakshatra Yoni Wheel",
    href: "/yoni-wheel",
    iconKey: "yoni-wheel",
    subtitle: "Vedic biological affinity, intimate harmony & sexual temperament",
    category: "love",
  },
  {
    name: "16-Zone Vastu Radar",
    href: "/vastu-compass",
    iconKey: "vastu-compass",
    subtitle: "Spatial energy matrix analyzer with cardinal directions & elemental balance",
    category: "wealth",
  },
  {
    name: "4-Rin Karmic Resolver",
    href: "/karmic-rin-resolver",
    iconKey: "karmic-rin-resolver",
    subtitle: "Diagnose and resolve Pitru, Deva, Rishi & Manushya ancestral karmic debts",
    badge: "KARMA",
    category: "remedies",
  },
  {
    name: "Shani Sade Sati Armor",
    href: "/shani-sade-sati",
    iconKey: "shani-sade-sati",
    subtitle: "7.5-year Saturn transit timeline, phase impact & classical protective remedies",
    badge: "SHANI",
    category: "remedies",
  },
  {
    name: "Navamsha D9 Soulmate",
    href: "/navamsha-d9",
    iconKey: "navamsha-d9",
    subtitle: "Destined spouse nature, marital compatibility & karmic bond analysis",
    badge: "LOVE",
    category: "love",
  },
  {
    name: "Golden Pitru Vault",
    href: "/pitru-vault",
    iconKey: "pitru-vault",
    subtitle: "Sacred ancestral tarpan ledger & generational blessings repository",
    category: "remedies",
  },
  {
    name: "24K Gold Yantra Altar",
    href: "/yantra-altar",
    iconKey: "yantra-altar",
    subtitle: "Interactive sacred geometry consecration with authentic Beej Mantras",
    badge: "SACRED",
    category: "remedies",
  },
  {
    name: "432Hz Sound Sanctum",
    href: "/sound-sanctuary",
    iconKey: "sound-sanctuary",
    subtitle: "Vedic healing frequencies, cosmic chanting & nervous system calibration",
    category: "remedies",
  },
  {
    name: "Virtual Deepdaan Altar",
    href: "/deepdaan-sanctum",
    iconKey: "deepdaan-sanctum",
    subtitle: "Float consecrated sacred diyas on the eternal virtual holy Ganges",
    category: "remedies",
  },
  {
    name: "Live Prasad Tracker",
    href: "/prasad-tracker",
    iconKey: "prasad-tracker",
    subtitle: "Real-time sanctum dispatch & tracking for your consecrated puja prasad",
    category: "offerings",
  },
  {
    name: "12-House Kundli X-Ray",
    href: "/kundli-xray",
    iconKey: "kundli-xray",
    subtitle: "Deep anatomical breakdown of all 12 astrological bhavas and planetary occupants",
    badge: "KUNDLI",
    category: "kundli",
  },
  {
    name: "Gotra Rishi & Kuldevta",
    href: "/kuldevta-resolver",
    iconKey: "kuldevta-resolver",
    subtitle: "Uncover ancestral gotra lineage, primordial Rishi & guardian clan deity",
    category: "kundli",
  },
  {
    name: "Samudrika Palm Scanner",
    href: "/palm-scanner",
    iconKey: "palm-scanner",
    subtitle: "Classical hand analysis: 3 sacred lines, planetary mounts & destiny markings",
    badge: "PALMISTRY",
    category: "kundli",
  },
  {
    name: "7-Chakra Aura Scanner",
    href: "/chakra-scanner",
    iconKey: "chakra-scanner",
    subtitle: "Diagnose subtle energetic blockages and receive exact Beej Mantra frequencies",
    category: "remedies",
  },
  {
    name: "3D Planetary Transits",
    href: "/transit-wheel",
    iconKey: "planetary-transits",
    subtitle: "Live interactive 3D Navagraha celestial orbits, retrogrades & transit aspects",
    badge: "3D LIVE",
    category: "kundli",
  },
  {
    name: "36-Guna Kundli Milan",
    href: "/compatibility",
    iconKey: "kundli-milan",
    subtitle: "Authentic Ashtakoot matrimonial compatibility across Nadi, Bhakoot & Gana",
    badge: "MARRIAGE",
    category: "love",
  },
  {
    name: "Swapna Dream Decoder",
    href: "/dream-decoder",
    iconKey: "dream-decoder",
    subtitle: "Decode celestial omens and spiritual messages based on ancient Agni Purana",
    category: "kundli",
  },
  {
    name: "Live Decision Clock",
    href: "/decision-clock",
    iconKey: "decision-clock",
    subtitle: "Real-time 24-hour planetary Hora and Choghadiya auspicious action radar",
    badge: "LIVE",
    category: "wealth",
  },
  {
    name: "Ratna & Rudraksha",
    href: "/gemstone-calculator",
    iconKey: "gemstone-calculator",
    subtitle: "Discover your Yoga-Karaka gemstone & calculate your authentic Rudraksha Mukhi",
    category: "remedies",
  },
  {
    name: "Ancestral Karmic Debt",
    href: "/karmic-debt",
    iconKey: "karmic-debt",
    subtitle: "Diagnose generational hurdles linked to the 4 primordial Vedic debts",
    category: "remedies",
  },
  {
    name: "Ayurveda Prakriti Diet",
    href: "/ayurveda-prakriti",
    iconKey: "ayurveda-prakriti",
    subtitle: "Discover your Vata-Pitta-Kapha elemental dosha and seasonal Sattvic regimen",
    category: "kundli",
  },
  {
    name: "Vedic Vastu Scanner",
    href: "/vastu-scanner",
    iconKey: "vastu-scanner",
    subtitle: "Assess 8 directional energy matrices of floor plans with authentic remedies",
    category: "wealth",
  },
  {
    name: "108 Digital Japa Mala",
    href: "/japa-mala",
    iconKey: "japa-mala",
    subtitle: "Consecrated 108-bead Japa counter with temple bell resonance & chant tracker",
    badge: "JAPA",
    category: "remedies",
  },
  {
    name: "Virtual Diya Shrine",
    href: "/digital-sankalp",
    iconKey: "diya-shrine",
    subtitle: "Consecrated virtual Diya lighting on the eternal live Sankalp register",
    category: "remedies",
  },
  {
    name: "Disha Shoola Radar",
    href: "/disha-shoola",
    iconKey: "disha-shoola",
    subtitle: "Daily planetary travel compass indicating prohibited vectors & safe corridors",
    category: "wealth",
  },
  {
    name: "Prashna Horary Engine",
    href: "/prashna-kundli",
    iconKey: "kundli-engine",
    subtitle: "Immediate Shastric horary verdict without birth time via 1–249 coordinates",
    badge: "INSTANT",
    category: "kundli",
  },
  {
    name: "Vedic Namkaran Engine",
    href: "/name-calculator",
    iconKey: "name-analysis",
    subtitle: "Nakshatra Charan resonance & Chaldean vibrational alignment for newborn names",
    badge: "POPULAR",
    category: "family",
  },
  {
    name: "Baby Cosmic Certificate",
    href: "/baby-cosmic-blueprint",
    iconKey: "baby-cosmic",
    subtitle: "Sacred astrological birth blueprint, lagna chart & cosmic soul pedigree",
    category: "family",
  },
  {
    name: "Emergency Graha SOS",
    href: "/graha-sos",
    iconKey: "graha-sos",
    subtitle: "Immediate planetary pacification mantras, directions & emergency daan advice",
    badge: "URGENT",
    category: "remedies",
  },
  {
    name: "Kaal Sarp Dosha Scanner",
    href: "/dosha-scanner",
    iconKey: "kaal-sarp",
    subtitle: "Analyze Rahu-Ketu nodal axis entrapment and verify 12 classical exemptions",
    category: "remedies",
  },
  {
    name: "Vedic Wealth Calendar",
    href: "/wealth-calendar",
    iconKey: "wealth-calendar",
    subtitle: "Auspicious timings for Lakshmi blessings, investment & debt settlement",
    badge: "WEALTH",
    category: "wealth",
  },
  {
    name: "Raksha Kavach QR Card",
    href: "/raksha-kavach",
    iconKey: "raksha-kavach",
    subtitle: "Personalized digital Vedic protective shield and daily Beej Mantra stotra",
    category: "remedies",
  },
  {
    name: "Past-Life Karmic Reader",
    href: "/past-life-reader",
    iconKey: "karma-reader",
    subtitle: "Traverse Rahu-Ketu nodal axes to uncover prior incarnation debts & mission",
    category: "kundli",
  },
  {
    name: "Future Spouse Blueprint",
    href: "/spouse-predictor",
    iconKey: "spouse-blueprint",
    subtitle: "Forecast destined partner appearance, temperament, profession & meeting window",
    badge: "POPULAR",
    category: "love",
  },
  {
    name: "Manglik Marriage Rescue",
    href: "/manglik-rescue",
    iconKey: "manglik-rescue",
    subtitle: "Evaluate your birth chart against 10 classical Shastric cancellation rules",
    category: "love",
  },
  {
    name: "Universal Muhurta Finder",
    href: "/muhurta-finder",
    iconKey: "muhurta-finder",
    subtitle: "Astronomical windows in the next 90 days for Vivah, Griha Pravesh & Business",
    badge: "TIMING",
    category: "wealth",
  },
  {
    name: "Garbh Sanskar Sanctum",
    href: "/garbh-sanskar",
    iconKey: "garbh-sanskar",
    subtitle: "Month-by-month prenatal Vedic regimen: 432Hz ragas, Dhatu nutrition & stotras",
    category: "family",
  },
];
