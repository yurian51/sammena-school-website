import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, HeartHandshake, GraduationCap, BookOpen, Users, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Support Sammena | Sammena Pre & Primary School",
  description: "Learn how to discuss education and school-development support with Sammena Pre & Primary School.",
  alternates: { canonical: "/sponsorship" },
}

const areas = [
  { icon: GraduationCap, title: "Education support", text: "Support focused on helping children access and continue their education." },
  { icon: BookOpen, title: "Learning materials", text: "Support for books, learning materials and other educational needs confirmed by the school." },
  { icon: Users, title: "Child welfare", text: "Support for vulnerable learners should be coordinated directly with school leadership so needs can be verified." },
  { icon: HeartHandshake, title: "School development", text: "Individuals and organisations can discuss appropriate development priorities directly with the school." },
]

export default function SponsorshipPage() {
  return <main className="min-h-screen bg-white"><Navbar />
    <section className="bg-[#071d3b] pb-20 pt-36 text-white"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Support Sammena</p><h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Help strengthen a child’s learning journey</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">A transparent starting point for people and organisations interested in supporting education or school development.</p><div className="mt-8"><Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#d8b55b] px-6 py-3 font-bold text-[#071d3b]">Discuss support <ArrowRight className="h-4 w-4" /></Link></div></div></section>
    <section className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">Areas of support</p><h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-5xl">Support should follow real needs</h2><p className="mt-4 leading-7 text-slate-600">The public website does not invent sponsorship packages, beneficiary profiles, payment accounts or donation figures. Current opportunities should be confirmed with Sammena administration.</p></div><div className="grid gap-5 md:grid-cols-2">{areas.map(({icon:Icon,title,text})=><article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4ecd6] text-[#9b7728]"><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-bold text-[#0a3158]">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></article>)}</div></div></section>
    <section className="bg-[#f7f7f5] py-16"><div className="mx-auto max-w-4xl px-5 text-center"><ShieldCheck className="mx-auto h-8 w-8 text-[#9b7728]" /><h2 className="mt-4 text-3xl font-bold text-[#0a3158]">A direct, accountable process</h2><p className="mt-3 leading-7 text-slate-600">Before sending funds or personal information, contact the school through its official channels and confirm the current support request and payment instructions.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0a3158] px-6 py-3 font-bold text-white">Contact the school <ArrowRight className="h-4 w-4" /></Link></div></section>
    <Footer />
  </main>
}