"use client"

import { useMemo, useState } from "react"
import { Bell, Search, Pin } from "lucide-react"
import type { CmsContent } from "@/lib/cms/types"

export function AnnouncementsChannel({ items }: { items: CmsContent[] | null }) {
  const [query, setQuery] = useState("")
  const [kind, setKind] = useState("ALL")
  const filtered = useMemo(() => (items ?? []).filter((item) => {
    const text = item.type === "NEWS" ? `${item.title} ${item.excerpt} ${item.category}` : `${item.title} ${item.summary}`
    return (kind === "ALL" || item.type === kind) && text.toLowerCase().includes(query.trim().toLowerCase())
  }).sort((a, b) => Number(b.type === "ANNOUNCEMENT" && b.priority === "IMPORTANT") - Number(a.type === "ANNOUNCEMENT" && a.priority === "IMPORTANT") || new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime()), [items, query, kind])
  if (items === null) return <p role="status" className="border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">School updates are temporarily unavailable. Please try again later.</p>
  return <section>
    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">{[{value:"ALL",label:"All updates"},{value:"ANNOUNCEMENT",label:"Announcements"},{value:"NEWS",label:"School news"}].map((f) => <button key={f.value} type="button" aria-pressed={kind === f.value} onClick={() => setKind(f.value)} className={`min-h-10 border px-4 text-sm font-semibold ${kind === f.value ? "border-[#17365d] bg-[#17365d] text-white" : "border-slate-200 bg-white text-slate-600"}`}>{f.label}</button>)}</div>
      <label className="relative block sm:w-72"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search school updates" className="min-h-10 w-full border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#b9964f]"/></label>
    </div>
    <p className="mb-3 text-xs text-slate-500">{filtered.length} published {filtered.length === 1 ? "update" : "updates"}. Important notices appear first.</p>
    {filtered.length === 0 ? <div className="border border-slate-200 bg-slate-50 p-10 text-center"><Bell className="mx-auto h-7 w-7 text-[#b9964f]"/><h2 className="mt-3 font-semibold text-[#17365d]">No matching updates</h2><p className="mt-1 text-sm text-slate-600">Try a different search or filter.</p></div> : <div className="divide-y divide-slate-200 border-y border-slate-200">{filtered.map((item) => { const news = item.type === "NEWS"; const important = !news && item.priority === "IMPORTANT"; const dateValue = item.publishedAt ?? item.createdAt; const date = Number.isNaN(new Date(dateValue).getTime()) ? "" : new Intl.DateTimeFormat("en-TZ", {dateStyle:"long"}).format(new Date(dateValue)); return <article key={item.id} className="grid gap-4 py-6 sm:grid-cols-[44px_1fr]"><div className="grid h-11 w-11 place-items-center border border-[#e6e1d7] bg-[#fbfaf7] text-[#8d713b]"><Bell className="h-5 w-5"/></div><div><div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#8d713b]">{news ? item.category : "Official announcement"}{important && <span className="inline-flex items-center gap-1 border border-amber-200 bg-amber-50 px-2 py-1 text-amber-900"><Pin className="h-3 w-3"/> Important</span>}<span className="font-normal normal-case tracking-normal text-slate-500">{date}</span></div><h2 className="mt-2 text-xl font-semibold text-[#17365d]">{item.title}</h2><p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">{news ? item.excerpt : item.summary}</p></div></article>})}</div>}
  </section>
}
