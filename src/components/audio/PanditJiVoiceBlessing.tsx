"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Sun, Flame, Shield, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  seekerName?: string;
  mantraText?: string;
  blessingText?: string;
}

interface ChantTrack {
  id: string;
  title: string;
  shortName: string;
  deity: string;
  icon: "sun" | "ganesha" | "shiva";
  hz: string;
  sanskrit: string;
  translation: string;
  audioUrl: string;
}

const CHANT_TRACKS: ChantTrack[] = [
  {
    id: "gayatri",
    title: "Rigvedic Gayatri Mantra",
    shortName: "Gayatri",
    deity: "Savita • Surya Prana",
    icon: "sun",
    hz: "432Hz",
    sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥",
    translation: "May divine solar light illuminate our intellect and dispel all inner shadows.",
    audioUrl: "/audio/gayatri-mantra.mp3",
  },
  {
    id: "ganesha",
    title: "Ganesha Vighnaharta",
    shortName: "Ganesha",
    deity: "Ganapati • Obstacle Removal",
    icon: "ganesha",
    hz: "528Hz",
    sanskrit: "ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    translation: "O Lord with the cosmic form, remove all impediments from my paths forever.",
    audioUrl: "/audio/ganesha-invocation.mp3",
  },
  {
    id: "mrityunjaya",
    title: "Maha Mrityunjaya",
    shortName: "Mrityunjaya",
    deity: "Tryambaka • Vitality & Peace",
    icon: "shiva",
    hz: "108Hz",
    sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॥",
    translation: "We revere the Three-Eyed Lord. Nourish our vitality and grant liberation.",
    audioUrl: "/audio/mahamrityunjaya.mp3",
  },
];

