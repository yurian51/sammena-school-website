import Link from "next/link"
import { ArrowRight, Bell, CalendarDays, ClipboardList, Download, FileText, GraduationCap, Newspaper, Search, ShieldCheck } from "lucide-react"

const actions = [
  { icon: ClipboardList, title: "Apply for Admission", text: "Start or learn about the application process.", href: "/admissions", accent: "gold" },
  { icon: GraduationCap, title: "Find Your Pathway", text: "Explore our current school and future progression.", href: "/academics", accent: "navy" },
  { icon: CalendarDays, title: "Academic Calendar", text: "Find important school dates and activities.", href: "/calendar", accent: "gold" },
  { icon: ShieldCheck, title: "Parent Portal", text: "Access secure digital services for families.", href: "/portal", accent: "navy" },
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
      <section className="relative z-10 -mt-10 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map(({ icon: Icon, title, text, href, accent }, index) => (
            <Link key={title} href={href} data-motion="card" className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(7,29,59,.55)] transition-all hover:-translate-y-1 hover:border-[#d8b55b]/50">
              <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#d8b55b]/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
              <div className="relative flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent === "gold" ? "bg-[#f6f2e8] text-[#8a6a24]" : "bg-[#071d3b] text-[#d8b55b]"}`}><Icon className="h-5 w-5" /></span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-all duration-300 group-hover:bg-[#f6f2e8]"><ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#8a6a24]" /></span>
              </div>
              <h3 className="relative mt-4 font-bold text-[#071d3b]">{title}</h3>
              <p className="relative mt-1 text-xs leading-5 text-slate-500">{text}</p>
              <span className="relative mt-4 block h-px w-0 bg-[#d8b55b] transition-all duration-500 group-hover:w-full" style={{ transitionDelay: `${index * 30}ms` }} />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl"><span className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a7628]">SAMMENA SCHOOLS AT A GLANCE</span><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#071d3b] sm:text-4xl">A clear school pathway for every stage of growth.</h2><p className="mt-4 leading-7 text-slate-600">Discover the school community, learning pathway, official notices and resources in one trusted institutional space.</p></div>
            <Link href="/about" className="group inline-flex items-center gap-2 font-bold text-[#8a6a24]">Learn about Sammena <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(([value, label]) => <div key={label} className="bg-[#fbfaf6] p-6 transition-colors hover:bg-white"><div className="text-2xl font-bold text-[#071d3b]">{value}</div><div className="mt-2 text-sm text-slate-500">{label}</div></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f2e8] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div>
            <div className="flex items-end justify-between gap-4"><div><span className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a7628]">Official information</span><h2 className="mt-2 text-2xl font-bold text-[#071d3b] sm:text-3xl">Notices, dates and updates.</h2></div><Link href="/news" className="hidden items-center gap-1 text-sm font-bold text-[#8a6a24] transition-transform hover:translate-x-1 sm:flex">All updates <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div data-motion="card" className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6f2e8] text-[#9a7628]"><Bell className="h-5 w-5" /></span><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a7628]">Announcements</span></div><h3 className="mt-5 font-bold text-[#071d3b]">Verified school notices will appear here.</h3><p className="mt-2 text-sm leading-6 text-slate-500">The public notice feed is ready for approved updates from Sammena.</p><Link href="/news" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">View news hub <ArrowRight className="h-4 w-4" /></Link></div>
              <div data-motion="card" className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#071d3b] text-[#d8b55b]"><CalendarDays className="h-5 w-5" /></span><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a7628]">Academic dates</span></div><h3 className="mt-5 font-bold text-[#071d3b]">Plan with confidence.</h3><p className="mt-2 text-sm leading-6 text-slate-500">Confirmed term, examination and event dates can be published through the calendar workflow.</p><Link href="/calendar" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">Open calendar <ArrowRight className="h-4 w-4" /></Link></div>
              <div data-motion="card" className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6f2e8] text-[#9a7628]"><Newspaper className="h-5 w-5" /></span><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a7628]">News & events</span></div><h3 className="mt-5 font-bold text-[#071d3b]">Stay connected.</h3><p className="mt-2 text-sm leading-6 text-slate-500">Follow verified stories, community highlights and confirmed activities from Sammena.</p><Link href="/news" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">Explore updates <ArrowRight className="h-4 w-4" /></Link></div>
            </div>
          </div>
          <div data-motion="card" className="relative overflow-hidden rounded-3xl bg-[#071d3b] p-7 text-white sm:p-8"><div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d8b55b]/15 blur-3xl" /><div className="relative"><span className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b55b]">Resource centre</span><h2 className="mt-3 text-2xl font-bold">Documents, forms and policies.</h2><p className="mt-3 text-sm leading-6 text-white/65">A central institutional library for approved Sammena documents, designed to stay useful as the school grows.</p><div className="mt-7 space-y-3"><Link href="/resources" className="group/link flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition-all hover:translate-x-1 hover:bg-white/10"><span className="flex items-center gap-2"><Download className="h-4 w-4 text-[#d8b55b]" /> Resource Centre</span><ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" /></Link><Link href="/search" className="group/link flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition-all hover:translate-x-1 hover:bg-white/10"><span className="flex items-center gap-2"><Search className="h-4 w-4 text-[#d8b55b]" /> Search Website</span><ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" /></Link><Link href="/contact" className="group/link flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition-all hover:translate-x-1 hover:bg-white/10"><span className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#d8b55b]" /> Contact the school</span><ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" /></Link></div></div></div>
        </div>
      </section>
    </>
  )
}
