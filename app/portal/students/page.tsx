"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Search, Users } from "lucide-react"
import type { PortalStudent } from "@/lib/portal/types"

export default function StudentsPage() {
  const [students, setStudents] = useState<PortalStudent[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/portal/students", { cache: "no-store" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message ?? "Unable to load student records.")
      setStudents(payload.data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load student records.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  const visible = students.filter((student) => `${student.fullName} ${student.admissionNumber} ${student.className}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <main className="min-h-screen bg-[#f5f6f7] text-slate-800">
      <header className="border-b border-[#0a3158]/20 bg-[#06203b] text-white"><div className="mx-auto max-w-7xl px-5 py-4 sm:px-8"><Link href="/portal" className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 hover:text-white"><ArrowLeft className="h-4 w-4" /> School Portal</Link><h1 className="mt-3 text-2xl font-bold">Student records</h1></div></header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Authenticated records</p><p className="mt-2 text-sm text-slate-600">Search the current portal student dataset. Access is controlled by the authenticated school role.</p></div><div className="flex gap-2"><label className="flex min-w-64 items-center gap-2 border border-slate-200 bg-white px-3 py-2.5"><Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search student…" className="w-full bg-transparent text-sm outline-none" /></label><button type="button" onClick={() => void load()} className="border border-slate-200 bg-white px-3 text-[#0a3158]" aria-label="Refresh"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></button></div></div>
        {error ? <section className="mt-6 border border-red-200 bg-white p-6"><p className="font-bold text-red-700">Student records unavailable</p><p className="mt-2 text-sm text-slate-600">{error}</p></section> : <section className="mt-6 overflow-hidden border border-slate-200 bg-white"><div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4"><Users className="h-5 w-5 text-[#9b7728]" /><span className="text-sm font-bold text-[#0a3158]">{visible.length} records</span></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Admission</th><th className="px-5 py-3">Student</th><th className="px-5 py-3">Class</th><th className="px-5 py-3">Attendance</th><th className="px-5 py-3">Average</th><th className="px-5 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{visible.map((student) => <tr key={student.id}><td className="px-5 py-4 font-semibold text-[#0a3158]">{student.admissionNumber}</td><td className="px-5 py-4">{student.fullName}<span className="ml-2 text-xs text-slate-400">{student.gender === "MALE" ? "M" : "F"}</span></td><td className="px-5 py-4">{student.className}</td><td className="px-5 py-4">{student.attendanceRate.toFixed(1)}%</td><td className="px-5 py-4">{student.academicAverage.toFixed(1)}%</td><td className="px-5 py-4"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{student.status}</span></td></tr>)}{!loading && visible.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-500">No student records match the search.</td></tr>}</tbody></table></div></section>}
      </div>
    </main>
  )
}
