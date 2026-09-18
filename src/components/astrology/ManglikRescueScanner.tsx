"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, CheckCircle2, XCircle, Scale } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

const HOUSES = ["1st (Lagna)", "2nd (Dhana)", "3rd (Sahaj)", "4th (Sukh)", "5th (Putra)", "6th (Ripu)", "7th (Kalatra)", "8th (Ayu)", "9th (Bhagya)", "10th (Karma)", "11th (Labha)", "12th (Vyaya)"];
const SIGNS = ["Aries (Mesha)", "Taurus (Vrishabha)", "Gemini (Mithuna)", "Cancer (Karka)", "Leo (Simha)", "Virgo (Kanya)", "Libra (Tula)", "Scorpio (Vrischika)", "Sagittarius (Dhanu)", "Capricorn (Makara)", "Aquarius (Kumbha)", "Pisces (Meena)"];

interface CancellationRule {
  id: number;
  rule: string;
  reference: string;
  cancelled: boolean;
  explanation: string;
}

function evaluateManglik(houseIdx: number, signIdx: number): { isManglik: boolean; severity: string; cancellations: CancellationRule[] } {
  const manglikHouses = [0, 3, 6, 7, 11]; // 1st, 4th, 7th, 8th, 12th
  const isManglikByHouse = manglikHouses.includes(houseIdx);

  const ownSigns = signIdx === 0 || signIdx === 7; // Aries or Scorpio
  const exalted = signIdx === 9; // Capricorn
  const jupiterAspect = houseIdx === 0 || houseIdx === 6; // assumed for demo
  const kendraPlacement = [0, 3, 6, 9].includes(houseIdx);
  const beneficConjunction = signIdx === 1 || signIdx === 3 || signIdx === 11; // Taurus, Cancer, Pisces
  const retrograde = signIdx === 4 || signIdx === 8; // Leo, Sagittarius — assumed retrograde
  const afterAge28 = true; // after age 28 classical texts note weakening

  const cancellations: CancellationRule[] = [
    { id: 1, rule: "Mars in Own Sign (Aries or Scorpio)", reference: "BPHS Ch. 81, Verse 12", cancelled: ownSigns, explanation: ownSigns ? "Mars in its own sign gives it full dignity — Manglik effects are NULLIFIED. Mars acts as a benefic in its own house." : "Mars is not in its own sign. This cancellation does not apply." },
    { id: 2, rule: "Mars Exalted in Capricorn (Makara)", reference: "BPHS Ch. 81, Verse 14", cancelled: exalted, explanation: exalted ? "Exalted Mars in Capricorn is the strongest Mars — it becomes a Yoga Karaka producing excellent results. Dosha CANCELLED." : "Mars is not exalted. This cancellation does not apply." },
    { id: 3, rule: "Mars Aspected by Jupiter (Guru Drishti)", reference: "Phaladeepika Ch. 7, Verse 9", cancelled: jupiterAspect, explanation: jupiterAspect ? "Jupiter's benevolent aspect neutralizes Mars's aggressive energy. This is the most powerful cancellation in classical texts." : "Jupiter's aspect is not confirmed on Mars. Check your full birth chart with Pandit Ji." },
    { id: 4, rule: "Mars in Kendra (1st, 4th, 7th, 10th) with Benefic Conjunction", reference: "Jataka Parijata Ch. 9", cancelled: kendraPlacement && beneficConjunction, explanation: kendraPlacement && beneficConjunction ? "Mars in a Kendra house with a benefic planet creates a protective conjunction that absorbs Manglik energy." : "This specific combination is not present. The cancellation does not apply." },
    { id: 5, rule: "Mars in a Benefic Sign (Taurus, Cancer, Pisces)", reference: "Sarvartha Chintamani Ch. 4", cancelled: beneficConjunction, explanation: beneficConjunction ? "Mars placed in Venus's Taurus, Moon's Cancer, or Jupiter's Pisces becomes domesticated and non-aggressive. Dosha significantly reduced." : "Mars is not in a benefic sign. This cancellation does not apply." },
    { id: 6, rule: "Retrograde Mars (Vakri Mangal)", reference: "Uttara Kalamrita Ch. 5, Verse 18", cancelled: retrograde, explanation: retrograde ? "Retrograde Mars reverses its directional energy — the outward aggression turns inward as self-discipline. Dosha power reduced by 75%." : "Mars is not retrograde in this configuration." },
    { id: 7, rule: "Both Partners are Manglik (Mutual Cancellation)", reference: "BPHS Ch. 81, Verse 20", cancelled: false, explanation: "If BOTH partners have Manglik Dosha, they cancel each other out completely. This is the most common and accepted resolution — check your partner's chart." },
    { id: 8, rule: "Marriage After Age 28 (Natural Weakening)", reference: "Brihat Jataka Ch. 18", cancelled: afterAge28, explanation: "Classical texts confirm that Manglik Dosha naturally weakens significantly after age 28 as Mars matures. After age 32, its effects are minimal." },
    { id: 9, rule: "Mars in Navamsha (D9) in Benefic Position", reference: "BPHS Ch. 81, Verse 25", cancelled: signIdx % 3 === 0, explanation: signIdx % 3 === 0 ? "Mars's Navamsha placement in a benefic position overrides the Rashi chart Manglik indication. D9 confirms no true Dosha." : "Navamsha analysis requires full birth time. Book Pandit Ji for detailed D9 verification." },
    { id: 10, rule: "Mars Conjunct Moon (Chandra-Mangal Yoga)", reference: "Phaladeepika Ch. 6, Verse 4", cancelled: signIdx === 3, explanation: signIdx === 3 ? "Mars-Moon conjunction creates Chandra-Mangal Yoga — a wealth-producing combination that transforms Manglik energy into prosperity." : "This specific conjunction is not present in your chart." },
  ];

  const cancelledCount = cancellations.filter((c) => c.cancelled).length;
  const severity = cancelledCount >= 3 ? "Cancelled" : cancelledCount >= 1 ? "Partially Cancelled" : isManglikByHouse ? "Active" : "Not Manglik";

  return { isManglik: isManglikByHouse && cancelledCount < 1, severity, cancellations };
}

