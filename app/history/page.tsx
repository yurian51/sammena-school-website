import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarDays, ShieldCheck, MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { T } from "@/components/translated-text"

export const metadata: Metadata = {
  title: "School History | Sammena Pre & Primary School",
  description: "The story, development and institutional milestones of Sammena Pre & Primary School.",
  alternates: { canonical: "/history" },
}

const milestones = [
  { year: "Date to verify", title: "Founding history requires confirmation", text: "A historical Doneeractie campaign describes the school as founded in 2010 by Samwel Menavi and Mosses Mollel. An earlier version of this website listed 2009 as the beginning. School leadership should confirm the official founding date and founders before one date is presented as definitive." },
  { year: "2018", title: "Government registration", text: "The school was formally registered, strengthening its institutional structure and long-term development." },
  { year: "2025", title: "National assessment record", text: "Published 2025 assessment records show 29 PSLE candidates with 27 passing, and 28 SFNA candidates with all 28 passing." },
  { year: "Today", title: "Continuing the work", text: "Sammena continues serving children through pre-primary and primary education in Nduruma, Arusha." },
]

export default function HistoryPage() {
  return <main className="min-h-screen bg-white"><Navbar />
    <section className="bg-[#071d3b] pb-20 pt-36 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b55b]"><T text="Our Story" /></p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl"><T text="The Sammena Journey" /></h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70"><T text="A clear institutional history, presented around milestones that can be documented rather than invented for decorative purposes." /></p>
      </div>
    </section>
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]"><T text="Institutional timeline" /></p>
          <h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-5xl"><T text="From a local vision to a growing school community" /></h2>
          <p className="mt-4 leading-7 text-slate-600"><T text="This timeline uses the school profile and published academic records already held by the Sammena website. New milestones should be added only after school confirmation." /></p>
        </div>
        <aside className="mb-8 border border-[#d8b55b]/40 bg-[#fffdf6] p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a24]"><T text="Historical source note" /></p>
          <p className="mt-2 text-sm leading-7 text-slate-700"><T text="The public fundraising page " /><span className="font-semibold">“Charity Sammena School Arusha Tanzania”</span>, shared by volunteer Dominique Swinkels on Doneeractie, reports that Sammena was founded in 2010 by Samwel Menavi and Mosses Mollel. The current website also records 2018 as the formal registration milestone. Founding and registration are different events, but the previously published 2009 founding date conflicts with the fundraiser's account and is therefore flagged for confirmation.</p>
          <a href="https://www.doneeractie.nl/charity-sammena-school-arusha-tanzania/-2021" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24] hover:underline"><T text="Read original fundraising record" /> <ArrowRight className="h-4 w-4" /></a>
        </aside>
        <div className="relative border-l border-[#d8b55b]/40 pl-7 md:pl-10">
          {milestones.map((item, i) => <article key={item.year} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[2.05rem] top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#d8b55b] text-[10px] font-extrabold text-[#071d3b] md:-left-[2.55rem]">{i + 1}</span>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]"><CalendarDays className="h-4 w-4" /> <T text={item.year} /></span></div>
              <h3 className="mt-3 text-xl font-bold text-[#0a3158]"><T text={item.title} /></h3>
              <p className="mt-2 text-sm leading-7 text-slate-600"><T text={item.text} /></p>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="bg-[#f7f7f5] py-16">
      <div className="mx-auto grid max-w-5xl gap-5 px-5 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm"><ShieldCheck className="h-6 w-6 text-[#9b7728]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500"><T text="Registration" /></p><p className="mt-1 text-xl font-bold text-[#0a3158]">EM.17569</p></div>
        <div className="rounded-2xl bg-white p-6 shadow-sm"><MapPin className="h-6 w-6 text-[#9b7728]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500"><T text="Campus" /></p><p className="mt-1 text-xl font-bold text-[#0a3158]">Nduruma, Arusha</p></div>
        <div className="rounded-2xl bg-white p-6 shadow-sm"><ShieldCheck className="h-6 w-6 text-[#9b7728]" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500"><T text="NECTA Centre" /></p><p className="mt-1 text-xl font-bold text-[#0a3158]">PS0101160</p></div>
      </div>
    </section>
    <section className="bg-[#0a3158] py-16 text-white"><div className="mx-auto max-w-3xl px-5 text-center"><h2 className="text-3xl font-bold"><T text="Continue the Sammena story" /></h2><p className="mt-3 text-white/70"><T text="For verified historical corrections or new milestones, contact the school." /></p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#d8b55b] px-6 py-3 font-bold text-[#071d3b]"><T text="Contact Sammena" /> <ArrowRight className="h-4 w-4" /></Link></div></section>
    <Footer />
  </main>
}