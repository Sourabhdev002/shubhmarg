"use client";

import { useT } from "@/context/LanguageContext";

export default function PanchangHeader() {
  const t = useT();
  return (
    <div className="text-center mb-7">
      <span className="eyebrow-pill mb-3 inline-flex">{t("panchang.eyebrow")}</span>
      <h2 className="text-section-title font-bold font-serif text-[#2A1810] mt-3">
        {t("panchang.title")}
      </h2>
      <div className="gold-divider">
        <span className="text-[#d4af37] text-xs">✦</span>
      </div>
    </div>
  );
}
