"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Activity, CalendarDays, FileText, LogOut, Megaphone, RefreshCw,
  Settings, ShieldCheck, Users, ArrowRight, ClipboardList
} from "lucide-react"

type Overview = {
  role: string
  schoolId: string
  applications: number
  pendingApplications: number
  draftContent: number
  publishedContent: number
  upcomingEvents: number
  auditEvents30d: number
}

const modules = [
  { label: "Admissions", description: "Review applications and decisions.", href: "/admissions/admin", icon: ClipboardList },
  { label: "Admissions reports", description: "Review operational admissions reporting.", href: "/admissions/admin/reports", icon: FileText },
  { label: "Events & calendar", description: "Review the school calendar and events.", href: "/calendar", icon: CalendarDays },
  { label: "School portal", description: "Open operational student services.", href: "/portal", icon: Users },
  { label: "Audit & security", description: "Review privileged activity.", href: "/admin/audit", icon: ShieldCheck },
]

export default function AdminDashboardPage() {
  const [data, setData] = useState<Overview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/overview", { cache: "no-store" })
      const payload = await response.json().catch(() => null)
      if (response.status === 401 || response.status === 403 || response.status === 503) {
        window.location.assign("/login?type=admin&returnTo=/admin")
        return
      }
      if (!response.ok) throw new Error(payload?.error?.message ?? "Admin workspace could not be loaded.")
      setData(payload.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Admin workspace could not be loaded.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  const logout = async (): Promise<void> => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.assign("/login?type=admin")
  }

  if (loading) return <main className="min-h-screen bg-[#f6f4ef] p-6 text-[#172033]"><div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center"><div className="text-center"><RefreshCw className="mx-auto h-7 w-7 animate-spin text-[#b9964f]" /><p className="mt-4 text-sm font-semibold">Opening secure administration…</p></div></div></main>

  if (error || !data) return <main className="min-h-screen bg-[#f6f4ef] p-6 text-[#172033]"><div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center"><section className="w-full border border-slate-200 bg-white p-8 text-center shadow-sm"><ShieldCheck className="mx-auto h-8 w-8 text-[#b9964f]" /><h1 className="mt-4 text-2xl font-bold">Administration unavailable</h1><p className="mt-3 text-sm leading-6 text-slate-600">{error ?? "The secure administration workspace could not be loaded."}</p><button onClick={() => void load()} className="mt-6 inline-flex items-center gap-2 bg-[#17365d] px-5 py-3 text-sm font-bold text-white"><RefreshCw className="h-4 w-4" /> Retry</button></section></div></main>

  const cards = [
    { label: "All applications", value: data.applications, icon: ClipboardList },
    { label: "Awaiting review", value: data.pendingApplications, icon: Activity },
    { label: "Content in workflow", value: data.draftContent, icon: FileText },
    { label: "Upcoming events", value: data.upcomingEvents, icon: CalendarDays },
  ]

  return <main className="min-h-screen bg-[#f6f4ef] text-[#172033]">
    <header className="bg-[#102846] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/15"><ShieldCheck className="h-5 w-5 text-[#d7c28e]" /></div><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#d7c28e]">Sammena</p><h1 className="text-lg font-bold">Website Administration</h1></div></div>
        <div className="flex items-center gap-3"><Link href="/" className="hidden text-sm font-semibold text-white/70 hover:text-white sm:block">View website</Link><button onClick={() => void logout()} className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/10"><LogOut className="h-4 w-4" /> Sign out</button></div>
      </div>
    </header>
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Private workspace · {data.role.replaceAll("_", " ")}</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-[#17365d] sm:text-4xl">School administration</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">A single control centre for public publishing, admissions and operational administration. Every privileged action remains behind server-side authorization.</p></div><button onClick={() => void load()} className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#17365d]"><RefreshCw className="h-4 w-4" /> Refresh</button></div>
      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({label,value,icon:Icon}) => <article key={label} className="border border-slate-200 bg-white p-5 shadow-sm"><div className="grid h-10 w-10 place-items-center bg-[#f3ead5] text-[#8c6c28]"><Icon className="h-5 w-5" /></div><p className="mt-5 text-sm font-semibold text-slate-500">{label}</p><p className="mt-1 text-3xl font-bold text-[#17365d]">{value.toLocaleString()}</p></article>)}</section>
      <section className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <article className="border border-slate-200 bg-white p-6 sm:p-7"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Administration modules</p><h3 className="mt-2 text-xl font-bold text-[#17365d]">Manage the school website</h3></div><Settings className="h-5 w-5 text-[#b9964f]" /></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{modules.map(({label,description,href,icon:Icon}) => <Link key={label} href={href} className="group border border-slate-200 p-4 hover:border-[#b9964f] hover:bg-[#fbfaf7]"><div className="flex items-start justify-between gap-4"><span className="grid h-9 w-9 place-items-center bg-[#f5f1e6] text-[#8c6c28]"><Icon className="h-4 w-4" /></span><ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#8c6c28]" /></div><h4 className="mt-4 text-sm font-bold text-[#17365d]">{label}</h4><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></Link>)}</div></article>
        <aside className="border border-[#d9c28a] bg-[#fffdf6] p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#8c6c28]">System activity</p><div className="mt-6 space-y-5"><div className="flex items-center justify-between"><span className="text-sm text-slate-600">Published content</span><strong className="text-xl text-[#17365d]">{data.publishedContent}</strong></div><div className="flex items-center justify-between"><span className="text-sm text-slate-600">Audit events · 30 days</span><strong className="text-xl text-[#17365d]">{data.auditEvents30d}</strong></div><div className="border-t border-[#eadfbf] pt-5"><div className="flex items-start gap-3"><Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-[#8c6c28]" /><p className="text-xs leading-5 text-slate-600">Counts shown here are queried from production persistence. No dashboard fixture data is used.</p></div></div></div></aside>
      </section>
    </div>
  </main>
}
