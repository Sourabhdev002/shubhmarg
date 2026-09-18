"use client";

import { useEffect } from "react";
import { pixelInitiateCheckout } from "@/components/analytics/pixelEvents";

// Fires when a visitor reaches the guidance request page = they entered the funnel.
// Lets you see in Meta how many of your ad visitors actually START a request.
export default function GuidancePageTracker() {
  useEffect(() => {
    pixelInitiateCheckout();
  }, []);
  return null;
}
