# Pre-launch production audit — ShubhMarg (investigation only, no code changed)

Audited the Next.js app for unfinished content, debug/dead code, dark-theme islands on the bright temple theme, accessibility, broken links, and SEO metadata coverage. The single biggest launch-day risk is a family of **interactive tool components that render as dark cards on the ivory pages** — this is a large, visible theme inconsistency spread across ~20 tool pages, not one stray section. Second is a real **"Coming Soon" gap** on a couple of live routes. SEO metadata is mostly healthy but ~15 interactive tool pages inherit no unique title/description.

Watch for: (1) dark-island tool cards on bright tool pages [confirmed], (2) `/daily-horoscope` and the `/services` video are literal "coming soon" content [confirmed], (3) 15 client tool pages export no `metadata` so share one generic title [confirmed].

**Verdict**: NEEDS_CHANGES

## High-level view

The clean news first: no `console.log`/`console.debug` anywhere in `src`, no dead `href="#"`/`href=""` links, no `TODO`/`FIXME`/`lorem`/`dummy` markers in real content, and no `*.bak`/`*.old`/`*.god.tsx` experimental leftovers. Header logo, footer logo, hero, practitioner, and roster images all carry real `alt` text, and the icon-only controls in MobileMenu and Chatbot carry `aria-label`s. Touch targets in the bottom FloatingNav are 44px with visible text labels. That baseline is solid.

The dominant issue is theme consistency. A whole set of tool components under `src/components/shared/` and `src/components/astrology/` are built as dark gradient cards (`from-[#0…]`/`from-[#1…]` with `bg-black/…` inner panels and `text-white`), then dropped onto tool pages whose wrapper is `bg-[#FBF6EC]` ivory. So on `/raksha-kavach`, `/wealth-calendar`, `/spouse-predictor`, `/past-life-reader`, `/muhurta-finder`, `/pitru-vault`, `/prasad-tracker` and more, the user sees a bright page with a heavy dark slab in the middle. The brief explicitly flagged three of these as known-dark; the audit found the same pattern in roughly a dozen more, so it should be treated as one systemic fix, not three one-offs. This is the launch-day trust/consistency risk.

Two routes ship literal placeholder content: `/daily-horoscope` is a full "Coming Soon" page (not linked from nav, so lower blast radius) and the `/services` page has a dashed-border "video … coming soon" tile. Both read as unfinished if a user reaches them.

SEO is mostly fine — 44 of 67 `page.tsx` files export metadata. The gap is that 15 of the missing ones are `"use client"` tool pages (Header links to all of them), which cannot export `metadata` and therefore inherit only the root layout title. Each needs a server wrapper or co-located metadata to get a unique title/description.

Accessibility is generally good; the one structural concern is the desktop "Vedic Sanctuary" mega-menu in the Header, which opens purely on CSS `:hover` with no click/focus/keyboard handling, so it is unreachable by keyboard and unusable on touch at desktop widths.

<details>
<summary>Issues (12)</summary>

1. **Dark-island tool cards (P0)** — ~15 tool components render dark gradient slabs on ivory pages; restyle to bright temple surfaces or intentionally wrap the page. Files listed in the dark-islands section below.
2. **`/daily-horoscope` is Coming Soon (P1)** — full placeholder page live at a real route; either finish it, `noindex` it, or redirect. `src/app/daily-horoscope/page.tsx:14`.
3. **`/services` video placeholder (P1)** — "video explanation … coming soon" dashed tile on a primary marketing page; hide until the asset exists. `src/app/services/page.tsx:202-211`.
4. **15 client tool pages lack metadata (P1)** — indexable tool pages inherit one generic title; split into server `page.tsx` + client component or add co-located metadata. List in the SEO section.
5. **Header mega-menu is hover-only (P1)** — `src/components/layout/Header.tsx:66` dropdown has no click/focus/keyboard handling; not keyboard-accessible. Add click-to-open + focus management.
6. **QR "placeholder" in Raksha Kavach (P2)** — `src/components/shared/PersonalRakshaKavach.tsx:148-152` shows a dashed "QR Activated Upon Order" box; confirm this is intended UX, not an unfinished feature.
7. **`bg-black/…` form fields inside tool cards (P1)** — inputs/selects across the dark tool components use `bg-black/80` + `text-white`; will look wrong once cards are brightened. Tied to issue 1.
8. **Root/home metadata (P2)** — `src/app/page.tsx` has no page-level metadata; verify `layout.tsx` supplies a strong default title/description/OG for the landing page.
9. **Dynamic route metadata coverage (P2)** — `admin/calendar/[id]`, `payment/[reference_id]`, `festivals/[slug]` lack metadata; fine for admin/payment, but `festivals/[slug]` is public and should generate metadata.
10. **`/services` "Skip to Booking" flow (P2)** — the placeholder tile's only CTA jumps to booking; acceptable but revisit copy once video lands. `src/app/services/page.tsx:213`.
11. **Verify tool pages have `<h1>` (P2)** — client tool pages with no metadata should at least carry a single visible `<h1>` for SEO/a11y; spot-check the 15.
12. **Login/payment input labels (P2)** — confirm OTP/UTR inputs in `login` and `payment/[reference_id]` have associated `<label>`/`aria-label`, not just `placeholder`.

