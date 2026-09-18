"use client";

import { motion } from "framer-motion";

const personas = [
  {
    emoji: "👨‍💼",
    age: "25-35",
    name: "Young Professionals",
    quote: "Career clarity before making the leap",
    count: "180+ guided",
  },
  {
    emoji: "👩‍👧",
    age: "35-50",
    name: "Families",
    quote: "Marriage, children, and family harmony",
    count: "220+ guided",
  },
  {
    emoji: "🧓",
    age: "50+",
    name: "Elders",
    quote: "Health, spiritual growth, and peace",
    count: "100+ guided",
  },
];

export default function TrustPersonas() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B8860B] mb-2">Trusted Across Generations</p>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#2A1810]">People Like You Trust ShubhMarg</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {personas.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#FFFDF8] backdrop-blur-sm border border-[#B8860B]/20 rounded-2xl p-4 text-center hover:border-[#B8860B]/30 transition-all"
            >
              <span className="text-[28px] block mb-2">{p.emoji}</span>
              <p className="text-[11px] font-bold text-[#B8860B] uppercase tracking-wider mb-1">{p.age}</p>
              <p className="text-[12px] font-bold text-[#2A1810] mb-1">{p.name}</p>
              <p className="text-[10px] text-[#6B5A48] italic mb-2">&ldquo;{p.quote}&rdquo;</p>
              <p className="text-[10px] text-[#B8860B]/70 font-bold">{p.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}