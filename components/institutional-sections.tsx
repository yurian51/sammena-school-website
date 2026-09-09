import Link from "next/link"
import { ArrowRight, Bell, CalendarDays, ClipboardList, Download, FileText, Search, ShieldCheck } from "lucide-react"

const actions = [
  [ClipboardList, "Apply for Admission", "Start or learn about the application process.", "/admissions"],
  [FileText, "School Prospectus", "Access the official school information pack when published.", "/resources"],
  [CalendarDays, "Academic Calendar", "Find important school dates and activities.", "/calendar"],
  [ShieldCheck, "Parent Portal", "Secure digital services for Sammena families.", "/portal"],
]

export function InstitutionalSections() {
  return (
    <>
      <section className="relative z-10 -mt-8 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map(([Icon, title, text, href]) => {
            const ActionIcon = Icon as typeof ClipboardList
            return <Link key={title as string} href={href as string} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:border-[#d8b55b]/50 hover:shadow-xl"><div className="flex items-start justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#071d3b] text-[#d8b55b]"><ActionIcon className="h-5 w-5" /></span><ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#8a6a24]" /></div><h3 className="mt-4 font-bold text-[#071d3b]">{title as string}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{text as string}</p></Link>
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8"><div><div className="flex items-end justify-between gap-4"><div><span className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a7628]">Latest announcements</span><h2 className="mt-2 text-2xl font-bold text-[#071d3b] sm:text-3xl">Official school notices</h2></div><Link href="/news" className="hidden items-center gap-1 text-sm font-bold text-[#8a6a24] sm:flex">All updates <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200"><div className="flex gap-4 p-5"><Bell className="mt-0.5 h-5 w-5 shrink-0 text-[#b28b32]"/><div><p className="font-semibold text-[#071d3b]">Announcements will appear here</p><p className="mt-1 text-sm leading-6 text-slate-500">The public announcement feed is ready for verified school notices.</p></div></div><div className="flex gap-4 p-5"><CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#b28b32]"/><div><p className="font-semibold text-[#071d3b]">Academic dates</p><p className="mt-1 text-sm leading-6 text-slate-500">Confirmed term, examination and event dates can be published through the calendar workflow.</p></div></div></div></div><div className="rounded-3xl bg-[#071d3b] p-7 text-white sm:p-8"><span className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Resource centre</span><h2 className="mt-3 text-2xl font-bold">Documents, forms and policies.</h2><p className="mt-3 text-sm leading-6 text-white/65">A central institutional library for approved Sammena documents, designed to stay useful as the school grows.</p><div className="mt-7 space-y-3"><Link href="/resources" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"><span className="flex items-center gap-2"><Download className="h-4 w-4 text-[#d8b55b]"/> Resource Centre</span><ArrowRight className="h-4 w-4"/></Link><Link href="/search" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"><span className="flex items-center gap-2"><Search className="h-4 w-4 text-[#d8b55b]"/> Search Website</span><ArrowRight className="h-4 w-4"/></Link></div></div></div></section>

      <section className="bg-[#f6f2e8] py-14"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><div><span className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a7628]">Institutional identity</span><h2 className="mt-2 text-2xl font-bold text-[#071d3b]">Our institutional journey</h2><p className="mt-1 text-sm text-slate-600">Building the Sammena Schools journey with a long-term education vision.</p></div><Link href="/about" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071d3b] px-5 py-3 font-bold text-white">About Sammena <ArrowRight className="h-4 w-4"/></Link></div></section>
    </>
  )
}
