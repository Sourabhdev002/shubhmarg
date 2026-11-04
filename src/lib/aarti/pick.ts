import type { AartiConfig, VerifiedAarti } from "./types";
import { AARTIS } from "./config";

/**
 * Pick the aarti to show for a weekday (0 = Sunday ... 6 = Saturday).
 *
 * 1. Returns null when `weekday` is not an integer in 0..6.
 * 2. Keeps only verified entries that have at least one non-blank lyric line.
 * 3. Returns the first kept entry (config order) whose `weekdays` includes the
 *    given weekday, otherwise null.
 *
 * Because the page only renders AartiSection when this is not null, an unverified
 * aarti never shows text and the whole section is left out while nothing is verified.
 */
export function pickTodaysAarti(
  weekday: number,
  aartis: readonly AartiConfig[] = AARTIS,
): VerifiedAarti | null {
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) return null;

  const kept = aartis.filter(
    (a): a is VerifiedAarti =>
      a.verified === true && a.lyrics.some((line) => line.trim() !== ""),
  );

  return kept.find((a) => a.weekdays.includes(weekday)) ?? null;
}
