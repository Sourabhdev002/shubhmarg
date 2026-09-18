"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  // Smooth springs for the cursor follow effect
  const cursorX = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });
  const ringX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (window.matchMedia("(pointer: fine)").matches) {
      timeoutId = setTimeout(() => setIsDesktop(true), 0);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.closest("button") ||
        target.closest("a");

      if (isClickable) {
        setIsHovering(true);
        // Custom text for links if they are image wrappers
        if (target.tagName === "IMG" && target.closest("a")) {
          setHoverText("VIEW");
        } else {
          setHoverText("");
        }
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Central dot (Blend Mode Exclusion) */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-exclusion flex items-center justify-center overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? (hoverText ? 4 : 2.5) : 1,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.2 }}
      >
        {hoverText && (
          <span className="text-[4px] font-bold tracking-widest text-black">
            {hoverText}
          </span>
        )}
      </motion.div>
      {/* Trailing ring (Removed to focus on the minimalist blend-mode dot) */}
    </>
  );
}
