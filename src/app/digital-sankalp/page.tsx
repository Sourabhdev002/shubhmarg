"use client";

import React, { useState } from "react";
import { Flame, Sparkles, CheckCircle2 } from "lucide-react";

interface SankalpEntry {
  id: string;
  name: string;
  city: string;
  intention: string;
  timestamp: string;
}

const SAMPLE_SANKALPS: SankalpEntry[] = [
  { id: "1", name: "Suresh Sharma", city: "Varanasi", intention: "Family Peace & Health", timestamp: "Just now" },
  { id: "2", name: "Ananya Deshmukh", city: "Pune", intention: "Career Breakthrough & Success", timestamp: "5 mins ago" },
  { id: "3", name: "Rajesh Iyer", city: "Chennai", intention: "Child Education & Wisdom", timestamp: "12 mins ago" },
  { id: "4", name: "Meera Patel", city: "Ahmedabad", intention: "Marital Harmony & Happiness", timestamp: "25 mins ago" },
];

export default function DigitalSankalpPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [intention, setIntention] = useState("Health & Vitality (आरोग्य)");
  const [isLit, setIsLit] = useState(false);
  const [sankalps, setSankalps] = useState<SankalpEntry[]>(SAMPLE_SANKALPS);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleLightDiya = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLit(true);
    setHasSubmitted(true);

    const newEntry: SankalpEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      city: city.trim() || "India",
      intention,
      timestamp: "Just now",
    };

    setSankalps([newEntry, ...sankalps]);
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Deep ambient temple glow */}
      <div className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-amber-600/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-3">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
              Sacred Virtual Shrine &amp; Prayer Altar
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Digital Vedic Sankalp &amp; Diya Shrine
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Light a consecrated virtual Diya, invoke sacred intentions (*Sankalpa*), and register your prayers at the ShubhMarg altar for divine peace and harmony.
          </p>
        </div>

        {/* ── Virtual Diya Shrine Stage ── */}
        <div className="bg-gradient-to-b from-[#180d09] via-[#241009] to-[#120704] border-2 border-[#d4af37]/60 rounded-3xl p-8 sm:p-12 shadow-2xl mb-10 text-center relative overflow-hidden">
          {/* Diya Visual Altar */}
          <div className="relative inline-block my-6">
            {/* Glowing Flame */}
            <div className={`transition-all duration-1000 flex flex-col items-center ${isLit ? "opacity-100 scale-110" : "opacity-30 scale-90"}`}>
              <div className="w-10 h-16 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[2px] animate-pulse shadow-[0_0_50px_rgba(255,165,0,0.8)]" />
              <div className="w-2 h-4 bg-white/80 rounded-full -mt-5 blur-[1px]" />
            </div>

            {/* Brass Diya Vessel */}
            <div className="w-32 h-14 bg-gradient-to-r from-[#b38918] via-[#e5c453] to-[#b38918] rounded-b-full border-t-2 border-[#fff] shadow-2xl mx-auto -mt-2 relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#5c3e06] rounded-full" />
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-serif font-bold mt-4">
              {isLit ? "॥ दीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः ॥" : "Tap below to light this sacred Diya"}
            </p>
          </div>

          {/* Form */}
          {!hasSubmitted ? (
            <form onSubmit={handleLightDiya} className="max-w-md mx-auto space-y-4 text-left mt-6">
              <div>
                <label className="block text-xs font-semibold text-[#FFFDF8] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#FFFDF8] mb-1">City / Gotra</label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai / Kashyap"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFFDF8] mb-1">Sankalp Category</label>
                  <select
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Health & Vitality (आरोग्य)">Health &amp; Vitality (आरोग्य)</option>
                    <option value="Career & Business Triumph (कार्यसिद्धि)">Career &amp; Growth (कार्यसिद्धि)</option>
                    <option value="Family Peace & Harmony (शांति)">Family Peace (शांति)</option>
                    <option value="Marriage & Love (वैवाहिक सुख)">Marriage &amp; Love (सुख)</option>
                    <option value="Spiritual Wisdom (ज्ञान)">Spiritual Growth (ज्ञान)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-[#d4af37] to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Flame className="w-4 h-4 fill-black" />
                <span>Light Sacred Diya &amp; Register Sankalp</span>
              </button>
            </form>
          ) : (
            <div className="max-w-md mx-auto mt-4 p-4 rounded-2xl bg-black/50 border border-[#d4af37]/40 text-center animate-fadeIn">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-base font-bold !text-[#FFFDF8] font-serif" style={{ color: "#FFFDF8" }}>Sankalpa Successfully Consecrated</h4>
              <p className="text-xs text-[#EAE3D2] mt-1">
                May your prayer for <strong>{intention}</strong> be fulfilled with divine grace and peace.
              </p>
            </div>
          )}
        </div>

        {/* ── Live Community Sankalp Wall ── */}
        <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#B8860B]/20 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C25E10]" />
              <h3 className="text-base font-bold font-serif text-[#2A1810]">
                Live Community Sankalp Wall
              </h3>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#C25E10] bg-[#FDF3E2] px-3 py-1 rounded-full border border-[#B8860B]/30">
              Active Prayers: {sankalps.length + 142}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sankalps.map((item) => (
              <div key={item.id} className="bg-[#FDFBF7] border border-[#B8860B]/25 rounded-2xl p-4 flex items-start gap-3 shadow-sm hover:border-[#C25E10]/40 transition-all">
                <div className="w-8 h-8 rounded-full bg-[#FDF3E2] border border-[#B8860B]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Flame className="w-4 h-4 text-[#C25E10] fill-[#C25E10]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2A1810]">
                    {item.name} <span className="text-[10px] text-[#6B5A48] font-normal">({item.city})</span>
                  </h4>
                  <p className="text-xs text-[#C25E10] font-bold mt-0.5">{item.intention}</p>
                  <span className="text-[10px] text-[#8B7E74] font-medium font-mono mt-1 block">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
