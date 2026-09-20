"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Briefcase, Coins, Activity, Users, HelpCircle, CheckCircle2 } from "lucide-react";
import { pixelViewContent } from "@/components/analytics/pixelEvents";

// GUIDANCE QUIZ - the anti-confusion converter.
// 3 quick taps -> recommends ONE service (kills 38-tool choice paralysis).

type Concern = { id: string; label: string; hindi: string; icon: typeof Heart; service: string; recommend: string; price: string; };

const CONCERNS: Concern[] = [
  { id: "love", label: "Love & Relationships", hindi: "प्रेम", icon: Heart, service: "/request-guidance?service=vedic-guidance&concern=love", recommend: "Prashna Love Reading", price: "501" },
  { id: "career", label: "Career & Job", hindi: "करियर", icon: Briefcase, service: "/request-guidance?service=vedic-guidance&concern=career", recommend: "Career Prashna", price: "501" },
  { id: "marriage", label: "Marriage / Matching", hindi: "विवाह", icon: Users, service: "/compatibility", recommend: "36-Guna Kundli Milan", price: "1501" },
  { id: "money", label: "Money & Wealth", hindi: "धन", icon: Coins, service: "/request-guidance?service=vedic-guidance&concern=money", recommend: "Wealth Reading", price: "501" },
  { id: "health", label: "Health & Peace", hindi: "स्वास्थ्य", icon: Activity, service: "/request-guidance?service=vedic-guidance&concern=health", recommend: "Health Prashna", price: "501" },
  { id: "unsure", label: "Not sure / General", hindi: "सामान्य", icon: HelpCircle, service: "/free-reading", recommend: "Free Mini Reading", price: "0" },
];

const TIMING = [
  { id: "urgent", label: "Urgent - need answer today" },
  { id: "soon", label: "This week" },
  { id: "exploring", label: "Just exploring" },
];

export default function GuidanceQuiz() {
  const [step, setStep] = useState(0);
  const [concern, setConcern] = useState<Concern | null>(null);
  const [timing, setTiming] = useState<string | null>(null);

  const pickConcern = (c: Concern) => { setConcern(c); pixelViewContent("quiz_concern_" + c.id); setStep(1); };
  const pickTiming = (t: string) => { setTiming(t); setStep(2); };

  // If urgent -> nudge Tatkal; else recommended service.
  const finalHref = concern ? (timing === "urgent" ? "/quick-answer" : concern.service) : "/request-guidance";
  const finalLabel = concern ? (timing === "urgent" ? "Tatkal Answer in 1 hour" : concern.recommend) : "Get Guidance";
  const finalPrice = concern ? (timing === "urgent" ? "99" : concern.price) : "";

  return (
    <section className="relative section-py overflow-hidden surface-bronze">
      <span className="glow-fill" />
      <div className="pointer-events-none absolute top-10 left-1/4 w-80 h-80 bg-[#F5A623]/[0.10] rounded-full blur-[120px]" />
      <div className="relative z-10 max-w-2xl mx-auto section-px">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF9EE] via-[#FFF3D6] to-[#FFF9EE] border border-[#D4AF37]/60 mb-3 shadow-[0_4px_14px_rgba(184,134,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-[#C25E10] animate-pulse" />
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#8C3F08] uppercase">Find Your Path - 20 Seconds</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cormorant text-[#2A1810] tracking-tight">
            Not sure where to begin?
          </h2>
          <p className="text-[13px] sm:text-sm text-[#6B5A48] font-sans font-medium mt-2">
            Answer 2 quick questions - Pandit Ji will point you to the right guidance.
          </p>
          {/* progress dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[0,1,2].map(i => (
              <span key={i} className={"h-1.5 rounded-full transition-all " + (i <= step ? "w-8 bg-[#E8791E]" : "w-2 bg-[#D4AF37]/40")} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.35}}>
              <p className="text-center text-[13px] font-sans font-bold text-[#8C3F08] uppercase tracking-wider mb-4">What is on your mind?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CONCERNS.map(c => {
                  const Icon = c.icon;
                  return (
                    <button key={c.id} onClick={() => pickConcern(c)}
                      className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#FFFDF8] border border-[#D4AF37]/35 hover:border-[#E8791E]/70 hover:-translate-y-1 shadow-[0_4px_16px_-6px_rgba(74,38,14,0.15)] transition-all cursor-pointer">
                      <span className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFF3D6] to-[#F3DEC0] border border-[#D4AF37]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-[#C25E10]" />
                      </span>
                      <span className="text-[12px] font-sans font-bold text-[#2A1810] text-center leading-tight">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.35}}>
              <p className="text-center text-[13px] font-sans font-bold text-[#8C3F08] uppercase tracking-wider mb-4">How soon do you need clarity?</p>
              <div className="space-y-3 max-w-md mx-auto">
                {TIMING.map(t => (
                  <button key={t.id} onClick={() => pickTiming(t.id)}
                    className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#FFFDF8] border border-[#D4AF37]/35 hover:border-[#E8791E]/70 shadow-sm transition-all cursor-pointer">
                    <span className="text-[14px] font-sans font-semibold text-[#2A1810]">{t.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#C25E10]" />
                  </button>
                ))}
              </div>
              <div className="text-center mt-4">
                <button onClick={() => setStep(0)} className="text-[12px] text-[#6B5A48] hover:text-[#2A1810] underline">Back</button>
              </div>
            </motion.div>
          )}

          {step === 2 && concern && (
            <motion.div key="s2" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:0.4}}
              className="rounded-3xl p-6 bg-gradient-to-b from-[#FFFDF9] via-[#FCF6EA] to-[#F5EAD6] border border-[#D4AF37]/45 shadow-[0_12px_34px_-12px_rgba(184,134,11,0.28)] text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C3F08] mb-1">Pandit Ji recommends for you</p>
              <h3 className="text-xl sm:text-2xl font-bold font-cormorant text-[#2A1810] mb-1">{finalLabel}</h3>
              <p className="text-[13px] text-[#6B5A48] font-sans mb-4">
                For your <strong className="text-[#C25E10]">{concern.label}</strong> concern{finalPrice !== "0" ? <> - <strong>{finalPrice === "" ? "" : "\u20b9" + finalPrice}</strong></> : <> - <strong>FREE</strong></>}
              </p>
              <Link href={finalHref} onClick={() => pixelViewContent("quiz_result_" + concern.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[14px] bg-gradient-to-r from-[#E8791E] via-[#F5A623] to-[#E8791E] text-white shadow-[0_4px_18px_rgba(232,121,30,0.45)] active:scale-95 transition-all">
                <span>Begin now</span><ArrowRight className="w-4 h-4" />
              </Link>
              <div className="mt-3">
                <button onClick={() => { setStep(0); setConcern(null); setTiming(null); }} className="text-[12px] text-[#6B5A48] hover:text-[#2A1810] underline">Start over</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
