"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Minus, ChevronLeft, MessageSquare, ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { GUIDES, Guide } from "@/lib/guides";
import { quickRashiFromText } from "@/lib/rashi-from-date";

// Rotating live-activity proof — builds trust + gentle urgency in the guide picker.
const SOCIAL_PROOF = [
  "Ramesh from Jaipur just booked a Prashna reading ✓",
  "Priya from Pune received her Kundli report ✓",
  "Anil from Delhi booked a Muhurta consultation ✓",
  "Meera from Bengaluru got her Guna Milan ✓",
  "Vikram from Ahmedabad booked a Vastu audit ✓",
  "Sneha from Kolkata received her guidance on WhatsApp ✓",
];

type Message = { role: "user" | "assistant"; content: string };

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Suprabhat 🌅 Good morning";
  if (h < 17) return "Namaskar ☀️ Good afternoon";
  if (h < 21) return "Shubh Sandhya 🌙 Good evening";
  return "Shubh Ratri 🌟 Good night";
}

function welcomeFor(g: Guide) {
  return `${getGreeting()} 🙏\n\nMain hoon **${g.name}** — ${g.title} at ShubhMarg. Main ${g.specialty} mein aapki personally madad karta hoon.\n\nApni baat kahiye — Hindi, English ya kisi bhi bhasha mein. Aap kya jaanna chahte hain?`;
}

const QUICK_CHIPS = [
  "Services & dakshina batao",
  "Mujhe guidance chahiye",
  "How to book consultation?",
  "Privacy & confidentiality",
];

const CATEGORIES = [
  { id: "all", label: "All Guides" },
  { id: "marriage", label: "💍 Marriage" },
  { id: "career", label: "💼 Career" },
  { id: "health", label: "🌿 Health & Peace" },
  { id: "vastu", label: "🏡 Vastu & Muhurta" },
];

