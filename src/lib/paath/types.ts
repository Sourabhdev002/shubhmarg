/** Shared types for the paath (Chalisa / Aarti) library. */

export interface ChalisaLang {
  dohaStart: string[];
  chaupai: string[];
  dohaEnd: string[];
}

export interface PaathFaq {
  q: string;
  a: string;
}

export interface PaathLink {
  href: string;
  eyebrow: string;
  label: string;
}

export interface PaathConfig {
  slug: string;
  /** Devanagari title, e.g. "श्री हनुमान चालीसा" */
  titleHi: string;
  /** Short English name, e.g. "Hanuman Chalisa" */
  titleEn: string;
  deityEn: string;
  author: string;
  /** One-line Hindi intro under the title */
  intro: string;
  hi: ChalisaLang;
  /** Optional English transliteration (enables the हिंदी / English toggle) */
  en?: ChalisaLang;
  /** Optional audio file under /public */
  audioSrc?: string;
  faq: PaathFaq[];
  /** Days this paath is traditionally recited (0 = Sunday ... 6 = Saturday) */
  weekdays: number[];
  /**
   * true once Pandit Ji has checked the text. Unverified pages stay reachable by URL
   * but are noindex and are NOT linked from menus, sitemap or the home page.
   */
  verified: boolean;
  /** localStorage key for the paath counter */
  storageKey: string;
  links: PaathLink[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  closing: string;
}