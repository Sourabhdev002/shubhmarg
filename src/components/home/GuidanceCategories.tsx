"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

type Category = {
  name: string;
  desc: string;
  href: string;
  imageSrc: string;
};

const categories: Category[] = [
  { name: "Career & Vocation",   desc: "Professional path, growth & success", href: "/request-guidance", imageSrc: "/images/guidance/career.jpg" },
  { name: "Business Endeavors",  desc: "Growth, partnerships & prosperity", href: "/request-guidance", imageSrc: "/images/guidance/business.jpg" },
  { name: "Marriage & Union",    desc: "Compatibility, harmony & togetherness", href: "/request-guidance", imageSrc: "/images/guidance/marriage.jpg" },
  { name: "Family & Kinship",    desc: "Relationships, harmony & ancestral blessings", href: "/request-guidance", imageSrc: "/images/guidance/family.jpg" },
  { name: "Education",           desc: "Learning, wisdom & knowledge", href: "/request-guidance", imageSrc: "/images/guidance/education.jpg" },
  { name: "Wealth & Prosperity", desc: "Abundance, wealth & financial growth", href: "/request-guidance", imageSrc: "/images/guidance/wealth.jpg" },
  { name: "Property & Land",     desc: "Property, assets & real estate", href: "/request-guidance", imageSrc: "/images/guidance/property.jpg" },
  { name: "General Guidance",    desc: "Life direction, clarity & spiritual growth", href: "/request-guidance", imageSrc: "/images/guidance/guidance.jpg" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function GuidanceCategories() {
  return (
    <section className="bg-brand-parchment py-16 sm:py-24" id="guidance">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-brand-maroon mb-3">
            Areas of Guidance
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-charcoal">
            Find clarity in every area of your life
          </h2>
        </motion.div>

        {/* 1-Column Mobile, 4-Column Desktop Premium Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-4 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((category) => {
            return (
              <motion.div key={category.name} variants={itemVariants}>
                <Link
                  href={category.href}
                  className="group flex flex-col h-full items-center text-center p-6 sm:p-8 bg-[#fbf9f4] rounded-2xl border border-[#d4af37]/20 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:-translate-y-1.5 transition-all duration-500 active:opacity-80 relative overflow-hidden"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Large Premium Illustration */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-5 sm:mb-6 flex-shrink-0 relative overflow-hidden mix-blend-multiply opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 z-10">
                    <Image 
                      src={category.imageSrc} 
                      alt={category.name} 
                      fill sizes="(max-width: 768px) 50vw, 25vw" 
                      className={`object-contain drop-shadow-sm ${category.name === "General Guidance" ? "brightness-[1.35] contrast-[1.2]" : ""}`}
                    />
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-[14px] sm:text-[16px] font-serif font-bold text-brand-charcoal leading-snug mb-1.5 group-hover:text-brand-maroon transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[11.5px] sm:text-[13px] text-brand-charcoal/65 leading-relaxed">
                    {category.desc}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/request-guidance"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-maroon text-brand-ivory text-[13px] font-semibold tracking-wide transition-opacity active:scale-[0.98] hover:bg-brand-maroon-dark shadow-premium hover:shadow-premium-hover border border-brand-maroon-light min-h-[44px]"
          >
            Begin Your Guidance
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
