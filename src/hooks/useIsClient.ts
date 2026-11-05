"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * true in the browser, false during server render and hydration.
 * Use for client-only things like createPortal(document.body). Replaces the
 * `useEffect(() => setMounted(true), [])` pattern without a cascading re-render.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}