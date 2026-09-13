import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, Trophy } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Secondary School | Planned 2028 Expansion",
  description: "Information about Sammena Schools' planned secondary education expansion, with a current target of 2028. Secondary education is not currently operating.",
  robots: { index: true, follow: true },
}

const pillars = [
  { icon: BookOpen, title: "Academic Foundation", text: "A future secondary programme designed to build on the strong learning foundation established in the early years and primary stages." },
  { icon: ShieldCheck, title: "Character & Responsibility", text: "A learning culture where discipline, integrity, confidence and responsibility remain central to student development." },
  { icon: Trophy, title: "Talent & Leadership", text: "Space for sport, creativity, leadership and other co-curricular opportunities alongside academic learning." },
]

export default function SecondaryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-[#071d3b] pt-36 pb-24 text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#c9a24b]/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#123f73]/50 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d8b55b]/30 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b55b]">
            <GraduationCap className="h-4 w-4" /> Planned expansion · 2028
          </span>
          <h1 className="mt-7 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">Sammena Secondary School</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">The next chapter of the Sammena Schools journey, extending the institution's educational pathway beyond primary education.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c9a24b] px-6 py-3.5 font-bold text-[#071d3b] hover:bg-[#dfc477]">Talk to Sammena <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white hover:bg-white/10">Explore Pre & Primary</Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#9a7628]">A planned institution</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#071d3b] sm:text-4xl">Growing the Sammena education pathway</h2>
            <p className="mt-5 leading-relaxed text-slate-600">This page is intentionally presented as future institutional planning. Detailed programmes, facilities, admissions requirements and launch information will be published only when officially confirmed by Sammena.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071d3b] text-[#d8b55b]"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-5 text-lg font-bold text-[#071d3b]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-[#d8b55b]/30 bg-[#f8f4e9] p-7 sm:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6a24]">Launch target</p>
                <p className="mt-2 text-3xl font-bold text-[#071d3b]">2028</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">The 2028 target is a planning direction, not a statement that the secondary school is currently operating.</p>
              </div>
              <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#071d3b] px-6 py-3.5 font-semibold text-white hover:bg-[#123f73]">Contact Sammena <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
