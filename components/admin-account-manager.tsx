"use client"

import { FormEvent, useEffect, useState } from "react"
import { AlertCircle, CheckCircle2, RefreshCw, UserPlus } from "lucide-react"

type Account = { id: string; email: string; display_name: string; role: string; is_active: boolean; created_at: string }

const roles = [
  ["SCHOOL_ADMIN", "School Admin"],
  ["EDITOR", "Content Editor"],
  ["TEACHER", "Teacher / Staff"],
  ["PARENT", "Parent / Guardian"],
  ["STUDENT", "Student"],
] as const

export function AdminAccountManager() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<string>("TEACHER")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  async function refresh() {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/admin/accounts", { cache: "no-store" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message ?? "Could not load accounts.")
      setAccounts(payload.data ?? [])
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not load accounts.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void refresh() }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError("")
    setNotice("")
    try {
      const response = await fetch("/api/admin/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, email, role, password }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message ?? "Account could not be created.")
      setNotice(`Account created for ${payload.data.display_name}. Share the temporary password securely and ask the user to change it.`)
      setDisplayName("")
      setEmail("")
      setPassword("")
      await refresh()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Account could not be created.")
    } finally {
      setSaving(false)
    }
  }

  return <div className="mx-auto max-w-6xl space-y-8">
    <header><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Restricted administration</p><h1 className="mt-2 text-3xl font-bold text-[#0a3158]">School accounts</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Create accounts for school administrators, editors, teachers, parents and students. Super Admin accounts cannot be created from this page.</p></header>
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={submit} className="space-y-4 border border-slate-200 bg-white p-5 sm:p-7">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8f4e8] text-[#8a6a24]"><UserPlus className="h-5 w-5" /></span><div><h2 className="font-bold text-[#0a3158]">Create an account</h2><p className="text-xs text-slate-500">A minimum 12-character password is required.</p></div></div>
        <label className="block text-sm font-semibold text-[#0a3158]">Full name<input required minLength={2} maxLength={120} value={displayName} onChange={e => setDisplayName(e.target.value)} className="mt-2 h-11 w-full border border-slate-300 px-3 font-normal text-slate-800" autoComplete="name" /></label>
        <label className="block text-sm font-semibold text-[#0a3158]">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 h-11 w-full border border-slate-300 px-3 font-normal text-slate-800" autoComplete="email" /></label>
        <label className="block text-sm font-semibold text-[#0a3158]">Role<select value={role} onChange={e => setRole(e.target.value)} className="mt-2 h-11 w-full border border-slate-300 bg-white px-3 font-normal text-slate-800">{roles.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label className="block text-sm font-semibold text-[#0a3158]">Temporary password<input required minLength={12} maxLength={256} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 h-11 w-full border border-slate-300 px-3 font-normal text-slate-800" autoComplete="new-password" /></label>
        {error && <p role="alert" className="flex gap-2 border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"><AlertCircle className="h-4 w-4 shrink-0" />{error}</p>}
        {notice && <p role="status" className="flex gap-2 border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"><CheckCircle2 className="h-4 w-4 shrink-0" />{notice}</p>}
        <button disabled={saving} className="inline-flex h-11 w-full items-center justify-center gap-2 bg-[#0a3158] px-4 font-bold text-white disabled:opacity-60"><UserPlus className="h-4 w-4" />{saving ? "Creating…" : "Create account"}</button>
      </form>
      <section className="border border-slate-200 bg-white p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3"><div><h2 className="font-bold text-[#0a3158]">Existing accounts</h2><p className="mt-1 text-xs text-slate-500">School-scoped account directory</p></div><button type="button" onClick={() => void refresh()} className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-sm text-[#0a3158]"><RefreshCw className="h-4 w-4" />Refresh</button></div>
        {loading ? <p className="py-8 text-sm text-slate-500">Loading accounts…</p> : accounts.length === 0 ? <p className="py-8 text-sm text-slate-500">No managed accounts have been created yet.</p> : <div className="mt-5 divide-y divide-slate-100">{accounts.map(account => <div key={account.id} className="flex items-start justify-between gap-3 py-4"><div className="min-w-0"><p className="truncate font-semibold text-[#0a3158]">{account.display_name}</p><p className="mt-1 break-all text-xs text-slate-500">{account.email}</p><p className="mt-2 text-xs text-slate-500">{account.role.replaceAll("_", " ")} · {new Date(account.created_at).toLocaleDateString()}</p></div><span className={`shrink-0 border px-2 py-1 text-[10px] font-bold uppercase ${account.is_active ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-slate-100 text-slate-500"}`}>{account.is_active ? "Active" : "Disabled"}</span></div>)}</div>}
      </section>
    </div>
  </div>
}
