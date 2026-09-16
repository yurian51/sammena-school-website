"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Download, List, MapPin, RefreshCw } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { EventCategory, SchoolEvent } from "@/lib/calendar/types"

type FilterCategory = "ALL" | EventCategory

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const categoryClass: Record<EventCategory, string> = {
  ACADEMIC: "bg-blue-50 text-blue-700 border-blue-100",
  EXAMINATION: "bg-amber-50 text-amber-800 border-amber-100",
  ACTIVITY: "bg-emerald-50 text-emerald-700 border-emerald-100",
  MEETING: "bg-violet-50 text-violet-700 border-violet-100",
  ADMISSIONS: "bg-cyan-50 text-cyan-700 border-cyan-100",
  HOLIDAY: "bg-rose-50 text-rose-700 border-rose-100",
  CEREMONY: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
  OTHER: "bg-slate-100 text-slate-700 border-slate-200",
}
const categories: Array<{ value: FilterCategory; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "ACADEMIC", label: "Academic" },
  { value: "EXAMINATION", label: "Examination" },
  { value: "ACTIVITY", label: "Activity" },
  { value: "MEETING", label: "Meeting" },
  { value: "ADMISSIONS", label: "Admissions" },
  { value: "HOLIDAY", label: "Holiday" },
  { value: "CEREMONY", label: "Ceremony" },
]

function Reveal({ children }: { children: ReactNode }) {
  const { ref, isVisible } = useScrollAnimation()
  return <div ref={ref} data-motion="section" data-visible={isVisible ? "true" : "false"}>{children}</div>
}

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function localDateKey(date: Date) {
  return isoDate(date.getFullYear(), date.getMonth(), date.getDate())
}

function tanzaniaDateKey(value: string) {
  const parts = new Intl.DateTimeFormat("en", { timeZone: "Africa/Dar_es_Salaam", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(value))
  const year = parts.find(part => part.type === "year")?.value
  const month = parts.find(part => part.type === "month")?.value
  const day = parts.find(part => part.type === "day")?.value
  return `${year}-${month}-${day}`
}

function monthWindow(year: number, month: number) {
  return {
    from: new Date(Date.UTC(year, month, 1)).toISOString(),
    to: new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999)).toISOString(),
  }
}

