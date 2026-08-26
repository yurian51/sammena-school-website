import Link from "next/link"
import { ArrowRight, Bell, CalendarDays, Newspaper } from "lucide-react"

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="border-b border-border bg-school-dark py-16 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-school-orange">News & Events</p><h1 className="text-4xl font-bold md:text-5xl">Sammena Updates</h1><p className="mt-5 max-w-2xl text-white/70">A central place for verified school news, official announcements, achievements and upcoming events.</p></div></section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-6 md:grid-cols-3"><div className="rounded-2xl border border-border bg-card p-7"><Newspaper className="h-8 w-8 text-school-orange"/><h2 className="mt-5 text-xl font-bold">Latest News</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Verified stories and institutional updates will appear here.</p></div><div className="rounded-2xl border border-border bg-card p-7"><Bell className="h-8 w-8 text-school-orange"/><h2 className="mt-5 text-xl font-bold">Announcements</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Important notices for parents, students and the school community.</p></div><div className="rounded-2xl border border-border bg-card p-7"><CalendarDays className="h-8 w-8 text-school-orange"/><h2 className="mt-5 text-xl font-bold">Events</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">School activities and calendar highlights, published as dates are confirmed.</p></div></div><div className="mt-10 rounded-2xl border border-dashed border-border bg-school-neutral p-8 text-center"><p className="font-semibold">No public updates have been published yet.</p><p className="mt-2 text-sm text-muted-foreground">This hub is ready for the Sammena content management workflow.</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 font-semibold text-school-orange">Contact Sammena <ArrowRight className="h-4 w-4"/></Link></div></section>
    </main>
  )
}
