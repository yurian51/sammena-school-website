"use client"
import { FormEvent, useState } from "react"
import { UserPlus, X, CheckCircle2, AlertCircle } from "lucide-react"
const fieldClass = "w-full border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#b9964f]"
const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600"

export function StudentCreateForm({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true); setMessage(null)
    const form = event.currentTarget
    try {
      const response = await fetch("/api/admin/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) })
      const payload = await response.json().catch(() => null)
      if (response.status === 401 || response.status === 403 || response.status === 503) { window.location.assign("/login?type=admin&returnTo=/admin/students"); return }
      if (!response.ok) throw new Error(payload?.error?.message ?? "Student could not be saved.")
      form.reset(); setOpen(false)
      setMessage({ kind: "success", text: "Student " + payload.data.admissionNumber + " registered and linked to their guardian." })
      onCreated()
    } catch (error) { setMessage({ kind: "error", text: error instanceof Error ? error.message : "Student could not be saved." }) }
    finally { setSaving(false) }
  }
  return <section className="mt-6 border border-slate-200 bg-white">
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><h3 className="font-bold text-[#17365d]">Register a student</h3><p className="mt-1 text-xs text-slate-500">Persists the student and primary guardian to the school database.</p></div><button type="button" onClick={() => { setOpen(v => !v); setMessage(null) }} className="inline-flex items-center gap-2 bg-[#17365d] px-4 py-2.5 text-xs font-bold text-white">{open ? <X className="h-4 w-4"/> : <UserPlus className="h-4 w-4"/>}{open ? "Cancel" : "New student"}</button></div>
    {message && <div role="status" className={"mx-5 mb-4 flex items-start gap-2 border p-3 text-sm " + (message.kind === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700")}>{message.kind === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4"/> : <AlertCircle className="mt-0.5 h-4 w-4"/>}<span>{message.text}</span></div>}
    {open && <form onSubmit={submit} className="border-t border-slate-100 p-5"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <label><span className={labelClass}>Admission number *</span><input name="admissionNumber" required maxLength={40} className={fieldClass}/></label>
      <label><span className={labelClass}>First name *</span><input name="firstName" required maxLength={80} className={fieldClass}/></label>
      <label><span className={labelClass}>Middle name</span><input name="middleName" maxLength={80} className={fieldClass}/></label>
      <label><span className={labelClass}>Last name *</span><input name="lastName" required maxLength={80} className={fieldClass}/></label>
      <label><span className={labelClass}>Gender *</span><select name="gender" required defaultValue="" className={fieldClass}><option value="" disabled>Select gender</option><option value="FEMALE">Female</option><option value="MALE">Male</option></select></label>
      <label><span className={labelClass}>Date of birth</span><input name="dateOfBirth" type="date" className={fieldClass}/></label>
    </div><div className="mt-6 border-t border-slate-100 pt-5"><h4 className="font-bold text-[#17365d]">Primary guardian</h4><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <label><span className={labelClass}>Full name *</span><input name="guardianFullName" required minLength={2} maxLength={160} className={fieldClass}/></label>
      <label><span className={labelClass}>Phone *</span><input name="guardianPhone" required minLength={5} maxLength={40} type="tel" className={fieldClass}/></label>
      <label><span className={labelClass}>Email</span><input name="guardianEmail" type="email" maxLength={254} className={fieldClass}/></label>
      <label><span className={labelClass}>Relationship</span><input name="guardianRelationship" maxLength={80} placeholder="e.g. Parent" className={fieldClass}/></label>
    </div></div><div className="mt-5 flex justify-end"><button type="submit" disabled={saving} className="bg-[#b9964f] px-5 py-3 text-sm font-bold text-[#102846] disabled:opacity-60">{saving ? "Saving…" : "Register student"}</button></div><p className="mt-3 text-xs text-slate-500">This creates the student and guardian records. Class placement and academic-year enrolment remain a separate workflow.</p></form>}
  </section>
}
