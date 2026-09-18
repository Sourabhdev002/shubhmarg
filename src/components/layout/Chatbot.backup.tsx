"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Minus, ChevronLeft } from "lucide-react";

import Link from "next/link";
import { GUIDES, Guide } from "@/lib/guides";

type Message = { role: "user" | "assistant"; content: string };

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Suprabhat \uD83C\uDF05 Good morning";
  if (h < 17) return "Namaskar \u2600\uFE0F Good afternoon";
  if (h < 21) return "Shubh Sandhya \uD83C\uDF19 Good evening";
  return "Shubh Ratri \uD83C\uDF1F Good night";
}

function welcomeFor(g: Guide) {
  return `${getGreeting()} \uD83D\uDE4F\n\nMain hoon **${g.name}** \u2014 ${g.title} at ShubhMarg. Main ${g.specialty} mein aapki personally madad karta hoon.\n\nApni baat kahiye \u2014 Hindi, English ya kisi bhi bhasha mein. Aap kya jaanna chahte hain?`;
}

const QUICK_CHIPS = [
  "Services & prices batao",
  "Mujhe guidance chahiye",
  "How to pay?",
  "Privacy safe hai?",
];

// Gold-framed avatar with graceful fallback to the guide's initial
function GuideAvatar({ guide, size }: { guide: Guide; size: number }) {
  const [err, setErr] = useState(false);
  const initial = guide.name.replace(/^(Acharya|Pandit|Guru Maa|Guru|Shri)\s+/i, "").charAt(0);
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: `linear-gradient(135deg, ${guide.accent}, #8A6520)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 0 2px ${guide.accent}55, 0 4px 12px ${guide.accent}33`,
        overflow: "hidden", flexShrink: 0, position: "relative",
      }}
    >
      {!err ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={guide.avatar}
          alt={guide.name}
          onError={() => setErr(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ fontFamily: "Georgia, serif", color: "#1a0505", fontSize: size * 0.42, fontWeight: 700 }}>
          {initial}
        </span>
      )}
    </div>
  );
}

const OmIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    {/* Subtle Yantra Ray Ring */}
    <svg viewBox="0 0 48 48" className="w-10 h-10 absolute inset-0 m-auto pointer-events-none opacity-40 animate-[spin_30s_linear_infinite]" fill="none">
      <circle cx="24" cy="24" r="21" stroke="#C9A646" strokeWidth="0.75" strokeDasharray="1 3" />
    </svg>
    <span
      className="font-serif text-[#E2C875] text-[24px] font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] select-none"
      style={{ fontFamily: "'Tiro Devanagari Hindi', 'Playfair Display', serif" }}
    >
      &#2384;
    </span>
  </div>
);

