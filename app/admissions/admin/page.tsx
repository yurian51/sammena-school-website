"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Eye,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
  XCircle,
} from "lucide-react"

type Status = "SUBMITTED" | "UNDER_REVIEW" | "MORE_INFORMATION" | "ACCEPTED" | "REJECTED"
type Application = { reference: string; learner: string; guardian: string; phone: string; entry: string; studyType: string; status: Status; submittedAt: string }

const demoApplications: Application[] = [
  { reference: "SAM-2026-7F3K2A", learner: "Pending applicant", guardian: "Parent / Guardian", phone: "—", entry: "Primary", studyType: "Day", status: "SUBMITTED", submittedAt: "Today" },
  { reference: "SAM-2026-4M8Q1P", learner: "Under review", guardian: "Parent / Guardian", phone: "—", entry: "Pre-Primary", studyType: "Day", status: "UNDER_REVIEW", submittedAt: "Yesterday" },
  { reference: "SAM-2026-9C2R5D", learner: "More information", guardian: "Parent / Guardian", phone: "—", entry: "Primary", studyType: "Boarding", status: "MORE_INFORMATION", submittedAt: "2 days ago" },
]

const statusMeta: Record<Status, { label: string; icon: typeof Clock3; tone: string }> = {
  SUBMITTED: { label: "Submitted", icon: Clock3, tone: "border-amber-200 bg-amber-50 text-amber-800" },
  UNDER_REVIEW: { label: "Under review", icon: Eye, tone: "border-blue-200 bg-blue-50 text-blue-800" },
  MORE_INFORMATION: { label: "More information", icon: AlertCircle, tone: "border-orange-200 bg-orange-50 text-orange-800" },
  ACCEPTED: { label: "Accepted", icon: CheckCircle2, tone: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  REJECTED: { label: "Rejected", icon: XCircle, tone: "border-rose-200 bg-rose-50 text-rose-800" },
}

const workspaceLinks = [
  { href: "/admissions/admin", label: "Overview", icon: LayoutDashboard },
  { href: "#applications", label: "Admissions Queue", icon: ClipboardList, active: true },
  { href: "/news", label: "Announcements", icon: Bell },
  { href: "/calendar", label: "Academic Calendar", icon: CalendarDays },
  { href: "/resources", label: "Documents", icon: FileText },
]

export default function AdmissionsAdminPage() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<Status | "ALL">("ALL")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const filtered = useMemo(() => demoApplications.filter(a => {
    const q = query.trim().toLowerCase()
    const matchesQuery = !q || [a.reference, a.learner, a.guardian, a.phone].some(v => v.toLowerCase().includes(q))
    return matchesQuery && (status === "ALL" || a.status === status)
  }), [query, status])
  const counts = useMemo(() => demoApplications.reduce<Record<string, number>>((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc }, {}), [])
  const reviewCount = (counts.SUBMITTED || 0) + (counts.MORE_INFORMATION || 0)

  return (
    <main className="min-h-screen bg-[#f4f1e8] text-[#15253f]">
      <div className="flex min-h-screen">
        {mobileNavOpen && <button type="button" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} className="fixed inset-0 z-40 bg-[#071d3b]/55 backdrop-blur-sm lg:hidden" />}
        <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[280px] shrink-0 flex-col bg-[#071d3b] text-white transition-transform duration-300 lg:static lg:translate-x-0", mobileNavOpen ? "translate-x-0" : "-translate-x-full")}>
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
            <Link href="/" className="flex items-center gap-3" aria-label="Sammena Schools home">
              <Image src="/images/sammena-logo.png" alt="Sammena Pre & Primary School logo" width={44} height={44} className="h-11 w-11 rounded-full bg-white object-cover shadow-lg ring-1 ring-[#d8b55b]/80" />
              <span className="leading-none"><strong className="block text-[16px] tracking-[0.12em]">SAMMENA</strong><small className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d8b55b]">Staff Portal</small></span>
            </Link>
            <button type="button" onClick={() => setMobileNavOpen(false)} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Close menu"><X className="h-5 w-5" /></button>
          </div>
          <div className="px-5 py-6"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Institutional workspace</p><p className="mt-2 text-sm leading-6 text-white/55">Manage admissions, school information and approved public updates.</p></div>
          <nav className="space-y-1 px-3" aria-label="Staff portal navigation">
            {workspaceLinks.map(({ href, label, icon: Icon, active }) => <Link key={label} href={href} onClick={() => setMobileNavOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors", active ? "bg-[#d8b55b] text-[#071d3b] shadow-lg shadow-[#d8b55b]/10" : "text-white/65 hover:bg-white/10 hover:text-white")}><Icon className="h-4 w-4" />{label}</Link>)}
          </nav>
          <div className="mt-auto border-t border-white/10 p-4"><Link href="/" className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"><ArrowLeft className="h-4 w-4" />View public website</Link><div className="flex items-center gap-3 rounded-xl bg-white/5 p-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8b55b] text-xs font-bold text-[#071d3b]">SA</span><div className="min-w-0"><p className="truncate text-xs font-bold">School Administrator</p><p className="truncate text-[11px] text-white/45">Staff workspace</p></div><Settings className="ml-auto h-4 w-4 text-white/45" /></div></div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-[#d9d4c7] bg-[#f4f1e8]/90 backdrop-blur-xl">
            <div className="flex h-[76px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
              <div className="flex items-center gap-3"><button type="button" onClick={() => setMobileNavOpen(true)} className="rounded-xl border border-[#d9d4c7] bg-white p-2.5 text-[#071d3b] lg:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" /></button><div><p className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7628] sm:block">Sammena Schools · Staff Portal</p><p className="text-sm font-bold text-[#071d3b] sm:mt-1">Admissions command centre</p></div></div>
              <div className="flex items-center gap-3"><Link href="/news" className="hidden items-center gap-2 rounded-xl border border-[#d9d4c7] bg-white px-3 py-2 text-xs font-bold text-[#071d3b] transition hover:border-[#c9a24b] sm:inline-flex"><Bell className="h-4 w-4 text-[#9a7628]" />Updates</Link><span className="hidden h-9 w-px bg-[#d9d4c7] sm:block" /><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071d3b] text-xs font-bold text-[#d8b55b]">SA</span><span className="hidden text-xs font-semibold text-[#071d3b] md:block">School Administrator</span></div></div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><Link href="/admissions" className="inline-flex items-center gap-2 text-xs font-bold text-[#8a6a24] transition hover:text-[#071d3b]"><ArrowLeft className="h-3.5 w-3.5" />Admissions</Link><p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#9a7628]">Overview</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[#071d3b] md:text-4xl">Admissions dashboard</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">A focused workspace for reviewing applications and keeping the school community informed.</p></div><div className="flex flex-wrap gap-2"><Link href="/admissions" className="inline-flex items-center gap-2 rounded-xl border border-[#d9d4c7] bg-white px-4 py-3 text-xs font-bold text-[#071d3b] transition hover:border-[#c9a24b]"><Eye className="h-4 w-4 text-[#9a7628]" />Public admissions</Link><Link href="/resources" className="inline-flex items-center gap-2 rounded-xl bg-[#071d3b] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-[#071d3b]/15 transition hover:-translate-y-0.5 hover:bg-[#123f73]"><FileText className="h-4 w-4 text-[#d8b55b]" />Manage documents</Link></div></div>

            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Admissions overview metrics">
              <Metric icon={Users} label="Total applications" value={demoApplications.length} detail="In current queue" tone="navy" />
              <Metric icon={Clock3} label="Awaiting action" value={reviewCount} detail="Needs staff attention" tone="gold" />
              <Metric icon={Eye} label="Under review" value={counts.UNDER_REVIEW || 0} detail="Currently being assessed" tone="blue" />
              <Metric icon={CheckCircle2} label="Accepted" value={counts.ACCEPTED || 0} detail="Decisions recorded" tone="green" />
            </section>

            <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
              <div id="applications" className="min-w-0 rounded-3xl border border-[#d9d4c7] bg-white shadow-[0_20px_55px_-35px_rgba(7,29,59,.4)]">
                <div className="flex flex-col gap-4 border-b border-[#e7e3d9] p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6f2e8] text-[#9a7628]"><ClipboardList className="h-5 w-5" /></span><div><h2 className="font-bold text-[#071d3b]">Admissions queue</h2><p className="mt-1 text-xs text-slate-500">Review and track incoming applications.</p></div></div></div><span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d9d4c7] bg-[#fbfaf6] px-3 py-1.5 text-xs font-semibold text-slate-500"><ShieldCheck className="h-3.5 w-3.5 text-[#9a7628]" /> Protected staff workflow</span></div>
                <div className="flex flex-col gap-3 border-b border-[#e7e3d9] p-5 sm:p-6 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search reference, learner, guardian or phone" className="w-full rounded-xl border border-[#d9d4c7] bg-[#fbfaf6] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#c9a24b] focus:ring-2 focus:ring-[#c9a24b]/20" /></div><select value={status} onChange={e => setStatus(e.target.value as Status | "ALL")} className="rounded-xl border border-[#d9d4c7] bg-[#fbfaf6] px-4 py-3 text-sm outline-none focus:border-[#c9a24b] focus:ring-2 focus:ring-[#c9a24b]/20"><option value="ALL">All statuses</option>{Object.entries(statusMeta).map(([key, meta]) => <option key={key} value={key}>{meta.label}</option>)}</select></div>
                <div className="flex flex-wrap gap-2 border-b border-[#e7e3d9] px-5 py-4 sm:px-6">{(["ALL", "SUBMITTED", "UNDER_REVIEW", "MORE_INFORMATION", "ACCEPTED"] as const).map(key => <button key={key} type="button" onClick={() => setStatus(key)} className={cn("rounded-full border px-3 py-1.5 text-xs font-bold transition", status === key ? "border-[#071d3b] bg-[#071d3b] text-white" : "border-[#d9d4c7] bg-white text-slate-500 hover:border-[#c9a24b] hover:text-[#071d3b]")}>{key === "ALL" ? "All" : statusMeta[key].label}<span className="ml-1.5 opacity-65">{key === "ALL" ? demoApplications.length : counts[key] || 0}</span></button>)}</div>
                <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-[#fbfaf6] text-[10px] uppercase tracking-[0.15em] text-slate-500"><tr><th className="px-5 py-4 sm:px-6">Reference</th><th className="px-5 py-4">Learner</th><th className="px-5 py-4">Guardian</th><th className="px-5 py-4">Entry</th><th className="px-5 py-4">Study</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Action</th></tr></thead><tbody>{filtered.map(a => { const Meta = statusMeta[a.status]; const Icon = Meta.icon; return <tr key={a.reference} className="border-t border-[#eeeae1] transition hover:bg-[#fbfaf6]"><td className="px-5 py-4 font-mono text-xs font-bold text-[#071d3b] sm:px-6">{a.reference}</td><td className="px-5 py-4 font-semibold text-[#071d3b]">{a.learner}</td><td className="px-5 py-4 text-slate-500">{a.guardian}</td><td className="px-5 py-4 text-slate-500">{a.entry}</td><td className="px-5 py-4 text-slate-500">{a.studyType}</td><td className="px-5 py-4"><span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold", Meta.tone)}><Icon className="h-3.5 w-3.5" />{Meta.label}</span></td><td className="px-5 py-4"><Link href={`/admissions/admin/${encodeURIComponent(a.reference)}`} className="inline-flex items-center gap-2 rounded-lg border border-[#d9d4c7] px-3 py-2 text-xs font-bold text-[#071d3b] transition hover:border-[#c9a24b] hover:bg-[#f6f2e8]"><Eye className="h-3.5 w-3.5" />Review</Link></td></tr> })}</tbody></table>{filtered.length === 0 && <div className="p-12 text-center text-sm text-slate-500">No applications match the current search and filter.</div>}</div>
              </div>

              <aside className="space-y-5"><div className="rounded-3xl bg-[#071d3b] p-6 text-white shadow-[0_22px_60px_-35px_rgba(7,29,59,.75)]"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Review checklist</p><h2 className="mt-3 text-xl font-bold">Keep the queue moving.</h2><p className="mt-2 text-sm leading-6 text-white/60">Use the queue to review applications, request missing information and record decisions.</p><div className="mt-6 space-y-3"><Checklist label="Review new applications" value={counts.SUBMITTED || 0} /><Checklist label="Follow up on information" value={counts.MORE_INFORMATION || 0} /><Checklist label="Confirm decisions" value={counts.ACCEPTED || 0} /></div></div><div className="rounded-3xl border border-[#d9d4c7] bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6f2e8] text-[#9a7628]"><CalendarDays className="h-5 w-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a7628]">Quick access</p><h2 className="mt-1 font-bold text-[#071d3b]">Institutional tools</h2></div></div><div className="mt-5 space-y-2"><Link href="/calendar" className="flex items-center justify-between rounded-xl bg-[#fbfaf6] px-4 py-3 text-sm font-semibold text-[#071d3b] transition hover:bg-[#f6f2e8]">Academic calendar <ArrowLeft className="h-4 w-4 rotate-180 text-[#9a7628]" /></Link><Link href="/news" className="flex items-center justify-between rounded-xl bg-[#fbfaf6] px-4 py-3 text-sm font-semibold text-[#071d3b] transition hover:bg-[#f6f2e8]">Announcements <ArrowLeft className="h-4 w-4 rotate-180 text-[#9a7628]" /></Link><Link href="/resources" className="flex items-center justify-between rounded-xl bg-[#fbfaf6] px-4 py-3 text-sm font-semibold text-[#071d3b] transition hover:bg-[#f6f2e8]">Documents <ArrowLeft className="h-4 w-4 rotate-180 text-[#9a7628]" /></Link></div></div></aside>
            </section>
            <p className="mt-6 text-xs leading-5 text-slate-500">Prototype note: this dashboard currently uses representative UI data. Production must load authenticated server-side application records and enforce staff authorization before exposing applicant information.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function Metric({ icon: Icon, label, value, detail, tone }: { icon: typeof Users; label: string; value: number; detail: string; tone: "navy" | "gold" | "blue" | "green" }) {
  const tones = { navy: "bg-[#071d3b] text-white", gold: "bg-[#f6f2e8] text-[#071d3b]", blue: "bg-blue-50 text-blue-900", green: "bg-emerald-50 text-emerald-900" }
  const iconTones = { navy: "bg-white/10 text-[#d8b55b]", gold: "bg-white text-[#9a7628]", blue: "bg-white text-blue-700", green: "bg-white text-emerald-700" }
  return <div className={cn("rounded-2xl p-5 shadow-sm", tones[tone])}><div className="flex items-start justify-between gap-3"><span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconTones[tone])}><Icon className="h-5 w-5" /></span><span className="text-3xl font-bold tracking-tight">{value}</span></div><p className="mt-5 text-sm font-bold">{label}</p><p className={cn("mt-1 text-xs", tone === "navy" ? "text-white/55" : "text-slate-500")}>{detail}</p></div>
}

function Checklist({ label, value }: { label: string; value: number }) {
  return <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3"><span className="flex items-center gap-2 text-xs font-semibold text-white/75"><span className="h-1.5 w-1.5 rounded-full bg-[#d8b55b]" />{label}</span><span className="rounded-full bg-[#d8b55b] px-2 py-0.5 text-[11px] font-bold text-[#071d3b]">{value}</span></div>
}
