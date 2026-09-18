"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { createProceduralLunarTextures } from "./lunarTexture";

// ─────────────────────────────────────────────────────────────────────────────
// MuseumAstrolabeCanvas
// Hyper-Realistic Royal Vedic Armillary Astrolabe & Sundial Observatory
// Inspired by historic Jaipur Jantar Mantar + Haute Horlogerie (Urwerk/Patek)
// ─────────────────────────────────────────────────────────────────────────────

interface MuseumAstrolabeProps {
  dayProgress: number;   // 0 (Udaya/Sunrise) .. 0.5 (Madhyahna) .. 1.0 (Asta/Sunset)
  solarAngle: number;    // e.g. 78°
  tithiName?: string;
  nakshatraName?: string;
  pakshaName?: string;
}

// ── 1. Heavy PBR Brass Armillary Rings ──
function ArmillaryBrassRings() {
  return (
    <group>
      {/* 1. Prime Celestial Meridian (Vertical North-South Brass Hoop) */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[5.6, 0.045, 16, 100]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.88}
          roughness={0.28}
        />
      </mesh>

      {/* 2. Celestial Equator Ring (Horizontal Brass Hoop) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.6, 0.045, 16, 100]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.88}
          roughness={0.28}
        />
      </mesh>

      {/* 3. Tilted 23.5° Rashi Zodiac Ecliptic Band (The Ecliptic Circle) */}
      <group rotation={[0.41, 0, 0.2]}>
        {/* Solid Brass Zodiac Track Band */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5.45, 5.75, 72]} />
          <meshStandardMaterial
            color="#C9A646"
            metalness={0.9}
            roughness={0.24}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.75, 0.035, 16, 100]} />
          <meshStandardMaterial color="#E2C875" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.45, 0.035, 16, 100]} />
          <meshStandardMaterial color="#E2C875" metalness={0.92} roughness={0.2} />
        </mesh>

        {/* 12 Rashi Division Nodes in Radiant Gold */}
        {Array.from({ length: 12 }).map((_, i) => {
          const theta = (i * Math.PI) / 6;
          const x = 5.6 * Math.cos(theta);
          const y = 5.6 * Math.sin(theta);
          return (
            <mesh key={`rashi-node-${i}`} position={[x, 0, y]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshBasicMaterial color="#FFEAA7" />
            </mesh>
          );
        })}
      </group>

      {/* 4. Golden Altitude Coordinate Ribs */}
      {[25, 50, 75].map((deg, idx) => {
        const rad = (deg * Math.PI) / 180;
        const y = 5.6 * Math.sin(rad);
        const r = 5.6 * Math.cos(rad);
        return (
          <mesh key={`alt-ring-${idx}`} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.025, 12, 64]} />
            <meshStandardMaterial color="#C9A646" metalness={0.8} roughness={0.35} transparent opacity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── 2. Real-Time Solar Transit Arc & Radiant Plasma Sun (Surya) ──
function RadiantSuryaSun({
  dayProgress,
  solarAngle,
}: {
  dayProgress: number;
  solarAngle: number;
}) {
  const coronaRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Calibrated East → Zenith → West Arc
  const sunPos = useMemo(() => {
    const angle = Math.max(0.02, Math.min(0.98, dayProgress)) * Math.PI;
    const x = -5.4 * Math.cos(angle);
    const y = Math.max(0.2, 4.4 * Math.sin(angle));
    const z = -1.1 * Math.sin(angle);
    return new THREE.Vector3(x, y, z);
  }, [dayProgress]);

  // Golden Solar Arc Tube
  const solarArcCurve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI;
      const x = -5.4 * Math.cos(angle);
      const y = Math.max(0.1, 4.4 * Math.sin(angle));
      const z = -1.1 * Math.sin(angle);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame((_, delta) => {
    if (coronaRef.current) {
      coronaRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group>
      {/* Heavy Gold Solar Orbit Track */}
      <mesh>
        <tubeGeometry args={[solarArcCurve, 64, 0.035, 8, false]} />
        <meshStandardMaterial color="#E2C875" metalness={0.9} roughness={0.25} emissive="#C9A646" emissiveIntensity={0.3} />
      </mesh>

      {/* 3D Sun Orb Group */}
      <group
        position={sunPos}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Core Radiant Solar Sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshBasicMaterial color="#FFF9E6" />
        </mesh>

        {/* Volumetric Solar Plasma Mantle */}
        <mesh>
          <sphereGeometry args={[0.48, 24, 24]} />
          <meshBasicMaterial color="#FFB300" transparent opacity={0.55} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Dynamic Filament Corona Ring */}
        <mesh ref={coronaRef} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.44, 0.88, 32]} />
          <meshBasicMaterial color="#FF7A00" transparent opacity={0.45} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </mesh>

        {/* Directional Sun Light Casting Real Shadows across the Sundial and Moon */}
        <directionalLight
          position={[0, 0, 0]}
          target-position={[0, 0, 0]}
          intensity={3.8}
          color="#FFF2CC"
          castShadow
          shadow-bias={-0.001}
        />
        <pointLight color="#FFAE19" intensity={2.5} distance={14} decay={2} />

        {/* Interactive Sun Tooltip */}
        {hovered && (
          <Html distanceFactor={14} center position={[0, 0.8, 0]}>
            <div className="pointer-events-none rounded-xl bg-[#15100D]/95 border border-[#E2C875]/70 px-3 py-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.9)] text-center whitespace-nowrap backdrop-blur-md">
              <p className="text-[10px] font-sans font-bold tracking-widest text-[#E8DDC7] uppercase">SURYA • प्रत्यक्ष देवता</p>
              <p className="text-xs font-serif font-bold text-[#E2C875]">{solarAngle}° Altitude • Solar Prana</p>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

// ── 3. Photorealistic 3D Moon (Chandra) with Procedural Maria & Craters ──
function PhotorealisticChandraMoon({
  dayProgress,
  tithiName,
  pakshaName,
}: {
  dayProgress: number;
  tithiName?: string;
  pakshaName?: string;
}) {
  const moonRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Generate procedural lunar textures safely on client
  const lunarTextures = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createProceduralLunarTextures();
  }, []);

  // Position along the lunar orbit
  const moonPos = useMemo(() => {
    const angle = (dayProgress * 0.7 + 0.45) * Math.PI;
    const x = 4.8 * Math.cos(angle);
    const y = Math.max(0.6, 3.6 * Math.sin(angle));
    const z = 2.2 * Math.sin(angle) - 1.4;
    return new THREE.Vector3(x, y, z);
  }, [dayProgress]);

  useFrame((_, delta) => {
    if (moonRef.current) {
      // Gentle axial rotation simulating lunar libration
      moonRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group
      ref={moonRef}
      position={moonPos}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 3D Photorealistic Moon with Bump Mapping & Physical Solar Terminator */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.34, 48, 48]} />
        <meshStandardMaterial
          map={lunarTextures?.colorMap ?? null}
          bumpMap={lunarTextures?.bumpMap ?? null}
          bumpScale={0.035}
          roughness={0.88}
          metalness={0.08}
          emissive="#1E2838"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Pearlescent Lunar Corona Glow */}
      <mesh>
        <sphereGeometry args={[0.39, 24, 24]} />
        <meshBasicMaterial color="#94BDE8" transparent opacity={0.16} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Brass Lunar Orbit Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.46, 0.015, 8, 32]} />
        <meshStandardMaterial color="#E2C875" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Interactive Tooltip */}
      {hovered && (
        <Html distanceFactor={14} center position={[0, 0.75, 0]}>
          <div className="pointer-events-none rounded-xl bg-[#0e131d]/95 border border-[#88B4E2]/70 px-3 py-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.9)] text-center whitespace-nowrap backdrop-blur-md">
            <p className="text-[10px] font-sans font-bold tracking-widest text-[#E8DDC7] uppercase">CHANDRA • सोम</p>
            <p className="text-xs font-serif font-bold text-[#94BDE8]">{tithiName || "Krishna Saptami"} • {pakshaName || "Krishna"}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// ── 4. Vedic Sundial Gnomon (Shanku) & Polished Obsidian Horizon Table ──
function VedicSundialAndHorizonBase() {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Deep Smoked Obsidian Ground Mirror Plate (Receives Real Shadows) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
        <circleGeometry args={[5.8, 64]} />
        <meshStandardMaterial
          color="#0B0807"
          metalness={0.55}
          roughness={0.15}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 2. Heavy Royal Brass Horizon Border Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.8, 0.055, 16, 100]} />
        <meshStandardMaterial color="#C9A646" metalness={0.92} roughness={0.22} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.6, 0.025, 16, 72]} />
        <meshStandardMaterial color="#8A6B22" metalness={0.88} roughness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.025, 16, 72]} />
        <meshStandardMaterial color="#8A6B22" metalness={0.88} roughness={0.3} />
      </mesh>

      {/* 3. Central Vedic Brass Gnomon (Shanku) — Casts dynamic real-time shadow */}
      <group position={[0, 0, 0]}>
        {/* Brass Pedestal Base */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 0.06, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.22} />
        </mesh>
        {/* Triangular Sundial Blade Pin (Shanku) */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <coneGeometry args={[0.08, 0.9, 16]} />
          <meshStandardMaterial color="#E2C875" metalness={0.94} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.92, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#FFEAA7" />
        </mesh>
      </group>

      {/* 4. Cardinal & Intercardinal Vedic Azimuth Markers */}
      <Html position={[-4.8, 0.1, 0]} center>
        <div className="text-[8px] sm:text-[11px] font-serif font-bold text-[#E2C875] bg-[#15100D]/95 border border-[#C9A646]/50 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap shadow-md">
          पूर्व (East • Udaya)
        </div>
      </Html>
      <Html position={[4.8, 0.1, 0]} center>
        <div className="text-[8px] sm:text-[11px] font-serif font-bold text-[#E2C875] bg-[#15100D]/95 border border-[#C9A646]/50 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap shadow-md">
          पश्चिम (West • Asta)
        </div>
      </Html>
      <Html position={[0, 0.1, -4.8]} center>
        <div className="text-[7.5px] sm:text-[9.5px] font-sans font-bold text-[#9D9386] bg-[#15100D]/90 border border-white/10 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
          उत्तर (North)
        </div>
      </Html>
      <Html position={[0, 0.1, 4.8]} center>
        <div className="text-[7.5px] sm:text-[9.5px] font-sans font-bold text-[#9D9386] bg-[#15100D]/90 border border-white/10 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
          दक्षिण (South)
        </div>
      </Html>

      {/* Intercardinal Corners: Ishan, Agneya, Nairutya, Vayavya (Desktop/Tablet only) */}
      <Html position={[3.6, 0.1, -3.6]} center className="hidden sm:block">
        <span className="text-[8px] font-mono text-[#C9A646]/70 uppercase">ईशान (NE)</span>
      </Html>
      <Html position={[3.6, 0.1, 3.6]} center className="hidden sm:block">
        <span className="text-[8px] font-mono text-[#C9A646]/70 uppercase">आग्नेय (SE)</span>
      </Html>
      <Html position={[-3.6, 0.1, 3.6]} center className="hidden sm:block">
        <span className="text-[8px] font-mono text-[#C9A646]/70 uppercase">नैऋत्य (SW)</span>
      </Html>
      <Html position={[-3.6, 0.1, -3.6]} center className="hidden sm:block">
        <span className="text-[8px] font-mono text-[#C9A646]/70 uppercase">वायव्य (NW)</span>
      </Html>
    </group>
  );
}

