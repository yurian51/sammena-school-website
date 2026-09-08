"use client"

import Link from "next/link"
import { BarChart3, ExternalLink, GraduationCap, ShieldCheck, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const psle = [
  { year: 2025, candidates: 29, average: "162.72", grade: "—", pass: "93.1%", note: "27 of 29 passed", source: "https://shuleyetu.co.tz/shuleni/school/ps0101160-sammena-primary-school-arusha-dc", verified: true },
  { year: 2024, candidates: 17, average: "198.0588", grade: "B", pass: "—", note: "2 A, 9 B, 5 C, 1 D", source: "https://onlinesys.necta.go.tz/results/2024/psle/results/shl_ps0101160.htm", verified: true },
  { year: 2023, candidates: 18, average: "222.8889", grade: "B", pass: "—", note: "17 B, 1 C", source: "https://onlinesys.necta.go.tz/results/2023/psle/results/shl_ps0101160.htm", verified: true },
  { year: 2022, candidates: 16, average: "210.9375", grade: "B", pass: "—", note: "3 A, 10 B, 3 C", source: "https://onlinesys.necta.go.tz/results/2022/psle/results/shl_ps0101160.htm", verified: true },
  ...[2021, 2020, 2019, 2018].map(year => ({
    year, candidates: null, average: null, grade: null, pass: null,
    note: "NECTA school archive identified; school-level summary still requires source extraction.",
    source: `https://onlinesys.necta.go.tz/results/${year}/psle/results/shl_ps0101160.htm`,
    verified: false,
  })),
]

const sfna = [
  { year: 2025, candidates: 28, average: "192.04", grade: "—", pass: "100%", note: "28 of 28 passed", source: "https://shuleyetu.co.tz/shuleni/school/ps0101160-sammena-primary-school-arusha-dc", verified: true },
  { year: 2024, candidates: 34, average: "174.1176", grade: "C", pass: "—", note: "1 A, 17 B, 12 C, 3 D, 1 referred", source: "https://onlinesys.necta.go.tz/results/2024/sfna/results/ps0101160.htm", verified: true },
  { year: 2023, candidates: 18, average: "188.44", grade: "—", pass: "—", note: "0 A, 10 B, 8 C; Arusha DC detailed result", source: "https://arusha.go.tz/storage/app/media/uploaded-files/SAMMENA%20-%20DETAILED.pdf", verified: true },
  ...[2022, 2021, 2020, 2019, 2018].map(year => ({
    year, candidates: null, average: null, grade: null, pass: null,
    note: "NECTA/SFNA archive identified; school-level summary still requires source extraction.",
    source: `https://onlinesys.necta.go.tz/results/${year}/sfna/results/ps0101160.htm`,
    verified: false,
  })),
]

function ResultTable({ title, subtitle, rows }: { title: string; subtitle: string; rows: typeof psle }) {
  return (
    <section className="border-t border-slate-200 bg-white py-14 sm:py-18">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6a24]">{subtitle}</p>
            <h2 className="mt-2 text-3xl font-bold text-[#0a3158] sm:text-4xl">{title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">Historical results are presented as an institutional archive. Figures are only displayed when independently verified from an accessible source. Historical years remain visible with a direct archive link while older school-level figures are being recovered.</p>
        </div>

        <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#0a3158] text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Year</th>
                  <th className="px-5 py-4 font-semibold">Candidates</th>
                  <th className="px-5 py-4 font-semibold">School Average</th>
                  <th className="px-5 py-4 font-semibold">Grade</th>
                  <th className="px-5 py-4 font-semibold">Performance</th>
                  <th className="px-5 py-4 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.year} className={index % 2 ? "bg-[#faf8f1]" : "bg-white"}>
                    <td className="px-5 py-4 font-bold text-[#0a3158]">{row.year}</td>
                    <td className="px-5 py-4 text-slate-700">{row.candidates ?? "Not verified"}</td>
                    <td className="px-5 py-4 text-slate-700">{row.average ?? "Not verified"}</td>
                    <td className="px-5 py-4 text-slate-700">{row.grade ?? "—"}</td>
                    <td className="px-5 py-4 text-slate-600">{row.pass ?? row.note}</td>
                    <td className="px-5 py-4">
                      <a href={row.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-[#8a6a24] hover:text-[#0a3158]">
                        {row.verified ? (row.source.includes("shuleyetu") ? "School record" : "Verified result") : "Open official archive"} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ResultsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[112px]">
        <section className="bg-[#0a3158] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e2c46c]">Academic Record • PS0101160</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Examination Results</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">A central archive of Sammena Primary School results for Standard Seven (PSLE) and Standard Four (SFNA), beginning with the 2018 historical record.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-[#faf8f1] py-10">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-3 lg:px-10">
            {[
              { icon: GraduationCap, title: "PSLE • Standard 7", text: "Primary School Leaving Examination results." },
              { icon: BarChart3, title: "SFNA • Standard 4", text: "Standard Four National Assessment results." },
              { icon: ShieldCheck, title: "Source-first archive", text: "Verified figures are linked to NECTA or a traceable results archive." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="border border-slate-200 bg-white p-6">
                <Icon className="h-5 w-5 text-[#8a6a24]" />
                <h2 className="mt-4 font-bold text-[#0a3158]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <ResultTable title="Standard Seven Results" subtitle="PSLE • Darasa la Saba" rows={psle} />
        <ResultTable title="Standard Four Results" subtitle="SFNA • Darasa la Nne" rows={sfna} />

        <section className="border-t border-slate-200 bg-[#0a3158] py-14 text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e2c46c]">Official centre</p>
                <h2 className="mt-2 text-2xl font-bold">SAMMENA PRIMARY SCHOOL — PS0101160</h2>
                <p className="mt-2 text-sm text-white/70">Historical archive from 2018 onward. Candidate-level identifiers are intentionally not reproduced on this public page. Older school-level figures are not invented when the indexed source cannot currently be extracted.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#c8a64b] px-5 py-3 font-bold text-[#071d3b] hover:bg-[#ddc16b]">Contact the School <TrendingUp className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
