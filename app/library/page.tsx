"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Download, ExternalLink, FileText, Filter, GraduationCap, Search, ShieldCheck, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type ResourceKind = "Textbook" | "Supplementary" | "Curriculum & guide"
type Resource = {
  id: string
  title: string
  kind: ResourceKind
  level: string
  subject: string
  language: "English" | "Kiswahili"
  source: string
  sourceUrl: string
  readerUrl: string
  downloadUrl?: string
  description: string
}

const resources: Resource[] = [
  {
    id: "tie-std4-english",
    title: "English Language, Standard Four",
    kind: "Textbook",
    level: "Primary • Standard IV",
    subject: "English",
    language: "English",
    source: "Tanzania Institute of Education",
    sourceUrl: "https://ol.tie.go.tz/",
    readerUrl: "https://ol.tie.go.tz/uploaded_files/books/primary/Eng/Std4/English/English_Std_4.html",
    description: "Curriculum-aligned primary textbook available through the official TIE digital library.",
  },
  {
    id: "tie-std4-hisabati",
    title: "Hisabati, Standard Four",
    kind: "Textbook",
    level: "Primary • Standard IV",
    subject: "Mathematics",
    language: "Kiswahili",
    source: "Tanzania Institute of Education",
    sourceUrl: "https://ol.tie.go.tz/",
    readerUrl: "https://ol.tie.go.tz/uploaded_files/books/primary/Eng/Std4/Hisabati/Hisabati_Std_4.html",
    description: "Primary mathematics learning resource linked directly to the official TIE repository.",
  },
  {
    id: "tie-primary-curriculum",
    title: "Curriculum for Primary Education, Standard I–VII",
    kind: "Curriculum & guide",
    level: "Primary • Standards I–VII",
    subject: "Curriculum",
    language: "English",
    source: "Tanzania Institute of Education",
    sourceUrl: "https://www.tie.go.tz/",
    readerUrl: "https://www.tie.go.tz/uploads/files/Curriculum%20for%20Primary%20Education%20STD%20I-VII%20English%20Medium%20Schools.pdf",
    downloadUrl: "https://www.tie.go.tz/uploads/files/Curriculum%20for%20Primary%20Education%20STD%20I-VII%20English%20Medium%20Schools.pdf",
    description: "Official national primary education curriculum reference for English-medium schools.",
  },
]

const filters = ["All", "Textbook", "Supplementary", "Curriculum & guide"] as const

