"use client";

import React, { useState } from "react";
import { Upload, Sparkles, Loader2, Compass, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VastuScannerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [spaceType, setSpaceType] = useState("Home / Flat");
  const [mainEntranceFacing, setMainEntranceFacing] = useState("North");
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
      setError("Please select or capture a floor plan or room photo first.");
      return;
    }

    setIsScanning(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const res = await fetch("/api/vastu-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: previewUrl,
          spaceType,
          mainEntranceFacing,
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setError(data.error || "Failed to scan Vastu layout. Please try again.");
      }
    } catch {
      setError("An unexpected network error occurred during scanning.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Background ambient orbs */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/15 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Compass className="w-4 h-4 text-[#C25E10] animate-spin [animation-duration:12s]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Vedic Vastu Shastra Analysis
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Vedic Vastu Scanner
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Upload your floor plan or space photo to analyze directional cosmic energy zones, identify doshas, and receive non-demolition remedies.
          </p>
        </div>

        {/* Input & Upload Card */}
        <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Space Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
                Space Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Home / Flat", "Office / Commercial", "Main Entrance", "Kitchen / Bedroom"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSpaceType(type)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      spaceType === type
                        ? "bg-[#d4af37] text-black border-[#d4af37] shadow-md"
                        : "bg-[#FDF3E2] border-[#B8860B]/25 text-[#2E1D14] hover:border-[#B8860B]/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Entrance Facing Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
                Main Entrance / Compass Facing
              </label>
              <select
                value={mainEntranceFacing}
                onChange={(e) => setMainEntranceFacing(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-4 py-3 text-sm text-[#2A1810] font-medium focus:outline-none focus:border-[#C25E10] shadow-sm"
              >
                <option value="North (Kuber Zone - Wealth)">North (Kuber Zone - Wealth)</option>
                <option value="North-East (Ishan - Divine Energy)">North-East (Ishan - Divine Energy)</option>
                <option value="East (Surya - Health & Fame)">East (Surya - Health &amp; Fame)</option>
                <option value="South-East (Agneya - Vitality)">South-East (Agneya - Vitality)</option>
                <option value="South (Yama - Stability)">South (Yama - Stability)</option>
                <option value="South-West (Nairutya - Strength)">South-West (Nairutya - Strength)</option>
                <option value="West (Varuna - Prosperity)">West (Varuna - Prosperity)</option>
                <option value="North-West (Vayavya - Social Support)">North-West (Vayavya - Social Support)</option>
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
                  alt="Uploaded space layout"
                  className="max-h-64 rounded-xl border border-[#B8860B]/20 shadow-lg object-contain mb-3"
                />
                <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Layout Loaded Successfully (Click to Change)
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mb-3">
                  <Upload className="w-8 h-8 text-[#8B2500]" />
                </div>
                <h3 className="text-base font-bold text-[#2A1810] mb-1">
                  Upload Floor Plan or Room Photo
                </h3>
                <p className="text-xs text-[#2E1D14] font-medium max-w-sm">
                  Drag and drop your architectural 2D floor plan, sketch, or interior photo (PNG, JPG, WebP).
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
                  <span>Analyzing Directions &amp; Energy Alignment...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Spatial Energy Zones</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scan Results Display */}
        {analysisResult && (
          <div className="bg-[#140e0b] border-2 border-[#d4af37]/60 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/30 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-xl font-bold font-serif !text-[#d4af37]" style={{ color: "#d4af37" }}>
                  Vedic Vastu Shastra Assessment
                </h2>
              </div>
              <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 px-3 py-1 rounded-full font-bold">
                Analysis Complete
              </span>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-sm text-[#ece5d8] leading-relaxed font-sans">
                {analysisResult}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#EAE3D2] font-medium">
                Need a comprehensive blueprint analysis or personal consultation?
              </p>
              <Link
                href="/request-guidance?service=vastu"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-maroon hover:bg-brand-maroon-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                <span>Book Full Vastu Guidance (₹2,100)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
