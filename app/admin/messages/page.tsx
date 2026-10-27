"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"

type ClassItem = { id: string; name: string }
type Sent = { id: string; audience: string; title: string; body: string; createdAt: string; className: string | null; studentName: string | null }

async function readJson(response: Response) {
  const payload = await response.json().catch((): null => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? "The request could not be completed.")
  return payload
}

export default function AdminMessagesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [sent, setSent] = useState<Sent[]>([])
  const [audience, setAudience] = useState<"ALL" | "CLASS" | "STUDENT">("ALL")
  const [classId, setClassId] = useState("")
  const [studentQuery, setStudentQuery] = useState("")
  const [hits, setHits] = useState<{ id: string; name: string; admissionNumber: string }[]>([])
  const [studentId, setStudentId] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    try {
      const [c, m] = await Promise.all([
        fetch("/api/admin/classes", { cache: "no-store" }).then(readJson),
        fetch("/api/admin/messages", { cache: "no-store" }).then(readJson),
      ])
      setClasses(c.data as ClassItem[])
      setSent(m.data as Sent[])
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Messages could not be loaded." }) }
  }
  useEffect(() => { void load() }, [])

  const find = async () => {
    try {
      const p = await fetch(`/api/admin/students?q=${encodeURIComponent(studentQuery)}&pageSize=10`, { cache: "no-store" }).then(readJson)
      setHits(p.data.items as typeof hits)
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Students could not be searched." }) }
  }

  const send = async () => {
    setBusy(true)
    try {
      await fetch("/api/admin/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ audience, classId: classId || undefined, studentId: studentId || undefined, title, body }) }).then(readJson)
      setTitle(""); setBody(""); setStudentId("")
      setMessage({ kind: "ok", text: "Message sent to parents' portal." })
      await load()
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The message could not be sent." }) }
    finally { setBusy(false) }
  }

  const input = "mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 text-sm"

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <section className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Parent communication</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><Send className="h-7 w-7 text-[#b9964f]" /> Messages to parents</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Messages appear in the Parent Portal. They are not sent by SMS or email; use this for official notices that parents must see when they sign in.</p>
        </section>
        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#17365d]">Compose</h2>
            <div className="mt-4 grid gap-3">
              <label className="text-sm font-semibold text-[#17365d]">Send to
                <select className={input} value={audience} onChange={(e) => setAudience(e.target.value as typeof audience)}>
                  <option value="ALL">All families</option>
                  <option value="CLASS">One class</option>
                  <option value="STUDENT">One student's guardians</option>
                </select>
              </label>
              {audience === "CLASS" && <label className="text-sm font-semibold text-[#17365d]">Class<select className={input} value={classId} onChange={(e) => setClassId(e.target.value)}><option value="">Select</option>{classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>}
              {audience === "STUDENT" && (
                <div>
                  <div className="flex gap-2"><input className={input} placeholder="Name or admission number" value={studentQuery} onChange={(e) => setStudentQuery(e.target.value)} aria-label="Search student" /><button type="button" onClick={() => void find()} className="mt-1.5 border border-slate-200 px-3 text-sm font-semibold text-[#17365d]">Find</button></div>
                  <ul className="mt-2 max-h-40 divide-y divide-slate-100 overflow-y-auto border border-slate-200 text-sm">{hits.map((h) => <li key={h.id}><button type="button" onClick={() => setStudentId(h.id)} className={`w-full px-3 py-2 text-left ${studentId === h.id ? "bg-[#f3ead2] font-bold" : "hover:bg-slate-50"}`}>{h.name} <span className="text-xs text-slate-500">{h.admissionNumber}</span></button></li>)}</ul>
                </div>
              )}
              <label className="text-sm font-semibold text-[#17365d]">Title<input className={input} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} /></label>
              <label className="text-sm font-semibold text-[#17365d]">Message<textarea rows={6} className={input} value={body} onChange={(e) => setBody(e.target.value)} maxLength={5000} /></label>
              <button type="button" disabled={busy || !title || !body || (audience === "CLASS" && !classId) || (audience === "STUDENT" && !studentId)} onClick={() => void send()} className="bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Send to parents</button>
            </div>
          </section>
          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#17365d]">Recently sent</h2>
            <ul className="mt-3 divide-y divide-slate-100 text-sm">
              {sent.map((m) => <li key={m.id} className="py-3"><p className="font-semibold text-[#17365d]">{m.title}</p><p className="text-xs text-slate-500">{m.audience === "ALL" ? "All families" : m.audience === "CLASS" ? `Class: ${m.className}` : `Student: ${m.studentName}`} · {new Date(m.createdAt).toLocaleDateString("en-TZ")}</p></li>)}
              {sent.length === 0 && <li className="py-3 text-slate-500">Nothing sent yet.</li>}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
