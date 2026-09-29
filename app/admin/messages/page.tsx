"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Archive, ArrowLeft, CheckCircle2, Mail, RefreshCw, Search } from "lucide-react"

type Message = { id:string; sender_name:string; sender_email:string; sender_phone:string|null; subject:string; message:string; status:string; created_at:string }

export default function MessagesPage() {
  const [rows,setRows]=useState<Message[]>([])
  const [q,setQ]=useState("")
  const [status,setStatus]=useState("UNREAD")
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState<string|null>(null)

  const load=async()=>{
    setLoading(true);setError(null)
    try{
      const params=new URLSearchParams({status}); if(q.trim()) params.set("q",q.trim())
      const r=await fetch("/api/admin/messages?"+params.toString(),{cache:"no-store"})
      const p=await r.json().catch(()=>null)
      if(r.status===401||r.status===403||r.status===503){window.location.assign("/login?type=admin&returnTo=/admin/messages");return}
      if(!r.ok) throw new Error(p?.error?.message??"Messages could not be loaded.")
      setRows(p.data??[])
    }catch(e){setError(e instanceof Error?e.message:"Messages could not be loaded.")}finally{setLoading(false)}
  }
  useEffect(()=>{const t=setTimeout(()=>void load(),200);return()=>clearTimeout(t)},[status,q])

  const update=async(id:string,next:string)=>{
    const r=await fetch("/api/admin/messages",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status:next})})
    if(!r.ok){const p=await r.json().catch(()=>null);setError(p?.error?.message??"Message status could not be updated.");return}
    await load()
  }

  return <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
    <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a27e35]">School communication</p><h1 className="mt-2 text-3xl font-bold text-[#17365d]">Contact messages</h1><p className="mt-2 text-sm text-slate-600">Real enquiries submitted through the public contact form. No representative messages are inserted.</p></div>
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-[#17365d]"><ArrowLeft className="h-4 w-4"/>Admin</Link>
    </div>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <label className="relative flex-1"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search sender, subject or message" className="w-full border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#b9964f]"/></label>
      <select value={status} onChange={e=>setStatus(e.target.value)} className="border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"><option>UNREAD</option><option>READ</option><option>REPLIED</option><option>ARCHIVED</option></select>
      <button onClick={()=>void load()} className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-4 py-3 text-sm font-bold"><RefreshCw className="h-4 w-4"/>Refresh</button>
    </div>
    {error&&<div className="mt-5 border border-red-200 bg-white p-4 text-sm text-red-700">{error}</div>}
    <div className="mt-6 overflow-hidden border border-slate-200 bg-white shadow-sm">
      {loading?<div className="p-16 text-center"><RefreshCw className="mx-auto h-6 w-6 animate-spin text-[#b9964f]"/></div>:rows.length===0?<div className="p-16 text-center"><Mail className="mx-auto h-7 w-7 text-slate-300"/><p className="mt-3 text-sm font-semibold text-slate-600">No {status.toLowerCase()} messages.</p><p className="mt-1 text-xs text-slate-400">The inbox reflects real public enquiries only.</p></div>:<div className="divide-y divide-slate-100">{rows.map(row=><article key={row.id} className="p-5 sm:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6c28]">{row.status}</span><span className="text-xs text-slate-400">{new Date(row.created_at).toLocaleString("en-TZ",{timeZone:"Africa/Dar_es_Salaam"})}</span></div><h2 className="mt-2 text-lg font-bold text-[#17365d]">{row.subject}</h2><p className="mt-1 text-sm font-semibold">{row.sender_name} · {row.sender_email}{row.sender_phone ? " · " + row.sender_phone : ""}</p><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">{row.message}</p></div><div className="flex shrink-0 flex-wrap gap-2">{row.status==="UNREAD"&&<button onClick={()=>void update(row.id,"READ")} className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-xs font-bold"><CheckCircle2 className="h-4 w-4"/>Mark read</button>}{row.status!=="ARCHIVED"&&<button onClick={()=>void update(row.id,"ARCHIVED")} className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-xs font-bold"><Archive className="h-4 w-4"/>Archive</button>}</div></div></article>)}</div>}
    </div>
  </div></main>
}
