# Implementation Plan: Digital Mandir Home

## Overview

Build the digital mandir home page in small, buildable steps. Order: install the test library, pure libraries with their property tests, small component changes, new components, the Darshan backdrop, the page rewrite, the `/aashirwad` page and header link, translations, then the verified deletions, then a final check. Language: TypeScript (Next.js 16.3, React, Vitest).

## Rules for the implementer (read first)

- Windows and PowerShell. Use the `cwd` parameter on every command. Never use `cd`.
- The terminal output lags by about one command. Redirect output to log files (for example `npm run build *> build-home.log`) and read the log file to confirm results.
- AGENTS.md says this Next.js (16.3.0) has breaking changes. Before writing code, read the relevant guides in `node_modules/next/dist/docs/` (route segment config `revalidate`, `metadata`, `next/link`, `next/image`).
- Do NOT kill the dev server running on port 3000.
- Do not type prices in components. Use `ctaPriceLabel` through `buildBuyLadder` (the `cta-scan` test checks this).
- Do not invent any aarti lyrics, Pandit Ji details or image files. Config starts empty or unverified.
- Run `npm test`, `npm run build` and the type check only as logged commands (no watch mode).

## Tasks

- [x] 1. Test tooling
  - [x] 1.1 Install fast-check pinned
  - Run `npm install --save-dev --save-exact fast-check@4.10.2 --legacy-peer-deps`. Note: this project used `--legacy-peer-deps` before for vitest, so keep it here.
  - Confirm `package.json` shows `"fast-check": "4.10.2"` with no `^`.
  - Confirm `vitest.config.ts` still runs `src/**/*.test.ts` in the `node` environment. Do not add jsdom.
  - _Requirements: 12.3_

- [x] 2. Aarti library
  - [x] 2.1 Create aarti types, config and picker
    - Create `src/lib/aarti/types.ts`, `config.ts`, `pick.ts` as in the design (`AartiConfig`, `VerifiedAarti`, `AARTIS` with hanuman, shiv, durga, om-jai-jagdish, all `verified: false`, `lyrics: []`, weekday plan from the design table).
    - `pickTodaysAarti(weekday, aartis = AARTIS)` returns `null` for invalid weekdays, ignores unverified entries and entries with no non-blank lyric line, and returns the first match in config order.
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.6, 10.3, 13.3_
  - [x]* 2.2 Write property tests for the aarti picker
    - File `src/__tests__/aarti-pick.test.ts`. Use `fc.assert(fc.property(...), { numRuns: 100 })`.
    - **Property 1: Aarti picker only returns safe, matching aartis**
    - **Property 2: Aarti picker finds the first match, and nothing verified means nothing shown**
    - Add example checks: `AARTIS` has the four ids, all `verified: false`, every weekday 0..6 maps to exactly one entry.
    - Tag each test: `Feature: digital-mandir-home, Property N: ...`
    - **Validates: Requirements 4.1, 4.2, 4.4, 4.5, 4.6, 10.3, 13.3**

- [x] 3. Pandit library
  - [x] 3.1 Create Pandit config and pure helpers
    - Create `src/config/pandit.ts` with `PanditProfile` and an empty `PANDIT = {}`.
    - Create `src/lib/pandit.ts` with `getVisiblePanditFields` (name gate, trim, years 1..80 integer, languages filtered) and `buildBuyLadder(priceLabel = ctaPriceLabel)` returning the three offers in the design order with the fixed hrefs.
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.8, 6.9, 6.10, 6.11, 6.12, 6.13, 13.1_
  - [x]* 3.2 Write property tests for Pandit helpers
    - File `src/__tests__/pandit.test.ts`.
    - **Property 3: Pandit fields show only real values and hide everything else**
    - **Property 4: Pandit field filtering is idempotent**
    - **Property 5: Buy ladder keeps its order and takes prices only from the price source**
    - Add examples: empty `PANDIT` gives `{}`; the three hrefs; default labels match `getServicePrice` and contain `₹`.
    - **Validates: Requirements 6.2, 6.3, 6.4, 6.5, 6.8, 6.9, 6.10, 6.11, 6.12, 6.13, 11.6, 13.1**

- [x] 4. Surface assignment library
  - [x] 4.1 Create `src/lib/home-surfaces.ts`
    - Export `SectionKey`, `Surface`, `assignSurfaces(keys)` (festivals always `saffron`, others alternate `bronze`/`obsidian` across the festival section) and `glassClass(surface)` returning the 85% glass class strings with `backdrop-blur-[6px] md:backdrop-blur-md` (no `will-change`).
    - _Requirements: 1.2, 1.4, 14.11_
  - [x]* 4.2 Write property test for surface assignment
    - File `src/__tests__/home-surfaces.test.ts`.
    - **Property 6: Neighbouring sections never share a surface**
    - **Validates: Requirements 1.2, 1.4**

