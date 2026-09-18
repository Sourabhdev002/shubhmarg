"use client";

import React, { useRef } from "react";
import { GuidanceRequest } from "@/types/admin";
import { Printer, ShieldCheck, Award } from "lucide-react";
import PanditJiVoiceBlessing from "@/components/audio/PanditJiVoiceBlessing";
import VedicReportRenderer from "./VedicReportRenderer";
import QRCode from "react-qr-code";

interface Props {
  request: GuidanceRequest;
  reportContent: string;
}

export default function RoyalVedicReport({ request, reportContent }: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = request.created_at
    ? new Date(request.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Consecrated Date";

  const certificateNumber = `CERT-VEDIC-${request.reference_id}`;
  const verificationUrl = `https://shubhmarg.com/report/${request.reference_id}`;

  return (
    <div className="min-h-screen bg-[#090604] text-[#f7f3eb] py-8 px-4 sm:px-6 print:bg-white print:text-black print:p-0">
      {/* Top Action Bar (hidden during print) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between bg-white/5 border border-[#d4af37]/30 rounded-2xl p-4 shadow-xl backdrop-blur-md print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#d4af37]" />
            <p className="text-xs text-gray-300 font-mono tracking-wider">
              {certificateNumber}
            </p>
          </div>
          <h2 className="text-sm font-bold text-[#d4af37] font-serif uppercase tracking-wider mt-0.5">
            Official Vedic Astrological Assessment
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-black" />
            <span>Print / Save Certified PDF</span>
          </button>
        </div>
      </div>

      {/* ── Sacred Royal Parchment Document ── */}
      <div
        ref={printRef}
        className="max-w-4xl mx-auto bg-[#140c08] border-2 border-[#d4af37]/70 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden print:border-2 print:border-black print:bg-white print:text-black print:shadow-none print:rounded-none print:p-6"
        style={{
          boxShadow: "0 0 60px rgba(212, 175, 55, 0.15)",
        }}
      >
        {/* Ornamental Royal Corners */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-[#d4af37] print:border-black" />
        <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-[#d4af37] print:border-black" />
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-[#d4af37] print:border-black" />
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-[#d4af37] print:border-black" />

        {/* ── Document Header ── */}
        <div className="text-center pb-6 border-b-2 border-[#d4af37]/40 print:border-black">
          <p className="text-sm sm:text-base font-serif text-[#d4af37] print:text-black tracking-[0.35em] uppercase mb-1 font-bold">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white print:text-black tracking-wider mb-1">
            SHUBHMARG
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] print:text-black font-semibold">
            Vedic Guidance &amp; Astrological Assessment
          </p>

          <div className="mt-4 inline-flex items-center gap-3 px-4 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 print:border-black print:bg-transparent text-[11px] font-mono text-gray-300 print:text-black">
            <span>Certificate No: <strong>{certificateNumber}</strong></span>
            <span>•</span>
            <span>Date: <strong>{formattedDate}</strong></span>
          </div>
        </div>

        {/* ── Seeker & Birth Chart Details Grid ── */}
        <div className="my-6 bg-black/50 border border-[#d4af37]/30 rounded-2xl p-5 print:bg-gray-50 print:border-black avoid-break">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-400 print:text-gray-600 block uppercase tracking-wider text-[10px] font-semibold">
                Seeker Name
              </span>
              <span className="font-bold text-white print:text-black text-sm">{request.full_name}</span>
            </div>
            <div>
              <span className="text-gray-400 print:text-gray-600 block uppercase tracking-wider text-[10px] font-semibold">
                Birth Date
              </span>
              <span className="font-semibold text-[#f7f3eb] print:text-black">{request.date_of_birth}</span>
            </div>
            <div>
              <span className="text-gray-400 print:text-gray-600 block uppercase tracking-wider text-[10px] font-semibold">
                Birth Place
              </span>
              <span className="font-semibold text-[#f7f3eb] print:text-black">{request.birth_place}</span>
            </div>
            <div>
              <span className="text-gray-400 print:text-gray-600 block uppercase tracking-wider text-[10px] font-semibold">
                Service Type
              </span>
              <span className="font-bold text-[#d4af37] print:text-black capitalize">
                {request.service.replace(/-/g, " ")}
              </span>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-white/10 print:border-gray-300 text-xs">
            <span className="text-gray-400 print:text-gray-600 block uppercase tracking-wider text-[10px] font-semibold mb-0.5">
              Consultation Question / Concern
            </span>
            <p className="text-gray-300 print:text-black italic">{request.question}</p>
          </div>
        </div>

        {/* ── Spoken Blessing Audio Player (Screen Only) ── */}
        <div className="my-6 print:hidden">
          <PanditJiVoiceBlessing seekerName={request.full_name} />
        </div>

        {/* ── Parsed Royal Markdown Content ── */}
        <div className="my-8">
          <VedicReportRenderer content={reportContent} />
        </div>

        {/* ── Sacred Pandit Ji Seal & Authentication Certificate Footer ── */}
        <div className="mt-12 pt-8 border-t-2 border-[#d4af37]/40 print:border-black flex flex-col sm:flex-row items-center justify-between gap-6 avoid-break">
          {/* Pandit Ji Consecration Stamp */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] print:border-black flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-[#d4af37]/15 print:bg-transparent flex flex-col items-center justify-center text-center">
                <span className="text-xs font-serif text-[#d4af37] print:text-black font-extrabold">शुभमार्ग</span>
                <span className="text-[7px] text-gray-300 print:text-black uppercase tracking-widest font-mono">SEAL</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white print:text-black font-serif">Pandit Ji</p>
              <p className="text-[11px] text-gray-400 print:text-gray-700">Head Astrological Practitioner, ShubhMarg</p>
              <p className="text-[10px] text-[#d4af37] print:text-black font-mono">Consecrated on: {formattedDate}</p>
            </div>
          </div>

          {/* Verification QR Code & Seal */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 print:text-black font-bold mb-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 print:text-black" />
                <span>Verified Vedic Document</span>
              </div>
              <p className="text-[10px] text-gray-400 print:text-gray-700 max-w-[200px] leading-tight">
                Classical Parashari calculations &amp; planetary ephemeris.
              </p>
            </div>

            <div className="bg-white p-2 rounded-xl border-2 border-[#d4af37] print:border-black shadow-md shrink-0">
              <QRCode
                value={verificationUrl}
                size={56}
                level="M"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
