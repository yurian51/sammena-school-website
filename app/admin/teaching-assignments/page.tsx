"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, UserCheck, X } from "lucide-react"

type ClassItem = { id: string; name: string }
type Assignment = { userId: string; classId: string; className: string }

async function readJson(response: Response) {
  const payload = await response.json().catch((): null => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? "The request could not be completed.")
  return payload
}

export default function TeachingAssignmentsPage() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [rows, setRows] = useState<Assignment[]>([])
  const [userId, setUserId] = useState("")
  const [classId, setClassId] = useState("")
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)

  const load = async () => {
    try {
      const [c, a] = await Promise.all([
        fetch("/api/admin/classes", { cache: "no-store" }).then(readJson),
        fetch("/api/admin/teacher-assignments", { cache: "no-store" }).then(readJson),
      ])
      setClasses(c.data as ClassItem[])
      setRows(a.data as Assignment[])
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Assignments could not be loaded." }) }
  }
  useEffect(() => { void load() }, [])

  const assign = async () => {
    try {
      await fetch("/api/admin/teacher-assignments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, classId }) }).then(readJson)
      setMessage({ kind: "ok", text: "Teacher assigned to the class." })
      await load()
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The teacher could not be assigned." }) }
  }

  const unassign = async (r: Assignment) => {
    if (!window.confirm(`Remove this teacher from ${r.className}?`)) return
    try {
      await fetch(`/api/admin/teacher-assignments/${r.userId}/${r.classId}`, { method: "DELETE" }).then(readJson)
      await load()
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The assignment could not be removed." }) }
  }

  const input = "mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 text-sm"

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <section className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Teaching</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><UserCheck className="h-7 w-7 text-[#b9964f]" /> Teacher class assignments</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Teachers can record attendance, results and timetable only for classes assigned here. Enter the teacher's portal account ID, which is shown on their account record.</p>
        </section>
        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}
        <section className="mt-6 grid gap-4 border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="text-sm font-semibold text-[#17365d]">Teacher account ID<input className={input} value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="uuid" /></label>
          <label className="text-sm font-semibold text-[#17365d]">Class<select className={input} value={classId} onChange={(e) => setClassId(e.target.value)}><option value="">Select</option>{classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <button type="button" disabled={!userId || !classId} onClick={() => void assign()} className="bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Assign</button>
        </section>
        <section className="mt-6 border border-slate-200 bg-white p-5 shadow-sm">
          <ul className="divide-y divide-slate-100 text-sm">
            {rows.map((r) => <li key={`${r.userId}-${r.classId}`} className="flex items-center justify-between py-2.5"><span><span className="font-mono text-xs text-slate-500">{r.userId}</span> → <span className="font-semibold text-[#17365d]">{r.className}</span></span><button type="button" onClick={() => void unassign(r)} aria-label={`Remove assignment to ${r.className}`} className="border border-slate-200 p-2 text-slate-500 hover:text-red-700"><X className="h-4 w-4" /></button></li>)}
            {rows.length === 0 && <li className="py-4 text-slate-500">No teacher is assigned to a class yet.</li>}
          </ul>
        </section>
      </div>
    </main>
  )
}
