"use client";

import React, { useRef, useState } from "react";

// Premium 3D tilt card: tilts toward pointer, shows a moving gold light-sweep,
// and lifts on hover. GPU-accelerated CSS transforms — smooth on mobile.
// On touch devices the tilt is disabled (touch just triggers the link); the
// hover lift + glass depth still apply.
interface Props {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees
}

export default function TiltCard({ children, className = "", maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState<React.CSSProperties>({ opacity: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1
    const rotateY = (px - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - py) * (maxTilt * 2);
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`,
      transition: "transform 0.08s ease-out",
    });
    setGlare({
      opacity: 1,
      background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(245,217,122,0.35), transparent 55%)`,
    });
  };

  const onLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)",
      transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
    });
    setGlare({ opacity: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, transformStyle: "preserve-3d", willChange: "transform" }}
      className={`relative ${className}`}
    >
      {children}
      {/* moving gold glare */}
      <div
        aria-hidden
        style={{ ...glare, transition: "opacity 0.3s ease" }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
      />
    </div>
  );
}