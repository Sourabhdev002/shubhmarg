---
inclusion: manual
---

# ShubhMarg — UI/UX Roadmap & Idea Bank

> Manual steering file. Pull it into a chat with `#ui-roadmap` when you want to
> work on premium upgrades. Check off items as they ship. Add your own ideas
> anytime under "Wishlist".
>
> HOW TO USE WITH KIRO:
> - To build something cutting-edge, say: "research the latest <X> pattern, then build it."
> - To match a look, paste a screenshot or an Awwwards/Dribbble link.
> - Everything must still obey design-system.md (bright temple aesthetic + iOS perf rules).

---

## 🔍 Search phrases to feed Kiro for FRESH, current trends
Copy-paste these to make me pull the latest inspiration before building:

- "research award-winning spiritual/astrology website design 2026 trends"
- "latest premium scroll animation patterns 2026 (scroll-reveal, parallax, pinned sections)"
- "modern micro-interaction ideas for buttons and cards 2026"
- "bento grid dashboard layout examples 2026"
- "best mobile onboarding / step flow UX patterns 2026"
- "text reveal / kinetic typography animation trends 2026"
- "Awwwards site of the day this month — what techniques are winning"
- "framer motion advanced scroll-linked animation recipes"
- "premium e-commerce product card hover interactions 2026"
- "accessible carousel / horizontal scroll best practice latest"

---

## ✨ Motion & animation ideas (on-brand, iOS-safe)
Prioritized. Each keeps the temple aesthetic and respects reduced-motion + mobile perf.

### High impact / low risk
- [ ] **Scroll-reveal for every section** — content gently fades + rises as it enters view (staggered). Use framer-motion `whileInView`. Ties the whole page together.
- [ ] **Number count-up on stats** when scrolled into view (already on SocialProof — extend to bio + pricing).
- [ ] **Button micro-interactions** — subtle press scale, gold ripple, arrow slide on hover for all CTAs.
- [ ] **Kinetic headline** — hero words already mask-reveal; add a soft letter-by-letter shimmer on the gold-foil line.
- [ ] **Card tilt on hover** (desktop) using TiltCard — extend to pricing + tool cards.

### Medium
- [ ] **Pinned / sticky scroll storytelling** for "How it works" — steps reveal as you scroll a pinned panel (research first).
- [ ] **Animated gold section-seam** — the ✦ divider draws itself in when scrolled to.
- [ ] **Parallax on hero Om + glows** — layers drift at different speeds (desktop only, disable on touch).
- [ ] **Diya/flame flicker** micro-animation near ritual sections.
- [ ] **Marquee ribbon** of trust badges / live activity (slow, pauses on hover).

### Signature "wow" (unique to a Vedic brand)
- [ ] **Live sun-arc** in the Panchang that moves with real IST time (partially done — animate the sun marker along the arc).
- [ ] **Rashi selection ripple** — tapping a rashi sends a soft gold ripple across the grid.
- [ ] **"Aarti" gold-dust cursor trail** on desktop hero only.
- [ ] **Mandala loader** — a rotating sacred-geometry mandala for page/route transitions.
- [ ] **Sound-on-tap** chimes already exist on Panchang tiles — extend tastefully.

---

## 🧩 Layout / feature upgrades to consider
- [ ] Convert remaining long sections to bento or slider (per design-system).
- [ ] Sticky mini-CTA that appears after hero scroll ("Begin Your Guidance").
- [ ] Testimonials → add photos/initials + verified badge + auto-advance with pause-on-touch.
- [ ] A proper light/dark theme toggle (deferred — needs semantic color tokens across all components; big job).
- [ ] Skeleton loaders (cream shimmer) for any data-fetching sections.
- [ ] Page transitions between routes (fade + subtle scale).
- [ ] Custom premium 404 + report-loading states.

---

## 🖼️ Assets I need from you to level up
- [ ] Individual circular/transparent PNGs for the 20 tool icons (the painted set) → richer tools grid.
- [ ] A real practitioner photo (replacing the placeholder in PractitionerBio).
- [ ] Optional: short looping video/lottie of a diya flame for hero or ritual sections.

---

## 📝 Wishlist (add your own ideas here anytime)
- 

---

## ✅ Shipped (history)
- Bright temple theme conversion (ivory + saffron + gold).
- Category-tabs + horizontal slider for the 20 Vedic tools.
- Card-less circular Rashi medallion selector.
- Compact bento-style Panchang.
- Premium saffron "diya" floating bottom nav.
- Wallet + phone OTP auth + Telegram approve/reject top-ups.
- 8-language translation system.
- iOS performance pass (native scroll, off-screen 3D pause, blur caps).
