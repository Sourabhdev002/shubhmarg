# Text-contrast audit after the ivory-theme global CSS switch

The global change (`--background=#FBF6EC`, `--foreground=#2A1810`, `h1-h6 { color:#2A1810 }`, body `bg-[#FBF6EC] text-[#2A1810]`) flips the site to dark-on-light. The audit hunts two breakages: pale text left on the new ivory base (mode A), and the new ink default landing on intentionally-dark elements (mode B). Almost every dark region is a self-contained dark island (its own `bg-[#…]`/`bg-black/…` plus explicit light text), so the switch leaves it intact. The damage concentrates in one systemic place: ~21 tool pages whose `<main>` carries the contradictory pair `bg-[#0a0706] text-[#2A1810]`, plus one dark pricing card.

Watch for:
- **confirmed** — 21 tool-page `<main>` elements set `bg-[#0…] text-[#2A1810]`: near-black background with ink as the default text color. Any text node without its own light color inherits `#2A1810` and disappears. Mode B.
- **confirmed** — `.surface-maroon-wash` is now defined **bright** (`#FDF3E2 → #FBF6EC`), the cascade-winning definition at `globals.css:697`. Its consumers (InteractiveTopics, PricingGrid) already use ink text, so they're fine — but any future `text-white` in those sections would vanish.
- **confirmed** — PricingGrid's "hot" card keeps a dark gradient (`from-[#24140C]`) while its name/description text stayed ink, so that one card is dark-on-dark. Mode B.
- All five named dark-intentional components (verdict sticky bar, royal report, live ticker, referral banner, floating nav) are **safe** — every heading/text node has an explicit light color that overrides the global ink rule.

**Verdict**: NEEDS_CHANGES

## High-level view

The theme switch is mostly clean because the codebase never relied on the global text color for dark regions — dark widgets always ship their own light text classes. That discipline is what prevents a site-wide blackout. The named components the task called out all pass: SanctifiedVerdictStickyBar (`bg-[#120704]`), RoyalVedicReport (`bg-[#140c08]`), CelestialLiveTicker (`bg-[#140C08]`), ReferralBanner (`bg-brand-maroon`), and FloatingNav (`.nav-3d-bar`) carry `text-white`/`text-[#d4af37]`/`text-[#FFEAA7]` on their headings, so `h1-h6 { color:#2A1810 }` never wins on them.

The real defect is a split-brain in the tool pages. About ten were converted correctly to `bg-[#FBF6EC] text-[#2A1810]` (yoni-wheel, yantra-altar, wealth-calendar, vastu-compass, spouse-predictor, shani-sade-sati, raksha-kavach, rajayoga-scanner, pitru-vault, past-life-reader), and they host dark widget-islands that render fine on ivory. But ~21 others still declare `bg-[#0a0706] text-[#2A1810]` — the background was never lightened, yet the page-default text color was set to ink. On those pages the ink default is invisible against near-black; only elements with explicit `text-white`/`text-gray-400`/`text-[#d4af37]` survive. The intent is contradictory: either the page should be ivory (then the dark widgets stay islands) or it should stay dark (then `text-[#2A1810]` is wrong and should be a light default).

`.surface-maroon-wash` resolves to the bright definition, so InteractiveTopics and PricingGrid backgrounds are cream. Both already paint text in ink/saffron/gold, so no mode-A breakage there. The lone exception is PricingGrid's `hot` card, which kept a dark gradient background while sharing the same ink text classes as the bright cards.

No pale-on-ivory (mode A) breakage was found in the shared/astrology/reports/home/layout components: each pale-text block is wrapped in its own dark container (`from-[#180818]`, `bg-black/…`, `bg-[#140c08]`, hero `from-[#1a0a08]`), and the gradient-clip titles using pale stops (`from-[#FFFDF8] via-[#FFEAA7]`) all sit on dark backgrounds (MobileMenu `#05060A`, VedicToolsAndReportLookup `#140C08`).

<details>
<summary>Issues (4)</summary>

