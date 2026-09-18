"use client";

import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import GlobalDeskBadge from "./GlobalDeskBadge";
import { waLink } from "@/config/contact";

interface DirectWhatsAppButtonProps {
  serviceName?: string;
  price?: number | string;
  seekerName?: string;
  className?: string;
  variant?: "button" | "card" | "compact";
}

export default function DirectWhatsAppButton({
  serviceName = "Sacred Vedic Consultation",
  price,
  seekerName,
  className = "",
  variant = "button",
}: DirectWhatsAppButtonProps) {
  const cleanPrice = price ? ` (${typeof price === "number" ? `₹${price}` : price})` : "";
  const nameSnippet = seekerName ? ` for ${seekerName}` : "";
  
  const whatsappUrl = waLink(
    `Namaste Pandit Ji 🙏 I would like to directly request guidance for *${serviceName}*${cleanPrice}${nameSnippet}. Please share details for personalized Gotra Sankalp.`
  );

  if (variant === "card") {
    return (
      <div className={`bg-gradient-to-br from-[#FFFDF8] to-[#F5EAD6] border-2 border-emerald-600/30 rounded-3xl p-6 sm:p-7 shadow-[0_12px_34px_-16px_rgba(107,42,20,0.22)] ${className}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-emerald-600/10 border border-emerald-600/30 flex items-center justify-center text-emerald-700 shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.12)]">
              <MessageCircle className="w-7 h-7 fill-emerald-600/15" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Instant Pandit Ji Desk • Under 5 Mins Response</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold font-serif text-[#2A1810]">
                Prefer to Consult Directly on WhatsApp?
              </h4>
              <p className="text-xs text-[#6B5A48]">
                Skip web forms. Message Pandit Ji&apos;s direct verified assistant on WhatsApp to book instantly via UPI.
              </p>
              <div className="mt-2.5">
                <GlobalDeskBadge variant="light" />
              </div>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all ${className}`}
      >
        <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
        <span>Order on WhatsApp</span>
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(16,185,129,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-white" />
      <span>Book Instantly via WhatsApp Desk</span>
    </a>
  );
}
