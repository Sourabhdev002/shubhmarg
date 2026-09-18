# Implementation Plan: Premium Unified Iconography System

## Overview

Build a lightweight, inline-SVG icon layer (`ServiceIcon` + icon registry) and a
single-source-of-truth service data module, then refactor `MobileMenu.tsx` to
consume them so every service/tool row shows a bespoke gold-ring chip glyph with
**no emoji and no raster**. The 44 menu items (6 `SACRED_SERVICES` + 38
`VEDIC_TOOLS`) map to icon keys: 27 reuse existing bespoke keys and 17 receive new
hand-drawn glyphs sharing one gold stroke weight on a common key-shape grid, all
drawn with `currentColor`. Tasks build bottom-up (registry union → glyphs →
resolver → chip component → data module → menu refactor → verification) so each
step compiles on the previous one and nothing is orphaned.

Implementation language: **TypeScript / React** (per the design's typed interfaces
and existing project stack — Next.js, framer-motion, `@/utils/cn`).

## Tasks

- [ ] 1. Scaffold registry key surface and titles
  - [ ] 1.1 Create `src/components/ui/service-icons/registry.ts` type surface
    - Create the `service-icons` directory and `registry.ts` file
    - Import `PremiumVedicIconName` from `@/components/ui/PremiumVedicIcon`
    - Define and export the `ServiceIconName` string-literal union: the 21 existing reused keys + the 17 new keys + the 6 sacred-list keys, exactly as enumerated in the design's core types
    - Define and export `IconResolution` as the discriminated union `{ kind: "svg"; Glyph } | { kind: "default"; Glyph }` (Glyph typed `React.FC<{ className?: string }>`)
    - Export `SERVICE_ICON_TITLES: Record<ServiceIconName, string>` with a human-readable title for every member of the union
    - _Requirements: 4.4, 6.1, 10.1_

- [ ] 2. Author the bespoke inline-SVG glyph set
  - [ ] 2.1 Create shared glyph scaffolding in `src/components/ui/service-icons/glyphs.tsx`
    - Add the `"use client"` directive is not required (pure SVG), keep it a plain module of `React.FC<{ className?: string }>` components
    - Establish ONE shared glyph convention: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, a single shared `strokeWidth`, `strokeLinecap="round"`, `strokeLinejoin="round"`, transparent background, so every glyph shares one stroke weight and one key-shape grid
    - Author the single neutral `DefaultGlyph` (e.g. a sparkle/asterisk) on the same grid as the last-resort safety net
    - _Requirements: 2.2, 4.2, 6.2, 7.2, 8.1_

  - [ ] 2.2 Draw the 17 NEW-SVG bespoke glyphs on the shared grid
    - Author distinct inline-SVG path glyphs for each new key, each depicting its temple/Vedic motif per the design's mapping table: `sacred-offerings` (diya flame over bowl), `temple-puja` (shikhara/mandir arch), `tatkal-express` (bolt through a bell), `voice-dossier` (conch/shankh), `annual-varshphal` (open pothi/almanac), `rajayoga-scanner` (crown/throne), `yoni-wheel` (27-spoke star wheel), `vastu-compass` (8-direction compass rose), `karmic-rin-resolver` (balance scale), `shani-sade-sati` (shield), `navamsha-d9` (twin lotus), `pitru-vault` (vault door/kalash), `yantra-altar` (Sri Yantra triangles), `sound-sanctuary` (Om/waveform), `prasad-tracker` (offering thali/parcel), `kundli-xray` (North-Indian kundli chart), `kuldevta-resolver` (temple shrine), `baby-cosmic` (cradle under star), `graha-sos` (alert planet/beacon), `kaal-sarp` (coiled serpent), `wealth-calendar` (calendar with coin/lotus), `raksha-kavach` (kavach amulet)
    - Reuse a single glyph for keys sharing a motif per the table (`deepdaan-sanctum` and `energized-gemstone` map to the diya/gem motifs), keeping the set coherent — all on the same stroke weight and grid
    - _Requirements: 6.1, 6.2, 2.2_

  - [ ]* 2.3 Write unit test asserting new glyphs share the stroke/grid convention
    - Render each new glyph and assert its root `<svg>` uses the shared `viewBox`, `stroke="currentColor"`, and the shared `strokeWidth` (no per-glyph divergence)
    - _Requirements: 6.2, 2.4_

- [ ] 3. Wire the glyph map and resolver into the registry
  - [ ] 3.1 Build the bespoke glyph map covering every key
    - In `registry.ts`, import the new glyphs from `glyphs.tsx` and wire the 27 REUSE keys to their bespoke art/glyphs, producing a `Record<ServiceIconName, React.FC<{ className?: string }>>` that covers every enumerated key with no gaps
    - _Requirements: 6.1, 6.3_

  - [ ] 3.2 Implement `resolveIcon`
    - Export `resolveIcon(key: ServiceIconName): IconResolution` returning `{ kind: "svg", Glyph }` for any key present in the map, and `{ kind: "default", Glyph: DefaultGlyph }` for an unknown (non-union) key; never null, never raster, never emoji
    - Emit a dev-only warning on the unknown-key path
    - _Requirements: 4.1, 4.2, 4.3, 10.1_

  - [ ]* 3.3 Write property test for total bespoke coverage
    - **Property P2: total bespoke coverage** — for every `ServiceIconName`, `resolveIcon(key).kind === "svg"` with a renderable glyph; a synthetic unknown key yields `kind === "default"`
    - **Validates: Requirements 4.1, 4.2, 4.3, 6.1**