function formatEventTime(event: SchoolEvent) {
  if (event.allDay) return "All day"
  const start = new Date(event.startsAt).toLocaleTimeString("en-TZ", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Dar_es_Salaam" })
  if (!event.endsAt) return start
  const end = new Date(event.endsAt).toLocaleTimeString("en-TZ", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Dar_es_Salaam" })
  return `${start} – ${end}`
}

export default function CalendarPage() {
  const today = new Date()
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(() => localDateKey(today))
  const [showOnly, setShowOnly] = useState<FilterCategory>("ALL")
  const [events, setEvents] = useState<SchoolEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const window = monthWindow(year, month)
      const response = await fetch(`/api/calendar?from=${encodeURIComponent(window.from)}&to=${encodeURIComponent(window.to)}`, { cache: "no-store" })
      const payload = await response.json().catch(() => null)
      if (!response.ok) throw new Error(payload?.error?.message ?? "The school calendar could not be loaded.")
      setEvents(payload.data ?? [])
    } catch (err) {
      setEvents([])
      setError(err instanceof Error ? err.message : "The school calendar could not be loaded.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [year, month])

  const visibleEvents = useMemo(() => events.filter(event => showOnly === "ALL" || event.category === showOnly), [events, showOnly])
  const selectedEvents = visibleEvents.filter(event => tanzaniaDateKey(event.startsAt) === selectedDate)
  const todayKey = localDateKey(today)

  const shiftMonth = (delta: number) => {
    const next = new Date(year, month + delta, 1)
    setCursor(next)
    setSelectedDate(isoDate(next.getFullYear(), next.getMonth(), 1))
  }
  const goToday = () => {
    const d = new Date()
    setCursor(new Date(d.getFullYear(), d.getMonth(), 1))
    setSelectedDate(localDateKey(d))
  }

  return <main className="min-h-screen overflow-x-hidden bg-slate-50"><Navbar/><section className="bg-[#071d3b] pb-14 pt-36 text-white"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Academic Calendar</p><h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">School Calendar</h1><p className="mt-4 max-w-2xl text-base leading-7 text-white/70">Published school events are loaded from the Sammena calendar service. No dates are displayed as official until they exist as published records.</p></div></section>
    <section className="py-8 sm:py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Reveal><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-4 sm:p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-2"><button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"><ChevronLeft className="h-4 w-4"/></button><button type="button" onClick={() => shiftMonth(1)} aria-label="Next month" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"><ChevronRight className="h-4 w-4"/></button><button type="button" onClick={goToday} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Today</button><h2 className="ml-1 text-xl font-bold text-[#071d3b]">{monthNames[month]} {year}</h2></div><div className="flex flex-wrap items-center gap-2"><label htmlFor="calendar-filter" className="sr-only">Filter calendar</label><select id="calendar-filter" value={showOnly} onChange={e => setShowOnly(e.target.value as FilterCategory)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#d8b55b]">{categories.map(category => <option key={category.value} value={category.value}>{category.label}</option>)}</select><span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500"><List className="h-4 w-4"/> {visibleEvents.length} published events</span><a href="/api/calendar/ical" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-[#071d3b] hover:bg-slate-50"><Download className="h-4 w-4"/> iCal</a></div></div></div>
      {loading ? <div className="flex min-h-[480px] items-center justify-center"><div className="text-center"><RefreshCw className="mx-auto h-7 w-7 animate-spin text-[#9b7728]"/><p className="mt-3 text-sm font-semibold text-slate-600">Loading published calendar…</p></div></div> : error ? <div className="m-5 border border-amber-200 bg-amber-50 p-5"><p className="font-bold text-amber-900">Calendar service unavailable</p><p className="mt-2 text-sm leading-6 text-amber-800">{error}</p><button type="button" onClick={() => void load()} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#071d3b] px-4 py-2 text-sm font-bold text-white"><RefreshCw className="h-4 w-4"/> Retry</button></div> : <div className="grid lg:grid-cols-[minmax(0,1fr)_290px]">
        <div className="min-w-0"><div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">{weekDays.map(day => <div key={day} className="px-2 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">{day}</div>)}</div><div className="grid grid-cols-7">{Array.from({ length: firstDay + days }, (_, index) => { const day = index - firstDay + 1; if (day < 1) return <div key={`empty-${index}`} className="min-h-24 border-b border-r border-slate-100 bg-slate-50/40 sm:min-h-28"/>; const date = isoDate(year, month, day); const dayEvents = visibleEvents.filter(event => tanzaniaDateKey(event.startsAt) === date); const selected = date === selectedDate; return <button type="button" key={date} onClick={() => setSelectedDate(date)} className={`min-h-24 border-b border-r border-slate-100 bg-white p-2 text-left transition hover:bg-[#faf8f1] sm:min-h-28 ${selected ? "bg-[#faf8f1] ring-2 ring-inset ring-[#d8b55b]" : ""}`}><span className={date === todayKey ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#071d3b] text-xs font-bold text-white" : "text-sm font-semibold text-slate-700"}>{day}</span><div className="mt-2 space-y-1">{dayEvents.slice(0, 2).map(event => <span key={event.id} className={`block truncate rounded border px-1.5 py-1 text-left text-[10px] font-bold ${categoryClass[event.category]}`}>{event.title}</span>)}{dayEvents.length > 2 && <span className="block text-left text-[10px] font-bold text-slate-400">+{dayEvents.length - 2} more</span>}</div></button> })}</div></div>
        <aside className="border-t border-slate-200 bg-slate-50/60 p-5 lg:border-l lg:border-t-0"><div className="flex items-center gap-2 text-[#071d3b]"><CalendarDays className="h-5 w-5 text-[#9a7628]"/><h3 className="font-bold">Selected date</h3></div><p className="mt-2 text-sm font-semibold text-slate-600">{new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-TZ", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Dar_es_Salaam" })}</p><div className="mt-5 space-y-3">{selectedEvents.length ? selectedEvents.map(event => <article key={event.id} className="rounded-xl border border-slate-200 bg-white p-4"><span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${categoryClass[event.category]}`}>{event.category}</span><h4 className="mt-3 font-bold text-[#071d3b]">{event.title}</h4>{event.description && <p className="mt-2 text-xs leading-5 text-slate-500">{event.description}</p>}<p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><Clock3 className="h-3.5 w-3.5"/>{formatEventTime(event)}</p>{event.location && <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5"/>{event.location}</p>}</article>) : <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-500">No published school event is recorded for this date.</div>}</div><div className="mt-6 border-t border-slate-200 pt-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Calendar integrity</p><p className="mt-2 text-xs leading-5 text-slate-500">Only published public events are exposed by the calendar API. Draft, review and private audience records remain outside this public view.</p><Link href="/contact" className="mt-3 inline-flex text-xs font-bold text-[#8a6a24] hover:underline">Contact school office →</Link></div></aside>
      </div>}
    </div></Reveal></div></section><Footer/></main>
}
