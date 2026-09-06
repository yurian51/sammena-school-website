"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquare,
  NotebookTabs,
  PanelLeftClose,
  PanelLeftOpen,
  UserRound,
  X,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Courses", icon: BookOpen },
  { label: "Timetable", icon: CalendarDays },
  { label: "Assignments", icon: ClipboardList },
  { label: "Results", icon: GraduationCap },
  { label: "Fees & Payments", icon: CreditCard },
  { label: "Announcements", icon: Bell },
]

const quickLinks = [
  { label: "My Courses", detail: "View learning pathway", icon: BookOpen, tone: "blue" },
  { label: "Weekly Timetable", detail: "See upcoming classes", icon: CalendarDays, tone: "sky" },
  { label: "Assignments", detail: "Track your schoolwork", icon: ClipboardList, tone: "gold" },
  { label: "Academic Results", detail: "Review progress", icon: GraduationCap, tone: "navy" },
]

const timetable = [
  ["08:00", "Mathematics", "Room A · Ms. Neema", "math"],
  ["10:00", "English Language", "Room B · Mr. Juma", "english"],
  ["13:30", "Sports & Creative Arts", "Activity field · Coach Asha", "sports"],
]

const announcements = [
  { label: "School notice", title: "Term learning resources are ready", text: "Check the Documents area for approved class materials and school notices." },
  { label: "Reminder", title: "Review your weekly timetable", text: "Use the timetable view to keep track of classes and co-curricular activities." },
  { label: "Student services", title: "Keep your profile information current", text: "Ask the school office for help when your guardian or contact details change." },
]