1. **Dark tool-page `<main>` with ink default** — 21 pages set `bg-[#0a0706] text-[#2A1810]`; ink is invisible on near-black and any un-colored text node vanishes. Decide the page identity: if it should be ivory, change `bg-[#0…]` → `bg-[#FBF6EC]`; if it should stay dark, change `text-[#2A1810]` → a light default such as `text-[#F5EAD6]`. Full file list in the details section.
2. **PricingGrid hot card is dark-on-dark** — the popular card keeps `from-[#24140C]/98 to-[#160D08]/98` while the shared name/desc text is `text-[#2A1810]`/`text-[#6B5A48]`. Either give the hot card a bright surface like its siblings, or add light-text overrides for the hot variant. `src/components/home/PricingGrid.tsx:71-72, 92, 94`.
3. **`.surface-maroon-wash` future-proofing** — it now resolves bright (`#FDF3E2 → #FBF6EC`, `globals.css:697`); current consumers use ink text so nothing is broken, but treat this surface as light going forward (no `text-white` children).
4. **Global `h1-h6 { color:#2A1810 }` is only overridden by explicit classes** — safe today because every dark widget sets a light heading color, but a future bare `<h2>` dropped into any dark island will silently vanish. Consider scoping heading color to light surfaces rather than globally.

</details>

<details>
<summary>Details</summary>

### The 21 dark tool pages (mode B): `bg-[#0…] text-[#2A1810]`

Every one of these declares a near-black `<main>` background while setting the page's default text color to ink `#2A1810`. The global `h1-h6` rule compounds it. In practice the visible headings survive because they each carry `text-white` (e.g. `name-calculator/page.tsx:75` h1, `transit-wheel/page.tsx:27`) or gold (`…text-[#d4af37]` on result-panel h2s), and body copy uses `text-gray-400`/`text-gray-300`. But the page-level `text-[#2A1810]` is the wrong default for a dark surface: any text node that forgets an explicit light class inherits ink and disappears, and the declaration signals the conversion was left half-done.

```
bg-[#0a0706]  text-[#2A1810]   ← page says "dark surface" and "ink text" at once
```

Affected files (all on the `<main>` element, line noted):

- `src/app/vastu-scanner/page.tsx:65`
- `src/app/transit-wheel/page.tsx:13`
- `src/app/sound-sanctuary/page.tsx:13`
- `src/app/sacred-offerings/page.tsx:137`
- `src/app/prashna-kundli/page.tsx:63`
- `src/app/prasad-tracker/page.tsx:13`
- `src/app/palm-scanner/page.tsx:72`
- `src/app/name-calculator/page.tsx:61`
- `src/app/kundli-xray/page.tsx:14`
- `src/app/kuldevta-resolver/page.tsx:43`
- `src/app/karmic-debt/page.tsx:50`
- `src/app/japa-mala/page.tsx:38`
- `src/app/gemstone-calculator/page.tsx:58`
- `src/app/dream-decoder/page.tsx:69`
- `src/app/disha-shoola/page.tsx:34`
- `src/app/digital-sankalp/page.tsx:48`
- `src/app/decision-clock/page.tsx:39`
- `src/app/compatibility/page.tsx:74`
- `src/app/chakra-scanner/page.tsx:62`
- `src/app/ayurveda-prakriti/page.tsx:50`

Severity: **high** (contradictory default; latent blackout for any bare text). Fix per page: pick one — `bg-[#0…]` → `bg-[#FBF6EC]` (become an ivory page, matching the ~10 already-converted ones), or `text-[#2A1810]` → `text-[#F5EAD6]` (stay a dark page with a light default). The already-correct dark pages (`wallet/page.tsx` uses `bg-[#080604]` with no ink default and all-explicit `text-white`) show the second pattern done right.

### PricingGrid hot card (mode B)

`src/components/home/PricingGrid.tsx` sits on the now-bright `.surface-maroon-wash` (`:37`) and paints all card text in ink/saffron. The non-hot cards use `surface-bronze-glass` (bright) so `text-[#2A1810]` name and `text-[#6B5A48]` desc read correctly. The `hot` card, however, keeps a dark gradient:

```
s.hot
  ? "bg-gradient-to-b from-[#24140C]/98 to-[#160D08]/98 …"   // :72 dark
  : "surface-bronze-glass …"                                  // :73 bright
```

while the name (`:92 text-[#2A1810]`) and description (`:94 text-[#6B5A48]`) classes are shared across both variants. On the hot card those render dark-on-dark — the service name and blurb are effectively unreadable, and the price (`text-[#C25E10]`) is low-contrast on `#24140C`. The `text-white` badge at `:77` is on a saffron gradient and is correct (excluded per the dark-band rule). Severity: **high**. Fix: either switch the hot card to a bright surface like the others, or add a hot-variant override that flips the name/desc to `text-[#FFFDF8]`/`text-[#C4B59D]`.

