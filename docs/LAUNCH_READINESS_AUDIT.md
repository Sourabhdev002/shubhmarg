# ShubhMarg — Launch-Readiness Audit

Investigation-only report. No code was changed. All findings cite lines actually read.
Base path omitted for brevity; all paths are relative to `source/`.

**Headline:** The bright temple conversion is largely incomplete. The home page and ~44 tool
pages still render the old dark theme end-to-end. Two dead MobileMenu variants and heavy emoji
in nav/footer remain. One real prod security gap: the Telegram webhook fails **open** when no
secret is set.

---

## 1. DARK-THEME LEFTOVERS

### Blockers — whole pages still dark

**BLOCKER — Home page root is dark**
`src/app/page.tsx:26` — root `<div className="bg-[#0B0705] text-[#FFEAA7] ...">`. The entire
homepage renders on near-black with pale gold text. Every child section inherits this.
Fix: switch to `bg-[#FBF6EC] text-[#2A1810]` (or the `.surface-obsidian` ivory class) and let
sections alternate surfaces.

**BLOCKER — ~44 tool pages are full-page dark**
Every tool page uses the same signature wrapper: `min-h-screen bg-gradient-to-b from-[#0x...] ... text-[#f7f3eb]`. These are the old dark theme, not converted. Confirmed 44 pages via file scan, including:
`yoni-wheel:13`, `yantra-altar:13`, `wealth-calendar:13`, `vastu-compass:13`, `vastu-scanner`,
`spouse-predictor:13`, `shani-sade-sati:14`, `raksha-kavach:13`, `rajayoga-scanner:13`,
`pitru-vault:13`, `past-life-reader:13`, `navamsha-d9:13`, `muhurta-finder:13`,
`manglik-rescue:13`, `karmic-rin-resolver:13`, `graha-sos:12`, `dosha-scanner:13`,
`deepdaan-sanctum:13`, `baby-cosmic-blueprint`, `ayurveda-prakriti`, `chakra-scanner`,
`compatibility`, `decision-clock`, `digital-sankalp`, `disha-shoola`, `dream-decoder`,
`garbh-sanskar`, `gemstone-calculator`, `japa-mala`, `karmic-debt`, `kuldevta-resolver`,
`kundli-xray`, `name-calculator`, `palm-scanner`, `prasad-tracker`, `prashna-kundli`,
`sacred-offerings`, `sound-sanctuary`, `transit-wheel`.
(Example: `src/app/yoni-wheel/page.tsx:13`.)
Fix: replace the dark `<main>` wrapper with the bright base (`bg-[#FBF6EC] text-[#2A1810]`) and
audit each page's inner cards for dark-on-dark styling. This is the bulk of the conversion work.

**HIGH — Dark result cards inside otherwise-form pages**
`bg-[#140c08]` result panels (lowercase hex) render dark islands:
`prashna-kundli/page.tsx:201`, `palm-scanner/page.tsx:229`, `name-calculator/page.tsx:172`,
`karmic-debt/page.tsx:163`, `gemstone-calculator/page.tsx:261`.
Fix: switch result cards to `.glass-deep` / `bg-[#FFFDF8]` with ink text.

**HIGH — Shared components with hardcoded dark gradients**
These are imported into tool pages and paint dark boxes regardless of page theme:
`src/components/shared/PersonalRakshaKavach.tsx:56` (`from-[#0d0a18]...`),
`src/components/shared/VedicWealthCalendar.tsx:72` (`from-[#0a120a]...`),
`src/components/astrology/PastLifeReader.tsx:74` (`from-[#0a0618]...`).
Fix: rework to bright surfaces or make theme-aware.

### High — home components still dark (all under the dark home root)

- `src/components/home/VedicToolsAndReportLookup.tsx:230` — section `bg-gradient-to-b from-[#0E0906] via-[#140C08] to-[#0A0704]`.
- Gradient-clip titles using pale `from-[#FFFDF8] via-[#FFEAA7]` (invisible/washed on ivory):
  `VedicToolsAndReportLookup.tsx:248` (plus inline `style={{ color: "#FFEAA7" }}` at line 250),
  `PricingGrid.tsx:49`, `TestimonialCarousel.tsx:38`, `AstrologerRoster.tsx:49`.
- Dark eyebrow pills `bg-[#1A110B]/90` with `text-[#FFEAA7]`:
  `PricingGrid.tsx:43/46`, `TestimonialCarousel.tsx:32/35/45/47`, `AstrologerRoster.tsx:43/46/104`.
