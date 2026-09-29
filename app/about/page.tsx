import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Heart, ShieldCheck, Target, Eye, GraduationCap, FileCheck2, CalendarDays } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Sammena Schools",
  description: "Learn about Sammena Schools, its current educational focus, values and public information standards.",
  alternates: { canonical: "/about" },
}

const principles = [
  {
    icon: Eye,
    title: "Vision",
    text: "To be a leading centre of quality education in Tanzania, producing well-rounded graduates who contribute positively to society.",
  },
  {
    icon: Target,
    title: "Mission",
    text: "To provide quality education, care and moral guidance to children, with particular attention to vulnerable and disadvantaged learners.",
  },
  {
    icon: Heart,
    title: "Values",
    text: "Compassion, integrity, educational excellence, respect and a commitment to helping children grow through learning.",
  },
]

const currentFocus = [
  "Pre-primary and primary education",
  "Academic learning and future readiness",
  "Character, wellbeing and responsible citizenship",
  "Sport and co-curricular development",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="bg-school-dark pb-20 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-school-gold">About Sammena Schools</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Education with a clear purpose.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Sammena Schools is building an education environment centred on learning, character, wellbeing, sport and future readiness.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#f7f7f5] py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border border-[#c8a64b]/30 bg-[#fffdf6] p-5 sm:flex-row sm:items-start">
            <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9b7728]" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a24]">Institutional information standard</p>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-700">
                Public information is published only when it can be supported by an approved school record or official source. Unverified figures, testimonials, rankings and operational claims are not presented as facts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9b7728]">The school today</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-school-dark md:text-5xl">Sammena Pre & Primary School</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              The current Sammena school is focused on pre-primary and primary education. Its public positioning combines academic learning with character, wellbeing, sport and co-curricular growth.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              The school was established in 2018, subject to the official source record used for institutional publication. The public website keeps historical and operational claims separate from verified current information.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/academics" className="inline-flex items-center gap-2 bg-school-dark px-5 py-3 text-sm font-bold text-white">
                Explore academics <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/admissions" className="inline-flex items-center gap-2 border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-school-dark">
                Admissions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden border border-slate-200 bg-slate-100">
            <Image
              src="/images/about-school.jpg"
              alt="Sammena school"
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0a3158] py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e2c46c]">Current focus</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">What Sammena is building around</h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {currentFocus.map(item => (
                <li key={item} className="flex items-start gap-3 border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#e2c46c]" aria-hidden="true" />
                  <span className="text-sm leading-6 text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9b7728]">Our foundation</p>
            <h2 className="mt-3 text-3xl font-bold text-school-dark md:text-5xl">Mission, vision & values</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => (
              <article key={title} className="border border-slate-200 bg-white p-7 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#0a3158]/5 text-[#9b7728]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-school-dark">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="border border-slate-200 bg-white p-7 sm:p-9">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#0a3158]/5 text-[#9b7728]">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Education</p>
              <h2 className="mt-2 text-2xl font-bold text-school-dark">A school journey that stays child-centred.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The public academic pages explain the learning programmes and the school&apos;s educational approach without inventing class sizes, staff ratios or examination claims that have not been formally published.
              </p>
              <Link href="/academics" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">
                View academic programmes <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="border border-slate-200 bg-white p-7 sm:p-9">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#0a3158]/5 text-[#9b7728]">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Looking ahead</p>
              <h2 className="mt-2 text-2xl font-bold text-school-dark">Planned secondary expansion.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Sammena Schools has a planned Sammena Secondary School expansion with a target of 2028. It is presented as a plan, not as an already operating secondary campus.
              </p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">
                Contact the school <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-school-dark py-16 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-school-gold">Public information</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Evidence before promotion.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Official documents, notices, calendar records and published results belong in their respective evidence-backed sections. The About page explains the institution, not claims that belong in an unverified marketing catalogue.
          </p>
          <Link href="/resources" className="mt-7 inline-flex items-center gap-2 bg-school-gold px-6 py-3 text-sm font-bold text-school-dark">
            Visit Resource Centre <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
