"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export type IconVariant = "saffron" | "green" | "blue" | "indigo" | "rose" | "neutral" | "gold";
export type IconSize = "sm" | "md" | "lg" | "xl";

interface IconContainerProps {
  icon: React.ComponentType<{ className?: string }>;
  variant?: IconVariant;
  size?: IconSize;
  className?: string;
  iconClassName?: string;
}

export function IconContainer({ 
  icon: Icon, 
  variant = "saffron", 
  size = "md", 
  className,
  iconClassName 
}: IconContainerProps) {
  
  const bgColors = {
    saffron: "bg-[#D86E3C]/10 text-[#D86E3C] border-[#D86E3C]/20",
    green: "bg-[#4A6B52]/10 text-[#4A6B52] border-[#4A6B52]/20",
    blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    indigo: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    rose: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    neutral: "bg-[#2A2A2A]/5 text-[#2A2A2A] border-[#2A2A2A]/10",
    gold: "bg-[#B89947]/10 text-[#B89947] border-[#B89947]/30",
  };

  const sizes = {
    sm: "w-8 h-8 rounded-md",
    md: "w-12 h-12 rounded-lg",
    lg: "w-16 h-16 rounded-xl",
    xl: "w-20 h-20 rounded-2xl",
  };
  
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  return (
    <div className={cn("relative flex items-center justify-center shrink-0 group", sizes[size], className)}>
      {/* Rotating dashed aura */}
      <motion.div 
        className={cn("absolute inset-[-4px] rounded-inherit border border-dashed opacity-0 group-hover:opacity-100 transition-opacity duration-500", bgColors[variant].split(" ")[2])}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />
      {/* Inner glass icon container */}
      <div className={cn("relative w-full h-full flex items-center justify-center shadow-inner border backdrop-blur-md rounded-inherit transition-colors duration-300", bgColors[variant].split(" ").slice(0,2).join(" "), bgColors[variant].split(" ")[2])}>
        <Icon className={cn(iconSizes[size], "transition-transform duration-300 group-hover:scale-110", iconClassName)} />
      </div>
    </div>
  );
}
