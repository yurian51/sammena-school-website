"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ClipboardCheck, Save } from "lucide-react"

type ClassItem = { id: string; name: string }
type Row = { studentId: string; admissionNumber: string; firstName: string; lastName: string; score: string | null; maxScore: string | null }

async function readJson(response: Response) {
  const payload = await response.json().catch((): null => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? "The request could not be completed.")
  return payload
}

export default function AdminResultsPage() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [classId, setClassId] = useState("")
  const [subject, setSubject] = useState("")
  const [term, setTerm] = useState("")
  const [assessmentName, setAssessmentName] = useState("")
  const [maxScore, setMaxScore] = useState(100)
  const [assessedOn, setAssessedOn] = useState(new Date().toISOString().slice(0, 10))
  const [rows, setRows] = useState<Row[]>([])
  const [scores, setScores] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch("/api/admin/classes", { cache: "no-store" }).then(readJson).then((p) => setClasses(p.data as ClassItem[])).catch((e: Error) => setMessage({ kind: "error", text: e.message }))
  }, [])

  const load = async () => {
    if (!classId || !subject || !term || !assessmentName) return
    try {
      const qs = new URLSearchParams({ classId, subject, term, assessmentName })
      const payload = await fetch(`/api/admin/results?${qs}`, { cache: "no-store" }).then(readJson)
      const data = payload.data as Row[]
      setRows(data)
      setScores(Object.fromEntries(data.filter((r) => r.score !== null).map((r) => [r.studentId, String(r.score)])))
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Students could not be loaded." }) }
  }

  useEffect(() => { void load() }, [classId, subject, term, assessmentName])

  const save = async () => {
    const entries = rows.filter((r) => scores[r.studentId] !== undefined && scores[r.studentId] !== "")
      .map((r) => ({ studentId: r.studentId, score: Number(scores[r.studentId]) }))
    if (entries.length === 0) return setMessage({ kind: "error", text: "Enter at least one score." })
    setBusy(true)
    try {
      const payload = await fetch("/api/admin/results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ classId, subject, term, assessmentName, maxScore, assessedOn, scores: entries }) }).then(readJson)
      setMessage({ kind: "ok", text: `Saved ${payload.data.saved} scores. Parents see them in the portal.` })
      await load()
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Scores could not be saved." }) }
    finally { setBusy(false) }
  }

  const input = "mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 text-sm"

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <section className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Assessment</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><ClipboardCheck className="h-7 w-7 text-[#b9964f]" /> Enter results</h1>
        </section>
        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="text-sm font-semibold text-[#17365d]">Class<select className={input} value={classId} onChange={(e) => setClassId(e.target.value)}><option value="">Select</option>{classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <label className="text-sm font-semibold text-[#17365d]">Subject<input className={input} value={subject} onChange={(e) => setSubject(e.target.value)} /></label>
          <label className="text-sm font-semibold text-[#17365d]">Term<input className={input} value={term} onChange={(e) => setTerm(e.target.value)} placeholder="e.g. Term 1" /></label>
          <label className="text-sm font-semibold text-[#17365d]">Assessment<input className={input} value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)} placeholder="e.g. Mid-term test" /></label>
          <label className="text-sm font-semibold text-[#17365d]">Maximum score<input type="number" min={1} className={input} value={maxScore} onChange={(e) => setMaxScore(Number(e.target.value))} /></label>
          <label className="text-sm font-semibold text-[#17365d]">Date<input type="date" className={input} value={assessedOn} onChange={(e) => setAssessedOn(e.target.value)} /></label>
        </div>
        {rows.length > 0 && (
          <section className="mt-6 border border-slate-200 bg-white p-5 shadow-sm">
            <ul className="divide-y divide-slate-100">
              {rows.map((r) => (
                <li key={r.studentId} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span><span className="font-semibold text-[#17365d]">{r.firstName} {r.lastName}</span> <span className="text-xs text-slate-500">{r.admissionNumber}</span></span>
                  <label className="flex items-center gap-2">
                    <span className="sr-only">Score for {r.firstName} {r.lastName}</span>
                    <input type="number" min={0} max={maxScore} step="0.5" className="w-24 border border-slate-200 px-2 py-1.5 text-right text-sm" value={scores[r.studentId] ?? ""} onChange={(e) => setScores({ ...scores, [r.studentId]: e.target.value })} />
                    <span className="text-xs text-slate-500">/ {maxScore}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button type="button" disabled={busy} onClick={() => void save()} className="mt-5 inline-flex items-center gap-2 bg-[#17365d] px-5 py-3 text-sm font-bold text-white disabled:opacity-60"><Save className="h-4 w-4" /> {busy ? "Saving…" : "Save scores"}</button>
          </section>
        )}
      </div>
    </main>
  )
}
