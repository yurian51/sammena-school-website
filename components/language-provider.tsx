"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { translate, type Lang } from "@/lib/i18n/messages"

const STORAGE_KEY = "sammena-lang"

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Returns the Swahili text when Swahili is active, otherwise the English source. */
  tr: (text: string) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  tr: (text) => text,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start in English so server and client markup match; the saved choice is applied after mount.
  const [lang, setLangState] = useState<Lang>("en")

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === "en" || saved === "sw") setLangState(saved)
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); English remains the default.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === "sw" ? "sw-TZ" : "en-TZ"
  }, [lang])

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang: (next) => {
      if (next !== "en" && next !== "sw") return
      setLangState(next)
      document.documentElement.lang = next === "sw" ? "sw-TZ" : "en-TZ"
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Ignore storage failures; the choice still applies for this page view.
      }
    },
    tr: (text) => translate(text, lang),
  }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
