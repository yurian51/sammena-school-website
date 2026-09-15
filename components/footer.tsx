import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"

const groups = [
  { title: "Explore", links: [["/", "Home"], ["/about", "About Sammena"], ["/academics", "Academics"], ["/secondary", "Secondary School · 2028"]] },
  { title: "Admissions & Services", links: [["/admissions", "Admissions"], ["/admissions/fees", "Fees & Payment Guide"], ["/resources", "Resource Centre"], ["/calendar", "Academic Calendar"], ["/portal", "Parent / Student Portal"]] },
  { title: "Community", links: [["/gallery", "School Life"], ["/news", "News & Events"], ["/results", "Academic Results"], ["/location", "School Location"], ["/search", "Search Website"], ["/contact", "Contact Sammena"]] },
]

const quickServices = [
  ["/admissions", "Admissions"],
  ["/portal", "Family Portal"],
  ["/calendar", "Calendar"],
  ["/resources", "Resources"],
]

export function Footer() {
  return (
    <footer className="bg-school-dark pb-[5.25rem] text-white lg:pb-0">
      <div className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-5 py-3 text-[11px] text-white/55 scrollbar-none sm:px-6 lg:px-8">
          <span className="shrink-0 font-bold uppercase tracking-[0.16em] text-school-gold">SAMMENA DIGITAL SCHOOL</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-school-gold/70" />
          <span className="shrink-0">Admissions</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-white/20" />
          <span className="shrink-0">Family Services</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-white/20" />
          <span className="shrink-0">Learning Resources</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_2fr] xl:gap-14">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3" aria-label="SAMMENA SCHOOLS home">
              <Image src="/images/sammena-logo.png" alt="Sammena Pre & Primary School logo" width={44} height={44} className="h-11 w-11 rounded-sm bg-white object-cover shadow-sm ring-1 ring-[#d8b55b]/70 transition-all duration-300 group-hover:scale-105" />
              <span className="leading-none">
                <span className="block text-lg font-extrabold tracking-[0.08em] group-hover:text-school-gold">SAMMENA</span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.3em] text-school-gold">Schools</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">Building bright minds and shaping better futures through learning, character, wellbeing and meaningful school experiences.</p>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {quickServices.map(([href, label]) => (
                <Link key={href} href={href} className="inline-flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-white/80 transition hover:border-school-gold/40 hover:bg-school-gold/10 hover:text-white">
                  <span>{label}</span><ArrowRight className="h-3.5 w-3.5 text-school-gold" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 sm:gap-8">
            {groups.map((group) => (
              <details key={group.title} className="group border-b border-white/10 last:border-0 sm:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs font-bold uppercase tracking-[0.16em] text-school-gold [&::-webkit-details-marker]:hidden sm:cursor-default sm:py-0">
                  {group.title}
                  <span className="text-lg font-light text-white/40 transition-transform group-open:rotate-45 sm:hidden">+</span>
                </summary>
                <ul className="space-y-2 pb-3 sm:mt-4 sm:space-y-3 sm:pb-0">
                  {group.links.map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="group/link inline-flex text-sm text-white/65 transition-colors hover:text-white">
                        <span>{label}</span><ArrowRight className="ml-1 h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-8 grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] sm:grid-cols-3 sm:divide-x sm:divide-white/10">
          <Link href="/location" className="flex items-center gap-3 px-4 py-3.5 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white">
            <MapPin className="h-4 w-4 shrink-0 text-school-gold" />
            <span><strong className="block text-xs text-white">P15336, Nduruma</strong><span className="text-xs text-white/50">Arusha, Tanzania</span></span>
          </Link>
          <a href="tel:+255750227073" className="flex items-center gap-3 border-t border-white/10 px-4 py-3.5 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white sm:border-t-0">
            <Phone className="h-4 w-4 shrink-0 text-school-gold" /><span>+255 750 227 073</span>
          </a>
          <Link href="/contact" className="flex items-center gap-3 border-t border-white/10 px-4 py-3.5 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white sm:border-t-0">
            <Mail className="h-4 w-4 shrink-0 text-school-gold" /><span>School Office & Contact</span>
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SAMMENA SCHOOLS. All rights reserved.</p>
          <nav aria-label="Legal and verification" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/trust" className="inline-flex items-center gap-1.5 hover:text-white"><ShieldCheck className="h-3.5 w-3.5" /> Trust Centre</Link>
            <Link href="/privacy" className="hover:text-white">Privacy & Data Protection</Link>
            <span>Established 2018</span>
          </nav>
        </div>
      </div>
    </footer>
  )
}
