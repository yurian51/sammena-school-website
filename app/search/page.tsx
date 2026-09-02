"use client"

import { FormEvent, useMemo, useState, type ReactNode } from "react"
import { Search, ArrowRight, BookOpen, CalendarDays, GraduationCap, Newspaper, X } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const searchablePages = [
  { title: "Admissions", description: "Application process, requirements and admissions guidance.", href: "/admissions", icon: GraduationCap, terms: "admission apply requirements enrollment" },
  { title: "Academics", description: "Academic approach, learning journey and school programmes.", href: "/academics", icon: BookOpen, terms: "academics curriculum learning subjects" },
  { title: "News & Events", description: "Verified school updates, announcements and events.", href: "/news", icon: Newspaper, terms: "news announcement events updates" },
  { title: "Academic Calendar", description: "Official dates and school activities.", href: "/calendar", icon: CalendarDays, terms: "calendar terms examinations dates" },
  { title: "Resources", description: "Forms, policies, prospectus and official downloads.", href: "/resources", icon: BookOpen, terms: "resources forms policies prospectus downloads" },
]

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation()
  return <div ref={ref} data-motion="section" data-visible={isVisible ? "true" : "false"} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const results = useMemo(() => { const q = query.trim().toLowerCase(); if (!q) return searchablePages; return searchablePages.filter(p => `${p.title} ${p.description} ${p.terms}`.toLowerCase().includes(q)) }, [query])
  const submit = (event: FormEvent) => event.preventDefault()
  return <main className="min-h-screen overflow-x-hidden bg-background"><Navbar/><section className="relative overflow-hidden bg-school-dark pb-20 pt-36 text-white"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-school-gold/15 blur-3xl"/><Reveal><div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6"><p className="text-sm font-bold uppercase tracking-[0.2em] text-school-gold">Search</p><h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Find information on Sammena</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">Search the public website for admissions, academics, resources, news and important dates.</p><form onSubmit={submit} className="mx-auto mt-8 flex max-w-2xl gap-2 rounded-2xl border border-white/10 bg-white p-2 shadow-2xl"><Search className="ml-3 mt-3 h-5 w-5 shrink-0 text-slate-400"/><input aria-label="Search Sammena website" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search admissions, academics, resources..." className="min-w-0 flex-1 bg-transparent px-2 py-3 text-slate-900 outline-none placeholder:text-slate-400"/>{query && <button type="button" onClick={()=>setQuery("")} aria-label="Clear search" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X className="h-4 w-4"/></button>}<button type="submit" className="rounded-xl bg-school-dark px-5 py-3 font-bold text-white transition hover:-translate-y-0.5">Search</button></form></div></Reveal></section><section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:py-20"><div className="mb-8 flex items-center justify-between gap-4"><h2 className="text-xl font-bold">{query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Explore Sammena"}</h2>{query && <button type="button" onClick={()=>setQuery("")} className="text-sm font-semibold text-school-gold">Clear search</button>}</div>{results.length ? <div className="grid gap-4 md:grid-cols-2">{results.map(({title,description,href,icon:Icon}, index)=><Reveal key={href} delay={index*60}><Link href={href} data-motion="card" className="group block rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-school-gold/40 hover:shadow-lg"><div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-school-gold/10 transition group-hover:bg-school-gold"><Icon className="h-5 w-5 text-school-gold transition group-hover:text-school-dark"/></div><div><h3 className="font-bold group-hover:text-school-gold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-school-gold">Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"/></span></div></div></Link></Reveal>)}</div> : <Reveal><div className="rounded-3xl border border-dashed border-border bg-school-neutral p-10 text-center"><Search className="mx-auto h-8 w-8 text-school-gold"/><p className="mt-4 font-semibold">No matching public page found.</p><p className="mt-2 text-sm text-muted-foreground">Try a broader term such as admissions, academics, calendar or resources.</p></div></Reveal>}</section><Footer/></main>
}
