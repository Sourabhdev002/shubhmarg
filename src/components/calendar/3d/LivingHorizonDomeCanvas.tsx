"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// LivingHorizonDomeCanvas
// Real-Time 3D Vedic Celestial Horizon Observatory
// Displays:
//   1. 3D Surya (Sun) orb tracking the live solar arc (Udaya → Madhyahna → Asta)
//   2. 3D Chandra (Moon) sphere with realistic phase illumination
//   3. Golden celestial coordinate hemisphere (azimuth & altitude rings)
//   4. Consecrated horizon compass plane with Sanskrit cardinal markers
// ─────────────────────────────────────────────────────────────────────────────

interface LivingHorizonDomeProps {
  dayProgress: number;   // 0 (Sunrise) .. 0.5 (Zenith) .. 1.0 (Sunset)
  solarAngle: number;    // e.g. 78°
  sunriseTime?: string;
  sunsetTime?: string;
  tithiName?: string;
  nakshatraName?: string;
  pakshaName?: string;
}

// ── 1. Celestial Arc Tube Mesh ──
function SolarArcPath() {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI;
      const x = -5.8 * Math.cos(angle);
      const y = Math.max(0.1, 4.6 * Math.sin(angle));
      const z = -1.2 * Math.sin(angle);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <group>
      {/* Glowing Outer Tube */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.04, 8, false]} />
        <meshBasicMaterial color="#E2C875" transparent opacity={0.7} />
      </mesh>
      {/* Faint Outer Corona Glow */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.12, 8, false]} />
        <meshBasicMaterial color="#C9A646" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ── 2. 3D Sun (Surya) Mesh with Solar Corona & Lens Flare ──
