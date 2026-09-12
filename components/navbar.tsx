"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, ExternalLink, Menu, X, Search, Phone, Mail, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "School Life" },
  { href: "/news", label: "News & Events" },
  { href: "/results", label: "Results" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [schoolsOpen, setSchoolsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false)
      if (event.key !== "Tab") return
      const items = Array.from(document.querySelectorAll<HTMLElement>("[data-mobile-nav] a, [data-mobile-nav] button"))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener("keydown", onKeyDown)
    const first = document.querySelector<HTMLElement>("[data-mobile-nav] a, [data-mobile-nav] button")
    first?.focus()
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKeyDown) }
  }, [mobileOpen])

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-[#06203b] text-white/80 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-[11px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-5"><a href="tel:+255750227073" className="inline-flex items-center gap-1.5 hover:text-white"><Phone className="h-3 w-3 text-[#e2c46c]" /> +255 750 227 073</a><span className="inline-flex items-center gap-1.5"><Mail className="h-3 w-3 text-[#e2c46c]" /> Official Contact</span></div>
          <div className="flex items-center gap-4"><Link href="/location" className="inline-flex items-center gap-1.5 font-semibold text-white/75 hover:text-white"><MapPin className="h-3 w-3 text-[#e2c46c]" /> Nduruma, Arusha</Link><Link href="/resources" className="hover:text-white">Resources</Link><Link href="/calendar" className="hover:text-white">Academic Calendar</Link><Link href="/results" className="hover:text-white">Results</Link><Link href="/portal" className="inline-flex items-center gap-1 font-semibold text-[#e2c46c] hover:text-white">Parent / Student Portal <ExternalLink className="h-3 w-3" /></Link></div>
        </div>
      </div>

      <div className={cn("border-b border-white/15 bg-[#0a3158] transition-shadow duration-200", scrolled && "shadow-lg")}>
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Sammena Schools home">
            <Image src="/images/sammena-logo.png" alt="Sammena Pre & Primary School logo" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full bg-white object-cover" />
            <div className="min-w-0 leading-none"><span className="block text-[18px] font-extrabold tracking-[0.08em] text-white">SAMMENA</span><span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e2c46c]">Schools</span></div>
          </Link>

          <div className="hidden items-center lg:flex">
            <Link href="/" className={cn("px-3 py-5 text-[13px] font-semibold", pathname === "/" ? "text-[#e2c46c]" : "text-white/85 hover:text-white")} aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
            <div className="relative" onMouseEnter={() => setSchoolsOpen(true)} onMouseLeave={() => setSchoolsOpen(false)} onFocus={() => setSchoolsOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setSchoolsOpen(false) }}><button id="schools-menu-button" type="button" onClick={() => setSchoolsOpen(v => !v)} className="flex items-center gap-1 px-3 py-5 text-[13px] font-semibold text-white/85 hover:text-white" aria-expanded={schoolsOpen} aria-controls="schools-menu" aria-haspopup="true">Our Schools <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", schoolsOpen && "rotate-180")} /></button><div id="schools-menu" role="menu" aria-labelledby="schools-menu-button" className={cn("absolute left-0 top-full w-[360px] border border-slate-200 bg-white shadow-xl", schoolsOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none")}><Link role="menuitem" href="/" className="block border-b border-slate-100 p-5 hover:bg-[#faf8f1]"><span className="block text-sm font-bold text-[#0a3158]">Pre & Primary School</span><span className="mt-1 block text-xs leading-5 text-slate-500">Current school community and academic foundation.</span></Link><Link role="menuitem" href="/secondary" className="block p-5 hover:bg-[#faf8f1]"><span className="flex items-center gap-2 text-sm font-bold text-[#0a3158]">Secondary School <span className="bg-[#f4ecd6] px-2 py-0.5 text-[9px] font-bold uppercase text-[#8a6a24]">2028</span></span><span className="mt-1 block text-xs leading-5 text-slate-500">Planned next stage of the Sammena education pathway.</span></Link></div></div>
            {navLinks.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={cn("relative px-3 py-5 text-[13px] font-semibold after:absolute after:bottom-3 after:left-3 after:right-3 after:h-0.5 after:bg-[#e2c46c] after:transition-transform", pathname === link.href ? "text-[#e2c46c] after:scale-x-100" : "text-white/85 after:scale-x-0 hover:text-white hover:after:scale-x-100")}>{link.label}</Link>)}
            <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)} onFocus={() => setResourcesOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setResourcesOpen(false) }}><button id="resources-menu-button" type="button" onClick={() => setResourcesOpen(v => !v)} className="flex items-center gap-1 px-3 py-5 text-[13px] font-semibold text-white/85 hover:text-white" aria-expanded={resourcesOpen} aria-controls="resources-menu" aria-haspopup="true">Resources <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", resourcesOpen && "rotate-180")} /></button><div id="resources-menu" role="menu" aria-labelledby="resources-menu-button" className={cn("absolute right-0 top-full w-60 border border-slate-200 bg-white p-2 shadow-xl", resourcesOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none")}><Link role="menuitem" href="/resources" className="block p-3 text-sm font-semibold text-[#0a3158] hover:bg-[#faf8f1]">Resource Centre</Link><Link role="menuitem" href="/calendar" className="block p-3 text-sm font-semibold text-[#0a3158] hover:bg-[#faf8f1]">Academic Calendar</Link><Link role="menuitem" href="/search" className="block p-3 text-sm font-semibold text-[#0a3158] hover:bg-[#faf8f1]">Search Website</Link></div></div>
            <Link href="/search" className="p-3 text-white/80 hover:text-white" aria-label="Search Sammena website"><Search className="h-4 w-4" aria-hidden="true" /></Link><Link href="/admissions" className="ml-2 inline-flex items-center gap-2 bg-[#c8a64b] px-4 py-2.5 text-[13px] font-bold text-[#071d3b] hover:bg-[#ddc16b]">Apply Now <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
          </div>

          <button type="button" onClick={() => setMobileOpen(v => !v)} className="relative z-[90] flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e2c46c] lg:hidden" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation">{mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}</button>
        </nav>
      </div>

      {mobileOpen && <button type="button" aria-label="Close navigation menu" onClick={closeMobileMenu} className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-[2px] lg:hidden" />}

      <div id="mobile-navigation" data-mobile-nav role="dialog" aria-modal="true" aria-label="Mobile navigation" className={cn("fixed left-3 right-3 top-[88px] z-[70] max-h-[72dvh] overflow-y-auto overscroll-contain rounded-2xl border border-white/20 bg-[#0a3158]/82 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 lg:hidden", mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 pointer-events-none opacity-0")}>
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2c46c]">Sammena Schools</div>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.035]">
          {[["/","Home"],["/about","About"],["/academics","Academics"],["/admissions","Admissions"],["/gallery","School Life"],["/news","News & Events"],["/results","Results"],["/location","Location"],["/resources","Resources"],["/calendar","Academic Calendar"],["/contact","Contact"]].map(([href,label], index) => <Link key={href} onClick={closeMobileMenu} href={href} aria-current={pathname === href ? "page" : undefined} className={cn("block px-4 py-3.5 text-[15px] font-semibold text-white", index < 10 && "border-b border-white/10")}>{label}</Link>)}
        </div>
        <div className="mt-2 grid gap-2 min-[420px]:grid-cols-2">
          <Link onClick={closeMobileMenu} href="/portal" className="flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-[#e2c46c]">Parent / Student Portal</Link>
          <Link onClick={closeMobileMenu} href="/admissions" className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#c8a64b] px-4 py-3 text-sm font-bold text-[#071d3b]">Apply <ChevronRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </header>
  )
}
