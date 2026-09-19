"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarDays, Plus, Trash2 } from "lucide-react"

type Option={id:string;name:string}
type Entry={id:string;academicYearId:string;classId:string;className:string;dayOfWeek:number;periodNumber:number;startsAt:string;endsAt:string;subject:string;teacherName:string|null;room:string|null}
const days=["","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

export default function TimetableManagementPage(){
  const [data,setData]=useState<{entries:Entry[];academicYears:Option[];classes:Option[]}|null>(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState("")
  const [form,setForm]=useState({academicYearId:"",classId:"",dayOfWeek:"1",periodNumber:"1",startsAt:"08:00",endsAt:"08:40",subject:"",teacherName:"",room:""})
  const load=async()=>{
    setLoading(true);setError("")
    try{
      const r=await fetch("/api/sis/timetable",{cache:"no-store",credentials:"same-origin"})
      const p=await r.json()
      if(!r.ok||!p.data) throw new Error(p.error?.message||"Timetable management is unavailable")
      setData(p.data)
      setForm(f=>({...f,academicYearId:f.academicYearId||p.data.academicYears[0]?.id||"",classId:f.classId||p.data.classes[0]?.id||""}))
    }catch(e){setError(e instanceof Error?e.message:"Timetable management is unavailable")}
    finally{setLoading(false)}
  }
  useEffect(()=>{void load()},[])
  const submit=async(e:FormEvent)=>{
    e.preventDefault();setError("")
    try{
      const r=await fetch("/api/sis/timetable",{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({...form,dayOfWeek:Number(form.dayOfWeek),periodNumber:Number(form.periodNumber),teacherName:form.teacherName||null,room:form.room||null})})
      const p=await r.json()
      if(!r.ok) throw new Error(p.error?.message||"Could not save timetable entry")
      await load()
      setForm(f=>({...f,subject:"",teacherName:"",room:""}))
    }catch(e){setError(e instanceof Error?e.message:"Could not save timetable entry")}
  }
  const remove=async(id:string)=>{
    if(!confirm("Delete this timetable entry?")) return
    const r=await fetch("/api/sis/timetable?id="+encodeURIComponent(id),{method:"DELETE",credentials:"same-origin"})
    if(!r.ok){const p=await r.json();setError(p.error?.message||"Could not delete timetable entry");return}
    await load()
  }
  return <main className="min-h-screen bg-[#f6f8fb] text-[#183252]"><header className="border-b border-[#dce4ed] bg-white"><div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5"><Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#536c84]"><ArrowLeft className="h-4 w-4"/> Sammena</Link><span className="inline-flex items-center gap-2 text-xs font-bold text-[#2a94b8]"><CalendarDays className="h-4 w-4"/> Timetable Management</span></div></header><div className="mx-auto max-w-7xl px-5 py-8"><section className="rounded-3xl bg-[#163b68] p-7 text-white sm:p-9"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#f0c85f]">SIS operations</p><h1 className="mt-3 text-3xl font-bold">Manage class timetable</h1><p className="mt-2 text-sm text-white/70">Create and remove school-scoped lessons. Students only see the timetable for their active class.</p></section>{error&&<div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}<form onSubmit={submit} className="mt-6 grid gap-4 rounded-3xl border border-[#dce4ed] bg-white p-6 shadow-sm md:grid-cols-2 lg:grid-cols-4"><select required value={form.academicYearId} onChange={e=>setForm({...form,academicYearId:e.target.value})} className="rounded-xl border p-3 text-sm"><option value="">Academic year</option>{data?.academicYears.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select><select required value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})} className="rounded-xl border p-3 text-sm"><option value="">Class</option>{data?.classes.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select><select value={form.dayOfWeek} onChange={e=>setForm({...form,dayOfWeek:e.target.value})} className="rounded-xl border p-3 text-sm">{days.slice(1,6).map((x,i)=><option key={i+1} value={i+1}>{x}</option>)}</select><input type="number" min="1" max="12" value={form.periodNumber} onChange={e=>setForm({...form,periodNumber:e.target.value})} className="rounded-xl border p-3 text-sm" placeholder="Period"/><input type="time" required value={form.startsAt} onChange={e=>setForm({...form,startsAt:e.target.value})} className="rounded-xl border p-3 text-sm"/><input type="time" required value={form.endsAt} onChange={e=>setForm({...form,endsAt:e.target.value})} className="rounded-xl border p-3 text-sm"/><input required value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} className="rounded-xl border p-3 text-sm" placeholder="Subject"/><input value={form.teacherName} onChange={e=>setForm({...form,teacherName:e.target.value})} className="rounded-xl border p-3 text-sm" placeholder="Teacher"/><input value={form.room} onChange={e=>setForm({...form,room:e.target.value})} className="rounded-xl border p-3 text-sm" placeholder="Room"/><button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#163b68] px-4 py-3 text-sm font-bold text-white disabled:opacity-50"><Plus className="h-4 w-4"/> Add lesson</button></form><section className="mt-6 overflow-hidden rounded-3xl border border-[#dce4ed] bg-white shadow-sm"><div className="border-b border-[#e8eef4] p-5"><h2 className="font-bold">Published timetable entries</h2></div>{!data?.entries.length?<p className="p-8 text-center text-sm text-[#7890a6]">No timetable entries exist yet.</p>:<div className="divide-y divide-[#e8eef4]">{data.entries.map(x=><div key={x.id} className="flex flex-wrap items-center gap-4 p-5"><div className="min-w-0 flex-1"><b className="block">{x.className} · {days[x.dayOfWeek]} · P{x.periodNumber}</b><span className="text-xs text-[#7890a6]">{x.startsAt.slice(0,5)}–{x.endsAt.slice(0,5)} · {x.subject}{x.teacherName?" · "+x.teacherName:""}{x.room?" · "+x.room:""}</span></div><button type="button" onClick={()=>void remove(x.id)} className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-700"><Trash2 className="h-4 w-4"/> Delete</button></div>)}</div>}</section></div></main>
}
