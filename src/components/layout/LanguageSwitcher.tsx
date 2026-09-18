"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SUPPORTED_LANGS } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const active = SUPPORTED_LANGS.find((l) => l.code === lang) ?? SUPPORTED_LANGS[0];

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ y: -1 }}
        aria-label="Change language"
        aria-expanded={open}
        className="flex items-center gap-1.5 h-9 pl-2.5 pr-3 rounded-full border border-[#E8791E]/40 bg-gradient-to-b from-[#FFF6E6] to-[#FCE9CC] text-[#C25E10] hover:border-[#E8791E]/70 hover:shadow-[0_2px_10px_rgba(232,121,30,0.25)] transition-all shadow-sm"
        title={`Language: ${active.label}`}
      >
        <Globe className="w-4 h-4 shrink-0" />
        {/* Short uppercase code — compact (EN, HI, KN…) */}
        <span className="font-sans text-[12px] font-bold tracking-wide leading-none uppercase">{active.code}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden border border-[#B8860B]/20 bg-[#FFFDF8] shadow-[0_10px_40px_rgba(0,0,0,0.15)] z-[70] max-h-[70vh] overflow-y-auto"
          >
            {SUPPORTED_LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  l.code === lang
                    ? "bg-[#E8791E]/12 text-[#C25E10]"
                    : "text-[#2A1810] hover:bg-[#F5EAD6]"
                }`}
              >
                <span className="font-serif text-[16px] w-5 text-center text-[#B8860B] shrink-0">{l.native}</span>
                <span className="flex-1 min-w-0">
                  <span className={`block text-sm leading-tight ${l.code === lang ? "font-semibold" : "font-medium"}`}>{l.label}</span>
                  {l.english !== l.label && (
                    <span className="block text-[11px] text-[#6B5A48] leading-tight">{l.english}</span>
                  )}
                </span>
                {l.code === lang && <Check className="w-4 h-4 text-[#C25E10] shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
