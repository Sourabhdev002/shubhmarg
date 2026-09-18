"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface Reveal3DProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** Direction the panel rotates in from */
  origin?: "bottom" | "left" | "right";
}

/**
 * Reveal3D — a premium scroll-triggered 3D "unfold" wrapper.
 * On entering the viewport, children rotate up into place on a perspective plane
 * with a soft lift + fade. Works on touch and desktop (viewport-driven, no hover).
 */
export default function Reveal3D({
  children,
  className = "",
  delay = 0,
  origin = "bottom",
}: Reveal3DProps) {
  const hidden =
    origin === "left"
      ? { opacity: 0, rotateY: -18, x: -40, y: 10 }
      : origin === "right"
      ? { opacity: 0, rotateY: 18, x: 40, y: 10 }
      : { opacity: 0, rotateX: 22, y: 48 };

  const variants: Variants = {
    hidden,
    visible: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}