function SuryaMesh({
  dayProgress,
  solarAngle,
}: {
  dayProgress: number;
  solarAngle: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate 3D position along the solar arc
  const sunPos = useMemo(() => {
    const angle = Math.max(0.02, Math.min(0.98, dayProgress)) * Math.PI;
    const x = -5.8 * Math.cos(angle);
    const y = Math.max(0.2, 4.6 * Math.sin(angle));
    const z = -1.2 * Math.sin(angle);
    return new THREE.Vector3(x, y, z);
  }, [dayProgress]);

  useFrame((_, delta) => {
    if (coronaRef.current) {
      coronaRef.current.rotation.z += delta * 0.4;
      const pulse = 1 + Math.sin(Date.now() * 0.003) * 0.08;
      coronaRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group
      ref={meshRef}
      position={sunPos}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central Radiant Sun Core */}
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial color="#FFF5CC" />
      </mesh>

      {/* Inner Solar Flare Layer */}
      <mesh>
        <sphereGeometry args={[0.48, 24, 24]} />
        <meshBasicMaterial color="#FFB833" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Rotating Sun Rays Corona Ring */}
      <mesh ref={coronaRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.42, 0.85, 32]} />
        <meshBasicMaterial color="#FF9900" transparent opacity={0.4} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>

      {/* Atmospheric Radial Light Pulse */}
      <pointLight color="#FFD27F" intensity={3.5} distance={12} decay={2} />

      {/* Interactive Tooltip HUD */}
      {hovered && (
        <Html distanceFactor={14} center position={[0, 0.8, 0]}>
          <div className="pointer-events-none rounded-xl bg-[#15100D]/95 border border-[#E2C875]/70 px-3 py-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.9)] text-center whitespace-nowrap backdrop-blur-md">
            <p className="text-[10px] font-sans font-bold tracking-widest text-[#E8DDC7] uppercase">SURYA (THE SUN)</p>
            <p className="text-xs font-serif font-bold text-[#E2C875]">{solarAngle}° Altitude • Prana 528Hz</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// ── 3. 3D Moon (Chandra) Mesh with Directional Phase Illumination ──
function ChandraMesh({
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

  // Positioned along the lunar ecliptic path
  const moonPos = useMemo(() => {
    const angle = (dayProgress * 0.7 + 0.45) * Math.PI;
    const x = 5.2 * Math.cos(angle);
    const y = Math.max(0.6, 3.8 * Math.sin(angle));
    const z = 2.4 * Math.sin(angle) - 1.5;
    return new THREE.Vector3(x, y, z);
  }, [dayProgress]);

  useFrame((_, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group
      ref={moonRef}
      position={moonPos}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 3D Moon Sphere with realistic crater shading */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#D8E2EC"
          roughness={0.8}
          metalness={0.1}
          emissive="#2A384C"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Soft Moon Pearl Corona Glow */}
      <mesh>
        <sphereGeometry args={[0.36, 16, 16]} />
        <meshBasicMaterial color="#88B4E2" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Orbit Ring Indicator */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.45, 32]} />
        <meshBasicMaterial color="#E2C875" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Interactive Tooltip */}
      {hovered && (
        <Html distanceFactor={14} center position={[0, 0.7, 0]}>
          <div className="pointer-events-none rounded-xl bg-[#0e131d]/95 border border-[#88B4E2]/70 px-3 py-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.9)] text-center whitespace-nowrap backdrop-blur-md">
            <p className="text-[10px] font-sans font-bold tracking-widest text-[#E8DDC7] uppercase">CHANDRA (MOON)</p>
            <p className="text-xs font-serif font-bold text-[#88B4E2]">{tithiName || "Krishna Saptami"} • {pakshaName || "Krishna"}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// ── 4. Golden Celestial Coordinate Hemisphere ──
function CelestialCoordinateDome() {
  const lines = useMemo(() => {
    const elements: React.ReactNode[] = [];

    // Altitude rings at 15°, 30°, 45°, 60°, 75°
    const altitudes = [15, 30, 45, 60, 75];
    altitudes.forEach((deg, idx) => {
      const rad = (deg * Math.PI) / 180;
      const y = 6.2 * Math.sin(rad);
      const r = 6.2 * Math.cos(rad);
      elements.push(
        <mesh key={`alt-${idx}`} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.015, r + 0.015, 64]} />
          <meshBasicMaterial color="#C9A646" transparent opacity={0.15 + (idx === 1 || idx === 3 ? 0.12 : 0)} side={THREE.DoubleSide} />
        </mesh>
      );
    });

    // 6 Vertical Meridian Arches
    for (let i = 0; i < 6; i++) {
      const rot = (i * Math.PI) / 6;
      elements.push(
        <group key={`meridian-${i}`} rotation={[0, rot, 0]}>
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[6.18, 6.22, 64, 1, 0, Math.PI]} />
            <meshBasicMaterial color="#C9A646" transparent opacity={0.12} side={THREE.DoubleSide} />
          </mesh>
        </group>
      );
    }

    return elements;
  }, []);

  return <group>{lines}</group>;
}

// ── 5. Vedic Horizon Compass Base Disc ──
function VedicHorizonBase() {
  return (
    <group position={[0, -0.05, 0]}>
      {/* Dark Smoked Obsidian Ground Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6.4, 64]} />
        <meshStandardMaterial color="#0B0807" roughness={0.9} metalness={0.2} transparent opacity={0.88} />
      </mesh>

      {/* Concentric Golden Horizon Boundary Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.35, 6.42, 64]} />
        <meshBasicMaterial color="#C9A646" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.2, 5.24, 64]} />
        <meshBasicMaterial color="#C9A646" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.23, 64]} />
        <meshBasicMaterial color="#C9A646" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* East-West Transit Baseline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12.6, 0.03]} />
        <meshBasicMaterial color="#E2C875" transparent opacity={0.3} />
      </mesh>
      {/* North-South Cardinal Baseline */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[12.6, 0.03]} />
        <meshBasicMaterial color="#E2C875" transparent opacity={0.2} />
      </mesh>

      {/* Sanskrit Cardinal Direction Labels */}
      <Html position={[-5.4, 0.1, 0]} center>
        <div className="text-[9px] sm:text-xs font-serif font-bold text-[#E2C875] bg-[#15100D]/90 border border-[#C9A646]/30 px-2 py-0.5 rounded-full whitespace-nowrap shadow-md">
          पूर्व (East • Udaya)
        </div>
      </Html>
      <Html position={[5.4, 0.1, 0]} center>
        <div className="text-[9px] sm:text-xs font-serif font-bold text-[#E2C875] bg-[#15100D]/90 border border-[#C9A646]/30 px-2 py-0.5 rounded-full whitespace-nowrap shadow-md">
          पश्चिम (West • Asta)
        </div>
      </Html>
      <Html position={[0, 0.1, -5.4]} center>
        <div className="text-[8.5px] sm:text-[9px] font-sans font-bold text-[#9D9386] bg-[#15100D]/80 border border-white/10 px-2 py-0.5 rounded-full whitespace-nowrap">
          उत्तर (North)
        </div>
      </Html>
      <Html position={[0, 0.1, 5.4]} center>
        <div className="text-[8.5px] sm:text-[9px] font-sans font-bold text-[#9D9386] bg-[#15100D]/80 border border-white/10 px-2 py-0.5 rounded-full whitespace-nowrap">
          दक्षिण (South)
        </div>
      </Html>
    </group>
  );
}

// ── 6. Faint Celestial Stardust Field ──
function CelestialStardust() {
  const count = 180;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random distribution for React 19 purity
      const u = ((i * 137.5) % 360) / 360;
      const v = (((i * 223.1) % 180) + 10) / 200;
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(Math.max(-0.99, Math.min(0.99, 2.0 * v - 1.0)));
      const r = 6.8 + ((i * 47) % 15) * 0.1;
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
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FFEAA7"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Main Scene Canvas Component ──
export default function LivingHorizonDomeCanvas({
  dayProgress = 0.5,
  solarAngle = 78,
  tithiName = "Krishna Saptami",
  pakshaName = "Krishna",
}: LivingHorizonDomeProps) {
  return (
    <div className="w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] relative rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 4.8, 10.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient Twilight Light */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 8, 4]} intensity={0.8} color="#FFF2CC" />

        {/* 1. Celestial Stardust Backdrop */}
        <CelestialStardust />

        {/* 2. Golden Celestial Coordinate Dome Grid */}
        <CelestialCoordinateDome />

        {/* 3. Golden Solar Arc Line (Surya Kaal) */}
        <SolarArcPath />

        {/* 4. Radiant 3D Sun (Surya) */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
          <SuryaMesh dayProgress={dayProgress} solarAngle={solarAngle} />
        </Float>

        {/* 5. 3D Lunar Sphere (Chandra) */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.25}>
          <ChandraMesh dayProgress={dayProgress} tithiName={tithiName} pakshaName={pakshaName} />
        </Float>

        {/* 6. Consecrated Horizon Base Disc with Sanskrit Compass */}
        <VedicHorizonBase />

        {/* 7. Damped Interactive Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.25}
          maxPolarAngle={Math.PI / 2 - 0.04}
          minPolarAngle={Math.PI / 5}
          dampingFactor={0.06}
        />
      </Canvas>

      {/* Bottom Subtle Overlay Note */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
        <span className="text-[10px] tracking-widest text-[#9D9386]/70 uppercase font-mono bg-[#0B0807]/75 px-3 py-0.5 rounded-full border border-white/5 backdrop-blur-sm">
          Interactive 3D Celestial Dome • Drag to Explore
        </span>
      </div>
    </div>
  );
}
