"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarCheck, Save } from "lucide-react"

type ClassItem = { id: string; name: string; levelOrder: number }
type RosterStudent = { studentId: string; admissionNumber: string; firstName: string; lastName: string; status: Status | null }
type Status = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED"

const statuses: { value: Status; label: string }[] = [
  { value: "PRESENT", label: "Present" },
  { value: "ABSENT", label: "Absent" },
  { value: "LATE", label: "Late" },
  { value: "EXCUSED", label: "Excused" },
]

function tanzaniaToday(): string {
  return new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

export default function AdminAttendancePage() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [classId, setClassId] = useState("")
  const [date, setDate] = useState(tanzaniaToday())
  const [roster, setRoster] = useState<RosterStudent[]>([])
  const [draft, setDraft] = useState<Record<string, Status>>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)

  useEffect(() => {
    fetch("/api/admin/classes", { cache: "no-store" })
      .then(async (response) => {
        if (response.status === 401 || response.status === 403) {
          window.location.assign("/login?type=admin&returnTo=/admin/attendance")
          return
        }
        const payload = await response.json().catch((): null => null)
        if (!response.ok) throw new Error(payload?.error?.message ?? "Classes could not be loaded.")
        setClasses(payload.data as ClassItem[])
      })
      .catch((e: Error) => setMessage({ kind: "error", text: e.message }))
  }, [])

  useEffect(() => {
    if (!classId || !date) return
    let active = true
    setLoading(true)
    setMessage(null)
    fetch(`/api/admin/attendance?classId=${classId}&date=${date}`, { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json().catch((): null => null)
        if (!response.ok) throw new Error(payload?.error?.message ?? "The roster could not be loaded.")
        if (!active) return
        const students = payload.data as RosterStudent[]
        setRoster(students)
        setDraft(Object.fromEntries(students.map((s) => [s.studentId, s.status ?? "PRESENT"])))
      })
      .catch((e: Error) => { if (active) setMessage({ kind: "error", text: e.message }) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [classId, date])

  const counts = useMemo(() => {
    const result: Record<Status, number> = { PRESENT: 0, ABSENT: 0, LATE: 0, EXCUSED: 0 }
    for (const value of Object.values(draft)) result[value] += 1
    return result
  }, [draft])

  const markAll = (value: Status) => setDraft(Object.fromEntries(roster.map((s) => [s.studentId, value])))

  const save = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch("/api/admin/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, date, records: roster.map((s) => ({ studentId: s.studentId, status: draft[s.studentId] ?? "PRESENT" })) }),
      })
      const payload = await response.json().catch((): null => null)
      if (!response.ok) throw new Error(payload?.error?.message ?? "Attendance could not be saved.")
      setMessage({ kind: "ok", text: `Attendance saved for ${payload.data.saved} students.` })
    } catch (e) {
      setMessage({ kind: "error", text: e instanceof Error ? e.message : "Attendance could not be saved." })
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <section className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Attendance</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><CalendarCheck className="h-7 w-7 text-[#b9964f]" /> Class register</h1>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-[#17365d]">Class
            <select value={classId} onChange={(e) => setClassId(e.target.value)} className="mt-1.5 w-full border border-slate-200 bg-white px-3 py-3 text-sm">
              <option value="">Select a class</option>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold text-[#17365d]">Date
            <input type="date" value={date} max={tanzaniaToday()} onChange={(e) => setDate(e.target.value)} className="mt-1.5 w-full border border-slate-200 bg-white px-3 py-3 text-sm" />
          </label>
        </div>

        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}

        {classId && (
          <section className="mt-6 border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-[#17365d]">Mark all:</span>
              {statuses.map((s) => <button key={s.value} type="button" onClick={() => markAll(s.value)} disabled={!roster.length} className="border border-slate-200 px-3 py-2 text-xs font-bold text-[#17365d] hover:bg-slate-50 disabled:opacity-50">{s.label}</button>)}
              <span className="ml-auto text-xs text-slate-500">{counts.PRESENT} present · {counts.ABSENT} absent · {counts.LATE} late · {counts.EXCUSED} excused</span>
            </div>

            {loading && <p className="mt-5 text-sm text-slate-500">Loading roster…</p>}
            {!loading && roster.length === 0 && <p className="mt-5 text-sm text-slate-500">No active students are enrolled in this class for the current academic year.</p>}

            {!loading && roster.length > 0 && (
              <ul className="mt-5 divide-y divide-slate-200">
                {roster.map((student) => (
                  <li key={student.studentId} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm"><span className="font-semibold text-[#17365d]">{student.firstName} {student.lastName}</span> <span className="text-xs text-slate-500">{student.admissionNumber}</span></span>
                    <label className="sr-only" htmlFor={`status-${student.studentId}`}>Attendance for {student.firstName} {student.lastName}</label>
                    <select id={`status-${student.studentId}`} value={draft[student.studentId] ?? "PRESENT"} onChange={(e) => setDraft({ ...draft, [student.studentId]: e.target.value as Status })} className="border border-slate-200 bg-white px-3 py-2 text-sm">
                      {statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </li>
                ))}
              </ul>
            )}

            {roster.length > 0 && (
              <button type="button" onClick={() => void save()} disabled={saving} className="mt-6 inline-flex items-center gap-2 bg-[#17365d] px-5 py-3 text-sm font-bold text-white hover:bg-[#102846] disabled:opacity-60"><Save className="h-4 w-4" /> {saving ? "Saving…" : "Save register"}</button>
            )}
          </section>
        )}
      </div>
    </main>
  )
}
