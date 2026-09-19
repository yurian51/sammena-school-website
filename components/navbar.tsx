"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, ExternalLink, Menu, X, Search, Phone, Mail, MapPin, FileText, BadgeCheck, ReceiptText, ClipboardCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const groups = [
  { label: "School", items: [["/about", "About Us", "School profile, leadership and values"], ["/academics", "Academics", "Learning, curriculum and classes"], ["/gallery", "School Life", "Campus life, activities and gallery"]] },
  { label: "Admissions", items: [["/admissions", "Admissions Overview", "How admission works, entry levels and key guidance"], ["/admissions/apply", "Start Application", "Submit a new learner admission application"], ["/admissions/fees", "Fees & Charges", "Review current admission and school fee information"], ["/admissions/track", "Track Application", "Check the status of an existing application"]] },
  { label: "Services", items: [["/services", "All School Services", "Choose a pathway for parents, students and visitors"], ["/portal/parent", "Parent & Family", "Protected family services and child information"], ["/portal/student", "Student Hub", "Protected student profile, attendance and academic information"], ["/calendar", "Academic Calendar", "Terms, examinations and school dates"], ["/resources", "Resources", "Useful school documents and resources"]] },
  { label: "Information", items: [["/news", "News & Events", "Announcements and school events"], ["/results", "Results", "Published academic results and sources"], ["/calendar", "Academic Calendar", "Terms, examinations and school dates"], ["/resources", "Resources", "Useful school documents and resources"]] },
  { label: "Connect", items: [["/location", "Location", "Find Sammena School"], ["/contact", "Contact", "Official school contact details"]] },
]

