"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { BookOpen, Calculator, Globe, Languages, Microscope, Palette, Users, Clock, ArrowRight, GraduationCap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const preSchoolSubjects = [
  { icon: BookOpen, name: "English Language", desc: "Basic reading, phonics, writing, and oral communication." },
  { icon: Calculator, name: "Mathematics", desc: "Numbers, counting, shapes, and early arithmetic." },
  { icon: Languages, name: "Kiswahili", desc: "Introduction to the national language." },
  { icon: Palette, name: "Creative Arts", desc: "Drawing, coloring, crafts, and creative play." },
  { icon: Users, name: "Social Skills", desc: "Cooperation, sharing, and basic life skills." },
  { icon: Microscope, name: "Environmental Studies", desc: "Learning about nature, plants, and animals." },
]
const primarySubjects = [
  { icon: BookOpen, name: "English Language", desc: "Reading comprehension, grammar, writing, and oral skills." },
  { icon: Calculator, name: "Mathematics", desc: "Arithmetic, geometry, algebra fundamentals for strong numeracy." },
  { icon: Globe, name: "Social Studies", desc: "History, geography, civics, and Tanzanian culture." },
  { icon: Languages, name: "Kiswahili", desc: "National language proficiency — spoken and written." },
  { icon: Microscope, name: "Science & Technology", desc: "Basic science concepts, experiments, and environmental awareness." },
  { icon: Palette, name: "Creative Arts", desc: "Drawing, crafts, music, and creative self-expression." },
]
const approaches = [
  { title: "English-Medium Instruction", description: "Unlike most government schools that use Kiswahili, we teach in English from an early age, preparing pupils for secondary education where English is the language of instruction." },
  { title: "Character & Moral Guidance", description: "Beyond academics, we nurture discipline, respect, and moral values to help every child grow into a responsible citizen." },
  { title: "Individual Attention", description: "With dedicated teachers, we ensure every pupil receives the support they need, especially those from vulnerable backgrounds." },
  { title: "Holistic Development", description: "Sports, games, creative activities, and social skills are integrated into our curriculum to develop the whole child." },
]
const schoolStats = [{ value: "Pre-Primary", label: "Nursery & KG" }, { value: "Std 1–7", label: "Primary School" }, { value: "English", label: "Medium of Instruction" }, { value: "259", label: "Pupils Enrolled" }]
const dailySchedule = [
  { time: "07:00 – 07:30", activity: "Arrival & Assembly" }, { time: "07:30 – 10:00", activity: "Morning Lessons" }, { time: "10:00 – 10:30", activity: "Break & Snacks" }, { time: "10:30 – 12:30", activity: "Mid-Day Lessons" }, { time: "12:30 – 14:00", activity: "Lunch & Rest" }, { time: "14:00 – 15:30", activity: "Afternoon Lessons" }, { time: "15:30 – 16:00", activity: "Sports & Activities" },
]

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation()
  return <div ref={ref} data-motion="section" data-visible={isVisible ? "true" : "false"} className={cn(className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}
function SubjectGrid({ subjects }: { subjects: typeof preSchoolSubjects }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{subjects.map(({ icon: Icon, name, desc }, i) => <Reveal key={name} delay={i * 60}><div data-motion="card" className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-school-orange/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-school-orange"><Icon className="h-5 w-5 text-school-orange transition-colors duration-300 group-hover:text-white"/></div><div><h3 className="mb-1 text-sm font-semibold text-foreground">{name}</h3><p className="text-xs leading-relaxed text-muted-foreground">{desc}</p></div></div></Reveal>)}</div>
}

export default function AcademicsPage() {
  return <main className="min-h-screen overflow-x-hidden"><Navbar />
    <section className="relative isolate overflow-hidden bg-school-dark pb-20 pt-36 text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,181,91,.16),transparent_48%)]"/><div className="relative mx-auto max-w-7xl px-5 text-center sm:px-6 lg:px-8"><Reveal><span className="text-school-orange font-semibold text-sm uppercase tracking-[0.2em]">Our Curriculum</span><h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Academic Programs</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">Quality English-medium education from Pre-Primary through Standard 7, building strong foundations for secondary school and beyond.</p></Reveal></div></section>
    <section className="bg-school-orange py-10"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><div className="grid grid-cols-2 gap-y-7 md:grid-cols-4 md:divide-x md:divide-white/20">{schoolStats.map((stat, i) => <Reveal key={stat.label} delay={i * 70} className="text-center"><div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div><div className="mt-1 text-sm text-white/80">{stat.label}</div></Reveal>)}</div></div></section>
    <section className="bg-background py-20 lg:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><Reveal><div className="flex items-center gap-3"><div className="h-0.5 w-8 bg-school-orange"/><span className="text-school-orange font-semibold text-sm uppercase tracking-[0.2em]">Nursery & Kindergarten</span></div><h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">Pre-Primary School</h2><p className="mt-4 mb-10 max-w-2xl leading-7 text-muted-foreground">Our pre-primary program introduces young children to the joy of learning through play-based activities, early literacy, and social development in a nurturing English-medium environment.</p></Reveal><SubjectGrid subjects={preSchoolSubjects}/></div></section>
    <section className="bg-school-neutral py-20 lg:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><Reveal><div className="flex items-center gap-3"><div className="h-0.5 w-8 bg-school-orange"/><span className="text-school-orange font-semibold text-sm uppercase tracking-[0.2em]">Standards 1–7</span></div><h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">Primary School</h2><p className="mt-4 mb-10 max-w-2xl leading-7 text-muted-foreground">Our primary curriculum follows the national syllabus while delivering instruction in English, giving pupils a significant advantage when they transition to secondary education.</p></Reveal><SubjectGrid subjects={primarySubjects}/></div></section>
    <section className="bg-background py-20 lg:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><Reveal className="mb-12 text-center"><span className="text-school-orange font-semibold text-sm uppercase tracking-[0.2em]">Our Approach</span><h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">How We Teach</h2></Reveal><div className="grid gap-6 md:grid-cols-2">{approaches.map((a, idx) => <Reveal key={a.title} delay={idx * 90}><div data-motion="card" className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-6"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-school-orange/20 bg-school-orange/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-school-orange"><span className="text-sm font-bold text-school-orange group-hover:text-white">{idx + 1}</span></div><div><h3 className="font-semibold text-foreground">{a.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{a.description}</p></div></div></Reveal>)}</div></div></section>
    <section className="bg-school-dark py-20 text-white lg:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><Reveal><div className="flex items-center gap-3"><Clock className="h-5 w-5 text-school-orange"/><span className="text-school-orange font-semibold text-sm uppercase tracking-[0.2em]">Daily Routine</span></div><h2 className="mt-3 text-3xl font-bold md:text-4xl">A Typical School Day</h2></Reveal><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{dailySchedule.map((item, i) => <Reveal key={item.time} delay={i * 55}><div data-motion="card" className="group rounded-xl border border-white/10 bg-white/5 p-4"><div className="text-sm font-semibold text-school-orange">{item.time}</div><div className="mt-1 text-white/80">{item.activity}</div></div></Reveal>)}</div><p className="mt-6 text-xs text-white/40">* Schedule may vary slightly. Boarding pupils have additional evening study time.</p></div></section>
    <section className="bg-school-orange py-16"><Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-6"><div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5"><GraduationCap className="h-4 w-4 text-white"/><span className="text-sm font-medium text-white">Coming Soon</span></div><h2 className="mt-4 text-2xl font-bold text-white md:text-4xl">Sammena Secondary School</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">One of our major future plans is to establish Sammena Secondary School. This will allow pupils — especially orphans and children from difficult backgrounds — to continue their education in a familiar, caring environment.</p><Link href="/contact" className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-school-orange shadow-lg transition-all duration-300 hover:-translate-y-0.5">Support This Vision <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></Link></Reveal></section>
    <Footer />
  </main>
}
