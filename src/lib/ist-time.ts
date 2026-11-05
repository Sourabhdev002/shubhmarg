/**
 * Pure IST (Asia/Kolkata, UTC+5:30, no DST) time helpers.
 * Plain arithmetic instead of Intl/toLocaleString so server (Node) and browser always
 * produce byte-identical text: no hydration mismatches from ICU or machine time zone.
 */
const IST_OFFSET_MS = 330 * 60_000;
const DAY_MS = 86_400_000;

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const istShift = (ms: number) => new Date(ms + IST_OFFSET_MS);

/** Minutes since IST midnight (0..1439). */
export function istMinutes(ms: number): number {
  const d = istShift(ms);
  return d.getUTCHours() * 60 + d.getUTCMinutes();
}

/** IST weekday, 0 = Sunday. */
export function istWeekday(ms: number): number {
  return istShift(ms).getUTCDay();
}

/** Whole IST days since the epoch (changes at IST midnight). */
export function istDayNumber(ms: number): number {
  return Math.floor((ms + IST_OFFSET_MS) / DAY_MS);
}

/** e.g. "Wednesday, 4 November" (same format en-IN used before). */
export function istDateLabel(ms: number): string {
  const d = istShift(ms);
  return `${WEEKDAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}
/** Request/render time on the server. Server components pass this to client components as `serverNow`. */
export function getServerNow(): number {
  return Date.now();
}
