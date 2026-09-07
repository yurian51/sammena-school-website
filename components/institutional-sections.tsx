import Link from "next/link"
import { ArrowRight, Bell, CalendarDays, ClipboardList, Download, FileText, GraduationCap, Newspaper, Search, ShieldCheck } from "lucide-react"

const actions = [
  { icon: ClipboardList, title: "Admissions", text: "Application information, requirements and guidance.", href: "/admissions" },
  { icon: GraduationCap, title: "Academics", text: "Learning programmes, subjects and academic information.", href: "/academics" },
  { icon: CalendarDays, title: "Academic Calendar", text: "Important school dates and activities.", href: "/calendar" },
  { icon: ShieldCheck, title: "Parent Portal", text: "Secure digital services for families.", href: "/portal" },
]

const facts = [
  ["2018", "School journey began"],
  ["Pre & Primary", "Current school community"],
  ["2028", "Planned secondary pathway"],
  ["Tanzania", "East Africa"],
]

export function InstitutionalSections() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map(({ icon: Icon, title, text, href }) => (
              <Link key={title} href={href} className="group bg-white p-6 transition-colors hover:bg-[#faf8f1]">
                <Icon className="h-6 w-6 text-[#9b7728]" />
                <h3 className="mt-4 font-bold text-[#0a3158]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#8a6a24]">Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f7f7f5] py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Sammena Schools at a glance</span>
            <h2 className="mt-3 text-3xl font-bold text-[#0a3158] sm:text-4xl">A clear education pathway for every stage of growth.</h2>
            <p className="mt-4 leading-7 text-slate-600">Explore the school community, official information and resources in one institutional space.</p>
          </div>
          <div className="mt-8 grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(([value, label]) => <div key={label} className="bg-white p-6"><div className="text-2xl font-bold text-[#0a3158]">{value}</div><div className="mt-2 text-sm text-slate-500">{label}</div></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="flex items-end justify-between gap-4 border-b border-slate-300 pb-5">
              <div><span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Official information</span><h2 className="mt-2 text-2xl font-bold text-[#0a3158] sm:text-3xl">Notices, dates and updates</h2></div>
              <Link href="/news" className="hidden items-center gap-1 text-sm font-bold text-[#8a6a24] sm:inline-flex">All updates <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Link href="/news" className="border border-slate-200 bg-white p-5 transition-colors hover:bg-[#faf8f1]"><Bell className="h-5 w-5 text-[#9b7728]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#9b7728]">Announcements</p><h3 className="mt-2 font-bold text-[#0a3158]">Official school notices</h3><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#8a6a24]">View <ArrowRight className="h-3 w-3" /></span></Link>
              <Link href="/calendar" className="border border-slate-200 bg-white p-5 transition-colors hover:bg-[#faf8f1]"><CalendarDays className="h-5 w-5 text-[#0a3158]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#9b7728]">Calendar</p><h3 className="mt-2 font-bold text-[#0a3158]">Important dates</h3><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#8a6a24]">Open <ArrowRight className="h-3 w-3" /></span></Link>
              <Link href="/news" className="border border-slate-200 bg-white p-5 transition-colors hover:bg-[#faf8f1]"><Newspaper className="h-5 w-5 text-[#9b7728]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#9b7728]">News & Events</p><h3 className="mt-2 font-bold text-[#0a3158]">School community</h3><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#8a6a24]">Explore <ArrowRight className="h-3 w-3" /></span></Link>
            </div>
          </div>

          <aside className="border border-slate-200 bg-[#0a3158] p-7 text-white">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#e2c46c]">Resource centre</span>
            <h2 className="mt-3 text-2xl font-bold">Documents, forms and policies</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">Approved Sammena documents and resources for families, students and the wider school community.</p>
            <div className="mt-6 border-t border-white/15">
              <Link href="/resources" className="flex items-center justify-between border-b border-white/15 py-4 text-sm font-semibold"><span className="flex items-center gap-2"><Download className="h-4 w-4 text-[#e2c46c]" /> Resource Centre</span><ArrowRight className="h-4 w-4" /></Link>
              <Link href="/search" className="flex items-center justify-between border-b border-white/15 py-4 text-sm font-semibold"><span className="flex items-center gap-2"><Search className="h-4 w-4 text-[#e2c46c]" /> Search Website</span><ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="flex items-center justify-between py-4 text-sm font-semibold"><span className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#e2c46c]" /> Contact the School</span><ArrowRight className="h-4 w-4" /></Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}