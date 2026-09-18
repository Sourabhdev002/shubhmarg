"use client";

import React from "react";
import { AlertTriangle, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "./DirectWhatsAppButton";

interface AstrologicalGapProps {
  toolName: string;
  planetaryAlertTitle?: string;
  planetaryAlertDesc?: string;
  recommendedServiceId?: string;
  recommendedServiceName?: string;
  price?: number | string;
}

export default function AstrologicalGapDiagnosis({
  toolName,
  planetaryAlertTitle = "Crucial Astrological Transition Flagged",
  planetaryAlertDesc = "Your assessment indicates an active planetary transition that requires Gotra-specific Beej Mantra energization to prevent recurring obstacles and unlock auspicious flow.",
  recommendedServiceId = "vedic-guidance",
  recommendedServiceName = "Pandit Ji's Personalized Remedy & Sankalp",
  price = 501,
}: AstrologicalGapProps) {
  return (
    <div className="my-8 bg-gradient-to-r from-[#24110b] via-[#311409] to-[#200d08] border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Alert Header */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
        <AlertTriangle className="w-4 h-4 text-amber-400" />
        <span>Pandit Ji&apos;s Astrological Gap Analysis for {toolName}</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-2">
        {planetaryAlertTitle}
      </h3>

      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 max-w-3xl">
        {planetaryAlertDesc}
      </p>

      {/* Trust & Guarantee Pill */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-white/10 text-xs text-gray-300">
        <div className="flex items-center gap-1.5 text-[#d4af37]">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-semibold">100% Confidential Gotra Consecration</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span className="font-semibold">100% Dakshina Satisfaction Guarantee</span>
        </div>
      </div>

      {/* Dual CTAs: Web Form + 1-Tap WhatsApp */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
        <Link
          href={`/request-guidance?service=${recommendedServiceId}`}
          className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Unlock Remedy with Pandit Ji ({typeof price === "number" ? `₹${price}` : price})</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <DirectWhatsAppButton
          variant="compact"
          serviceName={recommendedServiceName}
          price={price}
          className="py-3.5 px-5 rounded-2xl justify-center text-xs"
        />
      </div>
    </div>
  );
}
