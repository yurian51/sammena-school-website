import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"

const groups = [
  { title: "Explore", links: [["/", "Home"], ["/about", "About Sammena"], ["/academics", "Academics"], ["/secondary", "Secondary School · 2028"]] },
  { title: "Admissions & Services", links: [["/admissions", "Admissions"], ["/admissions/fees", "Fees & Payment Guide"], ["/resources", "Resource Centre"], ["/calendar", "Academic Calendar"], ["/portal", "Parent / Student Portal"]] },
  { title: "Community", links: [["/gallery", "School Life"], ["/news", "News & Events"], ["/results", "Academic Results"], ["/location", "School Location"], ["/search", "Search Website"], ["/contact", "Contact Sammena"]] },
]

const partnerLinks = ["School leadership", "Family experience", "Learning pathway", "Official notices"]

export function Footer() {
  return (
    <footer className="bg-school-dark pb-20 text-white lg:pb-0">
      <div className="border-b border-white/10 bg-white/[0.03]"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-7 gap-y-3 px-5 py-4 text-xs text-white/55 sm:px-6 lg:px-8"><span className="font-bold uppercase tracking-[0.18em] text-school-gold">SAMMENA SCHOOLS</span>{partnerLinks.map((label) => <span key={label} className="inline-flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-school-gold/70" />{label}</span>)}</div></div>
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 xl:grid-cols-[1.25fr_2fr]">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3" aria-label="SAMMENA SCHOOLS home"><Image src="/images/sammena-logo.png" alt="Sammena Pre & Primary School logo" width={48} height={48} className="h-12 w-12 rounded-sm bg-white object-cover shadow-sm ring-1 ring-[#d8b55b]/70 transition-all duration-400 group-hover:-rotate-3 group-hover:scale-105 group-hover:shadow-lg" /><span className="leading-none"><span className="block text-lg font-extrabold tracking-[0.08em] transition-colors duration-300 group-hover:text-[#d8b55b]">SAMMENA</span><span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.3em] text-school-gold">Schools</span></span></Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/70">Building bright minds and shaping better futures through learning, character, wellbeing and meaningful school experiences.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/admissions" className="group inline-flex items-center gap-2 rounded-sm bg-school-gold px-4 py-3 text-sm font-bold text-school-dark transition-all hover:-translate-y-0.5 hover:bg-school-gold-light hover:shadow-lg"><span>Apply for Admission</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><Link href="/location" className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-4 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"><MapPin className="h-4 w-4 text-school-gold" /> Find the School</Link></div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">{groups.map(group => <div key={group.title}><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-school-gold">{group.title}</h2><ul className="mt-4 space-y-3">{group.links.map(([href, label]) => <li key={href}><Link href={href} className="group/link inline-flex text-sm text-white/70 transition-all hover:translate-x-1 hover:text-white"><span>{label}</span><ArrowRight className="ml-1 h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" /></Link></li>)}</ul></div>)}</div>
        </div>
        <div className="mt-12 grid gap-4 rounded-sm border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-3"><Link href="/location" className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-school-gold" /><span><strong className="block text-white">P15336, Nduruma</strong><span>Arusha, Tanzania</span></span></Link><a href="tel:+255750227073" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white"><Phone className="h-4 w-4 shrink-0 text-school-gold" /><span>+255 750 227 073</span></a><div className="flex items-center gap-2.5 text-sm text-white/70"><Mail className="h-4 w-4 shrink-0 text-school-gold" /><span>Official school contact</span></div></div>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/40"><p>© {new Date().getFullYear()} SAMMENA SCHOOLS. All rights reserved.</p><nav aria-label="Legal and verification" className="flex flex-wrap items-center gap-4"><Link href="/trust" className="inline-flex items-center gap-1.5 hover:text-white"><ShieldCheck className="h-3.5 w-3.5" /> Trust Centre</Link><Link href="/privacy" className="hover:text-white">Privacy & Data Protection</Link><span className="inline-flex items-center gap-1.5">Established 2018 · Building Bright Minds. Shaping Better Futures. <ExternalLink className="h-3 w-3" /></span></nav></div>
      </div>
    </footer>
  )
}
