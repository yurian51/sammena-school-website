"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, ArrowRight, CheckCircle2, KeyRound, LockKeyhole, Mail, ShieldCheck, UserRound, Users, GraduationCap, Settings, AlertCircle } from "lucide-react"

export type LoginAudience = "parent" | "staff" | "email" | "admin"
type LoginOption = { id: LoginAudience; label: string; description: string; icon: typeof Users; accent: string; destination: string }
const options: LoginOption[] = [
  { id: "parent", label: "Parents Login", description: "Access your child's information", icon: Users, accent: "text-emerald-700 bg-emerald-50", destination: "/portal/parent" },
  { id: "staff", label: "Staff Login", description: "For teachers and school staff", icon: GraduationCap, accent: "text-blue-700 bg-blue-50", destination: "/portal" },
  { id: "email", label: "Email Login", description: "Access your Sammena school email", icon: Mail, accent: "text-amber-700 bg-amber-50", destination: "/portal" },
  { id: "admin", label: "Web-Admin Login", description: "Restricted administrative access", icon: Settings, accent: "text-rose-700 bg-rose-50", destination: "/portal" },
]
const copy: Record<LoginAudience, { title: string; subtitle: string; identifier: string; helper: string; button: string; note: string }> = {
  parent: { title: "Parents Login", subtitle: "Access your child's authorised school information", identifier: "Email or phone number", helper: "Use the contact information registered with Sammena.", button: "Login to Parent Portal", note: "Parents can access only children linked to their authorised account." },
  staff: { title: "Staff Login", subtitle: "Access authorised teaching and staff services", identifier: "Staff ID or email", helper: "Use the staff credential issued by Sammena.", button: "Login to Staff Portal", note: "Your role determines which classes, records and services you can access." },
  email: { title: "Email Login", subtitle: "Sign in to your Sammena school email account", identifier: "School email address", helper: "Use your official Sammena email address.", button: "Continue to Email", note: "Email credentials are handled by the configured school email provider." },
  admin: { title: "Web-Admin Login", subtitle: "Restricted access to school administration", identifier: "Administrator email", helper: "Administrative access is restricted and audited.", button: "Login to Web Admin", note: "Only authorised administrative accounts should use this entry point." },
}

