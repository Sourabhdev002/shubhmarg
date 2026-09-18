import { Globe } from "lucide-react";

/**
 * GlobalDeskBadge — a premium trust chip that frames the international (+66)
 * WhatsApp desk as a global Vedic concierge serving India & Thailand. Turns a
 * foreign number into a rich, worldwide-reach signal. No emoji flags (they fall
 * back to "IN"/"TH" on some systems) — uses styled country tags instead.
 *
 * variant "light" → for light/marble backgrounds (default)
 * variant "dark"  → for dark bands (footer)
 */
export default function GlobalDeskBadge({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
        isDark
          ? "border-[#D4AF37]/40 bg-gradient-to-r from-[#1c130a] via-[#241809] to-[#1c130a] shadow-[inset_0_1px_1px_rgba(245,200,66,0.15)]"
          : "border-[#B8860B]/35 bg-gradient-to-r from-[#FFF8EA] via-[#FCEFD3] to-[#FFF8EA] shadow-[0_2px_10px_-3px_rgba(184,134,11,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)]"
      } ${className}`}
    >
      <Globe className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-[#F5C842]" : "text-[#C25E10]"}`} />
      <span className={`text-[10.5px] font-semibold tracking-wide ${isDark ? "text-amber-100/85" : "text-[#6B5A48]"}`}>
        Global Vedic Desk
      </span>
      {/* Country tags — small pills, render reliably everywhere */}
      <span className="flex items-center gap-1">
        <CountryTag code="IND" isDark={isDark} />
        <CountryTag code="THA" isDark={isDark} />
      </span>
    </div>
  );
}

function CountryTag({ code, isDark }: { code: string; isDark: boolean }) {
  return (
    <span
      className={`rounded-full px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider ${
        isDark
          ? "bg-[#F5C842]/15 text-[#F5C842] border border-[#F5C842]/30"
          : "bg-[#E8791E]/12 text-[#C25E10] border border-[#E8791E]/30"
      }`}
    >
      {code}
    </span>
  );
}
