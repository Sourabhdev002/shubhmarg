import { describe, it, expect } from "vitest";
import fc from "fast-check";
import fs from "node:fs";
import path from "node:path";
import { pickDarshanImage, resolveDarshan, DARSHAN_BY_WEEKDAY } from "@/lib/darshan";
import type { DeityKey } from "@/lib/darshan";
import { AVAILABLE_DARSHAN } from "@/config/darshan";

const ALL_DEITIES: DeityKey[] = ["shiv", "hanuman", "durga", "vishnu"];

describe("pickDarshanImage / resolveDarshan", () => {
  // Feature: digital-mandir-home, Property 7: Darshan picker is total and follows the weekday table
  it("Property 7: for weekday 0..6 returns a known deity matching the table", () => {
    const expected: Record<number, DeityKey> = {
      0: "vishnu",
      1: "shiv",
      2: "hanuman",
      3: "vishnu",
      4: "vishnu",
      5: "durga",
      6: "hanuman",
    };
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 6 }), (weekday) => {
        const key = pickDarshanImage(weekday);
        expect(key).not.toBeNull();
        expect(ALL_DEITIES).toContain(key as DeityKey);
        expect(key).toBe(expected[weekday]);
        expect(key).toBe(DARSHAN_BY_WEEKDAY[weekday]);
      }),
      { numRuns: 100 },
    );
  });

  // Feature: digital-mandir-home, Property 8: Darshan picker rejects invalid weekdays
  it("Property 8: non-integer / out-of-range weekday -> null for both picker and resolver", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.integer({ min: -50, max: -1 }),
          fc.integer({ min: 7, max: 50 }),
          fc.double().filter((d) => !Number.isInteger(d)),
          fc.constant(NaN),
          fc.constant(Infinity),
          fc.constant(-Infinity),
          fc.constant(0.5),
          fc.constant(3.5),
        ),
        (weekday) => {
          expect(pickDarshanImage(weekday)).toBeNull();
          expect(resolveDarshan(weekday)).toBeNull();
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: digital-mandir-home, Property 9: Darshan image is returned only when its file is listed
  it("Property 9: resolveDarshan returns non-null only when the picked key is in the available list", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 6 }),
        fc.subarray(ALL_DEITIES, { minLength: 0, maxLength: ALL_DEITIES.length }),
        (weekday, available) => {
          const key = pickDarshanImage(weekday);
          const result = resolveDarshan(weekday, available);

          if (key !== null && available.includes(key)) {
            expect(result).toEqual({ key, src: `/images/darshan/${key}.jpg` });
          } else {
            expect(result).toBeNull();
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("example: every available darshan key has its image file on disk", () => {
    for (const key of AVAILABLE_DARSHAN) {
      const file = path.join(process.cwd(), "public", "images", "darshan", `${key}.jpg`);
      expect(fs.existsSync(file)).toBe(true);
    }
  });
});