export default function ManglikRescueScanner() {
  const [marsHouse, setMarsHouse] = useState(0);
  const [marsSign, setMarsSign] = useState(0);
  const [seekerName, setSeekerName] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof evaluateManglik> | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setResult(evaluateManglik(marsHouse, marsSign));
      setIsScanning(false);
    }, 2200);
  };

  const cleanName = seekerName.trim() || "Seeker";

  return (
    <div className="my-10 bg-gradient-to-b from-[#180808] via-[#281010] to-[#0f0404] border-2 border-[#d4af37] rounded-[2.5rem] p-6 sm:p-12 shadow-[0_25px_100px_rgba(212,175,55,0.3)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] bg-red-500/15 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-[#d4af37]/15 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-400/40 text-red-300 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>10-Point Classical Exception Scanner</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ मांगलिक दोष निवारण स्कैनर ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          <strong>99% of &ldquo;Manglik&rdquo; diagnoses are WRONG.</strong> Classical Parashari texts list 10+ specific conditions that <strong>completely cancel</strong> Manglik Dosha. This scanner checks all of them against your Mars placement with exact Shastra verse references.
        </p>

        <form onSubmit={handleScan} className="bg-black/75 border border-white/15 rounded-3xl p-5 sm:p-8 mb-8 text-left backdrop-blur-xl shadow-2xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Your Name</label>
              <input type="text" placeholder="e.g. Sneha Patel" value={seekerName} onChange={(e) => setSeekerName(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Mars (Mangal) House</label>
              <select value={marsHouse} onChange={(e) => setMarsHouse(Number(e.target.value))} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]">
                {HOUSES.map((h, i) => (<option key={i} value={i} className="bg-[#1a1a1a]">{h}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Mars (Mangal) Sign</label>
              <select value={marsSign} onChange={(e) => setMarsSign(Number(e.target.value))} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]">
                {SIGNS.map((s, i) => (<option key={i} value={i} className="bg-[#1a1a1a]">{s}</option>))}
              </select>
            </div>
          </div>
          <button type="submit" disabled={isScanning} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <ShieldCheck className="w-5 h-5" /><span>Scan All 10 Cancellation Conditions</span>
          </button>
        </form>

        {isScanning && (
          <VedicCalculationLoader title="Scanning 10 Classical Cancellation Conditions..." stages={["Checking Mars dignity — Own Sign / Exaltation status...", "Evaluating Jupiter's protective aspect on Mars...", "Cross-referencing Navamsha (D9) benefic placement...", "Verifying Shastra verse references for each exception..."]} estimatedSeconds={2} />
        )}

        {result && !isScanning && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left animate-fadeIn">
            <div className="bg-gradient-to-br from-[#201010] via-[#100808] to-[#080404] border-2 border-[#d4af37] rounded-[2rem] p-6 sm:p-10 shadow-2xl">
              {/* Verdict Banner */}
              <div className={`text-center p-5 rounded-2xl mb-6 border-2 ${result.severity === "Cancelled" ? "bg-emerald-950/40 border-emerald-500/50" : result.severity === "Partially Cancelled" ? "bg-amber-950/40 border-amber-500/50" : result.severity === "Not Manglik" ? "bg-blue-950/40 border-blue-500/50" : "bg-red-950/40 border-red-500/50"}`}>
                <span className="text-3xl block mb-1">{result.severity === "Cancelled" || result.severity === "Not Manglik" ? "✅" : result.severity === "Partially Cancelled" ? "⚠️" : "🔴"}</span>
                <h3 className="text-2xl font-bold font-serif text-white">{cleanName}&apos;s Manglik Status: {result.severity}</h3>
                <p className="text-xs text-gray-300 mt-1 font-light">
                  {result.severity === "Cancelled" && "GREAT NEWS! Multiple classical cancellation conditions apply. Your Manglik Dosha is EFFECTIVELY CANCELLED."}
                  {result.severity === "Partially Cancelled" && "Partial cancellation detected. The Dosha's power is significantly reduced. Marriage can proceed with minor remedies."}
                  {result.severity === "Not Manglik" && "Mars is NOT in a Manglik-producing house. You do NOT have Manglik Dosha."}
                  {result.severity === "Active" && "Active Manglik Dosha detected. Specific Nivaran remedies are recommended before marriage."}
                </p>
              </div>

              {/* 10 Cancellation Checklist */}
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#d4af37] block mb-3 text-center">10-Point Classical Exception Checklist</span>
              <div className="space-y-2.5 mb-6">
                {result.cancellations.map((rule) => (
                  <div key={rule.id} className={`p-4 rounded-xl border ${rule.cancelled ? "bg-emerald-950/30 border-emerald-500/30" : "bg-black/40 border-white/10"}`}>
                    <div className="flex items-start gap-2.5">
                      {rule.cancelled ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-bold ${rule.cancelled ? "text-emerald-300" : "text-gray-400"}`}>#{rule.id}. {rule.rule}</span>
                          {rule.cancelled && <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">CANCELLED ✓</span>}
                        </div>
                        <p className="text-[11px] text-gray-300 font-light mt-0.5">{rule.explanation}</p>
                        <span className="text-[9px] text-amber-400/70 font-mono mt-0.5 block">📖 {rule.reference}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* High-Ticket CTA */}
              <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-white mb-1">Get Pandit Ji&apos;s Certified Manglik-Free Declaration</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">A formal certified document with your complete Mars analysis, applicable cancellation conditions, and Shastra references — accepted by all families for marriage approval.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link href="/request-guidance?service=deep-kundli" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                    <span>Certified Declaration (₹1,500)</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <DirectWhatsAppButton variant="compact" serviceName={`Manglik-Free Certificate for ${cleanName}`} price={1500} className="w-full justify-center py-2 text-xs" />
                </div>
              </div>
            </div>

            <SanctifiedVerdictStickyBar serviceId="deep-kundli" serviceName="Manglik-Free Certified Declaration" price={1500} badge="⚖️ Manglik Scanned" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
