"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const topics = [
  {
    id: "career",
    label: "Career",
    emoji: "💼",
    question: "Should I change my job this year?",
    answer: "Based on your Shani Mahadasha and Jupiter's transit through the 10th house, this is a period of consolidation, not change. The ideal window for career transition opens after March 2027 when Jupiter enters your 11th house...",
    service: "Prashna — ₹501",
  },
  {
    id: "marriage",
    label: "Marriage",
    emoji: "💑",
    question: "When will I get married?",
    answer: "Your 7th house lord Venus is currently retrograde in navamsa, creating a temporary delay. However, the upcoming Rahu-Ketu transit in late 2027 activates your 7th house strongly — this is your most likely window...",
    service: "Kundli Reading — ₹1,101",
  },
  {
    id: "business",
    label: "Business",
    emoji: "📈",
    question: "Is this the right time to start?",
    answer: "Your 10th lord in the 11th house is exceptionally strong — this is one of the best placements for entrepreneurship. However, avoid launching during the current Mercury retrograde. The muhurta after 15th of next month is ideal...",
    service: "Muhurta — ₹701",
  },
  {
    id: "health",
    label: "Health",
    emoji: "🧘",
    question: "Why do I keep falling sick?",
    answer: "Your 6th house has a Ketu placement which indicates recurring issues that are hard to diagnose. The remedial approach here is through specific mantras for Ketu and dietary adjustments based on your moon sign...",
    service: "Remedy — ₹1,101",
  },
];

export default function InteractiveTopics() {
  const [active, setActive] = useState("career");
  const topic = topics.find(t => t.id === active) || topics[0];

  return (
    <section className="relative surface-maroon-wash py-16 sm:py-24 overflow-hidden">
      <span className="ember-br" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5A623]/[0.10] rounded-full blur-[130px]" />
      <div className="relative z-10 max-w-4xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F5EAD6] border border-[#B8860B]/35 rounded-full px-3.5 py-1 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-pulse" />
            <span className="text-[10.5px] font-sans font-bold text-[#B8860B] uppercase tracking-wider">3 readings being prepared now</span>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B8860B] mb-2 font-sans">See What You Get</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cormorant text-[#2A1810] tracking-tight">What is your question about?</h2>
          <div className="flex items-center justify-center gap-3 my-2.5 opacity-70">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[#B8860B] text-xs">✦</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
        </div>

        {/* Topic selector pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {topics.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-4 py-2 rounded-full text-[12.5px] font-bold transition-all border cursor-pointer ${
                active === t.id
                  ? "bg-gradient-to-r from-[#C9A646] to-[#E2C875] text-[#0B0807] border-[#E2C875] shadow-[0_2px_15px_rgba(201,166,70,0.4)] scale-105"
                  : "bg-[#F5EAD6] text-[#6B5A48] border-[#B8860B]/25 hover:border-[#B8860B]/50 hover:text-[#2A1810]"
              }`}
              style={{ touchAction: "manipulation" }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Dynamic answer card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="surface-bronze-glass card-light-sweep border border-[#B8860B]/30 rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.15)]"
          >
            {/* Question */}
            <div className="px-6 py-4 border-b border-[#B8860B]/20 flex items-center gap-3 bg-[#F5EAD6]">
              <span className="text-[22px]">{topic.emoji}</span>
              <p className="text-[#2A1810] font-cormorant text-[17px] font-bold italic">&ldquo;{topic.question}&rdquo;</p>
            </div>

            {/* Sample answer */}
            <div className="px-6 py-5">
              <p className="text-[10.5px] font-bold uppercase tracking-widest text-[#B8860B] mb-2 font-mono">Sample Answer Preview</p>
              <p className="text-[#2A1810] text-[14px] leading-[1.7] font-sans font-normal">
                {topic.answer}
              </p>
            </div>

            {/* CTA */}
            <div className="px-6 py-4 bg-[#F5EAD6] border-t border-[#B8860B]/20 flex items-center justify-between">
              <span className="text-[13px] text-[#B8860B] font-bold font-cormorant">{topic.service}</span>
              <Link
                href="/request-guidance"
                className="bg-gradient-to-r from-[#C9A646] to-[#E2C875] text-[#0B0807] text-[11px] font-sans font-bold uppercase tracking-widest px-5 py-2 rounded-full active:scale-[0.98] hover:scale-105 transition-all shadow-[0_4px_16px_rgba(201,166,70,0.35)] cursor-pointer"
                style={{ touchAction: "manipulation" }}
              >
                Get My Answer
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}