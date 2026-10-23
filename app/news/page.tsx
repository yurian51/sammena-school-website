"use client"

import { useEffect, useMemo, useState } from "react"
import { AlertCircle, Bell, CalendarDays, Newspaper, RefreshCw } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type NewsItem = {
  id: string
  title: string
  slug: string
  type: "NEWS"
  excerpt: string
  body: string
  category: string
  publishedAt?: string
  createdAt: string
}

type Announcement = {
  id: string
  title: string
  slug: string
  type: "ANNOUNCEMENT"
  summary: string
  priority: "NORMAL" | "IMPORTANT"
  expiresAt?: string
  publishedAt?: string
  createdAt: string
}

type PublishedItem = NewsItem | Announcement
const filters = [
  { label: "All updates", value: "ALL" },
  { label: "News", value: "NEWS" },
  { label: "Announcements", value: "ANNOUNCEMENT" },
] as const

function publishedDate(item: PublishedItem) {
  const value = item.publishedAt ?? item.createdAt
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : new Intl.DateTimeFormat("en-TZ", { dateStyle: "long" }).format(date)
}

export default function NewsPage() {
  const [items, setItems] = useState<PublishedItem[]>([])
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("ALL")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUpdates = async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/cms", { cache: "no-store", signal })
      const payload = await response.json().catch(() => null)
      if (!response.ok) throw new Error(payload?.error?.message ?? "Published school updates could not be loaded.")
      const data = Array.isArray(payload?.data) ? payload.data as PublishedItem[] : []
      setItems(data.filter((item) => item && (item.type === "NEWS" || item.type === "ANNOUNCEMENT")))
    } catch (cause) {
      if (cause instanceof Error && cause.name === "AbortError") return
      setError(cause instanceof Error ? cause.message : "Published school updates could not be loaded.")
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    void loadUpdates(controller.signal)
    return () => controller.abort()
  }, [])

  const visible = useMemo(() => {
    const filtered = filter === "ALL" ? items : items.filter((item) => item.type === filter)
    return [...filtered].sort((a, b) => new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime())
  }, [items, filter])

  return <main className="min-h-screen overflow-x-hidden bg-white text-[#172033]">
    <Navbar />
    <section className="bg-[#102846] pb-16 pt-36 text-white sm:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d7c28e]">Official school information</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">News & announcements</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Published updates from Sammena Pre & Primary School. Only items approved and published by the school appear here.</p>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-5 sm:px-6 lg:px-8" aria-label="Filter school updates">
        {filters.map((item) => <button key={item.value} type="button" onClick={() => setFilter(item.value)} aria-pressed={filter === item.value} className={`min-h-10 border px-4 py-2 text-sm font-semibold transition ${filter === item.value ? "border-[#102846] bg-[#102846] text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>{item.label}</button>)}
      </div>
    </section>

    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {loading && <div className="flex min-h-48 items-center justify-center gap-3 text-sm font-semibold text-slate-600" role="status"><RefreshCw className="h-5 w-5 animate-spin" />Loading published updates…</div>}
        {!loading && error && <div className="mx-auto flex max-w-2xl items-start gap-4 border border-amber-200 bg-amber-50 p-6" role="alert"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" /><div className="flex-1"><h2 className="font-bold text-amber-950">Updates are temporarily unavailable</h2><p className="mt-2 text-sm leading-6 text-amber-900">{error}</p><button type="button" onClick={() => void loadUpdates()} className="mt-4 inline-flex min-h-10 items-center gap-2 bg-[#102846] px-4 py-2 text-sm font-bold text-white"><RefreshCw className="h-4 w-4" />Retry</button></div></div>}
        {!loading && !error && visible.length === 0 && <div className="mx-auto max-w-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center"><CalendarDays className="mx-auto h-8 w-8 text-[#b9964f]" /><h2 className="mt-4 text-xl font-semibold text-[#102846]">No published updates yet</h2><p className="mt-2 text-sm leading-6 text-slate-600">When the school publishes an approved news item or announcement, it will appear here.</p></div>}
        {!loading && !error && visible.length > 0 && <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visible.map((item) => {
          const isNews = item.type === "NEWS"
          const summary = isNews ? item.excerpt : item.summary
          const date = publishedDate(item)
          return <article key={item.id} className="flex h-full flex-col border border-slate-200 bg-white p-6 transition hover:border-[#b9964f]/60 hover:shadow-sm sm:p-7">
            <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8d713b]">{isNews ? <Newspaper className="h-4 w-4" /> : <Bell className="h-4 w-4" />}{isNews ? item.category : "Announcement"}</span>{!isNews && item.priority === "IMPORTANT" && <span className="border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-900">Important</span>}</div>
            <h2 className="mt-5 text-xl font-semibold leading-snug text-[#17365d]">{item.title}</h2>
            {date && <time className="mt-2 text-xs text-slate-500" dateTime={item.publishedAt ?? item.createdAt}>{date}</time>}
            <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-7 text-slate-600">{summary || "Please contact the school for further information."}</p>
          </article>
        })}</div>}
      </div>
    </section>
    <Footer />
  </main>
}
