"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, RefreshCw } from "lucide-react"

type InboxStatus = "NEW" | "IN_PROGRESS" | "RESOLVED"

type Message = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: InboxStatus
  created_at: string
  updated_at: string
}

const filters: { value: InboxStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "RESOLVED", label: "Resolved" },
]

const statusLabel: Record<InboxStatus, string> = { NEW: "New", IN_PROGRESS: "In progress", RESOLVED: "Resolved" }

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [filter, setFilter] = useState<InboxStatus | "ALL">("ALL")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const query = filter === "ALL" ? "" : `?status=${filter}`
      const response = await fetch(`/api/admin/inbox${query}`, { cache: "no-store" })
      if (response.status === 401 || response.status === 403) {
        window.location.assign("/login?type=admin&returnTo=/admin/inbox")
        return
      }
      const payload = await response.json().catch((): null => null)
      if (!response.ok) throw new Error(payload?.error?.message ?? "Messages could not be loaded.")
      setMessages(payload.data as Message[])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Messages could not be loaded.")
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => { void load() }, [load])

  const changeStatus = async (id: string, status: InboxStatus) => {
    setSavingId(id)
    setError(null)
    try {
      const response = await fetch(`/api/admin/inbox/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const payload = await response.json().catch((): null => null)
      if (!response.ok) throw new Error(payload?.error?.message ?? "The status could not be updated.")
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : "The status could not be updated.")
    } finally {
      setSavingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <section className="mt-5 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Public contact form</p>
            <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><Mail className="h-7 w-7 text-[#b9964f]" /> Inbox</h1>
          </div>
          <button onClick={() => void load()} className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#17365d] shadow-sm"><RefreshCw className="h-4 w-4" /> Refresh</button>
        </section>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter messages by status">
          {filters.map((item) => (
            <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)} className={`min-h-10 border px-4 text-sm font-semibold ${filter === item.value ? "border-[#17365d] bg-[#17365d] text-white" : "border-slate-200 bg-white text-slate-600"}`}>{item.label}</button>
          ))}
        </div>

        {error && <p role="alert" className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}

        <section className="mt-6 space-y-4" aria-live="polite">
          {loading && <p className="text-sm text-slate-500">Loading messages…</p>}
          {!loading && !error && messages.length === 0 && <p className="border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">No messages in this view.</p>}
          {messages.map((item) => (
            <article key={item.id} className="border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-bold text-[#17365d]">{item.subject}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.name} · <a href={`mailto:${item.email}`} className="underline">{item.email}</a> · <a href={`tel:${item.phone}`} className="underline">{item.phone}</a></p>
                  <p className="mt-1 text-xs text-slate-400">Received {new Date(item.created_at).toLocaleString("en-TZ")}</p>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <span className="sr-only">Status for message from {item.name}</span>
                  <select value={item.status} disabled={savingId === item.id} onChange={(e) => void changeStatus(item.id, e.target.value as InboxStatus)} className="border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#17365d]">
                    {(Object.keys(statusLabel) as InboxStatus[]).map((value) => <option key={value} value={value}>{statusLabel[value]}</option>)}
                  </select>
                </label>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-700">{item.message}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