export default function LibraryPage() {
  const [query, setQuery] = useState("")
  const [kind, setKind] = useState<(typeof filters)[number]>("All")
  const [level, setLevel] = useState("All")
  const [selected, setSelected] = useState<Resource>(resources[0])

  const levels = useMemo(() => ["All", ...Array.from(new Set(resources.map(resource => resource.level)))], [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter(resource => {
      const matchesKind = kind === "All" || resource.kind === kind
      const matchesLevel = level === "All" || resource.level === level
      const matchesQuery = !q || [resource.title, resource.subject, resource.level, resource.language, resource.source, resource.kind].some(value => value.toLowerCase().includes(q))
      return matchesKind && matchesLevel && matchesQuery
    })
  }, [kind, level, query])

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fafaf8]">
      <Navbar />

      <section className="bg-school-dark pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" /> Resource Centre</Link>
          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-school-gold">Sammena Digital Library</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Learning resources, organised like a real school library.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">A structured digital shelf for textbooks, supplementary learning materials and curriculum guides. Verified publisher resources can be read online, while downloadable files are offered only where the source permits direct access.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px border-x border-slate-200 sm:grid-cols-3">
          <div className="p-5"><p className="text-2xl font-bold text-school-dark">3</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Verified resources</p></div>
          <div className="p-5"><p className="text-2xl font-bold text-school-dark">2</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Textbooks</p></div>
          <div className="p-5"><p className="text-2xl font-bold text-school-dark">1</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Curriculum guide</p></div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#fffdf6] py-6">
        <div className="mx-auto flex max-w-7xl gap-3 px-5 sm:px-6 lg:px-8">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9b7728]" aria-hidden="true" />
          <p className="text-sm leading-6 text-slate-700"><strong className="text-school-dark">Verified-source policy:</strong> copyrighted textbooks are not copied into Sammena's public server without permission. The catalogue can link to an official publisher reader or store a Sammena-owned resource when publication rights are confirmed.</p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
              <div className="flex items-center gap-2"><Filter className="h-4 w-4 text-school-gold" /><p className="text-xs font-bold uppercase tracking-[0.16em] text-school-dark">Library filters</p></div>
              <label htmlFor="library-search" className="mt-5 block text-xs font-bold text-slate-600">Search</label>
              <div className="mt-2 flex items-center border border-slate-300 bg-white">
                <Search className="ml-3 h-4 w-4 text-slate-400" aria-hidden="true" />
                <input id="library-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Book, subject..." className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
              </div>
              <label htmlFor="library-kind" className="mt-5 block text-xs font-bold text-slate-600">Resource type</label>
              <select id="library-kind" value={kind} onChange={event => setKind(event.target.value as (typeof filters)[number])} className="mt-2 w-full border border-slate-300 bg-white px-3 py-3 text-sm outline-none">
                {filters.map(item => <option key={item}>{item}</option>)}
              </select>
              <label htmlFor="library-level" className="mt-5 block text-xs font-bold text-slate-600">Education level</label>
              <select id="library-level" value={level} onChange={event => setLevel(event.target.value)} className="mt-2 w-full border border-slate-300 bg-white px-3 py-3 text-sm outline-none">
                {levels.map(item => <option key={item}>{item}</option>)}
              </select>
            </aside>

            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Collection</p><h2 className="mt-1 text-2xl font-bold text-school-dark">Textbooks & learning resources</h2></div>
                <p className="text-sm text-slate-500">{filtered.length} resource{filtered.length === 1 ? "" : "s"}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map(resource => (
                  <button key={resource.id} onClick={() => setSelected(resource)} className={"border p-5 text-left transition-shadow hover:shadow-md " + (selected.id === resource.id ? "border-school-gold bg-[#fffaf4] shadow-sm" : "border-slate-200 bg-white")}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center bg-school-dark/5 text-school-gold"><BookOpen className="h-5 w-5" /></span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a6a24]">{resource.kind}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-school-dark">{resource.title}</h3>
                    <p className="mt-2 text-xs font-semibold text-slate-500">{resource.level} • {resource.subject}</p>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{resource.description}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#8a6a24]"><GraduationCap className="h-4 w-4" /> {resource.language} • {resource.source}</div>
                  </button>
                ))}
              </div>

              {!filtered.length && <div className="border border-slate-200 bg-white p-8 text-center"><p className="font-bold text-school-dark">No verified resources match your filters.</p><p className="mt-2 text-sm text-slate-500">The catalogue deliberately does not fill empty shelves with invented books.</p></div>}

              <section className="mt-8 border border-slate-200 bg-white">
                <div className="border-b border-slate-200 bg-[#f7f7f5] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Selected resource</p>
                  <h2 className="mt-2 text-2xl font-bold text-school-dark">{selected.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">{selected.level} • {selected.subject} • {selected.source}</p>
                </div>
                <div className="p-5 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <p className="max-w-2xl text-sm leading-7 text-slate-600">{selected.description}</p>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <a href={selected.readerUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-school-dark px-4 py-3 text-sm font-bold text-white"><ExternalLink className="h-4 w-4" /> Open reader</a>
                      {selected.downloadUrl && <a href={selected.downloadUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-school-dark"><Download className="h-4 w-4" /> Download</a>}
                    </div>
                  </div>
                  <div className="mt-6 overflow-hidden border border-slate-200 bg-slate-100">
                    <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500"><FileText className="h-4 w-4 text-school-gold" /> Reader preview</div>
                    <iframe key={selected.id} src={selected.readerUrl} title={"Reading " + selected.title} className="h-[70vh] min-h-[560px] w-full bg-white" loading="lazy" />
                  </div>
                  <div className="mt-5 flex items-start gap-3 border-t border-slate-200 pt-5">
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-school-gold" />
                    <p className="text-sm leading-6 text-slate-600">Publisher: <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="font-bold text-[#8a6a24]">{selected.source}</a>. Sammena links to the source of record for externally hosted books.</p>
                  </div>
                </div>
              </section>

              <section className="mt-8 grid gap-4 md:grid-cols-2">
                <article className="border border-slate-200 bg-school-dark p-6 text-white">
                  <Sparkles className="h-5 w-5 text-school-gold" />
                  <h2 className="mt-4 text-xl font-bold">Supplementary learning shelf</h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">This shelf is reserved for storybooks, revision materials, teacher-approved readers, past learning materials and other supplementary resources with verified publication rights.</p>
                </article>
                <article className="border border-slate-200 bg-white p-6">
                  <FileText className="h-5 w-5 text-school-gold" />
                  <h2 className="mt-4 text-xl font-bold text-school-dark">Teacher resources</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Teacher guides, curriculum documents and approved teaching resources can live alongside textbooks, clearly labelled by audience and access level.</p>
                </article>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
