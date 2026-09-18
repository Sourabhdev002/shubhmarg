"use client";

import { motion } from "framer-motion";

// Simple daily recommendation based on day of week (Vedic hora system)
function getTodayGuidance() {
  const day = new Date().getDay();
  const guidance = [
    { planet: "Sun", good: "Starting spiritual practices, meeting authorities", avoid: "Starting new loans", color: "#D4AF37" },
    { planet: "Moon", good: "Travel, new relationships, creative work", avoid: "Surgery, aggressive negotiations", color: "#C0C0C0" },
    { planet: "Mars", good: "Property deals, physical activities, courage", avoid: "Starting partnerships, weddings", color: "#DC2626" },
    { planet: "Mercury", good: "Business deals, education, communication", avoid: "Long-term commitments", color: "#16A34A" },
    { planet: "Jupiter", good: "Investments, marriage talks, religious activities", avoid: "Lending money to strangers", color: "#D4AF37" },
    { planet: "Venus", good: "Romance, buying vehicles/jewelry, art", avoid: "Fasting, austerity", color: "#EC4899" },
    { planet: "Saturn", good: "Discipline, clearing debts, charity", avoid: "New ventures, celebrations", color: "#1E3A5F" },
  ];
  return guidance[day];
}

export default function TodayAuspicious() {
  const g = getTodayGuidance();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#FFFDF8] backdrop-blur-sm border border-[#B8860B]/20 rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B]">Today&apos;s Vedic Insight</p>
        <span className="text-[10px] text-[#6B5A48] font-medium">{today} &middot; {g.planet} Day</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-emerald-600 text-[14px] mt-0.5">&#10003;</span>
          <p className="text-[13px] text-[#6B5A48]"><strong className="text-emerald-700">Favourable:</strong> {g.good}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-red-500 text-[14px] mt-0.5">&#10007;</span>
          <p className="text-[13px] text-[#6B5A48]"><strong className="text-red-600">Avoid:</strong> {g.avoid}</p>
        </div>
      </div>
    </motion.div>
  );
}