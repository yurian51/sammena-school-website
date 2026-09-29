import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"

const groups=[
  {title:"Explore",links:[[ "/", "Home" ],[ "/about","About Sammena" ],[ "/history","Our Story" ],[ "/leadership","Leadership" ],[ "/academics","Academics" ],[ "/library","Digital Library" ]]},
  {title:"Admissions",links:[[ "/admissions","Admissions" ],[ "/admissions/fees","Fees & Payment" ],[ "/calendar","Academic Calendar" ],[ "/resources","Resource Centre" ],[ "/portal","Family Portal" ]]},
  {title:"Community",links:[[ "/gallery","School Life" ],[ "/news","News & Events" ],[ "/results","Academic Results" ],[ "/policies","Policies" ],[ "/location","Location" ],[ "/contact","Contact" ]]},
]

export function Footer(){
  return <footer className="bg-[#102846] pb-[5.25rem] text-white lg:pb-0">
    <div className="border-b border-white/10"><div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-white/45 sm:px-6 lg:px-8"><span className="font-bold text-[#d7c28e]">SAMMENA SCHOOLS</span><span className="h-px w-8 bg-[#b9964f]/60"/><span>Official School Information</span></div></div>
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-10 xl:grid-cols-[1.1fr_2fr] xl:gap-20">
        <div>
          <Link href="/" className="group inline-flex items-center gap-3" aria-label="Sammena Schools home"><span className="grid h-12 w-12 place-items-center bg-white p-1 ring-1 ring-[#d7c28e]/60"><Image src="/images/Sammena_Pre_Primary_School_Logo_Clean.svg" alt="Sammena logo" width={48} height={48} className="h-full w-full object-contain"/></span><span className="leading-none"><span className="block text-lg font-extrabold tracking-[0.13em]">SAMMENA</span><span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.34em] text-[#d7c28e]">Pre & Primary School</span></span></Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/58">A considered digital home for families, learners, educators and the Sammena community.</p>
          <div className="mt-6 flex flex-wrap gap-2">{[[ "/admissions","Admissions" ],[ "/library","Digital Library" ],[ "/portal","Family Portal" ],[ "/contact","Contact" ]].map(([href,label])=><Link key={href} href={href} className="inline-flex items-center gap-2 border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-white/75 hover:border-[#b9964f]/60 hover:text-white">{label}<ArrowRight className="h-3.5 w-3.5 text-[#b9964f]"/></Link>)}</div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">{groups.map(group=><div key={group.title}><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d7c28e]">{group.title}</p><ul className="mt-4 space-y-3">{group.links.map(([href,label])=><li key={href}><Link href={href} className="group/link inline-flex items-center text-sm text-white/58 hover:text-white"><span>{label}</span><ArrowRight className="ml-1 h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100"/></Link></li>)}</ul></div>)}</div>
      </div>
      <div className="mt-10 grid border border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
        <Link href="/location" className="flex items-center gap-3 px-4 py-4 text-sm text-white/65 hover:bg-white/[.03] hover:text-white"><MapPin className="h-4 w-4 shrink-0 text-[#b9964f]"/><span><strong className="block text-xs text-white">P15336, Nduruma</strong><span className="text-xs text-white/45">Arusha, Tanzania</span></span></Link>
        <a href="tel:+255750227073" className="flex items-center gap-3 border-t border-white/10 px-4 py-4 text-sm text-white/65 hover:bg-white/[.03] hover:text-white sm:border-t-0"><Phone className="h-4 w-4 shrink-0 text-[#b9964f]"/>+255 750 227 073</a>
        <Link href="/contact" className="flex items-center gap-3 border-t border-white/10 px-4 py-4 text-sm text-white/65 hover:bg-white/[.03] hover:text-white sm:border-t-0"><Mail className="h-4 w-4 shrink-0 text-[#b9964f]"/>School Office & Contact</Link>
      </div>
      <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.08em] text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} SAMMENA SCHOOLS. All rights reserved.</p><nav aria-label="Legal and verification" className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/trust" className="inline-flex items-center gap-1.5 hover:text-white"><ShieldCheck className="h-3.5 w-3.5"/>Trust Centre</Link><Link href="/privacy" className="hover:text-white">Privacy & Data Protection</Link></nav></div>
    </div>
  </footer>
}
