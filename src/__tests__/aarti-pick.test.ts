import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { pickTodaysAarti } from "@/lib/aarti/pick";
import { AARTIS } from "@/lib/aarti/config";
import type { AartiConfig, AartiId } from "@/lib/aarti/types";

const AARTI_IDS: AartiId[] = ["hanuman", "shiv", "durga", "om-jai-jagdish"];

// A generator that builds arbitrary aarti entries with random verified flags,
// random lyrics (including empty arrays, empty and whitespace-only lines) and
// random weekday lists (including out-of-range values, which the picker ignores).
const aartiArb: fc.Arbitrary<AartiConfig> = fc.record({
  id: fc.constantFrom(...AARTI_IDS),
  deity: fc.string(),
  titleHi: fc.string(),
  titleEn: fc.string(),
  lyrics: fc.array(
    fc.oneof(
      fc.string(),
      fc.constant(""),
      fc.constant("   "),
      fc.constant("\t\n"),
      fc.constant("Jai Hanuman"),
    ),
    { maxLength: 6 },
  ),
  weekdays: fc.array(fc.integer({ min: -3, max: 9 }), { maxLength: 8 }),
  verified: fc.boolean(),
});

const aartiListArb = fc.array(aartiArb, { maxLength: 8 });

describe("pickTodaysAarti", () => {
  // Feature: digital-mandir-home, Property 1: Aarti picker only returns safe, matching aartis
  it("Property 1: only returns verified, non-blank-lyric, weekday-matching entries; invalid weekday -> null", () => {
    fc.assert(
      fc.property(
        aartiListArb,
        fc.oneof(
          fc.integer({ min: -5, max: 12 }),
          fc.double(),
          fc.constant(NaN),
          fc.constant(Infinity),
          fc.constant(-Infinity),
        ),
        (aartis, weekday) => {
          const result = pickTodaysAarti(weekday, aartis);

          if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
            expect(result).toBeNull();
            return;
          }

          if (result === null) return;

          expect(result.verified).toBe(true);
          expect(result.lyrics.some((line) => line.trim() !== "")).toBe(true);
          expect(result.weekdays.includes(weekday)).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: digital-mandir-home, Property 2: finds the first match; nothing verified means nothing shown
  it("Property 2: returns the first matching entry in list order; all-unverified -> null; shipped AARTIS -> null every day", () => {
    fc.assert(
      fc.property(aartiListArb, fc.integer({ min: 0, max: 6 }), (aartis, weekday) => {
        const result = pickTodaysAarti(weekday, aartis);

        // Independently compute the expected first match in list order.
        const expected =
          aartis.find(
            (a) =>
              a.verified === true &&
              a.lyrics.some((line) => line.trim() !== "") &&
              a.weekdays.includes(weekday),
          ) ?? null;

        expect(result).toEqual(expected);

        // A list where nothing is verified must yield null on every weekday.
        const allUnverified = aartis.map((a) => ({ ...a, verified: false }));
        for (let d = 0; d <= 6; d++) {
          expect(pickTodaysAarti(d, allUnverified)).toBeNull();
        }
      }),
      { numRuns: 100 },
    );
  });

  // Example asserts on the shipped config.
  it("AARTIS ships the four ids, all unverified, and yields null on all 7 weekdays", () => {
    expect(AARTIS.map((a) => a.id).sort()).toEqual([...AARTI_IDS].sort());
    for (const a of AARTIS) {
      expect(a.verified).toBe(false);
    }
    for (let d = 0; d <= 6; d++) {
      expect(pickTodaysAarti(d)).toBeNull();
    }
  });

  it("each weekday 0..6 maps to exactly one AARTIS entry via its weekdays array", () => {
    for (let d = 0; d <= 6; d++) {
      const matches = AARTIS.filter((a) => a.weekdays.includes(d));
      expect(matches).toHaveLength(1);
    }
    // And the plan is exactly the documented mapping.
    const planById: Record<number, AartiId> = {
      0: "om-jai-jagdish",
      1: "shiv",
      2: "hanuman",
      3: "om-jai-jagdish",
      4: "om-jai-jagdish",
      5: "durga",
      6: "hanuman",
    };
    for (let d = 0; d <= 6; d++) {
      const entry = AARTIS.find((a) => a.weekdays.includes(d));
      expect(entry?.id).toBe(planById[d]);
    }
  });
});
