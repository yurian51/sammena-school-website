import Link from "next/link"
import { CalendarDays, Clock3, ArrowRight, Bell } from "lucide-react"

const groups = [
  ["Academic Terms", "Term dates, opening and closing information will be published after official confirmation."],
  ["Examinations", "Assessment and examination dates will be published through the official calendar."],
  ["School Activities", "Meetings, sports, trips, ceremonies and other confirmed activities."],
]

export default function CalendarPage() {
  return <main className="min-h-screen bg-background pt-28">
    <section className="bg-school-dark py-16 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-school-orange">Academic Calendar</p><h1 className="text-4xl font-bold md:text-5xl">School Calendar</h1><p className="mt-5 max-w-2xl text-white/70">A single, dependable place for official terms, examinations, activities and important school dates.</p></div></section>
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-6 md:grid-cols-3">{groups.map(([title,text])=><div key={title} className="rounded-2xl border border-border bg-card p-7 shadow-sm"><CalendarDays className="h-8 w-8 text-school-orange"/><h2 className="mt-5 text-xl font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div><div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10"><div className="flex flex-col gap-6 md:flex-row md:items-start"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-school-orange/10"><Clock3 className="h-6 w-6 text-school-orange"/></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-school-orange">Official publishing workflow</p><h2 className="mt-2 text-2xl font-bold">Dates will be published when approved</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">The public calendar is intentionally conservative. Confirmed dates can be added through the future CMS, while changes and cancellations can be communicated through announcements.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/news" className="inline-flex items-center justify-center gap-2 rounded-xl bg-school-dark px-5 py-3 text-sm font-semibold text-white">View announcements <Bell className="h-4 w-4"/></Link><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold">Ask about dates <ArrowRight className="h-4 w-4"/></Link></div></div></div></div></section>
  </main>
}
