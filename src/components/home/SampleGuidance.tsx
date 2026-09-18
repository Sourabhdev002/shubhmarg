"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SampleGuidance() {
  return (
    <section className="surface-bronze py-20 sm:py-28 overflow-hidden relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B8860B] mb-4">Sample Guidance</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#2A1810] mb-4">
            What to Expect
          </h2>
          <p className="text-[#6B5A48] text-[15px] max-w-xl mx-auto">
            Here is an anonymised excerpt from a real Jyotish consultation — so you know exactly what you are receiving.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Card */}
          <div className="rounded-2xl border border-[#B8860B]/20 bg-[#FFFDF8] backdrop-blur-sm overflow-hidden shadow-[0_8px_40px_rgba(107,42,20,0.15)]">
            {/* Header bar */}
            <div className="bg-[#F5EAD6] border-b border-[#B8860B]/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/30 flex items-center justify-center">
                  <span className="text-[#B8860B] text-xs font-bold">PJ</span>
                </div>
                <div>
                  <p className="text-[#2A1810] text-[13px] font-bold">ShubhMarg Practitioner</p>
                  <p className="text-[#6B5A48] text-[11px]">Vedic Jyotish Practitioner</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B]/70 bg-[#B8860B]/10 px-2.5 py-1 rounded-full">
                Jyotish Reading
              </span>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#B8860B] mb-2">Chart Overview</p>
                <p className="text-[#2A1810] text-[14px] leading-relaxed font-sans">
                  Your Lagna is Vrishchika (Scorpio) with Mars as the Lagna lord placed in the 10th house in Simha (Leo). This is a powerful placement indicating strong career drive and natural authority. The 10th house position of Mars suggests you are drawn to leadership roles and tend to achieve through direct action and perseverance.
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#B8860B] mb-2">Current Period (Dasha)</p>
                <p className="text-[#2A1810] text-[14px] leading-relaxed font-sans">
                  You are currently in Shani Mahadasha with Budh Antardasha running until early next year. Saturn in your chart occupies the 3rd house, which indicates a period of disciplined effort, some delays, but ultimately consolidation of gains. Avoid impulsive decisions in partnerships during this period.
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#B8860B] mb-2">Remedial Guidance</p>
                <p className="text-[#2A1810] text-[14px] leading-relaxed font-sans">
                  Recite the Hanuman Chalisa on Tuesdays and Saturdays. Donate mustard oil on Saturdays. Wearing a blue sapphire is not recommended in your chart at this time — please consult before any gemstone adoption.
                </p>
              </div>

              {/* Blurred last section to tease more */}
              <div className="relative">
                <div className="blur-sm select-none pointer-events-none">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#B8860B] mb-2">Marriage &amp; Relationships</p>
                  <p className="text-[#2A1810] text-[14px] leading-relaxed font-sans">
                    The 7th house lord Venus is placed in the 11th house conjunct Jupiter indicating a well-matched partner from a good family background. The timing window for marriage based on your Navamsa chart and running dasha suggests...
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    href="/request-guidance"
                    className="bg-brand-maroon text-white px-6 py-3 rounded-full text-[13px] font-bold tracking-widest uppercase shadow-lg hover:bg-brand-maroon-dark active:scale-[0.98] transition-all"
                  >
                    Get Your Full Reading
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-[#6B5A48] text-[11px] mt-4">
            * Names and identifying details anonymised. Content is representative of actual consultations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}