</details>

<details>
<summary>Details</summary>

### Dark islands on the bright theme (P0)

The pattern is consistent: a component's root is `bg-gradient-to-b from-[#0…]/[#1…] … text-white`, with inner `bg-black/…` panels, sitting inside a page whose `<main>` is `bg-[#FBF6EC] text-[#2A1810]`. The result is a dark rectangle floating on ivory. The brief pre-approved three of these (PersonalRakshaKavach, VedicWealthCalendar, PastLifeReader) as known-dark, but the same construction repeats across the tool set, so the honest finding is that this is systemic.

Confirmed dark tool components (each `:1` region is the root wrapper unless noted):

- `src/components/shared/PersonalRakshaKavach.tsx:56` — `from-[#0d0a18] via-[#180f28]`, inner `bg-black/75` form. Rendered on `/raksha-kavach`. [confirmed]
- `src/components/shared/VedicWealthCalendar.tsx:72` — `from-[#0a120a] via-[#0f1e10]`, `bg-black/80` select. Rendered on `/wealth-calendar`. [confirmed]
- `src/components/astrology/PastLifeReader.tsx:74` — `from-[#0a0618] via-[#130d28]`. Rendered on `/past-life-reader`. [confirmed]
- `src/components/astrology/SpousePredictor.tsx:64` — `from-[#180818] via-[#280e28]`. Rendered on `/spouse-predictor`. [confirmed]
- `src/components/shared/UniversalMuhurtaFinder.tsx:151` — `from-[#120b05] via-[#241306]`. Rendered on `/muhurta-finder`. [confirmed]
- `src/components/shared/PitruTarpanVault.tsx:35` — `from-[#1c0c08] via-[#260f0a]`. Rendered on `/pitru-vault`. [confirmed]
- `src/components/shared/SacredPrasadDispatchRadar.tsx:72` — `from-[#1a0d09] via-[#24120b]`. Rendered on `/prasad-tracker`. [confirmed]
- `src/components/shared/SealedGotraDestinyEnvelope.tsx:40` — `from-[#1c0e08] via-[#2a130a]`. [confirmed]
- `src/components/shared/KarmicRinResolver.tsx:74` — `from-[#180c09] via-[#240f0c]`. [confirmed]
- `src/components/shared/TwoTimelinesVisualizer.tsx:44` — `from-[#1b0d08] via-[#26120b]`. Rendered on `/palm-scanner`. [confirmed]
- `src/components/shared/DestinyCrisisRadar.tsx:32` — `from-[#1e0c08] via-[#2a100a]`. Rendered on `/karmic-debt`. [confirmed]
- `src/components/shared/InstantPrashnaDiya.tsx:31` — `from-[#1f100a] via-[#2c140c]`. [confirmed]
- `src/components/shared/FamilyMarriageMilanCard.tsx:36` — `from-[#20100c] via-[#2d140f]`. [confirmed]
- `src/components/shared/GemstonePranaPratishthaRitual.tsx:62` — `from-[#180f0c] via-[#24130d]`. [confirmed]
- `src/components/shared/WhatsAppProofShowcase.tsx:22` — `from-[#180e0a] to-[#120806]`. Rendered on many tool pages as the trust block. [confirmed]
- `src/components/shared/LiveAltarStatusCapacity.tsx:24` — `from-[#1f0e08] via-[#2d140a]`. Rendered on many tool pages. [confirmed]
- `src/components/shared/JapaMalaDedicationModal.tsx:31`, `src/components/shared/EmergencyGrahaShantiSOS.tsx:65` — dark, but modal/overlay contexts (lower priority). [confirmed]

Intentional-dark (per brief, excluded): Footer, FloatingNav (`.nav-3d-bar`), SanctifiedVerdictStickyBar, RoyalVedicReport, CelestialLiveTicker, sacred-offerings tiles, MobileMenu, plus the `home/3d/*` canvases (`Rashi3DCanvas`, `PlanetaryTransitWheel`, `RashiMedallionCard`) which are 3D viewports where dark is expected, and `wallet/TopupDrawer` (dark drawer).

Fix direction (one systemic decision, not per-file): either restyle these cards to the bright surfaces the design system already provides (`.surface-bronze`, `.glass-deep`, ivory/cream with ink text and `#B8860B` borders) and swap `bg-black/*` inputs for the bright input pattern used in `SupportRequestForm.tsx`; or, if the dark "sacred slab" look is deliberate for tools, make it intentional and consistent (e.g. a shared dark section wrapper with a seam) rather than a lone dark box mid-ivory. The form fields (`bg-black/80 text-white placeholder-gray-500`) must be handled together with the wrapper or they'll invert.

### Placeholder / Coming Soon content (P1)

`src/app/daily-horoscope/page.tsx:14` is a full page whose eyebrow reads "Coming Soon" and body says "This section will be available very soon." It is **not linked from the Header or FloatingNav** (grep for `daily-horoscope` returns only the page itself), so a user only reaches it by direct URL — but it is still a live, indexable route serving placeholder content. Finish it, add `robots: { index: false }`, or redirect to `/shubh-calendar`. [confirmed]

