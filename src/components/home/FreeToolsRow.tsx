"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Gift } from "lucide-react";
import PremiumVedicIcon from "@/components/ui/PremiumVedicIcon";
import { useT } from "@/context/LanguageContext";

/** Five free tools, each leading to a clear next step. Replaces the old 38-tool wall on the home page. */
const TOOLS = [
  { href: "/free-reading", icon: "rajayoga-scanner", key: "tools.free_reading" },
  { href: "/shani-sade-sati", icon: "shani-sade-sati", key: "tools.sadesati" },
  { href: "/manglik-rescue", icon: "manglik-rescue", key: "tools.manglik" },
  { href: "/compatibility", icon: "kundli-milan", key: "tools.milan" },
  { href: "/muhurta-finder", icon: "muhurta-finder", key: "tools.muhurta" },
];

export default function FreeToolsRow() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="free-tools-title" className="relative pt-6 sm:pt-10 pb-10 sm:pb-14 overflow-hidden surface-bronze">
      <span className="glow-fill" />
      <div className="relative z-10 max-w-5xl mx-auto section-px">
        <div className="text-center mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8] border border-[#D4AF37]/55 shadow-[0_4px_14px_rgba(184,134,11,0.15)]">
            <Gift className="w-3.5 h-3.5 text-[#C25E10]" aria-hidden="true" />
            <span className="text-[10.5px] sm:text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#8C3F08] uppercase">{t("tools.eyebrow")}</span>
          </div>
          <h2 id="free-tools-title" className="mt-3 text-2xl sm:text-3xl font-bold font-cormorant tracking-tight text-[#22130A]">
            {t("tools.title")}
          </h2>
        </div>

        <ul className="grid grid-cols-3 sm:grid-cols-5 gap-x-2 gap-y-5 sm:gap-4">
          {TOOLS.map((tool, i) => (
            <motion.li
              key={tool.href}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={tool.href} className="group flex flex-col items-center text-center rounded-2xl p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]">
                <span className="w-[68px] h-[68px] sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] shadow-[0_10px_24px_-12px_rgba(107,42,20,0.45)] transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="w-full h-full rounded-full bg-[#0D0907] flex items-center justify-center overflow-hidden">
                    <PremiumVedicIcon name={tool.icon} size={46} />
                  </span>
                </span>
                <span className="mt-2 text-[12px] sm:text-[13px] font-bold font-serif text-[#2A1810] leading-snug group-hover:text-[#C25E10] transition-colors">
                  {t(tool.key)}
                </span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">{t("tools.free")}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}