"use client"

import { use, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, UserPlus, Users, X } from "lucide-react"

type Guardian = { id: string; fullName: string; phone: string; email: string | null; relationship: string; isPrimary: boolean }

const relationships = ["PARENT", "GUARDIAN", "SPONSOR", "OTHER"] as const

async function readJson(response: Response) {
  const payload = await response.json().catch((): null => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? "The request could not be completed.")
  return payload
}

export default function StudentGuardiansPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: studentId } = use(params)
  const [guardians, setGuardians] = useState<Guardian[]>([])
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", relationship: "PARENT" as (typeof relationships)[number], isPrimary: false })
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    try {
      const payload = await fetch(`/api/admin/students/${studentId}/guardians`, { cache: "no-store" }).then(readJson)
      setGuardians(payload.data as Guardian[])
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Guardians could not be loaded." }) }
  }, [studentId])

  useEffect(() => { void load() }, [load])

  const add = async () => {
    setBusy(true)
    try {
      await fetch(`/api/admin/students/${studentId}/guardians`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }).then(readJson)
      setForm({ fullName: "", phone: "", email: "", relationship: "PARENT", isPrimary: false })
      setMessage({ kind: "ok", text: "Guardian linked to the student." })
      await load()
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The guardian could not be linked." }) }
    finally { setBusy(false) }
  }

  const unlink = async (guardianId: string) => {
    if (!window.confirm("Remove this guardian from the student? The guardian record is kept for their other students.")) return
    setBusy(true)
    try {
      await fetch(`/api/admin/students/${studentId}/guardians/${guardianId}`, { method: "DELETE" }).then(readJson)
      setMessage({ kind: "ok", text: "Guardian link removed." })
      await load()
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The link could not be removed." }) }
    finally { setBusy(false) }
  }

  const input = "mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 text-sm"

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href={`/admin/students/${studentId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Student profile</Link>
        <section className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Guardians</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><Users className="h-7 w-7 text-[#b9964f]" /> Parents and guardians</h1>
        </section>

        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#17365d]">Linked guardians</h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {guardians.map((g) => (
                <li key={g.id} className="flex items-start justify-between gap-3 py-3">
                  <div className="text-sm">
                    <p className="font-semibold text-[#17365d]">{g.fullName} {g.isPrimary && <span className="ml-1 border border-[#b9964f] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#8a6a24]">Primary</span>}</p>
                    <p className="text-xs text-slate-500">{g.relationship.toLowerCase()} · {g.phone}{g.email ? ` · ${g.email}` : ""}</p>
                  </div>
                  <button type="button" disabled={busy} onClick={() => void unlink(g.id)} aria-label={`Remove ${g.fullName}`} className="border border-slate-200 p-2 text-slate-500 hover:text-red-700 disabled:opacity-50"><X className="h-4 w-4" /></button>
                </li>
              ))}
              {guardians.length === 0 && <li className="py-4 text-sm text-slate-500">No guardians are linked to this student yet.</li>}
            </ul>
          </section>

          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-bold text-[#17365d]"><UserPlus className="h-4 w-4" /> Add a guardian</h2>
            <div className="mt-4 grid gap-3">
              <label className="text-sm font-semibold text-[#17365d]">Full name<input className={input} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></label>
              <label className="text-sm font-semibold text-[#17365d]">Phone<input className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
              <label className="text-sm font-semibold text-[#17365d]">Email (optional)<input type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
              <label className="text-sm font-semibold text-[#17365d]">Relationship
                <select className={input} value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value as (typeof relationships)[number] })}>
                  {relationships.map((r) => <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isPrimary} onChange={(e) => setForm({ ...form, isPrimary: e.target.checked })} /> Make primary contact (replaces the current primary)</label>
              <button type="button" disabled={busy} onClick={() => void add()} className="bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">Link guardian</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