export default function ChatbotBackup() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [guide, setGuide] = useState<Guide | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [showChips, setShowChips] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [messages, loading]);

  // Listen for "open guide" events dispatched by the astrologer roster cards
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<{ guideId: string }>).detail?.guideId;
      const g = GUIDES.find((x) => x.id === id);
      if (!g) return;
      setOpen(true);
      setMinimized(false);
      setShowDot(false);
      setGuide(g);
      setShowChips(true);
      setMessages([{ role: "assistant", content: welcomeFor(g) }]);
    };
    window.addEventListener("shubhmarg:open-guide", handler as EventListener);
    return () => window.removeEventListener("shubhmarg:open-guide", handler as EventListener);
  }, []);

  useEffect(() => {
    if (open && guide && !minimized) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, guide, minimized]);

  const selectGuide = (g: Guide) => {
    setGuide(g);
    setShowChips(true);
    setMessages([{ role: "assistant", content: welcomeFor(g) }]);
  };

  const backToGuides = () => {
    setGuide(null);
    setMessages([]);
    setInput("");
  };

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || !guide) return;
    setShowChips(false);
    setInput("");
    const userMsg: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, guideId: guide.id }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Namaste \uD83D\uDE4F Abhi network issue hai. Kripya dobara try karein." }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading, guide]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };

  const renderText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>);
  };

  const accent = guide?.accent ?? "#D4AF37";

  return (
    <>
      {/* ── TOGGLE BUTTON ── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
        onClick={() => { setOpen(v => !v); setMinimized(false); setShowDot(false); }}
        className="fixed z-[60]"
        style={{
          bottom: "calc(4.5rem + env(safe-area-inset-bottom, 0px))",
          right: "1rem",
          width: "50px", height: "50px", borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #2A1C14 0%, #15100D 65%, #0B0807 100%)",
          border: "2px solid #C9A646",
          boxShadow: "0 6px 25px rgba(0,0,0,0.8), 0 0 15px rgba(201,166,70,0.35), inset 0 1px 1.5px rgba(226,200,117,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          touchAction: "manipulation", cursor: "pointer", outline: "none",
        }}
        aria-label="Open ShubhMarg Guides"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
      >
        <AnimatePresence mode="wait">
          {open && !minimized
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6 text-white" />
              </motion.div>
            : <motion.div key="om" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.15 }}>
                <OmIcon />
              </motion.div>
          }
        </AnimatePresence>
        {(!open || minimized) && showDot && (
          <motion.span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
            style={{ background: "#D4AF37" }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 4 }}
          />
        )}
      </motion.button>

      {/* ── CHAT WINDOW ── */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[59] flex flex-col overflow-hidden"
            style={{
              bottom: "calc(8rem + env(safe-area-inset-bottom, 0px))",
              right: "1rem",
              width: "min(360px, calc(100vw - 2rem))",
              height: "min(540px, calc(100dvh - 10rem))",
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(212,175,55,0.2)",
              background: "#f9f5ef",
            }}
          >
            {/* ── HEADER ── */}
            <div style={{
              background: "linear-gradient(135deg, #2a0808 0%, #4B1515 50%, #2a0808 100%)",
              borderBottom: "1px solid rgba(212,175,55,0.25)",
              padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0,
            }}>
              {guide && (
                <button
                  onClick={backToGuides}
                  title="Choose another guide"
                  style={{
                    width: "28px", height: "28px", borderRadius: "8px",
                    background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "rgba(255,255,255,0.85)", flexShrink: 0, touchAction: "manipulation",
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
              )}

              <div style={{ position: "relative", flexShrink: 0 }}>
                {guide
                  ? <GuideAvatar guide={guide} size={42} />
                  : <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg, #D4AF37, #AA8822)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "serif", color: "#1a0505", fontSize: "22px", lineHeight: 1 }}>&#2384;</span>
                    </div>
                }
                <span style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "13px", height: "13px", borderRadius: "50%", background: "#22c55e", border: "2px solid #2a0808" }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "white", fontSize: "14px", fontWeight: 700, lineHeight: 1.2, fontFamily: "Georgia, serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {guide ? guide.name : "ShubhMarg Guides"}
                </p>
                <p style={{ color: "rgba(212,175,55,0.75)", fontSize: "10px", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {guide ? `\u25CF Online \u00B7 ${guide.title}` : "Choose your Vedic guide"}
                </p>
              </div>

              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                <button onClick={() => setMinimized(true)} title="Minimize"
                  style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.85)", touchAction: "manipulation" }}>
                  <Minus size={14} />
                </button>
                <button onClick={() => setOpen(false)} title="Close"
                  style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.85)", touchAction: "manipulation" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#ef4444"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}>
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── GUIDE PICKER (no guide selected) ── */}
            {!guide && (
              <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px", background: "#f9f5ef" }}>
                <p style={{ fontSize: "12px", color: "#6b5b45", textAlign: "center", marginBottom: "2px", lineHeight: 1.5 }}>
                  Namaste \uD83D\uDE4F Choose the guide who fits your need. Each specialises in a different area.
                </p>
                {GUIDES.map((g, i) => (
                  <motion.button
                    key={g.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => selectGuide(g)}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px", textAlign: "left",
                      background: "white", border: `1px solid ${g.accent}33`,
                      borderRadius: "14px", padding: "12px", cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)", touchAction: "manipulation",
                    }}
                    whileHover={{ scale: 1.02, boxShadow: `0 6px 18px ${g.accent}22` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <GuideAvatar guide={g} size={48} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#2a1a0a", fontFamily: "Georgia, serif", lineHeight: 1.2 }}>{g.name}</p>
                      <p style={{ fontSize: "11px", fontWeight: 700, color: g.accent, marginTop: "2px" }}>{g.specialty}</p>
                      <p style={{ fontSize: "10px", color: "#8a7860", marginTop: "3px", lineHeight: 1.4 }}>
                        {g.tagline} \u00B7 {g.experience}
                      </p>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: 700, color: "white", background: g.accent, padding: "5px 10px", borderRadius: "999px", flexShrink: 0 }}>
                      Chat
                    </span>
                  </motion.button>
                ))}
                <p style={{ fontSize: "9px", color: "rgba(26,28,32,0.3)", textAlign: "center", marginTop: "4px" }}>
                  ShubhMarg \u00B7 Traditional Vedic Guidance
                </p>
              </div>
            )}

            {/* ── MESSAGES (guide selected) ── */}
            {guide && (
              <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                    style={{ display: "flex", alignItems: "flex-end", gap: "8px", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    {msg.role === "assistant" && <GuideAvatar guide={guide} size={28} />}
                    <div style={{
                      maxWidth: "82%", borderRadius: "16px", padding: "10px 14px",
                      fontSize: "13px", lineHeight: "1.6", whiteSpace: "pre-wrap",
                      ...(msg.role === "user"
                        ? { background: "#4B1515", color: "white", borderBottomRightRadius: "4px" }
                        : { background: "white", color: "#1A1C20", border: "1px solid rgba(212,175,55,0.12)", borderBottomLeftRadius: "4px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }),
                    }}>
                      {renderText(msg.content)}
                      {msg.role === "assistant" && (
                        msg.content.toLowerCase().includes("request-guidance") ||
                        msg.content.toLowerCase().includes("form bhar")
                      ) && (
                        <Link href="/request-guidance" onClick={() => setOpen(false)}
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "10px", background: accent, color: "#1a0505", fontSize: "11px", fontWeight: 700, padding: "6px 12px", borderRadius: "8px", textDecoration: "none" }}>
                          Begin Your Guidance →
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                    <GuideAvatar guide={guide} size={28} />
                    <div style={{ background: "white", border: "1px solid rgba(212,175,55,0.12)", borderRadius: "16px", borderBottomLeftRadius: "4px", padding: "12px 16px", display: "flex", gap: "4px", alignItems: "center" }}>
                      {[0,1,2].map(i => (
                        <motion.span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(26,28,32,0.25)", display: "block" }}
                          animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>
            )}

            {/* ── QUICK CHIPS ── */}
            {guide && showChips && messages.length <= 1 && (
              <div style={{ background: "#f9f5ef", padding: "6px 12px 8px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {QUICK_CHIPS.map(chip => (
                  <button key={chip} onClick={() => sendMessage(chip)}
                    style={{ fontSize: "11px", fontWeight: 600, color: "#4B1515", background: "rgba(75,21,21,0.07)", border: "1px solid rgba(75,21,21,0.15)", borderRadius: "999px", padding: "5px 10px", cursor: "pointer", touchAction: "manipulation" }}>
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* ── INPUT BAR ── */}
            {guide && (
              <form onSubmit={handleSubmit} style={{ background: "white", borderTop: "1px solid rgba(212,175,55,0.15)", padding: "10px 12px", display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                  placeholder="Kuch bhi poochiye... (Hindi/English)" disabled={loading} autoComplete="off"
                  style={{ flex: 1, background: "#f9f5ef", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "999px", padding: "8px 16px", fontSize: "14px", color: "#1A1C20", outline: "none" }} />
                <button type="submit" disabled={!input.trim() || loading}
                  style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#4B1515", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: (!input.trim() || loading) ? 0.4 : 1, flexShrink: 0, touchAction: "manipulation" }}
                  aria-label="Send">
                  <Send size={15} color="white" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MINIMIZED PILL ── */}
      <AnimatePresence>
        {open && minimized && (
          <motion.button key="pill" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            onClick={() => setMinimized(false)}
            style={{
              position: "fixed", bottom: "calc(8rem + env(safe-area-inset-bottom, 0px))", right: "1rem", zIndex: 59,
              display: "flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, #4B1515, #2f0a0a)", color: "white", padding: "8px 14px",
              borderRadius: "999px", border: "1px solid rgba(212,175,55,0.3)", boxShadow: "0 4px 16px rgba(75,21,21,0.4)",
              cursor: "pointer", touchAction: "manipulation",
            }}>
            <span style={{ fontFamily: "serif", color: "#D4AF37", fontSize: "16px" }}>&#2384;</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>{guide ? guide.name.split(" ")[0] + " " + (guide.name.split(" ")[1] ?? "") : "ShubhMarg Guides"}</span>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
