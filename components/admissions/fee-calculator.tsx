"use client"

import { useMemo, useState } from "react"
import { Calculator, Info } from "lucide-react"

const options = [
  { id: "nursery", label: "Nursery · Baby & Middle", annual: 603000 },
  { id: "pre-unity", label: "Pre-Unity", annual: 638000 },
  { id: "primary-a", label: "Primary · Class IV–VII", annual: 833000 },
  { id: "primary-b", label: "Class I, II, III, V & VI", annual: 693000 },
  { id: "boarding", label: "Boarding", annual: 1211000 },
]

const money = new Intl.NumberFormat("en-TZ")

export function FeeCalculator() {
  const [selected, setSelected] = useState(options[0].id)
  const [term, setTerm] = useState<"annual" | "term">("annual")
  const [students, setStudents] = useState(1)
  const result = useMemo(() => {
    const option = options.find((item) => item.id === selected) ?? options[0]
    const amount = term === "annual" ? option.annual : Math.round(option.annual / 3)
    return { ...option, amount: amount * students }
  }, [selected, term, students])

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-school-gold/15">
          <Calculator className="h-5 w-5 text-school-gold" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-school-gold">Planning tool</p>
          <h2 className="mt-1 text-2xl font-bold">Estimate your fees</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Select the applicable schedule and number of learners. The term estimate is an even one-third split of the listed annual total, not a replacement for the school's official invoice.</p>
        </div>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        <label className="text-sm font-semibold md:col-span-2">Fee schedule
          <select value={selected} onChange={(e) => setSelected(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-school-gold">
            {options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Learners
          <input type="number" min={1} max={20} value={students} onChange={(e) => setStudents(Math.min(20, Math.max(1, Number(e.target.value) || 1)))} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-school-gold" />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => setTerm("annual")} className={`rounded-full px-4 py-2 text-sm font-semibold ${term === "annual" ? "bg-school-dark text-white" : "border border-border text-muted-foreground"}`}>Annual</button>
        <button type="button" onClick={() => setTerm("term")} className={`rounded-full px-4 py-2 text-sm font-semibold ${term === "term" ? "bg-school-dark text-white" : "border border-border text-muted-foreground"}`}>Estimated per term</button>
      </div>
      <div className="mt-6 rounded-2xl bg-school-dark p-6 text-white">
        <p className="text-xs uppercase tracking-[0.18em] text-school-gold">{result.label}</p>
        <p className="mt-2 text-3xl font-extrabold">TSh {money.format(result.amount)}</p>
        <p className="mt-2 text-xs text-white/55">{students} learner{students === 1 ? "" : "s"} · {term === "annual" ? "listed annual total" : "calculated one-third estimate"}</p>
      </div>
      <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted-foreground"><Info className="mt-0.5 h-4 w-4 shrink-0 text-school-gold" />Source figures follow the supplied joining instruction. Where the document gives itemized term amounts, use those official amounts rather than this simple estimate.</div>
    </div>
  )
}