`src/app/services/page.tsx:202-211` renders a dashed-border tile: "Watch: How We Prepare Your Guidance … A short video explanation of our traditional consultation process — coming soon." This is on a primary marketing page. Hide the tile until the video exists, or replace with static content. [confirmed]

`src/components/shared/PersonalRakshaKavach.tsx:148-152` shows a "QR Activated Upon Order" dashed box with a placeholder QR icon. This appears to be intended product behavior (QR generated after purchase) rather than an unfinished feature, but confirm the copy reads as deliberate, not stubbed. [possible]

### SEO metadata coverage (P1/P2)

44 of 67 `page.tsx` files export `metadata`/`generateMetadata`. Of the 23 without it, the meaningful gaps are the **15 `"use client"` tool pages** — a client component cannot export `metadata`, so each inherits only the root layout title and has no unique description:

`ayurveda-prakriti`, `chakra-scanner`, `compatibility`, `decision-clock`, `digital-sankalp`, `disha-shoola`, `dream-decoder`, `gemstone-calculator`, `japa-mala`, `karmic-debt`, `kuldevta-resolver`, `name-calculator`, `palm-scanner`, `prashna-kundli`, `vastu-scanner`.

All 15 are linked from the Header "Vedic Sanctuary" mega-menu, so they are meant to be discoverable/indexable. The standard fix is to make each route a server `page.tsx` that exports `metadata` and renders a `"use client"` child, or add a co-located `layout.tsx` with metadata. [confirmed]

The remaining missing pages are `page.tsx` (home — verify `layout.tsx` supplies a strong default), `login`, `wallet`, `sacred-offerings`, and the dynamic routes `admin/calendar/[id]`, `payment/[reference_id]`, `report/[reference_id]` (report already has `generateMetadata`), `festivals/[slug]`. Admin/payment/login/wallet don't need SEO metadata; `festivals/[slug]` is public content and should generate per-festival metadata. [confirmed]

### Header mega-menu keyboard/touch access (P1)

`src/components/layout/Header.tsx:66` the desktop "Vedic Sanctuary (38)" dropdown is a `<button>` with no `onClick`; the panel is revealed only via CSS `group-hover:visible`. There is no focus or keyboard handling, so a keyboard user cannot open it, and it does not respond to tap. The 38 tool links inside are still reachable via the mobile menu and `/services`, so it is not a dead-end, but the desktop primary nav is not operable without a mouse. Add click-to-toggle with `aria-expanded` and focus-visible reveal. [confirmed]

### What's clean (verified, no action)

No `console.log`/`console.debug` in `src`. No `href="#"`/`href=""` dead links. No `TODO`/`FIXME`/`HACK` in real code (one match was inside an SVG comment `{/* Lock Shackle */}`). No `lorem`/`dummy`/`fake` content. No `.bak`/`.old`/`.god.tsx` files. All `<Image>`/`<img>` instances carry `alt`. Icon-only buttons in `MobileMenu.tsx` (Search, Close, Open menu) and `Chatbot.tsx` (Open Guides, Send) have `aria-label`s. `SupportRequestForm.tsx` inputs use associated `<label htmlFor>`. FloatingNav links are 44px with visible text labels. The `InteractiveTopics` sample Q&A copy on the homepage is illustrative product content ("See What You Get"), not accidental placeholder. [confirmed]

</details>

<details>
<summary>File map</summary>

- `src/components/shared/PersonalRakshaKavach.tsx` — dark tool card on `/raksha-kavach`
- `src/components/shared/VedicWealthCalendar.tsx` — dark tool card on `/wealth-calendar`
- `src/components/astrology/PastLifeReader.tsx` — dark tool card on `/past-life-reader`
- `src/components/astrology/SpousePredictor.tsx` — dark tool card on `/spouse-predictor`
- `src/components/shared/UniversalMuhurtaFinder.tsx`, `PitruTarpanVault.tsx`, `SacredPrasadDispatchRadar.tsx`, `SealedGotraDestinyEnvelope.tsx`, `KarmicRinResolver.tsx`, `TwoTimelinesVisualizer.tsx`, `DestinyCrisisRadar.tsx`, `InstantPrashnaDiya.tsx`, `FamilyMarriageMilanCard.tsx`, `GemstonePranaPratishthaRitual.tsx`, `WhatsAppProofShowcase.tsx`, `LiveAltarStatusCapacity.tsx` — additional dark tool/section cards
- `src/app/daily-horoscope/page.tsx` — full "Coming Soon" placeholder route (unlinked)
- `src/app/services/page.tsx` — "video coming soon" placeholder tile (~L202-211)
- `src/components/layout/Header.tsx` — hover-only mega-menu (~L66), not keyboard/touch operable
- 15 `"use client"` tool pages under `src/app/*` — no unique metadata
- Clean: no console/dead-href/TODO/placeholder markers; images have alt; nav a11y labels present

Full detail is in this document; no diff was produced (investigation only, no code changed).

</details>
