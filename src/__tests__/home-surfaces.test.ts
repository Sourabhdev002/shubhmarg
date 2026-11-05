import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { assignSurfaces } from "@/lib/home-surfaces";
import type { SectionKey } from "@/lib/home-surfaces";

const ALL_KEYS: SectionKey[] = ["welcome", "paath", "aarti", "festivals", "pandit", "aashirwad"];

// An arbitrary ordered subset (no repeats) of the six section keys.
const orderedSubsetArb = fc
  .subarray(ALL_KEYS, { minLength: 0, maxLength: ALL_KEYS.length })
  .chain((subset) => fc.shuffledSubarray(subset, { minLength: subset.length, maxLength: subset.length }));

describe("assignSurfaces", () => {
  // Feature: digital-mandir-home, Property 6: Neighbouring sections never share a surface
  it("Property 6: festivals is always saffron; no two adjacent sections share a surface", () => {
    fc.assert(
      fc.property(orderedSubsetArb, (keys) => {
        const surfaces = assignSurfaces(keys as SectionKey[]);

        // Every section gets a surface.
        for (const key of keys) {
          expect(surfaces[key]).toBeDefined();
        }

        // festivals is always saffron when present.
        if (keys.includes("festivals")) {
          expect(surfaces["festivals"]).toBe("saffron");
        }

        // No two neighbours share a surface.
        for (let i = 1; i < keys.length; i++) {
          expect(surfaces[keys[i]]).not.toBe(surfaces[keys[i - 1]]);
        }
      }),
      { numRuns: 100 },
    );
  });

  it("example: welcome/paath/aarti/festivals/pandit/aashirwad alternates with saffron festivals", () => {
    const out = assignSurfaces(ALL_KEYS);
    expect(out).toEqual({
      welcome: "obsidian",
      paath: "bronze",
      aarti: "obsidian",
      festivals: "saffron",
      pandit: "obsidian",
      aashirwad: "bronze",
    });
  });
});
