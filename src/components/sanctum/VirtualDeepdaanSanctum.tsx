"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Bell, Sparkles, Flower, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { waLink } from "@/config/contact";

export default function VirtualDeepdaanSanctum() {
  const [seekerName, setSeekerName] = useState("");
  const [gotra, setGotra] = useState("");
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [flowersOffered, setFlowersOffered] = useState(0);
  const [bellRung, setBellRung] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleLightDiya = () => {
    setIsDiyaLit(true);
    if (!showCertificate) setShowCertificate(true);
  };

  const handleOfferFlowers = () => {
    setFlowersOffered((prev) => prev + 1);
  };

  const handleRingBell = () => {
    setBellRung(true);
    try {
      const audio = new Audio("/audio/ganesha-invocation.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch {}
    setTimeout(() => setBellRung(false), 2000);
  };

  const cleanName = seekerName.trim() || "Devoted Seeker";
  const cleanGotra = gotra.trim() || "Kashyap";

  const whatsappUrl = waLink(
    `Namaste Pandit Ji 🙏 I have consecrated my Virtual Deepdaan on ShubhMarg.\n\n*Name:* ${cleanName}\n*Gotra:* ${cleanGotra}\n\nPlease perform my live physical Deepdaan & Gotra Sankalp at Dashashwamedh Ghat, Kashi tonight (₹501).`
  );

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#d4af37] bg-gradient-to-b from-[#1c0b07] via-[#120503] to-[#080201] p-6 sm:p-14 shadow-[0_25px_100px_rgba(212,175,55,0.35)] text-center">
      {/* Background Sacred Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-black/90" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-[#d4af37]/20 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#72232b]/30 blur-[150px]" />

      {/* Decorative Corner Gold Seals */}
      <div className="pointer-events-none absolute top-4 left-4 text-[#d4af37]/40 text-xs font-serif">✦ ॥ श्री ॥ ✦</div>
      <div className="pointer-events-none absolute top-4 right-4 text-[#d4af37]/40 text-xs font-serif">✦ ॥ ॐ ॥ ✦</div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Sacred Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/50 text-[#d4af37] text-[11px] font-extrabold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Kashi Vishwanath Digital Sanctum</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2 leading-tight">
          ॥ पावन दीपदान एवं पुष्पांजलि सेवा ॥
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/90 font-serif italic max-w-lg mx-auto mb-2">
          &ldquo;दीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः। दीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तु ते॥&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto mb-8 font-light leading-relaxed">
          Step into our consecrated digital sanctum. Light your Gotra Diya, offer fresh pushpanjali, and ring the temple bell to dedicate your prayers directly to Kashi Vishwanath.
        </p>

        {/* Input Details Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/70 border border-[#d4af37]/40 rounded-3xl p-5 sm:p-6 mb-8 text-left backdrop-blur-xl shadow-2xl">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1.5">
              Your Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Aditi Sharma"
              value={seekerName}
              onChange={(e) => setSeekerName(e.target.value)}
              className="w-full bg-black/80 border border-white/20 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1.5">
              Your Gotra (Ancestral Lineage)
            </label>
            <input
              type="text"
              placeholder="e.g. Kashyap, Bharadwaj, Vashishta"
              value={gotra}
              onChange={(e) => setGotra(e.target.value)}
              className="w-full bg-black/80 border border-white/20 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>
        </div>

        {/* ── Central Consecrated Altar Stage ── */}
        <div className="relative my-8 py-12 px-6 rounded-[2.5rem] bg-gradient-to-b from-black/90 via-[#260e06]/90 to-black/95 border-2 border-[#d4af37]/60 shadow-[0_20px_70px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center">
          
          {/* Floating Flower Petals Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
            {flowersOffered > 0 &&
              Array.from({ length: Math.min(flowersOffered * 4, 24) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, opacity: 0, scale: 0.6 }}
                  animate={{ y: 320, opacity: [0, 1, 0.8, 0], scale: 1.1, rotate: i * 60 }}
                  transition={{ duration: 3, repeat: Infinity, delay: (i % 8) * 0.35 }}
                  className="absolute text-xl"
                  style={{ left: `${(i * 14) % 86 + 7}%` }}
                >
                  🌸
                </motion.div>
              ))}
          </div>

          {/* Central Diya Visual */}
          <div className="relative my-4 flex flex-col items-center justify-center">
            {/* Concentric Pulsing Light Orbit */}
            {isDiyaLit && (
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute -inset-8 rounded-full bg-gradient-to-r from-amber-500/20 via-[#ffd700]/30 to-orange-500/20 blur-xl pointer-events-none"
              />
            )}

            <motion.button
              type="button"
              onClick={handleLightDiya}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className={`relative w-44 h-44 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-700 shadow-2xl ${
                isDiyaLit
                  ? "bg-gradient-to-br from-[#a05216] via-[#d48118] to-[#592304] border-4 border-amber-300 shadow-[0_0_90px_rgba(245,158,11,0.9)]"
                  : "bg-black/80 border-2 border-[#d4af37]/50 hover:border-[#d4af37]"
              }`}
            >
              {isDiyaLit ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.18, 1], rotate: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  >
                    <Flame className="w-20 h-20 text-amber-100 drop-shadow-[0_0_30px_#f59e0b]" />
                  </motion.div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-100 mt-2 font-serif">
                    ॥ प्रज्वलित दीप ॥
                  </span>
                </>
              ) : (
                <>
                  <Flame className="w-14 h-14 text-[#d4af37]/70 mb-1" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#d4af37]">
                    Tap to Light Diya
                  </span>
                </>
              )}
            </motion.button>

            {isDiyaLit && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 px-4 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-xs font-serif text-[#ffd700] font-semibold"
              >
                ✨ Consecrated in {cleanName}&apos;s Gotra ({cleanGotra})
              </motion.div>
            )}
          </div>

          {/* Interactive Altar Buttons (Ghanta & Pushpanjali) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6 z-10">
            <button
              type="button"
              onClick={handleRingBell}
              className={`px-5 py-3 rounded-2xl border flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-lg ${
                bellRung
                  ? "bg-amber-500/40 border-amber-300 text-amber-200 scale-105 shadow-[0_0_30px_rgba(245,158,11,0.6)]"
                  : "bg-black/60 hover:bg-white/10 border-[#d4af37]/40 text-gray-200"
              }`}
            >
              <Bell className={`w-4 h-4 text-[#d4af37] ${bellRung ? "animate-bounce" : ""}`} />
              <span>{bellRung ? "🔔 Ghanta Naad Resonating" : "Ring Temple Bell"}</span>
            </button>

            <button
              type="button"
              onClick={handleOfferFlowers}
              className="px-5 py-3 rounded-2xl bg-black/60 hover:bg-white/10 border border-[#d4af37]/40 text-gray-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <Flower className="w-4 h-4 text-pink-400" />
              <span>Offer Pushpanjali ({flowersOffered})</span>
            </button>
          </div>
        </div>

        {/* ── Consecrated Deepdaan Seal & WhatsApp Consecration Card ── */}
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-8 bg-gradient-to-b from-[#2a1309] to-black/90 border-2 border-[#d4af37] rounded-[2rem] p-6 sm:p-9 text-left shadow-2xl animate-fadeIn"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/30 mb-5">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37]">
                  Sanctified Offering Dedicated
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  Gotra Deepdaan Sealed at Kashi Sanctum
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a4214] text-black font-black flex items-center justify-center text-sm font-devanagari shadow-lg">
                ॥ श्री ॥
              </div>
            </div>

            <div className="bg-black/60 border border-white/15 rounded-2xl p-4 mb-6 text-xs text-gray-300 space-y-1.5 font-mono">
              <p>• <strong>Seeker:</strong> <span className="text-white">{cleanName}</span></p>
              <p>• <strong>Gotra:</strong> <span className="text-[#d4af37]">{cleanGotra}</span></p>
              <p>• <strong>Sanctum Altar:</strong> <span className="text-gray-200">ShubhMarg Kashi Vishwanath Peeth, Varanasi</span></p>
            </div>

            {/* High-Ticket Physical Altar Action */}
            <div className="bg-gradient-to-r from-[#3b170b] via-[#240d06] to-[#3b170b] border-2 border-amber-500/50 rounded-2xl p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <h4 className="text-sm font-bold font-serif text-white mb-1">
                  Perform Physical Deepdaan at Dashashwamedh Ghat Tonight
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Pandit Ji will personally light an energized brass Diya with your Gotra Sankalp on the sacred Ganga during evening Maha Aarti, sending your personalized audio blessing &amp; Certified PDF dossier on WhatsApp.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
                <Link
                  href="/request-guidance?service=temple-puja"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Book Temple Puja (₹2,100)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all"
                >
                  <span>WhatsApp Diya (₹501)</span>
                </a>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>100% Authentic Vedic Consecration • Personalized Audio Blessing &amp; Certified PDF Included</span>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
