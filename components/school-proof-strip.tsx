import Link from "next/link"
import { ArrowUpRight, BadgeCheck, MapPin, ShieldCheck } from "lucide-react"
import { getLatestResult, schoolIdentity } from "@/lib/academic-results"

export function SchoolProofStrip() {
  const psle = getLatestResult("PSLE")
  const sfna = getLatestResult("SFNA")

  return (
    <section aria-label="Sammena school facts" className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:grid-cols-4">
        <div className="flex items-center gap-3 px-0 py-5 sm:px-5 lg:px-6">
          <BadgeCheck className="h-5 w-5 shrink-0 text-[#9b7728]" aria-hidden="true" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">PSLE {psle.year}</p>
            <p className="mt-1 text-lg font-extrabold text-[#0a3158]">{psle.passRate ?? "—"}% pass rate</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-0 py-5 sm:px-5 lg:px-6">
          <ShieldCheck className="h-5 w-5 shrink-0 text-[#9b7728]" aria-hidden="true" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Academic record</p>
            <p className="mt-1 text-lg font-extrabold text-[#0a3158]">{schoolIdentity.centreNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-0 py-5 sm:px-5 lg:px-6">
          <MapPin className="h-5 w-5 shrink-0 text-[#9b7728]" aria-hidden="true" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Campus</p>
            <p className="mt-1 text-sm font-bold text-[#0a3158]">{schoolIdentity.location}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 px-0 py-5 sm:px-5 lg:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Results archive</p>
            <p className="mt-1 text-sm font-bold text-[#0a3158]">PSLE & SFNA records</p>
          </div>
          <Link href="/results" className="inline-flex min-h-10 items-center gap-1 border border-[#0a3158]/15 px-3 text-xs font-bold text-[#8a6a24] hover:bg-[#faf8f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">
            Verify <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <p className="sr-only">Latest SFNA result: {sfna.year}, school average {sfna.average.toFixed(2)}, grade {sfna.grade}.</p>
    </section>
  )
}
