"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, GraduationCap, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "School Life" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [schoolsOpen, setSchoolsOpen] = useState(false)
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
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", isScrolled ? "border-b border-white/10 bg-[#071d3b]/95 py-2 shadow-xl backdrop-blur-xl" : "bg-gradient-to-b from-[#061a36]/90 via-[#061a36]/45 to-transparent py-3")}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Sammena Schools home">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#c9a24b]/70">
            <GraduationCap className="h-7 w-7 text-[#123f73]" />
          </div>
          <div className="leading-none">
            <span className="block text-[19px] font-extrabold tracking-[0.08em] text-white transition-colors group-hover:text-[#d8b55b]">SAMMENA</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d8b55b]">Schools</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href="/" className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", pathname === "/" ? "text-[#d8b55b]" : "text-white/80 hover:text-white")}>Home</Link>
          <div className="relative" onMouseEnter={() => setSchoolsOpen(true)} onMouseLeave={() => setSchoolsOpen(false)}>
            <button type="button" onClick={() => setSchoolsOpen((value) => !value)} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white" aria-expanded={schoolsOpen}>
              Our Schools <ChevronDown className={cn("h-4 w-4 transition-transform", schoolsOpen && "rotate-180")} />
            </button>
            <div className={cn("absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-2xl border border-[#d8b55b]/20 bg-white p-2 shadow-2xl transition-all", schoolsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0")}>
              <Link href="/" className="block rounded-xl p-4 hover:bg-[#f6f2e8]"><span className="block text-sm font-bold text-[#071d3b]">Pre & Primary School</span><span className="mt-1 block text-xs text-slate-500">Our current school community</span></Link>
              <Link href="/secondary" className="block rounded-xl p-4 hover:bg-[#f6f2e8]"><span className="flex items-center gap-2 text-sm font-bold text-[#071d3b]">Secondary School <span className="rounded-full bg-[#d8b55b]/20 px-2 py-0.5 text-[10px] font-bold uppercase text-[#8a6a24]">2028</span></span><span className="mt-1 block text-xs text-slate-500">Our planned secondary expansion</span></Link>
            </div>
          </div>
          {navLinks.map((link) => <Link key={link.href} href={link.href} className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", pathname === link.href ? "text-[#d8b55b]" : "text-white/80 hover:text-white")}>{link.label}</Link>)}
          <Link href="/admissions" className="ml-3 inline-flex items-center gap-2 rounded-xl bg-[#c9a24b] px-5 py-2.5 text-sm font-bold text-[#071d3b] shadow-lg shadow-[#c9a24b]/20 transition hover:-translate-y-0.5 hover:bg-[#dfc477]">Apply Now <ChevronRight className="h-4 w-4" /></Link>
        </div>

        <button type="button" onClick={() => setMobileOpen((value) => !value)} className="rounded-xl p-2.5 text-white transition hover:bg-white/10 lg:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div className={cn("fixed inset-x-0 bottom-0 top-[88px] bg-[#071d3b] transition-all duration-300 lg:hidden", mobileOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0")}>
        <div className="mx-auto max-w-2xl overflow-y-auto px-5 py-6">
          <Link href="/" className="mb-2 block rounded-xl px-4 py-3 text-base font-semibold text-white hover:bg-white/5">Home</Link>
          <div className="rounded-xl border border-white/10 p-2">
            <p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Our Schools</p>
            <Link href="/" className="block rounded-lg px-3 py-3 text-white/90 hover:bg-white/5">Pre & Primary School</Link>
            <Link href="/secondary" className="flex items-center justify-between rounded-lg px-3 py-3 text-white/90 hover:bg-white/5">Secondary School <span className="rounded-full bg-[#d8b55b]/20 px-2 py-0.5 text-[10px] font-bold text-[#d8b55b]">2028</span></Link>
          </div>
          {navLinks.map((link) => <Link key={link.href} href={link.href} className="mt-2 block rounded-xl px-4 py-3 text-base font-semibold text-white/90 hover:bg-white/5">{link.label}</Link>)}
          <Link href="/admissions" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#c9a24b] px-5 py-4 font-bold text-[#071d3b]">Apply for Admission <ChevronRight className="h-4 w-4" /></Link>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">SAMMENA SCHOOLS<br /><span className="text-[#d8b55b]">Building Bright Minds. Shaping Better Futures.</span></div>
        </div>
      </div>
    </header>
  )
}
