import Link from "next/link"
import { ExternalLink, GraduationCap, ShieldCheck, TrendingUp } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { getLatestResult, getResults, schoolIdentity, type ResultType } from "@/lib/academic-results"

const sfnaArchiveSources = [
  { year: 2022, label: "NECTA SFNA 2022 Arusha district index", url: "https://onlinesys.necta.go.tz/results/2022/sfna/results/distr_ps0101.htm", level: "District archive index" },
  { year: 2023, label: "NECTA SFNA 2023 Arusha district index", url: "https://onlinesys.necta.go.tz/results/2023/sfna/results/distr_ps0101.htm", level: "District archive index" },
  { year: 2024, label: "NECTA SFNA 2024 Sammena result", url: "https://onlinesys.necta.go.tz/results/2024/sfna/results/ps0101160.htm", level: "School-level official record" },
  { year: 2025, label: "Sammena SFNA 2025 published summary", url: "https://shuleyetu.co.tz/shuleni/school/ps0101160-sammena-primary-school-arusha-dc", level: "Secondary school summary" },
]

function OfficialResultFrame({ result }: { result: ReturnType<typeof getResults>[number] }) {
  const officialUrl = result.sourceKind === "official" ? result.sourceUrl : result.officialIndexUrl
  if (!officialUrl) return null
  const isSchoolLevel = result.sourceKind === "official"
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6a24]">{isSchoolLevel ? "Original examination page" : "Official NECTA results index"}</p>
          <p className="mt-1 text-sm font-semibold text-[#071d3b]">{isSchoolLevel ? "NECTA published view, preserved as the source appearance" : "Official published index retained for source verification"}</p>
        </div>
        <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">Open source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>
      </div>
      <iframe title={`${result.year} ${result.type} official results source`} src={officialUrl} loading="lazy" className="block h-[760px] w-full border-0 bg-white sm:h-[900px] lg:h-[1050px]" referrerPolicy="no-referrer" />
    </div>
  )
}

function ResultCard({ result }: { result: ReturnType<typeof getResults>[number] }) {
  const official = result.sourceKind === "official"
  const hasOfficialIndex = Boolean(result.officialIndexUrl)
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><span className="rounded-full bg-[#071d3b] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d8b55b]">{result.type}</span><h2 className="mt-4 text-2xl font-bold text-[#071d3b]">{result.year}</h2></div>
        <div className="text-right"><p className="text-3xl font-extrabold text-[#071d3b]">{result.average.toFixed(2)}</p><p className="text-xs text-slate-500">School average</p></div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 ${official ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}><ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />{official ? "Official school-level source" : "Secondary published school summary"}</span>
        {hasOfficialIndex && <a href={result.officialIndexUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">Official NECTA index <ExternalLink className="h-3 w-3" /></a>}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Candidates</p><p className="mt-1 font-bold text-[#071d3b]">{result.candidates}</p></div>
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Overall grade</p><p className="mt-1 font-bold text-[#071d3b]">{result.grade}</p></div>
        {result.passed !== undefined && <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Passed</p><p className="mt-1 font-bold text-[#071d3b]">{result.passed}</p></div>}
        {result.passRate !== undefined && <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Pass rate</p><p className="mt-1 font-bold text-[#071d3b]">{result.passRate}%</p></div>}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">{Object.entries(result.grades).map(([grade, count]) => <span key={grade} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">{grade}: {count}</span>)}</div>
      <OfficialResultFrame result={result} />
      <a href={result.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24] hover:text-[#071d3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">{result.sourceLabel} <ExternalLink className="h-4 w-4" /></a>
    </article>
  )
}

export default function ResultsPage() {
  const psle = getResults("PSLE" satisfies ResultType)
  const sfna = getResults("SFNA" satisfies ResultType)
  const latestPsle = getLatestResult("PSLE")
  const officialCount = getResults().filter((result) => result.sourceKind === "official").length
  const secondaryCount = getResults().filter((result) => result.sourceKind === "secondary").length
  return (
    <main className="min-h-screen bg-[#f8fafc]"><Navbar /><section className="bg-[#071d3b] pb-20 pt-36 text-white"><div className="mx-auto max-w-6xl px-5 sm:px-6"><div className="max-w-3xl"><span className="inline-flex items-center gap-2 rounded-full border border-[#d8b55b]/30 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d8b55b]"><GraduationCap className="h-4 w-4" /> Academic Results</span><h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">Sammena academic results</h1><p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">A transparent results archive for {schoolIdentity.name}, using published examination records and clearly identifying the source of each result.</p></div></div></section>
      <section className="py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5 sm:px-6"><div className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Latest PSLE</p><p className="mt-2 text-2xl font-black text-[#071d3b]">{latestPsle.year}</p><p className="mt-1 text-sm text-slate-500">Average {latestPsle.average.toFixed(2)}</p></div><div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Official records</p><p className="mt-2 text-2xl font-black text-[#071d3b]">{officialCount}</p><p className="mt-1 text-sm text-slate-600">School-level public sources</p></div><div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-800">Secondary records</p><p className="mt-2 text-2xl font-black text-[#071d3b]">{secondaryCount}</p><p className="mt-1 text-sm text-slate-600">Clearly labelled summaries</p></div></div>
          <div className="mt-5 rounded-3xl border border-[#d8b55b]/25 bg-[#f8f4e9] p-6 sm:p-8"><div className="flex gap-4"><ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[#8a6a24]" /><div><h2 className="font-bold text-[#071d3b]">Verified public records</h2><p className="mt-2 text-sm leading-6 text-slate-600">Centre number: <strong>{schoolIdentity.centreNumber}</strong>. Each card exposes whether its figures come from an official school-level record or a secondary published summary. When NECTA provides an official index, the index is embedded directly too, so the archive does not hide the primary source behind a typed number.</p></div></div></div>
          <div className="mt-12"><div className="flex items-end justify-between gap-4"><div><span className="text-sm font-bold uppercase tracking-[0.18em] text-[#9a7628]">Darasa la Saba</span><h2 className="mt-2 text-3xl font-bold text-[#071d3b]">PSLE results</h2></div><Link href="/trust" className="inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24] hover:underline"><TrendingUp className="h-4 w-4" /> Evidence ledger</Link></div><div className="mt-6 grid gap-5 lg:grid-cols-2">{psle.map(result => <ResultCard key={result.type + result.year} result={result} />)}</div></div>
          <div className="mt-16"><div><span className="text-sm font-bold uppercase tracking-[0.18em] text-[#9a7628]">Darasa la Nne</span><h2 className="mt-2 text-3xl font-bold text-[#071d3b]">SFNA results</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">SFNA coverage now starts from the 2022 archive. Where a school-level figure is not yet verified, the page links to the official district archive instead of inventing a number. Humanity survives another day without fabricated statistics.</p></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{sfnaArchiveSources.map(source => <a key={source.year} href={source.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]"><div className="flex items-center justify-between gap-2"><span className="text-xl font-black text-[#071d3b]">{source.year}</span><ExternalLink className="h-4 w-4 text-[#8a6a24]" aria-hidden="true" /></div><p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-[#8a6a24]">{source.level}</p><p className="mt-2 text-sm font-semibold leading-5 text-slate-700">{source.label}</p></a>)}</div><div className="mt-6 grid gap-5 lg:grid-cols-2">{sfna.map(result => <ResultCard key={result.type + result.year} result={result} />)}</div></div>
        </div></section><Footer /></main>
  )
}
