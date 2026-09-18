"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue, HTMLMotionProps, useMotionTemplate } from "framer-motion";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = true, ...props }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for a fluid, luxurious feel
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Transform mouse position into rotation angles (e.g., max 10 degrees)
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Dynamic glare effect using motion template
  const glareOpacity = useTransform(springY, [-0.5, 0.5], [0.05, 0.2]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${useTransform(springX, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(springY, [-0.5, 0.5], ["0%", "100%"])}, rgba(255,255,255,${glareOpacity}), transparent 80%)`;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hoverEffect) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        ...(hoverEffect ? { rotateX, rotateY } : {}),
      }}
      className={cn(
        "rounded-premium shadow-premium relative overflow-hidden group p-[var(--spacing-card-padding)]",
        "glass-premium",
        hoverEffect && "transition-shadow duration-500",
        isHovered && hoverEffect && "shadow-premium-hover z-10",
        className
      )}
      {...props}
    >
      {/* Glare overlay */}
      {hoverEffect && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{ background: glareBackground }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      )}
      
      <div className="relative z-10" style={{ transform: hoverEffect ? "translateZ(30px)" : "none" }}>
        {children}
      </div>
    </motion.div>
  );
}
