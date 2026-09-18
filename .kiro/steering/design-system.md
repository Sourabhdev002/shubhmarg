# ShubhMarg — Design System & Build Rules (LOCKED)

> Kiro reads this on every request. It is the source of truth for how the site
> must look, feel, and be built. Do not drift from it unless the user explicitly
> asks to change the system itself.

## Brand feeling
Bright, premium **temple aesthetic** — devotional, warm, sacred, trustworthy.
Think: marble + saffron + gold leaf, like a luxury Hindu wedding invitation or a
sunlit mandir. NOT a dark cosmic/night look. Dark-on-light always.

## Color palette (locked)
| Token | Hex | Use |
|-------|-----|-----|
| Marble ivory | `#FBF6EC` | page base / main surface |
| Warm cream | `#F5EAD6` | alternating surface / nested panels |
| Temple white | `#FFFDF8` | elevated cards |
| Sand | `#EFE0C6` / `#F3E6CE` | deeper cream accents |
| Ink | `#2A1810` | primary text (headings + body) |
| Ink soft | `#6B5A48` | secondary / muted text |
| Saffron | `#E8791E` | PRIMARY accent, CTAs, active states |
| Saffron deep | `#C25E10` | saffron hover/press, accent text on light |
| Marigold | `#F5A623` | bright highlight, glows |
| Vermillion | `#C0392B` / `#9E2A1E` | urgency CTAs (sindoor), alerts |
| Antique gold | `#B8860B` | gold that reads on light — lines, labels, borders |
| Gold leaf | `#D4A537` | metallic accent lines |
| Maroon | `#6B1E1E` / `#4B1515` | deep traditional accent bands |

**Rule:** never use faint light text on light bg. When unsure between two text
shades, pick the darker. Borders use `#B8860B` at low opacity (`/20`–`/35`).

## Typography
- Headings: **Cormorant Garamond** (`font-cormorant`) or Playfair (`font-serif`).
- Body/labels: Inter (`font-sans`).
- Devanagari: Tiro Devanagari (`font-devanagari`).
- Section titles use `.text-section-title`; stats use `.text-stat`.

## Reusable design-system classes (already in globals.css — prefer these)
- Surfaces (bright, alternate down the page): `.surface-obsidian` (ivory),
  `.surface-bronze` (cream), `.surface-maroon-wash`, `.surface-saffron`.
- Section rhythm: `.section-py`, `.section-px`.
- Ornaments: `.eyebrow-pill`, `.gold-divider`, `.section-seam` (✦ between sections).
- Cards: `.glass-deep`, `.surface-bronze-glass`, `.card-light-sweep`, `.lift-on-hover`.
- Fill dead space with warmth: `.glow-fill`, `.ember-tl`, `.ember-br`.
- Buttons: `.btn-gold` (saffron gradient primary), `.btn-maroon` (vermillion).
- Text: `.gold-foil` (animated marigold sheen on headlines).

## Layout & rhythm rules
- Alternate section surfaces so the page reads as rhythm, never one flat block.
  Never put two identical adjacent surfaces.
- Put a `.section-seam` between major sections.
- Mobile-first. Keep sections tight — condense long content, hide detail behind
  a CTA / "view all" link. Dense info → **bento grid** or **category tabs +
  horizontal snap slider**, never an endless vertical wall.
- Icons/selectors: prefer card-less circular icons with a gold ring over dark
  boxed tiles.

## iOS / mobile performance rules (CRITICAL — do not regress)
- Lenis smooth scroll: `syncTouch: false` (native iOS momentum). Never re-enable syncTouch.
- Every WebGL/Three.js canvas MUST pause off-screen (IntersectionObserver →
  `frameloop="never"`) and run lighter on mobile (no antialias, lower dpr, fewer particles).
- Cap ambient-glow blur at ~48–60px on mobile (`blur-[60px] md:blur-[120px]`).
  The globals.css mobile guard also caps `blur-[]` and backdrop-filter under 768px.
- Never use `will-change: backdrop-filter`.
- Keep `backdrop-blur` light on fixed elements (nav, bars).
- Respect `prefers-reduced-motion`.

## Currency & content
- Always use `₹` (never "Rs.").
- All user-facing strings go through the `useT()` translation system (8 languages).

## Workflow rules (always)
1. Read a file before editing it. Match existing patterns.
2. After any change, run `npm run build` and confirm zero errors before saying done.
3. For dense/new sections, research the latest pattern via web search first, then build.
4. Be honest about limits: can't see live render, can't test real iPhone, can't
   create image assets — ask the user for screenshots/files.
5. Windows/PowerShell environment; use `cwd` param, never `cd`.

## Things that are intentional (do NOT "fix")
- Referral banner = deep maroon band with white text (valid high-contrast accent).
- Chatbot floating orb = dark gold FAB (like a WhatsApp bubble).
- Rashi medallion images are zoomed (`scale-[1.6]`) to crop out their square
  backgrounds — this is deliberate.
