"use client";

import React, { useState, useEffect } from "react";
import { Lock, ShieldCheck, ArrowRight, Flame, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "./DirectWhatsAppButton";

interface SealedEnvelopeProps {
  seekerName?: string;
  toolName?: string;
  gotra?: string;
  serviceId?: string;
  serviceName?: string;
  price?: number | string;
  highlightWarning?: string;
}

export default function SealedGotraDestinyEnvelope({
  seekerName = "Seeker",
  toolName = "Vedic Astrological Assessment",
  gotra,
  serviceId = "vedic-guidance",
  serviceName = "Pandit Ji's Consecrated Gotra Remedy",
  price = 501,
  highlightWarning = "A crucial malefic planetary transit peak is active in your chart that requires specific Beej Mantra frequency neutralisation.",
}: SealedEnvelopeProps) {
  const [timeLeft, setTimeLeft] = useState(894); // 14 mins 54 secs

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="my-10 relative overflow-hidden rounded-3xl border-2 border-[#d4af37] bg-[#FFFDF8] p-6 sm:p-9 shadow-[0_20px_70px_rgba(212,175,55,0.25)]">
      {/* Background radial gold glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#d4af37]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-[#72232b]/25 blur-[120px]" />

      {/* Top Consecrated Banner */}
      <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#d4af37]/30 pb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/30 bg-[#d4af37]/15 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#C25E10]">
          <Flame className="h-4 w-4 animate-pulse text-amber-400" />
          <span>Sanctified Gotra Destiny Seal</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-[#C25E10]">
          <Clock className="h-3.5 w-3.5" />
          <span>Ritual Window Closes In:</span>
          <span className="rounded bg-[#FBF6EC] px-2 py-0.5 font-bold text-[#C25E10] border border-amber-500/30">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Wax-Sealed Gold Envelope Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-xs rounded-2xl border-2 border-[#B8860B]/30 bg-gradient-to-br from-[#2b170c] via-[#3a1d0f] to-[#1f0e07] p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.8)] group hover:border-[#d4af37] transition-all">
            {/* Envelope Flap Lines */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 border-b border-[#d4af37]/30 bg-gradient-to-b from-white/5 to-transparent rounded-t-2xl" />

            {/* Sacred Wax Seal Stamp */}
            <div className="relative mx-auto my-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] via-[#b38918] to-[#6b4703] shadow-[0_0_30px_rgba(212,175,55,0.6)] border-2 border-amber-200">
              <span className="font-devanagari text-2xl font-black text-[#1a0c06] select-none">
                ॥ श्री ॥
              </span>
              <div className="absolute -inset-1 rounded-full border border-[#d4af37] animate-ping opacity-30" />
            </div>

            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#C25E10] font-serif">
              CONSECRATED ENVELOPE
            </p>
            <p className="text-[11px] text-amber-100/70 font-mono">
              Prepared for: <span className="text-[#FFFDF8] font-bold">{seekerName}</span>
              {gotra && <span className="block text-[10px] text-[#F5A623]">Gotra: {gotra}</span>}
            </p>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[#C25E10] font-medium bg-[#FFFDF8] py-1 px-2.5 rounded-full border border-[#B8860B]/20">
              <Lock className="h-3 w-3" />
              <span>3 Confidential Gotra Remedies Inside</span>
            </div>
          </div>
        </div>

        {/* Right Details & Direct Unlock Action */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 uppercase tracking-wider mb-1">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span>Critical Astrological Anomaly Identified in {toolName}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#2A1810] leading-snug">
              Pandit Ji Has Sealed Your Complete Gotra Shanti Remedy
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#6B5A48] leading-relaxed font-light">
            {highlightWarning} Standard public remedies are insufficient for this planetary alignment. Your sealed dossier contains the exact Sanskrit Beej Mantra frequency, wearing day, and gotra-specific invocation.
          </p>

          {/* What is locked inside list */}
          <div className="rounded-2xl bg-[#FBF6EC] border border-[#d4af37]/20 p-4 space-y-2 text-xs text-[#6B5A48]">
            <p className="font-bold text-[#C25E10] text-[11px] uppercase tracking-wider">
              🔒 Locked Inside Your Personal Consecrated Dossier:
            </p>
            <ul className="space-y-1.5 pl-1">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>Exact 48-Hour Turning Window when this planetary friction neutralizes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>Personalized Sanskrit Beej Mantra audio chanting rhythm &amp; count</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>100% Confidential Gotra Sankalp with Audio Blessing &amp; Certified PDF Dossier</span>
              </li>
            </ul>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href={`/request-guidance?service=${serviceId}`}
              className="flex-1 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_30px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Break Sacred Seal &amp; Unlock ({typeof price === "number" ? `₹${price}` : price})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <DirectWhatsAppButton
              variant="compact"
              serviceName={serviceName}
              price={price}
              seekerName={seekerName}
              className="py-3.5 px-5 rounded-2xl justify-center text-xs"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#6B5A48] pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-[#C25E10]" />
            <span>100% Guaranteed Confidential • Direct Pandit Ji Voice &amp; Consecration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
