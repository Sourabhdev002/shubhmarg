import { CalendarEventWithOccurrence, DailyPanchang } from "@/types/calendar";
import Link from "next/link";
import Image from "next/image";
import GlassAstralPanchang from "./GlassAstralPanchang";

interface Props {
  event: CalendarEventWithOccurrence | null;
  panchang?: DailyPanchang | null;
}

function getEventImagePath(eventName: string): string {
  const name = eventName.toLowerCase();
  if (name.includes("pradosh"))                                                   return "/images/festivals/shiva_lingam.jpg";
  if (name.includes("krishna") || name.includes("janmashtami"))                  return "/images/festivals/krishna_flute.jpg";
  if (name.includes("radha"))                                                     return "/images/festivals/radha_krishna.jpg";
  if (name.includes("ganesh"))                                                    return "/images/festivals/ganesha_modak.jpg";
  if (name.includes("sankranti"))                                                 return "/images/festivals/sankranti_sun.jpg";
  if (name.includes("onam"))                                                      return "/images/festivals/onam_boat.jpg";
  if (name.includes("raksha bandhan"))                                            return "/images/festivals/rakhi_sweets.jpg";
  if (name.includes("karwa chauth"))                                              return "/images/festivals/karwa_chauth.jpg";
  if (name.includes("navratri") || name.includes("durga") ||
      name.includes("navami")   || name.includes("vijayadashami"))               return "/images/festivals/durga_lion.jpg";
  if (name.includes("purnima") || name.includes("amavasya"))                     return "/images/festivals/full_moon_lotus.jpg";
  if (name.includes("ekadashi"))                                                  return "/images/festivals/vishnu_lotus.jpg";
  if (name.includes("pitrupaksha"))                                               return "/images/festivals/diya_kalash.jpg";
  return "/images/festivals/diya_kalash.jpg";
}

export default function TodayEventCard({ event, panchang }: Props) {
  if (!event && !panchang) return null;

  const displayDateStr = event
    ? new Date(event.date).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : panchang
      ? new Date(panchang.date).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : "";

  const cleanPaksha = panchang?.paksha?.split("-")[0] || panchang?.paksha || "Krishna";
  const cleanNakshatra = panchang?.nakshatra || "Bharani";

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#d4af37]/40 shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_25px_rgba(212,175,55,0.2)] w-full max-w-2xl bg-[#0c0603]/95 backdrop-blur-xl">

      {event ? (
        // ── Festival card: full-bleed image with gradient overlay ──────────
        <div className="relative">
          {/* Fixed aspect container required for next/image fill to render */}
          <div className="relative w-full aspect-square sm:aspect-[4/3]">
            <Image
              src={event.image_url || getEventImagePath(event.name)}
              alt={event.name}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-contain bg-[#0f0806]"
              priority
            />
            {/* Decorative gold corners on image */}
            <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#d4af37]/70 rounded-tl pointer-events-none z-10" />
            <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#d4af37]/70 rounded-tr pointer-events-none z-10" />
          </div>

          {/* Content below image */}
          <div className="bg-[#0c0603]/95 px-7 sm:px-10 pt-6 pb-8 text-center">
            {/* Date Header */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#d4af37]/40" />
              <p
                style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
                className="text-[10.5px] uppercase text-[#d4af37] tracking-[0.25em] font-bold"
              >
                {displayDateStr}
              </p>
              <div className="h-px w-8 bg-[#d4af37]/40" />
            </div>

            {/* Title */}
            <h2
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-b from-[#FFFDF0] via-[#F3E5AB] via-[#D4AF37] to-[#99701A] bg-clip-text text-transparent leading-tight mb-2 drop-shadow-sm"
            >
              {event.name.replace(/^[\d\s-]+\s*/, "")}
            </h2>

            {/* Panchang sub-line */}
            {(panchang?.paksha || panchang?.nakshatra) && (
              <p
                style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
                className="text-[#fde68a]/80 text-sm sm:text-base mb-6 italic"
              >
                {panchang?.paksha}{panchang?.paksha && panchang?.nakshatra ? " • " : ""}{panchang?.nakshatra}
              </p>
            )}

            {/* Description snippet */}
            {event.description && (
              <p
                style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
                className="text-white/70 text-sm leading-relaxed max-w-md mx-auto mb-6 line-clamp-2 italic"
              >
                {event.description}
              </p>
            )}

            {/* CTA */}
            <Link
              href={`/festivals/${event.slug}`}
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#0a0604] font-bold text-[13px] tracking-widest uppercase px-6 py-4 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_6px_25px_rgba(212,175,55,0.4)] min-h-[52px]"
            >
              <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              Read Significance &amp; Puja Vidhi
            </Link>

            {/* Bottom corners */}
            <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#d4af37]/30 rounded-bl pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#d4af37]/30 rounded-br pointer-events-none" />
          </div>
        </div>

      ) : (
        // ── Panchang-only Masterpiece View ────────────────────────────────
        <div className="p-6 sm:p-9 text-center relative z-10">
          {/* Subtle Royal Yantra Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] opacity-[0.035] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D4AF37]">
              <circle cx="50" cy="50" r="45" stroke="#D4AF37" strokeWidth="1" fill="none"/>
              <polygon points="50,5 61,38 95,50 61,62 50,95 39,62 5,50 39,38" fill="none" stroke="#D4AF37" strokeWidth="1"/>
            </svg>
          </div>

          {/* Decorative Corner Filigree */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]/40 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/40 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/40 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]/40 rounded-br-sm pointer-events-none" />

          {/* Date Pill with Filigree Lines */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <p
              style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
              className="text-[10px] sm:text-[11px] uppercase text-[#d4af37] tracking-[0.25em] font-bold drop-shadow-sm"
            >
              {displayDateStr}
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          {/* Main Title in 24K Metallic Gold Leaf */}
          <h2
            style={{ fontFamily: "var(--font-cinzel, 'Cinzel', serif)" }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-b from-[#FFFDF0] via-[#F3E5AB] via-[#D4AF37] to-[#99701A] bg-clip-text text-transparent leading-tight mb-1 drop-shadow-[0_2px_15px_rgba(212,175,55,0.35)] tracking-wide"
          >
            Today&apos;s Panchang
          </h2>

          {/* Subtitle in Cormorant Garamond Italic */}
          <p
            style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
            className="text-[#fde68a]/90 text-sm sm:text-base mb-6 italic tracking-wide font-medium"
          >
            {cleanPaksha}-Paksha • {cleanNakshatra}
          </p>

          {/* 🏛️ Glass Astral Panchang Masterpiece */}
          <GlassAstralPanchang panchang={panchang} event={event} />
        </div>
      )}
    </div>
  );
}
