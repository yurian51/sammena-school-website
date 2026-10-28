"use client"

import { useLanguage } from "@/components/language-provider"

export function T({ text }: { text: string }) {
  const { tr } = useLanguage()
  return <>{tr(text)}</>
}