const admissionItems = [
  ["/admissions/apply", "Start Application", "Open a new admission application", FileText],
  ["/admissions", "Admission Process", "Understand the journey from enquiry to enrollment", ClipboardCheck],
  ["/admissions/fees", "Fees & Charges", "View available fee information", ReceiptText],
  ["/admissions/track", "Track Application", "Check an existing application", BadgeCheck],
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => { setMobileOpen(false); setOpenGroup(null); setMobileGroup(null) }, [pathname])
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow; document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileOpen(false) }
    document.addEventListener("keydown", onKeyDown)
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKeyDown) }
  }, [mobileOpen])
  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current) }, [])

  const scheduleDesktopGroup = (label: string | null) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpenGroup(label), label ? 60 : 90)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-[#06203b] text-white/80 md:block"><div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-[11px] sm:px-6 lg:px-8"><div className="flex items-center gap-5"><a href="tel:+255750227073" className="inline-flex items-center gap-1.5 hover:text-white"><Phone className="h-3 w-3 text-[#e2c46c]"/> +255 750 227 073</a><span className="inline-flex items-center gap-1.5"><Mail className="h-3 w-3 text-[#e2c46c]"/> Official Contact</span></div><div className="flex items-center gap-4"><Link href="/location" className="inline-flex items-center gap-1.5 font-semibold text-white/75 hover:text-white"><MapPin className="h-3 w-3 text-[#e2c46c]"/> Nduruma, Arusha</Link><Link href="/portal" className="inline-flex items-center gap-1 font-semibold text-[#e2c46c] hover:text-white">Parent / Student Portal <ExternalLink className="h-3 w-3"/></Link></div></div></div>
      <div className={cn("border-b border-white/15 bg-[#0a3158] transition-shadow duration-200", scrolled && "shadow-lg")}>
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Sammena Schools home"><Image src="/images/sammena-logo.png" alt="Sammena Pre & Primary School logo" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full bg-white object-cover"/><div className="min-w-0 leading-none"><span className="block text-[18px] font-extrabold tracking-[0.08em] text-white">SAMMENA</span><span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e2c46c]">Schools</span></div></Link>
          <div className="hidden items-center lg:flex">
            <Link href="/" className={cn("px-3 py-5 text-[13px] font-semibold", pathname === "/" ? "text-[#e2c46c]" : "text-white/85 hover:text-white")}>Home</Link>
            {groups.map(group => { const active = group.items.some(([href]) => pathname === href || (group.label === "Admissions" && pathname.startsWith("/admissions"))); const open = openGroup === group.label; return <div key={group.label} className="relative" onMouseEnter={() => scheduleDesktopGroup(group.label)} onMouseLeave={() => scheduleDesktopGroup(null)} onFocus={() => scheduleDesktopGroup(group.label)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleDesktopGroup(null) }}><button type="button" onClick={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); setOpenGroup(open ? null : group.label) }} className={cn("flex items-center gap-1 px-3 py-5 text-[13px] font-semibold transition-colors", active ? "text-[#e2c46c]" : "text-white/85 hover:text-white")} aria-expanded={open} aria-haspopup="true">{group.label}<ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}/></button>
              {group.label === "Admissions" ? <div className={cn("absolute left-1/2 top-full w-[620px] -translate-x-1/2 rounded-b-2xl border border-slate-200 bg-white p-3 shadow-2xl transition-all duration-150", open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 pointer-events-none opacity-0")} role="menu"><div className="grid grid-cols-[1.15fr_1fr] gap-3"><div className="rounded-xl bg-[#071d3b] p-5 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2c46c]">Admissions</p><h3 className="mt-2 text-xl font-bold">Join Sammena Schools</h3><p className="mt-2 text-sm leading-6 text-white/70">Explore entry requirements, fees, application and tracking in one place.</p><Link href="/admissions/apply" role="menuitem" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#c8a64b] px-4 py-2.5 text-sm font-bold text-[#071d3b] hover:bg-[#ddc16b]">Start Application <ChevronRight className="h-4 w-4"/></Link></div><div className="grid gap-1">{admissionItems.map(([href,label,description,Icon]) => <Link key={href} href={href} role="menuitem" className="group rounded-xl p-3 hover:bg-[#faf8f1]"><span className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#071d3b]/5 text-[#c8a64b]"><Icon className="h-4 w-4"/></span><span><span className="flex items-center gap-1 text-sm font-bold text-[#0a3158]">{label}<ChevronRight className="h-3.5 w-3.5 text-[#c8a64b] transition-transform group-hover:translate-x-0.5"/></span><span className="mt-0.5 block text-[11px] leading-4 text-slate-500">{description}</span></span></span></Link>)}</div></div></div> : <div className={cn("absolute left-0 top-full w-[300px] rounded-b-2xl border border-slate-200 bg-white p-2 shadow-2xl transition-all duration-150", open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 pointer-events-none opacity-0")} role="menu">{group.items.map(([href,label,description]) => <Link key={href} href={href} role="menuitem" className="block rounded-xl p-3.5 hover:bg-[#faf8f1]"><span className="flex items-center justify-between text-sm font-bold text-[#0a3158]">{label}<ChevronRight className="h-3.5 w-3.5 text-[#c8a64b]"/></span><span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span></Link>)}</div>}
            </div> })}
            <Link href="/search" className="p-3 text-white/80 hover:text-white" aria-label="Search Sammena website"><Search className="h-4 w-4"/></Link><Link href="/admissions/apply" className="ml-2 inline-flex items-center gap-2 bg-[#c8a64b] px-4 py-2.5 text-[13px] font-bold text-[#071d3b] hover:bg-[#ddc16b]">Apply Now <ChevronRight className="h-3.5 w-3.5"/></Link>
          </div>
          <button type="button" onClick={() => setMobileOpen(v => !v)} className="relative z-[90] flex min-h-11 min-w-11 items-center justify-center rounded-xl text-white hover:bg-white/10 lg:hidden" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen}>{mobileOpen ? <X/> : <Menu/>}</button>
        </nav>
      </div>
      {mobileOpen && <button type="button" aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-[2px] lg:hidden"/>}
      <div role="dialog" aria-modal="true" aria-label="Mobile navigation" className={cn("fixed left-3 right-3 top-[88px] z-[70] max-h-[78dvh] overflow-y-auto overscroll-contain rounded-2xl border border-white/20 bg-[#0a3158]/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden", mobileOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0")}>
        <Link href="/" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-xl px-4 py-3.5 text-[15px] font-semibold text-white">Home</Link>
        {groups.map(group => { const open = mobileGroup === group.label; return <div key={group.label} className="border-t border-white/10"><button type="button" onClick={() => setMobileGroup(open ? null : group.label)} className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-semibold text-white" aria-expanded={open} aria-controls={`mobile-nav-${group.label.toLowerCase()}`}><span>{group.label}</span><ChevronDown className={cn("h-4 w-4 text-[#e2c46c] transition-transform", open && "rotate-180")}/></button><div id={`mobile-nav-${group.label.toLowerCase()}`} className={cn("grid transition-[grid-template-rows,opacity] duration-200", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}><div className="min-h-0 overflow-hidden px-2 pb-1">{group.items.map(([href,label,description]) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="mb-1 flex min-h-11 items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-sm text-white/85 active:bg-white/10"><span><span className="block font-semibold text-white">{label}</span><span className="mt-0.5 block text-[11px] leading-4 text-white/55">{description}</span></span><ChevronRight className="ml-3 h-4 w-4 shrink-0 text-[#e2c46c]"/></Link>)}</div></div></div> })}
        <div className="mt-2 grid gap-2 min-[420px]:grid-cols-2"><Link onClick={() => setMobileOpen(false)} href="/portal" className="flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#e2c46c]">Parent / Student Portal</Link><Link onClick={() => setMobileOpen(false)} href="/admissions/apply" className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#c8a64b] px-4 py-3 text-sm font-bold text-[#071d3b]">Apply <ChevronRight className="h-4 w-4"/></Link></div>
      </div>
    </header>
  )
}