- `src/components/home/3d/Rashi3DCanvas.tsx:252` — dark canvas backdrop `from-[#050302]...` (may be intentional for a 3D stage; confirm against design).

Fix: retheme titles to ink/saffron (e.g. `.gold-foil` on dark stages only, solid `text-[#C25E10]`
on bright), swap eyebrow pills to `.eyebrow-pill`.

**Note (correct, not a bug):** `text-[#120B07]` occurrences in `VedicToolsAndReportLookup.tsx`
(359–397) and `GlassAstralPanchang.tsx` (549, 725, 1247) are **dark text on saffron/gold gradient
buttons** — that's correct dark-on-bright and should stay.

---

## 2. DEAD / DUPLICATE CODE

**MEDIUM — Two dead MobileMenu variants**
`Header.tsx:9` imports `./MobileMenu` only. The active file is `src/components/layout/MobileMenu.tsx`
(used at `Header.tsx:318`). These are never imported anywhere:
- `src/components/layout/MobileMenu.god.tsx` (dead)
- `src/components/layout/MobileMenu.cosmic-arc.tsx` (dead)
Both are full ~800-line dark-themed components. Fix: delete both. (They also inflate the
dark-theme grep noise in category 1.)

**LOW — No other stray variants found.** Searches for `*.bak`, `*.old`, `*.copy`, `*.new`,
`*.v2`, `*.backup`, `*.test.tsx` returned nothing. `.god.tsx` matched only MobileMenu.

---

## 3. EMOJI INCONSISTENCY

Project moved to custom SVG service icons, but emoji remain in user-facing nav/footer strings.

**MEDIUM — Footer.tsx tool list is emoji-heavy** (`src/components/layout/Footer.tsx`):
lines 99 (✨), 115 (👑), 116 (🐅), 117 (🧭), 118 (⚖️), 119 (🪐), 120 (💍), 121 (🔱), 122 (🔯),
123 (🎧), 124 (🩻), 125 (🪔), 126 (📦), 127 (🔱), 137 (👶), 138 (🚨), 139 (💀), 140 (📅),
141 (📿), 142 (🔮), 143 (💍), 144 (🛡️), 145 (⏰), 146 (🌸).

**MEDIUM — Header.tsx dropdown + link labels** (`src/components/layout/Header.tsx`):
line 66 (✨ SACRED OFFERINGS), and dropdown items 90 (🎧), 95 (🪔), 100 (🔯), 105 (🧭), 110 (📦),
136 (👶), 141 (🚨), 146 (🌸), 162 (👑), 167 (🪐), 172 (🩻), 197 (💀), 202 (📅), 207 (🛡️),
212 (⏰), 229 (🐅), 234 (💍), 239 (🔱), 244 (⚖️), 249 (🏛️), 274 (📿), 279 (🔮), 284 (💍).

Fix: remove leading emoji from these link labels (matching the SVG-icon convention) or replace
with the `service-icons` registry glyphs.

---

## 4. ENV / SECURITY GAPS

**HIGH — Telegram webhook fails OPEN when secret is empty**
`src/lib/telegram.ts:27-30`:
```ts
export function verifyTelegramSecret(provided: string | null): boolean {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET || "";
  if (!expected) return true; // if no secret configured, skip check (dev)
  return provided === expected;
}
```
If `TELEGRAM_WEBHOOK_SECRET` is unset in prod, verification is **skipped and returns true** — any
caller can hit the webhook and approve/reject wallet top-ups. Contrast with the UPI webhook
(`src/app/api/upi-webhook/route.ts:16-18`) which correctly fails **closed** (`if (!expected || !provided) return false`).
Fix: fail closed in production — e.g. `if (!expected) return process.env.NODE_ENV !== "production";`
or require the secret unconditionally and only relax for `NODE_ENV === "development"`.

**MEDIUM — `.env.example` missing keys that code reads**
Compared `process.env.*` references against `.env.example`. Missing entries:
- `GEMINI_API_KEY` — read at `src/lib/gemini.ts:3`.
- `GEMINI_MODEL` — read at `src/lib/gemini.ts:18` (defaults to `"gemini-3.6-flash"`).
- `NEXT_PUBLIC_META_PIXEL_ID` — read at `src/components/analytics/MetaPixel.tsx:16`.
Fix: add all three to `.env.example` so deploys don't silently disable AI features / pixel.
(Note: `UPI_PAYEE_NAME` is also read as a fallback at `upi-config.ts:12` but is optional.)

