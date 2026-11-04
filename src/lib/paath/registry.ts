import type { PaathConfig } from "./types";
import { CHALISA_HI, CHALISA_EN, CHALISA_FAQ, CHALISA_AUDIO_SRC } from "@/app/hanuman-chalisa/chalisa-data";
import { SHANI_CHALISA } from "./shani";
import { SHIV_CHALISA } from "./shiv";
import { DURGA_CHALISA } from "./durga";

export const HANUMAN_CHALISA: PaathConfig = {
  slug: "hanuman-chalisa",
  titleHi: "श्री हनुमान चालीसा",
  titleEn: "Hanuman Chalisa",
  deityEn: "Lord Hanuman",
  author: "Goswami Tulsidas",
  intro: "गोस्वामी तुलसीदास रचित 40 चौपाई। भय, बाधा और शनि-मंगल दोष की शांति के लिए प्रतिदिन पाठ करें।",
  hi: CHALISA_HI,
  en: CHALISA_EN,
  audioSrc: CHALISA_AUDIO_SRC,
  faq: CHALISA_FAQ,
  weekdays: [2, 6],
  verified: true,
  storageKey: "shubhmarg:chalisa-paath",
  links: [
    { href: "/shani-sade-sati", eyebrow: "Free check", label: "शनि साढ़े साती चल रही है? →" },
    { href: "/manglik-rescue", eyebrow: "Free check", label: "क्या आप मांगलिक हैं? →" },
  ],
  seoTitle: "Hanuman Chalisa Lyrics in Hindi & English with Audio | ShubhMarg",
  seoDescription:
    "श्री हनुमान चालीसा: पूरी 40 चौपाई हिंदी और English में, ऑडियो के साथ। Read Shri Hanuman Chalisa lyrics in Hindi and English, listen to the audio and track your daily paath.",
  keywords: [
    "hanuman chalisa", "hanuman chalisa lyrics", "hanuman chalisa in hindi", "hanuman chalisa lyrics in english",
    "hanuman chalisa audio", "हनुमान चालीसा", "श्री हनुमान चालीसा", "hanuman chalisa paath",
  ],
  closing: "॥ सियावर रामचन्द्र की जय · पवनसुत हनुमान की जय ॥",
};

/** Every paath page (verified or not). */
export const PAATHS: PaathConfig[] = [HANUMAN_CHALISA, SHANI_CHALISA, SHIV_CHALISA, DURGA_CHALISA];

/** Only Pandit Ji-verified paaths are linked from menus, sitemap and the home page. */
export const LISTED_PAATHS: PaathConfig[] = PAATHS.filter((p) => p.verified);

export function getPaath(slug: string): PaathConfig | undefined {
  return PAATHS.find((p) => p.slug === slug);
}

/**
 * Paath for a weekday (0 = Sunday). Prefers the day's own deity (Mon Shiv, Fri Durga,
 * Sat Shani) when that text is verified, otherwise falls back to Hanuman Chalisa.
 */
export function getTodaysPaath(weekday: number): PaathConfig {
  return (
    LISTED_PAATHS.filter((p) => p.slug !== HANUMAN_CHALISA.slug).find((p) => p.weekdays.includes(weekday)) ??
    HANUMAN_CHALISA
  );
}