"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

const MotionLink = motion.create(Link);

type BaseProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps & Omit<HTMLMotionProps<"button">, keyof BaseProps> & { href?: never };
type ButtonAsLink = BaseProps & Omit<HTMLMotionProps<"a">, keyof BaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ 
  variant = "primary", 
  size = "md", 
  icon, 
  iconPosition = "right", 
  className, 
  children, 
  href,
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-semibold tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-brand-saffron text-white shadow-sm border border-brand-saffron hover:bg-[#CC7700] focus-visible:outline-brand-saffron",
    secondary: "bg-[#F4EFE6] text-brand-charcoal shadow-sm border border-[#F4EFE6] hover:bg-[#F4EFE6]/80 focus-visible:outline-brand-charcoal",
    outline: "border border-brand-charcoal/20 bg-transparent text-brand-charcoal hover:bg-brand-charcoal/5 focus-visible:outline-brand-charcoal",
    ghost: "bg-transparent text-brand-charcoal hover:text-brand-saffron hover:bg-[#F4EFE6]"
  };
  
  const sizes = {
    sm: "px-4 py-2 min-h-[44px] text-xs uppercase tracking-widest rounded-sm",
    md: "px-6 py-3 min-h-[44px] text-sm uppercase tracking-widest rounded-md",
    lg: "px-8 py-4 min-h-[44px] text-base uppercase tracking-widest rounded-md"
  };

  const commonProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    className: cn(baseStyles, variants[variant], sizes[size], className),
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <motion.span 
          className="mr-2"
          whileHover={variant === "ghost" ? { x: -4 } : {}}
        >
          {icon}
        </motion.span>
      )}
      
      {children}
      
      {icon && iconPosition === "right" && (
        <motion.span 
          className="ml-2"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  if (href) {
    return (
      <MotionLink href={href} {...commonProps} {...(props as Omit<HTMLMotionProps<"a">, keyof BaseProps>)}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button {...commonProps} {...(props as Omit<HTMLMotionProps<"button">, keyof BaseProps>)}>
      {content}
    </motion.button>
  );
}
