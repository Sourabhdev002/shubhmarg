"use client";

import React, { useState } from "react";
import { ShieldCheck, HeartHandshake, RotateCcw, UtensilsCrossed, Sparkles, CheckCircle2, Award } from "lucide-react";
import { waLink } from "@/config/contact";

export default function DharmaGuaranteeBanner() {
  const [activeTab, setActiveTab] = useState<"refund" | "annadaan">("refund");

  return (
    <section className="relative my-10 overflow-hidden rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#1C120B] via-[#150D07] to-[#0A0503] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-left">
      {/* Background Sacred Glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#D4AF37]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#E8791E]/10 blur-3xl" />

      {/* Top Header Badge */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#D4AF37]/25">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#FFEAA7] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest font-mono">
            <Award className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>॥ धर्म शुद्धि प्रतिज्ञा ॥ Sacred Dharma Guarantee</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-bold font-serif text-[#FFFDF8]" style={{ color: "#FFFDF8" }}>
            Total Life Clarity — Or 100% Dakshina Refund / Temple Annadaan
          </h3>
          <p className="text-xs sm:text-sm text-[#D4AF37]/85 font-light leading-relaxed max-w-2xl" style={{ color: "#E2C875" }}>
            In Vedic tradition, Dakshina is an offering for truth, never a commercial sale. If Acharya Ji’s analysis does not bring genuine clarity to your soul, you hold complete sovereignty over your offering.
          </p>
        </div>

        {/* 100% Seal Emblem */}
        <div className="flex items-center gap-3 shrink-0 rounded-2xl bg-gradient-to-br from-[#2C180E] to-[#140A05] border border-[#D4AF37]/40 p-3.5 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F5A623] to-[#FFEAA7] p-[1.5px] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,166,35,0.4)]">
            <div className="w-full h-full rounded-full bg-[#1A0E08] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#FFEAA7]" />
            </div>
          </div>
          <div>
            <span className="text-[13px] font-black text-[#FFEAA7] font-serif block leading-none">100% Zero-Risk</span>
            <span className="text-[10px] text-[#D4AF37] font-mono mt-1 block">Dharma Protection</span>
          </div>
        </div>
      </div>

      {/* 2 Sacred Guarantee Paths: Refund vs Annadaan */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Choice A: 100% Instant Refund */}
        <div
          onClick={() => setActiveTab("refund")}
          className={`cursor-pointer rounded-2xl p-5 border transition-all ${
            activeTab === "refund"
              ? "border-[#D4AF37] bg-gradient-to-b from-[#2A180E] to-[#160B06] shadow-[0_8px_25px_rgba(212,175,55,0.25)]"
              : "border-white/10 bg-black/40 hover:border-[#D4AF37]/40 text-gray-400"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-black">
                <RotateCcw className="w-4 h-4 text-black font-bold" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5A623] block">Path 1</span>
                <h4 className="text-sm sm:text-base font-bold text-[#FFFDF8] font-serif" style={{ color: "#FFFDF8" }}>
                  100% Direct Dakshina Refund
                </h4>
              </div>
            </div>
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${activeTab === "refund" ? "border-[#F5A623] bg-[#F5A623]" : "border-white/30"}`}>
              {activeTab === "refund" && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-light mb-3">
            If our Vedic reading fails to identify your root karmic bottleneck accurately, send one WhatsApp message to our support. 100% of your dakshina will be returned directly to your UPI/Card within 24 hours. Zero questions asked.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#FFEAA7]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Zero financial risk for you or your family</span>
          </div>
        </div>

        {/* Choice B: Temple Annadaan Blessing */}
        <div
          onClick={() => setActiveTab("annadaan")}
          className={`cursor-pointer rounded-2xl p-5 border transition-all ${
            activeTab === "annadaan"
              ? "border-[#D4AF37] bg-gradient-to-b from-[#2A180E] to-[#160B06] shadow-[0_8px_25px_rgba(212,175,55,0.25)]"
              : "border-white/10 bg-black/40 hover:border-[#D4AF37]/40 text-gray-400"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center text-black">
                <UtensilsCrossed className="w-4 h-4 text-black font-bold" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#22C55E] block">Path 2 (Sacred Choice)</span>
                <h4 className="text-sm sm:text-base font-bold text-[#FFFDF8] font-serif" style={{ color: "#FFFDF8" }}>
                  Kashi Temple Annadaan (अन्नदान संकल्प)
                </h4>
              </div>
            </div>
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${activeTab === "annadaan" ? "border-[#22C55E] bg-[#22C55E]" : "border-white/30"}`}>
              {activeTab === "annadaan" && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-light mb-3">
            Alternatively, you can choose to convert your dakshina into sacred Annadaan (feeding sadhus, pilgrims, and the needy at Kashi Annapurna kitchen). We perform this in your Name and Gotra, delivering photographic &amp; receipt proof to your WhatsApp.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#FFEAA7]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Generates immense Punya &amp; karmic merit for your lineage</span>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Sacred Honor */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#D4AF37]/20 text-xs">
        <div className="flex items-start gap-2.5 text-gray-300">
          <Sparkles className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#FFEAA7] block">No Automated Robots</span>
            <span className="text-[11px] text-[#D4AF37]/80">100% human scholarly divination calculated by verified priests.</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-gray-300">
          <ShieldCheck className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#FFEAA7] block">Strict Confidentiality</span>
            <span className="text-[11px] text-[#D4AF37]/80">Your family details, birth charts, and problems remain private forever.</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-gray-300">
          <HeartHandshake className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#FFEAA7] block">Dharmic Integrity</span>
            <span className="text-[11px] text-[#D4AF37]/80">Rooted in Guru-Shishya tradition. We never sell fear or false gemstones.</span>
          </div>
        </div>
      </div>

      {/* Direct WhatsApp Assurance Strip */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-gray-400 text-center sm:text-left">
          Questions before booking? Speak directly with our head sevak on WhatsApp.
        </span>
        <a
          href={waLink("Namaste, I have a question regarding the Dharma Guarantee before booking.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#FFEAA7] hover:text-white font-bold transition-colors shrink-0"
        >
          <span>Ask About the Dharma Guarantee →</span>
        </a>
      </div>
    </section>
  );
}
