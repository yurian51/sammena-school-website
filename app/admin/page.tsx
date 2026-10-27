"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
 feat/sammena-admin-account-management
import { Activity, ArrowRight, BookOpen, CalendarCheck, CalendarDays, ClipboardCheck, ClipboardList, FileText, GraduationCap, LayoutDashboard, LogOut, Mail, Megaphone, Receipt, RefreshCw, Search, Send, Settings, ShieldCheck, TriangleAlert, UserCheck, UserPlus, Users } from "lucide-react"

type Overview = {
  role: string
  schoolId: string
  applications: number
  pendingApplications: number
  draftContent: number
  publishedContent: number
  upcomingEvents: number
  activeStudents: number
  auditEvents30d: number
  website: {
    databaseStatus: "ok" | "unavailable"
    healthStatus: "ok" | "degraded"
    publishedNews: number
    publishedAnnouncements: number
    latestPublishedAt: string | null
    checkedAt: string
  }
  institution: { id: string; name: string; slug: string } | null
  institutions: { id: string; name: string; slug: string; activeStudents: number }[]
}

const modules = [
  { label: "Students", description: "Search the live student register and 360° profiles.", href: "/admin/students", icon: Users },
  { label: "Admissions", description: "Review applications and decisions.", href: "/admin/admissions", icon: ClipboardList },
  { label: "Attendance", description: "Record daily class registers for the current academic year.", href: "/admin/attendance", icon: CalendarCheck },
  { label: "Library", description: "Manage the school library catalogue and book loans.", href: "/admin/library", icon: BookOpen },
  { label: "Enrollment", description: "Place students in classes and move or close enrollments.", href: "/admin/enrollments", icon: GraduationCap },
  { label: "Timetable", description: "Build class timetables for the current academic year.", href: "/admin/timetable", icon: CalendarDays },
  { label: "Results", description: "Enter assessment scores for a class. Parents see them in the portal.", href: "/admin/results", icon: ClipboardCheck },
  { label: "Fees & payments", description: "Fee items, invoices, payments and numbered receipts.", href: "/admin/finance", icon: Receipt },
  { label: "Parent messages", description: "Official notices that appear in the Parent Portal.", href: "/admin/messages", icon: Send },
  { label: "Teaching assignments", description: "Decide which teacher may act on which class.", href: "/admin/teaching-assignments", icon: UserCheck },
  { label: "Inbox", description: "Read and track messages from the public contact form.", href: "/admin/inbox", icon: Mail },
  { label: "News & publishing", description: "Create, edit and publish official posts.", href: "/admin/content", icon: Megaphone },
  { label: "Events & calendar", description: "Manage the public school calendar.", href: "/admin/events", icon: CalendarDays },
  { label: "Audit & security", description: "Inspect privileged administrative activity.", href: "/admin/audit", icon: ShieldCheck },
  { label: "School accounts", description: "Create and manage school user accounts. Super Admin only.", href: "/admin/accounts", icon: UserPlus },
  { label: "System settings", description: "Check production integrations and runtime security.", href: "/admin/settings", icon: Settings },
]

