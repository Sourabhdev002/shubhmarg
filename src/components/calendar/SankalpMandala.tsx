"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * SankalpMandala — the seeker's private "Diya Chakra": a compact, glowing ring of
 * sacred oil-lamp flames. Each day they seal a Sankalp (strike the bell) → one
 * diya on the ring lights and flickers. The center holds their inner flame + streak.
 *
 * Feels 3D & alive via layered radial glows, per-flame flicker, a dished inner
 * shadow, and a sweeping gold progress arc — not flat dots.
 *
 * Storage: localStorage["shubhmarg_sankalp_journal"] = { seals: ["YYYY-MM-DD", ...] }.
 * Live-updates on the "shubhmarg:sankalp-updated" window event. Zero backend.
 */

const TOTAL_DAYS = 30;
const STORAGE_KEY = "shubhmarg_sankalp_journal";

interface Journal {
  seals: string[];
}

function readJournal(): Journal {
  if (typeof window === "undefined") return { seals: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { seals: [] };
    const parsed = JSON.parse(raw) as Journal;
    if (!parsed || !Array.isArray(parsed.seals)) return { seals: [] };
    return { seals: [...new Set(parsed.seals)].sort() };
  } catch {
    return { seals: [] };
  }
}

function isoLocal(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function todayIsoLocal(): string {
  return isoLocal(new Date());
}

function computeStreak(seals: string[]): number {
  if (!seals.length) return 0;
  const set = new Set(seals);
  let streak = 0;
  const cursor = new Date();
  if (!set.has(todayIsoLocal())) cursor.setDate(cursor.getDate() - 1);
  for (;;) {
    if (set.has(isoLocal(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return streak;
}

function buildWindow(): string[] {
  const out: string[] = [];
  const d = new Date();
  for (let i = TOTAL_DAYS - 1; i >= 0; i--) {
    const c = new Date(d);
    c.setDate(c.getDate() - i);
    out.push(isoLocal(c));
  }
  return out;
}

export default function SankalpMandala() {
  const reduce = useReducedMotion();
  const [journal, setJournal] = useState<Journal>({ seals: [] });
  // The SVG petal coords use Math.cos/sin which produce tiny float diffs between
  // server & client → hydration mismatch. This is a client-only visual (reads
  // localStorage), so we only draw the chakra after mount.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setJournal(readJournal());
    const onUpdate = () => setJournal(readJournal());
    window.addEventListener("shubhmarg:sankalp-updated", onUpdate);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setJournal(readJournal());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("shubhmarg:sankalp-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const window30 = useMemo(() => buildWindow(), []);
  const today = todayIsoLocal();
  const sealedSet = useMemo(() => new Set(journal.seals), [journal]);
  const litCount = window30.filter((d) => sealedSet.has(d)).length;
  const streak = computeStreak(journal.seals);
  const percent = Math.round((litCount / TOTAL_DAYS) * 100);

  // Compact geometry.
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const ringR = size * 0.4;
  const arcR = size * 0.46;
  const circumference = 2 * Math.PI * arcR;

  return (
    <div className="mt-4 rounded-2xl bg-[radial-gradient(circle_at_50%_38%,#2a1608_0%,#1a0f09_55%,#100804_100%)] border border-[#D4AF37]/45 p-4 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(245,166,35,0.12)] relative overflow-hidden">
      {/* Header — compact */}
      <div className="relative flex items-center justify-between gap-2 mb-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5D77E] truncate">
          आपका दीप-चक्र · Your Diya Chakra
        </p>
        <span className="shrink-0 text-[10px] font-mono font-bold text-[#F5D77E] bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-full px-2 py-0.5">
          {litCount}/{TOTAL_DAYS}
        </span>
      </div>

      {/* The Diya Chakra — client-only render to avoid float hydration mismatch */}
      <div className="relative flex items-center justify-center" style={{ minHeight: 200 }}>
        {!mounted ? (
          <div className="w-[220px] h-[200px] flex items-center justify-center">
            <span className="font-devanagari text-[#F5C24B]/40 text-3xl" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>ॐ</span>
          </div>
        ) : (
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" style={{ maxWidth: 220 }}>
          <defs>
            {/* Lit flame body */}
            <radialGradient id="dc-flame" cx="0.5" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FFF7DB" />
              <stop offset="45%" stopColor="#FFC24B" />
              <stop offset="100%" stopColor="#E8791E" />
            </radialGradient>
            {/* Warm glow around a lit flame */}
            <radialGradient id="dc-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </radialGradient>
            {/* Center inner light */}
            <radialGradient id="dc-center" cx="0.5" cy="0.42" r="0.6">
              <stop offset="0%" stopColor="#FFF3D6" />
              <stop offset="50%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#8C4A0A" />
            </radialGradient>
            {/* Dished base gradient */}
            <radialGradient id="dc-dish" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#3a2410" stopOpacity="0" />
              <stop offset="80%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </radialGradient>
          </defs>

          {/* Dished shadow ring for depth */}
          <circle cx={cx} cy={cy} r={arcR + 6} fill="url(#dc-dish)" />

          {/* Progress track + gold arc */}
          <circle cx={cx} cy={cy} r={arcR} fill="none" stroke="#D4AF37" strokeOpacity="0.15" strokeWidth="2.5" />
          <motion.circle
            cx={cx}
            cy={cy}
            r={arcR}
            fill="none"
            stroke="#F5A623"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            transform={`rotate(-90 ${cx} ${cy})`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - litCount / TOTAL_DAYS) }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 3px rgba(245,166,35,0.6))" }}
          />

          {/* 30 diya positions */}
          {window30.map((iso, i) => {
            const angle = (i / TOTAL_DAYS) * Math.PI * 2 - Math.PI / 2;
            const x = cx + ringR * Math.cos(angle);
            const y = cy + ringR * Math.sin(angle);
            const isLit = sealedSet.has(iso);
            const isToday = iso === today;
            const flickerDelay = (i % 6) * 0.25;

            if (isLit) {
              return (
                <g key={iso}>
                  {/* glow */}
                  <circle cx={x} cy={y} r={7} fill="url(#dc-glow)" />
                  {/* teardrop flame (small path), gently flickering */}
                  <motion.path
                    d={`M ${x} ${y - 5} C ${x + 3.2} ${y - 1}, ${x + 2.6} ${y + 3.2}, ${x} ${y + 3.6} C ${x - 2.6} ${y + 3.2}, ${x - 3.2} ${y - 1}, ${x} ${y - 5} Z`}
                    fill="url(#dc-flame)"
                    animate={reduce ? {} : { scaleY: [1, 1.14, 0.96, 1], opacity: [0.92, 1, 0.92] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: flickerDelay }}
                    style={{ transformOrigin: `${x}px ${y + 3}px` }}
                  />
                  {/* bright core */}
                  <circle cx={x} cy={y + 0.5} r={1.1} fill="#FFF7DB" />
                </g>
              );
            }

            // Unlit: a small empty diya cup with a faint wick.
            return (
              <g key={iso}>
                {isToday && !reduce && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={7}
                    fill="url(#dc-glow)"
                    animate={{ opacity: [0.15, 0.5, 0.15] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <path
                  d={`M ${x - 3.4} ${y + 1} Q ${x} ${y + 4.5} ${x + 3.4} ${y + 1} L ${x + 2.4} ${y + 2.6} Q ${x} ${y + 4.8} ${x - 2.4} ${y + 2.6} Z`}
                  fill={isToday ? "#8C5212" : "#5a3a1e"}
                  fillOpacity={isToday ? 0.9 : 0.55}
                />
                <circle cx={x} cy={y - 0.5} r={0.9} fill={isToday ? "#F5A623" : "#8C5212"} fillOpacity={isToday ? 0.9 : 0.5} />
              </g>
            );
          })}

          {/* Center inner light — glowing ॐ diya with the streak */}
          {!reduce && (
            <motion.circle
              cx={cx}
              cy={cy}
              r={30}
              fill="url(#dc-glow)"
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          )}
          <circle cx={cx} cy={cy} r={22} fill="#1a0f09" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="0.8" />
          <circle cx={cx} cy={cy} r={22} fill="url(#dc-center)" fillOpacity={litCount > 0 ? 0.28 : 0.1} />
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            fontFamily="'Tiro Devanagari Hindi', serif"
            fontSize={18}
            fontWeight="900"
            fill="url(#dc-center)"
          >
            ॐ
          </text>
          <text x={cx} y={cy + 13} textAnchor="middle" fontSize={8.5} fontWeight="700" fill="#F5D77E" letterSpacing="0.5">
            {streak} DAY{streak === 1 ? "" : "S"}
          </text>
        </svg>
        )}
      </div>

      {/* Compact status line */}
      <p className="relative text-center text-[10px] text-white/70 font-sans mt-1.5">
        {litCount === 0 ? (
          <>Strike the bell to light your first diya.</>
        ) : litCount >= TOTAL_DAYS ? (
          <span className="text-[#F5D77E] font-bold">🌕 Chakra complete — a full cycle of light!</span>
        ) : sealedSet.has(today) ? (
          <>Today&apos;s diya glows · <span className="text-[#F5D77E] font-bold">{percent}%</span> of your chakra alight</>
        ) : (
          <>One Sankalp lights the next diya · <span className="text-[#F5D77E] font-bold">{percent}%</span></>
        )}
      </p>
    </div>
  );
}

/** Record a seal for today + broadcast so the chakra lights live. */
export function recordSankalpToday(): void {
  if (typeof window === "undefined") return;
  try {
    const cur = readJournal();
    const today = todayIsoLocal();
    if (cur.seals.includes(today)) return;
    const next = { seals: [...cur.seals, today].sort() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("shubhmarg:sankalp-updated"));
  } catch {
    /* ignore */
  }
}
