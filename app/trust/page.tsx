import Link from "next/link"
import { ArrowLeft, ExternalLink, FileCheck2, MapPin, ShieldCheck } from "lucide-react"
import { schoolIdentity, getResults } from "@/lib/academic-results"

export const metadata = {
  title: "Trust Centre",
  description: "Verified identity, academic records and public-source links for Sammena Schools.",
}

const officialRecords = getResults().filter((result) => result.sourceKind === "official")
const secondaryRecords = getResults().filter((result) => result.sourceKind === "secondary")

const historicalAuditYears = [2018, 2019, 2020, 2021]

function EvidenceRow({ result }: { result: ReturnType<typeof getResults>[number] }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
      <div>
        <p className="font-bold">{result.type} {result.year}</p>
        <p className="mt-1 text-sm text-slate-500">Average {result.average.toFixed(2)} · Grade {result.grade} · {result.candidates} candidates</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <a href={result.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-xs font-bold text-[#0a3158] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">Open source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>
        {result.officialIndexUrl && <a href={result.officialIndexUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-[#c8a64b]/40 bg-[#faf8f1] px-3 text-xs font-bold text-[#8a6a24] hover:bg-[#f5efdf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">Official index <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>}
      </div>
    </div>
  )
}

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
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Evidence ledger</p><h2 className="mt-2 text-2xl font-extrabold">Official school-level records</h2></div><Link href="/results" className="text-sm font-bold text-[#8a6a24] hover:underline">Full results archive</Link></div>
          <p className="mt-3 text-sm leading-6 text-slate-500">These records are published as official school-level examination pages and remain distinct from secondary summaries.</p>
          <div className="mt-4 divide-y divide-slate-100">{officialRecords.map((result) => <EvidenceRow key={`${result.type}-${result.year}`} result={result} />)}</div>
        </article>

        <article className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">Secondary evidence</p>
          <h2 className="mt-2 text-xl font-extrabold">Published summaries are labelled separately</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">A secondary source can help expose a result that is publicly reported elsewhere, but it is not silently promoted to an official school-level record.</p>
          <div className="mt-3 divide-y divide-amber-200/70">{secondaryRecords.map((result) => <EvidenceRow key={`${result.type}-${result.year}`} result={result} />)}</div>
          <p className="mt-4 text-sm leading-7 text-slate-700">For PSLE 2025, the published summary is linked to the official NECTA district index as an independent verification path. It is intentionally not relabelled as a school-level NECTA page.</p>
        </article>

        <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Historical archive audit</p><h2 className="mt-2 text-xl font-extrabold">2018–2021 are explicitly disclosed</h2></div>
            <Link href="/results#historical-archive-title" className="text-sm font-bold text-[#8a6a24] hover:underline">View full audit</Link>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">A school-level Sammena page was not located in the current indexed NECTA search for these years. This does not prove that the examinations or results did not exist.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {historicalAuditYears.map((year) => <div key={year} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><span className="font-bold">{year}</span><span className="text-xs font-semibold text-slate-500">Not located in indexed archive</span></div>)}
          </div>
        </article>

        <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-extrabold">What we do not publish as fact</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>• Historical examination figures that could not be verified from a sufficiently reliable public source.</li>
            <li>• Claims that a secondary summary is an official school-level examination record.</li>
            <li>• Personal learner information inside a public results archive.</li>
          </ul>
        </article>

        <article className="mt-6 rounded-2xl border border-[#c8a64b]/30 bg-[#faf8f1] p-6 sm:p-8">
          <h2 className="text-xl font-extrabold">Verification and privacy</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">The evidence ledger is designed to make source confidence visible. Personal information is handled separately under the site's privacy approach.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/results" className="inline-flex min-h-11 items-center rounded-md bg-[#071d3b] px-5 py-3 text-sm font-bold text-white hover:bg-[#0a3158] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">View results</Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center rounded-md border border-[#071d3b]/15 bg-white px-5 py-3 text-sm font-bold text-[#071d3b] hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">Privacy & data protection</Link>
          </div>
        </article>
      </section>
    </main>
  )
}
