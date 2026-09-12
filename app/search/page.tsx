"use client"

import { FormEvent, useMemo, useState, type ReactNode } from "react"
import { Search, ArrowRight, BookOpen, CalendarDays, GraduationCap, Newspaper, X, ClipboardCheck, MapPin, Phone, Images, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const searchablePages = [
  { title: "Academic Results", description: "PSLE and SFNA results with published source references.", href: "/results", icon: ClipboardCheck, terms: "results PSLE SFNA examination exam grades performance NECTA" },
  { title: "Admissions", description: "Application process, requirements and admissions guidance.", href: "/admissions", icon: GraduationCap, terms: "admission apply requirements enrollment fees joining school" },
  { title: "Academics", description: "Academic approach, learning journey and school programmes.", href: "/academics", icon: BookOpen, terms: "academics curriculum learning subjects teaching primary education" },
  { title: "News & Events", description: "Verified school updates, announcements and events.", href: "/news", icon: Newspaper, terms: "news announcement events updates notices" },
  { title: "Academic Calendar", description: "Official dates and school activities.", href: "/calendar", icon: CalendarDays, terms: "calendar terms examinations dates activities meetings" },
  { title: "Resources", description: "Forms, policies, prospectus and official downloads.", href: "/resources", icon: BookOpen, terms: "resources forms policies prospectus downloads documents" },
  { title: "School Location", description: "Verified Sammena address, map coordinates and directions in Nduruma, Arusha.", href: "/location", icon: MapPin, terms: "location address Nduruma Arusha P15336 map directions GPS coordinates centre number registration" },
  { title: "School Gallery", description: "Photos and visual stories from Sammena school life.", href: "/gallery", icon: Images, terms: "gallery photos campus students school life images" },
  { title: "Contact Sammena", description: "Official contact details for admissions and general enquiries.", href: "/contact", icon: Phone, terms: "contact phone WhatsApp enquiries admissions visit" },
  { title: "School Trust & Verification", description: "Institutional identity, verification and published school information.", href: "/trust", icon: ShieldCheck, terms: "trust verification official identity centre registration proof" },
]

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation()
  return <div ref={ref} data-motion="section" data-visible={isVisible ? "true" : "false"} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return searchablePages
    const tokens = q.split(/\s+/).filter(Boolean)
    return searchablePages
      .map(page => {
        const haystack = `${page.title} ${page.description} ${page.terms}`.toLowerCase()
        const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? (page.title.toLowerCase().includes(token) ? 3 : 1) : 0), 0)
        return { page, score }
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.page)
  }, [query])

  const submit = (event: FormEvent) => event.preventDefault()

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <section className="relative overflow-hidden bg-school-dark pb-20 pt-36 text-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-school-gold/15 blur-3xl" />
        <Reveal>
          <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-school-gold">Search</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Find information on Sammena</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">Search the public website for admissions, academics, resources, news, results and important school information.</p>
            <form onSubmit={submit} role="search" className="mx-auto mt-8 flex max-w-2xl gap-2 rounded-sm border border-white/10 bg-white p-2 shadow-lg">
              <Search className="ml-3 mt-3 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              <input aria-label="Search Sammena website" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search admissions, location, results..." className="min-w-0 flex-1 bg-transparent px-2 py-3 text-slate-900 outline-none placeholder:text-slate-400" />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X className="h-4 w-4" /></button>}
              <button type="submit" className="rounded-sm bg-school-dark px-5 py-3 font-bold text-white transition hover:-translate-y-0.5">Search</button>
            </form>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:py-20">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">{query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Explore Sammena"}</h2>
          {query && <button type="button" onClick={() => setQuery("")} className="text-sm font-semibold text-school-gold">Clear search</button>}
        </div>
        {results.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map(({ title, description, href, icon: Icon }, index) => (
              <Reveal key={href} delay={index * 40}>
                <Link href={href} data-motion="card" className="group block rounded-sm border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-school-gold/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-gold">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-school-gold/10 transition group-hover:bg-school-gold"><Icon className="h-5 w-5 text-school-gold transition group-hover:text-school-dark" aria-hidden="true" /></div>
                    <div><h3 className="font-bold group-hover:text-school-gold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-school-gold">Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal><div className="rounded-sm border border-dashed border-border bg-school-neutral p-10 text-center"><Search className="mx-auto h-8 w-8 text-school-gold" aria-hidden="true" /><p className="mt-4 font-semibold">No matching public page found.</p><p className="mt-2 text-sm text-muted-foreground">Try a broader term such as admissions, location, academics, calendar or resources.</p></div></Reveal>
        )}
      </section>
      <Footer />
    </main>
  )
}
