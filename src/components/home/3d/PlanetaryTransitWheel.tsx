"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Html } from "@react-three/drei";
import * as THREE from "three";

interface PlanetInfo {
  name: string;
  sanskritName: string;
  color: string;
  emissive: string;
  size: number;
  orbitRadius: number;
  speed: number;
  currentRashi: string;
  significance: string;
}

const PLANETS: PlanetInfo[] = [
  { name: "Sun", sanskritName: "Surya", color: "#FF9900", emissive: "#FF5500", size: 0.8, orbitRadius: 2.5, speed: 0.8, currentRashi: "Simha / Leo", significance: "Soul, Atma-Karaka, Vitality, Leadership" },
  { name: "Moon", sanskritName: "Chandra", color: "#E6F7FF", emissive: "#88CCEE", size: 0.45, orbitRadius: 3.6, speed: 1.4, currentRashi: "Karka / Cancer", significance: "Manas (Mind), Emotional Harmony, Intuition" },
  { name: "Mars", sanskritName: "Mangal", color: "#FF3300", emissive: "#CC2200", size: 0.5, orbitRadius: 4.8, speed: 0.65, currentRashi: "Mesha / Aries", significance: "Courage, Passion, Action, Real Estate" },
  { name: "Mercury", sanskritName: "Budha", color: "#00E676", emissive: "#00B050", size: 0.4, orbitRadius: 6.0, speed: 1.1, currentRashi: "Mithuna / Gemini", significance: "Intellect, Communication, Commerce, Logic" },
  { name: "Jupiter", sanskritName: "Guru (Brihaspati)", color: "#FFD700", emissive: "#FFAA00", size: 0.95, orbitRadius: 7.4, speed: 0.35, currentRashi: "Vrishabha / Taurus", significance: "Dharma, Divine Wisdom, Wealth, Prosperity" },
  { name: "Venus", sanskritName: "Shukra", color: "#FF66B2", emissive: "#CC0066", size: 0.55, orbitRadius: 8.8, speed: 0.85, currentRashi: "Tula / Libra", significance: "Love, Marital Harmony, Luxury, Arts" },
  { name: "Saturn", sanskritName: "Shani", color: "#4A90E2", emissive: "#1C4E80", size: 0.85, orbitRadius: 10.2, speed: 0.18, currentRashi: "Kumbha / Aquarius", significance: "Karma-Phala, Discipline, Longevity, Justice" },
  { name: "Rahu", sanskritName: "North Node", color: "#A855F7", emissive: "#6B21A8", size: 0.45, orbitRadius: 11.6, speed: -0.22, currentRashi: "Meena / Pisces", significance: "Material Ambitions, Maya, Unconventional Paths" },
  { name: "Ketu", sanskritName: "South Node", color: "#E09250", emissive: "#9A4D10", size: 0.45, orbitRadius: 13.0, speed: -0.22, currentRashi: "Kanya / Virgo", significance: "Moksha, Spiritual Detachment, Liberation" },
];

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.03, radius + 0.03, 72]} />
      <meshBasicMaterial color="#d4af37" opacity={0.3} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function PlanetMesh({
  planet,
  onSelect,
  isSelected,
}: {
  planet: PlanetInfo;
  onSelect: (p: PlanetInfo) => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef((planet.orbitRadius * 1.7) % (Math.PI * 2));

  useFrame((_, delta) => {
    angleRef.current += delta * planet.speed * 0.35;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angleRef.current) * planet.orbitRadius;
      meshRef.current.position.z = Math.sin(angleRef.current) * planet.orbitRadius;
    }
  });

  return (
    <group>
      <OrbitRing radius={planet.orbitRadius} />
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(planet);
        }}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.emissive}
          emissiveIntensity={isSelected ? 1.2 : 0.4}
          roughness={0.2}
          metalness={0.7}
        />
        {isSelected && (
          <Html distanceFactor={14}>
            <div className="bg-black/95 border-2 border-[#d4af37] px-2.5 py-1 rounded-lg text-[11px] text-[#d4af37] font-bold whitespace-nowrap shadow-[0_0_15px_rgba(212,175,55,0.6)] pointer-events-none">
              ✨ {planet.sanskritName}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

function ZodiacHousesRing() {
  const rimRadius = 14.5;
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Outer Golden Border */}
      <mesh>
        <ringGeometry args={[rimRadius - 0.05, rimRadius + 0.05, 96]} />
        <meshBasicMaterial color="#d4af37" opacity={0.5} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function PlanetaryTransitWheel() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInfo | null>(PLANETS[4]); // Guru (Jupiter) default

  return (
    <div className="w-full h-full relative flex flex-col items-center">
      <div className="w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden bg-[#070403] border-2 border-[#d4af37]/40 shadow-2xl relative">
        <Canvas
          camera={{ position: [0, 16, 20], fov: 45 }}
          style={{ background: "#070403" }}
        >
          {/* Explicit dark cosmic background */}
          <color attach="background" args={["#070403"]} />

          {/* Deep space stars */}
          <Stars radius={60} depth={50} count={3500} factor={4} saturation={0} fade speed={1} />

          {/* Ambient & Directional Lighting */}
          <ambientLight intensity={0.8} />
          <pointLight position={[0, 0, 0]} intensity={3.5} color="#FFA500" distance={30} decay={1.5} />
          <directionalLight position={[10, 20, 15]} intensity={1.0} />

          <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.15}>
            {/* Central Glowing Surya (Sun) */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.3, 32, 32]} />
              <meshStandardMaterial
                color="#FFA500"
                emissive="#FF5500"
                emissiveIntensity={2.2}
                roughness={0.1}
              />
            </mesh>

            {/* Glowing Sun Corona Halo */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.55, 32, 32]} />
              <meshBasicMaterial color="#FF9900" opacity={0.25} transparent side={THREE.BackSide} />
            </mesh>

            {/* Navagrahas */}
            {PLANETS.map((planet) => (
              <PlanetMesh
                key={planet.name}
                planet={planet}
                onSelect={(p) => setSelectedPlanet(p)}
                isSelected={selectedPlanet?.name === planet.name}
              />
            ))}

            {/* Outer Zodiac Rim */}
            <ZodiacHousesRing />
          </Float>

          <OrbitControls
            enablePan={false}
            minDistance={8}
            maxDistance={32}
            maxPolarAngle={Math.PI / 2 - 0.05}
          />
        </Canvas>

        {/* Floating Planet Info Panel */}
        {selectedPlanet && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm bg-black/90 border-2 border-[#d4af37]/70 rounded-2xl p-4.5 backdrop-blur-md shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-md"
                  style={{ backgroundColor: selectedPlanet.color }}
                />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37] font-serif">
                  {selectedPlanet.sanskritName} ({selectedPlanet.name})
                </h3>
              </div>
              <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-full font-bold border border-[#d4af37]/40">
                Graha
              </span>
            </div>

            <p className="text-xs text-white font-medium mb-1.5">
              Active Transit (Gochara): <strong className="text-[#d4af37]">{selectedPlanet.currentRashi}</strong>
            </p>

            <p className="text-[11px] text-gray-300 leading-relaxed mb-3">
              {selectedPlanet.significance}
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span>Velocity: {selectedPlanet.speed > 0 ? "Direct Motion" : "Vakri (Retrograde)"}</span>
              <span>Orbit: {selectedPlanet.orbitRadius} AU</span>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-black/75 border border-[#d4af37]/40 rounded-xl px-3 py-1.5 text-[10px] text-white shadow-lg pointer-events-none flex items-center gap-1.5">
          <span>✨</span>
          <span>Click any Graha (Planet) or drag to rotate 3D celestial sphere</span>
        </div>
      </div>
    </div>
  );
}
