"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, ShieldCheck, CheckCircle2, Package, FileText, Mic, QrCode } from "lucide-react";
import { ShubhMargEmblem } from "@/components/brand/ShubhMargLogo";

export default function WhatsAppProofShowcase() {
  const [activeTab, setActiveTab] = useState<"audio" | "certificate" | "prasad">("audio");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F6EEE0] border-2 border-[#D4AF37]/45 p-4 sm:p-6 shadow-[0_12px_32px_rgba(107,42,20,0.1),0_4px_16px_rgba(212,175,55,0.08)] overflow-hidden">
      
      {/* Ornate Gold Corner Motifs */}
      <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]/80 pointer-events-none rounded-tl-sm" />
      <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]/80 pointer-events-none rounded-tr-sm" />
      <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]/80 pointer-events-none rounded-bl-sm" />
      <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]/80 pointer-events-none rounded-br-sm" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3.5 border-b border-[#D4AF37]/25">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/15 via-white to-amber-500/15 border border-[#D4AF37]/40 shadow-2xs mb-1.5">
            <ShubhMargEmblem size={14} />
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C25E10]">
              100% Tangible Proof
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold font-serif text-[#2A1810]">
            What You Receive on WhatsApp &amp; Doorstep
          </h3>
          <p className="text-[11px] text-[#6B5A48] mt-0.5 max-w-lg">
            Delivered as authentic <strong className="text-[#2A1810] font-semibold">Studio Audio Dossiers (MP3)</strong> &amp; <strong className="text-[#2A1810] font-semibold">Certified Vedic Reports (PDF)</strong>.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/90 p-1 rounded-xl border border-[#D4AF37]/35 shadow-inner shrink-0 gap-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("audio")}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              activeTab === "audio"
                ? "bg-gradient-to-r from-[#7B0F1E] via-[#9E182A] to-[#630915] text-white shadow-xs"
                : "text-[#6B5A48] hover:text-[#2A1810]"
            }`}
          >
            <Mic className="w-3 h-3 text-amber-300" />
            <span>Voice Note</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("certificate")}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              activeTab === "certificate"
                ? "bg-gradient-to-r from-[#7B0F1E] via-[#9E182A] to-[#630915] text-white shadow-xs"
                : "text-[#6B5A48] hover:text-[#2A1810]"
            }`}
          >
            <FileText className="w-3 h-3 text-amber-300" />
            <span>Certified PDF</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("prasad")}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              activeTab === "prasad"
                ? "bg-gradient-to-r from-[#7B0F1E] via-[#9E182A] to-[#630915] text-white shadow-xs"
                : "text-[#6B5A48] hover:text-[#2A1810]"
            }`}
          >
            <Package className="w-3 h-3 text-amber-300" />
            <span>Prasad</span>
          </button>
        </div>
      </div>

      {/* Hidden audio element pointing to clean human priest chant */}
      <audio
        ref={audioRef}
        src="/audio/Divya Pratah Aashirwad.mp3"
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* Tab 1: Audio Note Sample */}
      {activeTab === "audio" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[#C25E10] uppercase tracking-wider">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Personalized Pandit Ji Audio Dossier</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#2A1810] font-serif leading-snug">
              Sacred Voice Note Addressing Your Gotra, Name &amp; Planetary Remedies
            </h4>
            <p className="text-[11px] text-[#6B5A48] leading-relaxed">
              Pandit Ji personally speaks your full name, Gotra, and Nakshatra during the live Sankalp at Kashi Vishwanath, followed by clear remedial explanations and spoken Beej Mantra rhythm.
            </p>
            <ul className="space-y-1.5 text-[11px] text-[#2A1810]/85 pt-0.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong className="font-semibold text-[#2A1810]">100% Human Voice:</strong> Chanted personally by Pandit Ji — zero AI.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong className="font-semibold text-[#2A1810]">320kbps MP3 on WhatsApp:</strong> Downloadable, permanent audio blessing.</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 bg-gradient-to-b from-white via-amber-50/40 to-white border border-[#D4AF37]/45 rounded-2xl p-4 text-center flex flex-col items-center justify-center shadow-xs relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
              <ShubhMargEmblem size={70} />
            </div>

            <button
              type="button"
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-[#7B0F1E] via-[#9E182A] to-[#630915] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(123,15,30,0.4)] hover:scale-105 active:scale-95 transition-all mb-2 border-2 border-[#D4AF37] cursor-pointer"
              aria-label={isPlaying ? "Pause audio sample" : "Play audio sample"}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>

            <p className="text-xs font-bold text-[#2A1810] font-serif mb-0.5">
              {isPlaying ? "Blessing Playing..." : "Sample Pandit Ji Voice Note"}
            </p>
            <p className="text-[10px] text-[#C25E10] font-semibold">
              Live Sanskrit Sankalp (Kashi Tradition)
            </p>
            <span className="mt-1.5 text-[9px] font-mono text-[#6B5A48] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              Format: High-Fidelity WhatsApp Audio MP3
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Official Certified PDF Dossier */}
      {activeTab === "certificate" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[#C25E10] uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Certified Vedic PDF Dossier</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#2A1810] font-serif leading-snug">
              Royal Gold-Embossed Planetary Chart &amp; Remedial Dossier
            </h4>
            <p className="text-[11px] text-[#6B5A48] leading-relaxed">
              Every consultation includes an official, personalized PDF document containing astrological degrees, Mahadasha timelines, and Pandit Ji&apos;s verified digital seal.
            </p>
            <ul className="space-y-1.5 text-[11px] text-[#2A1810]/85 pt-0.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong className="font-semibold text-[#2A1810]">Planetary Calculations:</strong> Lagna, Navamsha (D9), and active Dasha.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong className="font-semibold text-[#2A1810]">QR Code Verification:</strong> Scannable digital authentication.</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 bg-gradient-to-b from-white via-[#FAF5EC] to-white border border-[#D4AF37]/45 rounded-2xl p-4 text-center shadow-xs relative overflow-hidden">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-[#D4AF37]/40 text-[#7B0F1E] text-[9px] font-mono font-bold uppercase tracking-widest mb-2">
              <QrCode className="w-3 h-3" />
              <span>CERT-VEDIC-VERIFIED</span>
            </div>

            <div className="w-10 h-10 mx-auto rounded-xl bg-[#7B0F1E]/10 border border-[#D4AF37]/50 flex items-center justify-center text-[#7B0F1E] mb-2">
              <FileText className="w-5 h-5 text-[#7B0F1E]" />
            </div>

            <p className="text-xs font-bold font-serif text-[#2A1810] mb-0.5">
              Official PDF Consultation Dossier
            </p>
            <p className="text-[10px] text-[#6B5A48] mb-2">
              Delivered directly into your WhatsApp inbox.
            </p>

            <div className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300/60">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Authentic Vedic Seal Guaranteed</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Consecrated Prasad Delivery */}
      {activeTab === "prasad" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[#C25E10] uppercase tracking-wider">
              <Package className="w-3.5 h-3.5" />
              <span>Doorstep Domestic &amp; Global Courier</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#2A1810] font-serif leading-snug">
              Consecrated Sacred Temple Prasad Box (Temple Pujas)
            </h4>
            <p className="text-[11px] text-[#6B5A48] leading-relaxed">
              For seekers booking remote Sankalp Pujas, consecrated physical prasad is packed in an auspicious sealed box and dispatched to your address within 24–48 hours.
            </p>
            <ul className="space-y-1.5 text-[11px] text-[#2A1810]/85 pt-0.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong className="font-semibold text-[#2A1810]">Holy Gangajal &amp; Bhasma:</strong> Directly from holy sanctum.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong className="font-semibold text-[#2A1810]">Energized Raksha Sutra:</strong> Consecrated protective thread.</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 bg-gradient-to-b from-white via-amber-50/40 to-white border border-[#D4AF37]/45 rounded-2xl p-4 text-center shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 text-[#C25E10] mx-auto flex items-center justify-center mb-2">
              <Package className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold font-serif text-[#2A1810] mb-0.5">
              Tracked Courier Dispatch
            </p>
            <p className="text-[10px] text-[#6B5A48] mb-2">
              Speed Post / Bluedart Express with tracking.
            </p>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-500/40 text-emerald-800 text-[9px] font-extrabold uppercase tracking-wider">
              Free Express Shipping Across India
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
