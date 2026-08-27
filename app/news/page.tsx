import Link from "next/link"
import { ArrowRight, Bell, CalendarDays, Newspaper, Search, Megaphone } from "lucide-react"

const categories = ["All", "News", "Announcements", "Events"]

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="bg-school-dark py-16 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-school-orange">News & Events</p><h1 className="text-4xl font-bold md:text-5xl">Sammena Updates</h1><p className="mt-5 max-w-2xl text-white/70">A central institutional hub for verified school news, official announcements, achievements and confirmed events.</p></div></section>
      <section className="border-b border-border bg-card"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div className="flex flex-wrap gap-2">{categories.map((category, i) => <button key={category} type="button" className={`rounded-full px-4 py-2 text-xs font-semibold ${i === 0 ? "bg-school-dark text-white" : "bg-school-neutral text-foreground hover:bg-muted"}`}>{category}</button>)}</div><Link href="/search" className="inline-flex items-center gap-2 text-sm font-semibold text-school-orange"><Search className="h-4 w-4"/> Search updates</Link></div></section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[{icon: Newspaper,title:"Latest News",text:"Verified stories and institutional updates."},{icon: Bell,title:"Announcements",text:"Important notices for the school community."},{icon: CalendarDays,title:"Events",text:"Confirmed activities and key dates."},{icon: Megaphone,title:"Achievements",text:"Learner and school achievements published when confirmed."}].map(({icon:Icon,title,text})=><div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><Icon className="h-7 w-7 text-school-orange"/><h2 className="mt-5 font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}
        </div>
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-school-neutral p-10 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-sm"><Newspaper className="h-7 w-7 text-school-orange"/></div><h2 className="mt-5 text-2xl font-bold">No public updates published yet</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">This publishing hub is ready for approved Sammena content. Only verified information should be presented as an official school update.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-semibold text-school-orange">Contact Sammena <ArrowRight className="h-4 w-4"/></Link></div>
      </section>
    </main>
  )
}