**Note (correct):** `src/proxy.ts:12-13` admin basic-auth correctly fails closed in production.

---

## 5. BUGS / CORRECTNESS

**MEDIUM — Solar-arc uses hardcoded sunrise/sunset, ignoring real panchang**
`src/components/calendar/GlassAstralPanchang.tsx:270-272`: `sunriseMins = 364` / `sunsetMins = 1119`
are constants driving the daylight-progress arc and `isDay` calc, even though real
`panchang?.sunrise/sunset` exist (used two lines up at 269 for the display label only). The visual
sun position won't match the displayed times. Fix: derive mins from `panchang?.sunrise/sunset` when
present, fall back to constants otherwise.

**LOW — Hardcoded fallback times shown as data**
Static placeholder times can render as if real:
`GlassAstralPanchang.tsx:383` (`windowTime: "12:00 PM – 01:30 PM"`), `:1135` (Godhuli fallback),
`:1232` (Hora fallback `"12:00 - 13:00"`); `UniversalMuhurtaFinder.tsx:124`
(`"06:22 AM to 10:48 AM"` with `date: "14th of Upcoming Month"`);
`PremiumPanchangMasterpiece.tsx:19-23` (default props `sunrise="05:59"`, `sunset="18:41"`, etc.).
Fix: gate these behind real-data presence or clearly mark as sample.

**LOW — `dangerouslySetInnerHTML` in MetaPixel**
`src/components/analytics/MetaPixel.tsx:39` injects the standard Meta pixel bootstrap. The HTML is a
static string with no user input, so injection risk is low. No action needed beyond awareness.

**LOW — Leftover console.warn/error in client components**
`src/components/audio/VedicSoundSanctuary.tsx:119,146` and
`src/components/audio/PanditJiVoiceBlessing.tsx:140` log to console. These are audio-playback error
handlers (benign) — fine to keep or downgrade for prod.

**Not an issue — CelestialLiveTicker null handling is safe.**
`src/components/home/CelestialLiveTicker.tsx:23-26` use optional chaining + fallbacks; `event.name`
at line 56 is guarded by `event &&` at line 53. `calendar.ts` getters return `null`/`[]` on error
and consumers handle it. No null-deref found on panchang/event data.

**No real TODO/FIXME/HACK found** — all matches were `XXXXXX` reference-ID placeholders and E.164
comment text, not action items.

---

## 6. BOTTOM NAV (confirm-only)

**CONFIRMED intentional.** `CelestialLiveTicker.tsx:38` (dark ticker bar `bg-[#140C08]/95`) and the
bottom `FloatingNav` / `.nav-3d-bar` are designed dark per the design system's "Things that are
intentional" list. Not flagged as bugs. (Note: the ticker being dark is only visually coherent while
the surrounding page is still dark — once the home root goes bright, re-check that the dark ticker
bar still reads as an intentional accent band, like the maroon referral banner.)

---

## Priority summary

| # | Sev | Area | Action |
|---|-----|------|--------|
| 1 | BLOCKER | `app/page.tsx:26` | Home root still dark — convert to ivory base |
| 2 | BLOCKER | ~44 `app/**/page.tsx` | Tool pages full-page dark (`text-[#f7f3eb]`) — convert all |
| 3 | HIGH | 5 tool pages | `bg-[#140c08]` dark result cards |
| 4 | HIGH | 3 shared/astrology components | Hardcoded dark gradient boxes |
| 5 | HIGH | home components | Pale gradient-clip titles + dark eyebrow pills |
| 6 | HIGH | `lib/telegram.ts:27-30` | Webhook fails open — make it fail closed in prod |
| 7 | MEDIUM | `.env.example` | Add GEMINI_API_KEY, GEMINI_MODEL, NEXT_PUBLIC_META_PIXEL_ID |
| 8 | MEDIUM | layout | Delete MobileMenu.god.tsx + MobileMenu.cosmic-arc.tsx |
| 9 | MEDIUM | Footer/Header | Remove emoji from nav/footer labels |
| 10 | MEDIUM | GlassAstralPanchang:270-272 | Solar arc ignores real sunrise/sunset |
| 11 | LOW | multiple | Hardcoded fallback times shown as data; stray console logs |