// ── 5. Stardust Atmosphere ──
function AstrolabeStardust() {
  const count = 160;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = ((i * 137.5) % 360) / 360;
      const v = (((i * 223.1) % 180) + 10) / 200;
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(Math.max(-0.99, Math.min(0.99, 2.0 * v - 1.0)));
      const r = 6.2 + ((i * 47) % 15) * 0.08;
      const sinPhi = Math.sin(phi);
      pos[i * 3]     = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = Math.max(0.2, r * Math.cos(phi));
      pos[i * 3 + 2] = r * sinPhi * Math.sin(theta);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#FFF2CC"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Adaptive Responsive Camera Controller ──
function ResponsiveCamera() {
  useFrame(({ camera, size }) => {
    const isMobile = size.width < 640;
    const isNarrow = size.width < 900;
    const targetZ = isMobile ? 14.8 : isNarrow ? 12.8 : 10.6;
    const targetY = isMobile ? 6.2 : isNarrow ? 5.6 : 5.2;
    const targetFov = isMobile ? 46 : isNarrow ? 43 : 40;

    camera.position.lerp(new THREE.Vector3(0, targetY, targetZ), 0.1);
    if ("fov" in camera) {
      const persCamera = camera as THREE.PerspectiveCamera;
      if (Math.abs(persCamera.fov - targetFov) > 0.1) {
        persCamera.fov = THREE.MathUtils.lerp(persCamera.fov, targetFov, 0.1);
        persCamera.updateProjectionMatrix();
      }
    }
  });
  return null;
}

// ── Main Museum Astrolabe Canvas Export ──
export default function MuseumAstrolabeCanvas({
  dayProgress = 0.5,
  solarAngle = 78,
  tithiName = "Krishna Saptami",
  pakshaName = "Krishna",
}: MuseumAstrolabeProps) {
  return (
    <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[460px] relative rounded-xl sm:rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 5.8, 13.5], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Adaptive Dynamic Camera framing for mobile & desktop */}
        <ResponsiveCamera />

        {/* Soft Ambient Fill */}
        <ambientLight intensity={0.45} />

        {/* Stardust Sky Background */}
        <AstrolabeStardust />

        {/* 1. Heavy PBR Brass Armillary Rings & Tilted Ecliptic Band */}
        <ArmillaryBrassRings />

        {/* 2. Radiant 3D Plasma Sun (Surya) & Solar Transit Arc */}
        <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.15}>
          <RadiantSuryaSun dayProgress={dayProgress} solarAngle={solarAngle} />
        </Float>

        {/* 3. Photorealistic 3D Moon (Chandra) with Bump Craters & Real Shadows */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
          <PhotorealisticChandraMoon dayProgress={dayProgress} tithiName={tithiName} pakshaName={pakshaName} />
        </Float>

        {/* 4. Vedic Sundial Gnomon (Shanku) & Polished Obsidian Mirror Base */}
        <VedicSundialAndHorizonBase />

        {/* 5. Smooth Damped Orbit Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2 - 0.03}
          minPolarAngle={Math.PI / 6}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Museum Indicator Overlay */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center pointer-events-none">
        <span className="text-[8.5px] sm:text-[9.5px] tracking-widest text-[#E2C875]/80 uppercase font-mono bg-[#15100D]/85 px-2.5 sm:px-3.5 py-0.5 rounded-full border border-[#C9A646]/30 backdrop-blur-md shadow-lg">
          Royal Vedic Armillary Astrolabe • 3D PBR Solar Tracker
        </span>
      </div>
    </div>
  );
}
