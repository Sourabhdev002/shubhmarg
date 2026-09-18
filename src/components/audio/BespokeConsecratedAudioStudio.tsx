"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Sparkles, CheckCircle2, Mic, Send, Music2, Shield, Flame, Disc3, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink } from "@/config/contact";

interface SampleVoiceTrack {
  id: string;
  title: string;
  hindiTitle: string;
  deity: string;
  duration: string;
  audioSrc: string;
  description: string;
  sanskritLine: string;
}

const SAMPLE_VOICE_TRACKS: SampleVoiceTrack[] = [
  {
    id: "divya-aashirwad",
    title: "Divya Pratah Aashirwad",
    hindiTitle: "दिव्य प्रातः आशीर्वाद व रक्षा संकल्प",
    deity: "Kashi Sanctum Tradition",
    duration: "Live Voice Note",
    audioSrc: "/audio/Divya Pratah Aashirwad.mp3",
    description: "Authentic Pandit Ji spoken morning blessing invoking divine protection and life vitality.",
    sanskritLine: "॥ ॐ स्वस्ति न इन्द्रो वृद्धश्रवाः स्वस्ति नः पूषा विश्ववेदाः ॥",
  },
  {
    id: "shubh-aashirwad",
    title: "Shubh Aashirwad Mantra",
    hindiTitle: "शुभ आशीर्वाद गोत्र संकल्प मन्त्र",
    deity: "Vedic Priest Chanting",
    duration: "Live Voice Note",
    audioSrc: "/audio/Shubh Aashirwad Mantra.mp3",
    description: "Pandit Ji invoking sacred Vedic blessings for family prosperity, longevity, and wish-fulfillment.",
    sanskritLine: "॥ ॐ मन्दिर सान्निध्ये सकल मनोरथ सिद्धिरस्तु ॥",
  },
  {
    id: "shanti-path",
    title: "Graha Shanti & Shanti Path",
    hindiTitle: "ग्रह शान्ति व विश्व शान्ति पाठ",
    deity: "Navagraha & Universal Peace",
    duration: "432Hz Chant",
    audioSrc: "/audio/shanti-path.mp3",
    description: "Traditional acoustic remedy calming agitated planetary energies and bringing peace to home.",
    sanskritLine: "॥ ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः ॥",
  },
];

interface AudioTier {
  id: string;
  badge: string;
  title: string;
  hindiTitle: string;
  price: string;
  priceNum: number;
  icon: typeof Music2;
  accent: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  popular?: boolean;
}

const BESPOKE_TIERS: AudioTier[] = [
  {
    id: "gotra-aarti",
    badge: "Most Cherished For Daily Puja",
    title: "Personal Gotra Aarti & Stotra",
    hindiTitle: "नाम-गोत्र युक्त महाआरती व स्तुति",
    price: "₹1,499",
    priceNum: 1499,
    icon: Flame,
    accent: "from-amber-500 to-orange-600",
    description: "Any sacred Aarti (Hanuman, Shiva, Lakshmi, Durga, Krishna) consecrated with your family Gotra & Name invoked in the Vedic Sankalp before and after the chant.",
    highlights: [
      "Your full Name, Gotra & Family members spoken in classical Sankalpa",
      "Real temple brass bells, Shankha (conch), and Aarti deepam acoustics",
      "Studio 320kbps MP3 on WhatsApp + Printable Golden Sanskrit Lyrics Parchment",
    ],
    ctaLabel: "Commission Personal Aarti",
  },
  {
    id: "graha-shanti",
    badge: "Planetary Remedial Armor",
    title: "Graha Shanti & Beej Mantra",
    hindiTitle: "ग्रह शान्ति व नक्षत्र रक्षा कवच ध्वनि",
    price: "₹2,100",
    priceNum: 2100,
    icon: Shield,
    accent: "from-emerald-500 to-teal-700",
    popular: true,
    description: "108 authentic Sanskrit remedial chants consecrated specifically to your Janma Nakshatra and afflicted planetary houses (Shani Sade Sati, Rahu/Ketu, Mangal).",
    highlights: [
      "108 Chants invoking your specific Janma Nakshatra & Rashi",
      "Tuned to 432Hz harmonic acoustic frequency for deepest cellular calming",
      "Personal audio guidance note from Acharya Ji on listening timings",
    ],
    ctaLabel: "Commission Graha Shanti",
  },
  {
    id: "custom-bhajan",
    badge: "Milestones & Pure Devotion",
    title: "Bespoke Bhajan & Devotional Song",
    hindiTitle: "अनुरोध भजन व विशेष स्तुति रचना",
    price: "₹3,500",
    priceNum: 3500,
    icon: Music2,
    accent: "from-purple-500 to-pink-600",
    description: "A devotional Bhajan or Stuti composed or recorded to your personal lyrics, chosen deity, or family milestone (Namkaran, Wedding, Griha Pravesh, Shashtipoorthi).",
    highlights: [
      "Sung as per your requested lyrics, deity, and melodic mood",
      "Live temple instruments: Harmonium, Tanpura, Bansuri & Priest Chorus",
      "Uncompressed Studio Master Audio (WAV + MP3) with lifetime personal rights",
    ],
    ctaLabel: "Request Custom Bhajan",
  },
];

