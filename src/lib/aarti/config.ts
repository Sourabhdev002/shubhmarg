import type { AartiConfig } from "./types";

/**
 * The four aartis. All start unverified with empty lyrics; the Owner or Pandit Ji
 * fills the real text and flips `verified` to true. We never invent or copy scripture.
 *
 * Weekday plan (0 = Sunday):
 *   Sun (0) Om Jai Jagdish · Mon (1) Shiv · Tue (2) Hanuman · Wed (3) Om Jai Jagdish
 *   Thu (4) Om Jai Jagdish · Fri (5) Durga · Sat (6) Hanuman
 */
export const AARTIS: AartiConfig[] = [
  {
    id: "hanuman",
    deity: "Lord Hanuman",
    titleHi: "श्री हनुमान जी की आरती",
    titleEn: "Shri Hanuman Ji Ki Aarti",
    lyrics: [],
    weekdays: [2, 6],
    verified: false,
  },
  {
    id: "shiv",
    deity: "Lord Shiva",
    titleHi: "श्री शिव जी की आरती",
    titleEn: "Shri Shiv Ji Ki Aarti",
    lyrics: [],
    weekdays: [1],
    verified: false,
  },
  {
    id: "durga",
    deity: "Maa Durga",
    titleHi: "श्री दुर्गा जी की आरती",
    titleEn: "Shri Durga Ji Ki Aarti",
    lyrics: [],
    weekdays: [5],
    verified: false,
  },
  {
    id: "om-jai-jagdish",
    deity: "Lord Vishnu",
    titleHi: "ॐ जय जगदीश हरे",
    titleEn: "Om Jai Jagdish Hare",
    lyrics: [],
    weekdays: [0, 3, 4],
    verified: false,
  },
];
