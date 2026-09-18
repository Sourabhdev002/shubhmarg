"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ease, duration, stagger, viewportOnce } from "./motion-presets";

/**
 * Reveal — lightweight fade + rise scroll reveal (transform/opacity only).
 * Cheaper than Reveal3D; use for most sections. Fires once on enter.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.standard, delay, ease: ease.brand },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealStagger — parent wrapper that cascades its RevealItem children in.
 * Wrap a grid/list; each direct child should be a RevealItem.
 */
export function RevealStagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger.children,
        delayChildren: stagger.delayChildren,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/** RevealItem — a single staggered child (fade + rise). */
export function RevealItem({
  children,
  className = "",
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.standard, ease: ease.brand },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
