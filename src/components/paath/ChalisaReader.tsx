"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, Plus, Minus, Check, Share2 } from "lucide-react";
import type { ChalisaLang, PaathConfig } from "@/lib/paath/types";

type Lang = "hi" | "en";
const SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30 };
const PAATH_EVENT = "shubhmarg:paath-updated";

/* ── Daily paath counter (localStorage via useSyncExternalStore: no hydration mismatch) ── */
type PaathData = { date: string; today: number; total: number };
const todayKey = () => new Date().toLocaleDateString("en-CA");

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(PAATH_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(PAATH_EVENT, cb);
  };
}
const readRaw = (key: string) => {
  try { return localStorage.getItem(key) ?? ""; } catch { return ""; }
};
function parse(raw: string): PaathData {
  try {
    const d = JSON.parse(raw) as PaathData;
    return { date: d.date, today: d.date === todayKey() ? d.today : 0, total: d.total || 0 };
  } catch {
    return { date: todayKey(), today: 0, total: 0 };
  }
}
function addPaath(key: string) {
  const cur = parse(readRaw(key));
  const next: PaathData = { date: todayKey(), today: cur.today + 1, total: cur.total + 1 };
  try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* private mode */ }
  window.dispatchEvent(new Event(PAATH_EVENT));
}

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/* ── Lyrics block (every language is in the HTML for search engines; one is shown) ── */
function Lyrics({ data, lang, active, fontScale }: { data: ChalisaLang; lang: Lang; active: boolean; fontScale: number }) {
  const verseSize = { fontSize: `${(lang === "hi" ? 17 : 15.5) * fontScale}px` };
  const doha = (lines: string[], label: string) =>
    lines.length === 0 ? null : (
      <div className="text-center px-4 py-4 sm:py-5 bg-gradient-to-b from-[#FFF4DF] to-[#FCEBCB]">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B8860B] mb-1.5">{label}</p>
        {lines.map((l) => (
          <p key={l} style={verseSize} className={`leading-relaxed text-[#7B2D0E] ${lang === "hi" ? "font-serif" : "font-serif italic"}`}>{l}</p>
        ))}
      </div>
    );

  return (
    <div hidden={!active} lang={lang === "hi" ? "hi" : "en"}>
      {doha(data.dohaStart, lang === "hi" ? "॥ दोहा ॥" : "Doha")}
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#B8860B] pt-4 pb-1">
        {lang === "hi" ? "॥ चौपाई ॥" : "Chaupai"}
      </p>
      <ol className="divide-y divide-[#B8860B]/12 px-3 sm:px-5">
        {data.chaupai.map((v, i) => (
          <li key={i} className="flex gap-3 items-baseline py-2.5">
            <span aria-hidden="true" className="shrink-0 w-6 text-right text-[11px] font-bold tabular-nums text-[#B8860B]">{i + 1}</span>
            <span style={verseSize} className="leading-relaxed font-serif text-[#2A1810]">{v}</span>
          </li>
        ))}
      </ol>
      {doha(data.dohaEnd, lang === "hi" ? "॥ दोहा ॥" : "Doha")}
    </div>
  );
}

function SizeButtons({ setFontScale, variant }: { setFontScale: (f: (s: number) => number) => void; variant: "dark" | "light" }) {
  const cls =
    variant === "dark"
      ? "w-8 h-8 rounded-full bg-white/10 border border-[#D4A537]/30 text-[#F5A623]"
      : "w-9 h-9 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 text-[#C25E10]";
  return (
    <>
      <button type="button" aria-label="Smaller text" onClick={() => setFontScale((s) => Math.max(0.85, +(s - 0.1).toFixed(2)))} className={`${cls} flex items-center justify-center`}>
        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
      <button type="button" aria-label="Larger text" onClick={() => setFontScale((s) => Math.min(1.5, +(s + 0.1).toFixed(2)))} className={`${cls} flex items-center justify-center`}>
        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </>
  );
}

