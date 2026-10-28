"use client"

import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

const options = [
  { value: "en", label: "EN", name: "English" },
  { value: "sw", label: "SW", name: "Kiswahili" },
] as const

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div role="group" aria-label="Language / Lugha" className={cn("inline-flex overflow-hidden border border-white/25 text-[11px] font-bold", className)}>
      {options.map((option) => {
        const active = lang === option.value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={option.name}
            onClick={() => setLang(option.value)}
            className={cn(
              "min-h-9 min-w-9 px-2.5 transition-colors",
              active ? "bg-white text-[#102846]" : "text-white/80 hover:bg-white/10 hover:text-white",
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
