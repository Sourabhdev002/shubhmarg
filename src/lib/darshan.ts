import { AVAILABLE_DARSHAN } from "@/config/darshan";

export type DeityKey = "shiv" | "hanuman" | "durga" | "vishnu";

/** index 0 = Sunday ... index 6 = Saturday */
export const DARSHAN_BY_WEEKDAY: readonly DeityKey[] = [
  "vishnu", // Sun
  "shiv", // Mon
  "hanuman", // Tue
  "vishnu", // Wed
  "vishnu", // Thu
  "durga", // Fri
  "hanuman", // Sat
];

/** Returns the deity for the weekday, or null when weekday is not an integer 0..6. */
export function pickDarshanImage(weekday: number): DeityKey | null {
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
    return null;
  }
  return DARSHAN_BY_WEEKDAY[weekday];
}

export interface ResolvedDarshan {
  key: DeityKey;
  src: string; // src = /images/darshan/<key>.jpg
}

/** Picks the deity, then returns it only if its file is listed as available. */
export function resolveDarshan(
  weekday: number,
  available: readonly DeityKey[] = AVAILABLE_DARSHAN,
): ResolvedDarshan | null {
  const key = pickDarshanImage(weekday);
  if (key === null || !available.includes(key)) {
    return null;
  }
  return { key, src: `/images/darshan/${key}.jpg` };
}
