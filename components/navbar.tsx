"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, ExternalLink, Menu, X, Search, Phone, Mail, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const groups = [
  { label: "School", items: [["/about","About Us","School profile, leadership and values"],["/history","Our Story","Institutional story and milestones"],["/leadership","Leadership","Leadership and governance"],["/academics","Academics","Learning, curriculum and classes"],["/policies","Policies","Published school policies"],["/gallery","School Life","Campus life and activities"]] },
  { label: "Admissions", items: [["/admissions","Admissions Overview","Entry levels and guidance"],["/admissions/apply","Start Application","Submit a new learner application"],["/admissions/fees","Fees & Charges","Current fee information"],["/admissions/track","Track Application","Check an existing application"]] },
  { label: "Services", items: [["/services","School Services","Services for families and visitors"],["/portal/parent","Parent & Family","Protected family services"],["/portal/student","Student Hub","Protected student services"],["/calendar","Academic Calendar","Terms and school dates"],["/resources","Resources","Documents and learning resources"]] },
  { label: "Information", items: [["/news","News & Events","Announcements and events"],["/results","Results","Published academic results"],["/library","Digital Library","Learning resources and books"],["/resources","Resource Centre","School documents and forms"]] },
  { label: "Connect", items: [["/location","Location","Find Sammena School"],["/contact","Contact","Official school contact details"],["/sponsorship","Support Sammena","Support school development"]] },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenGroup(null)
    setMobileGroup(null)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const old = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = old
      document.removeEventListener("keydown", onKey)
    }
  }, [mobileOpen])

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const schedule = (label: string | null) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpenGroup(label), label ? 50 : 90)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden border-b border-white/10 bg-[#102846] text-white/65 md:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-5 text-[10px] uppercase tracking-[0.12em]">
          <div className="flex items-center gap-5">
            <a href="tel:+255750227073" className="inline-flex items-center gap-1.5 hover:text-white"><Phone className="h-3 w-3 text-[#d7c28e]" />+255 750 227 073</a>
            <Link href="/contact" className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="h-3 w-3 text-[#d7c28e]" />Contact</Link>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/location" className="inline-flex items-center gap-1.5 hover:text-white"><MapPin className="h-3 w-3 text-[#d7c28e]" />Nduruma, Arusha</Link>
            <Link href="/portal" className="inline-flex items-center gap-1.5 font-semibold text-[#d7c28e] hover:text-white">Parent / Student Portal <ExternalLink className="h-3 w-3" /></Link>
          </div>
        </div>
      </div>

      <div className={cn("border-b border-white/10 bg-[#17365d]/95 backdrop-blur-md transition-all duration-300", scrolled && "shadow-[0_12px_40px_rgba(16,40,70,.16)]")}>
        <nav className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8" aria-label="Primary navigation">
          <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Sammena Pre & Primary School home">
            <span className="grid h-[52px] w-[52px] shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-white/20 shadow-sm">
              <Image
                src="/images/Sammena_Pre_Primary_School_Logo_Clean.svg"
                alt="Sammena Pre & Primary School official logo"
                width={52}
                height={52}
                priority
                className="h-full w-full object-cover"
              />
            </span>
            <span className="min-w-0 leading-none">
              <span className="block text-[17px] font-extrabold tracking-[0.13em] text-white">SAMMENA</span>
              <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.34em] text-[#d7c28e]">Pre & Primary School</span>
            </span>
          </Link>

          <div className="hidden items-center lg:flex">
            <Link href="/" className={cn("px-3 py-5 text-[12px] font-semibold tracking-wide", pathname === "/" ? "text-[#d7c28e]" : "text-white/75 hover:text-white")}>Home</Link>
            {groups.map((group) => {
              const active = group.items.some(([href]) => pathname === href || (group.label === "Admissions" && pathname.startsWith("/admissions")))
              const open = openGroup === group.label
              return (
                <div key={group.label} className="relative" onMouseEnter={() => schedule(group.label)} onMouseLeave={() => schedule(null)}>
                  <button type="button" onClick={() => setOpenGroup(open ? null : group.label)} className={cn("flex items-center gap-1 px-3 py-5 text-[12px] font-semibold tracking-wide transition-colors", active ? "text-[#d7c28e]" : "text-white/75 hover:text-white")} aria-expanded={open} aria-haspopup="true">
                    {group.label}<ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
                  </button>
                  <div className={cn("absolute left-0 top-full w-[310px] border border-[#e6e1d7] bg-white p-2 shadow-[0_24px_70px_rgba(16,40,70,.18)] transition-all", open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 pointer-events-none opacity-0")} role="menu">
                    {group.items.map(([href, label, description]) => (
                      <Link key={href} href={href} role="menuitem" className="block p-3 hover:bg-[#f5f3ee]">
                        <span className="flex items-center justify-between text-sm font-bold text-[#17365d]">{label}<ChevronRight className="h-3.5 w-3.5 text-[#b9964f]" /></span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
            <Link href="/search" className="ml-1 p-3 text-white/70 hover:text-white" aria-label="Search Sammena website"><Search className="h-4 w-4" /></Link>
            <Link href="/admissions/apply" className="ml-2 inline-flex items-center gap-2 bg-[#b9964f] px-4 py-2.5 text-[12px] font-bold text-[#102846] transition hover:bg-[#d7c28e]">Apply Now <ChevronRight className="h-3.5 w-3.5" /></Link>
          </div>

          <button type="button" onClick={() => setMobileOpen((value) => !value)} className="relative z-[90] grid min-h-11 min-w-11 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {mobileOpen && <button type="button" aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-[55] bg-[#102846]/25 backdrop-blur-[2px] lg:hidden" />}

      <div role="dialog" aria-modal="true" aria-label="Mobile navigation" className={cn("fixed left-3 right-3 top-[88px] z-[70] max-h-[78dvh] overflow-y-auto border border-white/15 bg-[#17365d]/98 p-2 shadow-2xl lg:hidden", mobileOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0")}>
        <Link href="/" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center px-4 py-3 text-[14px] font-semibold text-white">Home</Link>
        {groups.map((group) => {
          const open = mobileGroup === group.label
          return (
            <div key={group.label} className="border-t border-white/10">
              <button type="button" onClick={() => setMobileGroup(open ? null : group.label)} className="flex min-h-12 w-full items-center justify-between px-4 py-3 text-left text-[14px] font-semibold text-white" aria-expanded={open}>
                <span>{group.label}</span><ChevronDown className={cn("h-4 w-4 text-[#d7c28e]", open && "rotate-180")} />
              </button>
              <div className={cn("grid transition-[grid-template-rows,opacity] duration-200", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="min-h-0 overflow-hidden px-2 pb-1">
                  {group.items.map(([href, label, description]) => (
                    <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="mb-1 flex min-h-11 items-center justify-between bg-white/5 px-3 py-2.5 text-sm text-white/85">
                      <span><span className="block font-semibold text-white">{label}</span><span className="mt-0.5 block text-[11px] leading-4 text-white/55">{description}</span></span>
                      <ChevronRight className="ml-3 h-4 w-4 shrink-0 text-[#d7c28e]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
        <div className="mt-2 grid gap-2 min-[420px]:grid-cols-2">
          <Link onClick={() => setMobileOpen(false)} href="/portal" className="flex min-h-11 items-center justify-center border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-[#d7c28e]">Parent / Student Portal</Link>
          <Link onClick={() => setMobileOpen(false)} href="/admissions/apply" className="flex min-h-11 items-center justify-center gap-2 bg-[#b9964f] px-4 py-3 text-sm font-bold text-[#102846]">Apply <ChevronRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </header>
  )
}
