"use client";

import React from "react";
import { TraditionalIcon } from "@/components/icons/TraditionalIcon";
import { PersonalizedIcon } from "@/components/icons/PersonalizedIcon";
import { ConfidentialityIcon } from "@/components/icons/ConfidentialityIcon";
import { CommunicationIcon } from "@/components/icons/CommunicationIcon";
import { HonestIcon } from "@/components/icons/HonestIcon";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Traditional Approach",
    description: "Rooted in authentic Vedic wisdom & timeless methodologies.",
    icon: TraditionalIcon,
  },
  {
    title: "Personalized Guidance",
    description: "Every reading is uniquely crafted for your chart and question.",
    icon: PersonalizedIcon,
  },
  {
    title: "Strict Confidentiality",
    description: "Your privacy is our priority. 100% secure and discreet.",
    icon: ConfidentialityIcon,
  },
  {
    title: "Clear Communication",
    description: "Guidance in simple language you can understand and apply.",
    icon: CommunicationIcon,
  },
  {
    title: "Honest & Transparent",
    description: "We provide clarity and direction, not unrealistic guarantees.",
    icon: HonestIcon,
  }
];

export default function WhyChoose() {
  return (
    <section className="bg-brand-ivory py-24 sm:py-32 relative overflow-hidden border-t border-brand-gold/10">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center px-6 relative z-10"
        >
          <p className="text-[11px] sm:text-[12px] font-sans font-extrabold uppercase tracking-[0.25em] text-[#b08d13] mb-4">
            WHY SHUBHMARG?
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal font-serif tracking-tight mb-4">
            A commitment to your journey
          </h2>
          <p className="text-[14px] sm:text-[15px] text-brand-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            We preserve the sanctity of traditional astrology with a modern approach, ensuring a trustworthy and enlightened experience.
          </p>
        </motion.div>

        {/* Spacious, staggered grid for luxury breathing room */}
        <div className="flex flex-wrap justify-center gap-y-16 gap-x-8 md:gap-x-12 relative max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                key={index} 
                className="relative flex flex-col items-center text-center group w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-32px)] bg-[#fbf9f4] rounded-2xl border border-brand-gold/15 p-6 shadow-sm hover:shadow-md hover:border-brand-gold/30 transition-all"
              >
                <div className="w-14 h-14 lg:w-16 lg:h-16 mb-5 flex-shrink-0 text-[#B8860B]">
                  <Icon className="w-full h-full drop-shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:text-brand-saffron" />
                </div>
                
                <div>
                  <h3 className="text-[18px] font-bold tracking-tight text-brand-charcoal font-serif mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-brand-charcoal/75 max-w-[280px]">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
