"use client";

import React, { useState, useEffect } from "react";
import { Compass, AlertTriangle, ShieldCheck } from "lucide-react";

interface ShoolaData {
  dayName: string;
  blockedDirection: string;
  blockedHindi: string;
  remedyIfUnavoidable: string;
  openDirections: string[];
}

const DISHA_SHOOLA_RULES: Record<number, ShoolaData> = {
  0: { dayName: "Sunday (Ravivar)", blockedDirection: "West (Pashchima)", blockedHindi: "पश्चिम दिशा", remedyIfUnavoidable: "Consume a fresh Betel Leaf (Paan) or Ghee before departing.", openDirections: ["East", "North", "North-East", "South"] },
  1: { dayName: "Monday (Somvar)", blockedDirection: "East (Purva)", blockedHindi: "पूर्व दिशा", remedyIfUnavoidable: "Consume fresh White Curd (Dahi) or view a mirror before stepping out.", openDirections: ["North", "West", "South", "North-West"] },
  2: { dayName: "Tuesday (Mangalvar)", blockedDirection: "North (Uttara)", blockedHindi: "उत्तर दिशा", remedyIfUnavoidable: "Consume a piece of pure Jaggery (Gud) and drink clean water.", openDirections: ["South", "East", "West", "South-East"] },
  3: { dayName: "Wednesday (Budhvar)", blockedDirection: "North (Uttara)", blockedHindi: "उत्तर दिशा", remedyIfUnavoidable: "Consume a few fresh Coriander seeds (Dhaniya) or green cardamom.", openDirections: ["South", "East", "West", "North-East"] },
  4: { dayName: "Thursday (Guruvar)", blockedDirection: "South (Dakshina)", blockedHindi: "दक्षिण दिशा", remedyIfUnavoidable: "Consume Yellow Mustard seeds (Sarson) or Curd with sweet saffron.", openDirections: ["North", "East", "West", "North-East"] },
  5: { dayName: "Friday (Shukravar)", blockedDirection: "West (Pashchima)", blockedHindi: "पश्चिम दिशा", remedyIfUnavoidable: "Consume Barley (Jau) or Sweet Milk preparation before departure.", openDirections: ["East", "North", "South", "South-East"] },
  6: { dayName: "Saturday (Shanivar)", blockedDirection: "East (Purva)", blockedHindi: "पूर्व दिशा", remedyIfUnavoidable: "Consume a small piece of Ginger (Adrak) or Black Sesame (Til).", openDirections: ["West", "South", "North", "South-West"] },
};

export default function DishaShoolaPage() {
  const [dayOfWeek, setDayOfWeek] = useState(0);

  useEffect(() => {
    queueMicrotask(() => setDayOfWeek(new Date().getDay()));
  }, []);

  const shoola = DISHA_SHOOLA_RULES[dayOfWeek] || DISHA_SHOOLA_RULES[0];

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Deep compass ambient background glow */}
      <div className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-cyan-600/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-3">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin [animation-duration:20s]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">
              Classical Muhurta Shastra • Directional Energy
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Disha Shoola &amp; Vedic Travel Radar
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Check today&apos;s prohibited travel direction (*Disha Shoola*) according to classical Vedic Muhurta treatises, and discover ancient remedies if travel is unavoidable.
          </p>
        </div>

        {/* ── Today's Primary Alert Card ── */}
        <div className="bg-gradient-to-br from-[#12181c] to-[#0c1216] border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl mb-10 text-center relative overflow-hidden">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300 font-bold mb-2">
            {shoola.dayName}
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif !text-[#FFFDF8] mb-2" style={{ color: "#FFFDF8" }}>
            Prohibited Direction: <span className="text-red-400">{shoola.blockedDirection}</span>
          </h2>
          <p className="text-xs text-[#EAE3D2] font-serif font-medium">({shoola.blockedHindi})</p>

          <div className="max-w-xl mx-auto mt-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-left flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider !text-red-300" style={{ color: "#FCA5A5" }}>
                Vedic Muhurta Advisory
              </h4>
              <p className="text-xs text-[#FFFDF8] leading-relaxed mt-1">
                Initiating a long journey towards the <strong>{shoola.blockedDirection}</strong> today is traditionally avoided as it invites delays, vehicular friction, and mental fatigue.
              </p>
            </div>
          </div>
        </div>

        {/* ── 8-Direction Interactive Compass Grid ── */}
        <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl mb-10">
          <h3 className="text-base font-bold font-serif text-[#2A1810] mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#C25E10]" />
            <span>Today&apos;s 8-Directional Status</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"].map((dir) => {
              const isBlocked = shoola.blockedDirection.toLowerCase().includes(dir.toLowerCase());
              return (
                <div
                  key={dir}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    isBlocked
                      ? "bg-rose-50 border-rose-300 text-rose-900 shadow-sm"
                      : "bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm"
                  }`}
                >
                  <div className="text-sm font-extrabold mb-1">{dir}</div>
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                    isBlocked ? "bg-rose-100 text-rose-800 border border-rose-300" : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  }`}>
                    {isBlocked ? "Prohibited" : "Auspicious"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Remedy If Travel is Mandatory ── */}
        <div className="bg-gradient-to-r from-[#18110b] to-[#241409] border-2 border-[#d4af37]/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#d4af37] mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span>Remedy If Travel is Unavoidable (दोष निवारण उपाय)</span>
          </div>
          <h3 className="text-xl font-bold font-serif !text-[#FFFDF8] mb-2" style={{ color: "#FFFDF8" }}>
            {shoola.remedyIfUnavoidable}
          </h3>
          <p className="text-xs text-[#EAE3D2] leading-relaxed">
            If you must travel in the {shoola.blockedDirection} today for emergencies or scheduled flights, perform this sattvic consumption ritual and take 5 steps backwards before embarking towards your destination.
          </p>
        </div>
      </div>
    </main>
  );
}
