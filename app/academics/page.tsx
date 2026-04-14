import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookOpen, FlaskConical, Calculator, Globe, Microscope, Palette, Music, Languages, Users, Clock } from "lucide-react"

const primarySubjects = [
  { icon: BookOpen, name: "English Language", desc: "Reading, writing, grammar, and oral communication skills." },
  { icon: Calculator, name: "Mathematics", desc: "Arithmetic, geometry, algebra fundamentals for strong numeracy." },
  { icon: Globe, name: "Social Studies", desc: "History, geography, civics, and Tanzanian culture." },
  { icon: Languages, name: "Kiswahili", desc: "National language proficiency — spoken and written." },
  { icon: Microscope, name: "Science & Technology", desc: "Basic science concepts, experiments, and environmental awareness." },
  { icon: Palette, name: "Creative Arts", desc: "Drawing, crafts, music, and creative self-expression." },
]

const secondarySubjects = [
  { icon: Calculator, name: "Mathematics", desc: "Advanced algebra, calculus, statistics, and problem-solving." },
  { icon: Microscope, name: "Biology", desc: "Cell biology, genetics, ecology, and human anatomy." },
  { icon: FlaskConical, name: "Chemistry", desc: "Organic, inorganic chemistry, reactions, and lab work." },
  { icon: Globe, name: "Physics", desc: "Mechanics, electricity, waves, and modern physics concepts." },
  { icon: BookOpen, name: "English Language", desc: "Literature, composition, advanced grammar, and communication." },
  { icon: Languages, name: "Kiswahili", desc: "Advanced Swahili language, literature, and composition." },
  { icon: Globe, name: "Geography", desc: "Physical and human geography, map reading, and environment." },
  { icon: BookOpen, name: "History", desc: "African, Tanzanian, and world history with critical analysis." },
  { icon: Users, name: "Civics", desc: "Government, democracy, human rights, and citizenship." },
  { icon: Music, name: "Commerce", desc: "Business, trade, entrepreneurship, and financial literacy." },
]

const approaches = [
  {
    title: "Inquiry-Based Learning",
    description: "We encourage students to ask questions, conduct experiments, and discover knowledge through guided exploration rather than rote memorization.",
  },
  {
    title: "Collaborative Classrooms",
    description: "Group projects, peer teaching, and discussion-based lessons develop communication and teamwork skills alongside academic content.",
  },
  {
    title: "Digital Integration",
    description: "ICT tools, e-learning resources, and computer labs enhance learning with technology that prepares students for the digital world.",
  },
  {
    title: "Regular Assessment",
    description: "Continuous assessment, mock exams, and detailed progress reports ensure students and parents stay informed every step of the way.",
  },
]

const performanceStats = [
  { value: "95%", label: "NECTA Pass Rate 2023" },
  { value: "72%", label: "Division I & II Results" },
  { value: "98%", label: "PSLE Pass Rate 2023" },
  { value: "15+", label: "Subject Options Available" },
]

const timetablePreview = [
  { period: "Period 1", time: "07:30 – 08:20", monday: "Mathematics", tuesday: "English", wednesday: "Biology", thursday: "Chemistry", friday: "Physics" },
  { period: "Period 2", time: "08:20 – 09:10", monday: "English", tuesday: "History", wednesday: "Mathematics", thursday: "Geography", friday: "Kiswahili" },
  { period: "Period 3", time: "09:10 – 10:00", monday: "Biology", tuesday: "Chemistry", wednesday: "Civics", thursday: "Mathematics", friday: "English" },
  { period: "Break", time: "10:00 – 10:20", monday: "—", tuesday: "—", wednesday: "—", thursday: "—", friday: "—" },
  { period: "Period 4", time: "10:20 – 11:10", monday: "Geography", tuesday: "Physics", wednesday: "English", thursday: "Biology", friday: "Mathematics" },
  { period: "Period 5", time: "11:10 – 12:00", monday: "Chemistry", tuesday: "Mathematics", wednesday: "Physics", thursday: "Civics", friday: "History" },
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
            A rigorous, nationally aligned curriculum spanning primary through advanced secondary levels, designed to unlock every student&apos;s intellectual potential.
          </p>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="bg-school-orange py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/20">
            {performanceStats.map((stat) => (
              <div key={stat.label} className="text-center py-2">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Level */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-school-orange" />
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Standards 1–7</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">Primary School</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Our primary curriculum builds a strong foundation across core subjects, blending national standards with innovative teaching to spark curiosity and love for learning from the earliest years.
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

      {/* Secondary Level */}
      <section className="py-20 bg-school-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-school-orange" />
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Form 1–6</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">Secondary School</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            From Form 1 through Form 6, our secondary program prepares students for CSEE, ACSEE, and beyond, with a strong emphasis on science, languages, and critical reasoning.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {secondarySubjects.map(({ icon: Icon, name, desc }) => (
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
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Pedagogy</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">Our Teaching Approach</h2>
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

      {/* Timetable Preview */}
      <section className="py-20 bg-school-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-school-orange" />
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Sample Schedule</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-8">Weekly Timetable Preview</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Period</th>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Time</th>
                  <th className="px-4 py-3 text-center text-white/70 font-medium">Monday</th>
                  <th className="px-4 py-3 text-center text-white/70 font-medium">Tuesday</th>
                  <th className="px-4 py-3 text-center text-white/70 font-medium">Wednesday</th>
                  <th className="px-4 py-3 text-center text-white/70 font-medium">Thursday</th>
                  <th className="px-4 py-3 text-center text-white/70 font-medium">Friday</th>
                </tr>
              </thead>
              <tbody>
                {timetablePreview.map((row, i) => (
                  <tr
                    key={row.period}
                    className={`border-t border-white/10 ${row.period === "Break" ? "bg-school-orange/10" : i % 2 === 0 ? "bg-white/5" : ""}`}
                  >
                    <td className="px-4 py-3 font-medium text-white/90">{row.period}</td>
                    <td className="px-4 py-3 text-white/60 text-xs whitespace-nowrap">{row.time}</td>
                    <td className="px-4 py-3 text-center text-white/80">{row.monday}</td>
                    <td className="px-4 py-3 text-center text-white/80">{row.tuesday}</td>
                    <td className="px-4 py-3 text-center text-white/80">{row.wednesday}</td>
                    <td className="px-4 py-3 text-center text-white/80">{row.thursday}</td>
                    <td className="px-4 py-3 text-center text-white/80">{row.friday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/40 text-xs mt-4">* Sample timetable for secondary level. Actual schedules vary by class and term.</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
