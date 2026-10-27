"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, RefreshCw } from "lucide-react"

type ParentMessage = { id: string; audience: "ALL" | "CLASS" | "STUDENT"; title: string; body: string; createdAt: string }

export default function ParentMessagesPage() {
  const [items, setItems] = useState<ParentMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/portal/messages", { cache: "no-store" })
      const payload = await response.json().catch((): null => null)
      if (!response.ok) throw new Error(payload?.error?.message ?? "Messages could not be loaded.")
      setItems(payload.data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Messages could not be loaded.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  return (
    <main className="min-h-screen bg-[#f5f6f7] text-slate-800">
      <header className="border-b border-[#0a3158]/20 bg-[#06203b] text-white">
        <div className="mx-auto max-w-5xl px-5 py-4 sm:px-8">
          <Link href="/portal" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 hover:text-white"><ArrowLeft className="h-4 w-4" /> Parent portal</Link>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <div className="flex items-end justify-between border-b border-slate-200 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a27e35]">School notices</p>
            <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#06203b]"><Mail className="h-7 w-7 text-[#b9964f]" /> Messages</h1>
          </div>
          <button type="button" onClick={() => void load()} className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-[#06203b]"><RefreshCw className="h-4 w-4" /> Refresh</button>
        </div>

        {loading && <p className="mt-6 text-sm text-slate-500">Loading messages…</p>}
        {error && <div className="mt-6 border border-red-200 bg-white p-6"><p className="font-bold text-red-700">Messages unavailable</p><p className="mt-2 text-sm">{error}</p></div>}
        {!loading && !error && items.length === 0 && <p className="mt-6 border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">No messages from the school yet.</p>}

        <ul className="mt-6 space-y-4">
          {items.map((m) => (
            <li key={m.id} className="border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-[#06203b]">{m.title}</h2>
                <span className="text-xs text-slate-500">{new Date(m.createdAt).toLocaleDateString("en-TZ", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#8a6a24]">{m.audience === "ALL" ? "For all families" : m.audience === "CLASS" ? "For your child's class" : "For your child"}</p>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{m.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
