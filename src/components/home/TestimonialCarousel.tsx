"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/context/LanguageContext";

const reviews = [
  { quote: "The Kundli reading was so detailed — every prediction about my career transition came true within 6 months. This is not generic astrology, this is real Vedic science.", name: "Priya Sharma",    city: "Mumbai",    service: "Kundli Reading", rating: 5, initial: "P", color: "#d4af37" },
  { quote: "I was skeptical at first but the Prashna answer was incredibly specific. Panditji identified the exact problem in my business partnership that I could not see.",      name: "Rahul Mehta",     city: "Bengaluru", service: "Prashna",        rating: 5, initial: "R", color: "#8b5fbf" },
  { quote: "We got our wedding Muhurta from ShubhMarg. The dates were perfectly aligned and our families were impressed by the detail and traditional accuracy.",                   name: "Anita & Vikram", city: "Delhi",     service: "Muhurta",        rating: 5, initial: "A", color: "#e05a5a" },
  { quote: "After years of health issues, the remedies suggested actually worked. I follow the monthly guidance now and feel a genuine difference in my daily life.",              name: "Sunita Devi",    city: "Jaipur",    service: "Remedy",         rating: 5, initial: "S", color: "#38bdf8" },
];

export default function TestimonialCarousel() {
  const t = useT();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 6200);
    return () => clearInterval(timer);
  }, []);

  const r = reviews[index];

  return (
    <section className="section-py relative overflow-hidden surface-bronze">
      <span className="ember-tl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#F5A623]/[0.10] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto section-px">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3 shadow-[0_2px_10px_rgba(107,42,20,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8791E] animate-pulse" />
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#C25E10] uppercase">
              {t("testimonials.eyebrow")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#2A1810] mt-1 tracking-tight">{t("testimonials.title")}</h2>
          <div className="flex items-center justify-center gap-3 my-2.5 opacity-70">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[#D4AF37] text-xs">✦</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>

          <div className="mt-4 inline-flex items-center gap-3 bg-[#FFFDF8] border border-[#B8860B]/25 rounded-2xl px-4 py-2.5 shadow-[0_4px_14px_-6px_rgba(107,42,20,0.2)]">
            <span className="text-[2rem] font-bold font-serif text-[#C25E10] leading-none">4.9</span>
            <div className="text-left">
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-[10.5px] text-[#2E1D14] font-medium">
                {t("testimonials.based_on")} <strong className="text-[#2A1810]">500+</strong> {t("testimonials.reviews")}
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[230px] sm:min-h-[210px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 36, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -36, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FFFDF8] card-light-sweep border border-[#B8860B]/20 rounded-2xl p-5 sm:p-7 relative overflow-hidden shadow-[0_12px_32px_-16px_rgba(107,42,20,0.22)]"
            >
              <div className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{ background: `linear-gradient(to right, transparent, ${r.color}55, transparent)` }} />
              <div className="absolute top-3 right-4 font-serif text-[72px] leading-none text-[#D4AF37]/[0.15] select-none pointer-events-none">&ldquo;</div>

              <div className="flex gap-0.5 mb-3.5">
                {[...Array(r.rating)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-[15px] sm:text-[16px] text-[#2A1810] leading-[1.75] font-serif italic mb-5 font-cormorant">
                &ldquo;{r.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#0B0807] font-black text-[13px] font-serif shrink-0 shadow-inner"
                    style={{ background: `linear-gradient(135deg, ${r.color}, #C9A646)` }}>
                    {r.initial}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#2A1810] leading-none font-serif">{r.name}</p>
                    <p className="text-[10px] text-[#2E1D14] font-medium mt-0.5">{r.city}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[9.5px] font-sans font-bold uppercase tracking-[0.16em] text-[#C25E10] bg-[#FDF3E2] px-2.5 py-1 rounded-full border border-[#B8860B]/30">
                    {r.service}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[8.5px] font-bold text-emerald-700">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    Verified Seeker
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Review ${i + 1}`}
              className="relative flex items-center justify-center overflow-hidden rounded-full transition-all duration-500 focus:outline-none"
              style={{
                width: i === index ? 32 : 7, height: 7,
                background: i === index ? "linear-gradient(90deg, #a07828 0%, #E0C36A 45%, #C9A24A 100%)" : "transparent",
                border: i === index ? "1px solid rgba(224,195,106,0.6)" : "1px solid rgba(201,162,74,0.22)",
                boxShadow: i === index ? "0 0 10px 2px rgba(201,162,74,0.35)" : "none",
              }}
            >
              {i === index && (
                <motion.span
                  className="absolute top-0 left-[-60%] w-[50%] h-full -skew-x-[18deg]"
                  animate={{ left: ["-60%", "160%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
