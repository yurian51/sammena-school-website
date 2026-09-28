"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Bell, Newspaper, RefreshCw } from "lucide-react"

type CmsItem =
  | { id: string; type: "NEWS"; title: string; slug: string; excerpt: string; body: string; category: string; publishedAt?: string }
  | { id: string; type: "ANNOUNCEMENT"; title: string; slug: string; summary: string; priority: "NORMAL" | "IMPORTANT"; expiresAt?: string; publishedAt?: string }

type ApiResponse = { data?: CmsItem[]; error?: { message?: string } }

export function PublicUpdates() {
  const [items, setItems] = useState<CmsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    fetch("/api/cms", { cache: "no-store" })
      .then(async response => {
        const payload = await response.json() as ApiResponse
        if (!response.ok) throw new Error(payload.error?.message || "Unable to load published updates.")
        if (active) setItems(Array.isArray(payload.data) ? payload.data : [])
      })
      .catch(() => { if (active) setFailed(true) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const visible = useMemo(() => items.slice(0, 3), [items])

  if (loading) {
    return <div className="border border-slate-200 bg-white p-6"><div className="flex items-center gap-3 text-sm font-semibold text-slate-500"><RefreshCw className="h-4 w-4 animate-spin text-[#9b7728]" /> Loading published school updates…</div></div>
  }

  if (failed) {
    return <div className="border border-amber-200 bg-amber-50 p-6"><p className="text-sm font-semibold text-amber-900">The public information service is temporarily unavailable.</p><p className="mt-1 text-xs leading-5 text-amber-800">No unverified announcement is displayed as a fallback.</p><Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#8a6a24]">Contact the school <ArrowRight className="h-4 w-4" /></Link></div>
  }

  if (!visible.length) {
    return <div className="border border-slate-200 bg-[#faf8f1] p-7"><div className="flex items-start gap-3"><Bell className="mt-0.5 h-5 w-5 shrink-0 text-[#9b7728]" /><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Official publishing desk</p><h3 className="mt-2 text-lg font-bold text-[#0a3158]">No public notices have been published yet.</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">The website only displays announcements and news after they are approved and published by Sammena administration.</p><Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#8a6a24]">Contact Sammena <ArrowRight className="h-4 w-4" /></Link></div></div></div>
  }

  return <div className="grid gap-4 sm:grid-cols-3">{visible.map(item => {
    const isNews = item.type === "NEWS"
    const title = item.title
    const summary = isNews ? item.excerpt : item.summary
    const date = item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-TZ", { day: "numeric", month: "short", year: "numeric" }) : "Published"
    return <article key={item.id} className="border border-slate-200 bg-white p-5 transition-colors hover:bg-[#faf8f1]"><div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9b7728]">{isNews ? <Newspaper className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}{isNews ? item.category : item.priority === "IMPORTANT" ? "Important notice" : "Announcement"}</span><span className="text-[10px] font-semibold text-slate-400">{date}</span></div><h3 className="mt-4 line-clamp-2 font-bold text-[#0a3158]">{title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p></article>
  })}</div>
}
