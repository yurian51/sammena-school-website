"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, type ReactNode } from "react"
import { ArrowLeft, CalendarDays, Clock3, MapPin, RefreshCw, UserRound } from "lucide-react"

type Entry = { id:string; dayOfWeek:number; periodNumber:number; startsAt:string; endsAt:string; subject:string; teacherName:string|null; room:string|null }
const days = [[1,"Monday"],[2,"Tuesday"],[3,"Wednesday"],[4,"Thursday"],[5,"Friday"]] as const

export default function StudentTimetablePage() {
  const [data,setData] = useState<{academicYearName:string;className:string;entries:Entry[]}|null>(null)
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/portal/student/timetable",{cache:"no-store",credentials:"same-origin"})
        const payload = await response.json()
        if (!response.ok || !payload.data) throw new Error(payload.error?.message || "Timetable is unavailable")
        setData(payload.data)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Timetable is unavailable")
      } finally { setLoading(false) }
    })()
  }, [])

  const grouped = useMemo(() => {
    const map = new Map<number,Entry[]>()
    for (const [day] of days) map.set(day,[])
    for (const entry of data?.entries ?? []) map.get(entry.dayOfWeek)?.push(entry)
    return map
  },[data])

  return <main className="min-h-screen bg-[#f6f8fb] text-[#183252]">
    <header className="border-b border-[#dce4ed] bg-white">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5">
        <Link href="/portal/student" className="inline-flex items-center gap-2 text-xs font-bold text-[#536c84]"><ArrowLeft className="h-4 w-4"/> Student Portal</Link>
        <span className="inline-flex items-center gap-2 text-xs font-bold text-[#2a94b8]"><CalendarDays className="h-4 w-4"/> Timetable</span>
      </div>
    </header>
    <div className="mx-auto max-w-7xl px-5 py-8">
      <section className="rounded-3xl bg-[#163b68] p-7 text-white sm:p-9">
        <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#f0c85f]">Live SIS timetable</p>
        <h1 className="mt-3 text-3xl font-bold">Weekly class timetable</h1>
        <p className="mt-2 text-sm text-white/70">{loading ? "Loading class schedule…" : data ? data.className+" · "+data.academicYearName : "Your timetable"}</p>
      </section>
      {loading && <State text="Connecting to the school timetable service…"/>}
      {!loading && error && <State text={error} action={<Link href="/portal/student" className="font-bold text-[#2a94b8]">Return to portal</Link>}/>}
      {!loading && !error && data && <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {days.map(([day,label]) => {
          const entries = grouped.get(day) ?? []
          return <section key={day} className="rounded-3xl border border-[#dce4ed] bg-white shadow-sm">
            <div className="border-b border-[#e8eef4] px-5 py-4"><h2 className="font-bold">{label}</h2><p className="text-xs text-[#7890a6]">{entries.length} scheduled lesson{entries.length===1?"":"s"}</p></div>
            {entries.length ? <div className="divide-y divide-[#e8eef4]">{entries.map(entry => <article key={entry.id} className="p-5">
              <div className="flex items-start justify-between gap-4"><div><h3 className="font-bold">{entry.subject}</h3><p className="mt-1 inline-flex items-center gap-1 text-xs text-[#7890a6]"><Clock3 className="h-3.5 w-3.5"/> {entry.startsAt.slice(0,5)}–{entry.endsAt.slice(0,5)}</p></div><span className="rounded-full bg-[#eef8fc] px-2.5 py-1 text-[10px] font-bold text-[#269ab9]">P{entry.periodNumber}</span></div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#667f97]">{entry.teacherName && <span className="inline-flex items-center gap-1"><UserRound className="h-3.5 w-3.5"/>{entry.teacherName}</span>}{entry.room && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5"/>{entry.room}</span>}</div>
            </article>)}</div> : <p className="p-7 text-center text-xs text-[#7890a6]">No timetable entries have been published for this day.</p>}
          </section>
        })}
      </div>}
    </div>
  </main>
}

function State({text,action}:{text:string;action?:ReactNode}) {
  return <section className="mx-auto mt-6 max-w-xl rounded-3xl border border-[#dce4ed] bg-white p-8 text-center text-sm text-[#7890a6]"><RefreshCw className="mx-auto mb-3 h-5 w-5 text-[#269ab9]"/><p>{text}</p>{action && <div className="mt-4">{action}</div>}</section>
}
