"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe "now" (minute precision).
 * The server passes the time it rendered with (`serverNow`). During hydration React uses
 * that exact value, so the first client render matches the cached HTML; right after, the
 * hook switches to the real clock and re-renders once a minute.
 */
const MIN = 60_000;
const floorMin = (t: number) => Math.floor(t / MIN) * MIN;

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) timer = setInterval(() => listeners.forEach((l) => l()), 15_000);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

// Numbers compare by value, so this is stable for the whole minute.
const getSnapshot = () => floorMin(Date.now());

export function useIstNow(serverNow: number): number {
  return useSyncExternalStore(subscribe, getSnapshot, () => floorMin(serverNow));
}