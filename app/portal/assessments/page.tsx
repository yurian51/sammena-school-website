"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, GraduationCap, RefreshCw } from "lucide-react"
import type { PortalAssessment } from "@/lib/portal/types"

export default function AssessmentsPage() {
  const [items, setItems] = useState<PortalAssessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const response = await fetch("/api/portal/assessments", { cache: "no-store" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message ?? "Unable to load assessments.")
      setItems(payload.data ?? [])
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to load assessments.") }
    finally { setLoading(false) }
  }
  useEffect(() => { void load() }, [])

  return <main className="min-h-screen bg-[#f5f6f7] text-slate-800">
    <header className="border-b border-[#0a3158]/20 bg-[#06203b] text-white"><div className="mx-auto max-w-7xl px-5 py-4 sm:px-8"><Link href="/portal" className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 hover:text-white"><ArrowLeft className="h-4 w-4" /> School Portal</Link><h1 className="mt-3 text-2xl font-bold">Assessments</h1></div></header>
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8"><div className="flex items-end justify-between border-b border-slate-200 pb-6"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Academic records</p><p className="mt-2 text-sm text-slate-600">Assessment results exposed through the authenticated portal API.</p></div><button onClick={() => void load()} className="border border-slate-200 bg-white p-3 text-[#0a3158]" aria-label="Refresh"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></button></div>
      {error ? <div className="mt-6 border border-red-200 bg-white p-6"><p className="font-bold text-red-700">Assessments unavailable</p><p className="mt-2 text-sm">{error}</p></div> : <div className="mt-6 overflow-x-auto border border-slate-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Date</th><th className="px-5 py-3">Student</th><th className="px-5 py-3">Subject</th><th className="px-5 py-3">Assessment</th><th className="px-5 py-3">Score</th><th className="px-5 py-3">Percentage</th></tr></thead><tbody className="divide-y divide-slate-100">{items.map((item) => <tr key={item.id}><td className="px-5 py-4 text-slate-500">{item.assessedAt}</td><td className="px-5 py-4 font-semibold text-[#0a3158]">{item.studentName}</td><td className="px-5 py-4">{item.subject}</td><td className="px-5 py-4">{item.assessment}</td><td className="px-5 py-4">{item.score}/{item.maxScore}</td><td className="px-5 py-4 font-bold">{item.percentage.toFixed(1)}%</td></tr>)}{!loading && !items.length && <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500"><GraduationCap className="mx-auto h-7 w-7" /><p className="mt-2">No assessments available.</p></td></tr>}</tbody></table></div>}
    </div>
  </main>
}