export function LoginPortal({ initial = "parent" }: { initial?: LoginAudience }) {
  const [active, setActive] = useState<LoginAudience>(initial)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const selected = options.find(option => option.id === active) ?? options[0]
  const SelectedIcon = selected.icon
  const details = copy[active]
  const changeAudience = (id: LoginAudience) => { setActive(id); setIdentifier(""); setPassword(""); setError(null) }
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(null); setSubmitting(true)
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ audience: active, identifier: identifier.trim(), password, remember }) })
      const payload = await response.json().catch((): null => null)
      if (!response.ok) throw new Error(payload?.error?.message ?? "Login could not be completed.")
      window.location.assign(payload?.data?.redirectTo ?? selected.destination)
    } catch (err) { setError(err instanceof Error ? err.message : "Login could not be completed.") } finally { setSubmitting(false) }
  }
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid overflow-hidden border border-slate-200 bg-white shadow-sm lg:grid-cols-[.8fr_1.2fr]">
        <aside className="bg-[#071d3b] p-7 text-white sm:p-9">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#e2c46c]"><ShieldCheck className="h-6 w-6" aria-hidden="true" /></span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#e2c46c]">Sammena Digital School</p><h2 className="mt-2 text-2xl font-bold sm:text-3xl">One secure entry point.</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">Choose the account type issued to you by Sammena. Private school records remain behind authenticated access.</p>
          <ul className="mt-7 space-y-3">{["Parent and child services", "Teaching and staff services", "School email access", "Restricted administration"].map(item => <li key={item} className="flex items-start gap-3 text-sm text-white/80"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#e2c46c]" aria-hidden="true" />{item}</li>)}</ul>
          <div className="mt-9 border-t border-white/10 pt-5 text-xs leading-5 text-white/50">Access is role-based. Never share your password or use another person's account.</div>
        </aside>
        <section className="p-5 sm:p-8">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Sammena login types">
            {options.map(option => { const Icon = option.icon; const selectedTab = active === option.id; return <button key={option.id} type="button" role="tab" aria-selected={selectedTab} onClick={() => changeAudience(option.id)} className={`flex min-h-[84px] items-center gap-3 border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7728] ${selectedTab ? "border-[#9b7728] bg-[#faf8f1]" : "border-slate-200 bg-white hover:bg-slate-50"}`}><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${option.accent}`}><Icon className="h-5 w-5" aria-hidden="true" /></span><span><span className="block text-sm font-bold text-[#0a3158]">{option.label}</span><span className="mt-1 block text-[10px] leading-4 text-slate-500">{option.description}</span></span></button> })}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div className="rounded-2xl bg-[#f7f7f5] p-6 sm:p-7"><div className={`flex h-12 w-12 items-center justify-center rounded-xl ${selected.accent}`}><SelectedIcon className="h-6 w-6" aria-hidden="true" /></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">{selected.label}</p><h1 className="mt-2 text-2xl font-bold text-[#0a3158]">{details.title}</h1><p className="mt-3 text-sm leading-6 text-slate-600">{details.subtitle}.</p>
              <div className="mt-6 space-y-3">{(active === "parent" ? ["View authorised child information", "Check verified attendance and results", "Review fees, receipts and notices", "Support for families with multiple children"] : active === "staff" ? ["Authorised class and student access", "Attendance and assessment workflows", "Teaching resources and timetable", "Role-based staff services"] : active === "email" ? ["School mailbox access", "Provider-managed authentication", "Secure account recovery", "School communication"] : ["Restricted administrative workspace", "Role and permission enforcement", "Sensitive-operation auditing", "Administrative service controls"]).map(item => <div key={item} className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0a3158]" aria-hidden="true" />{item}</div>)}</div>
            </div>
            <div>
              <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Secure sign in</p><h2 className="mt-2 text-2xl font-bold text-[#0a3158]">Enter your credentials</h2></div><LockKeyhole className="h-6 w-6 text-[#9b7728]" aria-hidden="true" /></div>
              <form onSubmit={submit} className="mt-6 space-y-5">
                <div><label htmlFor="login-identifier" className="block text-sm font-semibold text-[#0a3158]">{details.identifier}</label><div className="relative mt-2"><UserRound className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" aria-hidden="true" /><input id="login-identifier" name="identifier" autoComplete="username" required value={identifier} onChange={event => setIdentifier(event.target.value)} placeholder={details.identifier} className="h-12 w-full border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-[#9b7728] focus:ring-2 focus:ring-[#9b7728]/20" /><p className="mt-1.5 text-xs text-slate-500">{details.helper}</p></div></div>
                <div><label htmlFor="login-password" className="block text-sm font-semibold text-[#0a3158]">Password</label><div className="relative mt-2"><KeyRound className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" aria-hidden="true" /><input id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required minLength={8} value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter your password" className="h-12 w-full border border-slate-300 bg-white pl-10 pr-12 text-sm text-slate-800 outline-none transition focus:border-[#9b7728] focus:ring-2 focus:ring-[#9b7728]/20" /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center text-slate-500 hover:text-[#0a3158] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7728]">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
                <div className="flex flex-wrap items-center justify-between gap-3"><label className="inline-flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-[#0a3158]" /> Remember this device</label><Link href={`/login/recover?type=${active}`} className="text-sm font-semibold text-blue-700 hover:underline">Forgot password?</Link></div>
                {error && <div role="alert" className="flex gap-3 border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>{error}</span></div>}
                <button type="submit" disabled={submitting} className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#0a3158] px-5 text-sm font-bold text-white transition hover:bg-[#071d3b] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7728] focus-visible:ring-offset-2">{submitting ? "Signing in…" : details.button}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
              </form>
              <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">{details.note}</p>
              {active === "parent" && <p className="mt-4 text-center text-sm text-slate-600">New parent or guardian? <Link href="/admissions/apply" className="font-bold text-[#8a6a24] hover:underline">Start an admission enquiry</Link></p>}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
