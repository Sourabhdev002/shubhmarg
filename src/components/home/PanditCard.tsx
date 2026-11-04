"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { useT } from "@/context/LanguageContext";
import { glassClass, type Surface } from "@/lib/home-surfaces";
import type { VisiblePanditFields, BuyOffer } from "@/lib/pandit";

/**
 * PanditCard: an honest introduction to Pandit Ji plus the three-step buy ladder.
 *
 * Every visible field comes from `getVisiblePanditFields`, which omits anything missing,
 * so there are never empty labels. Prices are passed in via `offers[].priceLabel` and are
 * never typed here (a price change in pricing.ts flows through untouched). No social-proof
 * counts, no urgency claims, no availability status — only honest fields and the buy ladder.
 */

/** Maps an offer id to its translated title key. */
const OFFER_TITLE_KEY: Record<BuyOffer["id"], string> = {
  "quick-answer": "pandit.offer.quick.title",
  "vedic-guidance": "pandit.offer.guidance.title",
  "temple-puja": "pandit.offer.sankalp.title",
};

export default function PanditCard({
  profile,
  offers,
  surface,
}: {
  profile: VisiblePanditFields;
  offers: BuyOffer[];
  surface: Surface;
}) {
  const t = useT();
  // If the photo fails to load we render nothing — never a broken image or placeholder face.
  const [imgFailed, setImgFailed] = useState(false);

  const promises = [
    t("pandit.promise.1"),
    t("pandit.promise.2"),
    t("pandit.promise.3"),
  ];

  return (
    <section
      aria-labelledby="pandit-title"
      className={`relative pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden ${glassClass(surface)}`}
    >
      <span className="glow-fill" aria-hidden="true" />
      <div className="relative z-10 max-w-3xl mx-auto section-px">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FFF6E6] to-[#FCEBCB] border border-[#D4A537]/45 shadow-[0_18px_44px_-24px_rgba(107,42,20,0.45)] p-5 sm:p-8 overflow-hidden">
          <span aria-hidden="true" className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4A537]/70 rounded-tl-sm" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4A537]/70 rounded-br-sm" />

          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 text-center sm:text-left">
            {profile.photoSrc && !imgFailed && (
              <Image
                src={profile.photoSrc}
                alt={profile.name ?? ""}
                width={96}
                height={96}
                onError={() => setImgFailed(true)}
                className="shrink-0 w-24 h-24 rounded-full object-cover ring-4 ring-[#D4A537]/30 shadow-[0_12px_30px_-10px_rgba(232,121,30,0.5)]"
              />
            )}

            <div className="flex-1 min-w-0">
              <h2
                id="pandit-title"
                className="text-2xl sm:text-3xl font-bold font-serif text-[#8B1A1A] leading-tight"
              >
                {t("pandit.title")}
              </h2>

              {profile.name && (
                <p className="mt-1.5 text-lg sm:text-xl font-semibold font-serif text-[#2A1810]">
                  {profile.name}
                </p>
              )}

              {(profile.city ||
                typeof profile.yearsOfPractice === "number" ||
                profile.languages) && (
                <dl className="mt-3 flex flex-col gap-1.5 text-[13px] sm:text-sm text-[#6B5A48]">
                  {profile.city && (
                    <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-2">
                      <dt className="font-bold uppercase tracking-[0.14em] text-[11px] text-[#B8860B]">
                        {t("pandit.field.city")}
                      </dt>
                      <dd className="font-medium text-[#2A1810]">{profile.city}</dd>
                    </div>
                  )}
                  {typeof profile.yearsOfPractice === "number" && (
                    <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-2">
                      <dt className="font-bold uppercase tracking-[0.14em] text-[11px] text-[#B8860B]">
                        {t("pandit.field.years")}
                      </dt>
                      <dd className="font-medium text-[#2A1810]">{profile.yearsOfPractice}</dd>
                    </div>
                  )}
                  {profile.languages && (
                    <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-2">
                      <dt className="font-bold uppercase tracking-[0.14em] text-[11px] text-[#B8860B]">
                        {t("pandit.field.languages")}
                      </dt>
                      <dd className="font-medium text-[#2A1810]">
                        {profile.languages.join(", ")}
                      </dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          </div>

          {/* Three honesty promises */}
          <ul className="mt-5 pt-4 border-t border-[#B8860B]/20 flex flex-col gap-2">
            {promises.map((promise) => (
              <li
                key={promise}
                className="flex items-start gap-2.5 text-[13px] sm:text-sm text-[#2A1810] font-medium"
              >
                <Leaf
                  className="shrink-0 mt-0.5 w-4 h-4 text-[#E8791E]"
                  aria-hidden="true"
                />
                <span>{promise}</span>
              </li>
            ))}
          </ul>

          {/* Buy ladder: three steps, prices supplied by offers */}
          <div className="mt-5 pt-4 border-t border-[#B8860B]/20 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {offers.map((offer) => (
              <Link
                key={offer.id}
                href={offer.href}
                className="group flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-2xl bg-[#FFFDF8] border border-[#B8860B]/30 px-4 py-3 text-center hover:border-[#E8791E] hover:shadow-[0_10px_24px_-14px_rgba(232,121,30,0.55)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]"
              >
                <span className="inline-flex items-center gap-1.5 text-[13px] sm:text-sm font-bold text-[#8C3F08]">
                  {t(OFFER_TITLE_KEY[offer.id])}
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[12.5px] font-semibold text-[#2A1810]">
                  {offer.priceLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
