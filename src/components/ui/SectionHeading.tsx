"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  subheading?: string; // Appears above title (like "शुभ मार्ग" or category)
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ 
  title, 
  subtitle, 
  subheading,
  className,
  align = "center"
}: SectionHeadingProps) {
  
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {subheading && (
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold-dark mb-4 opacity-90">
          {subheading}
        </p>
      )}
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-brand-maroon font-serif leading-tight">
        {title}
      </h2>
      
      {subtitle && (
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-brand-charcoal/80 font-serif italic">
          {subtitle}
        </p>
      )}
    </div>
  );
}
