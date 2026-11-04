// Pure Pandit helpers. No fake facts: fields are shown only when the config holds a
// real value, and prices always come from the shared service catalog (never typed here).
import type { PanditProfile } from "@/config/pandit";
import { ctaPriceLabel } from "@/lib/service-catalog";

export interface VisiblePanditFields {
  name?: string;
  photoSrc?: string;
  city?: string;
  yearsOfPractice?: number;
  languages?: string[];
}

/** A string is visible only if it is non-blank after trim; the trimmed value is returned. */
function visibleString(value: string | undefined): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Returns only the fields with real, usable values.
 *
 * Name gate: a city, years or photo without a name would be an anonymous claim, so if
 * there is no visible `name` the result is `{}` (Requirement 6.5).
 */
export function getVisiblePanditFields(p: PanditProfile): VisiblePanditFields {
  const name = visibleString(p.name);
  if (!name) return {};

  const result: VisiblePanditFields = { name };

  const photoSrc = visibleString(p.photoSrc);
  if (photoSrc) result.photoSrc = photoSrc;

  const city = visibleString(p.city);
  if (city) result.city = city;

  const years = p.yearsOfPractice;
  if (typeof years === "number" && Number.isInteger(years) && years >= 1 && years <= 80) {
    result.yearsOfPractice = years;
  }

  const languages = Array.isArray(p.languages)
    ? p.languages
        .map((l) => (typeof l === "string" ? l.trim() : ""))
        .filter((l) => l.length > 0)
    : [];
  if (languages.length > 0) result.languages = languages;

  return result;
}

export interface BuyOffer {
  id: "quick-answer" | "vedic-guidance" | "temple-puja";
  href: string;
  priceLabel: string;
}

/**
 * Exactly three offers in a fixed order. Prices come from `priceLabel` (default
 * `ctaPriceLabel`, which reads `getServicePrice`), so a price change in pricing.ts
 * flows through with no other edit (Requirement 6.13).
 */
export function buildBuyLadder(
  priceLabel: (serviceId: string) => string = ctaPriceLabel
): BuyOffer[] {
  return [
    { id: "quick-answer", href: "/quick-answer", priceLabel: priceLabel("quick-answer") },
    {
      id: "vedic-guidance",
      href: "/request-guidance?service=vedic-guidance",
      priceLabel: priceLabel("vedic-guidance"),
    },
    {
      id: "temple-puja",
      href: "/request-guidance?service=temple-puja",
      priceLabel: priceLabel("temple-puja"),
    },
  ];
}