export default function BespokeConsecratedAudioStudio() {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTier, setActiveTier] = useState<AudioTier | null>(null);
  const [devoteeName, setDevoteeName] = useState("");
  const [gotra, setGotra] = useState("");
  const [chosenDeity, setChosenDeity] = useState("");
  const [customLyricsNotes, setCustomLyricsNotes] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSample = SAMPLE_VOICE_TRACKS[selectedTrackIndex];

  // Handle audio play/pause
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.src = currentSample.audioSrc;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [selectedTrackIndex]);

  const toggleSamplePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleSelectSample = (idx: number) => {
    if (selectedTrackIndex === idx && isPlaying) {
      toggleSamplePlay();
    } else {
      setSelectedTrackIndex(idx);
      setIsPlaying(true);
    }
  };

  const openOrderModal = (tier: AudioTier) => {
    setActiveTier(tier);
  };

  const submitWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTier) return;

    const message = `Namaste Acharya Ji / Pandit Ji,
I would like to commission a *${activeTier.title} (${activeTier.hindiTitle})*.

• *Devotee Name:* ${devoteeName || "Not specified"}
• *Gotra:* ${gotra || "Not specified"}
• *Chosen Deity / Aarti / Bhajan:* ${chosenDeity || "As recommended by Pandit Ji"}
• *Special Request / Lyrics / Occasion:* ${customLyricsNotes || "None"}

Please guide me with the consecration process and studio delivery on WhatsApp. Dhanyawad.`;

    window.open(waLink(message), "_blank");
    setActiveTier(null);
  };

  return (
    <section className="relative my-12 overflow-hidden rounded-3xl border-2 border-[#D4AF37]/45 bg-gradient-to-b from-[#1C120B] via-[#150D07] to-[#0A0503] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#E8791E]/10 blur-3xl" />

      {/* ── Header ── */}
      <div className="relative z-10 mx-auto mb-10 max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#FFEAA7]">
          <Disc3 className="h-3.5 w-3.5 text-[#F5A623] animate-spin" style={{ animationDuration: "8s" }} />
          <span>॥ सिद्ध ध्वनि संकल्प ॥ Bespoke Consecrated Vedic Studio</span>
        </div>

        <h2 className="mb-3 font-serif text-2xl sm:text-4xl font-bold tracking-wide text-[#FFFDF8]" style={{ color: "#FFFDF8" }}>
          Custom Bhajans, Gotra Aarti &amp; Graha Shanti Audio
        </h2>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-[#D4AF37]/90" style={{ color: "#E2C875" }}>
          We compose and record devotional songs as per your request &amp; lyrics, and consecrate sacred temple Aarti &amp; Graha Shanti with your Name, Gotra &amp; Family Sankalpa by our verified Varanasi and Haridwar Acharyas.
        </p>

        {/* 3 Pillars Badge Row */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-semibold text-[#FFEAA7]">
          <span className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-black/40 px-3 py-1">
            <CheckCircle2 className="h-3 w-3 text-[#22C55E]" /> Studio-crafted devotional sound
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-black/40 px-3 py-1">
            <CheckCircle2 className="h-3 w-3 text-[#22C55E]" /> 432Hz Cosmic Harmonic Tuning
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-black/40 px-3 py-1">
            <CheckCircle2 className="h-3 w-3 text-[#22C55E]" /> Delivered Directly to WhatsApp
          </span>
        </div>
      </div>

      {/* ── Interactive Live Pandit Ji Voice Audition Player ── */}
      <div className="relative z-10 mb-12 rounded-3xl border border-[#D4AF37]/35 bg-black/60 p-5 sm:p-7 shadow-[inset_0_1px_0_rgba(255,234,167,0.15)]">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#F5A623]">
              <Mic className="h-3.5 w-3.5" />
              <span>Hear Pandit Ji’s Authentic Voice &amp; Chanting Samples</span>
            </span>
            <h3 className="mt-1 font-serif text-lg sm:text-xl font-bold text-[#FFFDF8]" style={{ color: "#FFFDF8" }}>
              {currentSample.title} <span className="text-[#D4AF37] font-normal text-sm">({currentSample.hindiTitle})</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/15 px-3 py-1 text-[10px] font-bold text-[#FFEAA7]">
              {currentSample.deity}
            </span>
          </div>
        </div>

        {/* Player Bar & Sanskrit Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Sanskrit Sankalpa Banner */}
          <div className="md:col-span-8 rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-r from-[#2A160D] to-[#160B06] p-4 text-center sm:text-left">
            <p className="font-serif text-sm sm:text-base font-bold text-[#FFEAA7] italic leading-relaxed" style={{ color: "#FFEAA7" }}>
              {currentSample.sanskritLine}
            </p>
            <p className="mt-1.5 text-xs text-[#D4AF37]/80 leading-relaxed font-light">
              {currentSample.description}
            </p>
          </div>

          {/* Big Circular Audio Controller */}
          <div className="md:col-span-4 flex items-center justify-center sm:justify-end gap-4">
            <motion.button
              type="button"
              onClick={toggleSamplePlay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F5A623] to-[#FFEAA7] text-black shadow-[0_0_25px_rgba(245,166,35,0.6)] cursor-pointer"
              aria-label={isPlaying ? "Pause voice note" : "Play voice note"}
            >
              {isPlaying ? <Pause className="h-6 w-6 fill-black" /> : <Play className="h-6 w-6 fill-black ml-1" />}
            </motion.button>
            <div className="text-left">
              <p className="text-xs font-bold text-white">
                {isPlaying ? "Chanting in Progress..." : "Listen to Sample"}
              </p>
              <p className="text-[10px] text-[#F5A623] font-mono">
                {isPlaying ? "Audio playing..." : "Tap to play live recording"}
              </p>
            </div>
          </div>
        </div>

        {/* Track Selector Pills */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-[#D4AF37]/15">
          {SAMPLE_VOICE_TRACKS.map((track, idx) => {
            const isSelected = selectedTrackIndex === idx;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => handleSelectSample(idx)}
                className={`flex items-center justify-between rounded-xl p-3 text-left transition-all cursor-pointer border ${
                  isSelected
                    ? "border-[#D4AF37] bg-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                    : "border-white/10 bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-[#FFEAA7] truncate">{track.title}</p>
                  <p className="text-[10px] text-[#D4AF37]/75 truncate">{track.hindiTitle}</p>
                </div>
                <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  {isSelected && isPlaying ? (
                    <Pause className="h-3 w-3 text-[#FFEAA7]" />
                  ) : (
                    <Play className="h-3 w-3 text-[#FFEAA7] ml-0.5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3 Bespoke Commission Tiers ── */}
      <div className="relative z-10 mb-6 text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
          Bespoke Commission Menu
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFDF8] mt-1" style={{ color: "#FFFDF8" }}>
          Choose Your Consecrated Audio Offering
        </h3>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {BESPOKE_TIERS.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 text-left transition-all ${
                tier.popular
                  ? "border-[#D4AF37] bg-gradient-to-b from-[#2A180E] via-[#1A0E08] to-[#120905] shadow-[0_12px_35px_rgba(212,175,55,0.25)]"
                  : "border-[#D4AF37]/30 bg-gradient-to-b from-[#1C120B] to-[#100905] hover:border-[#D4AF37]/60"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5A623] px-3 py-0.5 text-[9px] font-black uppercase tracking-wider text-black shadow-md">
                  Most Requested
                </div>
              )}

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className={`h-11 w-11 rounded-2xl bg-gradient-to-tr ${tier.accent} p-[1.5px] shadow-lg`}>
                    <div className="h-full w-full rounded-2xl bg-[#1A0E08] flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[#FFEAA7]" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black font-serif text-[#FFEAA7]" style={{ color: "#FFEAA7" }}>
                      {tier.price}
                    </span>
                    <p className="text-[10px] text-[#D4AF37]/80">Single Devotee / Family</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5A623]">
                  {tier.badge}
                </span>
                <h4 className="mt-0.5 font-serif text-lg font-bold text-[#FFFDF8]" style={{ color: "#FFFDF8" }}>
                  {tier.title}
                </h4>
                <p className="text-xs text-[#D4AF37] font-serif mb-3">
                  {tier.hindiTitle}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                  {tier.description}
                </p>

                <ul className="space-y-2 border-t border-[#D4AF37]/20 pt-4 mb-6 text-xs text-gray-300">
                  {tier.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => openOrderModal(tier)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{tier.ctaLabel}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Order Configuration Modal (1-Click WhatsApp) ── */}
      <AnimatePresence>
        {activeTier && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTier(null)}
              className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[85] max-w-lg mx-auto rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#1E120A] to-[#0D0704] p-6 shadow-2xl text-left"
            >
              <div className="mb-4 flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5A623]">
                    Consecration Request Details
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#FFEAA7]" style={{ color: "#FFEAA7" }}>
                    {activeTier.title} ({activeTier.price})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTier(null)}
                  className="h-8 w-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={submitWhatsAppOrder} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-[#FFEAA7] mb-1">
                    Devotee Name (यजमान नाम) *
                  </label>
                  <input
                    type="text"
                    required
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma & Family"
                    className="w-full rounded-xl border border-[#D4AF37]/35 bg-black/50 p-2.5 text-white placeholder-gray-500 outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#FFEAA7] mb-1">
                      Gotra (गोत्र)
                    </label>
                    <input
                      type="text"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      placeholder="e.g. Kashyap, Shandilya (or Unknown)"
                      className="w-full rounded-xl border border-[#D4AF37]/35 bg-black/50 p-2.5 text-white placeholder-gray-500 outline-none focus:border-[#F5A623]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#FFEAA7] mb-1">
                      Chosen Deity / Aarti
                    </label>
                    <input
                      type="text"
                      value={chosenDeity}
                      onChange={(e) => setChosenDeity(e.target.value)}
                      placeholder="e.g. Lord Shiva, Hanuman, Lakshmi"
                      className="w-full rounded-xl border border-[#D4AF37]/35 bg-black/50 p-2.5 text-white placeholder-gray-500 outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#FFEAA7] mb-1">
                    Specific Lyrics, Intention or Occasion
                  </label>
                  <textarea
                    rows={3}
                    value={customLyricsNotes}
                    onChange={(e) => setCustomLyricsNotes(e.target.value)}
                    placeholder="Enter custom lyrics, particular stotra name, or family intention (e.g. Birthday, Griha Pravesh, Health healing, Obstacle removal)"
                    className="w-full rounded-xl border border-[#D4AF37]/35 bg-black/50 p-2.5 text-white placeholder-gray-500 outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div className="rounded-xl bg-[#D4AF37]/10 p-3 border border-[#D4AF37]/20 text-[11px] text-[#E2C875] flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-[#F5A623] shrink-0" />
                  <span>
                    Pandit Ji will personally review your Sankalpa details and confirm the studio consecration delivery on WhatsApp.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#15803D] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Request to Pandit Ji via WhatsApp →</span>
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
