"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, GraduationCap } from "lucide-react"

type ClassItem = { id: string; name: string; levelOrder: number }
type Enrollment = { id: string; classId: string; className: string; studentId: string; admissionNumber: string; firstName: string; lastName: string }
type StudentHit = { id: string; admissionNumber: string; name: string }

async function readJson(response: Response) {
  const payload = await response.json().catch((): null => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? "The request could not be completed.")
  return payload
}

export default function AdminEnrollmentsPage() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [classFilter, setClassFilter] = useState("")
  const [rows, setRows] = useState<Enrollment[]>([])
  const [studentQuery, setStudentQuery] = useState("")
  const [hits, setHits] = useState<StudentHit[]>([])
  const [placeStudent, setPlaceStudent] = useState("")
  const [placeClass, setPlaceClass] = useState("")
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    try {
      const [c, e] = await Promise.all([
        fetch("/api/admin/classes", { cache: "no-store" }).then(readJson),
        fetch(`/api/admin/enrollments${classFilter ? `?classId=${classFilter}` : ""}`, { cache: "no-store" }).then(readJson),
      ])
      setClasses(c.data as ClassItem[])
      setRows(e.data as Enrollment[])
    } catch (err) {
      setMessage({ kind: "error", text: err instanceof Error ? err.message : "Enrollments could not be loaded." })
    }
  }, [classFilter])

  useEffect(() => { void load() }, [load])

  const flash = (kind: "ok" | "error", text: string) => setMessage({ kind, text })

  const search = async () => {
    try {
      const payload = await fetch(`/api/admin/students?q=${encodeURIComponent(studentQuery)}&pageSize=10`, { cache: "no-store" }).then(readJson)
      setHits(payload.data.items as StudentHit[])
    } catch (err) { flash("error", err instanceof Error ? err.message : "Students could not be searched.") }
  }

  const place = async () => {
    setBusy(true)
    try {
      await fetch("/api/admin/enrollments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentId: placeStudent, classId: placeClass }) }).then(readJson)
      flash("ok", "Student placed in class.")
      setPlaceStudent("")
      await load()
    } catch (err) { flash("error", err instanceof Error ? err.message : "The student could not be placed.") }
    finally { setBusy(false) }
  }

  const move = async (enrollmentId: string, classId: string) => {
    setBusy(true)
    try {
      await fetch(`/api/admin/enrollments/${enrollmentId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ classId }) }).then(readJson)
      flash("ok", "Class updated.")
      await load()
    } catch (err) { flash("error", err instanceof Error ? err.message : "The class could not be changed.") }
    finally { setBusy(false) }
  }

  const close = async (enrollmentId: string, status: "TRANSFERRED" | "INACTIVE") => {
    if (!window.confirm(status === "TRANSFERRED" ? "Mark this student as transferred out of the class?" : "Mark this enrollment inactive?")) return
    setBusy(true)
    try {
      await fetch(`/api/admin/enrollments/${enrollmentId}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }).then(readJson)
      flash("ok", "Enrollment closed. The history is kept.")
      await load()
    } catch (err) { flash("error", err instanceof Error ? err.message : "The enrollment could not be closed.") }
    finally { setBusy(false) }
  }

  const input = "mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 text-sm"

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <section className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Enrollment · current academic year</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><GraduationCap className="h-7 w-7 text-[#b9964f]" /> Class placement</h1>
        </section>

        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block text-sm font-semibold text-[#17365d]">Show class
              <select className={input} value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
                <option value="">All classes</option>
                {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <ul className="mt-4 divide-y divide-slate-100">
              {rows.map((r) => (
                <li key={r.id} className="grid gap-2 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                  <span className="text-sm"><span className="font-semibold text-[#17365d]">{r.firstName} {r.lastName}</span> <span className="text-xs text-slate-500">{r.admissionNumber} · {r.className}</span></span>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="sr-only" htmlFor={`move-${r.id}`}>Move {r.firstName} {r.lastName} to class</label>
                    <select id={`move-${r.id}`} value={r.classId} disabled={busy} onChange={(e) => void move(r.id, e.target.value)} className="border border-slate-200 bg-white px-2 py-1.5 text-xs">
                      {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <button type="button" disabled={busy} onClick={() => void close(r.id, "TRANSFERRED")} className="border border-slate-200 px-2 py-1.5 text-xs font-bold text-[#17365d] disabled:opacity-50">Transferred out</button>
                  </div>
                </li>
              ))}
              {rows.length === 0 && <li className="py-6 text-sm text-slate-500">No active enrollments for this view.</li>}
            </ul>
          </section>

          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#17365d]">Place a student</h2>
            <div className="mt-4 flex gap-2">
              <input className={input} placeholder="Name or admission number" value={studentQuery} onChange={(e) => setStudentQuery(e.target.value)} aria-label="Search student to place" />
              <button type="button" onClick={() => void search()} className="mt-1.5 border border-slate-200 px-3 text-sm font-semibold text-[#17365d]">Find</button>
            </div>
            {hits.length > 0 && (
              <ul className="mt-3 max-h-48 divide-y divide-slate-100 overflow-y-auto border border-slate-200">
                {hits.map((h) => <li key={h.id}><button type="button" onClick={() => setPlaceStudent(h.id)} className={`w-full px-3 py-2 text-left text-sm ${placeStudent === h.id ? "bg-[#f3ead2] font-bold" : "hover:bg-slate-50"}`}>{h.name} <span className="text-xs text-slate-500">{h.admissionNumber}</span></button></li>)}
              </ul>
            )}
            <label className="mt-4 block text-sm font-semibold text-[#17365d]">Class
              <select className={input} value={placeClass} onChange={(e) => setPlaceClass(e.target.value)}>
                <option value="">Select a class</option>
                {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <button type="button" disabled={busy || !placeStudent || !placeClass} onClick={() => void place()} className="mt-4 w-full bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Place in class</button>
          </section>
        </div>
      </div>
    </main>
  )
}
