"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Activity, ArrowRight, BookOpen, CalendarDays, GraduationCap, Library, RefreshCw, ShieldCheck, TrendingUp, Users } from "lucide-react"

interface PortalSummary {
  schoolId: string
  role: string
  students: { total: number; prePrimary: number; standardOne: number }
  attendance: { present: number; absent: number; late: number; rate: number }
  academics: { average: number }
  library: { books: number; available: number; issued: number }
  quality: { overall: number; openActions: number }
}

export default function PortalPage() {
  const [summary, setSummary] = useState<PortalSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/portal/summary", { cache: "no-store" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message ?? "Unable to load the school portal.")
      setSummary(payload.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load the school portal.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  if (loading) return <main className="min-h-screen bg-[#f5f6f7] p-6 text-[#0a3158]"><div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center"><div className="text-center"><RefreshCw className="mx-auto h-7 w-7 animate-spin text-[#9b7728]" /><p className="mt-4 text-sm font-semibold">Loading Sammena School Portal…</p></div></div></main>

  if (error || !summary) return <main className="min-h-screen bg-[#f5f6f7] p-6 text-[#0a3158]"><div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center"><section className="w-full border border-slate-200 bg-white p-7 text-center shadow-sm"><ShieldCheck className="mx-auto h-8 w-8 text-[#9b7728]" /><h1 className="mt-4 text-2xl font-bold">Portal access unavailable</h1><p className="mt-3 text-sm leading-6 text-slate-600">{error ?? "Your authenticated school session could not be loaded."}</p><button type="button" onClick={() => void load()} className="mt-6 inline-flex items-center gap-2 bg-[#0a3158] px-5 py-3 text-sm font-bold text-white"><RefreshCw className="h-4 w-4" /> Retry</button><Link href="/" className="ml-2 inline-flex items-center gap-2 border border-slate-200 px-5 py-3 text-sm font-bold text-[#0a3158]">Website</Link></section></div></main>

  const cards = [
    { label: "Students", value: summary.students.total.toLocaleString(), detail: `${summary.students.prePrimary} Pre-primary · ${summary.students.standardOne} Standard I`, icon: Users },
    { label: "Attendance", value: `${summary.attendance.rate}%`, detail: `${summary.attendance.present} present · ${summary.attendance.absent} absent · ${summary.attendance.late} late`, icon: Activity },
    { label: "Academic average", value: `${summary.academics.average}%`, detail: "Current portal reporting period", icon: TrendingUp },
    { label: "Quality actions", value: summary.quality.openActions.toString(), detail: `${summary.quality.overall}% overall internal score`, icon: ShieldCheck },
  ]
  const attendanceTotal = summary.attendance.present + summary.attendance.absent + summary.attendance.late
  const attendanceItems = [
    { label: "Present", value: summary.attendance.present, percent: attendanceTotal ? summary.attendance.present / attendanceTotal * 100 : 0 },
    { label: "Absent", value: summary.attendance.absent, percent: attendanceTotal ? summary.attendance.absent / attendanceTotal * 100 : 0 },
    { label: "Late", value: summary.attendance.late, percent: attendanceTotal ? summary.attendance.late / attendanceTotal * 100 : 0 },
  ]

  return (
    <main className="min-h-screen bg-[#f5f6f7] text-slate-800">
      <header className="border-b border-[#0a3158]/20 bg-[#06203b] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2c46c]">Sammena Schools</p><h1 className="mt-1 text-lg font-bold">School Portal</h1></div><div className="flex items-center gap-3"><span className="hidden text-xs font-semibold text-white/60 sm:inline">{summary.role.replaceAll("_", " ")}</span><Link href="/" className="text-xs font-semibold text-white/75 hover:text-white">Back to website</Link></div></div></header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Authenticated workspace</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0a3158] sm:text-4xl">School performance centre</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Operational visibility for student enrolment, attendance, academic performance, learning resources and school quality.</p></div><button type="button" onClick={() => void load()} className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#0a3158] hover:border-[#9b7728]"><RefreshCw className="h-4 w-4" /> Refresh data</button></header>
        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="School KPIs">{cards.map(({ label, value, detail, icon: Icon }) => <article key={label} className="border border-slate-200 bg-white p-5 shadow-sm"><div className="w-fit rounded-xl bg-[#f4ecd6] p-2.5 text-[#8a6a24]"><Icon className="h-5 w-5" /></div><p className="mt-5 text-sm font-semibold text-slate-500">{label}</p><p className="mt-1 text-3xl font-bold text-[#0a3158]">{value}</p><p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p></article>)}</section>
        <section className="mt-7 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <article className="border border-slate-200 bg-white p-6"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Attendance</p><h2 className="mt-2 text-xl font-bold text-[#0a3158]">Daily attendance pulse</h2></div><CalendarDays className="h-5 w-5 text-[#9b7728]" /></div><div className="mt-7 grid gap-5 sm:grid-cols-3">{attendanceItems.map(item => <div key={item.label}><div className="flex items-end justify-between"><span className="text-sm font-semibold text-slate-600">{item.label}</span><span className="text-2xl font-bold text-[#0a3158]">{item.value}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#0a3158]" style={{ width: `${item.percent}%` }} /></div><p className="mt-2 text-xs text-slate-400">{item.percent.toFixed(1)}% of today’s recorded attendance</p></div>)}</div></article>
          <aside className="border border-slate-200 bg-[#0a3158] p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e2c46c]">Operational modules</p><div className="mt-5 space-y-2">{[{label:"Student records",href:"/portal/students",icon:Users},{label:"Assessments",href:"/portal/assessments",icon:GraduationCap},{label:"Library & textbooks",href:"/portal/library",icon:Library},{label:"Quality workspace",href:"/quality",icon:ShieldCheck}].map(({label,href,icon:Icon}) => <Link key={href} href={href} className="flex items-center justify-between border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-semibold hover:bg-white/[.09]"><span className="flex items-center gap-3"><Icon className="h-4 w-4 text-[#e2c46c]" />{label}</span><ArrowRight className="h-4 w-4 text-white/50" /></Link>)}</div></aside>
        </section>
        <section className="mt-6 grid gap-6 md:grid-cols-2"><article className="border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Learning resources</p><h2 className="mt-2 text-xl font-bold text-[#0a3158]">Textbook & library pulse</h2></div><BookOpen className="h-5 w-5 text-[#9b7728]" /></div><div className="mt-6 grid grid-cols-3 gap-3 text-center"><div className="bg-[#f7f7f5] p-4"><p className="text-2xl font-bold text-[#0a3158]">{summary.library.books}</p><p className="mt-1 text-[11px] text-slate-500">Books</p></div><div className="bg-[#f7f7f5] p-4"><p className="text-2xl font-bold text-[#0a3158]">{summary.library.available}</p><p className="mt-1 text-[11px] text-slate-500">Available</p></div><div className="bg-[#f7f7f5] p-4"><p className="text-2xl font-bold text-[#0a3158]">{summary.library.issued}</p><p className="mt-1 text-[11px] text-slate-500">Issued</p></div></div></article><article className="border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Data boundary</p><h2 className="mt-2 text-xl font-bold text-[#0a3158]">Authenticated school records</h2><p className="mt-4 text-sm leading-7 text-slate-600">The dashboard reads through the private portal API. Operational figures are not embedded as browser fixtures.</p><Link href="/quality" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">Open quality management <ArrowRight className="h-4 w-4" /></Link></article></section>
        <footer className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:justify-between"><span>School ID: {summary.schoolId}</span><span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Private operational workspace</span></footer>
      </div>
    </main>
  )
}
