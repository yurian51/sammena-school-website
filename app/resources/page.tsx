import Link from "next/link"
import { ArrowRight, Download, FileText, ShieldCheck, CalendarDays, BookOpen, Search } from "lucide-react"

const resourceGroups = [
  [FileText, "Forms & Applications", "Admission and administrative forms approved for public use."],
  [ShieldCheck, "Policies & Guidelines", "Approved school policies and institutional guidance."],
  [Download, "Prospectus & Downloads", "Official prospectus materials, notices and downloadable documents."],
  [CalendarDays, "Academic Calendar", "Confirmed term dates, examinations and important school activities."],
  [BookOpen, "Academic Resources", "Parent and learner resources published by the school."],
  [Search, "Find a Resource", "A searchable catalogue will make official documents easier to find."],
]

export default function ResourcesPage() {
  return <main className="min-h-screen bg-background pt-28">
    <section className="bg-school-dark py-16 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-school-orange">Resources</p><h1 className="text-4xl font-bold md:text-5xl">Sammena Resource Centre</h1><p className="mt-5 max-w-2xl text-white/70">One organised home for official forms, policies, prospectus materials, calendars and school resources.</p></div></section>
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{resourceGroups.map(([Icon,title,text])=>{const ResourceIcon=Icon as typeof FileText;return <div key={title as string} className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><ResourceIcon className="h-8 w-8 text-school-orange"/><h2 className="mt-5 text-xl font-bold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p><div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-school-orange">Explore catalogue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></div></div>})}</div><div className="mt-10 rounded-3xl border border-border bg-school-neutral p-8 md:p-10"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-school-orange">Publishing standard</p><h2 className="mt-2 text-2xl font-bold">Official documents only</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Resources published here should be approved Sammena documents with clear titles, dates and version information. Outdated files should be archived rather than silently reused.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-semibold text-school-orange">Ask the school <ArrowRight className="h-4 w-4"/></Link></div></div></section>
  </main>
}
