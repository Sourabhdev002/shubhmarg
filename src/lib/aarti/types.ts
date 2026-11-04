export type AartiId = "hanuman" | "shiv" | "durga" | "om-jai-jagdish";

export interface AartiConfig {
  id: AartiId;
  deity: string; // "Lord Hanuman"
  titleHi: string; // "श्री हनुमान जी की आरती"
  titleEn: string;
  lyrics: string[]; // lines, supplied by the Owner / Pandit Ji
  weekdays: number[]; // 0 = Sunday ... 6 = Saturday
  verified: boolean; // true only after Pandit Ji has checked the text
  audioSrc?: string; // file under /public, supplied by the Owner
}

/** What the client gets: only a verified aarti with lyrics. */
export type VerifiedAarti = AartiConfig & { verified: true; lyrics: [string, ...string[]] };