export default function StudentPortalPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const selectNav = (label: string) => {
    setActiveItem(label)
    setMobileOpen(false)
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#183252]">
      <div className="flex min-h-screen">
        {mobileOpen && <button type="button" aria-label="Close student navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-[#102d52]/55 backdrop-blur-sm lg:hidden" />}
        <aside className={cn("fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#dce4ed] bg-white transition-all duration-300 lg:static lg:translate-x-0", sidebarCollapsed ? "w-[92px]" : "w-[278px]", mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
          <div className={cn("flex h-[78px] items-center border-b border-[#e5ebf2] px-5", sidebarCollapsed ? "justify-center" : "justify-between")}>
            <Link href="/" className="flex items-center gap-3" aria-label="Sammena Schools home"><Image src="/images/sammena-logo.png" alt="Sammena Pre & Primary School logo" width={46} height={46} className="h-11 w-11 rounded-full object-cover ring-2 ring-[#c9a24b]/70" /><span className={cn("leading-none", sidebarCollapsed && "hidden")}><strong className="block text-[15px] tracking-[0.08em] text-[#163b68]">SAMMENA</strong><small className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#2aa7cf]">Student Portal</small></span></Link>
            <button type="button" onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-[#6a7d95] hover:bg-[#eff6fb] lg:hidden" aria-label="Close menu"><X className="h-5 w-5" /></button>
          </div>
          <div className={cn("border-b border-[#e5ebf2] py-5", sidebarCollapsed ? "px-3" : "px-5")}><div className={cn("rounded-2xl bg-[#eef8fc] p-3", sidebarCollapsed && "flex justify-center bg-transparent p-0")}><div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2aa7cf] text-sm font-bold text-white">SA</span><div className={cn("min-w-0", sidebarCollapsed && "hidden")}><p className="truncate text-xs font-bold text-[#183252]">Student account</p><p className="mt-0.5 truncate text-[11px] text-[#70839a]">Sammena Pre & Primary</p></div></div></div></div>
          <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Student portal navigation">{navItems.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => selectNav(label)} title={sidebarCollapsed ? label : undefined} className={cn("group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors", sidebarCollapsed ? "justify-center" : "", activeItem === label ? "bg-[#163b68] text-white shadow-md shadow-[#163b68]/15" : "text-[#667b93] hover:bg-[#eef8fc] hover:text-[#163b68]")}><Icon className={cn("h-[18px] w-[18px] shrink-0", activeItem === label ? "text-[#f0c85f]" : "text-[#7d92a9] group-hover:text-[#2aa7cf]")} /><span className={cn(sidebarCollapsed && "hidden")}>{label}</span>{label === "Announcements" && !sidebarCollapsed && <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f0c85f] px-1.5 text-[10px] font-bold text-[#183252]">3</span>}</button>)}</nav>
          <div className={cn("border-t border-[#e5ebf2] p-4", sidebarCollapsed && "px-3")}><Link href="/" className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#667b93] transition hover:bg-[#eef8fc] hover:text-[#163b68]", sidebarCollapsed && "justify-center")} title={sidebarCollapsed ? "Public website" : undefined}><ArrowRight className="h-4 w-4 rotate-180" /><span className={cn(sidebarCollapsed && "hidden")}>Public website</span></Link><button type="button" onClick={() => setSidebarCollapsed(v => !v)} className="mt-2 hidden w-full items-center justify-center gap-2 rounded-xl border border-[#dce4ed] px-3 py-2 text-xs font-bold text-[#667b93] transition hover:border-[#2aa7cf] hover:text-[#163b68] lg:flex" title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>{sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <><PanelLeftClose className="h-4 w-4" />Collapse menu</>}</button></div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-[#dce4ed] bg-white/90 backdrop-blur-xl"><div className="flex h-[78px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10"><div className="flex min-w-0 items-center gap-3"><button type="button" onClick={() => setMobileOpen(true)} className="rounded-xl border border-[#dce4ed] p-2.5 text-[#163b68] lg:hidden" aria-label="Open student navigation"><Menu className="h-5 w-5" /></button><div className="min-w-0"><p className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b93b8] sm:block">Sammena Schools · Student Portal</p><p className="truncate text-sm font-bold text-[#163b68] sm:mt-1">{activeItem}</p></div></div><div className="flex items-center gap-3"><button type="button" className="relative rounded-xl border border-[#dce4ed] p-2.5 text-[#6d8198] transition hover:border-[#2aa7cf] hover:text-[#163b68]" aria-label="View notifications"><Bell className="h-[18px] w-[18px]" /><span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f0c85f] px-1 text-[9px] font-bold text-[#183252]">3</span></button><div className="hidden h-8 w-px bg-[#dce4ed] sm:block" /><button type="button" className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#f3f8fb]"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2aa7cf] text-xs font-bold text-white">SA</span><span className="hidden text-left md:block"><strong className="block text-xs text-[#183252]">Student Account</strong><small className="block text-[11px] text-[#7890a6]">Pre & Primary</small></span></button></div></div></header>

          <div className="mx-auto max-w-[1450px] px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-[#163b68] px-6 py-7 text-white shadow-[0_22px_60px_-35px_rgba(22,59,104,.8)] sm:px-8 sm:py-8"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#2aa7cf]/20 blur-3xl" /><div className="absolute bottom-0 right-32 h-32 w-32 rounded-full bg-[#f0c85f]/15 blur-3xl" /><div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end"><div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f0c85f]">Student overview</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, student.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/70">Keep track of your classes, assignments, academic progress and school notices from one connected workspace.</p></div><div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm"><Image src="/images/sammena-logo.png" alt="Sammena school logo" width={52} height={52} className="h-12 w-12 rounded-full bg-white object-cover" /><div><p className="text-xs font-bold text-[#f0c85f]">Current term</p><p className="mt-1 text-sm font-semibold">Term 2 · 2026</p><p className="mt-1 text-[11px] text-white/55">Learning and growth together</p></div></div></div></section>

            <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Student summary"><Summary label="Attendance" value="94%" detail="This term" icon={CheckCircle2} tone="blue" /><Summary label="Assignments" value="06" detail="2 due this week" icon={NotebookTabs} tone="sky" /><Summary label="Average progress" value="A−" detail="Current learning level" icon={GraduationCap} tone="gold" /><Summary label="Fee status" value="Clear" detail="No action required" icon={CreditCard} tone="green" /></section>

            {activeItem !== "Dashboard" && <PortalModule activeItem={activeItem} />}

            <div className={cn("mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_350px]", activeItem !== "Dashboard" && "hidden")}>
              <div className="min-w-0 space-y-6">
                <section className="rounded-3xl border border-[#dce4ed] bg-white shadow-[0_18px_50px_-38px_rgba(24,50,82,.45)]"><div className="flex items-center justify-between border-b border-[#e8eef4] px-5 py-5 sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">At a glance</p><h2 className="mt-1 text-lg font-bold text-[#183252]">Quick access</h2></div><span className="rounded-full bg-[#eef8fc] px-3 py-1.5 text-[11px] font-bold text-[#2b93b8]">Student services</span></div><div className="grid gap-px bg-[#e8eef4] sm:grid-cols-2">{quickLinks.map(({ label, detail, icon: Icon, tone }) => <button key={label} type="button" onClick={() => selectNav(label === "Academic Results" ? "Results" : label === "Weekly Timetable" ? "Timetable" : label)} className="group bg-white p-5 text-left transition hover:bg-[#f8fbfd]"><div className="flex items-start justify-between"><span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", tone === "blue" && "bg-[#edf4fb] text-[#2467a1]", tone === "sky" && "bg-[#eaf9fd] text-[#269ab9]", tone === "gold" && "bg-[#fff8df] text-[#a27613]", tone === "navy" && "bg-[#edf1f7] text-[#163b68]")}><Icon className="h-5 w-5" /></span><ArrowRight className="h-4 w-4 text-[#b6c5d2] transition group-hover:translate-x-1 group-hover:text-[#2aa7cf]" /></div><h3 className="mt-4 text-sm font-bold text-[#183252]">{label}</h3><p className="mt-1 text-xs text-[#7890a6]">{detail}</p></button>)}</div></section>

                <section className="rounded-3xl border border-[#dce4ed] bg-white shadow-[0_18px_50px_-38px_rgba(24,50,82,.45)]"><div className="flex items-center justify-between border-b border-[#e8eef4] px-5 py-5 sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">Today · Wednesday</p><h2 className="mt-1 text-lg font-bold text-[#183252]">My timetable</h2></div><button type="button" onClick={() => selectNav("Timetable")} className="inline-flex items-center gap-1 text-xs font-bold text-[#2467a1] hover:text-[#2aa7cf]">View full timetable <ArrowRight className="h-3.5 w-3.5" /></button></div><div className="divide-y divide-[#e8eef4]">{timetable.map(([time, subject, teacher, tone]) => <div key={subject} className="flex items-center gap-4 px-5 py-4 sm:px-6"><span className="w-12 shrink-0 text-xs font-bold text-[#7890a6]">{time}</span><span className={cn("h-10 w-1 rounded-full", tone === "math" && "bg-[#2aa7cf]", tone === "english" && "bg-[#f0c85f]", tone === "sports" && "bg-[#163b68]")} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#183252]">{subject}</p><p className="mt-1 truncate text-xs text-[#7890a6]">{teacher}</p></div><span className="hidden rounded-full bg-[#f3f7fa] px-3 py-1.5 text-[10px] font-semibold text-[#71869d] sm:inline-flex">Today</span></div>)}</div></section>
              </div>

              <aside className="space-y-6"><section className="rounded-3xl border border-[#dce4ed] bg-white shadow-[0_18px_50px_-38px_rgba(24,50,82,.45)]"><div className="flex items-center justify-between border-b border-[#e8eef4] px-5 py-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">Latest</p><h2 className="mt-1 text-lg font-bold text-[#183252]">Announcements</h2></div><Bell className="h-5 w-5 text-[#2aa7cf]" /></div><div className="divide-y divide-[#e8eef4]">{announcements.map(item => <button key={item.title} type="button" onClick={() => selectNav("Announcements")} className="block w-full px-5 py-4 text-left transition hover:bg-[#f8fbfd]"><span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#a27613]">{item.label}</span><h3 className="mt-1.5 text-sm font-bold leading-5 text-[#183252]">{item.title}</h3><p className="mt-1.5 text-xs leading-5 text-[#7890a6]">{item.text}</p></button>)}</div><button type="button" onClick={() => selectNav("Announcements")} className="flex w-full items-center justify-center gap-2 border-t border-[#e8eef4] px-5 py-4 text-xs font-bold text-[#2467a1] hover:text-[#2aa7cf]">View all announcements <ArrowRight className="h-3.5 w-3.5" /></button></section><section className="rounded-3xl bg-[#eaf9fd] p-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#269ab9]"><MessageSquare className="h-5 w-5" /></div><h2 className="mt-4 text-lg font-bold text-[#183252]">Need help?</h2><p className="mt-2 text-sm leading-6 text-[#58728e]">For account, timetable or school record support, contact the school office.</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#163b68] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#245483]">Contact school office <ArrowRight className="h-3.5 w-3.5" /></Link></section></aside>
            </div>

            <footer className="mt-8 flex flex-col gap-2 border-t border-[#dce4ed] py-6 text-xs text-[#7890a6] sm:flex-row sm:items-center sm:justify-between"><p>Sammena Student Portal · Preview workspace</p><p className="flex items-center gap-2"><UserRound className="h-3.5 w-3.5" /> Authenticated services will be connected to the SIS backend.</p></footer>
          </div>
        </div>
      </div>
    </main>
  )
}

function Summary({ label, value, detail, icon: Icon, tone }: { label: string; value: string; detail: string; icon: typeof CheckCircle2; tone: "blue" | "sky" | "gold" | "green" }) {
  const tones = { blue: "bg-[#edf4fb] text-[#2467a1]", sky: "bg-[#eaf9fd] text-[#269ab9]", gold: "bg-[#fff8df] text-[#a27613]", green: "bg-[#edf9f3] text-[#1b8560]" }
  return <div className="rounded-2xl border border-[#dce4ed] bg-white p-5 shadow-[0_14px_35px_-28px_rgba(24,50,82,.4)]"><div className="flex items-start justify-between"><span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", tones[tone])}><Icon className="h-5 w-5" /></span><span className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", tones[tone].split(" ")[1])}>Updated</span></div><p className="mt-5 text-xs font-semibold text-[#7890a6]">{label}</p><p className="mt-1 text-2xl font-bold tracking-tight text-[#183252]">{value}</p><p className="mt-1 text-xs text-[#7890a6]">{detail}</p></div>
}

function PortalModule({ activeItem }: { activeItem: string }) {
  const modules: Record<string, { eyebrow: string; title: string; description: string; icon: typeof BookOpen; content: React.ReactNode }> = {
    "My Courses": { eyebrow: "Academic record", title: "My courses", description: "Your current learning pathway and subject resources.", icon: BookOpen, content: <div className="grid gap-3 sm:grid-cols-2"><ModuleRow title="Mathematics" meta="Primary · Core subject" status="Active" /><ModuleRow title="English Language" meta="Primary · Core subject" status="Active" /><ModuleRow title="Science & Environment" meta="Primary · Core subject" status="Active" /><ModuleRow title="Sports & Creative Arts" meta="Co-curricular" status="Active" /></div> },
    "Timetable": { eyebrow: "Academic schedule", title: "Weekly timetable", description: "Plan your classes and activities across the week.", icon: CalendarDays, content: <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-[#f7fafc] text-[10px] uppercase tracking-[0.16em] text-[#7890a6]"><tr><th className="px-4 py-3">Day</th><th className="px-4 py-3">08:00</th><th className="px-4 py-3">10:00</th><th className="px-4 py-3">13:30</th></tr></thead><tbody>{[["Monday", "Mathematics", "English Language", "Sports"], ["Tuesday", "Science", "Mathematics", "Creative Arts"], ["Wednesday", "English Language", "Science", "Sports"], ["Thursday", "Mathematics", "Reading", "Clubs"], ["Friday", "Revision", "Project Work", "Community Time"]].map(day => <tr key={day[0]} className="border-t border-[#e8eef4]"><td className="px-4 py-4 font-bold text-[#183252]">{day[0]}</td>{day.slice(1).map(subject => <td key={subject} className="px-4 py-4 text-[#607895]">{subject}</td>)}</tr>)}</tbody></table></div> },
    "Assignments": { eyebrow: "Learning tasks", title: "Assignments", description: "Track work to complete and recently submitted tasks.", icon: ClipboardList, content: <div className="space-y-3"><Assignment title="Fractions practice" subject="Mathematics" due="Due Friday" state="Pending" /><Assignment title="My environment poster" subject="Science & Environment" due="Submitted yesterday" state="Submitted" /><Assignment title="Reading reflection" subject="English Language" due="Due next week" state="Open" /></div> },
    "Results": { eyebrow: "Academic progress", title: "Results and progress", description: "A preview of assessment results and learner development.", icon: GraduationCap, content: <div className="grid gap-4 sm:grid-cols-3"><Result subject="Mathematics" grade="A−" score="86%" /><Result subject="English Language" grade="B+" score="79%" /><Result subject="Science" grade="A" score="91%" /></div> },
    "Fees & Payments": { eyebrow: "Finance summary", title: "Fees and payment history", description: "View the current fee status and approved payment records.", icon: CreditCard, content: <div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-[#edf9f3] p-5"><p className="text-xs font-semibold text-[#567b6b]">Current balance</p><p className="mt-2 text-2xl font-bold text-[#1b8560]">Clear</p><p className="mt-1 text-xs text-[#567b6b]">No action required</p></div><div className="rounded-2xl bg-[#f7fafc] p-5"><p className="text-xs font-semibold text-[#7890a6]">Last payment</p><p className="mt-2 text-lg font-bold text-[#183252]">Term 2 fees</p><p className="mt-1 text-xs text-[#7890a6]">Receipt available from office</p></div><div className="rounded-2xl bg-[#fff8df] p-5"><p className="text-xs font-semibold text-[#a27613]">Payment centre</p><p className="mt-2 text-lg font-bold text-[#183252]">Coming soon</p><p className="mt-1 text-xs text-[#7890a6]">Secure online payments will be connected later</p></div></div> },
    "Announcements": { eyebrow: "School communication", title: "Announcements inbox", description: "Keep up with notices and messages relevant to student life.", icon: Bell, content: <div className="space-y-3">{announcements.map(item => <div key={item.title} className="rounded-2xl border border-[#e0e8f0] bg-[#fbfdff] p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#a27613]">{item.label}</p><h3 className="mt-2 text-sm font-bold text-[#183252]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#70869d]">{item.text}</p></div><Bell className="h-5 w-5 shrink-0 text-[#2aa7cf]" /></div></div>)}</div> },
  }
  const current = modules[activeItem] || modules["My Courses"]
  const Icon = current.icon
  return <section className="mt-8 rounded-3xl border border-[#dce4ed] bg-white p-5 shadow-[0_18px_50px_-38px_rgba(24,50,82,.45)] sm:p-7"><div className="flex flex-col gap-4 border-b border-[#e8eef4] pb-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf9fd] text-[#269ab9]"><Icon className="h-5 w-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">{current.eyebrow}</p><h2 className="mt-1 text-xl font-bold text-[#183252]">{current.title}</h2><p className="mt-1 text-sm text-[#7890a6]">{current.description}</p></div></div><span className="w-fit rounded-full bg-[#eef8fc] px-3 py-1.5 text-[11px] font-bold text-[#2b93b8]">Preview data</span></div><div className="pt-6">{current.content}</div></section>
}

function ModuleRow({ title, meta, status }: { title: string; meta: string; status: string }) {
  return <div className="flex items-center gap-3 rounded-2xl border border-[#e0e8f0] bg-[#fbfdff] p-4"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf4fb] text-[#2467a1]"><BookOpen className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="text-sm font-bold text-[#183252]">{title}</p><p className="mt-1 text-xs text-[#7890a6]">{meta}</p></div><span className="rounded-full bg-[#edf9f3] px-2.5 py-1 text-[10px] font-bold text-[#1b8560]">{status}</span></div>
}

function Assignment({ title, subject, due, state }: { title: string; subject: string; due: string; state: string }) {
  return <div className="flex items-center gap-3 rounded-2xl border border-[#e0e8f0] bg-[#fbfdff] p-4"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff8df] text-[#a27613]"><ClipboardList className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="text-sm font-bold text-[#183252]">{title}</p><p className="mt-1 text-xs text-[#7890a6]">{subject} · {due}</p></div><span className="rounded-full border border-[#dce4ed] px-2.5 py-1 text-[10px] font-bold text-[#607895]">{state}</span></div>
}

function Result({ subject, grade, score }: { subject: string; grade: string; score: string }) {
  return <div className="rounded-2xl border border-[#e0e8f0] bg-[#fbfdff] p-5"><p className="text-xs font-bold text-[#183252]">{subject}</p><p className="mt-4 text-3xl font-bold text-[#2467a1]">{grade}</p><p className="mt-1 text-xs text-[#7890a6]">Latest assessment · {score}</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e6eef5]"><div className="h-full rounded-full bg-[#2aa7cf]" style={{ width: score }} /></div></div>
}
