"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, RefreshCw } from "lucide-react"
import type { PortalLibraryBook } from "@/lib/portal/types"

export default function LibraryPage() {
  const [books, setBooks] = useState<PortalLibraryBook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const load = async () => {
    setLoading(true); setError(null)
    try {
      const response = await fetch("/api/portal/library", { cache: "no-store" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message ?? "Unable to load library records.")
      setBooks(payload.data ?? [])
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to load library records.") }
    finally { setLoading(false) }
  }
  useEffect(() => { void load() }, [])
  return <main className="min-h-screen bg-[#f5f6f7] text-slate-800"><header className="border-b border-[#0a3158]/20 bg-[#06203b] text-white"><div className="mx-auto max-w-7xl px-5 py-4 sm:px-8"><Link href="/portal" className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 hover:text-white"><ArrowLeft className="h-4 w-4" /> School Portal</Link><h1 className="mt-3 text-2xl font-bold">Library & textbooks</h1></div></header><div className="mx-auto max-w-7xl px-5 py-8 sm:px-8"><div className="flex items-end justify-between border-b border-slate-200 pb-6"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Learning resources</p><p className="mt-2 text-sm text-slate-600">Current book and textbook inventory exposed through the authenticated portal API.</p></div><button onClick={() => void load()} className="border border-slate-200 bg-white p-3 text-[#0a3158]" aria-label="Refresh"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></button></div>{error ? <div className="mt-6 border border-red-200 bg-white p-6"><p className="font-bold text-red-700">Library unavailable</p><p className="mt-2 text-sm">{error}</p></div> : <div className="mt-6 overflow-x-auto border border-slate-200 bg-white"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Accession</th><th className="px-5 py-3">Title</th><th className="px-5 py-3">Author</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Quantity</th><th className="px-5 py-3">Available</th><th className="px-5 py-3">Issued</th></tr></thead><tbody className="divide-y divide-slate-100">{books.map(book => <tr key={book.id}><td className="px-5 py-4 font-semibold text-[#0a3158]">{book.accessionNumber}</td><td className="px-5 py-4">{book.title}</td><td className="px-5 py-4 text-slate-500">{book.author}</td><td className="px-5 py-4">{book.category}</td><td className="px-5 py-4">{book.quantity}</td><td className="px-5 py-4 font-bold text-emerald-700">{book.available}</td><td className="px-5 py-4">{book.issued}</td></tr>)}{!loading && !books.length && <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-500"><BookOpen className="mx-auto h-7 w-7" /><p className="mt-2">No library records available.</p></td></tr>}</tbody></table></div>}</div></main>
}
