/**
 * Named motion constants — the single source of timing/easing for ShubhMarg.
 * Locked to the motion playbook. Never scatter magic numbers; import from here.
 * Only transform/opacity are ever animated (GPU-safe).
 */
import type { Transition } from "framer-motion";

/** Spring presets. */
export const spring = {
  snappy: { type: "spring", stiffness: 400, damping: 30 } as Transition, // buttons, toggles
  smooth: { type: "spring", stiffness: 260, damping: 28 } as Transition, // cards, panels (default)
  gentle: { type: "spring", stiffness: 170, damping: 26 } as Transition, // large / hero reveals
  bouncy: { type: "spring", stiffness: 500, damping: 18 } as Transition, // playful accents (sparingly)
};

/** Easing curves for tween/duration animations. */
export const ease = {
  brand: [0.16, 1, 0.3, 1] as [number, number, number, number],    // signature easeOutExpo-ish
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number], // standard enter
};

/** Durations (seconds). */
export const duration = {
  micro: 0.2,
  standard: 0.5,
  hero: 0.9,
};

/** Stagger recipe for section reveals. */
export const stagger = {
  children: 0.07,
  delayChildren: 0.1,
};

/** Shared viewport config for whileInView reveals (fire once, a touch early). */
export const viewportOnce = { once: true, margin: "-60px" } as const;

/** Micro-interaction presets for interactive elements. */
export const tapPress = { scale: 0.97 };
export const hoverLift = { y: -2 };
