"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { RashiInfo } from "@/lib/zodiac-data";

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const f = () => setM(window.innerWidth < 768);
    f(); window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return m;
}

interface Rashi3DCanvasProps {
  rashi: RashiInfo;
}

// 1. Constellation Star Spheres with Radiant Corona Halos
function ConstellationNodes({ rashi }: { rashi: RashiInfo }) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { linePositions } = useMemo(() => {
    const pts = rashi.constellation;
    const lines = rashi.constellationLines;
    const linePos = new Float32Array(lines.length * 2 * 3);
    let lineIdx = 0;
    lines.forEach(([startIdx, endIdx]) => {
      const p1 = pts[startIdx];
      const p2 = pts[endIdx];
      if (p1 && p2) {
        linePos[lineIdx++] = p1[0];
        linePos[lineIdx++] = p1[1];
        linePos[lineIdx++] = p1[2];
        linePos[lineIdx++] = p2[0];
        linePos[lineIdx++] = p2[1];
        linePos[lineIdx++] = p2[2];
      }
    });
    return { linePositions: linePos };
  }, [rashi]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Laser-thin glowing golden constellation lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#E0C36A" transparent opacity={0.75} linewidth={2} />
      </lineSegments>

      {/* 3D Glowing Star Nodes */}
      {rashi.constellation.map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]}>
          {/* Core White-Gold Star */}
          <mesh>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color="#FFFDF7"
              emissive="#F0E8D8"
              emissiveIntensity={3.5}
              roughness={0.1}
            />
          </mesh>

          {/* Glowing Outer Corona Halo */}
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial
              color="#E0C36A"
              transparent
              opacity={0.35}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Star Spike / Cross Flare */}
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.12, 0]} />
            <meshBasicMaterial color="#FFF9E6" transparent opacity={0.5} wireframe />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 2. Multi-Ring Sacred 3D Astrolabe Armillary Sphere
function SacredArmillarySphere({ elementColor }: { elementColor: string }) {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const planetRef = useRef<THREE.Group>(null);
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    angleRef.current += delta * 0.5;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.12;
      outerRingRef.current.rotation.x = Math.sin(angleRef.current * 0.3) * 0.15;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y += delta * 0.15;
      midRingRef.current.rotation.z += delta * 0.08;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.1;
    }

    if (planetRef.current) {
      const r = 2.1;
      planetRef.current.position.x = Math.cos(angleRef.current * 0.7) * r;
      planetRef.current.position.z = Math.sin(angleRef.current * 0.7) * r;
      planetRef.current.position.y = Math.sin(angleRef.current * 0.5) * 0.4;
    }
  });

  return (
    <group>
      {/* Outer Ecliptic Gold Ring with beveled depth */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.1, 0.024, 16, 100]} />
        <meshStandardMaterial
          color="#C9A24A"
          emissive="#E0C36A"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.92}
        />
      </mesh>

      {/* Middle Celestial Meridian Ring */}
      <mesh ref={midRingRef} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[1.9, 0.016, 16, 80]} />
        <meshStandardMaterial
          color="#8A6520"
          emissive="#C9A24A"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.85}
        />
      </mesh>

      {/* Inner Nakshatra Dotted Orbit */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.65, 0.01, 16, 64]} />
        <meshStandardMaterial
          color="#E0C36A"
          emissive="#F0E8D8"
          emissiveIntensity={0.5}
          roughness={0.25}
          metalness={0.95}
        />
      </mesh>

      {/* Orbiting Celestial Graha Sphere */}
      <group ref={planetRef}>
        <mesh>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial
            color={elementColor}
            emissive={elementColor}
            emissiveIntensity={2.5}
            roughness={0.15}
            metalness={0.8}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial
            color={elementColor}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
}

