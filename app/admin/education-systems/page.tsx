"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, BookOpenCheck, FileSpreadsheet, ShieldCheck, Users } from "lucide-react"

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
]

const quickActions = [
  ["Register a learner", "/admin/students", Users],
  ["Record attendance", "/admin/attendance", BookOpenCheck],
  ["View performance", "/portal", BarChart3],
  ["Export SIS records", "/admin/enrollments", FileSpreadsheet],
] as const

const sisFeatureGroups = [
  ["School management", "School profile, ownership, staff, users and academic years", "/admin/settings"],
  ["Revenue collection", "Fees, invoices, receipts, balances and payment references", "/admin/finance"],
  ["Inventory", "Books, furniture, equipment and school resource tracking", "/admin/library"],
  ["Readiness and class operations", "School readiness, streams, timetables and daily class workflows", "/admin/timetable"],
  ["Assessment and promotion", "Continuous assessment, report cards and student progression", "/admin/results"],
  ["Annual census and reporting", "SNP, annual school census, data cleaning and export preparation", "/admin/enrollments"],
  ["Sports and supplementary services", "Sports, games, DEWS and supplementary programme records", "/admin/events"],
] as const

export default function EducationSystemsPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[1280px]">
        <header className="border-b border-slate-200 pb-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Sammena education systems</p>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-[#17365d] sm:text-4xl">SIS features, built into Sammena</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">Samena is bringing the useful day-to-day SIS workflows into one school workspace: learner records, attendance, classes, assessments, fees, resources and reporting.</p>
            </div>
            <Link href="/admin" className="inline-flex shrink-0 items-center gap-2 border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#17365d] shadow-sm hover:border-[#b9964f]">Administration home <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="SIS workflows">
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

        <section className="mt-8 border border-slate-200 bg-white p-6 shadow-sm sm:p-7" aria-labelledby="sis-feature-catalog">
          <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">SIS feature map</p>
              <h2 id="sis-feature-catalog" className="mt-2 text-2xl font-bold text-[#17365d]">Core workflows to bring into Sammena</h2>
            </div>
            <p className="max-w-md text-xs leading-5 text-slate-500">Based on the official SIS dashboard catalogue: the links below are Sammena entry points, while official submissions remain controlled by the authorised government systems.</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sisFeatureGroups.map(([label, detail, href]) => (
              <Link key={label} href={href} className="group border border-slate-200 p-4 transition hover:border-[#b9964f] hover:bg-[#fbfaf7]">
                <div className="flex items-start justify-between gap-3"><h3 className="text-sm font-bold text-[#17365d]">{label}</h3><ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-[#a27e35]" /></div>
                <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <article className="border border-slate-200 bg-[#17365d] p-6 text-white sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#d7c28e]">SIS data foundation</p>
            <h2 className="mt-2 text-2xl font-bold">One learner record, complete school operations</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">Every SIS workflow uses the same learner, class and academic-year records. Access remains limited by role, school scope and audit controls.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[["Learners", "Admission and family links"], ["Operations", "Attendance and results"], ["Reports", "Exports and decisions"]].map(([label, detail]) => <div key={label} className="border border-white/10 bg-white/[.06] p-4"><p className="text-sm font-bold">{label}</p><p className="mt-1 text-xs leading-5 text-white/60">{detail}</p></div>)}
            </div>
          </article>
          <article className="border border-slate-200 bg-white p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Quick actions</p>
            <h2 className="mt-2 text-xl font-bold text-[#17365d]">Continue school work</h2>
            <div className="mt-5 space-y-2">{quickActions.map(([label, href, Icon]) => <Link key={label} href={href} className="flex items-center justify-between border border-slate-200 px-4 py-3 text-sm font-bold text-[#17365d] hover:border-[#b9964f] hover:bg-[#fbfaf7]"><span className="flex items-center gap-3"><Icon className="h-4 w-4 text-[#a27e35]" />{label}</span><ArrowRight className="h-4 w-4 text-slate-300" /></Link>)}</div>
          </article>
        </section>

        <p className="mt-7 flex items-start gap-2 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#a27e35]" /> This is Sammena&apos;s internal SIS feature workspace. It is designed to improve school operations and does not claim to replace any official government system.</p>
      </div>
    </main>
  )
}
