# Motion, Interaction & Design-Trend Playbook (LOCKED KNOWLEDGE)

> Kiro reads this on every request. It encodes current (2025–2026) award-winning
> UI/UX + motion knowledge gathered from Motion.dev, Framer, Awwwards, CSS Design
> Awards, and leading design studios. Combine with design-system.md (brand look)
> and always obey the iOS performance rules there.
> Content synthesized & rephrased from public sources for compliance.

## The senior-designer mindset (apply to everything)
- **First impression forms in ~50ms and is almost entirely design-driven.** A dated
  look reads as a dated, less-trustworthy business. Ship modern, but never at the
  cost of performance or clarity.
- **Motion is a business strategy, not decoration.** Purposeful animation makes
  interfaces feel effortless and trustworthy → better retention and conversion.
  Every animation must have a *reason* (guide attention, confirm action, show
  relationship, express brand). If it has no reason, cut it.
- **Reach real value in the first minute** (mobile). Reduce friction relentlessly.
- Quality of motion communicates personality: slow + long-ease = calm/luxury;
  sharp + confident = energetic. ShubhMarg = calm, sacred, premium → lean smooth,
  organic, physics-based, unhurried.

## Motion performance rules (NON-NEGOTIABLE — enforce always)
1. **Animate ONLY `transform` (x, y, scale, rotate) and `opacity`.** These are
   GPU/compositor-accelerated. NEVER animate width, height, top, left, margin,
   padding, box-shadow, or background-position in loops — they cause layout
   thrash and jank.
2. Prefer `whileInView` / `useInView` for scroll reveals (cheap) over scroll-event
   listeners. For scroll-linked motion use `useScroll` + `useTransform` (uses the
   browser ScrollTimeline where possible = hardware accelerated).
3. Wrap exiting elements in `AnimatePresence` with unique `key`s.
4. Use `layout` / `layoutId` for FLIP / shared-element transitions (already used
   for the nav knob + rashi pill).
5. Respect reduced motion: `useReducedMotion()` or `MotionConfig reducedMotion="user"`.
   The CSS guard in globals.css already kills key infinite loops for reduced-motion.
6. On mobile, keep concurrent infinite loops low. Pause off-screen work
   (IntersectionObserver). No continuous layout animation.
7. Use named timing constants, never magic numbers scattered around.

## Spring & easing presets (use these, feel expensive)
Framer-motion spring configs:
- **snappy**  `{ type: "spring", stiffness: 400, damping: 30 }` — buttons, toggles
- **smooth**  `{ type: "spring", stiffness: 260, damping: 28 }` — cards, panels (default)
- **gentle**  `{ type: "spring", stiffness: 170, damping: 26 }` — large/hero reveals
- **bouncy**  `{ type: "spring", stiffness: 500, damping: 18 }` — playful accents (use sparingly)

Easing curves (for tween/duration animations):
- Brand signature ease: `[0.16, 1, 0.3, 1]` (easeOutExpo-ish) — already used sitewide.
- Standard enter: `[0.22, 1, 0.36, 1]`.
- Durations: micro 0.15–0.25s · standard 0.4–0.6s · hero/section 0.8–1.1s.
- The eye is most sensitive to the START and END of motion: never "pop" in fast,
  never linger too long at the end (feels hesitant).

## Stagger & reveal recipe (the "expensive" feel)
- Section reveal: children fade + rise 16–24px, `staggerChildren: 0.06–0.1`,
  `delayChildren: 0.1`, ease `[0.16,1,0.3,1]`, trigger `whileInView` once,
  `viewport={{ once:true, margin:"-60px" }}`.
- Cards in a grid: stagger by index (`delay: i * 0.05`).
- Headlines: mask-reveal (overflow-hidden + child y:"110%"→0) — already in Hero.

## Micro-interactions (a top differentiator between generic & premium)
Every interactive element should confirm it's interactive, hint the outcome, and
feel crafted. Apply consistently:
- Buttons: press `whileTap={{ scale: 0.97 }}`, hover lift 1–2px + slightly brighter,
  arrow icons slide right on hover.
- Cards: subtle lift + warm shadow + gold ring on hover (`.lift-on-hover`),
  optional light sweep (`.card-light-sweep`), optional 3D tilt on desktop (TiltCard).
- Inputs: focus ring in saffron, smooth border-color transition.
- Provide instant feedback (<100ms) — never make hover/tap feel laggy.
- On native (Capacitor) use light Haptics on primary taps.

## 2026 trends to LEAN INTO (on-brand for ShubhMarg)
- **Kinetic / viewport-scaled typography** — big confident headlines that respond
  to scroll or load; type as the hero, lighter than heavy images. (We have gold-foil
  + mask reveal; extend tastefully.)
- **Bento grids** — modular varied-size tiles for dense info (tools, panchang).
  Preferred over uniform card walls or endless vertical scroll.
- **Scrollytelling / pinned sections** — reveal steps as you scroll a pinned panel
  (great for "How it works"). Use sparingly; test on mobile.
- **Tactile texture / film grain** — subtle noise/paper texture for depth WITHOUT
  heavy WebGL (we have `.grain`; cheaper than 3D on mobile).
- **Purposeful microinteractions** everywhere.
- **Accessibility-first** — it's now a requirement, not a nice-to-have: contrast,
  focus states, reduced-motion, semantic markup, keyboard nav.
- **Performance & "machine experience"** — lightweight, fast; heavy JS/WebGL is
  being stripped in favor of CSS where possible. Lighthouse/Core Web Vitals matter.

## 2026 trends to AVOID / use with caution
- **Scroll-jacking** (hijacking native scroll) — fading out, feels broken on mobile.
  We already removed Lenis syncTouch on touch. Keep native scroll sacred.
- **Generic AI-looking stock imagery** — reads cheap. Prefer authentic assets.
- **Over-animation** — too many simultaneous motions = noisy + slow. Restraint = luxury.
- Heavy always-on 3D on mobile (we pause off-screen; keep it that way).

## Premium loading / empty / error states (don't neglect these)
- Skeleton loaders with a soft cream shimmer (not spinners) for data sections.
- Meaningful empty states with a gentle prompt + CTA (we have one on Rashi).
- Branded 404 / report-loading (mandala or diya motif).
- Optimistic UI where safe (e.g. wallet pending state).

## Mobile-specific (2026)
- Thumb-optimized: primary actions reachable in the bottom third; bottom nav (we have it).
- Gesture-first where natural (horizontal snap sliders, swipe) — with visible
  affordances (peek + edge fade), never hidden.
- Biometric / OTP auth flows kept minimal (we have phone OTP).
- Test the "first minute to value" path.

## How to keep me current (user actions)
- Say: "research the latest <pattern> and build it" → I pull fresh inspiration first.
- Paste a screenshot or Awwwards/Dribbble/site link → I analyze + adapt to brand.
- If a build needs a paid/login tool (analytics, Figma tokens, a component library
  license, a font license, an image/asset generator, a real device farm, Lottie
  files) I will TELL you exactly what to connect or provide — I won't silently skip it.

## What I may ask you to connect/provide for the next level
- Figma file or design tokens (to match exact specs).
- A component/motion library license if you want one (e.g. premium templates).
- Real brand assets: practitioner photo, circular tool icons (PNG/SVG), Lottie/
  video for diya flame or loaders.
- Analytics access (to design from real user behavior).
- A real iPhone for you to spot-check (I can't test devices).
