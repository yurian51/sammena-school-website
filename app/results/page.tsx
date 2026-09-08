import Link from "next/link";
import { ArrowRight, ExternalLink, GraduationCap } from "lucide-react";

const psle = [
  { year: 2025, sat: 29, passed: 27, rate: "93.1%", average: "162.72", grades: "27 passed out of 29", source: "https://shuleyetu.co.tz/shuleni/school/ps0101160-sammena-primary-school-arusha-dc", verified: "2025 summary" },
  { year: 2024, sat: 17, passed: 16, rate: "94.1%", average: "198.0588", grades: "A: 2 · B: 9 · C: 5 · D: 1 · E: 0", source: "https://onlinesys.necta.go.tz/results/2024/psle/results/shl_ps0101160.htm", verified: "NECTA" },
  { year: 2023, sat: 18, passed: 18, rate: "100%", average: "222.8889", grades: "A: 0 · B: 17 · C: 1 · D: 0 · E: 0", source: "https://onlinesys.necta.go.tz/results/2023/psle/results/shl_ps0101160.htm", verified: "NECTA" },
  { year: 2022, sat: 16, passed: 16, rate: "100%", average: "210.9375", grades: "A: 3 · B: 10 · C: 3 · D: 0 · E: 0", source: "https://onlinesys.necta.go.tz/results/2022/psle/results/shl_ps0101160.htm", verified: "NECTA" },
  { year: 2021, sat: null, passed: null, rate: null, average: null, grades: "School listed in Arusha PSLE archive; individual result not retrieved.", source: "https://maktaba.tetea.org/exam-results/PSLE2021/distr_0101.htm", verified: "Archive index" },
  { year: 2020, sat: null, passed: null, rate: null, average: null, grades: "School listed in Arusha PSLE archive; individual result not retrieved.", source: "https://maktaba.tetea.org/exam-results/PSLE2020/distr_0101.htm", verified: "Archive index" },
  { year: 2019, sat: null, passed: null, rate: null, average: null, grades: "School listed in Arusha PSLE archive; individual result not retrieved.", source: "https://maktaba.tetea.org/exam-results/PSLE2019/distr_0101.htm", verified: "Archive index" },
  { year: 2018, sat: null, passed: null, rate: null, average: null, grades: "Individual school result not retrieved from accessible archive.", source: "https://www.necta.go.tz/", verified: "NECTA archive portal" },
];

const sfna = [
  { year: 2025, sat: 28, passed: 28, rate: "100%", average: "192.04", grades: "A: 3 · B: 14 · C: 10 · D: 1", source: "https://shuleyetu.co.tz/shuleni/school/ps0101160-sammena-primary-school-arusha-dc", verified: "2025 summary" },
  { year: 2024, sat: 34, passed: 33, rate: "97.1%", average: "174.1176", grades: "A: 1 · B: 17 · C: 12 · D: 3 · Referred: 1", source: "https://onlinesys.necta.go.tz/results/2024/sfna/results/ps0101160.htm", verified: "NECTA" },
  { year: 2023, sat: 18, passed: 18, rate: "100%", average: "188.44", grades: "A: 0 · B: 10 · C: 8", source: "https://arusha.go.tz/storage/app/media/uploaded-files/SAMMENA%20-%20DETAILED.pdf", verified: "Arusha DC" },
  { year: 2022, sat: null, passed: null, rate: null, average: null, grades: "Individual school result not retrieved from accessible archive.", source: "https://www.necta.go.tz/", verified: "NECTA archive portal" },
  { year: 2021, sat: null, passed: null, rate: null, average: null, grades: "School listed in Arusha SFNA archive; individual result not retrieved.", source: "https://maktaba.tetea.org/exam-results/SFNA2021/distr_ps0101.htm", verified: "Archive index" },
  { year: 2020, sat: null, passed: null, rate: null, average: null, grades: "Individual school result not retrieved from accessible archive.", source: "https://www.necta.go.tz/", verified: "NECTA archive portal" },
  { year: 2019, sat: null, passed: null, rate: null, average: null, grades: "School listed in Arusha SFNA archive; individual result not retrieved.", source: "https://maktaba.tetea.org/exam-results/SFNA2019/distr_ps0101.htm", verified: "Archive index" },
  { year: 2018, sat: null, passed: null, rate: null, average: null, grades: "Individual school result not retrieved from accessible archive.", source: "https://www.necta.go.tz/", verified: "NECTA archive portal" },
];

function ResultTable({ rows, title }: { rows: typeof psle; title: string }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6a24]">National examination archive</p><h2 className="mt-2 text-2xl font-bold text-slate-950">{title}</h2></div>
        <p className="text-sm text-slate-500">Centre: PS0101160</p>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500"><th className="px-3 py-3">Year</th><th className="px-3 py-3">Sat</th><th className="px-3 py-3">Passed</th><th className="px-3 py-3">Rate</th><th className="px-3 py-3">Average</th><th className="px-3 py-3">Grades / note</th><th className="px-3 py-3">Source</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r.year} className="border-b border-slate-100 align-top last:border-0"><td className="px-3 py-4 font-bold text-slate-950">{r.year}</td><td className="px-3 py-4">{r.sat ?? "—"}</td><td className="px-3 py-4">{r.passed ?? "—"}</td><td className="px-3 py-4 font-semibold">{r.rate ?? "—"}</td><td className="px-3 py-4">{r.average ?? "—"}</td><td className="max-w-md px-3 py-4 text-slate-600">{r.grades}</td><td className="px-3 py-4"><a href={r.source} target="_blank" rel="noopener noreferrer" className="link-arrow inline-flex items-center gap-1 font-semibold text-[#8a6a24]">{r.verified}<ExternalLink className="h-3.5 w-3.5" /></a></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

export default function ResultsPage() {
  return <main className="min-h-screen bg-[#f7f7f5] text-slate-900">
    <section className="border-b border-slate-200 bg-[#0a3158] pt-28 text-white sm:pt-32"><div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20"><div className="max-w-4xl"><div className="flex items-center gap-3 text-sm font-semibold text-white/75"><GraduationCap className="h-5 w-5" /> Academic performance archive</div><p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#d7b45a]">Sammena Primary School</p><h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">PSLE & SFNA Results</h1><p className="mt-5 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">National examination results archive for Standard Seven (PSLE) and Standard Four (SFNA), organised by year and linked to the source used for verification.</p></div></div></section>
    <section className="mx-auto max-w-7xl space-y-8 px-5 py-10 sm:px-8 sm:py-14">
      <div className="rounded-2xl border border-[#d7b45a]/30 bg-white p-5 text-sm leading-6 text-slate-600"><strong className="text-slate-900">Data integrity note:</strong> figures are published only where the individual school result was retrieved and verified. Archive years where only a district index was accessible are explicitly marked instead of being guessed.</div>
      <ResultTable rows={psle} title="Darasa la Saba — PSLE" /><ResultTable rows={sfna} title="Darasa la Nne — SFNA" />
      <div className="flex flex-wrap gap-3"><Link href="/" className="link-arrow inline-flex items-center gap-2 font-semibold text-[#8a6a24]">Back to Home <ArrowRight className="h-4 w-4" /></Link><a href="https://www.necta.go.tz/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800">NECTA archive <ExternalLink className="h-4 w-4" /></a></div>
    </section>
  </main>;
}