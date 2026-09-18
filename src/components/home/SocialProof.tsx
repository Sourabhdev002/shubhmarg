"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, Star, Clock } from "lucide-react";
import { useT } from "@/context/LanguageContext";

function AnimatedCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString("en-IN")}</span>;
}

export default function SocialProof() {
  const t = useT();

  const stats = [
    { value: 500, suffix: "+",  labelKey: "stats.consultations", Icon: Users, fixed: false },
    { value: 4.9, suffix: "/5", labelKey: "stats.rating",        Icon: Star,  fixed: true },
    { value: 3,   suffix: t("stats.days_unit"), labelKey: "stats.delivery", Icon: Clock, fixed: false },
  ];

  return (
    <section className="relative border-y border-[#B8860B]/25 overflow-hidden surface-bronze">
      <span className="glow-fill" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      {/* soft central warmth */}
      <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-32 bg-[#E8791E]/[0.07] blur-3xl rounded-full" />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-7 sm:py-9">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.labelKey}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              className="group relative flex flex-col items-center text-center rounded-2xl bg-[#FFFDF8]/70 border border-[#D4AF37]/30 px-2 py-3.5 sm:px-3 sm:py-4 shadow-[0_6px_18px_-12px_rgba(107,42,20,0.2)] hover:border-[#D4AF37]/60 hover:shadow-[0_10px_24px_-12px_rgba(184,134,11,0.28)] transition-all duration-300"
            >
              {/* Gold-ring seal icon */}
              <span className="mb-2 shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[1.5px] shadow-[0_4px_12px_-4px_rgba(184,134,11,0.5)] group-hover:scale-105 transition-transform duration-300">
                <span className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF8] to-[#FDF3E2] border border-[#E8791E]/25 flex items-center justify-center text-[#C25E10]">
                  <s.Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.2} />
                </span>
              </span>

              <p className="text-stat text-[#C25E10] leading-none font-bold font-cormorant flex items-baseline justify-center gap-0.5">
                <span>{s.fixed ? "4.9" : <AnimatedCounter target={s.value} />}</span>
                <span className="text-[0.42em] font-semibold text-[#C25E10]/80 whitespace-nowrap">{s.suffix}</span>
              </p>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#2E1D14] mt-1 text-center leading-snug font-sans">
                {t(s.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
