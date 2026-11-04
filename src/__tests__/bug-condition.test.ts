/**
 * Property 1: Bug Condition - Order flow shows true prices, accepts real phones,
 * persists claims and alerts the owner.
 *
 * Pure logic only. Never imports supabaseServer, server actions or Telegram
 * senders. These tests encode EXPECTED behavior and are meant to FAIL on
 * unfixed code (helper modules do not exist yet). The CTA scan (B4) lives in
 * cta-scan.test.ts so it can run without the helpers.
 *
 * B7 (Pay Securely persistence) needs a database: manual checklist in task 4.
 *
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.11, 1.12, 1.13
 */
import { describe, it, expect } from "vitest";
import { SERVICE_PRICING, getServicePrice } from "@/lib/pricing";

// Dynamic loaders so a missing module fails only the tests that need it
// (the specifier is built at runtime so Vite does not pre-resolve it).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Mod = any;
const load = (name: string): Promise<Mod> => {
  const spec = "../lib/" + name;
  return import(/* @vite-ignore */ spec);
};

// Small seeded generator (no extra dependency).
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
function randomMobile(r: () => number): string {
  let d = String(6 + Math.floor(r() * 4));
  for (let i = 0; i < 9; i++) d += Math.floor(r() * 10);
  return d;
}
const FORMATS: Array<(d: string) => string> = [
  (d) => d,
  (d) => `+91 ${d}`,
  (d) => `+91${d}`,
  (d) => `91${d}`,
  (d) => `0${d}`,
  (d) => `0${d.slice(0, 5)} ${d.slice(5)}`,
  (d) => `${d.slice(0, 5)} ${d.slice(5)}`,
  (d) => `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`,
  (d) => `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`,
  (d) => `+91-${d.slice(0, 5)}-${d.slice(5)}`,
  (d) => `  ${d}  `,
  (d) => `+91 (${d.slice(0, 5)}) ${d.slice(5)}`,
];

describe("B1 phone normalization and validity", () => {
  it("normalizePhone returns the 10 digits for every common format", async () => {
    const { normalizePhone } = await load("phone");
    const r = rng(42);
    for (let i = 0; i < 200; i++) {
      const d = randomMobile(r);
      for (const fmt of FORMATS) {
        expect(normalizePhone(fmt(d)), `input "${fmt(d)}"`).toBe(d);
      }
    }
  });

  it('"+91 98765 43210" normalizes to 9876543210 and is valid', async () => {
    const { normalizePhone, isValidIndianMobile } = await load("phone");
    expect(normalizePhone("+91 98765 43210")).toBe("9876543210");
    expect(isValidIndianMobile(normalizePhone("+91 98765 43210"))).toBe(true);
  });

  it("garbage is NOT a valid Indian mobile", async () => {
    const { normalizePhone, isValidIndianMobile } = await load("phone");
    for (const bad of ["12345678901234", "abcdefghij", "5123456789"]) {
      expect(isValidIndianMobile(normalizePhone(bad)), `input "${bad}"`).toBe(false);
    }
  });
});

describe("B2 validateQuestion", () => {
  const MESSAGE = "Please provide a question (minimum 10 characters).";
  // Accept null/undefined/""/true/{ok|valid:true} as "valid" (shape is not fixed by the spec).
  const isOk = (r: unknown) =>
    r === null ||
    r === undefined ||
    r === true ||
    r === "" ||
    (typeof r === "object" && r !== null && ((r as Mod).ok === true || (r as Mod).valid === true));

  it("rejects trimmed lengths 1 to 9 with the server message", async () => {
    const { validateQuestion } = await load("phone");
    for (let n = 1; n <= 9; n++) {
      const res = validateQuestion("  " + "a".repeat(n) + "  ");
      expect(isOk(res), `length ${n} should be rejected`).toBe(false);
      expect(JSON.stringify(res)).toContain(MESSAGE);
    }
  });

  it("accepts trimmed length 10 or more", async () => {
    const { validateQuestion } = await load("phone");
    for (const n of [10, 11, 50, 2000]) {
      expect(isOk(validateQuestion("a".repeat(n))), `length ${n}`).toBe(true);
    }
  });
});

