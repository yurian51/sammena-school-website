import { CalendarDays, Clock3 } from "lucide-react"

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="border-b border-border bg-school-dark py-16 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-school-orange">Academic Calendar</p><h1 className="text-4xl font-bold md:text-5xl">School Calendar</h1><p className="mt-5 max-w-2xl text-white/70">A future-ready calendar hub for terms, examinations, admissions, activities and important school dates.</p></div></section>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><div className="rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12"><CalendarDays className="h-10 w-10 text-school-orange"/><h2 className="mt-5 text-2xl font-bold">Official dates</h2><p className="mt-3 max-w-2xl text-muted-foreground">The calendar will display only dates approved by Sammena administration. This prevents outdated or unofficial dates from becoming public commitments.</p><div className="mt-8 rounded-2xl bg-school-neutral p-6"><div className="flex items-start gap-4"><Clock3 className="mt-0.5 h-5 w-5 text-school-orange"/><div><p className="font-semibold">Calendar publishing workflow ready</p><p className="mt-1 text-sm text-muted-foreground">Term dates, holidays, exams, meetings and events can be added through the future CMS.</p></div></div></div></div></section>
    </main>
  )
}
