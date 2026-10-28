import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, ExternalLink, FileCheck2, GraduationCap, HeartHandshake, Languages, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Academics",
  description: "Academic information for Sammena Pre & Primary School, with clear separation between school-specific information and the national curriculum framework.",
  alternates: { canonical: "/academics" },
}

const stages = [
  {
    title: "Pre-Primary",
    eyebrow: "Early years",
    icon: HeartHandshake,
    text: "Early learning at Sammena is presented as the foundation stage of the school journey. Current class-specific timetables and detailed subject allocations are published only when confirmed by the school.",
  },
  {
    title: "Primary School",
    eyebrow: "Standards I–VII",
    icon: GraduationCap,
    text: "Samena Pre & Primary School provides primary education. The national curriculum framework for English-medium primary schools provides the reference point for curriculum planning and learner development.",
  },
]

const principles = [
  "Learner-centred teaching and learning",
  "Development of knowledge, competencies, values and life skills",
  "Academic learning alongside social, ethical and physical development",
  "Assessment and feedback used to support learner progress",
]

const subjectAreas = [
  { icon: Languages, title: "Languages", text: "Language learning is part of the national primary curriculum framework, including English and Kiswahili pathways." },
  { icon: BookOpen, title: "Mathematics & sciences", text: "The national framework provides structured learning in mathematics, science and related areas across primary stages." },
  { icon: CheckCircle2, title: "Social, ethical & cultural learning", text: "The curriculum framework includes learning that develops social, ethical, cultural and civic understanding." },
  { icon: HeartHandshake, title: "Arts, sport & life skills", text: "Creative, physical and life-skill development form part of the broader learner-development approach." },
]

export default function AcademicsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-school-dark pb-20 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-school-gold">Academic programme</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Learning with a clear academic foundation.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
            This page separates what is documented about Sammena from the national curriculum framework. It does not invent a timetable, subject allocation or examination promise simply to make the page look full.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#f7f7f5] py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border border-[#c8a64b]/30 bg-[#fffdf6] p-5 sm:flex-row sm:items-start">
            <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9b7728]" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a24]">Evidence status</p>
              <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-700">
                Sammena-specific timetable, current class-by-class subject allocation, teaching staff assignments and internal assessment schedules are operational records. They are not published here unless approved by the school.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {stages.map(({ title, eyebrow, icon: Icon, text }) => (
              <article key={title} className="border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#0a3158]/5 text-[#9b7728]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">{eyebrow}</p>
                <h2 className="mt-2 text-2xl font-bold text-school-dark">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">National curriculum reference</p>
              <h2 className="mt-3 text-3xl font-bold text-school-dark md:text-4xl">The framework behind primary learning.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Tanzania Institute of Education publishes the national curriculum and syllabi used as reference material for primary education. The official English-medium Standard I–VII curriculum describes learner-centred education and development across academic, ethical, physical and social domains.
              </p>
              <a
                href="https://www.tie.go.tz/uploads/files/Curriculum%20for%20Primary%20Education%20STD%20I-VII%20English%20Medium%20Schools.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-school-dark px-5 py-3 text-sm font-bold text-white"
              >
                Open official curriculum <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {subjectAreas.map(({ icon: Icon, title, text }) => (
                <article key={title} className="border border-slate-200 bg-white p-6">
                  <Icon className="h-5 w-5 text-[#9b7728]" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-school-dark">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Learning approach</p>
              <h2 className="mt-3 text-3xl font-bold text-school-dark md:text-4xl">The learner is more than a mark.</h2>
              <div className="mt-7 grid gap-3">
                {principles.map(principle => (
                  <div key={principle} className="flex items-start gap-3 border border-slate-200 bg-white p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9b7728]" aria-hidden="true" />
                    <p className="text-sm leading-6 text-slate-700">{principle}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="bg-school-dark p-7 text-white sm:p-9">
              <CalendarDays className="h-6 w-6 text-school-gold" aria-hidden="true" />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-school-gold">School timetable</p>
              <h2 className="mt-2 text-2xl font-bold">Current schedule is controlled by the school.</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Daily start times, lesson periods, breaks, examinations and activity schedules can change by term. The public site will publish an approved calendar or timetable record rather than displaying a hard-coded schedule.
              </p>
              <Link href="/calendar" className="mt-6 inline-flex items-center gap-2 bg-school-gold px-5 py-3 text-sm font-bold text-school-dark">
                View school calendar <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#fffdf6] py-14">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Academic information</p>
          <h2 className="mt-3 text-3xl font-bold text-school-dark">Need the current class or subject information?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            For current class allocations, approved timetables, school assessment arrangements or academic enquiries, use the school&apos;s official contact channel.
          </p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 bg-school-dark px-6 py-3 text-sm font-bold text-white">
            Contact Sammena <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
