"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarDays, Trash2 } from "lucide-react"

type ClassItem = { id: string; name: string }
type Entry = { id: string; dayOfWeek: number; periodNumber: number; startsAt: string; endsAt: string; subject: string; teacherName: string | null; room: string | null }
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const blank = { dayOfWeek: 1, periodNumber: 1, startsAt: "08:00", endsAt: "08:40", subject: "", teacherName: "", room: "" }

async function readJson(response: Response) {
  const payload = await response.json().catch((): null => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? "The request could not be completed.")
  return payload
}

export default function AdminTimetablePage() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [classId, setClassId] = useState("")
  const [entries, setEntries] = useState<Entry[]>([])
  const [form, setForm] = useState(blank)
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch("/api/admin/classes", { cache: "no-store" }).then(readJson).then((p) => setClasses(p.data as ClassItem[])).catch((e: Error) => setMessage({ kind: "error", text: e.message }))
  }, [])

  const load = async (id: string) => {
    if (!id) return setEntries([])
    try {
      const payload = await fetch(`/api/admin/timetable?classId=${id}`, { cache: "no-store" }).then(readJson)
      setEntries(payload.data as Entry[])
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Timetable could not be loaded." }) }
  }

  useEffect(() => { void load(classId) }, [classId])

  const add = async () => {
    setBusy(true)
    try {
      await fetch("/api/admin/timetable", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, classId }) }).then(readJson)
      setMessage({ kind: "ok", text: "Period added." })
      setForm({ ...form, subject: "" })
      await load(classId)
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The period could not be added." }) }
    finally { setBusy(false) }
  }

  const remove = async (entryId: string) => {
    if (!window.confirm("Remove this period from the timetable?")) return
    setBusy(true)
    try {
      await fetch(`/api/admin/timetable/${entryId}`, { method: "DELETE" }).then(readJson)
      await load(classId)
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The period could not be removed." }) }
    finally { setBusy(false) }
  }

  const input = "mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 text-sm"

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <section className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Timetable · current academic year</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><CalendarDays className="h-7 w-7 text-[#b9964f]" /> Class timetable</h1>
        </section>
        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}
        <label className="mt-6 block max-w-sm text-sm font-semibold text-[#17365d]">Class
          <select className={input} value={classId} onChange={(e) => setClassId(e.target.value)}>
            <option value="">Select a class</option>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>

        {classId && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
            <section className="border border-slate-200 bg-white p-5 shadow-sm">
              <ul className="divide-y divide-slate-100">
                {entries.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span><span className="font-semibold text-[#17365d]">{days[e.dayOfWeek - 1]} · {e.startsAt}–{e.endsAt}</span> {e.subject}{e.teacherName ? ` · ${e.teacherName}` : ""}{e.room ? ` · ${e.room}` : ""}</span>
                    <button type="button" disabled={busy} onClick={() => void remove(e.id)} aria-label={`Remove ${e.subject}`} className="border border-slate-200 p-2 text-slate-500 hover:text-red-700 disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
                  </li>
                ))}
                {entries.length === 0 && <li className="py-6 text-sm text-slate-500">No periods yet for this class.</li>}
              </ul>
            </section>
            <section className="border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#17365d]">Add a period</h2>
              <div className="mt-4 grid gap-3">
                <label className="text-sm font-semibold text-[#17365d]">Day
                  <select className={input} value={form.dayOfWeek} onChange={(e) => setForm({ ...form, dayOfWeek: Number(e.target.value) })}>
                    {days.map((d, i) => <option key={d} value={i + 1}>{d}</option>)}
                  </select>
                </label>
                <label className="text-sm font-semibold text-[#17365d]">Period number<input type="number" min={1} max={12} className={input} value={form.periodNumber} onChange={(e) => setForm({ ...form, periodNumber: Number(e.target.value) })} /></label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm font-semibold text-[#17365d]">Starts<input type="time" className={input} value={form.startsAt} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} /></label>
                  <label className="text-sm font-semibold text-[#17365d]">Ends<input type="time" className={input} value={form.endsAt} onChange={(e) => setForm({ ...form, endsAt: e.target.value })} /></label>
                </div>
                <label className="text-sm font-semibold text-[#17365d]">Subject<input className={input} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></label>
                <label className="text-sm font-semibold text-[#17365d]">Teacher (optional)<input className={input} value={form.teacherName} onChange={(e) => setForm({ ...form, teacherName: e.target.value })} /></label>
                <label className="text-sm font-semibold text-[#17365d]">Room (optional)<input className={input} value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} /></label>
                <button type="button" disabled={busy || !form.subject} onClick={() => void add()} className="bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Add period</button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}
