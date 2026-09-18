"use client";

import React, { useState } from "react";
import { Upload, Sparkles, Loader2, Hand, CheckCircle2, AlertCircle } from "lucide-react";
import VedicReportRenderer from "@/components/reports/VedicReportRenderer";
import AstrologicalGapDiagnosis from "@/components/shared/AstrologicalGapDiagnosis";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";
import TwoTimelinesVisualizer from "@/components/shared/TwoTimelinesVisualizer";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";

export default function PalmScannerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dominantHand, setDominantHand] = useState("Right Hand (Working Hand)");
  const [gender, setGender] = useState("Male");
  const [ageGroup, setAgeGroup] = useState("25-35");
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setError(null);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!previewUrl) {
      setError("Please select or capture a photo of your palm first.");
      return;
    }

    setIsScanning(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const res = await fetch("/api/palm-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: previewUrl,
          dominantHand,
          gender,
          age: ageGroup,
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setError(data.error || "Failed to scan palm lines. Please ensure the image is clear and well-lit.");
      }
    } catch {
      setError("An unexpected network error occurred during scanning.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Hand className="w-4 h-4 text-[#C25E10]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Classical Samudrika Shastra
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Vedic Palm &amp; Hand Energy Scanner
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Upload a clear photo of your palm to analyze the 3 Sacred Main Lines (Jeevan, Mastishk, Hriday) and planetary mounts for career and destiny insights.
          </p>
        </div>

        {/* Input & Upload Card */}
        <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Dominant Hand */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
                Dominant Hand
              </label>
              <select
                value={dominantHand}
                onChange={(e) => setDominantHand(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] font-medium focus:outline-none focus:border-[#C25E10] shadow-sm"
              >
                <option value="Right Hand (Working Hand)">Right Hand (Active Karma)</option>
                <option value="Left Hand (Destiny/Potential)">Left Hand (Inborn Potential)</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] font-medium focus:outline-none focus:border-[#C25E10] shadow-sm"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
                Age Group
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] font-medium focus:outline-none focus:border-[#C25E10] shadow-sm"
              >
                <option value="Under 20">Under 20</option>
                <option value="20-30">20 - 30</option>
                <option value="30-45">30 - 45</option>
                <option value="45-60">45 - 60</option>
                <option value="60+">60+</option>
              </select>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-[#B8860B]/40 hover:border-[#C25E10] bg-[#FDFBF7] rounded-2xl p-6 text-center transition-all relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {previewUrl ? (
              <div className="flex flex-col items-center">
                {/* Client-side object URL from a file input — next/image cannot optimize blob: URLs. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Uploaded palm photo"
                  className="max-h-64 rounded-xl border border-[#B8860B]/20 shadow-lg object-contain mb-3"
                />
                <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Palm Photo Loaded Successfully (Click to Change)
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mb-3">
                  <Upload className="w-8 h-8 text-[#8B2500]" />
                </div>
                <h3 className="text-base font-bold text-[#2A1810] mb-1">
                  Upload Palm Photo
                </h3>
                <p className="text-xs text-[#2E1D14] font-medium max-w-sm">
                  Take a well-lit photo of your open palm flat on a solid background (PNG, JPG, WebP).
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Scan Action Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleScan}
              disabled={isScanning || !previewUrl}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.5)] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing Palm Lines &amp; Planetary Mounts...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Scan Palm &amp; Reveal Hand Energy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Sacred Palm Reading Loading Experience ── */}
        {isScanning && (
          <VedicCalculationLoader
            title="Samudrika Shastra Palm & Mount Scanning"
            stages={[
              "Analyzing Mount of Sun, Jupiter, Venus & Saturn Elevations...",
              "Tracing Primary Lines: Life Line (Ayush), Heart Line (Hridaya), Head Line (Mastishka)...",
              "Calculating Karmic Chakra Imprints on Dominant Palm...",
              "Correlating Samudrika Marks with Brihat Samhita Principles...",
              "Synthesizing Pandit Ji's Auspicious Palm Mount Insights...",
            ]}
            estimatedSeconds={6}
          />
        )}

        {/* Scan Results Display */}
        {analysisResult && (
          <div className="bg-[#140c08] border-2 border-[#d4af37]/70 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/40 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-xl font-bold font-serif !text-[#d4af37]" style={{ color: "#d4af37" }}>
                  Samudrika Shastra Palm Assessment
                </h2>
              </div>
            </div>

            <VedicReportRenderer content={analysisResult} />

            {/* Astrological Gap Bridge to Paid Guidance */}
            <AstrologicalGapDiagnosis
              toolName="Palm Mounts & Samudrika Lines"
              planetaryAlertTitle="Impending Planetary Transition Detected on Palm Mounts"
              planetaryAlertDesc="Your palm mounts reveal heightened electromagnetic activity along your Sun & Saturn lines, indicating an auspicious breakthrough window that can be accelerated through customized gotra-energized remedies."
              recommendedServiceId="kundli"
              recommendedServiceName="Jyotish & Full Life Kundli Reading"
              price={1101}
            />

            {/* Parallel Destiny Simulator */}
            <TwoTimelinesVisualizer
              toolName="Samudrika Palm Scanner"
              seekerName="Seeker"
              serviceId="kundli"
              serviceName="Jyotish & Full Life Kundli Reading"
              price={1101}
            />
          </div>
        )}

        {/* Sticky Consecration Bar */}
        {analysisResult && (
          <SanctifiedVerdictStickyBar
            serviceId="kundli"
            serviceName="Jyotish & Full Kundli Guidance"
            price={1101}
            badge="Live Samudrika Session Open"
          />
        )}
      </div>
    </main>
  );
}
