"use client"

import { useEffect, useMemo, useState } from "react"
import { CheckCircle2, ClipboardCheck, RotateCcw } from "lucide-react"

const items = ["Tranker na kufuli", "Sabuni miche mitano", "Mafuta ya kujipaka", "Mswaki na dawa ya meno", "Kitana", "Taulo", "Soksi za mikono na miguu", "Brashi ndoo", "Hot pot, kijiko na kikombe cha chai", "Madaftari 15", "Penseli box", "Kalamu box 1", "Rula na kifutio", "Kichongeo", "Godoro na shuka"]
const storageKey = "sammena-boarding-checklist-v1"

export function BoardingChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false))
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null")
      if (Array.isArray(saved) && saved.length === items.length) setChecked(saved)
    } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(checked)) } catch {}
  }, [checked])
  const complete = useMemo(() => checked.filter(Boolean).length, [checked])
  const progress = Math.round((complete / items.length) * 100)
  const reset = () => setChecked(items.map(() => false))

  return (
    <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-school-gold/15"><ClipboardCheck className="h-5 w-5 text-school-gold" /></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-school-gold">Boarding preparation</p><h2 className="mt-1 text-2xl font-bold">Packing checklist</h2><p className="mt-2 text-sm text-muted-foreground">Tick items as you prepare. Progress is saved in this browser.</p></div>
        </div>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground"><RotateCcw className="h-4 w-4" /> Reset</button>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-semibold"><span>{complete} of {items.length} ready</span><span>{progress}%</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-school-neutral"><div className="h-full rounded-full bg-school-gold transition-all" style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {items.map((item, index) => <label key={item} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${checked[index] ? "border-school-gold/40 bg-school-gold/10" : "border-border"}`}><input type="checkbox" checked={checked[index]} onChange={(e) => setChecked((current) => current.map((value, i) => i === index ? e.target.checked : value))} className="mt-1 h-4 w-4 accent-current"/><span className={checked[index] ? "line-through opacity-60" : ""}>{item}</span>{checked[index] && <CheckCircle2 className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-school-gold" />}</label>)}
      </div>
    </div>
  )
}
