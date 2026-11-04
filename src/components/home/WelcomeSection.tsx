"use client";

import { motion, useReducedMotion } from "framer-motion";
import { glassClass, type Surface } from "@/lib/home-surfaces";
import { useT } from "@/context/LanguageContext";
import TempleBellStrip from "@/components/home/TempleBellStrip";

interface WelcomeSectionProps {
    surface: Surface;
    hasDarshan: boolean;
}

/**
 * Home welcome header. Owns the only <h1> on the page.
 *
 * With darshan: a full-bleed hero section. The deity image is painted behind
 * by DarshanBackdrop at the page level, so here we only pin an ivory glass
 * panel to the lower part of the section — dark ink text on light glass,
 * never light text on a dark scrim (brand rule).
 *
 * Without darshan: a normal padded ivory glass section.
 *
 * One entrance animation (opacity + y), disabled for reduced motion.
 * No counts, no "live", no timers.
 */
export default function WelcomeSection({ surface, hasDarshan }: WelcomeSectionProps) {
    const t = useT();
    const reduceMotion = useReducedMotion() ?? false;

    const panel = (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={
                hasDarshan
                    ? `${glassClass(surface)} mx-auto mb-6 w-full max-w-xl rounded-3xl border border-[#B8860B]/20 px-6 py-7 shadow-lg`
                    : `${glassClass(surface)} mx-auto w-full max-w-xl rounded-3xl border border-[#B8860B]/20 px-6 py-7`
            }
        >
            <h1
                id="welcome-title"
                className="font-devanagari text-3xl font-bold leading-tight text-[#2A1810] md:text-4xl"
            >
                मंदिर में आपका स्वागत है
            </h1>
            <p className="mt-2 text-[15px] font-medium text-[#6B5A48] md:text-base">
                {t("welcome.sub")}
            </p>
            <div className="mt-5">
                <TempleBellStrip embedded />
            </div>
        </motion.div>
    );

    if (hasDarshan) {
        return (
            <section
                aria-labelledby="welcome-title"
                className="relative flex min-h-[88svh] items-end section-px"
            >
                {panel}
            </section>
        );
    }

    return (
        <section aria-labelledby="welcome-title" className="section-py section-px">
            {panel}
        </section>
    );
}
