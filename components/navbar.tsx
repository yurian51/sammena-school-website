"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, GraduationCap, Menu, X, Search, Phone, Mail, CalendarDays, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/about", label: "About Sammena" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "School Life" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [schoolsOpen, setSchoolsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSchoolsOpen(false)
    setResourcesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-[#05152c] text-white/75 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-[11px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3 text-[#d8b55b]" /> School Office</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3 w-3 text-[#d8b55b]" /> Official Contact</span>
            <span className="hidden items-center gap-1.5 lg:inline-flex"><CalendarDays className="h-3 w-3 text-[#d8b55b]" /> Academic Calendar</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <Link href="/contact" className="hover:text-white">Visit Sammena</Link>
            <Link href="/portal" className="inline-flex items-center gap-1 font-semibold text-[#d8b55b] hover:text-[#efd98e]">Portal <ExternalLink className="h-3 w-3" /></Link>
          </div>
        </div>
      </div>

      <div className={cn("border-b border-white/10 transition-all duration-500", isScrolled ? "bg-[#071d3b]/98 shadow-xl backdrop-blur-xl" : "bg-[#071d3b]/88 backdrop-blur-md")}>
        <nav className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="Sammena Schools home">
            <Image src="/images/sammena-logo.png" alt="Sammena Pre & Primary School logo" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full bg-white object-cover shadow-md ring-1 ring-[#c9a24b]/80" />
            <div className="leading-none"><span className="block text-[19px] font-extrabold tracking-[0.08em] text-white group-hover:text-[#d8b55b]">SAMMENA</span><span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d8b55b]">Schools</span></div>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            <Link href="/" className={cn("rounded-md px-3 py-2.5 text-[13px] font-semibold", pathname === "/" ? "text-[#d8b55b]" : "text-white/80 hover:text-white")}>Home</Link>
            <div className="relative" onMouseEnter={() => setSchoolsOpen(true)} onMouseLeave={() => setSchoolsOpen(false)}>
              <button type="button" onClick={() => setSchoolsOpen(v => !v)} className="flex items-center gap-1 rounded-md px-3 py-2.5 text-[13px] font-semibold text-white/80 hover:text-white" aria-expanded={schoolsOpen}>Our Schools <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", schoolsOpen && "rotate-180")} /></button>
              <div className={cn("absolute left-1/2 top-full mt-2 w-[430px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl transition-all duration-300", schoolsOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[.98] opacity-0")}>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/" className="rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f6f2e8]"><span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#123f73]/10 text-[#123f73] transition-transform duration-300 group-hover:scale-105"><GraduationCap className="h-5 w-5" /></span><span className="block text-sm font-bold text-[#071d3b]">Pre & Primary School</span><span className="mt-1 block text-xs leading-relaxed text-slate-500">Our current school community and academic foundation.</span></Link>
                  <Link href="/secondary" className="rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f6f2e8]"><span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#c9a24b]/20 text-[#8a6a24]"><GraduationCap className="h-5 w-5" /></span><span className="flex items-center gap-2 text-sm font-bold text-[#071d3b]">Secondary School <span className="rounded-full bg-[#d8b55b]/20 px-2 py-0.5 text-[9px] font-bold uppercase text-[#8a6a24]">2028</span></span><span className="mt-1 block text-xs leading-relaxed text-slate-500">Our planned next stage of the Sammena education pathway.</span></Link>
                </div>
              </div>
            </div>
            {navLinks.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={cn("relative rounded-md px-3 py-2.5 text-[13px] font-semibold transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-[#d8b55b] after:transition-transform", pathname === link.href ? "text-[#d8b55b] after:scale-x-100" : "text-white/80 hover:text-white hover:after:scale-x-100")}>{link.label}</Link>)}
            <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
              <button type="button" onClick={() => setResourcesOpen(v => !v)} className="flex items-center gap-1 rounded-md px-3 py-2.5 text-[13px] font-semibold text-white/80 hover:text-white" aria-expanded={resourcesOpen}>Resources <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", resourcesOpen && "rotate-180")} /></button>
              <div className={cn("absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl transition-all duration-300", resourcesOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[.98] opacity-0")}>
                <Link href="/resources" className="block rounded-xl p-3 transition-all duration-200 hover:translate-x-1 hover:bg-[#f6f2e8]"><span className="block text-sm font-bold text-[#071d3b]">Resource Centre</span><span className="text-xs text-slate-500">Downloads and school resources</span></Link>
                <Link href="/news" className="block rounded-xl p-3 transition-all duration-200 hover:translate-x-1 hover:bg-[#f6f2e8]"><span className="block text-sm font-bold text-[#071d3b]">News & Events</span><span className="text-xs text-slate-500">Latest school updates</span></Link>
                <Link href="/calendar" className="block rounded-xl p-3 transition-all duration-200 hover:translate-x-1 hover:bg-[#f6f2e8]"><span className="block text-sm font-bold text-[#071d3b]">Academic Calendar</span><span className="text-xs text-slate-500">Key dates and activities</span></Link>
              </div>
            </div>
            <Link href="/search" className="ml-1 rounded-md p-2.5 text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white" aria-label="Search Sammena website"><Search className="h-4 w-4" /></Link>
            <Link href="/admissions" className="ml-2 inline-flex items-center gap-2 rounded-lg bg-[#c9a24b] px-4 py-2.5 text-[13px] font-bold text-[#071d3b] shadow-lg shadow-[#c9a24b]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#dfc477]">Apply Now <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" /></Link>
          </div>

          <button type="button" onClick={() => setMobileOpen(v => !v)} className="rounded-xl p-2.5 text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 lg:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </nav>
      </div>

      <div className="hidden border-t border-[#d8b55b]/20 bg-[#f6f2e8] text-[#071d3b] md:block"><div className="mx-auto flex h-8 max-w-7xl items-center justify-between gap-4 px-4 text-[11px] sm:px-6 lg:px-8"><div className="flex min-w-0 items-center gap-3"><span className="shrink-0 font-bold uppercase tracking-[0.14em] text-[#8a6a24]">Official information</span><span className="hidden truncate text-slate-500 sm:inline">Admissions, school life, academic dates and approved Sammena resources.</span></div><div className="flex shrink-0 items-center gap-4 font-semibold"><Link href="/news" className="hover:text-[#8a6a24]">News & Events</Link><Link href="/calendar" className="hover:text-[#8a6a24]">Academic Calendar</Link><Link href="/resources" className="text-[#8a6a24] hover:text-[#071d3b]">Resource Centre</Link></div></div></div>

      <div className={cn("fixed inset-x-0 bottom-0 top-[74px] overflow-y-auto bg-[#071d3b] transition-all duration-300 md:top-[110px] lg:hidden", mobileOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0")}>

        <div className="mx-auto max-w-2xl px-5 py-6">
          <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b55b]">SAMMENA SCHOOLS</div><div className="mt-1 text-sm text-white/65">Building Bright Minds. Shaping Better Futures.</div></div>
          <Link href="/" className="mb-2 block rounded-xl px-4 py-3 text-base font-semibold text-white transition-all duration-200 hover:translate-x-1 hover:bg-white/5">Home</Link>
          <div className="rounded-xl border border-white/10 p-2"><p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Our Schools</p><Link href="/" className="block rounded-lg px-3 py-3 text-white/90 transition-all duration-200 hover:translate-x-1 hover:bg-white/5">Pre & Primary School</Link><Link href="/secondary" className="flex items-center justify-between rounded-lg px-3 py-3 text-white/90 transition-all duration-200 hover:translate-x-1 hover:bg-white/5">Secondary School <span className="rounded-full bg-[#d8b55b]/20 px-2 py-0.5 text-[10px] font-bold text-[#d8b55b]">2028</span></Link></div>
          {navLinks.map(link => <Link key={link.href} href={link.href} className="mt-2 block rounded-xl px-4 py-3 text-base font-semibold text-white/90 transition-all duration-200 hover:translate-x-1 hover:bg-white/5">{link.label}</Link>)}
          <Link href="/resources" className="mt-2 block rounded-xl px-4 py-3 text-base font-semibold text-white/90 transition-all duration-200 hover:translate-x-1 hover:bg-white/5">Resources</Link><Link href="/news" className="mt-2 block rounded-xl px-4 py-3 text-base font-semibold text-white/90 transition-all duration-200 hover:translate-x-1 hover:bg-white/5">News & Events</Link><Link href="/search" className="mt-2 block rounded-xl px-4 py-3 text-base font-semibold text-white/90 transition-all duration-200 hover:translate-x-1 hover:bg-white/5">Search</Link><Link href="/portal" className="mt-2 block rounded-xl border border-white/10 px-4 py-3 text-base font-semibold text-[#d8b55b] transition-all duration-200 hover:bg-white/5">Parent / Student Portal</Link>
          <Link href="/admissions" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#c9a24b] px-5 py-4 font-bold text-[#071d3b] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#dfc477]">Apply for Admission <ChevronRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </header>
  )
}