- [x] 5. Darshan library and config
  - [x] 5.1 Create darshan picker, config and image folder
    - Create `src/config/darshan.ts` with `AVAILABLE_DARSHAN: DeityKey[] = []` and a comment that the Owner adds a key only after adding the file.
    - Create `src/lib/darshan.ts` with `DeityKey`, `DARSHAN_BY_WEEKDAY`, `pickDarshanImage`, `ResolvedDarshan`, `resolveDarshan` as in the design (Mon shiv, Tue and Sat hanuman, Fri durga, other days vishnu; invalid weekday gives `null`; unlisted key gives `null`).
    - Do NOT create or invent any `.jpg`. The Owner supplies `public/images/darshan/{shiv,hanuman,durga,vishnu}.jpg`.
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.16, 14.17, 14.18_
  - [x]* 5.2 Write property tests for the darshan library
    - File `src/__tests__/darshan.test.ts`.
    - **Property 7: Darshan picker is total and follows the weekday table**
    - **Property 8: Darshan picker rejects invalid weekdays**
    - **Property 9: Darshan image is returned only when its file is listed**
    - Add examples: every key in `AVAILABLE_DARSHAN` has a file at `public/images/darshan/<key>.jpg` (use `fs` in the node test); contrast of ink `#2A1810` over ivory `#FBF6EC` at 85% over black is at least 4.5.
    - **Validates: Requirements 14.1, 14.2, 14.3, 14.4, 14.12, 14.18**

- [x] 6. Checkpoint - Ensure all tests pass
  - Run `npm test` with output redirected to `test-home.log` and read it. Ensure all tests pass, ask the user if questions arise.

- [x] 7. Update existing bell components
  - [x] 7.1 Add `reduceMotion` and `ariaLabel` to `RealisticTempleBell3D`
    - Read the file first. Add two optional props. Defaults keep today's behaviour so `GlassAstralPanchang` is unchanged.
    - When `reduceMotion` is true: no idle sway, no swing keyframes, no sound-wave rings; sound still plays. Keep `role="button"`, `tabIndex`, Enter and Space handling.
    - _Requirements: 2.3, 2.4, 2.5, 11.4_
  - [x] 7.2 Update `TempleBellStrip`
    - Add `embedded?: boolean` (no own `<section>` or surface class when true). Move strings to `useT()` keys `bell.hint`, `bell.rung`, `bell.label`. Pass `useReducedMotion()` and `ariaLabel` to the bell. Clear its `setTimeout` on unmount. Keep `playTempleBellResonance(432)`.
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 11.7_

- [x] 8. Update TodaysPaath and AashirwadStrip
  - [x] 8.1 Add `surface` prop to `TodaysPaath`
    - Optional prop, default `obsidian`; use `glassClass(surface)`. Keep paath output identical for the same weekday.
    - _Requirements: 3.2, 3.3, 3.5, 14.11_
  - [x] 8.2 Change `AashirwadStrip` to link to `/aashirwad`
    - Replace the scroll button with `next/link` to `/aashirwad`, same text, same ₹11 and same `pixelContact("aashirwad_strip_11")`. Accept a `surface` prop.
    - _Requirements: 7.2, 7.3_

