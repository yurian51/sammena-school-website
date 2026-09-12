"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Clock3, FileSearch, HelpCircle, Search, ShieldCheck } from "lucide-react"

const stages = ["SUBMITTED", "UNDER_REVIEW", "DECISION", "ENROLLED"]
const labels: Record<string, string> = { DRAFT: "Draft", SUBMITTED: "Submitted", UNDER_REVIEW: "Under review", MORE_INFORMATION: "More information", ASSESSMENT: "Assessment", DECISION: "Decision", ACCEPTED: "Accepted", REJECTED: "Rejected", WAITLISTED: "Waitlisted", DECLINED: "Declined", ENROLLED: "Enrolled" }
const stageForStatus: Record<string, string> = {
  DRAFT: "SUBMITTED",
  SUBMITTED: "SUBMITTED",
  UNDER_REVIEW: "UNDER_REVIEW",
  MORE_INFORMATION: "UNDER_REVIEW",
  ASSESSMENT: "UNDER_REVIEW",
  DECISION: "DECISION",
  ACCEPTED: "DECISION",
  REJECTED: "DECISION",
  WAITLISTED: "DECISION",
  DECLINED: "DECISION",
  ENROLLED: "ENROLLED",
}

function statusTone(status: string) {
  if (["ACCEPTED", "ENROLLED"].includes(status)) return "border-emerald-200 bg-emerald-50 text-emerald-800"
  if (["REJECTED", "DECLINED"].includes(status)) return "border-rose-200 bg-rose-50 text-rose-800"
  return "border-amber-200 bg-amber-50 text-amber-800"
}

export default function TrackAdmissionPage() {
  const [reference, setReference] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = reference.trim().toUpperCase()
    if (!/^SAM-[0-9]{4}-[A-Z0-9]{6,12}$/.test(value)) {
      setError("Enter a valid Sammena application reference, for example SAM-2026-7F3K2A.")
      setSearched(false)
      return
    }
    setLoading(true); setError(""); setSearched(false)
    try {
      const response = await fetch(`/api/admissions/track?reference=${encodeURIComponent(value)}`, { cache: "no-store" })
      const payload = await response.json() as { ok?: boolean; data?: { status?: string }; error?: string }
      if (!response.ok || !payload.ok) throw new Error(payload.error || "Application lookup failed.")
      setReference(value); setStatus(payload.data?.status ?? "DRAFT"); setSearched(true)
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "Application lookup failed.")
    } finally { setLoading(false) }
  }

  const activeStatus = status ? (stageForStatus[status] ?? "SUBMITTED") : "SUBMITTED"
  const current = stages.indexOf(activeStatus)

  return <main className="min-h-screen bg-[#f6f8fb] text-[#183252]">
    <div className="border-b border-[#dce4ed] bg-[#163b68] text-white"><div className="mx-auto max-w-6xl px-5 py-5 sm:px-8"><Link href="/admissions" className="inline-flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white"><ArrowLeft className="h-3.5 w-3.5"/>Back to Admissions</Link></div></div>
    <section className="bg-[#163b68] pb-16 text-white"><div className="mx-auto max-w-6xl px-5 sm:px-8"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c85f]">Admissions services</p><h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Track your application</h1><p className="mt-4 max-w-2xl text-base leading-7 text-white/70">Use your Sammena application reference to retrieve the current status from the admissions service.</p></div></section>
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8"><div className="grid gap-6 lg:grid-cols-[1fr_330px]"><div className="rounded-3xl border border-[#dce4ed] bg-white p-6 shadow-sm sm:p-8"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf9fd] text-[#269ab9]"><FileSearch className="h-5 w-5"/></span><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b93b8]">Application lookup</p><h2 className="mt-1 text-xl font-bold">Enter your reference</h2></div></div>
      <form onSubmit={submit} className="mt-7"><label htmlFor="reference" className="text-sm font-bold">Application reference</label><div className="mt-2 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 h-5 w-5 text-[#8da0b4]"/><input id="reference" value={reference} onChange={e=>setReference(e.target.value)} placeholder="SAM-2026-7F3K2A" autoComplete="off" className="w-full rounded-xl border border-[#dce4ed] bg-[#fbfdff] py-3 pl-10 pr-4 text-sm uppercase outline-none focus:border-[#2aa7cf] focus:ring-2 focus:ring-[#2aa7cf]/20"/></div><button disabled={loading} type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#163b68] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2467a1] disabled:cursor-wait disabled:opacity-60">{loading?"Checking…":"Track status"} <ArrowRight className="h-4 w-4"/></button></div>{error&&<p role="alert" className="mt-3 text-sm font-semibold text-rose-700">{error}</p>}</form>
      {searched&&status&&<div className="mt-8 rounded-2xl border border-[#dce4ed] bg-[#fbfdff] p-5 sm:p-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#2b93b8]">Application found</p><h3 className="mt-2 font-mono text-lg font-bold">{reference}</h3><p className="mt-2 text-sm text-[#7890a6]">Status retrieved from the admissions service.</p></div><span className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${statusTone(status)}`}><Clock3 className="h-3.5 w-3.5"/>{labels[status] ?? status}</span></div><div className="mt-8 grid gap-3 sm:grid-cols-4">{stages.map((stage,index)=><div key={stage} className="relative"><div className="flex items-center gap-2"><span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${index<=current?"bg-[#2aa7cf] text-white":"bg-[#e8eef4] text-[#7890a6]"}`}>{index<=current?<CheckCircle2 className="h-4 w-4"/>:index+1}</span><span className="text-xs font-bold">{labels[stage]}</span></div>{index<stages.length-1&&<span className="absolute left-8 right-[-12px] top-4 hidden h-px bg-[#dce4ed] sm:block"/>}</div>)}</div><div className="mt-7 border-t border-[#e8eef4] pt-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a27613]">Next step</p><p className="mt-2 text-sm leading-6 text-[#607895]">Keep your reference safe. The admissions team will contact the parent or guardian when further information or a decision is available.</p></div></div>}
    </div><aside className="space-y-5"><div className="rounded-3xl bg-[#eaf9fd] p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#269ab9]"><ShieldCheck className="h-5 w-5"/></span><h2 className="mt-4 text-lg font-bold">Keep your reference safe.</h2><p className="mt-2 text-sm leading-6 text-[#58728e]">Your reference identifies an application. Do not share sensitive documents through public channels.</p></div><div className="rounded-3xl border border-[#dce4ed] bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><HelpCircle className="h-5 w-5 text-[#2aa7cf]"/><h2 className="font-bold">Need help?</h2></div><p className="mt-3 text-sm leading-6 text-[#7890a6]">If your reference is not found, contact the school office.</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2467a1]">Contact school office <ArrowRight className="h-4 w-4"/></Link></div></aside></div><div className="mt-6 flex items-center gap-2 text-xs text-[#7890a6]"><ClipboardList className="h-3.5 w-3.5"/>Status is retrieved server-side and may require the admissions database to be configured.</div></section>
  </main>
}