export default function ChalisaReader({ paath }: { paath: PaathConfig }) {
  const reduce = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lang, setLang] = useState<Lang>("hi");
  const [fontScale, setFontScale] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [audioMissing, setAudioMissing] = useState(false);
  const [time, setTime] = useState({ cur: 0, dur: 0 });
  const [shareMsg, setShareMsg] = useState("");

  const count = parse(useSyncExternalStore(subscribe, () => readRaw(paath.storageKey), () => ""));
  const hasAudio = Boolean(paath.audioSrc);
  const hasEn = Boolean(paath.en);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => setAudioMissing(true)); }
  };

  const share = async () => {
    const url = `${window.location.origin}/${paath.slug}`;
    const text = `🙏 ${paath.titleHi} — ShubhMarg`;
    if (navigator.share) {
      try { await navigator.share({ title: paath.titleHi, text, url }); return; } catch { /* cancelled */ }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener,noreferrer");
    setShareMsg("WhatsApp खुल रहा है…");
    setTimeout(() => setShareMsg(""), 2500);
  };

  const progress = time.dur > 0 ? Math.min(1, time.cur / time.dur) : 0;
  const tap = reduce ? undefined : { scale: 0.96 };

  return (
    <div>
      {hasAudio && (
        <audio
          ref={audioRef}
          src={paath.audioSrc}
          preload="none"
          onTimeUpdate={(e) => setTime({ cur: e.currentTarget.currentTime, dur: e.currentTarget.duration || 0 })}
          onLoadedMetadata={(e) => setTime((t) => ({ ...t, dur: e.currentTarget.duration || 0 }))}
          onEnded={() => { setPlaying(false); addPaath(paath.storageKey); }}
          onError={() => setAudioMissing(true)}
        />
      )}

      {/* Sticky controls (only when there is audio or a language toggle) */}
      {(hasAudio || hasEn) && (
        <div className="sticky top-16 z-20 mb-4 rounded-2xl bg-[#2A1810]/95 backdrop-blur-sm border border-[#D4A537]/40 shadow-[0_10px_30px_-12px_rgba(42,24,16,0.6)] overflow-hidden">
          <div className="flex items-center gap-2.5 px-3 py-2.5">
            {hasAudio && (
              <>
                <motion.button
                  type="button"
                  onClick={toggle}
                  disabled={audioMissing}
                  whileTap={tap}
                  transition={SNAPPY}
                  aria-label={audioMissing ? "Audio coming soon" : playing ? "Pause" : "Play"}
                  className="shrink-0 flex items-center gap-1.5 pl-3 pr-4 h-10 rounded-full bg-gradient-to-r from-[#E8791E] to-[#F5A623] text-white font-bold text-sm disabled:opacity-60"
                >
                  {playing ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
                  <span>{audioMissing ? "जल्द" : playing ? "रोकें" : "सुनें"}</span>
                </motion.button>
                <span className="text-[11px] tabular-nums text-[#F3E5C0]/80 min-w-[62px]">
                  {fmt(time.cur)}{time.dur ? ` / ${fmt(time.dur)}` : ""}
                </span>
              </>
            )}

            {hasEn && (
              <div role="group" aria-label="Lyrics language" className="ml-auto flex rounded-full bg-white/10 border border-[#D4A537]/30 p-0.5">
                {(["hi", "en"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`h-8 px-3 rounded-full text-[12px] font-bold transition-colors ${lang === l ? "bg-[#F5A623] text-[#2A1810]" : "text-[#F3E5C0]"}`}
                  >
                    {l === "hi" ? "हिंदी" : "English"}
                  </button>
                ))}
              </div>
            )}

            <div className={`hidden sm:flex items-center gap-1 ${hasEn ? "" : "ml-auto"}`}>
              <SizeButtons setFontScale={setFontScale} variant="dark" />
            </div>
          </div>
          {hasAudio && (
            <div className="h-[3px] bg-white/10" aria-hidden="true">
              <div className="h-full origin-left bg-gradient-to-r from-[#F5A623] to-[#E8791E] transition-transform duration-300" style={{ transform: `scaleX(${progress})` }} />
            </div>
          )}
        </div>
      )}

      {/* Text size row (always on phones; on desktop when there is no sticky bar) */}
      <div className={`${hasAudio || hasEn ? "sm:hidden" : ""} flex items-center justify-end gap-2 -mt-1 mb-3`}>
        <span className="text-[10px] uppercase tracking-wider text-[#6B5A48]">Text</span>
        <SizeButtons setFontScale={setFontScale} variant="light" />
      </div>

      {/* Manuscript card */}
      <article
        aria-label={`${paath.titleEn} lyrics`}
        className="relative rounded-3xl bg-[#FFFDF8] border border-[#D4A537]/40 shadow-[0_18px_44px_-22px_rgba(107,42,20,0.45)] overflow-hidden"
      >
        <span aria-hidden="true" className="pointer-events-none absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#D4A537]/70 rounded-tl-sm" />
        <span aria-hidden="true" className="pointer-events-none absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D4A537]/70 rounded-tr-sm" />
        <Lyrics data={paath.hi} lang="hi" active={lang === "hi"} fontScale={fontScale} />
        {paath.en && <Lyrics data={paath.en} lang="en" active={lang === "en"} fontScale={fontScale} />}
        <p className="text-center text-[12px] font-serif text-[#8B1A1A] py-3 border-t border-[#B8860B]/15">{paath.closing}</p>
      </article>

      {/* Paath counter + share */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-3">
        <div className="flex-1 flex items-center justify-between gap-3 rounded-2xl bg-[#FFFDF8] border border-[#B8860B]/25 px-4 py-3">
          <div className="text-[13px] text-[#6B5A48] leading-tight">
            <span className="block">आज का पाठ: <strong className="text-[#C25E10] text-base tabular-nums">{count.today}</strong></span>
            <span className="block text-[11px] mt-0.5">कुल पाठ: <span className="tabular-nums font-semibold text-[#2A1810]">{count.total}</span></span>
          </div>
          <motion.button
            type="button"
            onClick={() => addPaath(paath.storageKey)}
            whileTap={tap}
            transition={SNAPPY}
            className="btn-gold inline-flex items-center gap-1.5 h-11 px-4 rounded-full text-sm font-bold"
          >
            <Check className="w-4 h-4" aria-hidden="true" />
            पाठ पूर्ण
          </motion.button>
        </div>
        <motion.button
          type="button"
          onClick={share}
          whileTap={tap}
          transition={SNAPPY}
          className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-3 rounded-2xl bg-[#FFFDF8] border border-[#B8860B]/30 text-[#C25E10] text-sm font-bold"
        >
          <Share2 className="w-4 h-4" aria-hidden="true" />
          {shareMsg || "परिवार को भेजें"}
        </motion.button>
      </div>
    </div>
  );
}