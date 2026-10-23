import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, HeartHandshake, GraduationCap, BookOpen, Users, ShieldCheck, ExternalLink, Landmark, Clock3 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Support Sammena | Sammena Pre & Primary School",
  description: "Learn about Sammena's historical community fundraising record and how to coordinate verified school-development support.",
  alternates: { canonical: "/sponsorship" },
}

const campaignUrl = "https://www.doneeractie.nl/charity-sammena-school-arusha-tanzania/-2021"

const areas = [
  { icon: GraduationCap, title: "Education support", text: "Support focused on helping children access and continue their education." },
  { icon: BookOpen, title: "Learning materials", text: "Support for books, learning materials and other educational needs confirmed by the school." },
  { icon: Users, title: "Child welfare", text: "Support for vulnerable learners should be coordinated directly with school leadership so needs can be verified." },
  { icon: HeartHandshake, title: "School development", text: "Individuals and organisations can discuss appropriate development priorities directly with the school." },
]

export default function SponsorshipPage() {
  return <main className="min-h-screen bg-white"><Navbar />
    <section className="bg-[#071d3b] pb-20 pt-36 text-white"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Support Sammena</p><h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Help strengthen a child’s learning journey</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">A transparent starting point for people and organisations interested in supporting education or school development.</p><div className="mt-8"><Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#d8b55b] px-6 py-3 font-bold text-[#071d3b]">Discuss support <ArrowRight className="h-4 w-4" /></Link></div></div></section>

    <section className="border-b border-slate-200 bg-[#faf8f1] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">Historical community support</p><h2 className="mt-3 text-3xl font-bold leading-tight text-[#0a3158] md:text-4xl">A documented fundraising campaign for Sammena</h2><p className="mt-4 text-sm leading-7 text-slate-600">A public Doneeractie campaign titled “Charity Sammena School Arusha Tanzania”, shared by volunteer Dominique Swinkels, records an earlier effort to support school expansion. This is a historical record, not an open donation channel.</p></div>
          <article className="border border-[#d8c99e] bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#8a6a24]"><Landmark className="h-4 w-4" /> Doneeractie public record</span><span className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600"><Clock3 className="h-3.5 w-3.5" /> Campaign closed</span></div>
            <h3 className="mt-5 text-xl font-bold text-[#0a3158]">Charity Sammena School Arusha Tanzania</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="bg-[#f7f7f5] p-4"><p className="text-xs text-slate-500">Raised</p><p className="mt-1 text-2xl font-black text-[#0a3158]">€5,804</p></div>
              <div className="bg-[#f7f7f5] p-4"><p className="text-xs text-slate-500">Target</p><p className="mt-1 text-2xl font-black text-[#0a3158]">€4,650</p></div>
              <div className="col-span-2 bg-[#f7f7f5] p-4 sm:col-span-1"><p className="text-xs text-slate-500">Donations recorded</p><p className="mt-1 text-2xl font-black text-[#0a3158]">87</p></div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">The page reports that the campaign exceeded its stated target. These amounts describe the fundraiser’s published totals only; they do not establish the school’s current balance, current funding needs, or how funds were ultimately spent.</p>
            <a href={campaignUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 bg-[#0a3158] px-5 py-3 text-sm font-bold text-white hover:bg-[#17365d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9964f]">Read original campaign <ExternalLink className="h-4 w-4" /></a>
          </article>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="border border-slate-200 bg-white p-6"><h3 className="font-bold text-[#0a3158]">What the campaign said the money was for</h3><p className="mt-3 text-sm leading-7 text-slate-600">At the time, the organiser described a larger school building project: two offices and one classroom were said to be ready, while three classrooms and toilets for pupils and teachers were still being built. Flooring, roofing and toilet materials were listed as needs then.</p><p className="mt-3 text-xs leading-5 text-slate-500">Historical needs only. The school should confirm which works were completed and what is needed today before this information is used for a new appeal.</p></article>
          <article className="border border-slate-200 bg-white p-6"><h3 className="font-bold text-[#0a3158]">Historical school information to verify</h3><p className="mt-3 text-sm leading-7 text-slate-600">The campaign describes Sammena as a private pre-primary and primary school founded in 2010 by Samwel Menavi and Mosses Mollel. Other material currently on the website gives different establishment dates. This discrepancy is flagged for school leadership to confirm, rather than silently treating one date as official.</p><Link href="/history" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24] hover:underline">Review school history <ArrowRight className="h-4 w-4" /></Link></article>
        </div>
      </div>
    </section>

    <section className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">Areas of support</p><h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-5xl">Support should follow real needs</h2><p className="mt-4 leading-7 text-slate-600">The public website does not invent sponsorship packages, beneficiary profiles, payment accounts or donation figures. Current opportunities should be confirmed with Sammena administration.</p></div><div className="grid gap-5 md:grid-cols-2">{areas.map(({icon:Icon,title,text})=><article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4ecd6] text-[#9b7728]"><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-bold text-[#0a3158]">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></article>)}</div></div></section>
    <section className="bg-[#f7f7f5] py-16"><div className="mx-auto max-w-4xl px-5 text-center"><ShieldCheck className="mx-auto h-8 w-8 text-[#9b7728]" /><h2 className="mt-4 text-3xl font-bold text-[#0a3158]">A direct, accountable process</h2><p className="mt-3 leading-7 text-slate-600">Before sending funds or personal information, contact the school through its official channels and confirm the current support request and payment instructions. The historical Doneeractie campaign is closed and should not be presented as an active payment route.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0a3158] px-6 py-3 font-bold text-white">Contact the school <ArrowRight className="h-4 w-4" /></Link></div></section>
    <Footer />
  </main>
}
