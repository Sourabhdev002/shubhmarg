"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Music2, Download, Sparkles, Send, X, BadgeCheck } from "lucide-react";
import { waLink } from "@/config/contact";

/**
 * BhajanLibrary — a premium "Now Playing" bhajan player + compact playlist.
 *
 * Two offerings: (1) LISTEN + BUY our original bhajans, (2) REQUEST a custom one.
 * Only ShubhMarg ORIGINALS (Aryan's own, numbered 1–4) are listed here. Modern
 * single-player-bar UX (like Spotify/SoundCloud mini players) instead of a long
 * card wall: one now-playing panel with art, scrubbable progress bar + timestamps,
 * a live equalizer, and a slim clickable playlist beside/below it.
 */

interface Bhajan {
  id: string;
  title: string;
  hindiTitle: string;
  deity: string;
  mood: string;
  price: number;
  audioSrc: string;
  accent: string;
}

// ── ShubhMarg ORIGINALS only (Aryan's own, files numbered 1–4 in /public/audio). ──
// audioSrc is passed through encodeURI at play time (filenames have spaces, dots &
// Devanagari that must be URL-encoded to fetch correctly on web/Vercel).
const BHAJANS: Bhajan[] = [
  {
    id: "divya-pratah",
    title: "Divya Pratah Aashirwad",
    hindiTitle: "दिव्य प्रातः आशीर्वाद",
    deity: "Morning Blessing",
    mood: "Uplifting · Fresh",
    price: 99,
    audioSrc: "/audio/1.Divya Pratah Aashirwad.mp3",
    accent: "#F5A623",
  },
  {
    id: "shubh-mantra",
    title: "Shubh Aashirwad Mantra",
    hindiTitle: "शुभ आशीर्वाद मंत्र",
    deity: "Gotra Sankalp",
    mood: "Sacred · Protective",
    price: 149,
    audioSrc: "/audio/2.Shubh Aashirwad Mantra.mp3",
    accent: "#9B7BD4",
  },
  {
    id: "shubh-aashirwad",
    title: "Shubh Aashirwad",
    hindiTitle: "शुभ आशीर्वाद",
    deity: "Blessing Invocation",
    mood: "Auspicious · Grace",
    price: 99,
    audioSrc: "/audio/3.आशीर्वाद.mp3",
    accent: "#D4A537",
  },
  {
    id: "shubhmarg-calm",
    title: "ShubhMarg · Shaant Bhajan",
    hindiTitle: "शुभमार्ग · शांत व मधुर भजन",
    deity: "ShubhMarg Signature",
    mood: "Calm · Meditative",
    price: 149,
    audioSrc: "/audio/4.शांत और मधुर भजन (Calm Bhajan).mp3",
    accent: "#E8791E",
  },
];

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function BhajanLibrary() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);   // 0..1
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [requestOpen, setRequestOpen] = useState(false);
  const [reqName, setReqName] = useState("");
  const [reqDeity, setReqDeity] = useState("");
  const [reqLyrics, setReqLyrics] = useState("");
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Portal target so the request modal escapes the parent <Reveal> transform.
  useEffect(() => { setMounted(true); }, []);

  const active = BHAJANS[activeIdx];

  // Wire up the single shared audio element.
  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    const onTime = () => {
      setCurrent(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => {
      // Auto-advance to next track.
      setActiveIdx((i) => (i + 1) % BHAJANS.length);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  // Load a track when the active index changes; keep playing if we were playing.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // encodeURI so spaces / dots / Devanagari in the filename resolve correctly.
    audio.src = encodeURI(active.audioSrc);
    audio.load();
    setProgress(0);
    setCurrent(0);
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  const selectTrack = (i: number) => {
    if (i === activeIdx) {
      togglePlay();
    } else {
      setActiveIdx(i);
      setIsPlaying(true);
      // play() happens in the effect after src loads
      setTimeout(() => audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {}), 60);
    }
  };

  const skip = (dir: 1 | -1) => {
    setActiveIdx((i) => (i + dir + BHAJANS.length) % BHAJANS.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play().catch(() => {}), 60);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio);
  };

  const buy = (b: Bhajan) => {
    const msg = `Namaste 🙏 I'd like to buy the bhajan *${b.title} (${b.hindiTitle})* — ₹${b.price}. Please share how to receive the full track.`;
    window.open(waLink(msg), "_blank");
  };

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Namaste 🙏 I'd like to *request a custom bhajan*.\n\n• Name / Occasion: ${reqName || "Not specified"}\n• Deity / Theme: ${reqDeity || "As you recommend"}\n• Lyrics / notes: ${reqLyrics || "Please compose devotional lyrics"}\n\nPlease share process, timing & dakshina. Dhanyawad.`;
    window.open(waLink(msg), "_blank");
    setRequestOpen(false);
  };

  return (
    <section className="relative section-py overflow-hidden surface-maroon-wash">
      <span className="glow-fill" />
      <span className="pointer-events-none absolute -top-24 right-10 w-80 h-80 rounded-full bg-[#D4AF37]/[0.12] blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto section-px">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FFF9EE] via-[#FFF3D6] to-[#FFF9EE] border border-[#D4AF37]/60 mb-3 shadow-[0_4px_14px_rgba(184,134,11,0.18)]">
            <Music2 className="w-3.5 h-3.5 text-[#C25E10]" />
            <span className="text-[10.5px] sm:text-[11px] font-sans font-bold tracking-[0.2em] text-[#8C3F08] uppercase">
              सिद्ध भजन संग्रह · ShubhMarg Originals
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#2A1810] tracking-tight">
            Our bhajans — <span className="italic text-[#C25E10]">listen &amp; keep</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2E1D14] max-w-lg mx-auto leading-relaxed font-sans font-medium mt-2">
            Original devotional tracks composed for ShubhMarg. Preview any, buy your favourite, or request one made to your own lyrics.
          </p>
        </div>

        {/* ── Player + Playlist (side-by-side on desktop) ── */}
        <div className="rounded-3xl p-[1.5px] bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37]/60 to-[#8C6818] shadow-[0_20px_50px_-24px_rgba(107,42,20,0.4)]">
          <div className="rounded-[22px] bg-gradient-to-b from-[#1a0f09] via-[#241209] to-[#150906] overflow-hidden grid md:grid-cols-[1.1fr_1fr]">
            {/* NOW PLAYING panel */}
            <div className="relative p-5 sm:p-6 flex flex-col">
              <span className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ background: active.accent }} />

              <div className="relative flex items-center gap-4 mb-4">
                {/* Rotating disc art */}
                <div className="relative shrink-0">
                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[radial-gradient(circle_at_50%_50%,#2a1608,#0D0907_70%)] border-2 border-[#D4AF37]/60 flex items-center justify-center shadow-[0_8px_24px_-6px_rgba(201,162,74,0.5)]"
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={isPlaying ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
                  >
                    <span className="font-devanagari text-[#F5C24B] text-2xl sm:text-3xl font-black" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>ॐ</span>
                    <span className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 0 6px rgba(13,9,7,0.6)` }} />
                    <span className="absolute w-2.5 h-2.5 rounded-full bg-[#1a0f09] border border-[#D4AF37]/50" />
                  </motion.div>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-wider text-[#F5D77E] bg-[#D4AF37]/15 border border-[#D4AF37]/35 rounded-full px-2 py-0.5 mb-1.5">
                    <BadgeCheck className="w-2.5 h-2.5" /> Original by ShubhMarg
                  </span>
                  <h3 className="text-[15px] sm:text-[17px] font-bold font-serif text-[#FFFDF8] leading-tight truncate">{active.title}</h3>
                  <p className="text-[11px] font-devanagari text-[#F5C24B] truncate" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>{active.hindiTitle}</p>
                  <p className="text-[10px] text-white/55 mt-0.5 truncate">{active.deity} · {active.mood}</p>
                </div>
              </div>

              {/* Live equalizer (only when playing) */}
              <div className="h-6 flex items-end justify-center gap-0.5 mb-2">
                {Array.from({ length: 28 }).map((_, n) => (
                  <motion.span
                    key={n}
                    className="flex-1 rounded-full"
                    style={{ background: active.accent, opacity: isPlaying ? 0.75 : 0.2, maxWidth: 4 }}
                    animate={isPlaying ? { height: ["20%", "100%", "40%", "85%", "25%"] } : { height: "20%" }}
                    transition={isPlaying ? { duration: 0.8 + (n % 5) * 0.12, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                  />
                ))}
              </div>

              {/* Progress bar (scrubbable) */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9.5px] font-mono text-white/60 w-8 shrink-0">{fmt(current)}</span>
                <div
                  onClick={seek}
                  className="group relative flex-1 h-2 rounded-full bg-white/12 cursor-pointer"
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${progress * 100}%`, background: "linear-gradient(90deg,#F5A623,#E8791E)" }}
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FFF3D6] shadow-[0_0_8px_rgba(245,166,35,0.8)] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${progress * 100}% - 6px)` }}
                  />
                </div>
                <span className="text-[9.5px] font-mono text-white/60 w-8 shrink-0 text-right">{fmt(duration)}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-5 mb-4">
                <button onClick={() => skip(-1)} aria-label="Previous" className="text-white/70 hover:text-white transition-colors cursor-pointer">
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F5A623] to-[#E8791E] text-[#120B07] flex items-center justify-center shadow-[0_6px_18px_-4px_rgba(232,121,30,0.6)] active:scale-95 transition-transform cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                </button>
                <button onClick={() => skip(1)} aria-label="Next" className="text-white/70 hover:text-white transition-colors cursor-pointer">
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Buy current */}
              <button
                onClick={() => buy(active)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#E8791E] text-[#120B07] text-xs font-extrabold uppercase tracking-wide shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" /> Buy this track — ₹{active.price}
              </button>
            </div>

            {/* PLAYLIST */}
            <div className="border-t md:border-t-0 md:border-l border-[#D4AF37]/20 bg-black/25 p-2.5 sm:p-3">
              <p className="px-2 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#F5D77E]">
                {BHAJANS.length} Original Tracks
              </p>
              <ul className="space-y-0.5">
                {BHAJANS.map((b, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <li key={b.id}>
                      <button
                        onClick={() => selectTrack(i)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                          isActive ? "bg-[#D4AF37]/15 border border-[#D4AF37]/35" : "hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${isActive ? "bg-[#F5A623] text-[#120B07]" : "bg-white/10 text-white/70"}`}>
                          {isActive && isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block text-[12px] font-bold font-serif leading-tight truncate ${isActive ? "text-[#FFF3D6]" : "text-white/85"}`}>
                            {i + 1}. {b.title}
                          </span>
                          <span className="block text-[9.5px] text-white/45 truncate">{b.deity}</span>
                        </span>
                        <span className="shrink-0 text-[10.5px] font-mono font-bold text-[#F5D77E]">₹{b.price}</span>
                        {/* live bars on the active row */}
                        {isActive && isPlaying && (
                          <span className="hidden sm:flex items-end gap-0.5 h-3.5 shrink-0">
                            {[0, 1, 2].map((n) => (
                              <motion.span
                                key={n}
                                className="w-0.5 rounded-full bg-[#F5A623]"
                                animate={{ height: ["30%", "100%", "50%"] }}
                                transition={{ duration: 0.7 + n * 0.1, repeat: Infinity, ease: "easeInOut" }}
                              />
                            ))}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Request custom — compact */}
              <button
                onClick={() => setRequestOpen(true)}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#D4AF37]/30 text-[#F5D77E] text-[11px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Request a custom bhajan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Request modal — portaled to body to escape parent <Reveal> transform */}
      {mounted && createPortal(
        <AnimatePresence>
        {requestOpen && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#2A1810]/50 backdrop-blur-sm" onClick={() => setRequestOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="relative w-full max-w-md rounded-3xl bg-[#FFFDF8] border border-[#D4AF37]/40 shadow-[0_30px_80px_-20px_rgba(107,42,20,0.5)] overflow-hidden"
            >
              <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E8791E] to-transparent" />
              <button onClick={() => setRequestOpen(false)} aria-label="Close" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FDF3E2] border border-[#B8860B]/25 flex items-center justify-center text-[#6B5A48] hover:text-[#C25E10] transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <form onSubmit={submitRequest} className="p-6 sm:p-7">
                <h3 className="text-lg font-bold font-serif text-[#22130A] mb-1">Request a Custom Bhajan</h3>
                <p className="text-[12px] text-[#6B5A48] mb-4">Composed &amp; recorded to your wish. Sent on WhatsApp.</p>

                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C5212] mb-1">Your name / occasion</label>
                <input value={reqName} onChange={(e) => setReqName(e.target.value)} placeholder="e.g. Sharma family · Griha Pravesh"
                  className="w-full mb-3 bg-[#FBF6EC] border border-[#D4AF37]/35 rounded-xl px-3.5 py-2.5 text-sm text-[#22130A] focus:outline-none focus:border-[#E8791E]" style={{ fontSize: "16px" }} />

                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C5212] mb-1">Deity / theme</label>
                <input value={reqDeity} onChange={(e) => setReqDeity(e.target.value)} placeholder="e.g. Hanuman Ji, Maa Durga…"
                  className="w-full mb-3 bg-[#FBF6EC] border border-[#D4AF37]/35 rounded-xl px-3.5 py-2.5 text-sm text-[#22130A] focus:outline-none focus:border-[#E8791E]" style={{ fontSize: "16px" }} />

                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C5212] mb-1">Your lyrics / notes</label>
                <textarea value={reqLyrics} onChange={(e) => setReqLyrics(e.target.value)} rows={3} placeholder="Paste your lyrics or describe what you'd like…"
                  className="w-full mb-4 bg-[#FBF6EC] border border-[#D4AF37]/35 rounded-xl px-3.5 py-2.5 text-sm text-[#22130A] focus:outline-none focus:border-[#E8791E] resize-none" style={{ fontSize: "16px" }} />

                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#E8791E] text-[#120B07] font-extrabold text-xs uppercase tracking-wide shadow-[0_4px_18px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer">
                  <Send className="w-4 h-4" /> Send Request on WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