describe("B3 getServiceView for every SERVICE_PRICING key", () => {
  it("returns that key's price and name, not the vedic-guidance fallback", async () => {
    const { getServiceView } = await load("service-catalog");
    const fallbackName = getServiceView("vedic-guidance").name;
    const problems: string[] = [];
    for (const key of Object.keys(SERVICE_PRICING)) {
      const v = getServiceView(key);
      // free-reading is 0 in the table; getServicePrice's 501 rule applies (not shown in the form).
      if (v.price !== getServicePrice(key)) {
        problems.push(`${key}: price ${v.price} != ${getServicePrice(key)}`);
      }
      if (key !== "vedic-guidance" && key !== "free-reading" && v.name === fallbackName) {
        problems.push(`${key}: falls back to vedic-guidance name "${fallbackName}"`);
      }
    }
    expect(problems).toEqual([]);
  });
});

describe("B4 alias, legacy and resolve cases", () => {
  it("deep-kundli, yantra-kavach, vastu, jyotish resolve to themselves", async () => {
    const { resolveServiceId } = await load("service-catalog");
    for (const id of ["deep-kundli", "yantra-kavach", "vastu", "jyotish"]) {
      expect(resolveServiceId(id), id).toBe(id);
    }
  });

  it("same-price aliases have the same price as their target", async () => {
    const { SAME_PRICE_ALIASES } = await load("service-catalog");
    for (const alias of ["puja", "express", "voice", "varshphal", "gemstone", "business"]) {
      const target = SAME_PRICE_ALIASES[alias];
      expect(target, `alias ${alias} missing`).toBeTruthy();
      expect(getServicePrice(target), alias).toBe(getServicePrice(alias));
    }
  });

  it('resolveServiceId("karmic-debt") is temple-puja and unknown ids give null', async () => {
    const { resolveServiceId } = await load("service-catalog");
    expect(resolveServiceId("karmic-debt")).toBe("temple-puja");
    expect(resolveServiceId("definitely-not-a-service")).toBeNull();
  });
});

describe("B5 buildQuickAnswerResponse", () => {
  it("returns {success, referenceId, amount}", async () => {
    const { buildQuickAnswerResponse } = await load("service-catalog");
    expect(buildQuickAnswerResponse("SHUBH-ABC123", 99.07)).toEqual({
      success: true,
      referenceId: "SHUBH-ABC123",
      amount: 99.07,
    });
  });
});

describe("B6 alert text builders and shouldSendClaimAlert", () => {
  const base = { referenceId: "SHUBH-ABC123", service: "kundli", amount: 1101.07, name: "Ravi Kumar" };
  const amountForms = (a: number) => [String(a), a.toFixed(2), a.toLocaleString("en-IN", { minimumFractionDigits: 2 })];

  function expectCommon(text: string) {
    expect(text).toContain(base.referenceId);
    expect(text.toLowerCase()).toContain(base.service);
    expect(amountForms(base.amount).some((s) => text.includes(s)), "amount in text").toBe(true);
    expect(text).not.toContain("TELEGRAM_BOT_TOKEN");
    expect(text).not.toContain("TELEGRAM_CHAT_ID");
  }

  it("buildOrderAlertText has reference, service, amount, name", async () => {
    const { buildOrderAlertText } = await load("telegram-messages");
    const text: string = buildOrderAlertText(base);
    expectCommon(text);
    expect(text).toContain("Ravi Kumar");
  });

  it("buildClaimAlertText has reference, service, amount, name and UTR when given", async () => {
    const { buildClaimAlertText } = await load("telegram-messages");
    expectCommon(buildClaimAlertText(base));
    const withUtr: string = buildClaimAlertText({ ...base, utr: "123456789012" });
    expectCommon(withUtr);
    expect(withUtr).toContain("123456789012");
  });

  it("escapes Markdown characters in the name (A_B*C)", async () => {
    const { buildOrderAlertText, buildClaimAlertText } = await load("telegram-messages");
    const evil = { ...base, name: "A_B*C" };
    for (const text of [buildOrderAlertText(evil), buildClaimAlertText(evil)] as string[]) {
      expect(text).not.toContain("A_B*C");
      expect(text).toContain("A\\_B\\*C");
    }
  });

  it("shouldSendClaimAlert decision table", async () => {
    const { shouldSendClaimAlert } = await load("telegram-messages");
    expect(shouldSendClaimAlert("unpaid", false)).toBe(true);
    expect(shouldSendClaimAlert("payment_verification", false)).toBe(false);
    expect(shouldSendClaimAlert("payment_verification", true)).toBe(true);
    expect(shouldSendClaimAlert("paid", true)).toBe(false);
  });
});