export default function AdminDashboardPage() {
  const [data, setData] = useState<Overview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const load = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/overview", { cache: "no-store" })
      const payload = await response.json().catch((): null => null)
      if (response.status === 401 || response.status === 403) {
        window.location.assign("/login?type=admin&returnTo=/admin")
        return
      }
      if (!response.ok) throw new Error(payload?.error?.message ?? "Administration workspace could not be loaded.")
      setData(payload.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Administration workspace could not be loaded.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  const logout = async (): Promise<void> => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.assign("/login?type=admin")
  }

  const filteredModules = useMemo(() => {
    const value = query.trim().toLowerCase()
    const available = data?.role === "SUPER_ADMIN" ? modules : modules.filter((item) => item.href !== "/admin/accounts")
    if (!value) return available
    return available.filter((item) => (item.label + " " + item.description).toLowerCase().includes(value))
  }, [query, data?.role])

  if (loading) return <main className="min-h-screen bg-[#f6f4ef] p-6 text-[#172033]"><div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center"><div className="text-center"><RefreshCw className="mx-auto h-7 w-7 animate-spin text-[#b9964f]" /><p className="mt-4 text-sm font-semibold">Opening secure administration…</p></div></div></main>

  if (error || !data) return <main className="min-h-screen bg-[#f6f4ef] p-6 text-[#172033]"><div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center"><section className="w-full border border-slate-200 bg-white p-8 text-center shadow-sm"><ShieldCheck className="mx-auto h-8 w-8 text-[#b9964f]" /><h1 className="mt-4 text-2xl font-bold">Administration unavailable</h1><p className="mt-3 text-sm leading-6 text-slate-600">{error ?? "The secure administration workspace could not be loaded."}</p><button onClick={() => void load()} className="mt-6 inline-flex items-center gap-2 bg-[#17365d] px-5 py-3 text-sm font-bold text-white"><RefreshCw className="h-4 w-4" /> Retry</button></section></div></main>

  const attention = [
    data.unreadMessages > 0 ? { label: data.unreadMessages.toLocaleString() + " unread contact message" + (data.unreadMessages === 1 ? "" : "s"), href: "/admin/messages" } : null,
    data.pendingApplications > 0 ? { label: data.pendingApplications.toLocaleString() + " admissions application" + (data.pendingApplications === 1 ? "" : "s") + " awaiting review", href: "/admin/admissions" } : null,
    data.draftContent > 0 ? { label: data.draftContent.toLocaleString() + " publication item" + (data.draftContent === 1 ? "" : "s") + " still in workflow", href: "/admin/content" } : null,
  ].filter((item): item is { label: string; href: string } => Boolean(item))

  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#172033]">
      <header className="border-b border-white/10 bg-[#102846] text-white">
        <div className="mx-auto flex max-w-[1500px] items-center gap-5 px-5 py-4 sm:px-8">
          <Link href="/admin" className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15"><LayoutDashboard className="h-5 w-5 text-[#d7c28e]" /></span><span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[.2em] text-[#d7c28e]">Sammena</span><span className="block truncate text-base font-bold">Administration</span></span></Link>
          <label className="relative ml-auto hidden w-full max-w-xl md:block"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-white/40" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search administration modules…" className="w-full border border-white/10 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#d7c28e]" /></label>
          <Link href="/" className="hidden text-sm font-semibold text-white/70 hover:text-white lg:block">Website</Link>
          <button onClick={() => void logout()} aria-label="Sign out" className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/10"><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Sign out</span></button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:py-9">
        <section className="flex flex-col gap-5 border-b border-slate-200 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">School operations · {data.role.replaceAll("_", " ")}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[#17365d] sm:text-4xl">Administration command centre</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Live operational information from the Sammena production system. Empty states are reported honestly rather than filled with invented figures.</p></div>
          <button onClick={() => void load()} className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#17365d] shadow-sm"><RefreshCw className="h-4 w-4" /> Refresh data</button>
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "Students", value: data.activeStudents, Icon: Users, href: "/admin/students" },
            { label: "Applications", value: data.applications, Icon: ClipboardList, href: "/admin/admissions" },
            { label: "Awaiting review", value: data.pendingApplications, Icon: Activity, href: "/admin/admissions" },
            { label: "In workflow", value: data.draftContent, Icon: FileText, href: "/admin/content" },
            { label: "Published posts", value: data.publishedContent, Icon: Megaphone, href: "/admin/content" },
            { label: "Upcoming events", value: data.upcomingEvents, Icon: CalendarDays, href: "/admin/events" },
            { label: "Unread messages", value: data.unreadMessages, Icon: Mail, href: "/admin/messages" },
          ].map(({ label, value, Icon, href }) => <Link key={label} href={href} className="group border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b9964f]"><div className="grid h-10 w-10 place-items-center bg-[#f3ead5] text-[#8c6c28]"><Icon className="h-5 w-5" /></div><p className="mt-5 text-sm font-semibold text-slate-500">{label}</p><p className="mt-1 text-3xl font-bold text-[#17365d]">{value.toLocaleString()}</p></Link>)}
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
          <article className="border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><div className="flex items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Needs attention</p><h2 className="mt-2 text-xl font-bold text-[#17365d]">Operational queue</h2></div><TriangleAlert className="h-5 w-5 text-[#b9964f]" /></div>{attention.length ? <div className="mt-6 divide-y divide-slate-100 border border-slate-100">{attention.map((item) => <Link key={item.href} href={item.href} className="flex items-center justify-between gap-4 p-4 hover:bg-[#fbfaf7]"><span className="text-sm font-semibold">{item.label}</span><ArrowRight className="h-4 w-4 shrink-0 text-[#a27e35]" /></Link>)}</div> : <div className="mt-6 border border-dashed border-slate-200 p-8 text-center"><ShieldCheck className="mx-auto h-6 w-6 text-emerald-600" /><p className="mt-3 text-sm font-semibold text-slate-700">No outstanding items are currently reported.</p><p className="mt-1 text-xs text-slate-500">This panel only reflects live records available to the current administrator.</p></div>}</article>

          <article className="border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Security signal</p><h2 className="mt-2 text-xl font-bold text-[#17365d]">Privileged activity</h2><p className="mt-3 text-sm leading-6 text-slate-600">Server-recorded audit activity during the last 30 days.</p><p className="mt-6 text-4xl font-bold text-[#17365d]">{data.auditEvents30d.toLocaleString()}</p><Link href="/admin/audit" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#17365d]">Open audit log <ArrowRight className="h-4 w-4" /></Link></article>
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
          <article className="border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-end justify-between border-b border-slate-200 pb-5"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Recent activity</p><h2 className="mt-2 text-xl font-bold text-[#17365d]">What changed</h2></div><Link href="/admin/audit" className="text-xs font-bold text-[#17365d]">Full audit log</Link></div>
            {data.recentActivity.length ? <div className="mt-2 divide-y divide-slate-100">{data.recentActivity.map((item) => <div key={item.id} className="py-4"><p className="text-sm font-semibold text-[#17365d]">{item.action.replaceAll("_", " ")}</p><p className="mt-1 text-xs text-slate-500">{item.entity_type}{item.entity_id ? ` · ${item.entity_id}` : ""} · {new Date(item.created_at).toLocaleString("en-TZ", { timeZone: "Africa/Dar_es_Salaam" })}</p></div>)}</div> : <div className="mt-6 border border-dashed border-slate-200 p-7 text-center text-sm text-slate-500">No administrative activity has been recorded yet.</div>}
          </article>
          <article className="border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Publishing status</p><h2 className="mt-2 text-xl font-bold text-[#17365d]">Public website content</h2><dl className="mt-6 space-y-4">{[["Published posts",data.publishedContent],["Upcoming events",data.upcomingEvents],["Draft workflow",data.draftContent]].map(([label,value])=><div key={String(label)} className="flex items-center justify-between border-b border-slate-100 pb-4"><dt className="text-sm text-slate-600">{label}</dt><dd className="text-lg font-bold text-[#17365d]">{Number(value).toLocaleString()}</dd></div>)}</dl><p className="mt-5 text-xs leading-5 text-slate-500">These values are queried from production storage. A zero means there are currently no records, not that the system is hiding them.</p></article>
        </section>

        <section className="mt-7 border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Live modules</p><h2 className="mt-2 text-xl font-bold text-[#17365d]">School administration</h2></div><p className="text-xs text-slate-500">Only connected production workflows are shown as actionable.</p></div><div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{filteredModules.map(({ label, description, href, icon: Icon }) => <Link key={label} href={href} className="group border border-slate-200 p-5 hover:border-[#b9964f] hover:bg-[#fbfaf7]"><div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center bg-[#f3ead5] text-[#8c6c28]"><Icon className="h-4 w-4" /></span><ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#a27e35]" /></div><h3 className="mt-5 font-bold text-[#17365d]">{label}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></Link>)}</div></section>

        <section className="mt-7 grid gap-6 xl:grid-cols-2">
          <article className="border border-slate-200 bg-white p-6 shadow-sm sm:p-7" aria-labelledby="website-status-heading">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Website status</p>
            <h2 id="website-status-heading" className="mt-2 text-xl font-bold text-[#17365d]">Public website health</h2>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3"><dt className="text-slate-600">Backend</dt><dd className={data.website.healthStatus === "ok" ? "font-bold text-emerald-700" : "font-bold text-red-700"}>{data.website.healthStatus === "ok" ? "Operational" : "Degraded"}</dd></div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3"><dt className="text-slate-600">Database</dt><dd className={data.website.databaseStatus === "ok" ? "font-bold text-emerald-700" : "font-bold text-red-700"}>{data.website.databaseStatus === "ok" ? "Connected" : "Unavailable"}</dd></div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3"><dt className="text-slate-600">Published news</dt><dd className="font-bold text-[#17365d]">{data.website.publishedNews.toLocaleString()}</dd></div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3"><dt className="text-slate-600">Published announcements</dt><dd className="font-bold text-[#17365d]">{data.website.publishedAnnouncements.toLocaleString()}</dd></div>
              <div className="flex items-center justify-between"><dt className="text-slate-600">Last published</dt><dd className="font-bold text-[#17365d]">{data.website.latestPublishedAt ? new Date(data.website.latestPublishedAt).toLocaleDateString("en-TZ", { day: "numeric", month: "short", year: "numeric" }) : "Nothing yet"}</dd></div>
            </dl>
            {data.website.databaseStatus !== "ok" && <p className="mt-5 border border-red-200 bg-red-50 p-3 text-xs text-red-800">The database is unreachable, so news and admissions will not load on the public site. Check DATABASE_URL and migrations in the hosting settings.</p>}
            <p className="mt-4 text-[11px] text-slate-400">Checked {new Date(data.website.checkedAt).toLocaleString("en-TZ")}</p>
          </article>

          <article className="border border-slate-200 bg-white p-6 shadow-sm sm:p-7" aria-labelledby="institutions-heading">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Educational institutions</p>
            <h2 id="institutions-heading" className="mt-2 text-xl font-bold text-[#17365d]">{data.institution ? data.institution.name : "Institution not linked"}</h2>
            {data.institution ? <p className="mt-1 text-sm text-slate-500">Slug: {data.institution.slug}</p> : <p className="mt-1 text-sm text-red-700">This account is not linked to a school record. Check SAMMENA_SCHOOL_ID.</p>}
            {data.role === "SUPER_ADMIN" && (
              data.institutions.length > 0 ? (
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500"><tr><th scope="col" className="py-2 pr-3">School</th><th scope="col" className="py-2 pr-3">Slug</th><th scope="col" className="py-2 text-right">Active students</th></tr></thead>
                    <tbody>{data.institutions.map((school) => <tr key={school.id} className="border-b border-slate-100"><td className="py-3 pr-3 font-semibold text-[#17365d]">{school.name}</td><td className="py-3 pr-3 text-slate-600">{school.slug}</td><td className="py-3 text-right font-bold text-[#17365d]">{school.activeStudents.toLocaleString()}</td></tr>)}</tbody>
                  </table>
                </div>
              ) : <p className="mt-5 text-sm text-slate-500">No other institutions are registered.</p>
            )}
          </article>
        </section>

        <section className="mt-7 border border-slate-200 bg-white p-6 shadow-sm sm:p-7" aria-labelledby="exports-heading">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Reports</p>
          <h2 id="exports-heading" className="mt-2 text-xl font-bold text-[#17365d]">Download records (CSV)</h2>
          <p className="mt-2 text-sm text-slate-600">Every download is recorded in the audit log.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {[["students", "Students"], ["loans", "Library loans"], ["inbox", "Contact inbox"]].map(([key, label]) => (
              <a key={key} href={`/api/admin/exports/${key}`} className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2.5 text-sm font-bold text-[#17365d] hover:border-[#b9964f]">{label}</a>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