- [x] 9. New home components
  - [x] 9.1 Create `DarshanBackdrop`
    - `src/components/home/DarshanBackdrop.tsx`. Returns `null` when `darshan` is `null`. Otherwise one `div` with `fixed inset-0 z-0 pointer-events-none` and `aria-hidden="true"`, holding one `next/image` with `fill`, `priority`, `sizes="100vw"`, `alt=""`, `object-cover`.
    - No `background-attachment`, no `will-change`, no scroll listener, no transform. Optional one-time `opacity` fade only when reduced motion is off.
    - _Requirements: 14.3, 14.4, 14.6, 14.7, 14.8, 14.9, 14.13, 14.14, 14.15_
  - [x] 9.2 Create `WelcomeSection`
    - `src/components/home/WelcomeSection.tsx` (client). Props `{ surface, hasDarshan }`. Only `h1` with `मंदिर में आपका स्वागत है`, sub text via `t("welcome.sub")`, then `<TempleBellStrip embedded />`, all inside an ivory glass panel over the lower part of a `min-h-[88svh]` section when `hasDarshan` is true. One `opacity` + `y` entrance, off for reduced motion. No live counts or timers.
    - _Requirements: 2.1, 2.2, 2.6, 2.7, 11.8, 14.10_
  - [x] 9.3 Create `AartiSection`
    - `src/components/home/AartiSection.tsx` (client). Props `{ aarti: VerifiedAarti; weekday; surface }`. Heading, lyric lines, Diya_Button (`<button type="button">` with `aria-label`), diya-wave with only `transform` and `opacity`, reduced-motion glow instead, optional `<audio preload="none">` with `onError` removing the control.
    - _Requirements: 4.7, 4.8, 4.9, 4.10, 4.11, 4.12, 4.13_
  - [x] 9.4 Create `PanditCard`
    - `src/components/home/PanditCard.tsx` (client). Props `{ profile, offers, surface }`. Heading `पंडित जी`, visible fields only, photo only if `photoSrc` (with `onError` removal), three promises via `useT()`, three offer links with `min-h-[44px]` and `focus-visible:ring-2`. No ratings, reviews, counts, "live", countdown or typed prices.
    - _Requirements: 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.14, 10.1_

- [x] 10. Rewrite the home page
  - [x] 10.1 Rewrite `src/app/page.tsx`
    - Read the file first. Keep `export const revalidate = 3600`. Compute `weekday = istWeekday(serverNow)`, `todayYmd`, festivals, `getTodaysPaath`, `pickTodaysAarti`, `resolveDarshan`, `assignSurfaces`.
    - Wrap content in `<div className="relative isolate">` with `<DarshanBackdrop />` then `<div className="relative z-10">` holding `FestivalDayRibbon`, Welcome, seams and the sections in the design order. The wrapper must have no `transform`, `filter` or `overflow` clipping.
    - Remove all imports of Removed_Sections and `Hero`. Stop calling `getDailyPanchang`.
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 4.3, 5.1, 7.1, 8.1, 8.2, 8.3, 8.5, 14.5_

- [ ] 11. Aashirwad page and header link
  - [x] 11.1 Create `/aashirwad` page
    - `src/app/aashirwad/page.tsx` (server). Short `<h1>` "आज का आशीर्वाद", `<RashiToday serverNow={getServerNow()} />`, exported `metadata`.
    - _Requirements: 7.4_
  - [ ] 11.2 Point the header link to `/aashirwad`
    - In `src/components/layout/Header.tsx`, change `/#rashi-today` to `/aashirwad`. Search `src` for any other `#rashi-today` link and update it.
    - _Requirements: 7.5_

- [x] 12. Translations
  - [x] 12.1 Add new keys to `src/lib/translations.ts`
    - Add `en` and `hi` for: `welcome.sub`, `bell.hint`, `bell.rung`, `bell.label`, `aarti.eyebrow`, `aarti.diya_label`, `aarti.audio_play`, `aarti.audio_pause`, `pandit.title`, `pandit.promise.1..3`, `pandit.offer.quick.title`, `pandit.offer.guidance.title`, `pandit.offer.sankalp.title`, `pandit.field.city`, `pandit.field.years`, `pandit.field.languages`. Match the existing entry shape.
    - _Requirements: 11.7_

- [ ] 13. Contract test
  - [x]* 13.1 Write `src/__tests__/home-page-contract.test.ts`
    - File-read tests in the style of `preservation.test.ts`: `page.tsx` has no import of any deleted component, exports `revalidate = 3600`, imports `istWeekday`; only the Welcome file has `<h1`; `PanditCard.tsx` and `AartiSection.tsx` have no banned words and no `₹` followed by digits; `DarshanBackdrop.tsx` has `fixed`, `priority`, `sizes="100vw"`, `alt=""` and none of `background-attachment`, `will-change`, `useScroll`; home sources have no blur above 8px below `md`; every relative or `@/` import under `src` resolves to an existing file.
    - _Requirements: 2.7, 6.7, 8.2, 8.5, 10.1, 11.6, 14.8, 14.9, 14.13_

