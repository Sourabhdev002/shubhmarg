"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Lock, Users } from "lucide-react";

/**
 * TrustPillarsStrip — a crafted, premium band of trust signals placed high on the
 * homepage so credibility reaches every visitor instantly (not hidden in chat).
 * Temple-luxury treatment: gold-ringed seal medallions, filigree corners, warm
 * inner glow, staggered reveal, and a live count-up on the "guided" stat.
 * Motion = transform/opacity only (whileInView, once) → iOS-safe.
 */

const PILLARS = [
  { icon: BadgeCheck, label: "Verified Vedic Desk", sub: "Authentic Shastra counsel" },
  { icon: ShieldCheck, label: "Certified Acharyas", sub: "Traditional guru-shishya lineage" },
  { icon: Lock, label: "100% Confidential", sub: "Your details stay private" },
  { icon: Users, label: "Guided", sub: "Seekers across the world", count: 60000, suffix: "+" },
];

// Small count-up that runs once when scrolled into view.
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1400;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, reduce]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function TrustPillarsStrip() {
  return (
    <section className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FBF6EC] to-[#F5EAD6] border-y border-[#B8860B]/25 py-7 sm:py-10 overflow-hidden">
      {/* Ambient warmth */}
      <span className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-[#E8791E]/[0.07] blur-3xl" />
      <span className="pointer-events-none absolute -bottom-16 right-10 w-72 h-72 rounded-full bg-[#D4AF37]/[0.08] blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-3.5 sm:px-6">
        {/* Eyebrow header */}
        <div className="text-center mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 shadow-[0_2px_10px_rgba(107,42,20,0.08)]">
            <span className="text-[#E8791E] text-xs">✦</span>
            <p className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#C25E10]">
              Why seekers trust ShubhMarg
            </p>
            <span className="text-[#E8791E] text-xs">✦</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-[#E8791E] text-[10px]">𑁍</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              className="group relative rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FCF6EA] border border-[#D4AF37]/40 px-3.5 py-4 sm:px-4 sm:py-5 shadow-[0_10px_28px_-14px_rgba(107,42,20,0.22),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_18px_38px_-14px_rgba(184,134,11,0.3),0_0_20px_rgba(212,175,55,0.14)] hover:border-[#D4AF37]/80 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
            >
              {/* Filigree corner accents */}
              <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/50 rounded-tl pointer-events-none group-hover:border-[#E8791E] transition-colors" />
              <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/50 rounded-br pointer-events-none group-hover:border-[#E8791E] transition-colors" />
              {/* Warm inner glow on hover */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-16 bg-[#E8791E]/0 group-hover:bg-[#E8791E]/10 blur-2xl rounded-full transition-colors duration-500" />

              {/* Wax-seal style medallion: gold gradient ring + WARM CREAM interior with a
                  saffron-gold icon (matches your other premium seals — bright temple palette,
                  not heavy black-on-cream). Green only as a tiny verified pip. */}
              <span className="relative mb-2.5 shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[2px] shadow-[0_5px_16px_-4px_rgba(184,134,11,0.45)] group-hover:scale-105 transition-transform duration-300">
                <span className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF8] via-[#FDF3E2] to-[#F5E5C4] border border-[#E8791E]/30 flex items-center justify-center text-[#C25E10] shadow-[inset_0_2px_4px_rgba(184,134,11,0.15)]">
                  <p.icon className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_1px_2px_rgba(194,94,16,0.35)]" strokeWidth={2.2} />
                </span>
                {/* tiny emerald verified pip */}
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1E9E56] border-2 border-[#FFFDF8] flex items-center justify-center shadow-sm">
                  <BadgeCheck className="w-2.5 h-2.5 text-white" />
                </span>
              </span>

              <p className="text-[12.5px] sm:text-[15px] font-bold text-[#2A1810] font-serif leading-tight">
                {"count" in p && p.count ? (
                  <>
                    <CountUp to={p.count} suffix={p.suffix ?? ""} /> {p.label}
                  </>
                ) : (
                  p.label
                )}
              </p>
              <p className="text-[10px] sm:text-[11.5px] text-[#6B5A48] font-sans leading-snug mt-0.5 max-w-[16ch]">
                {p.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
