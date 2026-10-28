"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"
import type { Lang } from "@/lib/i18n/messages"

type LanguageContextValue = {
  lang: "en"
  setLang: (lang: Lang) => void
  tr: (text: string) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  tr: (text) => text,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const value = useMemo<LanguageContextValue>(() => ({
    lang: "en",
    // The public website is English-only. Keep this method as a no-op for
    // compatibility with components that still call it.
    setLang: () => {},
    tr: (text) => text,
  }), [])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
