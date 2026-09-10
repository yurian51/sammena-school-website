import Link from "next/link"
import { ArrowLeft, ExternalLink, FileCheck2, MapPin, ShieldCheck } from "lucide-react"
import { schoolIdentity, getResults } from "@/lib/academic-results"

export const metadata = {
  title: "Trust Centre",
  description: "Verified identity, academic records and public-source links for Sammena Schools.",
}

const officialRecords = getResults().filter((result) => result.sourceKind === "official")

export default function TrustPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071d3b]">
      <section className="bg-[#071d3b] text-white">
        <div className="mx-auto max-w-5xl px-5 pb-14 pt-32 sm:px-8">
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-white/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Sammena</Link>
          <div className="mt-10 flex items-start gap-4"><ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-[#d8b55b]" aria-hidden="true" /><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Public verification</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Sammena Trust Centre</h1><p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">The place to check the school's published identity and the evidence behind the academic information shown on this website.</p></div></div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><FileCheck2 className="h-6 w-6 text-[#9b7728]" aria-hidden="true" /><p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Centre number</p><p className="mt-2 text-2xl font-black">{schoolIdentity.centreNumber}</p><p className="mt-2 text-sm text-slate-500">Used to identify the school in published examination records.</p></article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><ShieldCheck className="h-6 w-6 text-[#9b7728]" aria-hidden="true" /><p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Registration</p><p className="mt-2 text-2xl font-black">{schoolIdentity.registrationNumber}</p><p className="mt-2 text-sm text-slate-500">School registration identifier published with the school's identity.</p></article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><MapPin className="h-6 w-6 text-[#9b7728]" aria-hidden="true" /><p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Location</p><p className="mt-2 text-xl font-black">{schoolIdentity.location}</p><p className="mt-2 text-sm text-slate-500">Public-facing campus location used across the site.</p></article>
        </div>

        <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Evidence ledger</p><h2 className="mt-2 text-2xl font-extrabold">Official school-level records</h2></div><Link href="/results" className="text-sm font-bold text-[#8a6a24] hover:underline">Full results archive</Link></div>
          <div className="mt-6 divide-y divide-slate-100">{officialRecords.map((result) => <div key={`${result.type}-${result.year}`} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="font-bold">{result.type} {result.year}</p><p className="mt-1 text-sm text-slate-500">Average {result.average.toFixed(2)} · Grade {result.grade}</p></div><a href={result.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-xs font-bold text-[#0a3158] hover:bg-slate-50">Open source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a></div>)}</div>
        </article>

        <article className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8"><h2 className="text-xl font-extrabold">Evidence policy</h2><p className="mt-3 text-sm leading-7 text-slate-700">Official records are separated from secondary summaries. A secondary figure is never presented as an official school-level record. Historical years without sufficient evidence are omitted instead of being filled with plausible-looking numbers.</p><p className="mt-4 text-sm leading-7 text-slate-700">The academic results page provides the source label for every published result and links to the underlying public record where available.</p></article>
      </section>
    </main>
  )
}
