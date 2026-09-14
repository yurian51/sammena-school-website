"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Activity, ArrowRight, BookOpen, CalendarDays, CheckCircle2, CreditCard, FileText, GraduationCap, MessageSquare, RefreshCw, ShieldCheck, Users } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import type { ParentHubData } from "@/lib/api/parent-hub"

export default function ParentPortalPage() {
  const [data, setData] = useState<ParentHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/portal/parent", { cache: "no-store" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message ?? "Unable to load your family account.")
      setData(payload.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load your family account.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  return <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-[#183252]"><Navbar />
    <section className="border-b border-[#dce4ed] bg-[#163b68] pb-14 pt-36 text-white"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f0c85f]">Family services</p><h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Parent Portal</h1><p className="mt-4 max-w-2xl text-base leading-7 text-white/70">A private family workspace for authorised student learning and attendance information.</p></div><ShieldCheck className="h-16 w-16 text-[#f0c85f]" /></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
      {loading && <div className="rounded-3xl border border-[#dce4ed] bg-white p-12 text-center shadow-sm"><RefreshCw className="mx-auto h-7 w-7 animate-spin text-[#2aa7cf]" /><p className="mt-4 text-sm font-semibold">Loading your family workspace…</p></div>}
      {!loading && error && <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm"><ShieldCheck className="mx-auto h-8 w-8 text-red-600" /><h2 className="mt-4 text-xl font-bold">Family account unavailable</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">{error}</p><button type="button" onClick={() => void load()} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#163b68] px-5 py-3 text-xs font-bold text-white"><RefreshCw className="h-4 w-4" /> Retry</button></div>}
      {!loading && !error && data && <>
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#dce4ed] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2aa7cf] text-white"><Users className="h-5 w-5" /></span><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2b93b8]">Authenticated family account</p><p className="mt-1 font-bold text-[#183252]">{data.guardian.name}{data.guardian.relationship ? ` · ${data.guardian.relationship}` : ""}</p></div></div><button type="button" onClick={() => void load()} className="inline-flex items-center gap-2 rounded-xl border border-[#dce4ed] px-4 py-3 text-xs font-bold text-[#183252]"><RefreshCw className="h-4 w-4 text-[#2aa7cf]" /> Refresh data</button></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><ParentMetric icon={Users} label="Linked learners" value={String(data.students.length)} detail="Authorised students" /><ParentMetric icon={Activity} label="Attendance" value={`${data.attendance.rate}%`} detail="Last 30 days" /><ParentMetric icon={GraduationCap} label="Assessments" value={String(data.recentAssessments.length)} detail="Latest published records" /><ParentMetric icon={BookOpen} label="Books available" value={String(data.library.available)} detail="School library inventory" /></div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><section className="rounded-3xl border border-[#dce4ed] bg-white shadow-sm"><div className="flex items-center justify-between border-b border-[#e8eef4] px-5 py-5 sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">Authorised learners</p><h2 className="mt-1 text-lg font-bold">Student progress</h2></div><Users className="h-5 w-5 text-[#2aa7cf]" /></div><div className="divide-y divide-[#e8eef4]">{data.students.map(student => <article key={student.id} className="p-5 sm:p-6"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-bold text-[#183252]">{student.fullName}</h3><p className="mt-1 text-xs text-[#7890a6]">{student.admissionNumber} · {student.className}</p></div><span className="w-fit rounded-full bg-[#edf9f3] px-2.5 py-1 text-xs font-bold text-[#1b8560]">Attendance {student.attendanceRate.toFixed(1)}%</span></div><div className="mt-4 flex items-center justify-between text-xs text-[#7890a6]"><span>Academic average</span><strong className="text-[#183252]">{student.academicAverage.toFixed(1)}%</strong></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8eef4]"><div className="h-full rounded-full bg-[#2aa7cf]" style={{ width: `${Math.min(100, Math.max(0, student.academicAverage))}%` }} /></div></article>)}{!data.students.length && <p className="p-10 text-center text-sm text-[#7890a6]">No authorised learner is linked to this family account yet.</p>}</div></section>
          <section className="rounded-3xl border border-[#dce4ed] bg-white shadow-sm"><div className="border-b border-[#e8eef4] px-5 py-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">Attendance</p><h2 className="mt-1 text-lg font-bold">Last 30 days</h2></div><div className="grid grid-cols-2 gap-px bg-[#e8eef4]">{[["Present",data.attendance.present],["Late",data.attendance.late],["Absent",data.attendance.absent],["Excused",data.attendance.excused]].map(([label,value]) => <div key={String(label)} className="bg-white p-5"><p className="text-xs font-semibold text-[#7890a6]">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>)}</div><div className="p-5"><div className="h-3 overflow-hidden rounded-full bg-[#e8eef4]"><div className="h-full rounded-full bg-[#2aa7cf]" style={{ width: `${data.attendance.rate}%` }} /></div><p className="mt-2 text-xs text-[#7890a6]">Present and late records as a share of recorded attendance.</p></div></section></div>
        <section className="mt-6 rounded-3xl border border-[#dce4ed] bg-white shadow-sm"><div className="flex items-center justify-between border-b border-[#e8eef4] px-5 py-5 sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">Academic feed</p><h2 className="mt-1 text-lg font-bold">Recent assessments</h2></div><Link href="/portal/assessments" className="inline-flex items-center gap-1 text-xs font-bold text-[#2467a1]">All records <ArrowRight className="h-3.5 w-3.5" /></Link></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-[#f8fafc] text-xs uppercase tracking-wide text-[#7890a6]"><tr><th className="px-5 py-3">Date</th><th className="px-5 py-3">Student</th><th className="px-5 py-3">Subject</th><th className="px-5 py-3">Assessment</th><th className="px-5 py-3">Term</th><th className="px-5 py-3">Result</th></tr></thead><tbody className="divide-y divide-[#e8eef4]">{data.recentAssessments.map(item => <tr key={item.id}><td className="px-5 py-4 text-[#7890a6]">{item.assessedAt}</td><td className="px-5 py-4 font-semibold text-[#183252]">{item.studentName}</td><td className="px-5 py-4">{item.subject}</td><td className="px-5 py-4">{item.assessment}</td><td className="px-5 py-4">{item.term}</td><td className="px-5 py-4 font-bold">{item.percentage.toFixed(1)}%</td></tr>)}{!data.recentAssessments.length && <tr><td colSpan={6} className="px-5 py-10 text-center text-[#7890a6]">No assessment records are available.</td></tr>}</tbody></table></div></section>
        <section className="mt-6 grid gap-4 sm:grid-cols-3"><ParentLink icon={CalendarDays} title="School Calendar" text="Events and important dates" href="/calendar" /><ParentLink icon={CreditCard} title="Fees & Payments" text="View the public fee information" href="/admissions/fees" /><ParentLink icon={FileText} title="Documents" text="Approved school resources" href="/resources" /></section>
        <p className="mt-6 flex items-center gap-2 text-xs text-[#7890a6]"><ShieldCheck className="h-3.5 w-3.5" /> Private records shown above are scoped to the authenticated family relationship.</p>
      </>}
    </section><Footer /></main>
}

function ParentMetric({ icon: Icon, label, value, detail }: { icon: typeof Users; label: string; value: string; detail: string }) {
  return <div className="rounded-2xl border border-[#dce4ed] bg-white p-5 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef8fc] text-[#269ab9]"><Icon className="h-5 w-5" /></span><p className="mt-5 text-xs font-semibold text-[#7890a6]">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-[#7890a6]">{detail}</p></div>
}

function ParentLink({ icon: Icon, title, text, href }: { icon: typeof CalendarDays; title: string; text: string; href: string }) {
  return <Link href={href} className="group rounded-2xl border border-[#dce4ed] bg-white p-5 shadow-sm transition hover:bg-[#f8fbfd]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef8fc] text-[#269ab9]"><Icon className="h-5 w-5" /></span><div className="mt-4 flex items-center justify-between gap-3"><h3 className="text-sm font-bold">{title}</h3><ArrowRight className="h-4 w-4 text-[#b6c5d2] transition group-hover:translate-x-1 group-hover:text-[#2aa7cf]" /></div><p className="mt-1 text-xs leading-5 text-[#7890a6]">{text}</p></Link>
}
