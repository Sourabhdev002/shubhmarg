"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { CosmicGalaxy } from "./CosmicGalaxy";
import { GlassMandala } from "./GlassMandala";

export function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  // Pause the render loop when the canvas scrolls off-screen (saves GPU/battery on iOS)
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

        {/* Soft Ambient Light */}
        <ambientLight intensity={0.9} />

        {/* Warm key light + warm gold fill so the crystal Om refracts warm, never muddy */}
        <directionalLight position={[5, 5, 5]} intensity={3} color="#FFF3DA" />
        <directionalLight position={[-5, -5, -5]} intensity={0.9} color="#F5C879" />

        <Suspense fallback={null}>
          {/* Bright warm environment (dawn) so the crystal Om refracts light/warm tones —
              a dark "city" env made the transmission glass read black/oily. */}
          <Environment preset="dawn" environmentIntensity={1.1} />

          {/* Background Particles (Count drastically reduced for mobile performance) */}
          <CosmicGalaxy count={isMobile ? 500 : 1200} />

          {/* Foreground 3D Glass Object */}
          <group position={isMobile ? [0, 0, -1] : [2.5, 0, 0]} scale={isMobile ? 0.8 : 1.2}>
            <GlassMandala isMobile={isMobile} />
          </group>

          {/* Optional ground shadow to ground the element visually */}
          <ContactShadows
            position={isMobile ? [0, -6, 0] : [2.5, -3.5, 0]}
            opacity={0.3}
            scale={isMobile ? 6 : 10}
            blur={2}
            far={4}
            color="#8C5A12"
            frames={1}
            resolution={isMobile ? 256 : 512}
            depthWrite={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
