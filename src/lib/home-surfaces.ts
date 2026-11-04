// Feature: digital-mandir-home
// Pure surface-assignment logic for the home page sections.
// Tested by Property 6 (src/__tests__/home-surfaces.test.ts).

export type SectionKey =
  | "welcome"
  | "paath"
  | "aarti"
  | "festivals"
  | "pandit"
  | "aashirwad";

export type Surface = "bronze" | "obsidian" | "saffron";

/**
 * Assign a glass surface to each section in order.
 *
 * Rules:
 * - `festivals` is always `saffron` (its fixed wash tint).
 * - Every other section alternates `obsidian` / `bronze` in order, starting
 *   with `obsidian` for the first non-festival section.
 * - The alternation toggle CONTINUES across the festival section: festivals
 *   takes a toggle slot, so the sections on either side of it never match.
 *
 * Guarantee: for any input subset, no two ADJACENT keys share a surface.
 */
export function assignSurfaces(keys: SectionKey[]): Record<string, Surface> {
  const result: Record<string, Surface> = {};
  // `slot` toggles every section (including festivals) so neighbours differ.
  // Even slot -> obsidian, odd slot -> bronze for non-festival sections.
  let slot = 0;
  for (const key of keys) {
    if (key === "festivals") {
      result[key] = "saffron";
    } else {
      result[key] = slot % 2 === 0 ? "obsidian" : "bronze";
    }
    slot += 1;
  }
  return result;
}

/**
 * Tailwind background classes for an 85%-opacity glass card with light blur.
 * 6px blur on mobile (cap is 8px), md:backdrop-blur-md above. No `will-change`.
 * Ink text (#2A1810) stays readable on every tint.
 */
export function glassClass(surface: Surface): string {
  switch (surface) {
    case "obsidian":
      return "bg-[#FBF6EC]/85 backdrop-blur-[6px] md:backdrop-blur-md";
    case "bronze":
      return "bg-[#F5EAD6]/85 backdrop-blur-[6px] md:backdrop-blur-md";
    case "saffron":
      return "bg-[#F5A623]/85 backdrop-blur-[6px] md:backdrop-blur-md";
  }
}
