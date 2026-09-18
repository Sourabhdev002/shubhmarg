export type ApprovedEventType = 
  | "major_festival"
  | "vrat"
  | "ekadashi"
  | "purnima"
  | "amavasya"
  | "sankranti"
  | "other_hindu_observance"
  | "regional_festival"
  | "review_required";

export interface CatalogEntry {
  slug: string | null; // null if we don't map it
  canonical_name: string;
  event_type: ApprovedEventType;
  variant: string | null; // e.g. "ISKCON", "Gujarat", "Bengal", or null if universal
  publish: boolean;
}

/**
 * Central event catalog mapping AstrologyAPI festival names to ShubhMarg canonical events,
 * preserving regional/tradition variants.
 */
export const EVENT_CATALOG: Record<string, CatalogEntry> = {
  // --- MAJOR HINDU FESTIVALS ---
  "Maha Shivaratri": { slug: "maha-shivaratri", canonical_name: "Maha Shivaratri", event_type: "major_festival", variant: null, publish: true },
  "Holi": { slug: "holi", canonical_name: "Holi", event_type: "major_festival", variant: null, publish: true },
  "Diwali": { slug: "diwali", canonical_name: "Diwali", event_type: "major_festival", variant: null, publish: true },
  "Ganesh Chaturthi": { slug: "ganesh-chaturthi", canonical_name: "Ganesh Chaturthi", event_type: "major_festival", variant: null, publish: true },
  
  // Krishna Janmashtami & Variants
  "Krishna Janmashtami": { slug: "krishna-janmashtami", canonical_name: "Krishna Janmashtami", event_type: "major_festival", variant: null, publish: true },
  "Janmashtami *ISKCON": { slug: "krishna-janmashtami", canonical_name: "Krishna Janmashtami", event_type: "major_festival", variant: "ISKCON", publish: true },
  "Ashtami Rohini": { slug: "krishna-janmashtami", canonical_name: "Krishna Janmashtami", event_type: "regional_festival", variant: "South", publish: true },
  "Masik Krishna Janmashtami": { slug: null, canonical_name: "Masik Krishna Janmashtami", event_type: "other_hindu_observance", variant: null, publish: false }, // Prevent false positive map
  
  "Raksha Bandhan": { slug: "raksha-bandhan", canonical_name: "Raksha Bandhan", event_type: "major_festival", variant: null, publish: true },
  "Ram Navami": { slug: "ram-navami", canonical_name: "Ram Navami", event_type: "major_festival", variant: null, publish: true },
  "Vasant Panchami": { slug: "vasant-panchami", canonical_name: "Vasant Panchami", event_type: "major_festival", variant: null, publish: true },
  "Gudi Padwa": { slug: "gudi-padwa", canonical_name: "Gudi Padwa", event_type: "major_festival", variant: null, publish: true },
  "Ugadi": { slug: "ugadi", canonical_name: "Ugadi", event_type: "major_festival", variant: null, publish: true },
  "Karwa Chauth": { slug: "karwa-chauth", canonical_name: "Karwa Chauth", event_type: "major_festival", variant: null, publish: true },
  
  // Navratri & Dussehra group
  "Navratri Begins": { slug: "navratri-begins", canonical_name: "Navratri Begins", event_type: "major_festival", variant: null, publish: true },
  "Durga Ashtami": { slug: "durga-ashtami", canonical_name: "Durga Ashtami", event_type: "major_festival", variant: null, publish: true },
  "Maha Navami": { slug: "maha-navami", canonical_name: "Maha Navami", event_type: "major_festival", variant: null, publish: true },
  "Bengal Maha Navami": { slug: "maha-navami", canonical_name: "Maha Navami", event_type: "major_festival", variant: "Bengal", publish: true },
  "Dussehra": { slug: "vijayadashami", canonical_name: "Vijayadashami", event_type: "major_festival", variant: null, publish: true },
  "Vijayadashami": { slug: "vijayadashami", canonical_name: "Vijayadashami", event_type: "major_festival", variant: null, publish: true },
  "Bengal Vijayadashami": { slug: "vijayadashami", canonical_name: "Vijayadashami", event_type: "major_festival", variant: "Bengal", publish: true },

  // --- SANKRANTI ---
  "Makar Sankranti": { slug: "makar-sankranti", canonical_name: "Makar Sankranti", event_type: "sankranti", variant: null, publish: true },
  "Makara Sankranti": { slug: "makar-sankranti", canonical_name: "Makar Sankranti", event_type: "sankranti", variant: null, publish: true },
  "Simha Sankranti": { slug: "simha-sankranti", canonical_name: "Simha Sankranti", event_type: "sankranti", variant: null, publish: true },
  "Kanya Sankranti": { slug: "kanya-sankranti", canonical_name: "Kanya Sankranti", event_type: "sankranti", variant: null, publish: true },
  "Tula Sankranti": { slug: "tula-sankranti", canonical_name: "Tula Sankranti", event_type: "sankranti", variant: null, publish: true },

  // --- EKADASHI ---
  "Kamika Ekadashi": { slug: "kamika-ekadashi", canonical_name: "Kamika Ekadashi", event_type: "ekadashi", variant: null, publish: true },
  "Shravana Putrada Ekadashi": { slug: "shravana-putrada-ekadashi", canonical_name: "Shravana Putrada Ekadashi", event_type: "ekadashi", variant: null, publish: true },
  "Aja Ekadashi": { slug: "aja-ekadashi", canonical_name: "Aja Ekadashi", event_type: "ekadashi", variant: null, publish: true },
  "Parsva Ekadashi": { slug: "parsva-ekadashi", canonical_name: "Parsva Ekadashi", event_type: "ekadashi", variant: null, publish: true },
  "Papankusha Ekadashi": { slug: "papankusha-ekadashi", canonical_name: "Papankusha Ekadashi", event_type: "ekadashi", variant: null, publish: true },
  "Indira Ekadashi": { slug: "indira-ekadashi", canonical_name: "Indira Ekadashi", event_type: "ekadashi", variant: null, publish: true },
  "Vaishnava Indira Ekadashi": { slug: "indira-ekadashi", canonical_name: "Indira Ekadashi", event_type: "ekadashi", variant: "Vaishnava", publish: true },

  // --- PURNIMA ---
  "Shravana Purnima": { slug: "shravana-purnima", canonical_name: "Shravana Purnima", event_type: "purnima", variant: null, publish: true },
  "Bhadrapada Purnima": { slug: "bhadrapada-purnima", canonical_name: "Bhadrapada Purnima", event_type: "purnima", variant: null, publish: true },
  "Sharad Purnima": { slug: "sharad-purnima", canonical_name: "Sharad Purnima", event_type: "purnima", variant: null, publish: true },
  // Canonical identity rule: Ashwin Purnima is semantic duplicate of Sharad Purnima. Both provider strings mean the same canonical event.
  "Ashwin Purnima": { slug: null, canonical_name: "Sharad Purnima", event_type: "other_hindu_observance", variant: null, publish: false },

  // --- AMAVASYA ---
  "Hariyali Amavasya": { slug: "hariyali-amavasya", canonical_name: "Hariyali Amavasya", event_type: "amavasya", variant: null, publish: true },
  "Bhadrapada Amavasya": { slug: "bhadrapada-amavasya", canonical_name: "Bhadrapada Amavasya", event_type: "amavasya", variant: null, publish: true },
  "Ashwin Amavasya": { slug: "ashwin-amavasya", canonical_name: "Ashwin Amavasya", event_type: "amavasya", variant: null, publish: true },
  "Sarva Pitru Amavasya": { slug: "sarva-pitru-amavasya", canonical_name: "Sarva Pitru Amavasya", event_type: "amavasya", variant: null, publish: true },
  "Darsha Amavasya": { slug: null, canonical_name: "Darsha Amavasya", event_type: "other_hindu_observance", variant: null, publish: false },

  // --- VRAT / UPVAS & OBSERVANCES ---
  "Pradosh Vrat": { slug: "pradosh-vrat", canonical_name: "Pradosh Vrat", event_type: "vrat", variant: null, publish: true },
  "Sawan Shivaratri": { slug: "sawan-shivaratri", canonical_name: "Sawan Shivaratri", event_type: "vrat", variant: null, publish: true },
  "Hariyali Teej": { slug: "hariyali-teej", canonical_name: "Hariyali Teej", event_type: "vrat", variant: null, publish: true },
  "Radha Ashtami": { slug: "radha-ashtami", canonical_name: "Radha Ashtami", event_type: "major_festival", variant: null, publish: true },
  "Anant Chaturdashi": { slug: "anant-chaturdashi", canonical_name: "Anant Chaturdashi", event_type: "major_festival", variant: null, publish: true },
  "Ganesh Visarjan": { slug: "ganesh-visarjan", canonical_name: "Ganesh Visarjan", event_type: "other_hindu_observance", variant: null, publish: true },
  "Pitrupaksha Begins": { slug: "pitrupaksha-begins", canonical_name: "Pitrupaksha Begins", event_type: "other_hindu_observance", variant: null, publish: true },
  
  // --- REGIONAL FESTIVALS ---
  "Onam": { slug: "onam", canonical_name: "Onam", event_type: "regional_festival", variant: "Kerala", publish: true },
  "Nag Pancham *Gujarat": { slug: "nag-panchami", canonical_name: "Nag Panchami", event_type: "regional_festival", variant: "Gujarat", publish: true },
  "Randhan Chhath *Gujarat": { slug: "randhan-chhath", canonical_name: "Randhan Chhath", event_type: "regional_festival", variant: "Gujarat", publish: true },
  "Shitala Satam *Gujarat": { slug: "shitala-satam", canonical_name: "Shitala Satam", event_type: "regional_festival", variant: "Gujarat", publish: true },
  "Bhadrapada Begins *North": { slug: null, canonical_name: "Bhadrapada Begins", event_type: "review_required", variant: "North", publish: false },
  "Kartika Begins *North": { slug: null, canonical_name: "Kartika Begins", event_type: "review_required", variant: "North", publish: false },

  // --- IGNORED / UNMAPPED / NON-HINDU ---
  "Friendship Day": { slug: null, canonical_name: "Friendship Day", event_type: "review_required", variant: null, publish: false },
  "Independence Day": { slug: null, canonical_name: "Independence Day", event_type: "review_required", variant: null, publish: false },
  "Sanskrit Diwas": { slug: null, canonical_name: "Sanskrit Diwas", event_type: "review_required", variant: null, publish: false },
  "Surya Grahan": { slug: null, canonical_name: "Surya Grahan", event_type: "other_hindu_observance", variant: null, publish: false },
  "Chandra Grahan *Anshika": { slug: null, canonical_name: "Chandra Grahan", event_type: "other_hindu_observance", variant: "Anshika", publish: false },
};

export function getCatalogEntry(providerName: string): CatalogEntry | null {
  return EVENT_CATALOG[providerName] || null;
}
