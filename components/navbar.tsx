"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, GraduationCap, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/projects", label: "Projects" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-school-dark/95 backdrop-blur-xl shadow-2xl shadow-black/20 py-2"
          : "bg-gradient-to-b from-school-dark/50 to-transparent py-4"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-school-orange to-school-orange-light flex items-center justify-center shadow-lg shadow-school-orange/20 group-hover:shadow-xl group-hover:shadow-school-orange/30 transition-all duration-300 group-hover:scale-105">
              <GraduationCap className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="leading-tight">
              <span className="block text-white font-bold text-lg tracking-wide group-hover:text-school-orange transition-colors">
                SAMMENA
              </span>
              <span className="block text-school-orange/80 text-[10px] font-semibold tracking-[0.2em] uppercase">
                Pre & Primary
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group",
                    pathname === link.href
                      ? "text-school-orange"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                  {/* Active/hover indicator */}
                  <span className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-school-orange rounded-full transition-all duration-300",
                    pathname === link.href ? "w-4" : "w-0 group-hover:w-4"
                  )} />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/admissions"
              className={cn(
                "hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 group",
                "bg-school-orange text-white hover:bg-school-orange-light",
                "shadow-lg shadow-school-orange/20 hover:shadow-xl hover:shadow-school-orange/30",
                "hover:-translate-y-0.5"
              )}
            >
              Apply Now
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden relative p-2.5 rounded-xl transition-all duration-300",
                mobileOpen 
                  ? "bg-school-orange text-white" 
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <Menu className={cn(
                  "absolute inset-0 w-5 h-5 transition-all duration-300",
                  mobileOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                )} />
                <X className={cn(
                  "absolute inset-0 w-5 h-5 transition-all duration-300",
                  mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                )} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-school-dark/98 backdrop-blur-xl transition-all duration-500 ease-out",
        mobileOpen 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <div className="h-full overflow-y-auto">
          <ul className="px-4 py-6 space-y-2">
            {navLinks.map((link, index) => (
              <li 
                key={link.href}
                className={cn(
                  "transition-all duration-300",
                  mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: mobileOpen ? `${index * 50}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-5 py-4 rounded-xl text-base font-medium transition-all duration-300",
                    pathname === link.href
                      ? "bg-school-orange/20 text-school-orange border border-school-orange/20"
                      : "text-white/80 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  {link.label}
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform",
                    pathname === link.href ? "text-school-orange" : "text-white/40"
                  )} />
                </Link>
              </li>
            ))}
            <li 
              className={cn(
                "pt-4 transition-all duration-300",
                mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}
              style={{ transitionDelay: mobileOpen ? `${navLinks.length * 50}ms` : "0ms" }}
            >
              <Link
                href="/admissions"
                className="flex items-center justify-center gap-2 w-full px-5 py-4 text-base font-semibold bg-school-orange text-white rounded-xl hover:bg-school-orange-light transition-colors shadow-lg shadow-school-orange/20"
              >
                Apply Now
                <ChevronRight className="w-4 h-4" />
              </Link>
            </li>
          </ul>
          
          {/* Footer in mobile menu */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
            <p className="text-white/40 text-sm text-center">
              Sammena Pre & Primary School<br />
              <span className="text-school-orange/60">Changing Lives Through Education</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
