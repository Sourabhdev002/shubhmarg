"use client";

// Meta Pixel event helper — fire these on key actions so you can SEE the funnel
// (visit -> view service -> begin guidance -> lead) in Meta Events Manager,
// and so Meta can optimize for people who actually convert.

type FbqParams = Record<string, unknown>;

export function trackPixel(event: string, params?: FbqParams) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

// Convenience wrappers for the funnel
export const pixelViewContent = (name: string) =>
  trackPixel("ViewContent", { content_name: name });

export const pixelLead = (name: string) =>
  trackPixel("Lead", { content_name: name });

export const pixelInitiateCheckout = (value?: number) =>
  trackPixel("InitiateCheckout", value ? { value, currency: "INR" } : undefined);

export const pixelContact = (channel: string) =>
  trackPixel("Contact", { channel });
