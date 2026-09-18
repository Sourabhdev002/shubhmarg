"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { LangCode, getTranslation } from "@/lib/translations";

const STORAGE_KEY = "shubhmarg:lang";

interface LanguageContextValue {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
      if (saved) {
        queueMicrotask(() => setLangState(saved));
      }
    } catch {
      // SSR / private browsing — ignore
    }
  }, []);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch { /* ignore */ }
    document.documentElement.lang = code;
    // Notify any legacy listeners (e.g. chatbot)
    window.dispatchEvent(new CustomEvent("shubhmarg:lang", { detail: { code } }));
  }, []);

  const t = useCallback((key: string) => getTranslation(key, lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Convenience hook — returns only the translator function */
export function useT() {
  return useContext(LanguageContext).t;
}
