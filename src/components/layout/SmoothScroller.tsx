"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroller({ children }: { children: ReactNode }) {
  // Smooth scrolling enabled on both wheel (desktop) and touch (mobile).
  // A gentle lerp + touch multiplier gives a premium, buttery feel without jitter.
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,   // buttery on desktop trackpad/wheel
        syncTouch: false,    // iOS: use native momentum scroll (syncTouch causes jank)
      }}
    >
      {children}
    </ReactLenis>
  );
}
