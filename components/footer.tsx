import Link from "next/link"
import { ArrowRight, GraduationCap, Phone, Mail, MapPin } from "lucide-react"

const groups = [
  { title: "Explore", links: [["/", "Home"], ["/about", "About Sammena"], ["/academics", "Academics"], ["/secondary", "Secondary School · 2028"]] },
  { title: "School Services", links: [["/admissions", "Admissions"], ["/admissions/fees", "Fees & Payment Guide"], ["/resources", "Resource Centre"], ["/calendar", "Academic Calendar"], ["/portal", "Parent / Student Portal"]] },
  { title: "Community", links: [["/gallery", "School Life"], ["/news", "News & Events"], ["/search", "Search Website"], ["/contact", "Contact Sammena"]] },
]

export function Footer() {
  return (
    <footer className="bg-school-dark text-white">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="SAMMENA SCHOOLS home">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#123f73] shadow-sm ring-1 ring-[#d8b55b]/70"><GraduationCap className="h-6 w-6" /></span>
              <span className="leading-none"><span className="block text-lg font-extrabold tracking-[0.08em]">SAMMENA</span><span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.3em] text-school-gold">Schools</span></span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">Building bright minds and shaping better futures through learning, character, wellbeing and meaningful school experiences.</p>
            <Link href="/admissions" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-school-gold px-4 py-3 text-sm font-bold text-school-dark hover:bg-school-gold-light">Apply for Admission <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {groups.map(group => <div key={group.title}><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-school-gold">{group.title}</h2><ul className="mt-4 space-y-3">{group.links.map(([href,label]) => <li key={href}><Link href={href} className="text-sm text-white/60 transition hover:text-white">{label}</Link></li>)}</ul></div>)}
          </div>
        </div>
        <div className="mt-12 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-3">
          <div className="flex items-start gap-2.5 text-sm text-white/60"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-school-gold" /><span>Tanzania, East Africa</span></div>
          <div className="flex items-center gap-2.5 text-sm text-white/60"><Phone className="h-4 w-4 shrink-0 text-school-gold" /><span>Official school contact</span></div>
          <div className="flex items-center gap-2.5 text-sm text-white/60"><Mail className="h-4 w-4 shrink-0 text-school-gold" /><span>Official email</span></div>
        </div>
        <div className="mt-7 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} SAMMENA SCHOOLS. All rights reserved.</p><p>Established 2018 · Building Bright Minds. Shaping Better Futures.</p></div>
      </div>
    </footer>
  )
}
