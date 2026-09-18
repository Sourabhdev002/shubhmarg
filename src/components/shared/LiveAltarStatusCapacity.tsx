"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface AltarStatusProps {
  totalCapacity?: number;
  consecratedCount?: number;
  location?: string;
  ritualName?: string;
}

export default function LiveAltarStatusCapacity({
  totalCapacity = 50,
  consecratedCount = 46,
  location = "Kashi Vishwanath Altar, Varanasi",
  ritualName = "Evening Sandhya Gotra Sankalp & Shanti Path",
}: AltarStatusProps) {
  const remaining = totalCapacity - consecratedCount;
  const percentage = (consecratedCount / totalCapacity) * 100;

  return (
    <div className="bg-[#FFFDF8] border-2 border-[#B8860B]/30 rounded-3xl p-5 sm:p-7 shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)] relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
        <div className="space-y-1.5 max-w-2xl">
          {/* Live Indicator */}
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600 font-mono">
              Live Altar Status • {location}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold font-serif text-[#2A1810]">
            {ritualName}
          </h3>

          <p className="text-xs text-[#6B5A48]">
            To preserve strict Vedic Sanskrit discipline, Pandit Ji consecrates a maximum of <strong>50 Gotra Sankalps per day</strong>.
          </p>
        </div>

        {/* Capacity Meter & Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto shrink-0">
          <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-3 min-w-[200px]">
            <div className="flex justify-between text-[11px] font-mono text-[#6B5A48] mb-1.5">
              <span>Today&apos;s Capacity:</span>
              <span className="font-bold text-[#C25E10]">{consecratedCount}/{totalCapacity} Slots</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#FBF6EC] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[10px] text-[#C25E10] font-bold mt-1 text-right">
              ⚡ Only {remaining} Gotra slots remaining for tonight
            </p>
          </div>

          <Link
            href="/sacred-offerings"
            className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Reserve Tonight&apos;s Gotra Slot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
