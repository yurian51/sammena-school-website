"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, GraduationCap, RefreshCw, ShieldCheck, UserRound } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import type { StudentHubData } from "@/lib/api/student-hub"

type StudentPayload = { data?: StudentHubData; error?: string | { message?: string } }

function getError(payload: StudentPayload) {
  if (typeof payload.error === "string" && payload.error.trim()) return payload.error
  if (payload.error && typeof payload.error.message === "string" && payload.error.message.trim()) return payload.error.message
  return "Unable to load the student workspace."
}

export default function StudentPortalPage() {
  const [data, setData] = useState<StudentHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/portal/student", { cache: "no-store" })
      const payload = await response.json() as StudentPayload
      if (!response.ok || !payload.data) throw new Error(getError(payload))
      setData(payload.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load the student workspace.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#183252]">
      <Navbar />
      <section className="border-b border-[#dce4ed] bg-[#163b68] pb-14 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f0c85f]">Student services</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Student Portal</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">A private workspace for the academic and learning records currently available to your authenticated school account.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        {loading && <div className="rounded-3xl border border-[#dce4ed] bg-white p-12 text-center shadow-sm"><RefreshCw className="mx-auto h-7 w-7 animate-spin text-[#2aa7cf]" aria-hidden="true" /><p className="mt-4 text-sm font-semibold">Loading your student workspace…</p></div>}
        {!loading && error && <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm"><ShieldCheck className="mx-auto h-8 w-8 text-red-600" aria-hidden="true" /><h2 className="mt-4 text-xl font-bold">Student account unavailable</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">{error}</p><button type="button" onClick={() => void load()} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#163b68] px-5 py-3 text-xs font-bold text-white"><RefreshCw className="h-4 w-4" aria-hidden="true" /> Retry</button></div>}

        {!loading && !error && data && <>
          <section className="rounded-3xl border border-[#dce4ed] bg-white p-5 shadow-sm sm:p-6" aria-labelledby="student-profile-heading">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf9fd] text-[#269ab9]"><UserRound className="h-6 w-6" aria-hidden="true" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">Authenticated learner</p><h2 id="student-profile-heading" className="mt-1 text-xl font-bold text-[#183252]">{data.student.fullName}</h2><p className="mt-1 text-xs text-[#7890a6]">{data.student.admissionNumber} · {data.student.className} · {data.academicYearName}</p></div></div>
              <button type="button" onClick={() => void load()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dce4ed] px-4 py-3 text-xs font-bold text-[#183252]"><RefreshCw className="h-4 w-4 text-[#2aa7cf]" aria-hidden="true" /> Refresh records</button>
            </div>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Student records">
            <Metric icon={CheckCircle2} label="Attendance" value={`${data.attendance.rate}%`} detail="Recorded over the last 30 days" />
            <Metric icon={GraduationCap} label="Academic average" value={`${data.academicAverage.toFixed(1)}%`} detail="Current academic-year assessments" />
            <Metric icon={BookOpen} label="Library issued" value={String(data.library.issued)} detail="Items currently on loan" />
            <Metric icon={BookOpen} label="Library inventory" value={String(data.library.books)} detail="Books recorded by the school" />
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <article className="rounded-3xl border border-[#dce4ed] bg-white shadow-sm"><div className="flex items-center justify-between border-b border-[#e8eef4] px-5 py-5 sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">Attendance</p><h2 className="mt-1 text-lg font-bold">Last 30 days</h2></div><CheckCircle2 className="h-5 w-5 text-[#2aa7cf]" aria-hidden="true" /></div><div className="grid grid-cols-2 gap-px bg-[#e8eef4] sm:grid-cols-4">{[["Present", data.attendance.present], ["Late", data.attendance.late], ["Absent", data.attendance.absent], ["Excused", data.attendance.excused]].map(([label, value]) => <div key={String(label)} className="bg-white p-5"><p className="text-xs font-semibold text-[#7890a6]">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>)}</div><div className="p-5 sm:p-6"><div className="h-3 overflow-hidden rounded-full bg-[#e8eef4]"><div className="h-full rounded-full bg-[#2aa7cf]" style={{ width: `${Math.min(100, Math.max(0, data.attendance.rate))}%` }} /></div><p className="mt-2 text-xs text-[#7890a6]">Present and late records as a share of recorded attendance.</p></div></article>

            <article className="rounded-3xl border border-[#dce4ed] bg-[#163b68] p-6 text-white shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0c85f]">Connected services</p><h2 className="mt-1 text-lg font-bold">Available from this workspace</h2><div className="mt-5 space-y-2"><ServiceLink href="/portal/assessments" icon={GraduationCap} label="Academic assessments" /><ServiceLink href="/portal/library" icon={BookOpen} label="Library & textbooks" /><ServiceLink href="/calendar" icon={CalendarDays} label="School calendar" /><ServiceLink href="/resources" icon={BookOpen} label="Learning resources" /></div></article>
          </section>

          <section className="mt-6 rounded-3xl border border-[#dce4ed] bg-white shadow-sm"><div className="flex items-center justify-between border-b border-[#e8eef4] px-5 py-5 sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">Academic feed</p><h2 className="mt-1 text-lg font-bold">Recent assessments</h2></div><Link href="/portal/assessments" className="inline-flex items-center gap-1 text-xs font-bold text-[#2467a1]">All records <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-[#f8fafc] text-xs uppercase tracking-wide text-[#7890a6]"><tr><th className="px-5 py-3">Date</th><th className="px-5 py-3">Subject</th><th className="px-5 py-3">Assessment</th><th className="px-5 py-3">Term</th><th className="px-5 py-3">Result</th></tr></thead><tbody className="divide-y divide-[#e8eef4]">{data.recentAssessments.map(item => <tr key={item.id}><td className="px-5 py-4 text-[#7890a6]">{item.assessedAt}</td><td className="px-5 py-4 font-semibold">{item.subject}</td><td className="px-5 py-4">{item.assessment}</td><td className="px-5 py-4">{item.term}</td><td className="px-5 py-4 font-bold">{item.percentage.toFixed(1)}%</td></tr>)}{!data.recentAssessments.length && <tr><td colSpan={5} className="px-5 py-10 text-center text-[#7890a6]">No assessment records are available.</td></tr>}</tbody></table></div></section>

          <p className="mt-6 flex items-center gap-2 text-xs text-[#7890a6]"><ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Private records are retrieved server-side and scoped to the authenticated student account.</p>
        </>}
      </section>
      <Footer />
    </main>
  )
}

function Metric({ icon: Icon, label, value, detail }: { icon: typeof CheckCircle2; label: string; value: string; detail: string }) {
  return <article className="rounded-2xl border border-[#dce4ed] bg-white p-5 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef8fc] text-[#269ab9]"><Icon className="h-5 w-5" aria-hidden="true" /></span><p className="mt-5 text-xs font-semibold text-[#7890a6]">{label}</p><p className="mt-1 text-2xl font-bold text-[#183252]">{value}</p><p className="mt-1 text-xs leading-5 text-[#7890a6]">{detail}</p></article>
}

function ServiceLink({ href, icon: Icon, label }: { href: string; icon: typeof BookOpen; label: string }) {
  return <Link href={href} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold transition hover:bg-white/[0.1]"><span className="flex items-center gap-3"><Icon className="h-4 w-4 text-[#f0c85f]" aria-hidden="true" />{label}</span><ArrowRight className="h-4 w-4 text-white/50" aria-hidden="true" /></Link>
}
