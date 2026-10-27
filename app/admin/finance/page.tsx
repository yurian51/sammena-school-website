"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Receipt } from "lucide-react"

type Fee = { id: string; name: string; term: string; amount: number }
type Invoice = { id: string; term: string; total: number; paid: number; balance: number }
type Hit = { id: string; admissionNumber: string; name: string }
const methods = ["CASH", "BANK_TRANSFER", "MOBILE_MONEY", "CHEQUE", "OTHER"] as const

async function readJson(response: Response) {
  const payload = await response.json().catch((): null => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? "The request could not be completed.")
  return payload
}

export default function AdminFinancePage() {
  const [fees, setFees] = useState<Fee[]>([])
  const [feeForm, setFeeForm] = useState({ name: "", term: "", amount: 0 })
  const [search, setSearch] = useState("")
  const [hits, setHits] = useState<Hit[]>([])
  const [student, setStudent] = useState<Hit | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [invoiceTerm, setInvoiceTerm] = useState("")
  const [picked, setPicked] = useState<string[]>([])
  const [payment, setPayment] = useState({ invoiceId: "", amount: 0, method: "CASH" as (typeof methods)[number], reference: "" })
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const loadFees = async () => {
    try { setFees((await fetch("/api/admin/finance/fee-items", { cache: "no-store" }).then(readJson)).data as Fee[]) }
    catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Fee items could not be loaded." }) }
  }
  useEffect(() => { void loadFees() }, [])

  const loadInvoices = async (id: string) => {
    try { setInvoices((await fetch(`/api/admin/finance/invoices?studentId=${id}`, { cache: "no-store" }).then(readJson)).data as Invoice[]) }
    catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Invoices could not be loaded." }) }
  }

  const addFee = async () => {
    setBusy(true)
    try {
      await fetch("/api/admin/finance/fee-items", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(feeForm) }).then(readJson)
      setFeeForm({ name: "", term: "", amount: 0 })
      setMessage({ kind: "ok", text: "Fee item saved." })
      await loadFees()
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The fee could not be saved." }) }
    finally { setBusy(false) }
  }

  const find = async () => {
    try {
      const p = await fetch(`/api/admin/students?q=${encodeURIComponent(search)}&pageSize=10`, { cache: "no-store" }).then(readJson)
      setHits(p.data.items as Hit[])
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "Students could not be searched." }) }
  }

  const choose = (h: Hit) => { setStudent(h); setHits([]); void loadInvoices(h.id) }

  const createInvoice = async () => {
    if (!student) return
    setBusy(true)
    try {
      const p = await fetch("/api/admin/finance/invoices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentId: student.id, term: invoiceTerm, feeItemIds: picked }) }).then(readJson)
      setMessage({ kind: "ok", text: `Invoice created for ${p.data.total.toFixed(2)}.` })
      setPicked([])
      await loadInvoices(student.id)
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The invoice could not be created." }) }
    finally { setBusy(false) }
  }

  const recordPayment = async () => {
    if (!student) return
    setBusy(true)
    try {
      const p = await fetch("/api/admin/finance/payments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payment) }).then(readJson)
      setMessage({ kind: "ok", text: `Payment recorded. Receipt ${p.data.receiptNumber}. Balance now ${p.data.balanceAfter.toFixed(2)}.` })
      setPayment({ invoiceId: "", amount: 0, method: "CASH", reference: "" })
      await loadInvoices(student.id)
    } catch (e) { setMessage({ kind: "error", text: e instanceof Error ? e.message : "The payment could not be recorded." }) }
    finally { setBusy(false) }
  }

  const input = "mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 text-sm"
  const terms = Array.from(new Set(fees.map((f) => f.term)))

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <section className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Finance · current academic year</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><Receipt className="h-7 w-7 text-[#b9964f]" /> Fees and payments</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Fee amounts, terms and payment methods are set by the school. Receipts are numbered automatically and cannot be reused.</p>
        </section>
        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#17365d]">Fee items</h2>
            <ul className="mt-3 divide-y divide-slate-100 text-sm">{fees.map((f) => <li key={f.id} className="flex justify-between py-2"><span>{f.name} <span className="text-xs text-slate-500">{f.term}</span></span><span className="font-semibold">{f.amount.toFixed(2)}</span></li>)}{fees.length === 0 && <li className="py-3 text-slate-500">No fee items yet.</li>}</ul>
            <div className="mt-4 grid gap-3">
              <label className="text-sm font-semibold text-[#17365d]">Name<input className={input} value={feeForm.name} onChange={(e) => setFeeForm({ ...feeForm, name: e.target.value })} /></label>
              <label className="text-sm font-semibold text-[#17365d]">Term<input className={input} value={feeForm.term} onChange={(e) => setFeeForm({ ...feeForm, term: e.target.value })} /></label>
              <label className="text-sm font-semibold text-[#17365d]">Amount<input type="number" min={0} step="0.01" className={input} value={feeForm.amount} onChange={(e) => setFeeForm({ ...feeForm, amount: Number(e.target.value) })} /></label>
              <button type="button" disabled={busy} onClick={() => void addFee()} className="bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">Save fee item</button>
            </div>
          </section>

          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#17365d]">Student account</h2>
            <div className="mt-3 flex gap-2"><input className={input} placeholder="Name or admission number" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search student" /><button type="button" onClick={() => void find()} className="mt-1.5 border border-slate-200 px-3 text-sm font-semibold text-[#17365d]">Find</button></div>
            {hits.length > 0 && <ul className="mt-2 max-h-40 overflow-y-auto border border-slate-200 text-sm">{hits.map((h) => <li key={h.id}><button type="button" onClick={() => choose(h)} className="w-full px-3 py-2 text-left hover:bg-slate-50">{h.name} <span className="text-xs text-slate-500">{h.admissionNumber}</span></button></li>)}</ul>}

            {student && (
              <>
                <p className="mt-4 text-sm font-semibold text-[#17365d]">{student.name} <span className="text-xs text-slate-500">{student.admissionNumber}</span></p>
                <ul className="mt-2 divide-y divide-slate-100 text-sm">
                  {invoices.map((i) => <li key={i.id} className="flex justify-between py-2"><span>{i.term}: total {i.total.toFixed(2)}, paid {i.paid.toFixed(2)}</span><span className={`font-bold ${i.balance > 0 ? "text-red-700" : "text-emerald-700"}`}>balance {i.balance.toFixed(2)}</span></li>)}
                  {invoices.length === 0 && <li className="py-2 text-slate-500">No invoices yet.</li>}
                </ul>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="text-sm font-semibold text-[#17365d]">New invoice</p>
                  <label className="mt-2 block text-sm">Term<select className={input} value={invoiceTerm} onChange={(e) => { setInvoiceTerm(e.target.value); setPicked([]) }}><option value="">Select a term</option>{terms.map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
                  <div className="mt-2 space-y-1">{fees.filter((f) => f.term === invoiceTerm).map((f) => <label key={f.id} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={picked.includes(f.id)} onChange={(e) => setPicked(e.target.checked ? [...picked, f.id] : picked.filter((x) => x !== f.id))} /> {f.name} ({f.amount.toFixed(2)})</label>)}</div>
                  <button type="button" disabled={busy || !invoiceTerm || picked.length === 0} onClick={() => void createInvoice()} className="mt-3 border border-slate-200 px-3 py-2 text-sm font-bold text-[#17365d] disabled:opacity-50">Create invoice</button>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="text-sm font-semibold text-[#17365d]">Record a payment</p>
                  <label className="mt-2 block text-sm">Invoice<select className={input} value={payment.invoiceId} onChange={(e) => setPayment({ ...payment, invoiceId: e.target.value })}><option value="">Select an invoice</option>{invoices.filter((i) => i.balance > 0).map((i) => <option key={i.id} value={i.id}>{i.term} · balance {i.balance.toFixed(2)}</option>)}</select></label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <label className="text-sm">Amount<input type="number" min={0} step="0.01" className={input} value={payment.amount} onChange={(e) => setPayment({ ...payment, amount: Number(e.target.value) })} /></label>
                    <label className="text-sm">Method<select className={input} value={payment.method} onChange={(e) => setPayment({ ...payment, method: e.target.value as (typeof methods)[number] })}>{methods.map((m) => <option key={m} value={m}>{m.replace("_", " ").toLowerCase()}</option>)}</select></label>
                  </div>
                  <label className="mt-2 block text-sm">Reference (optional)<input className={input} value={payment.reference} onChange={(e) => setPayment({ ...payment, reference: e.target.value })} /></label>
                  <button type="button" disabled={busy || !payment.invoiceId || payment.amount <= 0} onClick={() => void recordPayment()} className="mt-3 bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Record payment and issue receipt</button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
