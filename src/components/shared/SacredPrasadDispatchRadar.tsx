"use client";

import React, { useState } from "react";
import { Search, ShieldCheck, MapPin, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ConsecrationStage {
  step: number;
  title: string;
  location: string;
  time: string;
  status: "completed" | "active" | "upcoming";
  description: string;
  proofBadge?: string;
}

const SAMPLE_TRACKING_DATA: Record<string, {
  referenceId: string;
  seekerName: string;
  gotra: string;
  serviceName: string;
  trackingNumber: string;
  estimatedDelivery: string;
  stages: ConsecrationStage[];
}> = {
  "SHUBH-KASHI-7789": {
    referenceId: "SHUBH-KASHI-7789",
    seekerName: "Anand R. Verma",
    gotra: "Kashyap",
    serviceName: "Remote Kashi Vishwanath Sankalp Puja & Prasad",
    trackingNumber: "IN-POST-KSH-889210",
    estimatedDelivery: "September 3, 2026",
    stages: [
      { step: 1, title: "Sanskrit Gotra Sankalp Recited", location: "Kashi Vishwanath Sanctum, Varanasi", time: "Aug 30, 06:30 AM", status: "completed", description: "Pandit Ji recited your name and Gotra with traditional Vedic offerings and pure Ghee Diya.", proofBadge: "🎙️ Studio Audio Blessing Sent on WhatsApp" },
      { step: 2, title: "Holy Ganga Kalash Consecration", location: "Dashashwamedh Ghat, Varanasi", time: "Aug 30, 07:45 AM", status: "completed", description: "Silver Kalash filled with sacred Ganga Jal during morning sunrise prayer.", proofBadge: "💧 Pure Gangajal Sealed" },
      { step: 3, title: "Copper Yantra & Raksha Sutra Energized", location: "ShubhMarg Consecration Peeth", time: "Aug 30, 11:00 AM", status: "completed", description: "108-Mantra Beej Pratishtha completed and sealed with royal red lacquer wax stamp.", proofBadge: "📜 Gold Certificate #CERT-8892" },
      { step: 4, title: "Insured Doorstep Dispatch via SpeedPost", location: "Varanasi Postal Sorting Hub", time: "Aug 31, 09:15 AM", status: "active", description: "Package in transit to your registered doorstep address with tamper-proof packaging.", proofBadge: "🚚 In Transit • SpeedPost" },
    ],
  },
};

export default function SacredPrasadDispatchRadar() {
  const [searchId, setSearchId] = useState("SHUBH-KASHI-7789");
  const [currentTracking, setCurrentTracking] = useState(SAMPLE_TRACKING_DATA["SHUBH-KASHI-7789"]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchId.trim().toUpperCase();
    if (SAMPLE_TRACKING_DATA[clean]) {
      setCurrentTracking(SAMPLE_TRACKING_DATA[clean]);
    } else {
      // Create dynamic active record for any search ID
      setCurrentTracking({
        referenceId: clean || "SHUBH-LIVE-DEMO",
        seekerName: "Devoted Seeker",
        gotra: "Bharadwaj",
        serviceName: "Consecrated Temple Puja & Blessed Prasad Kit",
        trackingNumber: `IN-POST-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: "In 2–3 Business Days",
        stages: [
          { step: 1, title: "Sanskrit Gotra Sankalp Recited", location: "Kashi Vishwanath Sanctum, Varanasi", time: "Today, Morning Muhurta", status: "completed", description: "Pandit Ji consecrated your prayer at the main temple altar.", proofBadge: "🎙️ Audio Dossier Delivered" },
          { step: 2, title: "Holy Ganga Jal & Prasad Purification", location: "Dashashwamedh Ghat", time: "Today, 08:30 AM", status: "completed", description: "Blessed Gangajal and sacred Raksha Sutra prepared.", proofBadge: "💧 100% Consecrated" },
          { step: 3, title: "Gold Wax Seal & Authenticity Certificate", location: "ShubhMarg Vedic Peeth", time: "Today, 11:30 AM", status: "active", description: "Packaging with official CERT-VEDIC gold-embossed seal.", proofBadge: "📜 Official Seal Applied" },
          { step: 4, title: "Insured Courier Handover", location: "Dispatch Center", time: "Scheduled for Evening", status: "upcoming", description: "Doorstep dispatch with SMS/WhatsApp tracking link.", proofBadge: "📦 Insured Dispatch" },
        ],
      });
    }
  };

  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-10 shadow-[0_20px_80px_rgba(212,175,55,0.3)] relative overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 bg-amber-500/15 rounded-full blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 w-80 h-80 bg-red-600/15 rounded-full blur-[110px]" />

      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#B8860B]/30 text-[#C25E10] text-[10px] font-extrabold uppercase tracking-widest mb-3">
          <Truck className="w-3.5 h-3.5" />
          <span>Live Consecration &amp; Prasad Dispatch Radar</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-bold font-serif text-[#2A1810] tracking-wide">
          Track Your Sacred Consecration Journey
        </h3>
        <p className="text-xs sm:text-sm text-[#6B5A48] mt-1 font-light">
          Verify every sacred milestone from Pandit Ji&apos;s live Kashi altar chanting to your doorstep Prasad delivery.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter Reference ID (e.g. SHUBH-KASHI-7789)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-3 text-xs text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-[#d4af37] font-mono"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track Journey</span>
          </button>
        </form>
      </div>

      {/* ── Active Tracking Card ── */}
      {currentTracking && (
        <div className="relative z-10 bg-gradient-to-b from-black/80 to-[#1e0a05] border-2 border-[#B8860B]/30 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fadeIn">
          {/* Order Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#B8860B]/20 mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C25E10] font-mono">
                Reference: {currentTracking.referenceId}
              </span>
              <h4 className="text-xl font-bold font-serif text-[#FFFDF8] mt-0.5">
                {currentTracking.serviceName}
              </h4>
              <p className="text-xs text-amber-100/70 mt-0.5">
                Seeker: <strong className="text-amber-50">{currentTracking.seekerName}</strong> • Gotra: <strong className="text-[#F5A623]">{currentTracking.gotra}</strong>
              </p>
            </div>

            <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl px-4 py-3 text-right">
              <span className="text-[10px] text-[#6B5A48] uppercase tracking-widest block font-mono">
                Tracking Number
              </span>
              <span className="text-xs font-mono font-bold text-[#C25E10]">
                {currentTracking.trackingNumber}
              </span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">
                Est: {currentTracking.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* 4-Stage Timeline Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {currentTracking.stages.map((stage) => {
              const isCompleted = stage.status === "completed";
              const isActive = stage.status === "active";

              return (
                <div
                  key={stage.step}
                  className={`rounded-2xl p-5 border flex flex-col justify-between relative transition-all ${
                    isCompleted
                      ? "bg-[#FBF6EC] border-emerald-500/40 text-[#2A1810]"
                      : isActive
                      ? "bg-gradient-to-b from-[#3a1b0d] to-[#1c0c06] border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                      : "bg-[#FFFDF8] border-[#B8860B]/20 text-[#6B5A48]"
                  }`}
                >
                  <div>
                    {/* Step Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                        isCompleted
                          ? "bg-emerald-500 text-black"
                          : isActive
                          ? "bg-[#d4af37] text-black animate-pulse"
                          : "bg-[#FBF6EC] text-[#6B5A48]"
                      }`}>
                        {stage.step}
                      </span>
                      <span className="text-[10px] text-[#6B5A48] font-mono">{stage.time}</span>
                    </div>

                    <h5 className="text-sm font-bold font-serif text-[#2A1810] mb-1">
                      {stage.title}
                    </h5>

                    <p className="text-[11px] text-[#6B5A48] mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C25E10] shrink-0" />
                      <span className="truncate">{stage.location}</span>
                    </p>

                    <p className="text-xs text-[#6B5A48] leading-relaxed font-light mb-3">
                      {stage.description}
                    </p>
                  </div>

                  {stage.proofBadge && (
                    <div className="pt-2 border-t border-[#B8860B]/20 text-[10px] font-bold text-[#C25E10]">
                      {stage.proofBadge}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Dispatch Guarantee */}
          <div className="mt-8 pt-6 border-t border-[#B8860B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-100/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
              <span>100% Insured Tamper-Proof Packaging with SpeedPost Live Tracking Guarantee.</span>
            </div>

            <Link
              href="/sacred-offerings"
              className="text-[#F5A623] hover:underline font-bold text-xs inline-flex items-center gap-1"
            >
              <span>Explore All Sacred Offerings &amp; Pujas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
