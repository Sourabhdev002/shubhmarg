"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { RealisticTempleBell3D } from "@/components/ui/RealisticTempleBell3D";
import { playTempleBellResonance } from "@/lib/celestialAudio";
import { useT } from "@/context/LanguageContext";

interface TempleBellStripProps {
    /** When true, render without the own <section>/surface wrapper so the parent owns the surface. */
    embedded?: boolean;
}

/** Small mandir-door bell: visitor taps to ring before starting. */
export default function TempleBellStrip({ embedded = false }: TempleBellStripProps) {
    const t = useT();
    const reduceMotion = useReducedMotion() ?? false;

    const [ringing, setRinging] = useState(false);
    const [count, setCount] = useState(0);

    // Hold the ring-reset timer so we can clear it on unmount (avoid setState-after-unmount).
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const ring = () => {
        if (ringing) return;
        setRinging(true);
        setCount((c) => c + 1);
        try { navigator.vibrate?.(40); } catch { }
        try { playTempleBellResonance(432); } catch { }
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setRinging(false), 3800);
    };

    const inner = (
        <div className="max-w-md mx-auto section-px flex items-center gap-4">
            <RealisticTempleBell3D
                isRinging={ringing}
                onStrike={ring}
                size={56}
                reduceMotion={reduceMotion}
                ariaLabel={t("bell.label")}
            />
            <div className="min-w-0">
                <p className="font-devanagari text-[17px] font-bold text-[#2A1810]">
                    घंटी बजाएँ, मन शांत करें
                </p>
                <p className="text-[12px] text-[#6B5A48] font-medium">
                    {count === 0
                        ? t("bell.hint")
                        : `${t("bell.rung")} (${count})`}
                </p>
            </div>
        </div>
    );

    if (embedded) {
        return inner;
    }

    return (
        <section aria-label={t("bell.label")} className="surface-bronze py-4">
            {inner}
        </section>
    );
}