function formatTime(sec: number): string {
  if (isNaN(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PanditJiVoiceBlessing(props: Props = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<ChantTrack>(CHANT_TRACKS[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    };

    const onLoaded = () => {
      if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onError = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const triggerHaptic = useCallback(() => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {
        // Safe ignore
      }
    }
  }, []);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    triggerHaptic();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src || !audioRef.current.src.endsWith(selectedTrack.audioUrl)) {
        audioRef.current.src = selectedTrack.audioUrl;
      }
      audioRef.current.volume = isMuted ? 0 : 1;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Playback error:", err);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, selectedTrack, isMuted, triggerHaptic]);

  const switchTrack = useCallback(
    (track: ChantTrack, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      triggerHaptic();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = track.audioUrl;
        setCurrentTime(0);
        if (isPlaying) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
      setSelectedTrack(track);
    },
    [isPlaying, triggerHaptic]
  );

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!progressRef.current || !audioRef.current || !duration) return;
      triggerHaptic();
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const targetTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    },
    [duration, triggerHaptic]
  );

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    if (!audioRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    audioRef.current.volume = next ? 0 : 1;
  }, [isMuted, triggerHaptic]);

  const toggleExpand = useCallback(() => {
    triggerHaptic();
    setIsExpanded((prev) => !prev);
  }, [triggerHaptic]);

  const progressPercent = useMemo(() => {
    if (!duration || duration === 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  return (
    <div className="relative rounded-2xl p-px bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/25 to-[#D4AF37]/50 shadow-[0_8px_24px_-8px_rgba(74,38,14,0.16)] my-2 sm:my-3 overflow-hidden print:hidden transition-all duration-300">
      {/* ── Imperial Ivory & 24K Gold Sacred Temple Capsule ── */}
      <div className="relative rounded-[calc(1rem-1px)] bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F1] to-[#F8F1E2] border border-[#D4AF37]/40 overflow-hidden">
        {/* Corner Royal Filigree Accents */}
        <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/50 rounded-tl pointer-events-none" />
        <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/50 rounded-br pointer-events-none" />

        {/* Ambient Golden Halo Glow */}
        <div
          className={`pointer-events-none absolute -top-8 -left-8 w-36 h-36 rounded-full bg-gradient-to-br from-[#E8791E]/20 to-[#D4AF37]/30 blur-2xl transition-opacity duration-700 ${
            isPlaying ? "opacity-100 scale-110" : "opacity-25 scale-100"
          }`}
        />

        {/* ── MASTER COMPACT BAR (~50-52px): Instant Tap-to-Play Jewel ── */}
        <div
          onClick={toggleExpand}
          className="relative z-10 flex items-center justify-between gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 cursor-pointer hover:bg-[#FFF8EB]/50 transition-colors select-none"
        >
          {/* Left: 36px 24K Gold Play Button + Dynamic Wave + Track Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Gold Jewel Play Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F5A623] to-[#E8791E] p-0.5 shadow-[0_3px_12px_rgba(212,175,55,0.45)] hover:shadow-[0_4px_16px_rgba(232,121,30,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 flex items-center justify-center"
              aria-label={isPlaying ? "Pause chant" : "Play chant"}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF8] via-[#FDF5E6] to-[#F5E6CA] border border-[#D4AF37]/60 flex items-center justify-center group-hover:bg-[#FFFDF8]">
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#843D0A] fill-[#843D0A]" />
                ) : (
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#843D0A] fill-[#843D0A] ml-0.5" />
                )}
              </div>
            </button>

            {/* Sound Wave Animation (Equalizer) */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 h-4.5 sm:h-5 px-1.5 py-0.5 rounded-md bg-[#FFF8EB] border border-[#D4AF37]/35">
              {[45, 80, 100, 65, 85].map((height, idx) => (
                <span
                  key={idx}
                  className={`w-0.5 rounded-full bg-gradient-to-t from-[#C25E10] to-[#D4AF37] transition-all duration-300 ${
                    isPlaying ? "animate-pulse" : "opacity-35"
                  } ${idx > 2 ? "hidden sm:inline-block" : "inline-block"}`}
                  style={{
                    height: isPlaying ? `${height}%` : "30%",
                    animationDelay: `${idx * 150}ms`,
                  }}
                />
              ))}
            </div>

            {/* Track Info (Title + Sacred Sub-tag) */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-[13px] sm:text-[14.5px] font-serif font-bold text-[#22130A] tracking-tight truncate font-cormorant leading-none">
                  {selectedTrack.title}
                </h4>
                <span className="hidden xs:inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-[#FFF5E5] text-[9.5px] font-mono font-bold text-[#9E430A] border border-[#E8791E]/25 shrink-0">
                  <Sparkles className="w-2.5 h-2.5 text-[#C25E10]" />
                  {selectedTrack.hz}
                </span>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-[#8C5212] font-sans font-medium truncate mt-0.5 flex items-center gap-1">
                <span>{selectedTrack.deity}</span>
                <span className="text-emerald-700 font-semibold inline-flex items-center gap-1 shrink-0">
                  • Consecrated Blessing
                </span>
              </p>
            </div>
          </div>

          {/* Right: Controls & Expand Shloka Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio Mute/Unmute */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-[#FFF8EB] hover:bg-[#FDF3DE] text-[#843D0A] border border-[#D4AF37]/40 transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#C25E10]" />}
            </button>

            {/* Expand / Collapse Pill */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className={`px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-sans font-bold transition-all duration-200 border flex items-center gap-1 cursor-pointer ${
                isExpanded
                  ? "bg-[#843D0A] text-white border-transparent shadow-sm"
                  : "bg-[#FFF8EB] hover:bg-[#FDF3DE] text-[#843D0A] border-[#D4AF37]/50 shadow-xs"
              }`}
            >
              <span>𑁍</span>
              <span className="hidden sm:inline">{isExpanded ? "Close Sanctum" : "Shloka & Deities"}</span>
              <span className="sm:hidden">{isExpanded ? "Close" : "Shloka"}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* ── EXPANDABLE SANCTUM DRAWER (Framer Motion) ── */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="sanctum-expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-[#D4AF37]/25 bg-gradient-to-b from-[#FDF9F0] via-[#FAF4E6] to-[#F5ECE0]"
            >
              <div className="p-3 sm:p-4 space-y-3">
                {/* 1. Scrubber Track & Timestamps */}
                <div className="space-y-1">
                  <div
                    ref={progressRef}
                    onClick={seek}
                    className="group relative w-full h-2 bg-[#EFE3CE] hover:bg-[#E8DAC2] rounded-full border border-[#D4AF37]/30 cursor-pointer overflow-hidden transition-colors"
                    role="slider"
                    aria-label="Seek audio"
                    aria-valuemin={0}
                    aria-valuemax={duration}
                    aria-valuenow={currentTime}
                    tabIndex={0}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#E8791E] rounded-full transition-all duration-100"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-[#8C5212] px-0.5">
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-[#8C5212]/70">{duration ? formatTime(duration) : "03:58"}</span>
                  </div>
                </div>

                {/* 2. Deity Selector Dock */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {CHANT_TRACKS.map((track) => {
                    const active = selectedTrack.id === track.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={(e) => switchTrack(track, e)}
                        className={`py-1.5 sm:py-2 px-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer text-[11px] sm:text-xs font-sans ${
                          active
                            ? "bg-gradient-to-r from-[#9E430A] via-[#C25E10] to-[#D4AF37] text-white border-transparent shadow-[0_3px_10px_rgba(194,94,16,0.3)] font-bold"
                            : "bg-[#FFFDF8] hover:bg-[#FDF6E8] border-[#D4AF37]/35 text-[#635342] hover:text-[#9E430A] shadow-xs"
                        }`}
                      >
                        <span className="shrink-0">
                          {track.icon === "sun" && <Sun className={`w-3.5 h-3.5 ${active ? "text-amber-200" : "text-[#C25E10]"}`} />}
                          {track.icon === "ganesha" && <Flame className={`w-3.5 h-3.5 ${active ? "text-amber-200" : "text-[#C25E10]"}`} />}
                          {track.icon === "shiva" && <Shield className={`w-3.5 h-3.5 ${active ? "text-amber-200" : "text-[#C25E10]"}`} />}
                        </span>
                        <span className="truncate tracking-tight font-medium">{track.shortName}</span>
                        {active && isPlaying && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 3. Consecrated Sanskrit Inscription Altar */}
                <div className="rounded-xl bg-gradient-to-r from-[#FFFBF2] via-[#FDF5E3] to-[#FFFBF2] border border-[#D4AF37]/45 px-3.5 py-2.5 sm:py-3 text-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]">
                  <p
                    className="text-[13px] sm:text-[15px] font-serif text-[#1E120A] leading-relaxed font-bold tracking-wide"
                    style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                  >
                    {selectedTrack.sanskrit}
                  </p>
                  <p className="text-[10.5px] sm:text-[11.5px] text-[#635342] italic mt-1 font-sans">
                    &ldquo;{selectedTrack.translation}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
