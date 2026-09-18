"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, Repeat, SkipForward, SkipBack } from "lucide-react";
import Link from "next/link";

interface ChantTrack {
  id: string;
  title: string;
  sanskrit: string;
  translation: string;
  frequency: string;
  purpose: string;
  vedaSource: string;
  audioSrc: string;
  deity: string;
  benefits: string[];
}

const CHANT_TRACKS: ChantTrack[] = [
  {
    id: "mahamrityunjaya",
    title: "Maha Mrityunjaya Mantra (Vedic Japa Resonance)",
    sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात्॥",
    translation: "We worship the Three-Eyed Lord Shiva, who is fragrant and nourishes all beings. May He liberate us from death and suffering, just as a ripe cucumber is severed from its vine, leading us to immortality.",
    frequency: "432 Hz Solfeggio Healing",
    purpose: "Cellular Healing, Fear Dissolution & Vitality",
    vedaSource: "Rigveda 7.59.12 (Maha Rudra Samhita)",
    audioSrc: "/audio/mahamrityunjaya.mp3",
    deity: "Lord Shiva (Mahadeva)",
    benefits: ["Calms intense anxiety and restlessness", "Restores physical and emotional vitality", "Creates protective armor (Kavach) around the home"],
  },
  {
    id: "gayatri",
    title: "Rigvedic Gayatri Maha Mantra (Solar Illumination)",
    sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
    translation: "We meditate upon the divine supreme radiance of Savitr (the Divine Sun). May that sacred solar light inspire and illuminate our intellect and conscious awareness.",
    frequency: "432 Hz Solar Harmonic",
    purpose: "Intellectual Brilliance & Higher Intuition",
    vedaSource: "Rigveda 3.62.10 (Brahmarshi Vishwamitra)",
    audioSrc: "/audio/gayatri-mantra.mp3",
    deity: "Goddess Savitri / Surya Narayana",
    benefits: ["Dissolves brain fog and mental lethargy", "Sharpens discernment in high-stakes decisions", "Purifies the electromagnetic aura"],
  },
  {
    id: "ganesha",
    title: "Sri Ganesha Invocation & Auspicious Prarthana",
    sanskrit: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    translation: "O Lord with the curved trunk and immense cosmic body, whose radiance equals millions of suns: please remove all obstacles from all my endeavors, at all times.",
    frequency: "528 Hz Transformation",
    purpose: "Obstacle Removal & Unlocking Stalled Projects",
    vedaSource: "Ganesh Atharvashirsha & Mudgala Purana",
    audioSrc: "/audio/ganesha-invocation.mp3",
    deity: "Lord Ganesha (Vighnaharta)",
    benefits: ["Clears unexpected bottlenecks in career & business", "Blesses new beginnings and legal contracts", "Harmonizes household relationships"],
  },
  {
    id: "shanti-path",
    title: "Vedic Shanti Path (Universal Cosmic Peace)",
    sanskrit: "ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः...",
    translation: "May peace radiate in the celestial spheres, peace in the atmosphere, peace on earth, peace in waters, peace in medicinal herbs and plants, peace everywhere.",
    frequency: "108 Hz Deep Shanti Drone",
    purpose: "Deep Sleep, Stress Neutralization & Home Harmony",
    vedaSource: "Yajurveda 36.17",
    audioSrc: "/audio/shanti-path.mp3",
    deity: "Supreme Brahman & Cosmic Nature",
    benefits: ["Induces deep restorative delta sleep", "Cleanses negative Vastu vibrations in living spaces", "Brings serene emotional equilibrium"],
  },
];

