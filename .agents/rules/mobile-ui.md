# ShubhMarg Mobile UI Rules

These rules are permanent and must be followed on every task in this project.

## Layout & Overflow
- **ALWAYS** wrap the root layout in a `w-full overflow-x-hidden` container div to prevent horizontal scroll bugs on both iOS Safari and Android Chrome. Never rely solely on `overflow-x-hidden` on `<body>` or `<html>` — use an inner wrapper div.

## Mobile Animations
- For mobile UI, prioritize native-feeling haptic feedback using `@capacitor/haptics` on key touch interactions.
- **NEVER** use CSS `transform`-based entrance animations on clickable elements (buttons, links, cards). iOS Safari moves the touch hit-box with the transform, causing tap failures. Use opacity-only or Framer Motion animations that do not shift layout.
- Use Framer Motion `AnimatePresence` for page/step transitions instead of CSS `@keyframes`.

## QA / Verification
- Whenever you do ANY UI work, you **must** automatically check for horizontal overflow before reporting the work as finished.
- Always test at both 390px (iPhone) and 412px (Android) viewport widths when fixing mobile bugs.