// Gold-framed avatar with graceful fallback to the guide's initial
function GuideAvatar({ guide, size }: { guide: Guide; size: number }) {
  const [err, setErr] = useState(false);
  const initial = guide.name.replace(/^(Acharya|Pandit|Guru Maa|Guru|Shri)\s+/i, "").charAt(0);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${guide.accent}, #8A6520)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 0 2px ${guide.accent}88, 0 4px 12px ${guide.accent}44`,
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
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
      ॐ
    </span>
  </div>
);

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [guide, setGuide] = useState<Guide | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [showChips, setShowChips] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [proofIdx, setProofIdx] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate the live social-proof line every ~3.5s while the guide picker is visible.
  useEffect(() => {
    if (guide || !open || minimized) return;
    const t = setInterval(() => setProofIdx((i) => (i + 1) % SOCIAL_PROOF.length), 3500);
    return () => clearInterval(t);
  }, [guide, open, minimized]);

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

  // ── Human presence: reveal an assistant reply the way a real Pandit Ji would —
  //    a natural "typing…" beat (scaled to reply length, gently capped), then the
  //    message appears. Makes the guide feel warmly human, not machine-instant. ──
  const revealHumanReply = useCallback((content: string) => {
    const words = content.trim().split(/\s+/).length;
    // ~55ms/word "reading+writing" feel, floor 900ms, ceiling 3.2s.
    const delay = Math.min(3200, Math.max(900, words * 55));
    setLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content }]);
        setLoading(false);
        resolve();
      }, delay);
    });
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading || !guide) return;
      setShowChips(false);
      setInput("");
      const userMsg: Message = { role: "user", content: trimmed };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);

      // ── Instant Rashi superpower: if the seeker typed a birth date, compute their
      //    Rashi locally and give a real, immediate mini-verdict (no API call).
      //    Delivered with a human typing beat so it feels personally cast, not auto.
      const qr = quickRashiFromText(trimmed);
      if (qr) {
        const reply =
          `Ek pal beta, main aapki janm-tithi dekh raha/rahi hoon… 🙏\n\n` +
          `Aapki **Rashi ${qr.hindi} (${qr.en})** hai.\n` +
          `• **Swami Grah:** ${qr.lord}\n` +
          `• **Tattva:** ${qr.element}\n` +
          `• ${qr.oneLine}\n\n` +
          `Yeh ek turant sanket hai. Aapki *sateek* sidereal kundli, dashaayein aur upaay ke liye main aapke liye poora personalized Kundli reading tayyar karva sakta/sakti hoon. Aap request-guidance form bhar dijiye, main aage ka margdarshan doonga. 🌟`;
        await revealHumanReply(reply);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages, guideId: guide.id }),
        });
        const data = await res.json();
        // Reveal with a short human beat even after the API returns, so it never
        // feels like an instant machine dump.
        setLoading(false);
        await revealHumanReply(data.reply || "Namaste 🙏 Kripya dobara poochiye.");
      } catch {
        setLoading(false);
        await revealHumanReply("Namaste 🙏 Abhi network issue hai. Kripya dobara try karein.");
      }
    },
    [messages, loading, guide, revealHumanReply]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>));
  };

  const accent = guide?.accent ?? "#D4AF37";

  const filteredGuides = GUIDES.filter((g) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "marriage") return g.specialty.toLowerCase().includes("marriage");
    if (selectedCategory === "career") return g.specialty.toLowerCase().includes("career") || g.specialty.toLowerCase().includes("money");
    if (selectedCategory === "health") return g.specialty.toLowerCase().includes("health") || g.specialty.toLowerCase().includes("peace");
    if (selectedCategory === "vastu") return g.specialty.toLowerCase().includes("vastu") || g.specialty.toLowerCase().includes("muhurta");
    return true;
  });

  return (
    <>
      {/* ── FLOATING TOGGLE BUTTON (Hidden on mobile when chat drawer is open to avoid duplicate X buttons) ── */}
      {(!open || minimized) && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
          onClick={() => {
            setOpen((v) => !v);
            setMinimized(false);
            setShowDot(false);
          }}
          className="fixed z-[60]"
          style={{
            bottom: "calc(5.8rem + env(safe-area-inset-bottom, 0px))",
            right: "1rem",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #2A1C14 0%, #15100D 65%, #0B0807 100%)",
            border: "2px solid #C9A646",
            boxShadow: "0 6px 25px rgba(0,0,0,0.8), 0 0 15px rgba(201,166,70,0.35), inset 0 1px 1.5px rgba(226,200,117,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            touchAction: "manipulation",
            cursor: "pointer",
            outline: "none",
          }}
          aria-label="Open ShubhMarg Guides"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
        >
          <OmIcon />
          {showDot && (
            <motion.span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
              style={{ background: "#D4AF37" }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 4 }}
            />
          )}
        </motion.button>
      )}

      {/* ── CHAT WINDOW & MOBILE BOTTOM SHEET ── */}
      <AnimatePresence>
        {open && !minimized && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[74] bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Main Sheet / Window */}
            <motion.div
              key="chatwindow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[75] flex flex-col overflow-hidden inset-x-0 bottom-0 h-[86dvh] max-h-[86dvh] rounded-t-[28px] border-t-2 border-[#D4AF37]/50 shadow-[0_-15px_50px_rgba(0,0,0,0.85)] md:inset-auto md:bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:right-5 md:w-[380px] md:h-[580px] md:rounded-2xl md:border md:border-[#D4AF37]/30"
              style={{ background: "#FAF7F2" }}
            >
              {/* Mobile Drag Handle */}
              <div className="w-12 h-1 rounded-full bg-[#D4AF37]/30 mx-auto mt-2.5 mb-1 md:hidden" />

              {/* ── HEADER ── */}
              <div
                style={{
                  background: "linear-gradient(135deg, #240909 0%, #3D1212 50%, #200707 100%)",
                  borderBottom: "1px solid rgba(212,175,55,0.3)",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                }}
              >
                {guide && (
                  <button
                    onClick={backToGuides}
                    title="Choose another guide"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.9)",
                      flexShrink: 0,
                      touchAction: "manipulation",
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                <div style={{ position: "relative", flexShrink: 0 }}>
                  {guide ? (
                    <GuideAvatar guide={guide} size={42} />
                  ) : (
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "1.5px solid #FFEAA7",
                        flexShrink: 0,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/icons/shubhmarg-icon-512.png"
                        alt="ShubhMarg"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "-1px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      border: "2px solid #200707",
                    }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      color: "#FFEAA7",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      fontFamily: "Georgia, serif",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {guide ? guide.name : "ShubhMarg Vedic Guides"}
                  </p>
                  <p
                    style={{
                      color: "#D4AF37",
                      fontSize: "10px",
                      marginTop: "2px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {guide ? (loading ? "● typing…" : `● Online • ${guide.title}`) : "Authentic Shastra Counsel"}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                  <button
                    onClick={() => setMinimized(true)}
                    title="Minimize"
                    className="hidden md:flex"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    title="Close"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "white",
                      touchAction: "manipulation",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ef4444";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* ── TRUST RIBBON (always under header — reassures buyers) ── */}
              <div className="shrink-0 flex items-center justify-center gap-3 sm:gap-4 px-3 py-1.5 bg-[#2A0A0A] border-b border-[#D4AF37]/20">
                <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-[#E8C86A] tracking-wide">
                  <BadgeCheck className="w-3 h-3 text-[#22C55E]" /> Verified Vedic Desk
                </span>
                <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-[#E8C86A] tracking-wide">
                  <ShieldCheck className="w-3 h-3 text-[#22C55E]" /> Certified Acharyas
                </span>
                <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-[#E8C86A] tracking-wide">
                  <Lock className="w-3 h-3 text-[#22C55E]" /> 100% Confidential
                </span>
              </div>

              {/* ── GUIDE PICKER (no guide selected) ── */}
              {!guide && (
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    background: "#FAF7F2",
                  }}
                >
                  <div className="text-center mb-1 shrink-0">
                    <p className="text-[13px] font-medium text-[#4A2D1B] leading-relaxed">
                      Namaste 🙏 Choose your revered guide for personalized Vedic counsel.
                    </p>
                    <p className="text-[10px] text-[#8C6B1B] mt-0.5">
                      Verified Scholars • Sacred Shastra Lineage
                    </p>
                  </div>

                  {/* Live social proof — rotating recent bookings (trust + gentle urgency) */}
                  <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F1FBF4] border border-[#22C55E]/25 overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={proofIdx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35 }}
                        className="text-[10.5px] font-medium text-[#1B6B42] truncate"
                      >
                        {SOCIAL_PROOF[proofIdx]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* 1-Tap Concern Filter Chips (Protected from flex compression with shrink-0) */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1.5 pb-2 scrollbar-none shrink-0 w-full">
                    {CATEGORIES.map((cat) => {
                      const isActive = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap shrink-0 transition-all border cursor-pointer ${
                            isActive
                              ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-sm font-extrabold"
                              : "bg-white text-[#6B5A48] border-[#D4AF37]/30 hover:border-[#D4AF37]"
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Guide Cards */}
                  {filteredGuides.map((g, i) => (
                    <motion.div
                      key={g.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col bg-white border border-[#D4AF37]/35 rounded-2xl p-3.5 shadow-[0_3px_10px_rgba(0,0,0,0.04)]"
                    >
                      <div className="flex items-center gap-3">
                        <GuideAvatar guide={g} size={50} />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-[14px] font-bold text-[#2A1810] font-serif leading-snug">
                              {g.name}
                            </h4>
                            {g.verified && (
                              <span className="inline-flex items-center gap-0.5 text-[8.5px] font-bold text-[#1B6B42] bg-[#E7F7EE] border border-[#22C55E]/35 rounded-full px-1.5 py-0.5" title="Identity & lineage verified">
                                <BadgeCheck className="w-2.5 h-2.5" /> Verified
                              </span>
                            )}
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" title="Active" />
                          </div>

                          <p className="text-[11px] font-bold text-[#C25E10] mt-0.5">
                            {g.specialty}
                          </p>

                          <p className="text-[10px] text-[#7A6953] mt-1 leading-tight">
                            {g.tagline} • <span className="font-semibold text-[#8C6B1B]">{g.experience}</span>
                          </p>
                        </div>
                      </div>

                      {/* Credentials and Single Unified Sacred Action Button */}
                      <div className="mt-3 pt-2.5 border-t border-[#D4AF37]/15 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-[#8C6B1B] font-mono">
                          ⭐ {g.rating} • {g.consults} Consultations
                        </span>

                        <button
                          type="button"
                          onClick={() => selectGuide(g)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#D4AF37] text-black text-[11px] font-extrabold shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Consult {g.name.split(" ")[0] === "Guru" ? "Guru Maa" : g.name.split(" ")[0]}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <p className="text-[9px] text-[#9E8569] text-center mt-2 font-light">
                    ShubhMarg • Traditional Vedic Sanctum &amp; Shastra Guidance
                  </p>
                </div>
              )}

              {/* ── MESSAGES (guide selected) ── */}
              {guide && (
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "8px",
                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      {msg.role === "assistant" && <GuideAvatar guide={guide} size={28} />}
                      <div
                        style={{
                          maxWidth: "82%",
                          borderRadius: "16px",
                          padding: "10px 14px",
                          fontSize: "13px",
                          lineHeight: "1.6",
                          whiteSpace: "pre-wrap",
                          ...(msg.role === "user"
                            ? { background: "#4B1515", color: "white", borderBottomRightRadius: "4px" }
                            : {
                                background: "white",
                                color: "#1A1C20",
                                border: "1px solid rgba(212,175,55,0.2)",
                                borderBottomLeftRadius: "4px",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                              }),
                        }}
                      >
                        {renderText(msg.content)}
                        {msg.role === "assistant" &&
                          (msg.content.toLowerCase().includes("request-guidance") ||
                            msg.content.toLowerCase().includes("form bhar")) && (
                            <Link
                              href="/request-guidance"
                              onClick={() => setOpen(false)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                marginTop: "10px",
                                background: accent,
                                color: "#1a0505",
                                fontSize: "11px",
                                fontWeight: 700,
                                padding: "6px 12px",
                                borderRadius: "8px",
                                textDecoration: "none",
                              }}
                            >
                              Begin Your Guidance →
                            </Link>
                          )}
                      </div>
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
                    >
                      <GuideAvatar guide={guide} size={28} />
                      <div
                        style={{
                          background: "white",
                          border: "1px solid rgba(212,175,55,0.2)",
                          borderRadius: "16px",
                          borderBottomLeftRadius: "4px",
                          padding: "12px 16px",
                          display: "flex",
                          gap: "4px",
                          alignItems: "center",
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "rgba(26,28,32,0.25)",
                              display: "block",
                            }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} />
                </div>
              )}

              {/* ── QUICK CHIPS ── */}
              {guide && showChips && messages.length <= 1 && (
                <div
                  style={{
                    background: "#FAF7F2",
                    padding: "6px 12px 8px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#4B1515",
                        background: "rgba(75,21,21,0.07)",
                        border: "1px solid rgba(75,21,21,0.15)",
                        borderRadius: "999px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        touchAction: "manipulation",
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* ── INPUT BAR ── */}
              {guide && (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    background: "white",
                    borderTop: "1px solid rgba(212,175,55,0.2)",
                    padding: "10px 12px",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Kuch bhi poochiye... (Hindi/English)"
                    disabled={loading}
                    autoComplete="off"
                    style={{
                      flex: 1,
                      background: "#FAF7F2",
                      border: "1px solid rgba(212,175,55,0.3)",
                      borderRadius: "999px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      color: "#1A1C20",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#4B1515",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      opacity: !input.trim() || loading ? 0.4 : 1,
                      flexShrink: 0,
                      touchAction: "manipulation",
                    }}
                    aria-label="Send"
                  >
                    <Send size={15} color="white" />
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MINIMIZED PILL ── */}
      <AnimatePresence>
        {open && minimized && (
          <motion.button
            key="pill"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => setMinimized(false)}
            style={{
              position: "fixed",
              bottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))",
              right: "1rem",
              zIndex: 75,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #4B1515, #2f0a0a)",
              color: "white",
              padding: "8px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(212,175,55,0.3)",
              boxShadow: "0 4px 16px rgba(75,21,21,0.4)",
              cursor: "pointer",
              touchAction: "manipulation",
            }}
          >
            <span style={{ fontFamily: "serif", color: "#D4AF37", fontSize: "16px" }}>ॐ</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>
              {guide ? guide.name.split(" ")[0] + " " + (guide.name.split(" ")[1] ?? "") : "ShubhMarg Guides"}
            </span>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}