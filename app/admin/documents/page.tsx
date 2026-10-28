"use client"

import { useCallback, useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, Plus, RefreshCw } from "lucide-react"

type Resource = { id: string; title: string; sourceUrl: string; readerUrl: string }
type Version = { id: string; resourceId: string; resourceTitle: string; versionLabel: string; documentDate: string; effectiveFrom: string | null; effectiveUntil: string | null; sourceUrl: string; changeSummary: string; status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; createdAt: string }

const emptyForm = { resourceId: "", versionLabel: "", documentDate: "", effectiveFrom: "", effectiveUntil: "", sourceUrl: "", changeSummary: "", status: "DRAFT" }

async function readJson(response: Response): Promise<any> {
  const payload = await response.json().catch(() => null)
  if (!response.ok) throw new Error(payload?.error?.message ?? payload?.error ?? "The request could not be completed.")
  return payload
}

export default function AdminDocumentsPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [versions, setVersions] = useState<Version[]>([])
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null)

  const load = useCallback(async () => {
    try {
      const [library, docs] = await Promise.all([
        fetch("/api/library", { cache: "no-store" }).then(readJson),
        fetch("/api/admin/documents", { cache: "no-store" }).then(readJson),
      ])
      const nextResources = (library.resources ?? []) as Resource[]
      setResources(nextResources)
      setVersions((docs.data ?? []) as Version[])
      setForm(current => ({ ...current, resourceId: current.resourceId || nextResources[0]?.id || "", sourceUrl: current.sourceUrl || nextResources[0]?.readerUrl || nextResources[0]?.sourceUrl || "" }))
    } catch (error) {
      setMessage({ kind: "error", text: error instanceof Error ? error.message : "Document records could not be loaded." })
    }
  }, [])

  useEffect(() => { void load() }, [load])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setMessage(null)
    try {
      await fetch("/api/admin/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          effectiveFrom: form.effectiveFrom || null,
          effectiveUntil: form.effectiveUntil || null,
        }),
      }).then(readJson)
      setForm(current => ({ ...emptyForm, resourceId: current.resourceId, sourceUrl: current.sourceUrl }))
      setMessage({ kind: "ok", text: "Document version saved. Published versions appear in the public resource centre." })
      await load()
    } catch (error) {
      setMessage({ kind: "error", text: error instanceof Error ? error.message : "The document version could not be saved." })
    } finally { setBusy(false) }
  }

  const input = "mt-1 w-full border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900"

  return (
    <main className="min-h-screen bg-[#f6f4ef] px-5 py-8 text-[#172033] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d] hover:underline"><ArrowLeft className="h-4 w-4" /> Administration</Link>
        <header className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a27e35]">Document governance</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-[#17365d]"><FileText className="h-7 w-7" /> Document versions</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Record the version label, official date, effective period and HTTPS source. New versions are drafts by default. Publishing requires the separate CMS publish permission.</p>
        </header>

        {message && <p role={message.kind === "error" ? "alert" : "status"} className={`mt-5 border p-4 text-sm ${message.kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p>}

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <form onSubmit={submit} className="border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-[#17365d]">Add a document version</h2>
            <label className="mt-4 block text-sm font-semibold">Existing verified resource
              <select className={input} required value={form.resourceId} onChange={event => {
                const resource = resources.find(item => item.id === event.target.value)
                setForm(current => ({ ...current, resourceId: event.target.value, sourceUrl: resource?.readerUrl ?? resource?.sourceUrl ?? current.sourceUrl }))
              }}>
                {resources.map(resource => <option key={resource.id} value={resource.id}>{resource.title}</option>)}
              </select>
            </label>
            <label className="mt-4 block text-sm font-semibold">Version label
              <input className={input} required maxLength={80} value={form.versionLabel} onChange={event => setForm(current => ({ ...current, versionLabel: event.target.value }))} placeholder="e.g. Revised edition 2026" />
            </label>
            <label className="mt-4 block text-sm font-semibold">Document date
              <input className={input} required type="date" value={form.documentDate} onChange={event => setForm(current => ({ ...current, documentDate: event.target.value }))} />
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold">Effective from
                <input className={input} type="date" value={form.effectiveFrom} onChange={event => setForm(current => ({ ...current, effectiveFrom: event.target.value }))} />
              </label>
              <label className="block text-sm font-semibold">Effective until
                <input className={input} type="date" value={form.effectiveUntil} onChange={event => setForm(current => ({ ...current, effectiveUntil: event.target.value }))} />
              </label>
            </div>
            <label className="mt-4 block text-sm font-semibold">Official HTTPS source URL
              <input className={input} required type="url" pattern="https://.*" value={form.sourceUrl} onChange={event => setForm(current => ({ ...current, sourceUrl: event.target.value }))} />
            </label>
            <label className="mt-4 block text-sm font-semibold">What changed
              <textarea className={input} rows={3} maxLength={2000} value={form.changeSummary} onChange={event => setForm(current => ({ ...current, changeSummary: event.target.value }))} placeholder="Describe only verified changes." />
            </label>
            <label className="mt-4 block text-sm font-semibold">Publication state
              <select className={input} value={form.status} onChange={event => setForm(current => ({ ...current, status: event.target.value }))}>
                <option value="DRAFT">Draft (private)</option>
                <option value="PUBLISHED">Published (requires publish permission)</option>
              </select>
            </label>
            <button disabled={busy || resources.length === 0} className="mt-5 inline-flex items-center gap-2 bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-50" type="submit"><Plus className="h-4 w-4" /> {busy ? "Saving…" : "Save version"}</button>
          </form>

          <section className="border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#17365d]">Version register</h2>
              <button type="button" onClick={() => void load()} className="inline-flex items-center gap-2 text-sm font-semibold text-[#17365d]"><RefreshCw className="h-4 w-4" /> Refresh</button>
            </div>
            {versions.length === 0 ? <p className="mt-5 border border-dashed border-slate-300 p-5 text-sm text-slate-600">No document versions have been recorded yet. This is a live empty state, not sample data.</p> : (
              <ul className="mt-4 divide-y divide-slate-200">
                {versions.map(version => <li key={version.id} className="py-4 first:pt-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div><h3 className="font-bold text-slate-900">{version.resourceTitle}</h3><p className="mt-1 text-sm text-slate-600">{version.versionLabel} · {version.documentDate}</p></div>
                    <span className={`border px-2 py-1 text-xs font-bold ${version.status === "PUBLISHED" ? "border-emerald-200 text-emerald-800" : "border-amber-200 text-amber-800"}`}>{version.status}</span>
                  </div>
                  {version.changeSummary && <p className="mt-2 text-sm leading-6 text-slate-600">{version.changeSummary}</p>}
                  <a className="mt-2 inline-block text-sm font-semibold text-[#8a6a24] underline" href={version.sourceUrl} target="_blank" rel="noreferrer">Open source document</a>
                </li>)}
              </ul>
            )}
          </section>
        </section>
      </div>
    </main>
  )
}
