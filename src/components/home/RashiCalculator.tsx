"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RASHIS = [
  { name: "Mesh (Aries)", trait: "Bold leader with natural courage and pioneering spirit", emoji: "♈", dates: "Mar 21 - Apr 19" },
  { name: "Vrishabh (Taurus)", trait: "Steady and grounded with deep love for beauty and comfort", emoji: "♉", dates: "Apr 20 - May 20" },
  { name: "Mithun (Gemini)", trait: "Quick-minded communicator with versatile intellect", emoji: "♊", dates: "May 21 - Jun 20" },
  { name: "Kark (Cancer)", trait: "Deeply intuitive nurturer with strong emotional wisdom", emoji: "♋", dates: "Jun 21 - Jul 22" },
  { name: "Simha (Leo)", trait: "Natural authority with magnetic presence and generosity", emoji: "♌", dates: "Jul 23 - Aug 22" },
  { name: "Kanya (Virgo)", trait: "Analytical perfectionist with service-oriented heart", emoji: "♍", dates: "Aug 23 - Sep 22" },
  { name: "Tula (Libra)", trait: "Harmonious diplomat seeking balance and beauty in all things", emoji: "♎", dates: "Sep 23 - Oct 22" },
  { name: "Vrishchik (Scorpio)", trait: "Intensely passionate with transformative inner power", emoji: "♏", dates: "Oct 23 - Nov 21" },
  { name: "Dhanu (Sagittarius)", trait: "Philosophical explorer with boundless optimism", emoji: "♐", dates: "Nov 22 - Dec 21" },
  { name: "Makar (Capricorn)", trait: "Disciplined achiever destined for lasting success", emoji: "♑", dates: "Dec 22 - Jan 19" },
  { name: "Kumbh (Aquarius)", trait: "Visionary humanitarian with unconventional wisdom", emoji: "♒", dates: "Jan 20 - Feb 18" },
  { name: "Meen (Pisces)", trait: "Deeply spiritual soul with extraordinary compassion", emoji: "♓", dates: "Feb 19 - Mar 20" },
];

function getRashi(dob: string) {
  const d = new Date(dob);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 0;
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 1;
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 2;
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 3;
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 4;
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 5;
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 6;
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 7;
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 8;
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 9;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 10;
  return 11;
}

export default function RashiCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    if (dob) setResult(getRashi(dob));
  };

  const rashi = result !== null ? RASHIS[result] : null;

  return (
    <div className="bg-[#FFFDF8] backdrop-blur-sm border border-[#B8860B]/20 rounded-2xl p-5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-3">Instant Rashi Calculator</p>

      <div className="flex gap-2 mb-3">
        <input
          type="date"
          value={dob}
          onChange={e => { setDob(e.target.value); setResult(null); }}
          className="flex-1 bg-[#FFFDF8] border border-[#B8860B]/25 rounded-xl px-3 py-2.5 text-[14px] text-[#2A1810] focus:border-[#E8791E] focus:outline-none"
          style={{ fontSize: "16px" }}
        />
        <button
          onClick={handleCalculate}
          disabled={!dob}
          className="bg-brand-maroon text-white text-[11px] font-bold uppercase tracking-widest px-4 rounded-xl disabled:opacity-40 active:scale-[0.97] transition-all"
          style={{ touchAction: "manipulation" }}
        >
          Check
        </button>
      </div>

      <AnimatePresence>
        {rashi && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#F5EAD6] border border-[#B8860B]/20 rounded-xl p-4 mt-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[28px]">{rashi.emoji}</span>
                <div>
                  <p className="text-[15px] font-bold font-serif text-[#2A1810]">{rashi.name}</p>
                  <p className="text-[11px] text-[#6B5A48]">{rashi.dates}</p>
                </div>
              </div>
              <p className="text-[13px] text-[#6B5A48] italic">{rashi.trait}</p>
              <a href="/request-guidance?service=kundli" className="inline-block mt-3 text-[11px] font-bold text-[#B8860B] uppercase tracking-widest underline underline-offset-2">
                Get full Kundli reading &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}