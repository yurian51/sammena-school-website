"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, FileText, RefreshCw, ShieldCheck } from "lucide-react"
import type { QualityDomain, QualitySummary } from "@/lib/api/quality"

export default function QualityPage() {
  const [summary, setSummary] = useState<QualitySummary | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/quality/summary", { cache: "no-store" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message ?? "Unable to load quality records.")
      setSummary(payload.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load quality records.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  const selected = useMemo<QualityDomain | null>(() => {
    if (!summary) return null
    return summary.domains.find((domain) => domain.name === selectedDomain) ?? summary.domains[0] ?? null
  }, [summary, selectedDomain])

  if (loading) {
    return <main className="min-h-screen bg-[#f5f6f7] text-[#0a3158]"><div className="mx-auto flex min-h-screen max-w-xl items-center justify-center p-6 text-center"><RefreshCw className="h-7 w-7 animate-spin text-[#9b7728]" /><span className="ml-3 text-sm font-semibold">Loading quality workspace…</span></div></main>
  }

  if (error || !summary) {
    return <main className="min-h-screen bg-[#f5f6f7] p-6 text-[#0a3158]"><div className="mx-auto flex min-h-[75vh] max-w-xl items-center justify-center"><section className="w-full border border-slate-200 bg-white p-7 text-center shadow-sm"><ShieldCheck className="mx-auto h-8 w-8 text-[#9b7728]" /><h1 className="mt-4 text-2xl font-bold">Quality workspace unavailable</h1><p className="mt-3 text-sm leading-6 text-slate-600">{error ?? "No authenticated quality data was returned."}</p><div className="mt-6 flex justify-center gap-2"><button type="button" onClick={() => void load()} className="inline-flex items-center gap-2 bg-[#0a3158] px-5 py-3 text-sm font-bold text-white"><RefreshCw className="h-4 w-4" /> Retry</button><Link href="/portal" className="inline-flex items-center gap-2 border border-slate-200 px-5 py-3 text-sm font-bold text-[#0a3158]">Portal</Link></div></section></div></main>
  }

  return (
    <main className="min-h-screen bg-[#f5f6f7] text-slate-800">
      <header className="border-b border-[#0a3158]/20 bg-[#06203b] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2c46c]">Sammena Schools</p><h1 className="mt-1 text-lg font-bold">Quality Management</h1></div><Link href="/portal" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white"><ArrowLeft className="h-4 w-4" /> Portal</Link></div></header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="border-b border-slate-200 pb-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Authenticated self-assessment workspace</p><div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h2 className="text-3xl font-bold text-[#0a3158] sm:text-4xl">School quality & improvement</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Quality records are read from the private API and are not rendered from client-side fixtures.</p></div><div className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-3"><ShieldCheck className="h-5 w-5 text-[#9b7728]" /><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall</p><p className="text-xl font-bold text-[#0a3158]">{summary.overall}%</p></div></div></div></div>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{summary.domains.map(domain => <button key={domain.name} type="button" onClick={() => setSelectedDomain(domain.name)} className={`border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 ${selected?.name === domain.name ? "border-[#9b7728] ring-1 ring-[#9b7728]/20" : "border-slate-200"}`}><div className="flex items-start justify-between gap-3"><div className="h-2 w-2 rounded-full bg-[#0a3158]" /><span className="text-2xl font-bold text-[#0a3158]">{domain.score}%</span></div><h3 className="mt-5 text-sm font-bold text-[#0a3158]">{domain.name}</h3><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-[#0a3158]" style={{ width: `${domain.score}%` }} /></div></button>)}</section>

        {selected && <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_.75fr]"><article className="border border-slate-200 bg-white p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Selected domain</p><h2 className="mt-2 text-xl font-bold text-[#0a3158]">{selected.name}</h2></div><ClipboardCheck className="h-5 w-5 text-[#9b7728]" /></div><div className="mt-6 space-y-4">{selected.indicators.map(indicator => <div key={indicator} className="border border-slate-200 p-4"><p className="text-sm font-bold text-[#0a3158]">{indicator}</p><p className="mt-1 text-xs text-slate-500">Indicator returned by the authenticated quality data source.</p><div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500"><FileText className="h-3.5 w-3.5" /> Evidence actions are not enabled until persistence is connected.</div></div>)}</div></article><aside className="border border-slate-200 bg-[#0a3158] p-6 text-white"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e2c46c]">Evidence register</p><h2 className="mt-2 text-xl font-bold">Evidence records</h2></div><FileText className="h-5 w-5 text-[#e2c46c]" /></div><div className="mt-6 grid grid-cols-2 gap-3"><div className="border border-white/10 bg-white/[.05] p-4"><p className="text-2xl font-bold">{summary.evidenceItems}</p><p className="mt-1 text-xs text-white/60">Evidence items</p></div><div className="border border-white/10 bg-white/[.05] p-4"><p className="text-2xl font-bold">{summary.domains.length}</p><p className="mt-1 text-xs text-white/60">Domains</p></div></div></aside></section>}

        <section className="mt-6 border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Improvement plan</p><div className="mt-2 flex items-center justify-between gap-4"><h2 className="text-xl font-bold text-[#0a3158]">Open actions</h2><span className="text-2xl font-bold text-[#0a3158]">{summary.openActions}</span></div><p className="mt-3 text-sm text-slate-600">Action records are intentionally not fabricated in the browser. The authenticated data source must provide persisted actions before they are displayed or mutated.</p></section>

        <div className="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Internal Sammena workflow, not an official government SQAS score.</span><Link href="/" className="inline-flex items-center gap-1 font-bold text-[#8a6a24]">School website <ArrowRight className="h-3.5 w-3.5" /></Link></div>
      </div>
    </main>
  )
}
