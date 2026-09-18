"use client";

import React, { useState } from "react";
import { Calendar, Check, Download, ExternalLink } from "lucide-react";

interface CalendarEventProps {
  title: string;
  description?: string;
  location?: string;
  startDate?: Date; // e.g. tomorrow or specific Muhurta
  durationMinutes?: number;
  className?: string;
}

export default function CalendarSyncButton({
  title = "Auspicious Abhijit Muhurta — ShubhMarg",
  description = "Auspicious Vedic Muhurta window for wealth decisions, signing agreements, and new beginnings.",
  location = "Vedic Time Window",
  startDate,
  durationMinutes = 48,
  className = "",
}: CalendarEventProps) {
  const [copied, setCopied] = useState(false);

  // Fallback date is computed safely
  const effectiveStartDate = startDate || new Date("2026-09-03T12:00:00Z");

  const startIso = effectiveStartDate.toISOString().replace(/-|:|\.\d+/g, "");
  const endDate = new Date(effectiveStartDate.getTime() + durationMinutes * 60 * 1000);
  const endIso = endDate.toISOString().replace(/-|:|\.\d+/g, "");

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
    description + "\n\nConsecrated on ShubhMarg: https://shubhmarg.com"
  )}&location=${encodeURIComponent(location)}`;

  // Download .ics file for Apple iCal & Outlook
  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ShubhMarg Vedic Sanctum//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}\\n\\nConsecrated on ShubhMarg: https://shubhmarg.com
LOCATION:${location}
DTSTART:${startIso}
DTEND:${endIso}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder: Auspicious Vedic Muhurta starts in 30 minutes
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `shubhmarg-muhurta-${Date.now()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* 1-Click Google Calendar */}
      <a
        href={googleCalendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-xs font-bold text-gray-200 transition-all hover:border-[#d4af37] cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>Sync to Google Calendar</span>
        <ExternalLink className="w-3 h-3 text-gray-400" />
      </a>

      {/* 1-Click Apple / Outlook iCal Download */}
      <button
        type="button"
        onClick={handleDownloadIcs}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-gray-300 transition-all hover:text-white cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Added to Calendar</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>Apple iCal / Outlook (.ics)</span>
          </>
        )}
      </button>
    </div>
  );
}
