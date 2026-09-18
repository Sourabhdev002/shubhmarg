"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate random positions + per-star colors outside the component
function generateGalaxyData(count: number): { positions: Float32Array; colors: Float32Array; sizes: Float32Array } {
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);  // RGB per star
  const sizes     = new Float32Array(count);

  // Star colour palette: warm amber, cool white, rare crimson
  const palette = [
    new THREE.Color("#E2A63B"),  // warm amber  (dominant)
    new THREE.Color("#F5E6C8"),  // warm white
    new THREE.Color("#FFF4E0"),  // pale ivory
    new THREE.Color("#8B1A1A"),  // deep crimson (rare)
    new THREE.Color("#FFD580"),  // bright gold
    new THREE.Color("#C9A24A"),  // shubh-gold
  ];
  const weights = [0.40, 0.25, 0.15, 0.05, 0.10, 0.05]; // must sum to 1
  // Build cumulative weights for weighted random selection
  const cumul = weights.reduce<number[]>((acc, w, i) => {
    acc.push((acc[i - 1] ?? 0) + w);
    return acc;
  }, []);

  function pickColor(): THREE.Color {
    const r = Math.random();
    const idx = cumul.findIndex((c) => r < c);
    return palette[idx >= 0 ? idx : palette.length - 1];
  }

  for (let i = 0; i < count; i++) {
    const radius = 10 * Math.cbrt(Math.random());
    const theta  = Math.random() * 2 * Math.PI;
    const phi    = Math.acos(2 * Math.random() - 1);

    positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const c = pickColor();
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    // Slight size variation: most small, a few slightly larger
    sizes[i] = Math.random() < 0.05 ? 0.09 : 0.03 + Math.random() * 0.03;
  }

  return { positions, colors, sizes };
}

export function CosmicGalaxy({ count = 2000 }) {
  const points = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => generateGalaxyData(count), [count]);

  useFrame((state, delta) => {
    if (points.current) {
      // Slow rotation of the entire galaxy
      points.current.rotation.y += delta * 0.04;
      points.current.rotation.x += delta * 0.015;

      // Subtle reaction to mouse position
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;

      // Interpolate towards mouse position for smooth trailing effect
      points.current.rotation.y += (mouseX - points.current.rotation.y) * 0.008;
      points.current.rotation.x += (-mouseY - points.current.rotation.x) * 0.008;
    }
  });

  return (
    <points ref={points} renderOrder={0}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors            // use per-star colours
        transparent
        opacity={0.80}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