- [ ] 14. Checkpoint - Ensure all tests pass
  - Run `npm test` and `npm run build` with output redirected to log files and read them. Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Verified deletions
  - [ ] 15.1 Re-verify and delete list A (home components removed from the page)
    - Before deleting each file, re-run a repo-wide search (static imports, `import(`, `next/dynamic`, `src/__tests__`, string paths, `scripts`, `docs`, `public`). Delete only files with zero importers outside the delete set. Files: `Hero`, `AstrologerRoster`, `TestimonialCarousel`, `PractitionerBio`, `CelestialLiveTicker`, `ChooseByConcern`, `VerifiedDelivery`, `FreeToolsRow`, `PricingGrid` (under `src/components/home`), `home/3d/HeroCanvas`, `home/3d/CosmicGalaxy`, `home/3d/GlassMandala`, `ui/Reveal3D`.
    - If a file still has an importer, keep it and note it in the design list.
    - _Requirements: 9.1, 9.3, 9.4, 9.5, 9.8_
  - [ ] 15.2 Re-verify and delete list B (existing orphans in `src/components/home`)
    - Same method for: `AppShowcase`, `DigitalChadhava`, `FinalCta`, `GuidanceCategories`, `HowItWorks`, `InlineAskField`, `InteractiveTopics`, `LiveActivityFeed`, `PanchangHeader`, `RashiCalculator`, `ReferralBanner`, `SampleGuidance`, `SanctuaryTransitionBridge`, `SocialProof`, `Testimonials`, `TodayAuspicious`, `TraditionalServices`, `TrustPersonas`, `TrustPillarsStrip`, `VedicIntro`, `VedicToolsAndReportLookup`, `WhyChoose`.
    - Never delete the KEPT files: `RashiToday`, `QuickUnlockModal`, `Rashi3DCanvas`, `RashiMedallionCard`, `zodiac-data`, `shubhmarg-assets`, calendar components, `RealisticTempleBell3D`, `celestialAudio`.
    - _Requirements: 9.1, 9.3, 9.4, 9.6_
  - [ ] 15.3 Re-verify and delete list C (helpers) and list D (images)
    - Re-scan after 15.1 and 15.2. Helpers: `ui/TiltCard`, `ui/VedicArtifactIcon`, `ui/SectionHeading`, `icons/CommunicationIcon`, `ConfidentialityIcon`, `HonestIcon`, `FestivalIcon`, `LunarMonthIcon`, `NakshatraIcon`, `LotusIcon`. Keep `ui/PremiumVedicIcon`.
    - Images under `public/images/guidance/` (the 8 category images, `cta-incense.jpg`, `cta-lotus.jpg`) and `ornamental-lotus.jpg`: search the whole repo for each path (src, scripts, docs, public, `*.json`, `*.css`, `*.md`) and delete only files with no hit.
    - Do not touch `public/images/darshan/` or `public/images/paath/`.
    - _Requirements: 9.2, 9.3, 9.4_
  - [ ] 15.4 Remove proven-unused translation keys
    - Only for key families `hero.*`, `stats.*`, `concern.*`, `roster.*`, `pricing.*`, `bio.*`, `testimonials.*`, `tools.*`. Remove a key only after a script proves: no `t("key")` or `t('key')` literal in `src`, no template/prefix use, no test use. Keep `day.*` and `paath.*`. If unsure, keep the key.
    - _Requirements: 9.7_

- [ ] 16. Final checkpoint - lint, type check, tests, build
  - Run `npm run lint`, then `npx tsc --noEmit`, then `npm test`, then `npm run build`, each redirected to its own log file in the project root. Read each log.
  - Confirm: lint and tsc clean, all 43 old tests plus the new tests pass (including `cta-scan`), build has zero errors, and `/aashirwad` appears in the route list.
  - Delete the temporary log files afterwards. Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP. They are marked optional because this workflow always marks test sub-tasks optional. Requirement 12.3 asks for these tests, so run them unless the Owner says to skip.
- Each task references specific requirements for traceability.
- Property tests use fast-check 4.10.2 with at least 100 runs and a `Feature: digital-mandir-home, Property N` comment tag.
- The Owner supplies the four deity images, the Pandit Ji details, aarti lyrics and audio. Until then the page works with them empty.
- Manual checks (not automatable): one `h1` on `/`, no horizontal scroll at 360 px, keyboard use of bell and diya, reduced-motion behaviour, text contrast on glass cards, fixed backdrop on iOS Safari, `/aashirwad` opens the ₹11 flow, header link works.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1", "5.1", "7.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.2", "5.2", "7.2", "9.1", "12.1"] },
    { "id": 3, "tasks": ["8.1", "8.2", "9.2", "9.3", "9.4"] },
    { "id": 4, "tasks": ["10.1", "11.1"] },
    { "id": 5, "tasks": ["11.2", "13.1"] },
    { "id": 6, "tasks": ["15.1"] },
    { "id": 7, "tasks": ["15.2"] },
    { "id": 8, "tasks": ["15.3"] },
    { "id": 9, "tasks": ["15.4"] }
  ]
}
```
