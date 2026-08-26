"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, Heart, ShieldCheck, Sparkles, Trophy, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const reasons = [
  { icon: BookOpen, title: "A Strong Learning Foundation", text: "A learning environment designed to build confidence, knowledge, discipline and curiosity from the early years through primary education." },
  { icon: Heart, title: "Care Beyond the Classroom", text: "We believe education includes character, wellbeing, belonging and the support children need to grow with confidence." },
  { icon: Trophy, title: "Whole-Child Development", text: "Academic learning is strengthened through sport, creativity, leadership, teamwork and meaningful school experiences." },
  { icon: ShieldCheck, title: "A Safe School Community", text: "Our school experience is designed around respect, responsibility, care and a positive environment for learners." },
]

const journey = [
  { title: "Early Years", text: "Building confidence, communication and positive learning habits." },
  { title: "Pre-Primary", text: "Developing foundational literacy, numeracy, social and practical skills." },
  { title: "Primary", text: "Strengthening academic knowledge, character, independence and responsibility." },
  { title: "The Next Chapter", text: "A planned pathway toward secondary education under the SAMMENA SCHOOLS vision." },
]

const highlights = ["Child-centred learning", "Academic and character development", "Family and community connection", "Sport and co-curricular growth"]

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation()
  return <div ref={ref} className={cn(isVisible ? "animate-in" : "animate-out", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      <section className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-[#071d3b] pt-24 text-white lg:min-h-screen">
        <Image src="/images/hero-bg.jpg" alt="Sammena school campus" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[#071d3b]/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071d3b]/95 via-[#071d3b]/72 to-[#071d3b]/35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071d3b] to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b55b]/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ead28d] backdrop-blur-md"><Sparkles className="h-4 w-4" /> SAMMENA SCHOOLS</div>
            <h1 className="mt-7 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">Building Bright Minds.<span className="block text-[#d8b55b]">Shaping Better Futures.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">Welcome to Sammena Schools, an education community focused on helping children learn, grow, discover their strengths and prepare for the future.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/admissions" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#c9a24b] px-6 py-3.5 font-bold text-[#071d3b] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#dfc477]">Start an Admission <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><Link href="/about" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15">Discover Sammena <ChevronRight className="h-4 w-4" /></Link></div>
          </div>
          <div className="mt-16 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">{highlights.map((item) => <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur-md"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#d8b55b]" />{item}</div>)}</div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#d8b55b]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20 lg:px-8">
          <Reveal><span className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a7628]">Welcome to Sammena</span><h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#071d3b] sm:text-4xl lg:text-5xl">Education with purpose, character and a future in mind.</h2><p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">Sammena Schools brings together the values, people and learning experiences that make a school community meaningful. Our approach is centred on strong foundations, responsible citizenship and helping every learner discover what they can become.</p><div className="mt-8 flex flex-wrap gap-3">{[[Users, "Community"], [Heart, "Care"], [BookOpen, "Learning"], [Trophy, "Growth"]].map(([Icon, label]) => { const IconComponent = Icon as typeof Users; return <div key={label as string} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#071d3b] shadow-sm"><IconComponent className="h-4 w-4 text-[#b28b32]" />{label as string}</div> })}</div><Link href="/about" className="group mt-9 inline-flex items-center gap-2 font-bold text-[#8a6a24]">Learn about Sammena <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
          <Reveal delay={150} className="relative"><div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl"><Image src="/images/about-school.jpg" alt="Students at Sammena School" fill className="object-cover transition duration-700 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#071d3b]/55 to-transparent" /><div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-[#071d3b]/75 p-5 text-white backdrop-blur-md"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d8b55b]">Our commitment</p><p className="mt-2 text-sm leading-6 text-white/80">Create an environment where learning, character and opportunity grow together.</p></div></div></Reveal>
        </div>
      </section>

      <section className="bg-[#f6f2e8] py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><Reveal className="mx-auto max-w-2xl text-center"><span className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a7628]">Our Schools</span><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#071d3b] sm:text-4xl">One vision. A growing education pathway.</h2><p className="mt-4 leading-7 text-slate-600">Explore the current school community and the planned next chapter of the SAMMENA SCHOOLS journey.</p></Reveal><div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal><Link href="/" className="group block h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[16/8] overflow-hidden"><Image src="/images/hero-bg.jpg" alt="Sammena Pre & Primary School" fill className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#071d3b]/80 to-transparent" /><div className="absolute bottom-5 left-6"><span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">Current school</span></div></div><div className="p-7"><h3 className="text-2xl font-bold text-[#071d3b]">Sammena Pre & Primary School</h3><p className="mt-3 leading-7 text-slate-600">Discover our learning environment, academic approach, school life and admissions information.</p><span className="mt-6 inline-flex items-center gap-2 font-bold text-[#8a6a24]">Explore the school <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link></Reveal>
        <Reveal delay={120}><Link href="/secondary" className="group block h-full overflow-hidden rounded-3xl border border-[#d8b55b]/30 bg-[#071d3b] text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative overflow-hidden p-8 sm:p-10 lg:min-h-[390px]"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#d8b55b]/15 blur-3xl" /><div className="relative"><span className="inline-flex rounded-full border border-[#d8b55b]/35 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ead28d]">Planned expansion · 2028</span><h3 className="mt-7 text-3xl font-bold">Sammena Secondary School</h3><p className="mt-4 max-w-lg leading-7 text-white/70">The planned next chapter of the Sammena education pathway, presented clearly as future institutional planning.</p><div className="mt-8 flex items-center gap-2 font-bold text-[#d8b55b]">View the 2028 plan <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div></div></div></Link></Reveal>
      </div></div></section>

      <section className="py-20 sm:py-24 lg:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><Reveal><span className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a7628]">Why Sammena</span><h2 className="mt-4 text-3xl font-bold tracking-tight text-[#071d3b] sm:text-4xl">More than a place to learn.</h2><p className="mt-5 leading-7 text-slate-600">The strongest school experience connects academic progress with confidence, character, relationships and real opportunities to grow.</p></Reveal><Reveal delay={100} className="grid gap-4 sm:grid-cols-2">{reasons.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071d3b] text-[#d8b55b]"><Icon className="h-5 w-5" /></div><h3 className="mt-5 font-bold text-[#071d3b]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>)}</Reveal></div></div></section>

      <section className="bg-[#071d3b] py-20 text-white sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><Reveal className="max-w-2xl"><span className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b55b]">The learning journey</span><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">A pathway built for growth.</h2><p className="mt-5 leading-7 text-white/65">From early foundations to future secondary education, the SAMMENA SCHOOLS vision is designed around continuity and purposeful development.</p></Reveal><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{journey.map((item, index) => <Reveal key={item.title} delay={index * 80}><article className="relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"><div className="text-sm font-bold text-[#d8b55b]">0{index + 1}</div><h3 className="mt-5 text-lg font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{item.text}</p></article></Reveal>)}</div></div></section>

      <section className="relative overflow-hidden py-20 sm:py-24"><div className="absolute inset-0 bg-[#f6f2e8]" /><div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#d8b55b]/15 blur-3xl" /><Reveal className="relative mx-auto max-w-5xl px-5 text-center sm:px-6"><span className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a7628]">Admissions</span><h2 className="mt-4 text-3xl font-bold tracking-tight text-[#071d3b] sm:text-4xl">Give your child a strong place to begin.</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">Learn about the admission process, requirements and the information families need before applying.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/admissions" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071d3b] px-6 py-3.5 font-bold text-white transition hover:bg-[#123f73]">Explore Admissions <ArrowRight className="h-4 w-4" /></Link><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-[#071d3b] transition hover:border-[#c9a24b]">Contact Sammena <ChevronRight className="h-4 w-4" /></Link></div></Reveal></section>

      <Footer />
    </main>
  )
}
