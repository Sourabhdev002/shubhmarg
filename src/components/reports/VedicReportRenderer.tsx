"use client";

import React from "react";

interface Props {
  content: string;
}

export default function VedicReportRenderer({ content }: Props) {
  if (!content) return null;

  // Split into lines or paragraphs for structured parsing
  const rawSections = content.split(/\n(?=###|\n---|#)/g);

  const cleanInlineFormatting = (text: string) => {
    // Replace **bold** with <strong>
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-[#f5ebd7] print:text-black">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={index} className="italic text-gray-300 print:text-gray-800">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  const renderParagraph = (p: string, pIdx: number) => {
    const trimmed = p.trim();
    if (!trimmed || trimmed === "---") return null;

    // Blockquote / Sanskrit Shloka
    if (trimmed.startsWith(">")) {
      const shlokaText = trimmed.replace(/^>\s*/gm, "").replace(/\*\*/g, "");
      return (
        <div
          key={pIdx}
          className="my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#24130b] via-[#2f180d] to-[#24130b] border-2 border-[#d4af37]/60 shadow-lg text-center relative print:border-black print:bg-gray-50 avoid-break"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold mb-1 print:text-black">
            ॥ पावन मन्त्र एवं श्लोक ॥
          </div>
          <p className="text-base sm:text-lg font-serif text-[#ffd700] print:text-black font-semibold leading-relaxed">
            {shlokaText}
          </p>
        </div>
      );
    }

    // Numbered Item (e.g. "1. **श्री गणेश पूजन**")
    const numberedMatch = trimmed.match(/^(\d+)\.\s*\*\*(.*?)\*\*([\s\S]*)/);
    if (numberedMatch) {
      const [, num, title, rest] = numberedMatch;
      return (
        <div
          key={pIdx}
          className="my-3 p-4 rounded-xl bg-black/40 border border-[#d4af37]/30 print:bg-transparent print:border-gray-300 avoid-break flex items-start gap-3.5"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b38918] text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 print:border print:border-black">
            {num}
          </div>
          <div className="flex-1 text-sm leading-relaxed text-[#ede6d8] print:text-black">
            <h4 className="font-bold text-white print:text-black text-sm mb-1">{title}</h4>
            <div>{cleanInlineFormatting(rest.replace(/\n\s*\*\s*/g, " • "))}</div>
          </div>
        </div>
      );
    }

    // Bullet point (e.g. "* **तिथि:** ...")
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const bullets = trimmed.split(/\n(?=[*-]\s)/);
      return (
        <ul key={pIdx} className="my-3 space-y-2.5">
          {bullets.map((b, bIdx) => {
            const cleanB = b.replace(/^[*-]\s*/, "");
            return (
              <li key={bIdx} className="flex items-start gap-2.5 text-sm text-[#ede6d8] print:text-black leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] print:bg-black shrink-0 mt-2" />
                <div>{cleanInlineFormatting(cleanB)}</div>
              </li>
            );
          })}
        </ul>
      );
    }

    // Normal Text Paragraph
    return (
      <p key={pIdx} className="my-2.5 text-sm sm:text-[15px] leading-relaxed text-[#ece5d8] print:text-black font-serif">
        {cleanInlineFormatting(trimmed)}
      </p>
    );
  };

  return (
    <div className="space-y-6">
      {rawSections.map((section, sIdx) => {
        const lines = section.trim().split("\n");
        const firstLine = lines[0]?.trim() || "";

        let headingText = "";
        let isHeading = false;

        if (firstLine.startsWith("###") || firstLine.startsWith("##") || firstLine.startsWith("#")) {
          isHeading = true;
          headingText = firstLine.replace(/^#+\s*/, "").replace(/\*\*/g, "");
        }

        const bodyLines = isHeading ? lines.slice(1).join("\n") : section;
        const paragraphs = bodyLines.split(/\n\s*\n/);

        return (
          <div key={sIdx} className="avoid-break">
            {isHeading && headingText && (
              <div className="mt-6 mb-3 pb-2 border-b border-[#d4af37]/40 print:border-black flex items-center gap-2.5">
                <div className="w-2 h-2 rotate-45 bg-[#d4af37] print:bg-black shrink-0" />
                <h3 className="text-base sm:text-lg font-bold font-serif text-[#d4af37] print:text-black tracking-wide">
                  {headingText}
                </h3>
              </div>
            )}

            <div className="space-y-2">
              {paragraphs.map((p, pIdx) => renderParagraph(p, pIdx))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
