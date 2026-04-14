import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { BookOpen, Calculator, Globe, Languages, Microscope, Palette, Users, Clock, ArrowRight, GraduationCap } from "lucide-react"

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
  {
    title: "English-Medium Instruction",
    description: "Unlike most government schools that use Kiswahili, we teach in English from an early age, preparing pupils for secondary education where English is the language of instruction.",
  },
  {
    title: "Character & Moral Guidance",
    description: "Beyond academics, we nurture discipline, respect, and moral values to help every child grow into a responsible citizen.",
  },
  {
    title: "Individual Attention",
    description: "With dedicated teachers, we ensure every pupil receives the support they need, especially those from vulnerable backgrounds.",
  },
  {
    title: "Holistic Development",
    description: "Sports, games, creative activities, and social skills are integrated into our curriculum to develop the whole child.",
  },
]

const schoolStats = [
  { value: "Pre-Primary", label: "Nursery & KG" },
  { value: "Std 1–7", label: "Primary School" },
  { value: "English", label: "Medium of Instruction" },
  { value: "259", label: "Pupils Enrolled" },
]

const dailySchedule = [
  { time: "07:00 – 07:30", activity: "Arrival & Assembly" },
  { time: "07:30 – 10:00", activity: "Morning Lessons" },
  { time: "10:00 – 10:30", activity: "Break & Snacks" },
  { time: "10:30 – 12:30", activity: "Mid-Day Lessons" },
  { time: "12:30 – 14:00", activity: "Lunch & Rest" },
  { time: "14:00 – 15:30", activity: "Afternoon Lessons" },
  { time: "15:30 – 16:00", activity: "Sports & Activities" },
]

export default function AcademicsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-school-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Curriculum</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-balance">Academic Programs</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Quality English-medium education from Pre-Primary through Standard 7, building strong foundations for secondary school and beyond.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-school-orange py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/20">
            {schoolStats.map((stat) => (
              <div key={stat.label} className="text-center py-2">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Primary Level */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-school-orange" />
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Nursery & Kindergarten</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">Pre-Primary School</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Our pre-primary program introduces young children to the joy of learning through play-based activities, early literacy, and social development in a nurturing English-medium environment.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {preSchoolSubjects.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="flex gap-4 bg-card rounded-2xl p-5 border border-border hover:border-school-orange/30 hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-xl bg-school-orange/10 flex items-center justify-center shrink-0 group-hover:bg-school-orange transition-colors">
                  <Icon className="w-5 h-5 text-school-orange group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{name}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Level */}
      <section className="py-20 bg-school-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-school-orange" />
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Standards 1–7</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">Primary School</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Our primary curriculum follows the national syllabus while delivering instruction in English, giving pupils a significant advantage when they transition to secondary education.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {primarySubjects.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="flex gap-4 bg-card rounded-2xl p-5 border border-border hover:border-school-orange/30 hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-xl bg-school-orange/10 flex items-center justify-center shrink-0 group-hover:bg-school-orange transition-colors">
                  <Icon className="w-5 h-5 text-school-orange group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{name}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">How We Teach</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {approaches.map((a, idx) => (
              <div key={a.title} className="flex gap-4 bg-card rounded-2xl p-6 border border-border">
                <div className="w-8 h-8 rounded-full bg-school-orange/10 border-2 border-school-orange/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-school-orange font-bold text-sm">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{a.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-20 bg-school-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-school-orange" />
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Daily Routine</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-8">A Typical School Day</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailySchedule.map((item) => (
              <div key={item.time} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-school-orange font-semibold text-sm mb-1">{item.time}</div>
                <div className="text-white/80">{item.activity}</div>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-xs mt-6">* Schedule may vary slightly. Boarding pupils have additional evening study time.</p>
        </div>
      </section>

      {/* Future Secondary School */}
      <section className="py-16 bg-school-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
            <GraduationCap className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Coming Soon</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-balance">
            Sammena Secondary School
          </h2>
          <p className="text-white/85 mb-6 max-w-2xl mx-auto">
            One of our major future plans is to establish Sammena Secondary School. This will allow pupils — especially orphans and children from difficult backgrounds — to continue their education in a familiar, caring environment, reducing dropout rates and opening doors to higher education.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-school-orange font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
          >
            Support This Vision <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
