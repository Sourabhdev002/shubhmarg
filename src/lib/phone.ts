// Pure phone and question helpers. No server-only imports: safe on client and server.

export const PHONE_ERROR = "Please enter a valid 10-digit Indian mobile number.";
export const QUESTION_MIN_ERROR = "Please provide a question (minimum 10 characters).";
export const QUESTION_MAX_ERROR = "Question is too long (maximum 2000 characters).";

/** Strips non-digits; drops a leading 91 (12 digits) or 0 (11 digits). May still be invalid. */
export function normalizePhone(raw: string): string {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export function isValidIndianMobile(p: string): boolean {
  return /^[6-9]\d{9}$/.test(p);
}

export function buildPhoneEmail(phone10: string, domain: "phone" | "quick"): string {
  return `${phone10}@${domain}.shubhmarg.com`;
}

export type QuestionValidation = { ok: true } | { ok: false; error: string };

export function validateQuestion(raw: string): QuestionValidation {
  const q = String(raw ?? "").trim();
  if (q.length < 10) return { ok: false, error: QUESTION_MIN_ERROR };
  if (q.length > 2000) return { ok: false, error: QUESTION_MAX_ERROR };
  return { ok: true };
}
