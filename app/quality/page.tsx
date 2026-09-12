"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, FileText, ShieldCheck, Target, UploadCloud } from "lucide-react"

const domains = [
  { name: "Teaching & Learning", score: 84, color: "bg-[#0a3158]", indicators: ["Lesson planning", "Assessment practice", "Learning materials"] },
  { name: "Learner Welfare", score: 89, color: "bg-emerald-600", indicators: ["Attendance", "Safeguarding", "Inclusion"] },
  { name: "Leadership & Management", score: 78, color: "bg-[#9b7728]", indicators: ["Records", "Planning", "Staff supervision"] },
  { name: "Infrastructure & Resources", score: 73, color: "bg-amber-600", indicators: ["Classrooms", "Water & sanitation", "ICT & library"] },
]

const actions = [
  { title: "Increase Standard VI English textbook availability", owner: "Academic Coordinator", due: "30 Sep 2026", progress: 70, status: "In progress" },
  { title: "Complete emergency response drill record", owner: "Headteacher", due: "20 Sep 2026", progress: 35, status: "Open" },
  { title: "Refresh classroom furniture inventory", owner: "Storekeeper", due: "05 Oct 2026", progress: 90, status: "In progress" },
]

export default function QualityPage() {
  const [selectedDomain, setSelectedDomain] = useState(domains[0].name)
  const [evidenceCount, setEvidenceCount] = useState(12)
  const selected = useMemo(() => domains.find(d => d.name === selectedDomain) ?? domains[0], [selectedDomain])

  return (
    <main className="min-h-screen bg-[#f5f6f7] text-slate-800">
      <header className="border-b border-[#0a3158]/20 bg-[#06203b] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2c46c]">Sammena Schools</p><h1 className="mt-1 text-lg font-bold">Quality Management</h1></div><Link href="/portal" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white"><ArrowLeft className="h-4 w-4" /> Portal</Link></div></header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="border-b border-slate-200 pb-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Self-assessment workspace</p><div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h2 className="text-3xl font-bold text-[#0a3158] sm:text-4xl">School quality & improvement</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">A private operational workspace for reviewing quality domains, attaching evidence, recording findings and driving improvement actions.</p></div><div className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-3"><ShieldCheck className="h-5 w-5 text-[#9b7728]" /><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall</p><p className="text-xl font-bold text-[#0a3158]">81%</p></div></div></div></div>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{domains.map(domain => <button key={domain.name} type="button" onClick={() => setSelectedDomain(domain.name)} className={`border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 ${selectedDomain === domain.name ? "border-[#9b7728] ring-1 ring-[#9b7728]/20" : "border-slate-200"}`}><div className="flex items-start justify-between gap-3"><div className={`h-2 w-2 rounded-full ${domain.color}`} /><span className="text-2xl font-bold text-[#0a3158]">{domain.score}%</span></div><h3 className="mt-5 text-sm font-bold text-[#0a3158]">{domain.name}</h3><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full ${domain.color}`} style={{width:`${domain.score}%`}} /></div></button>)}</section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_.75fr]"><article className="border border-slate-200 bg-white p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Selected domain</p><h2 className="mt-2 text-xl font-bold text-[#0a3158]">{selected.name}</h2></div><ClipboardCheck className="h-5 w-5 text-[#9b7728]" /></div><div className="mt-6 space-y-4">{selected.indicators.map((indicator, index) => <div key={indicator} className="border border-slate-200 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold text-[#0a3158]">{indicator}</p><p className="mt-1 text-xs text-slate-500">Evidence-backed internal assessment</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${index === 2 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{index === 2 ? "Partially met" : "Met"}</span></div><div className="mt-3 flex gap-2"><button type="button" className="inline-flex items-center gap-1.5 border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-[#9b7728]"><FileText className="h-3.5 w-3.5" /> View evidence</button><button type="button" onClick={() => setEvidenceCount(c => c + 1)} className="inline-flex items-center gap-1.5 border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-[#9b7728]"><UploadCloud className="h-3.5 w-3.5" /> Attach evidence</button></div></div>)}</div></article>

          <aside className="border border-slate-200 bg-[#0a3158] p-6 text-white"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e2c46c]">Evidence register</p><h2 className="mt-2 text-xl font-bold">Audit-ready evidence</h2></div><FileText className="h-5 w-5 text-[#e2c46c]" /></div><p className="mt-4 text-sm leading-7 text-white/70">Keep inspection evidence connected to the indicator it supports instead of burying everything in folders named “FINAL_FINAL_2”.</p><div className="mt-6 grid grid-cols-2 gap-3"><div className="border border-white/10 bg-white/[.05] p-4"><p className="text-2xl font-bold">{evidenceCount}</p><p className="mt-1 text-xs text-white/60">Evidence items</p></div><div className="border border-white/10 bg-white/[.05] p-4"><p className="text-2xl font-bold">4</p><p className="mt-1 text-xs text-white/60">Domains</p></div></div></aside></section>

        <section className="mt-6 border border-slate-200 bg-white p-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Improvement plan</p><h2 className="mt-2 text-xl font-bold text-[#0a3158]">Open actions</h2></div><button type="button" className="inline-flex items-center gap-2 bg-[#0a3158] px-4 py-3 text-sm font-bold text-white hover:bg-[#06203b]"><Target className="h-4 w-4" /> New action</button></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-y border-slate-200 bg-[#f7f7f5] text-xs uppercase tracking-[0.12em] text-slate-500"><tr><th className="px-4 py-3">Action</th><th className="px-4 py-3">Owner</th><th className="px-4 py-3">Due</th><th className="px-4 py-3">Progress</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{actions.map(action => <tr key={action.title} className="border-b border-slate-100"><td className="px-4 py-4 font-semibold text-[#0a3158]">{action.title}</td><td className="px-4 py-4 text-slate-500">{action.owner}</td><td className="px-4 py-4 text-slate-500">{action.due}</td><td className="px-4 py-4"><div className="flex items-center gap-3"><div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-[#0a3158]" style={{width:`${action.progress}%`}} /></div><span className="text-xs font-bold">{action.progress}%</span></div></td><td className="px-4 py-4"><span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">{action.status}</span></td></tr>)}</tbody></table></div></section>

        <div className="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Internal Sammena workflow, not an official government SQAS score.</span><Link href="/" className="inline-flex items-center gap-1 font-bold text-[#8a6a24]">School website <ArrowRight className="h-3.5 w-3.5" /></Link></div>
      </div>
    </main>
  )
}
