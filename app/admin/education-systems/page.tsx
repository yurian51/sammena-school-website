"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, BookOpenCheck, ClipboardCheck, FileSpreadsheet, GraduationCap, ShieldCheck, Users } from "lucide-react"

const systems = [
  {
    eyebrow: "SIS · Student Information System",
    title: "Student records and school operations",
    description: "A single operational record for admissions, enrolment, attendance, classes, results and family relationships.",
    icon: Users,
    tone: "bg-[#e8f1f3] text-[#0c6570]",
    links: [
      ["Student register", "/admin/students"],
      ["Admissions", "/admin/admissions"],
      ["Attendance", "/admin/attendance"],
      ["Results", "/admin/results"],
    ],
  },
  {
    eyebrow: "TAMISEMI · Reporting readiness",
    title: "Government reporting workspace",
    description: "Prepare institution, learner, staffing and academic records in Sammena before submitting official reports through the authorised government channels.",
    icon: FileSpreadsheet,
    tone: "bg-[#f5ecd8] text-[#916d20]",
    links: [
      ["School profile", "/admin/settings"],
      ["Enrolment records", "/admin/enrollments"],
      ["Academic structure", "/admin/timetable"],
      ["Export centre", "/admin/students"],
    ],
  },
  {
    eyebrow: "PREM · Learner and parent records",
    title: "Learner welfare and family context",
    description: "Keep learner identity, guardian links, attendance signals, documents and parent communication connected to the same school record.",
    icon: GraduationCap,
    tone: "bg-[#edf0f7] text-[#394b7a]",
    links: [
      ["Learner profiles", "/admin/students"],
      ["Guardians", "/admin/students"],
      ["Documents", "/admin/documents"],
      ["Parent messages", "/admin/messages"],
    ],
  },
  {
    eyebrow: "SQAS · School quality assurance",
    title: "Evidence, indicators and improvement",
    description: "Review quality domains, evidence and open improvement actions through an internal Sammena workflow with an auditable data boundary.",
    icon: ShieldCheck,
    tone: "bg-[#e9f3ed] text-[#28704b]",
    links: [
      ["Quality dashboard", "/quality"],
      ["Audit log", "/admin/audit"],
      ["Documents", "/admin/documents"],
      ["School settings", "/admin/settings"],
    ],
  },
]

const quickActions = [
  ["Register a learner", "/admin/students", Users],
  ["Record attendance", "/admin/attendance", BookOpenCheck],
  ["Review school quality", "/quality", ShieldCheck],
  ["View performance", "/portal", BarChart3],
] as const

export default function EducationSystemsPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[1280px]">
        <header className="border-b border-slate-200 pb-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Sammena education systems</p>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-[#17365d] sm:text-4xl">SIS, TAMISEMI, PREM and SQAS in one workspace</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">Samena connects daily school operations with reporting readiness, learner and family records, and continuous quality improvement. Official government submissions remain subject to the authorised TAMISEMI process.</p>
            </div>
            <Link href="/admin" className="inline-flex shrink-0 items-center gap-2 border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#17365d] shadow-sm hover:border-[#b9964f]">Administration home <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Education system modules">
          {systems.map(({ eyebrow, title, description, icon: Icon, tone, links }) => (
            <article key={eyebrow} className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm">
              <div className={`grid h-11 w-11 place-items-center ${tone}`}><Icon className="h-5 w-5" /></div>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[.15em] text-[#a27e35]">{eyebrow}</p>
              <h2 className="mt-2 text-xl font-bold leading-tight text-[#17365d]">{title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{description}</p>
              <div className="mt-6 border-t border-slate-100 pt-4">
                {links.map(([label, href]) => <Link key={label} href={href} className="flex items-center justify-between border-b border-slate-100 py-2.5 text-xs font-bold text-[#17365d] last:border-0 hover:text-[#a27e35]"><span>{label}</span><ArrowRight className="h-3.5 w-3.5 text-slate-300" /></Link>)}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <article className="border border-slate-200 bg-[#17365d] p-6 text-white sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#d7c28e]">Shared data foundation</p>
            <h2 className="mt-2 text-2xl font-bold">One learner record, many authorised views</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">SIS operations feed school dashboards, PREM context and SQAS evidence without duplicating learner identities. Access is still limited by role, school scope and audit controls.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[["Identity", "Admission and family links"], ["Operations", "Attendance and results"], ["Assurance", "Evidence and actions"]].map(([label, detail]) => <div key={label} className="border border-white/10 bg-white/[.06] p-4"><p className="text-sm font-bold">{label}</p><p className="mt-1 text-xs leading-5 text-white/60">{detail}</p></div>)}
            </div>
          </article>
          <article className="border border-slate-200 bg-white p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Quick actions</p>
            <h2 className="mt-2 text-xl font-bold text-[#17365d]">Continue school work</h2>
            <div className="mt-5 space-y-2">{quickActions.map(([label, href, Icon]) => <Link key={label} href={href} className="flex items-center justify-between border border-slate-200 px-4 py-3 text-sm font-bold text-[#17365d] hover:border-[#b9964f] hover:bg-[#fbfaf7]"><span className="flex items-center gap-3"><Icon className="h-4 w-4 text-[#a27e35]" />{label}</span><ArrowRight className="h-4 w-4 text-slate-300" /></Link>)}</div>
          </article>
        </section>

        <p className="mt-7 flex items-start gap-2 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#a27e35]" /> This is Sammena&apos;s internal operational workspace. It does not claim to replace official TAMISEMI, PREM or SQAS government systems.</p>
      </div>
    </main>
  )
}
