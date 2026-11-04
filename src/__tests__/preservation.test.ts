/**
 * Property 2: Preservation. Baseline observed on UNFIXED code.
 * Pure logic only: no supabase, no server actions, no telegram import (file reads only).
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SERVICE_PRICING, getServicePrice } from "@/lib/pricing";
import {
  LEGACY_FORM_SERVICES,
  LEGACY_SAME_PRICE_ALIASES,
  LEGACY_SERVER_ALLOW_LIST,
  LEGACY_PRICING,
  LEGACY_PHONE_EMAIL,
  LEGACY_QUICK_EMAIL,
} from "./fixtures/legacy-order-flow";

import { normalizePhone, isValidIndianMobile, buildPhoneEmail } from "@/lib/phone";
import {
  getServiceView,
  resolveServiceId,
  SAME_PRICE_ALIASES,
  ctaPriceLabel,
  formatInr,
} from "@/lib/service-catalog";

const ROOT = join(__dirname, "..", "..");
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

/** Small seeded PRNG (mulberry32), no dependency. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomMobile(r: () => number): string {
  let s = String(6 + Math.floor(r() * 4));
  for (let i = 0; i < 9; i++) s += Math.floor(r() * 10);
  return s;
}

describe("Preservation: price table", () => {
  it("SERVICE_PRICING equals the frozen snapshot", () => {
    expect({ ...SERVICE_PRICING }).toEqual(LEGACY_PRICING);
  });

  it("getServicePrice matches the table for every key (0 falls back to 501)", () => {
    for (const key of Object.keys(SERVICE_PRICING)) {
      const expected = LEGACY_PRICING[key] || 501;
      expect(getServicePrice(key)).toBe(expected);
    }
  });

  it("unknown ids and free-reading give 501", () => {
    expect(getServicePrice("does-not-exist")).toBe(501);
    expect(getServicePrice("karmic-debt")).toBe(501);
    expect(getServicePrice("")).toBe(501);
    expect(getServicePrice("free-reading")).toBe(501);
  });

  it("random unknown ids always give 501", () => {
    const r = rng(42);
    for (let i = 0; i < 200; i++) {
      const id = "zz-" + Math.floor(r() * 1e9).toString(36);
      expect(getServicePrice(id)).toBe(501);
    }
  });
});

describe("Preservation: 12 existing form services", () => {
  it("has exactly 12 entries with unique ids", () => {
    expect(LEGACY_FORM_SERVICES).toHaveLength(12);
    expect(new Set(LEGACY_FORM_SERVICES.map((s) => s.id)).size).toBe(12);
  });

  it("each fixture price equals pricing.ts, and field values are non-empty", () => {
    for (const s of LEGACY_FORM_SERVICES) {
      expect(getServicePrice(s.id)).toBe(s.price);
      expect(s.name.length).toBeGreaterThan(0);
      expect(s.delivery.length).toBeGreaterThan(0);
      expect(s.desc.length).toBeGreaterThan(0);
    }
  });

  it("fixture still matches the unfixed form source (until task 3.2 rewrites it)", () => {
    const src = read("src/components/guidance/GuidanceRequestForm.tsx");
    // After the fix the local list is removed; then SERVICE_META carries the same text (checked in 3.7).
    if (!src.includes("const SERVICES = [")) return;
    for (const s of LEGACY_FORM_SERVICES) {
      expect(src).toContain(`id: "${s.id}", name: "${s.name}", price: ${s.price}, delivery: "${s.delivery}"`);
      expect(src).toContain(`desc: "${s.desc}"`);
    }
  });
});

describe("Preservation: same-price aliases", () => {
  it("each old alias maps to a target with the identical price", () => {
    expect(Object.keys(LEGACY_SAME_PRICE_ALIASES).sort()).toEqual(
      ["business", "express", "gemstone", "puja", "varshphal", "voice"]
    );
    for (const [alias, target] of Object.entries(LEGACY_SAME_PRICE_ALIASES)) {
      expect(getServicePrice(alias)).toBe(getServicePrice(target));
      expect(LEGACY_FORM_SERVICES.some((s) => s.id === target)).toBe(true);
    }
  });
});

describe("Preservation: server allow-list", () => {
  it("allow-list equals the keys of SERVICE_PRICING", () => {
    expect([...LEGACY_SERVER_ALLOW_LIST].sort()).toEqual(Object.keys(SERVICE_PRICING).sort());
  });

  it("fixture matches the unfixed actions.ts list (until task 3.2)", () => {
    const src = read("src/app/request-guidance/actions.ts");
    if (!src.includes("const SERVICES = [")) return;
    for (const id of LEGACY_SERVER_ALLOW_LIST) expect(src).toContain(`"${id}"`);
  });
});

describe("Preservation: saved email formats", () => {
  it("literal examples", () => {
    expect(LEGACY_PHONE_EMAIL("9876543210")).toBe("9876543210@phone.shubhmarg.com");
    expect(LEGACY_QUICK_EMAIL("9876543210")).toBe("9876543210@quick.shubhmarg.com");
  });

  it("any plain 10-digit mobile gives <digits>@domain and passes the server email regex", () => {
    const r = rng(7);
    for (let i = 0; i < 200; i++) {
      const p = randomMobile(r);
      expect(p).toMatch(/^[6-9]\d{9}$/);
      expect(LEGACY_PHONE_EMAIL(p)).toBe(`${p}@phone.shubhmarg.com`);
      expect(LEGACY_QUICK_EMAIL(p)).toBe(`${p}@quick.shubhmarg.com`);
      expect(LEGACY_PHONE_EMAIL(p)).toMatch(/^\S+@\S+\.\S+$/);
    }
  });
});

describe("Preservation: untouched files and existing exports", () => {
  it("paise-allocation keeps allocateUniquePaiseAmount", () => {
    expect(read("src/lib/paise-allocation.ts")).toContain("allocateUniquePaiseAmount");
  });

  it("paytm-links keeps its export names", () => {
    const src = read("src/config/paytm-links.ts");
    for (const name of ["PAYTM_GENERIC_LINK", "PAYTM_FIXED_LINKS", "getPaytmLink", "paytmLinksConfigured"]) {
      expect(src).toMatch(new RegExp(`export (const|function) ${name}\\b`));
    }
  });

  it("proxy keeps the quick-answer rate limit route", () => {
    expect(read("src/proxy.ts")).toContain('"/api/quick-answer"');
  });

  it("telegram keeps sendTopupAlert, sendQuickUnlockAlert, telegramConfigured", () => {
    const src = read("src/lib/telegram.ts");
    expect(src).toMatch(/export (async )?function sendTopupAlert\b/);
    expect(src).toMatch(/export (async )?function sendQuickUnlockAlert\b/);
    expect(src).toMatch(/export function telegramConfigured\b/);
  });
});

describe("Preservation (post-fix helpers): phones and emails", () => {
  it("valid 10-digit mobiles normalize to themselves and stay valid", () => {
    const r = rng(2024);
    for (let i = 0; i < 300; i++) {
      const p = randomMobile(r);
      expect(normalizePhone(p)).toBe(p);
      expect(isValidIndianMobile(p)).toBe(true);
    }
  });

  it("buildPhoneEmail equals the legacy email helpers", () => {
    const r = rng(99);
    for (let i = 0; i < 300; i++) {
      const p = randomMobile(r);
      expect(buildPhoneEmail(p, "phone")).toBe(LEGACY_PHONE_EMAIL(p));
      expect(buildPhoneEmail(p, "quick")).toBe(LEGACY_QUICK_EMAIL(p));
      expect(buildPhoneEmail(p, "phone")).toBe(`${p}@phone.shubhmarg.com`);
      expect(buildPhoneEmail(p, "quick")).toBe(`${p}@quick.shubhmarg.com`);
    }
  });
});

describe("Preservation (post-fix helpers): service catalog", () => {
  it("getServiceView for the 12 existing ids equals the fixture", () => {
    for (const s of LEGACY_FORM_SERVICES) {
      const v = getServiceView(s.id);
      expect(v.name).toBe(s.name);
      expect(v.price).toBe(s.price);
      expect(v.delivery).toBe(s.delivery);
      expect(v.desc).toBe(s.desc);
    }
  });

  it("resolveServiceId accepts a superset of the old allow-list", () => {
    for (const id of LEGACY_SERVER_ALLOW_LIST) {
      expect(resolveServiceId(id)).not.toBeNull();
    }
    expect(resolveServiceId("karmic-debt")).not.toBeNull();
  });

  it("same-price aliases equal the legacy alias map exactly", () => {
    expect({ ...SAME_PRICE_ALIASES }).toEqual(LEGACY_SAME_PRICE_ALIASES);
  });

  it("ctaPriceLabel equals formatInr(getServicePrice) for every catalog key", () => {
    for (const id of Object.keys(SERVICE_PRICING)) {
      expect(ctaPriceLabel(id)).toBe(formatInr(getServicePrice(id)));
    }
  });
});
