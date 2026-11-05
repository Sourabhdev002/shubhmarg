import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { getVisiblePanditFields, buildBuyLadder } from "@/lib/pandit";
import type { PanditProfile } from "@/config/pandit";
import { getServicePrice } from "@/lib/pricing";
import { ctaPriceLabel } from "@/lib/service-catalog";

// A string field that is randomly missing, empty, whitespace-only, or real.
const maybeString = fc.oneof(
  fc.constant(undefined),
  fc.constant(""),
  fc.constant("   "),
  fc.constant("\t \n"),
  fc.string(),
  fc.constantFrom("Pandit Sharma", "Kashi", " Varanasi ", "Hindi"),
);

// Years: random including zero, negative, fractional, huge, and valid 1..80.
const maybeYears = fc.oneof(
  fc.constant(undefined),
  fc.integer({ min: -20, max: 200 }),
  fc.double(),
  fc.constant(0),
  fc.constant(NaN),
  fc.integer({ min: 1, max: 80 }),
) as fc.Arbitrary<number | undefined>;

const maybeLanguages = fc.oneof(
  fc.constant(undefined),
  fc.array(fc.oneof(fc.string(), fc.constant(""), fc.constant("  "), fc.constantFrom("Hindi", "English", "Sanskrit")), {
    maxLength: 6,
  }),
) as fc.Arbitrary<string[] | undefined>;

const profileArb: fc.Arbitrary<PanditProfile> = fc.record({
  name: maybeString,
  photoSrc: maybeString,
  city: maybeString,
  yearsOfPractice: maybeYears,
  languages: maybeLanguages,
});

describe("getVisiblePanditFields", () => {
  // Feature: digital-mandir-home, Property 3: Pandit fields show only real values and hide everything else
  it("Property 3: name gate, trimming, year range 1..80 integer, language filtering", () => {
    fc.assert(
      fc.property(profileArb, (p) => {
        const out = getVisiblePanditFields(p);

        const trimmedName = typeof p.name === "string" ? p.name.trim() : "";

        if (trimmedName.length === 0) {
          expect(out).toEqual({});
          return;
        }

        // Name present: it must be the trimmed value.
        expect(out.name).toBe(trimmedName);

        // Strings: present only when non-blank; always trimmed; else no key.
        for (const key of ["photoSrc", "city"] as const) {
          const raw = p[key];
          const trimmed = typeof raw === "string" ? raw.trim() : "";
          if (trimmed.length > 0) {
            expect(out[key]).toBe(trimmed);
          } else {
            expect(key in out).toBe(false);
          }
        }

        // Years: only a finite integer from 1..80 survives.
        const y = p.yearsOfPractice;
        const yearValid = typeof y === "number" && Number.isInteger(y) && y >= 1 && y <= 80;
        if (yearValid) {
          expect(out.yearsOfPractice).toBe(y);
        } else {
          expect("yearsOfPractice" in out).toBe(false);
        }

        // Languages: reduced to non-blank trimmed entries; omitted when none.
        const expectedLangs = Array.isArray(p.languages)
          ? p.languages.map((l) => (typeof l === "string" ? l.trim() : "")).filter((l) => l.length > 0)
          : [];
        if (expectedLangs.length > 0) {
          expect(out.languages).toEqual(expectedLangs);
        } else {
          expect("languages" in out).toBe(false);
        }
      }),
      { numRuns: 100 },
    );
  });

  // Feature: digital-mandir-home, Property 4: Pandit field filtering is idempotent
  it("Property 4: getVisiblePanditFields(getVisiblePanditFields(p)) === getVisiblePanditFields(p)", () => {
    fc.assert(
      fc.property(profileArb, (p) => {
        const once = getVisiblePanditFields(p);
        const twice = getVisiblePanditFields(once);
        expect(twice).toEqual(once);
      }),
      { numRuns: 100 },
    );
  });

  it("empty PANDIT profile -> {}", () => {
    expect(getVisiblePanditFields({})).toEqual({});
  });
});

describe("buildBuyLadder", () => {
  const EXPECTED = [
    { id: "quick-answer", href: "/quick-answer" },
    { id: "vedic-guidance", href: "/request-guidance?service=vedic-guidance" },
    { id: "temple-puja", href: "/request-guidance?service=temple-puja" },
  ] as const;

  // Feature: digital-mandir-home, Property 5: Buy ladder keeps its order and takes prices only from the price source
  it("Property 5: fixed order + hrefs, each priceLabel === f(id); default label has ₹, no 'Rs.', and price digits", () => {
    fc.assert(
      fc.property(
        // An arbitrary price-label function keyed by service id.
        fc.func(fc.string()),
        (f) => {
          const ladder = buildBuyLadder(f);
          expect(ladder).toHaveLength(3);
          ladder.forEach((offer, i) => {
            expect(offer.id).toBe(EXPECTED[i].id);
            expect(offer.href).toBe(EXPECTED[i].href);
            expect(offer.priceLabel).toBe(f(offer.id));
          });
        },
      ),
      { numRuns: 100 },
    );

    // With the default label function the prices come from the real source.
    const defaultLadder = buildBuyLadder();
    expect(defaultLadder).toHaveLength(3);
    defaultLadder.forEach((offer, i) => {
      expect(offer.id).toBe(EXPECTED[i].id);
      expect(offer.href).toBe(EXPECTED[i].href);
      expect(offer.priceLabel).toBe(ctaPriceLabel(offer.id));
      expect(offer.priceLabel).toContain("₹");
      expect(offer.priceLabel).not.toContain("Rs.");
      // The label must contain every digit of the real service price.
      for (const d of String(getServicePrice(offer.id))) {
        expect(offer.priceLabel).toContain(d);
      }
    });
  });
});
