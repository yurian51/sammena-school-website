"use client"

import { FormEvent, useState } from "react"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [submitted, setSubmitted] = useState("")
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(query.trim()) }
  return (
    <main className="min-h-screen bg-background pt-28"><section className="border-b border-border bg-school-dark py-16 text-white"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-school-orange">Search</p><h1 className="text-4xl font-bold md:text-5xl">Find information on Sammena</h1><form onSubmit={submit} className="mx-auto mt-8 flex max-w-2xl gap-2 rounded-2xl bg-white p-2"><Search className="ml-3 mt-3 h-5 w-5 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search admissions, academics, news, resources..." className="min-w-0 flex-1 bg-transparent px-2 py-3 text-slate-900 outline-none"/><button className="rounded-xl bg-[#c9a24b] px-5 py-3 font-bold text-[#071d3b]">Search</button></form></div></section><section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">{submitted ? <div className="rounded-2xl border border-border bg-card p-8"><h2 className="text-xl font-bold">Search prepared for “{submitted}”</h2><p className="mt-2 text-sm text-muted-foreground">Full indexed search will connect to the Sammena CMS/search service. The interface is ready without pretending an index already exists.</p><Link href="/" className="mt-5 inline-flex items-center gap-2 font-semibold text-school-orange">Back to home <ArrowRight className="h-4 w-4"/></Link></div> : <p className="text-center text-muted-foreground">Search across the public Sammena website.</p>}</section></main>
  )
}
