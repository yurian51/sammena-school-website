"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Download, ExternalLink, FileText, Search, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type LibraryBook = {
  id: string
  title: string
  level: string
  subject: string
  format: "Online reader" | "PDF"
  readerUrl: string
  downloadUrl?: string
  source: string
  sourceUrl: string
  note: string
}

const books: LibraryBook[] = [
  {
    id: "tie-english-std4",
    title: "English Language, Standard Four",
    level: "Primary • Standard IV",
    subject: "English",
    format: "Online reader",
    readerUrl: "https://ol.tie.go.tz/uploaded_files/books/primary/Eng/Std4/English/English_Std_4.html",
    source: "Tanzania Institute of Education",
    sourceUrl: "https://ol.tie.go.tz/",
    note: "Official TIE digital repository reader. The school does not host or reproduce the book.",
  },
  {
    id: "tie-hisabati-std4",
    title: "Hisabati, Standard Four",
    level: "Primary • Standard IV",
    subject: "Mathematics",
    format: "Online reader",
    readerUrl: "https://ol.tie.go.tz/uploaded_files/books/primary/Eng/Std4/Hisabati/Hisabati_Std_4.html",
    source: "Tanzania Institute of Education",
    sourceUrl: "https://ol.tie.go.tz/",
    note: "Official TIE digital repository reader. Availability is controlled by the publisher's repository.",
  },
  {
    id: "tie-primary-curriculum",
    title: "Curriculum for Primary Education, Standard I–VII",
    level: "Primary • Standards I–VII",
    subject: "Curriculum reference",
    format: "PDF",
    readerUrl: "https://www.tie.go.tz/uploads/files/Curriculum%20for%20Primary%20Education%20STD%20I-VII%20English%20Medium%20Schools.pdf",
    downloadUrl: "https://www.tie.go.tz/uploads/files/Curriculum%20for%20Primary%20Education%20STD%20I-VII%20English%20Medium%20Schools.pdf",
    source: "Tanzania Institute of Education",
    sourceUrl: "https://www.tie.go.tz/",
    note: "Official curriculum publication. Copyright and reuse conditions remain with the publisher.",
  },
]

export default function LibraryPage() {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<LibraryBook>(books[0])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return books
    return books.filter(book => [book.title, book.level, book.subject, book.source].some(value => value.toLowerCase().includes(q)))
  }, [query])

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <section className="bg-school-dark pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" /> Resource Centre</Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-school-gold">Digital school library</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Read, learn and access verified books.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">Sammena Library connects learners and teachers to verified educational resources. Books are read through the official publisher repository where the publisher controls the digital copy.</p>
        </div>
      </section>
      <section className="border-b border-slate-200 bg-[#fffdf6] py-6">
        <div className="mx-auto flex max-w-7xl gap-3 px-5 sm:px-6 lg:px-8">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9b7728]" aria-hidden="true" />
          <p className="text-sm leading-6 text-slate-700"><strong className="text-school-dark">Copyright-safe library:</strong> Sammena does not upload or redistribute copyrighted textbooks without permission. Official TIE resources are opened from TIE's own repository.</p>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
          <aside>
            <label htmlFor="library-search" className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">Search library</label>
            <div className="mt-3 flex items-center border border-slate-300 bg-white">
              <Search className="ml-3 h-4 w-4 text-slate-400" aria-hidden="true" />
              <input id="library-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Book, subject or standard..." className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            </div>
            <div className="mt-5 space-y-3">
              {filtered.map(book => (
                <button key={book.id} onClick={() => setSelected(book)} className={"w-full border p-4 text-left transition-colors " + (selected.id === book.id ? "border-school-gold bg-[#fffaf0]" : "border-slate-200 bg-white hover:border-school-gold/50")}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-school-dark/5 text-school-gold"><BookOpen className="h-5 w-5" /></span>
                    <span><span className="block text-sm font-bold text-school-dark">{book.title}</span><span className="mt-1 block text-xs text-slate-500">{book.level} • {book.subject}</span></span>
                  </div>
                </button>
              ))}
              {!filtered.length && <p className="border border-slate-200 p-5 text-sm text-slate-500">No verified resource matches that search.</p>}
            </div>
          </aside>
          <section>
            <div className="border border-slate-200 bg-[#f7f7f5] p-5 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b7728]">{selected.subject}</p>
                  <h2 className="mt-2 text-2xl font-bold text-school-dark md:text-3xl">{selected.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">{selected.level} • {selected.format} • {selected.source}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={selected.readerUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-school-dark px-4 py-3 text-sm font-bold text-white"><ExternalLink className="h-4 w-4" /> Open full reader</a>
                  {selected.downloadUrl && <a href={selected.downloadUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-school-dark"><Download className="h-4 w-4" /> Download PDF</a>}
                </div>
              </div>
              <p className="mt-5 border-l-2 border-school-gold pl-4 text-sm leading-6 text-slate-600">{selected.note}</p>
            </div>
            <div className="mt-5 overflow-hidden border border-slate-200 bg-slate-100">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500"><FileText className="h-4 w-4 text-school-gold" /> In-page reader</div>
              <iframe key={selected.id} src={selected.readerUrl} title={"Reading " + selected.title} className="h-[72vh] min-h-[560px] w-full bg-white" loading="lazy" />
            </div>
            <div className="mt-5 flex flex-col gap-3 border border-slate-200 bg-white p-5 sm:flex-row sm:items-start">
              <BookOpen className="h-5 w-5 shrink-0 text-school-gold" aria-hidden="true" />
              <div>
                <p className="font-bold text-school-dark">Source & access</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">This digital shelf currently uses verified resources from the Tanzania Institute of Education. More Sammena-owned books can be added when the school provides the files and confirms publication rights.</p>
                <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">Visit publisher repository <ExternalLink className="h-4 w-4" /></a>
              </div>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  )
}
