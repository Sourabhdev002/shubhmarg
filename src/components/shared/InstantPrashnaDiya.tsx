"use client";

import React, { useState } from "react";
import { Flame, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { waLink } from "@/config/contact";

interface InstantPrashnaProps {
  toolName?: string;
}

export default function InstantPrashnaDiya({ toolName = "Vedic Guidance" }: InstantPrashnaProps) {
  const [question, setQuestion] = useState("");
  const [seekerName, setSeekerName] = useState("");
  const [isDiyaLit, setIsDiyaLit] = useState(false);

  const handleLightDiya = () => {
    if (!isDiyaLit) {
      setIsDiyaLit(true);
    }
  };

  const cleanQuestion = question.trim() || "What is the primary planetary remedy for my current life phase?";
  const cleanName = seekerName.trim() || "Seeker";

  const whatsappUrl = waLink(
    `Namaste Pandit Ji 🙏 I have lit a sacred Diya on ShubhMarg (${toolName}).\n\n*Name:* ${cleanName}\n*My Urgent Question:* ${cleanQuestion}\n\nPlease share Pandit Ji's direct audio guidance & Gotra Sankalp remedy (₹501).`
  );

  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-9 shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)] relative overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute right-0 top-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#C25E10] text-[10px] font-extrabold uppercase tracking-widest mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Instant Pandit Ji WhatsApp Dispatch</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#2A1810]">
            Ask Pandit Ji 1 Direct Burning Question Right Now
          </h3>
          <p className="text-xs text-[#6B5A48] mt-1 max-w-lg mx-auto">
            Light a consecrated Diya, type your specific concern, and receive Pandit Ji&apos;s spoken voice note on WhatsApp within 2 hours.
          </p>
        </div>

        {/* Diya Lighting Interaction */}
        <div className="flex flex-col items-center justify-center my-6">
          <button
            type="button"
            onClick={handleLightDiya}
            className={`group relative flex flex-col items-center justify-center p-4 rounded-full transition-all duration-500 cursor-pointer ${
              isDiyaLit
                ? "bg-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.5)] scale-110"
                : "bg-[#FFFDF8] hover:bg-[#FBF6EC] border border-amber-500/30"
            }`}
            aria-label="Light virtual Diya"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
              isDiyaLit ? "text-[#C25E10] shadow-[0_0_30px_#f59e0b]" : "text-amber-500/60"
            }`}>
              <Flame className={`w-10 h-10 transition-transform ${isDiyaLit ? "scale-125 animate-bounce" : "group-hover:scale-110"}`} />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 transition-colors ${
              isDiyaLit ? "text-[#C25E10]" : "text-[#6B5A48]"
            }`}>
              {isDiyaLit ? "✨ Diya Consecrated for Your Prayer" : "Tap to Light Sacred Diya"}
            </span>
          </button>
        </div>

        {/* Question Form Input */}
        <div className="space-y-3 bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B5A48] mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-3 py-2 text-xs text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B5A48] mb-1">
                Response Speed
              </label>
              <div className="flex items-center gap-2 h-9 px-3 bg-[#FDF3E2] rounded-xl border border-[#B8860B]/20 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Priority VIP Audio Response (Under 120 Mins)</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B5A48] mb-1">
              Your Burning Question (Career, Marriage, Money, Health)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. I am facing sudden job insecurity. When will this phase improve and what specific remedy should I do?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-3 py-2 text-xs text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:brightness-110 text-[#2A1810] font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send Question to Pandit Ji on WhatsApp (₹501)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[#6B5A48] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C25E10]" />
            <span>100% Private Audio Note recorded personally by Pandit Ji in Kashi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