### `.surface-maroon-wash` resolution

`globals.css` defines the class twice; the later block (loaded last, wins the cascade) is the bright one:

```
/* :697 — winning definition */
.surface-maroon-wash {
  background:
    radial-gradient(90% 70% at 80% 10%, rgba(192, 57, 43, 0.08) 0%, transparent 55%),
    linear-gradient(180deg, #FDF3E2 0%, #FBF6EC 100%);   /* bright cream→ivory */
}
```

So it is **bright**. Consumers `InteractiveTopics.tsx:47` and `PricingGrid.tsx:37` both drive text in `text-[#2A1810]`/`text-[#6B5A48]`/`text-[#B8860B]`, which is correct on cream — no mode-A break. Recorded here only to confirm the state and to flag that no `text-white` should be added to these sections. Severity: **low** (informational / future-proofing).

### Named dark-intentional components — all safe

Checked each explicitly:

- **SanctifiedVerdictStickyBar** (`bg-[#120704]/95`, `:49`) — heading `text-white` (`:69`), badge `text-[#d4af37]`, CTA `text-black` on gold gradient. Safe.
- **RoyalVedicReport** (`bg-[#090604]` / inner `bg-[#140c08]`, `:34,:60`) — h1 `text-white` (`:79`), labels `text-gray-400`, values `text-[#f7f3eb]`, gold accents; print styles flip to `text-black`. Safe.
- **CelestialLiveTicker** (`bg-[#140C08]/95`, `:39`) — all text `text-[#FFEAA7]`/`text-white`/`text-[#C4B59D]`, no bare headings. Safe.
- **ReferralBanner** (`bg-brand-maroon`, `:9`) — h3 `text-white` (`:38`), body `text-white/60`, CTA `text-[#1a0505]` on gold. Safe (intentional maroon band per design rules).
- **FloatingNav** (`.nav-3d-bar` dark, `:52`) — active `text-white`, inactive `text-[#8A7156]`, WhatsApp pill `text-white`. Safe.

Also verified safe by the same island pattern: `Footer` (`bg-[#110a0a]`, `text-brand-parchment`), `MobileMenu` (`bg-[#05060A]`, `text-[#FFFDF8]` + pale gradient-clip titles on dark), the astrology/shared widgets (`SpousePredictor` `from-[#180818]`, `ShaniSadeSatiDiagnostic` `from-[#190d0b]`, `VedicWealthCalendar` dark wrapper, `WhatsAppProofShowcase` embedded in dark/bright pages as a dark island), and `RashiMedallionCard` (labels `text-[#FFEAA7]`/`text-[#C4B59D]` sit on obsidian medallions and the dark home carousel). None inherit the ink default for visible text.

### Pale gradient-clip titles — checked, safe

`from-[#FFFDF8] via-[#FFEAA7]` clip titles appear in `MobileMenu.tsx:477,814,1274` (on `#05060A`) and `VedicToolsAndReportLookup.tsx:248` (section `bg` `from-[#0E0906] via-[#140C08]`, dark). All render on dark backgrounds, so the pale fill is correct. Note `VedicToolsAndReportLookup.tsx:250` also sets an inline `style={{ color:"#FFEAA7" }}` fallback — harmless since the background-clip wins and the surface is dark.

</details>

<details>
<summary>File map</summary>

- `src/app/globals.css` — confirms `.surface-maroon-wash` bright at `:697` (wins over dark `:605`); global `h1-h6 { color:#2A1810 }`; `.glass-*`/`.nav-*`/`.card-ivory` remain dark, `.surface-bronze-glass`/`.surface-*` bright.
- `src/app/*/page.tsx` (21 files listed above) — dark `<main>` with ink default; mode-B latent breakage.
- `src/components/home/PricingGrid.tsx` — hot card dark-on-dark (`:72,92,94`); bright cards fine.
- `src/components/home/InteractiveTopics.tsx` — on bright `.surface-maroon-wash`, all ink text; safe.
- Dark-intentional components (verdict bar, royal report, live ticker, referral, floating nav, footer, mobile menu, astrology/shared widgets) — verified safe.

No full diff was supplied; this audit is based on the described global CSS change plus the current source state.

</details>
