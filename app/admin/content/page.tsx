"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Edit3, FilePlus2, Megaphone, RefreshCw, Send, ShieldCheck, ArrowLeft } from "lucide-react"

type Item = { id:string; type:"NEWS"|"ANNOUNCEMENT"; title:string; status:string; excerpt?:string; summary?:string }

export default function AdminContentPage() {
  const [items,setItems] = useState<Item[]>([])
  const [loading,setLoading] = useState(true)
  const [busy,setBusy] = useState(false)
  const [error,setError] = useState<string|null>(null)
  const [message,setMessage] = useState<string|null>(null)

  const load = async (): Promise<void> => {
    setLoading(true); setError(null)
    try {
      const response = await fetch("/api/admin/cms",{cache:"no-store"})
      const payload = await response.json().catch((): null => null)
      if (response.status===401 || response.status===403 || response.status===503) {
        window.location.assign("/login?type=admin&returnTo=/admin/content"); return
      }
      if (!response.ok) throw new Error(payload?.error?.message ?? "Content could not be loaded.")
      setItems(payload.data ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Content could not be loaded.")
    } finally { setLoading(false) }
  }

  useEffect((): void => { void load() }, [])

  const create = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault(); setBusy(true); setError(null); setMessage(null)
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch("/api/admin/cms", {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)
      })
      const payload = await response.json().catch((): null => null)
      if (!response.ok) throw new Error(payload?.error?.message ?? "Could not save content.")
      setMessage("Draft saved successfully."); form.reset(); await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save content.")
    } finally { setBusy(false) }
  }

  const publish = async (id:string): Promise<void> => {
    setBusy(true); setError(null); setMessage(null)
    try {
      const response = await fetch("/api/admin/cms/"+encodeURIComponent(id)+"/publish",{method:"POST"})
      const payload = await response.json().catch((): null => null)
      if (!response.ok) throw new Error(payload?.error?.message ?? "Could not publish content.")
      setMessage("Content published to the public website."); await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not publish content.")
    } finally { setBusy(false) }
  }

  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#172033]">
      <header className="bg-[#102846] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d7c28e]">Sammena Administration</p><h1 className="text-lg font-bold">News & Publishing</h1></div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80"><ArrowLeft className="h-4 w-4"/>Admin</Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">Official publishing centre</p>
          <h2 className="mt-2 text-3xl font-bold text-[#17365d]">News, announcements & public posts</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">Create, edit and publish official school content. Publishing is permission-protected and audited server-side.</p>
        </div>
        {message && <div className="mt-5 flex items-center gap-2 border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"><CheckCircle2 className="h-4 w-4"/>{message}</div>}
        {error && <div className="mt-5 border border-red-200 bg-white p-4 text-sm text-red-700">{error}</div>}
        <div className="mt-7 grid gap-7 lg:grid-cols-[.8fr_1.2fr]">
          <form onSubmit={create} className="border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2"><FilePlus2 className="h-5 w-5 text-[#a27e35]"/><h3 className="text-xl font-bold text-[#17365d]">Create publication</h3></div>
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-semibold">Type<select name="type" className="mt-2 w-full border border-slate-200 bg-white px-3 py-3"><option value="NEWS">News</option><option value="ANNOUNCEMENT">Announcement</option></select></label>
              <label className="block text-sm font-semibold">Title<input name="title" required className="mt-2 w-full border border-slate-200 px-3 py-3"/></label>
              <label className="block text-sm font-semibold">Category<input name="category" className="mt-2 w-full border border-slate-200 px-3 py-3" placeholder="School News"/></label>
              <label className="block text-sm font-semibold">Excerpt<textarea name="excerpt" rows={3} className="mt-2 w-full border border-slate-200 px-3 py-3"/></label>
              <label className="block text-sm font-semibold">Body<textarea name="body" rows={7} className="mt-2 w-full border border-slate-200 px-3 py-3"/></label>
            </div>
            <button disabled={busy} className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#b9964f] px-5 py-3 text-sm font-bold text-[#102846]"><FilePlus2 className="h-4 w-4"/>{busy?"Saving…":"Save draft"}</button>
          </form>
          <section className="border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-6"><div><h3 className="text-xl font-bold text-[#17365d]">Publishing queue</h3><p className="mt-1 text-sm text-slate-500">Production CMS records.</p></div><button onClick={()=>void load()} className="border border-slate-200 p-2" aria-label="Refresh content"><RefreshCw className="h-4 w-4"/></button></div>
            {loading ? <div className="p-12 text-center"><RefreshCw className="mx-auto h-6 w-6 animate-spin text-[#b9964f]"/></div> : (
              <div className="divide-y divide-slate-100">
                {items.map(item => (
                  <article key={item.id} className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6c28]">{item.type}</span><span className="border border-slate-200 px-2 py-1 text-[10px] font-bold uppercase">{item.status}</span></div>
                        <h4 className="mt-2 text-lg font-bold text-[#17365d]">{item.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{item.excerpt || item.summary || "No summary provided."}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Link href={"/admin/content/"+encodeURIComponent(item.id)} className="inline-flex items-center gap-2 border border-slate-200 px-4 py-3 text-sm font-bold text-[#17365d]"><Edit3 className="h-4 w-4"/>Edit</Link>
                        {(item.status==="DRAFT" || item.status==="APPROVED") && <button disabled={busy} onClick={()=>void publish(item.id)} className="inline-flex items-center gap-2 bg-[#17365d] px-4 py-3 text-sm font-bold text-white disabled:opacity-60"><Send className="h-4 w-4"/>Publish</button>}
                      </div>
                    </div>
                  </article>
                ))}
                {items.length===0 && <p className="p-12 text-center text-sm text-slate-500">No CMS content has been created yet.</p>}
              </div>
            )}
          </section>
        </div>
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-[#a27e35]"/>Public publishing is restricted to authorized CMS publishing roles and recorded in the audit log.</div>
      </div>
    </main>
  )
}