export default function VedicSoundSanctuary() {
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const activeTrack = CHANT_TRACKS[activeTrackIndex];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize or change audio track
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    queueMicrotask(() => setIsLoadingAudio(true));
    audio.src = activeTrack.audioSrc;
    audio.loop = isLooping;
    audio.volume = isMuted ? 0 : volume;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoadingAudio(false);
      if (isPlaying) {
        audio.play().catch(() => setIsPlaying(false));
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
      }
    };

    const onError = () => {
      setIsLoadingAudio(false);
      console.warn("Audio playback error on track:", activeTrack.audioSrc);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [activeTrack.audioSrc]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Play blocked by browser policy", e);
        setIsPlaying(false);
      });
    }
  };

  // Handle Volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setCurrentTime(seekTo);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  const handleNext = () => {
    const nextIdx = (activeTrackIndex + 1) % CHANT_TRACKS.length;
    setActiveTrackIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeTrackIndex - 1 + CHANT_TRACKS.length) % CHANT_TRACKS.length;
    setActiveTrackIndex(prevIdx);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  return (
    <div className="my-10 bg-gradient-to-b from-[#180906] via-[#240d08] to-[#0f0402] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.35)] relative overflow-hidden text-center">
      {/* Background Sacred Glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Vedic Sacred Acoustics &amp; Chant Sanctum</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          432Hz Authentic Sanskrit Chanting Sanctum
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Listen to studio-recorded authentic human Sanskrit priests reciting Rigvedic mantras tuned to 432Hz cosmic harmonic frequencies. No synthetic tones—only pure consecrated acoustic power.
        </p>

        {/* ── Luxury Audio Player Master Stage ── */}
        <div className="my-8 p-6 sm:p-9 rounded-3xl bg-gradient-to-b from-black/90 via-[#1e0a06] to-black/95 border-2 border-[#d4af37] shadow-[0_15px_60px_rgba(0,0,0,0.8)] relative">
          
          {/* Active Track Title & Source */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-6 text-left">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-mono flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{activeTrack.frequency} • {activeTrack.vedaSource}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                {activeTrack.title}
              </h3>
              <p className="text-xs text-amber-300 font-semibold mt-0.5">
                Presiding Deity: <strong>{activeTrack.deity}</strong>
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Animated 28-Bar Golden Sound Equalizer */}
          <div className="h-24 flex items-center justify-center gap-1 sm:gap-1.5 my-6 px-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${Math.sin(i + 1) * 25 + 30}px`,
                          `${Math.cos(i + 2) * 35 + 65}px`,
                          `${Math.sin(i + 3) * 20 + 25}px`,
                        ],
                      }
                    : { height: "10px" }
                }
                transition={{
                  repeat: Infinity,
                  duration: 0.7 + (i % 6) * 0.15,
                  ease: "easeInOut",
                }}
                className={`w-1.5 sm:w-2 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-gradient-to-t from-amber-600 via-[#d4af37] to-amber-200 shadow-[0_0_10px_#ffd700]"
                    : "bg-white/15"
                }`}
              />
            ))}
          </div>

          {/* Sanskrit Lyric Display */}
          <div className="p-4 rounded-2xl bg-black/60 border border-[#d4af37]/20 my-4 text-center">
            <p className="text-base sm:text-lg font-serif text-[#ffd700] italic font-semibold leading-relaxed">
              &ldquo;{activeTrack.sanskrit}&rdquo;
            </p>
            <p className="text-xs text-gray-300 font-light mt-2 max-w-xl mx-auto leading-relaxed">
              {activeTrack.translation}
            </p>
          </div>

          {/* Scrub / Progress Slider */}
          <div className="my-4 space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Transport Controls (Prev / Play-Pause / Next / Loop) */}
          <div className="flex items-center justify-center gap-6 my-6">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Previous Chant"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <motion.button
              type="button"
              onClick={togglePlay}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className={`w-18 h-18 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-2xl ${
                isPlaying
                  ? "bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-[0_0_40px_rgba(245,158,11,0.8)] border-2 border-amber-300"
                  : "bg-gradient-to-br from-[#d4af37] via-[#f3d068] to-[#b38918] text-black shadow-[0_0_40px_rgba(212,175,55,0.6)] border-2 border-white"
              }`}
              title={isPlaying ? "Pause Chant" : "Play Sacred Chant"}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </motion.button>

            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Next Chant"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLooping(!isLooping);
                if (audioRef.current) audioRef.current.loop = !isLooping;
              }}
              className={`p-3 rounded-full transition-all cursor-pointer ${
                isLooping
                  ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
              title="Loop 108 Times"
            >
              <Repeat className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Control Bar */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/10 max-w-xs mx-auto">
            <button
              type="button"
              onClick={toggleMute}
              className="text-gray-400 hover:text-[#d4af37] transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-32 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
            <span className="text-[10px] text-gray-400 font-mono w-8 text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>

        {/* ── 4 Sacred Chant Library Selector Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 text-left">
          {CHANT_TRACKS.map((track, idx) => {
            const isCurrent = activeTrackIndex === idx;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  setActiveTrackIndex(idx);
                  setIsPlaying(true);
                }}
                className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? "bg-gradient-to-b from-[#3a180c] to-[#1c0a05] border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                    : "bg-black/60 hover:bg-black/85 border-white/10 text-gray-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider font-mono bg-[#d4af37]/10 px-2 py-0.5 rounded-full border border-[#d4af37]/20">
                      {track.frequency}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{track.deity}</span>
                  </div>

                  <h4 className="text-base font-bold font-serif text-white mb-1.5">
                    {track.title}
                  </h4>

                  <ul className="space-y-1 my-2 text-xs text-gray-300 font-light">
                    {track.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5">
                        <span className="text-amber-400 text-[10px]">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-medium">✨ {track.purpose}</span>
                  <span className="text-xs font-bold text-[#d4af37]">
                    {isCurrent && isPlaying ? "▶ Now Playing" : "Tap to Play"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── High-Ticket Gotra Audio Dossier Consecration Bridge ── */}
        <div className="bg-gradient-to-r from-[#2c1308] via-[#1c0c06] to-[#2c1308] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-8 text-left shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-lg">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
                Personalized Temple Audio Consecration
              </span>
              <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                Request a Custom Gotra-Chanted Audio Dossier from Pandit Ji
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Pandit Ji will personally chant your specific birth Nakshatra Beej Mantra and Gotra Sankalp at the Kashi sanctum, delivering an uncompressed 15-minute studio audio file directly to your WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <Link
                href="/request-guidance?service=voice-dossier"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Order Custom Audio Dossier (₹1,999)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
