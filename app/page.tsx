"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bell, BookOpen, CalendarDays, FileText, GraduationCap, MapPin, MessageCircle, Phone, ShieldCheck, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InstitutionalSections } from "@/components/institutional-sections"
import { SchoolProofStrip } from "@/components/school-proof-strip"

const quickLinks=[
  {href:"/admissions",title:"Admissions",text:"Entry guidance, requirements and application information.",icon:GraduationCap},
  {href:"/academics",title:"Academics",text:"Curriculum, learning programmes and academic information.",icon:BookOpen},
  {href:"/calendar",title:"Academic Calendar",text:"Important school dates, terms and activities.",icon:CalendarDays},
  {href:"/library",title:"Digital Library",text:"Verified learning resources and educational books.",icon:FileText},
]

export default function HomePage(){
  return <main className="min-h-screen overflow-x-clip bg-[#fbfaf7] text-[#172033]">
    <Navbar/>
    <section className="relative overflow-hidden border-b border-[#e6e1d7] bg-[#102846] pt-[82px] text-white sm:pt-[82px]">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative z-10 flex min-h-[500px] flex-col justify-center px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="institutional-rule text-[11px] font-bold uppercase tracking-[0.24em] text-[#d7c28e]">SAMMENA SCHOOLS · ARUSHA</p>
          <h1 className="mt-6 max-w-2xl text-[clamp(2.5rem,6vw,4.7rem)] font-semibold leading-[1.03] tracking-[-0.035em]">A considered beginning for a lifetime of learning.</h1>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/68 sm:text-base">Sammena Pre & Primary School is a learning community centred on strong foundations, character, responsibility and meaningful opportunities for every child.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/admissions" className="inline-flex min-h-12 items-center gap-2 bg-[#b9964f] px-5 py-3 text-sm font-bold text-[#102846] transition hover:bg-[#d7c28e]">Explore Admissions <ArrowRight className="h-4 w-4"/></Link>
            <Link href="/about" className="inline-flex min-h-12 items-center gap-2 border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5">Discover Sammena</Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs text-white/48"><ShieldCheck className="h-4 w-4 text-[#b9964f]"/> Official school information, published with care.</div>
        </div>
        <div className="media-frame relative min-h-[320px] lg:min-h-[610px]"><Image src="/images/hero-bg.jpg" alt="Sammena school campus" fill priority sizes="(max-width:1023px) 100vw,55vw" className="object-cover"/></div>
      </div>
    </section>

    <SchoolProofStrip/>

    <section className="border-b border-[#e6e1d7] bg-white">
      <div className="mx-auto grid max-w-7xl divide-y divide-[#e6e1d7] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[["/admissions","Admissions","Begin your application journey"],["/academics","Academics","Explore learning at Sammena"],["/contact","Contact","Speak with the school directly"]].map(([href,label,text],i)=><Link key={href} href={href} className="group flex items-center justify-between px-5 py-5 sm:px-7 lg:px-9"><span><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#b9964f]">{label}</span><span className="mt-1 block text-sm font-semibold text-[#17365d]">{text}</span></span><ArrowRight className="h-4 w-4 text-[#b9964f] transition-transform group-hover:translate-x-1"/></Link>)}
      </div>
    </section>

    <section className="bg-[#fbfaf7] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b9964f]">Information centre</p><h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#17365d] sm:text-4xl">Everything important, without the noise.</h2></div>
          <p className="max-w-2xl text-sm leading-7 text-[#687184]">The Sammena digital experience is organised around the information families actually need: joining the school, understanding learning, finding dates, and accessing verified resources.</p>
        </div>
        <div className="mt-10 grid border border-[#e6e1d7] bg-[#e6e1d7] sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(({href,title,text,icon:Icon})=><Link key={href} href={href} className="group bg-white p-7 transition hover:bg-[#f8f5ed]"><Icon className="h-6 w-6 text-[#b9964f]" aria-hidden="true"/><h3 className="mt-7 text-lg font-semibold text-[#17365d]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#687184]">{text}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8d713b]">Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"/></span></Link>)}
        </div>
      </div>
    </section>

    <section className="border-y border-[#e6e1d7] bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="media-frame relative aspect-[4/3] border border-[#e6e1d7]"><Image src="/images/about-school.jpg" alt="Students at Sammena School" fill sizes="(max-width:1023px) 100vw,50vw" className="object-cover"/></div>
        <div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b9964f]">The Sammena approach</p><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#17365d] sm:text-4xl">Education grounded in learning, character and community.</h2><p className="mt-5 text-sm leading-7 text-[#687184]">Our public website is designed to be as thoughtful as the institution it represents. Families can move from school information to practical services without navigating a maze of visual noise.</p><Link href="/about" className="link-arrow mt-7 text-sm font-bold uppercase tracking-[0.1em] text-[#8d713b]">Read about Sammena <ArrowRight className="h-4 w-4"/></Link></div>
      </div>
    </section>

    <InstitutionalSections/>

    <section className="border-t border-[#e6e1d7] bg-[#102846] py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d7c28e]">Our community</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">A school is built by its people.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/62">Students, teachers, families and the wider community each contribute to a respectful and purposeful learning environment.</p></div>
        <div className="grid border border-white/10 sm:grid-cols-2"><div className="p-6"><Users className="h-5 w-5 text-[#d7c28e]"/><p className="mt-4 text-sm font-semibold">Students & families</p></div><div className="border-t border-white/10 p-6 sm:border-l sm:border-t-0"><BookOpen className="h-5 w-5 text-[#d7c28e]"/><p className="mt-4 text-sm font-semibold">Teaching & learning</p></div></div>
      </div>
    </section>

    <section className="border-t border-[#e6e1d7] bg-white py-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9964f]">Need assistance?</p><p className="mt-1 text-sm text-[#687184]">Speak with the school about admissions and general enquiries.</p></div><div className="flex flex-wrap gap-2"><a href="tel:+255750227073" className="inline-flex min-h-11 items-center gap-2 border border-[#17365d]/15 px-4 py-3 text-sm font-bold text-[#17365d] hover:bg-[#f5f3ee]"><Phone className="h-4 w-4"/>Call +255 750 227 073</a><a href="https://wa.me/255750227073" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 bg-[#17365d] px-4 py-3 text-sm font-bold text-white hover:bg-[#102846]"><MessageCircle className="h-4 w-4"/>WhatsApp</a><Link href="/location" className="inline-flex min-h-11 items-center gap-2 border border-[#17365d]/15 px-4 py-3 text-sm font-bold text-[#17365d] hover:bg-[#f5f3ee]"><MapPin className="h-4 w-4"/>Location</Link></div></div></section>
    <Footer/>
  </main>
}
