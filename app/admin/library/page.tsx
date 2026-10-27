"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, RotateCcw } from "lucide-react"

type Book = { id: string; accessionNumber: string; title: string; author: string; category: string; quantity: number; onLoan: number; available: number }
type Loan = { id: string; issuedAt: string; bookTitle: string; accessionNumber: string; firstName: string; lastName: string; admissionNumber: string }
type StudentHit = { id: string; admissionNumber: string; name: string }

const emptyBook = { accessionNumber: "", title: "", author: "", category: "", quantity: 1 }

async function readJson(response: Response) {
  const payload = await response.json().catch((): null => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? "The request could not be completed.")
  return payload
}

export default function AdminLibraryPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  const [query, setQuery] = useState("")
  const [form, setForm] = useState(emptyBook)
  const [issueBookId, setIssueBookId] = useState("")
  const [studentQuery, setStudentQuery] = useState("")
  const [students, setStudents] = useState<StudentHit[]>([])
  const [studentId, setStudentId] = useState("")
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    try {
      const [b, l] = await Promise.all([
        fetch(`/api/admin/library/books?q=${encodeURIComponent(query)}`, { cache: "no-store" }).then(readJson),
        fetch("/api/admin/library/issues", { cache: "no-store" }).then(readJson),
      ])
      setBooks(b.data as Book[])
      setLoans(l.data as Loan[])
    } catch (e) {
      setMessage({ kind: "error", text: e instanceof Error ? e.message : "Library data could not be loaded." })
    }
  }, [query])

  useEffect(() => { void load() }, [load])

  const flash = (kind: "ok" | "error", text: string) => setMessage({ kind, text })

  const addBook = async () => {
    setBusy(true)
    try {
      await fetch("/api/admin/library/books", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }).then(readJson)
      setForm(emptyBook)
      flash("ok", "Book added to the catalogue.")
      await load()
    } catch (e) { flash("error", e instanceof Error ? e.message : "The book could not be added.") }
    finally { setBusy(false) }
  }

  const searchStudents = async () => {
    try {
      const payload = await fetch(`/api/admin/students?q=${encodeURIComponent(studentQuery)}&pageSize=10`, { cache: "no-store" }).then(readJson)
      setStudents(payload.data.items as StudentHit[])
    } catch (e) { flash("error", e instanceof Error ? e.message : "Students could not be searched.") }
  }

  const issue = async () => {
    setBusy(true)
    try {
      await fetch("/api/admin/library/issues", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bookId: issueBookId, studentId }) }).then(readJson)
      flash("ok", "Book issued.")
      setStudentId("")
      await load()
    } catch (e) { flash("error", e instanceof Error ? e.message : "The book could not be issued.") }
    finally { setBusy(false) }
  }

  const giveBack = async (loanId: string) => {
    setBusy(true)
    try {
      await fetch(`/api/admin/library/issues/${loanId}/return`, { method: "POST" }).then(readJson)
      flash("ok", "Book returned.")
      await load()
    } catch (e) { flash("error", e instanceof Error ? e.message : "The book could not be returned.") }
    finally { setBusy(false) }
  }

  const input = "mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 text-sm"

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <section className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Library</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><BookOpen className="h-7 w-7 text-[#b9964f]" /> Catalogue and loans</h1>
        </section>

        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-bold text-[#17365d]">Catalogue</h2>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, author, accession" aria-label="Search catalogue" className="w-60 border border-slate-200 px-3 py-2 text-sm" />
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500"><tr><th scope="col" className="py-2">Title</th><th scope="col" className="py-2">Accession</th><th scope="col" className="py-2 text-right">Available / Total</th></tr></thead>
                <tbody>
                  {books.map((b) => (
                    <tr key={b.id} className="border-b border-slate-100">
                      <td className="py-3 pr-3"><span className="font-semibold text-[#17365d]">{b.title}</span><span className="block text-xs text-slate-500">{b.author} · {b.category}</span></td>
                      <td className="py-3 pr-3 text-slate-600">{b.accessionNumber}</td>
                      <td className="py-3 text-right font-bold text-[#17365d]">{b.available} / {b.quantity}</td>
                    </tr>
                  ))}
                  {books.length === 0 && <tr><td colSpan={3} className="py-6 text-center text-slate-500">No books match this search.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6">
            <div className="border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#17365d]">Add a book</h2>
              <div className="mt-4 grid gap-3">
                <label className="text-sm font-semibold text-[#17365d]">Accession number<input className={input} value={form.accessionNumber} onChange={(e) => setForm({ ...form, accessionNumber: e.target.value })} /></label>
                <label className="text-sm font-semibold text-[#17365d]">Title<input className={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
                <label className="text-sm font-semibold text-[#17365d]">Author<input className={input} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></label>
                <label className="text-sm font-semibold text-[#17365d]">Category<input className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
                <label className="text-sm font-semibold text-[#17365d]">Copies<input type="number" min={0} className={input} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} /></label>
                <button type="button" disabled={busy} onClick={() => void addBook()} className="bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">Add to catalogue</button>
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#17365d]">Issue a book</h2>
              <div className="mt-4 grid gap-3">
                <label className="text-sm font-semibold text-[#17365d]">Book
                  <select className={input} value={issueBookId} onChange={(e) => setIssueBookId(e.target.value)}>
                    <option value="">Select a book</option>
                    {books.filter((b) => b.available > 0).map((b) => <option key={b.id} value={b.id}>{b.title} ({b.available} available)</option>)}
                  </select>
                </label>
                <div className="flex gap-2">
                  <input className={input} placeholder="Search student by name or admission number" value={studentQuery} onChange={(e) => setStudentQuery(e.target.value)} aria-label="Search student" />
                  <button type="button" onClick={() => void searchStudents()} className="mt-1.5 border border-slate-200 px-3 text-sm font-semibold text-[#17365d]">Find</button>
                </div>
                {students.length > 0 && (
                  <ul className="max-h-48 divide-y divide-slate-100 overflow-y-auto border border-slate-200">
                    {students.map((s) => (
                      <li key={s.id}><button type="button" onClick={() => setStudentId(s.id)} className={`w-full px-3 py-2 text-left text-sm ${studentId === s.id ? "bg-[#f3ead2] font-bold" : "hover:bg-slate-50"}`}>{s.name} <span className="text-xs text-slate-500">{s.admissionNumber}</span></button></li>
                    ))}
                  </ul>
                )}
                <button type="button" disabled={busy || !issueBookId || !studentId} onClick={() => void issue()} className="bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Issue to selected student</button>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-6 border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-[#17365d]">Books on loan ({loans.length})</h2>
          <ul className="mt-4 divide-y divide-slate-100">
            {loans.map((l) => (
              <li key={l.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm"><span className="font-semibold text-[#17365d]">{l.bookTitle}</span> → {l.firstName} {l.lastName} <span className="text-xs text-slate-500">{l.admissionNumber} · since {new Date(l.issuedAt).toLocaleDateString("en-TZ")}</span></span>
                <button type="button" disabled={busy} onClick={() => void giveBack(l.id)} className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-xs font-bold text-[#17365d] disabled:opacity-50"><RotateCcw className="h-3.5 w-3.5" /> Mark returned</button>
              </li>
            ))}
            {loans.length === 0 && <li className="py-4 text-sm text-slate-500">No books are currently on loan.</li>}
          </ul>
        </section>
      </div>
    </main>
  )
}