// 3. Ambient Stardust Field
function AmbientStardust({ count = 220 }: { count?: number }) {
  const dustRef = useRef<THREE.Points>(null);

  const dustPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const s1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const r1 = s1 - Math.floor(s1);
      const s2 = Math.sin((i + count) * 12.9898 + 78.233) * 43758.5453;
      const r2 = s2 - Math.floor(s2);
      const s3 = Math.sin((i + count * 2) * 12.9898 + 78.233) * 43758.5453;
      const r3 = s3 - Math.floor(s3);
      pos[i * 3] = (r1 - 0.5) * 8;
      pos[i * 3 + 1] = (r2 - 0.5) * 8;
      pos[i * 3 + 2] = (r3 - 0.5) * 6;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.03;
      dustRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#F0E8D8"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

export function Rashi3DCanvas({ rashi }: Rashi3DCanvasProps) {
  const isMobile = useIsMobile();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full h-60 sm:h-72 relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#050302] via-[#0E0A07] to-[#050302] border border-[#C9A24A]/35 shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(201,162,74,0.06)] group">
      {/* Background Element Nebula Aura */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${rashi.elementColor}44 0%, rgba(8,6,4,0) 70%)`,
        }}
      />

      {/* Subtle Vedic Astrological Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(#E0C36A_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* WebGL 3D Canvas */}
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        gl={{ antialias: !isMobile, alpha: true }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 3, 4]} intensity={2.8} color="#FFF5D6" />
        <pointLight position={[-3, -2, -2]} intensity={1.5} color={rashi.elementColor} />
        <directionalLight position={[4, 5, 2]} intensity={1.2} color="#E0C36A" />

        {/* Deep Space Star Cluster (fewer on mobile) */}
        <Stars radius={40} depth={30} count={isMobile ? 500 : 1200} factor={3} saturation={0} fade speed={0.8} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <ConstellationNodes rashi={rashi} />
          <SacredArmillarySphere elementColor={rashi.elementColor} />
          <AmbientStardust />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.65}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 2.35}
        />
      </Canvas>

      {/* Top Left: Sanskrit Rashi & Western Constellation Glass Tag */}
      <div className="absolute top-3.5 left-3.5 px-3.5 py-1.5 rounded-xl bg-[#080604]/80 border border-[#C9A24A]/40 backdrop-blur-md flex items-center gap-2.5 shadow-lg pointer-events-none">
        <span className="text-xs text-[#E0C36A]">✦</span>
        <span className="text-sm font-serif font-bold text-[#F0E8D8] tracking-wide">
          {rashi.sanskrit}
        </span>
        <span className="text-xs text-[#9D968C] font-sans">
          &bull; {rashi.en}
        </span>
      </div>

      {/* Top Right: Vedic Tattva (Element) Tag with Pulsing Light */}
      <div className="absolute top-3.5 right-3.5 px-3.5 py-1.5 rounded-full bg-[#080604]/85 border border-[#C9A24A]/40 backdrop-blur-md flex items-center gap-2 shadow-lg pointer-events-none">
        <span
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: rashi.elementColor, color: rashi.elementColor }}
        />
        <span className="text-[10px] font-bold text-[#F0E8D8] tracking-[0.2em] uppercase font-mono">
          {rashi.element}
        </span>
      </div>

      {/* Bottom Center: Interactive 3D Orbit Helper Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#080604]/70 border border-white/10 backdrop-blur-sm pointer-events-none flex items-center gap-1.5 text-[10px] text-[#9D968C] font-sans tracking-wide">
        <span className="text-[#E0C36A]">✧</span>
        <span>Drag to rotate 3D Celestial Armillary Sphere</span>
      </div>

      {/* Bottom Left: Ruling Graha Tag */}
      <div className="absolute bottom-3 left-3.5 hidden sm:flex items-center gap-1.5 text-[10px] text-[#E0C36A] font-serif bg-[#080604]/75 px-2.5 py-1 rounded-lg border border-[#C9A24A]/25 backdrop-blur-sm pointer-events-none">
        <span>Graha:</span>
        <span className="text-white font-medium">{rashi.rulingPlanet} {rashi.rulingPlanetSymbol}</span>
      </div>
    </div>
  );
}

export default Rashi3DCanvas;