- [ ] 4. Build the ServiceIcon chip component
  - [ ] 4.1 Create `src/components/ui/service-icons/ServiceIcon.tsx`
    - Accept props `{ iconKey: ServiceIconName; size?: number (default 30); className?: string; ariaLabel?: string }`
    - Call `resolveIcon(iconKey)`, render the returned `Glyph` at ~60% of chip size inside a circular `role="img"` chip: ivory `#FFFDF8` fill, `#B8860B` gold ring, saffron glyph via `currentColor` (`text-[#C25E10]`) — never a dark boxed tile
    - Derive `aria-label` from `ariaLabel ?? SERVICE_ICON_TITLES[iconKey]`
    - Apply GPU-safe hover: animate only `transform` (`group-hover:scale-105`), disabled via `motion-reduce:transform-none`; never animate width/height/box-shadow/top/left/margin/padding
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 5.1, 5.2, 5.3, 5.4, 7.1, 7.2, 8.1_

  - [ ]* 4.2 Write property test for bright chip + motion safety
    - **Property P4: bright chip** — chip renders ivory fill + `#B8860B` ring + saffron `currentColor` glyph, never a dark box
    - **Property P5: motion-safe** — only `transform` animates on hover; reduced-motion disables it
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 2.3, 2.4**

  - [ ]* 4.3 Write unit tests for ServiceIcon a11y and scaling
    - Assert `aria-label` falls back to the title and honors a supplied `ariaLabel`; assert the glyph renders as inline SVG at a custom `size` with no `<img>`/network request
    - _Requirements: 7.1, 7.2, 8.1_

- [ ] 5. Checkpoint - Ensure icon layer compiles and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Create the single-source-of-truth service data module
  - [ ] 6.1 Create `src/data/services.ts`
    - Export the `ServiceEntry` interface `{ name: string; href: string; iconKey: ServiceIconName; highlight?: boolean }`, importing `ServiceIconName` from the registry
    - Export `SACRED_SERVICES: ServiceEntry[]` (6 items) and `VEDIC_TOOLS: ServiceEntry[]` (38 items) exactly per the design's enumerated mapping table, with emoji-free `name`, `href` beginning with `/`, and the correct `iconKey` per row
    - _Requirements: 1.1, 3.1, 3.4, 10.2_

  - [ ]* 6.2 Write property test for emoji-free names
    - **Property P1: no emoji** — for every entry in `SACRED_SERVICES ∪ VEDIC_TOOLS`, `name` contains no emoji/pictographic characters (regex assertion)
    - **Validates: Requirements 1.1**

  - [ ]* 6.3 Write unit tests for data-module invariants
    - Assert every `href` begins with `/` and every entry has an `iconKey` that resolves to `kind: "svg"`
    - _Requirements: 3.1, 3.4, 4.1_

- [ ] 7. Refactor MobileMenu to consume the icon layer and data module
  - [ ] 7.1 Replace inline arrays with imports and render leading chips
    - Delete the two inline `SACRED_SERVICES` / `VEDIC_TOOLS` arrays from `MobileMenu.tsx`; import them from `@/data/services`
    - Import `ServiceIcon` and render `<ServiceIcon iconKey={item.iconKey} size={28} />` as the leading element of every sacred-service and tool row
    - Preserve the card-less row layout, spacing, `highlight` treatment, and the trailing `ChevronRight` on tool rows; keep `group` classes so hover reaches the chip
    - _Requirements: 2.1, 3.2, 3.3, 9.1, 9.2, 7.3_

  - [ ] 7.2 Replace the quick-links and header emoji with bespoke glyphs
    - Replace the `📅` (calendar) and `💬` (chat/support) emoji in the quick-links banner and the `🔮` tools-section-header emoji with bespoke inline-SVG glyphs (reuse suitable registry glyphs or the shared glyph set), so no emoji remains anywhere in the menu
    - _Requirements: 1.2, 1.3, 9.3, 9.4_

  - [ ]* 7.3 Write test that the menu holds no inline data and no emoji
    - **Property P3: single source** — assert `MobileMenu` imports arrays from `@/data/services` and defines no inline service/tool array or hardcoded icon
    - Assert the rendered menu output contains no emoji/pictographic characters in names, headers, or quick-links labels
    - _Requirements: 1.2, 1.3, 3.2, 3.3_

- [ ] 8. Final checkpoint - Build and verify
  - [ ] 8.1 Run `npm run build` and verify a clean, emoji-free menu
    - Run `npm run build`; confirm it completes with zero errors
    - Grep `MobileMenu.tsx` and `services.ts` to confirm no emoji/pictographic characters remain and no inline service arrays exist in the menu
    - _Requirements: 8.2, 8.3, 1.3, 3.3_

## Notes

- Tasks marked with `*` are optional (unit/property tests) and can be skipped for a faster MVP; core implementation tasks are never optional.
- Property tests P1–P5 come directly from the design's Correctness Properties section; each is its own sub-task placed next to the code it validates.
- Each task references specific requirement clauses for traceability.
- Checkpoints ensure incremental validation before moving on.
- The 17 new glyphs MUST share one stroke weight and one key-shape grid and use `currentColor`; the neutral default glyph is a last-resort safety net only (never emoji, never raster).
- No deployment, no device testing, no asset generation — code only. Header mega-dropdown and `/services` reuse are out of scope for this task set.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1"] },
    { "id": 1, "tasks": ["2.2"] },
    { "id": 2, "tasks": ["2.3", "3.1"] },
    { "id": 3, "tasks": ["3.2", "4.1"] },
    { "id": 4, "tasks": ["3.3", "4.2", "4.3", "6.1"] },
    { "id": 5, "tasks": ["6.2", "6.3", "7.1"] },
    { "id": 6, "tasks": ["7.2"] },
    { "id": 7, "tasks": ["7.3", "8.1"] }
  ]
}
```
