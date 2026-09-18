"use client";

import { usePathname } from "next/navigation";
import React from "react";

// Hides global chrome (bottom nav, tickers, chatbot, footer) on distraction-free
// routes like the payment page so nothing overlaps the checkout.
const HIDDEN_PREFIXES = ["/payment"];

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hide = HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p));
  if (hide) return null;
  return <>{children}</>;
}