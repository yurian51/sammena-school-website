import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  BookOpen, Settings, DollarSign, Scale, ClipboardList,
  Heart, Trophy, Users, Leaf, Shield, UtensilsCrossed, Bed,
  Monitor, Activity, Package
} from "lucide-react"

const departments = [
  {
    icon: BookOpen,
    name: "Academic Department",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10 group-hover:bg-blue-500",
    description:
      "The backbone of Sammena School, overseeing curriculum planning, teacher development, lesson delivery, and academic standards across all levels. Works closely with examination and guidance departments to maximize student performance.",
    responsibilities: ["Curriculum management", "Teacher appraisals", "Academic scheduling", "Student performance tracking"],
  },
  {
    icon: Settings,
    name: "Administration Department",
    color: "from-slate-500/20 to-slate-600/10 border-slate-500/20",
    iconColor: "text-slate-500",
    iconBg: "bg-slate-500/10 group-hover:bg-slate-500",
    description:
      "Manages school-wide operations including staff records, enrollment, communication, and facilities coordination. Ensures every department functions efficiently and all stakeholders are well-informed.",
    responsibilities: ["Staff records & HR", "Enrollment management", "Policy implementation", "Inter-department coordination"],
  },
  {
    icon: DollarSign,
    name: "Finance Department",
    color: "from-green-500/20 to-green-600/10 border-green-500/20",
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10 group-hover:bg-green-500",
    description:
      "Maintains financial health through transparent fee management, budget planning, and expenditure oversight. Ensures all school resources are used effectively and that financial records are accurate and auditable.",
    responsibilities: ["Fee collection", "Budget planning", "Financial reporting", "Salary processing"],
  },
  {
    icon: Scale,
    name: "Discipline Department",
    color: "from-red-500/20 to-red-600/10 border-red-500/20",
    iconColor: "text-red-500",
    iconBg: "bg-red-500/10 group-hover:bg-red-500",
    description:
      "Upholds the school's code of conduct through fair, consistent enforcement of rules and regulations. Works with students, teachers, and parents to promote a culture of respect, responsibility, and academic focus.",
    responsibilities: ["Code of conduct enforcement", "Conflict resolution", "Parent communication", "Student welfare oversight"],
  },
  {
    icon: ClipboardList,
    name: "Examination Department",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/20",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10 group-hover:bg-amber-500",
    description:
      "Coordinates all assessments from internal tests to national NECTA and CSEE examinations. Manages exam timetables, invigilation assignments, grading, and results compilation with full integrity.",
    responsibilities: ["Exam scheduling", "National exam coordination", "Results processing", "Academic records"],
  },
  {
    icon: Heart,
    name: "Guidance & Counseling",
    color: "from-pink-500/20 to-pink-600/10 border-pink-500/20",
    iconColor: "text-pink-500",
    iconBg: "bg-pink-500/10 group-hover:bg-pink-500",
    description:
      "A dedicated team of certified counselors providing mental health support, career counseling, and personal development guidance. Students facing academic, social, or personal challenges receive confidential, professional support.",
    responsibilities: ["Mental health support", "Career counseling", "Parent-student mediation", "Personal development programs"],
  },
  {
    icon: Trophy,
    name: "Sports & Games",
    color: "from-orange-500/20 to-orange-600/10 border-orange-500/20",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10 group-hover:bg-orange-500",
    description:
      "Promotes physical fitness, teamwork, and competitive excellence through a comprehensive sports program including football, athletics, netball, basketball, volleyball, and more at both local and national levels.",
    responsibilities: ["Inter-school competitions", "Physical fitness programs", "Sports facilities management", "Talent identification"],
  },
  {
    icon: Users,
    name: "Clubs & Societies",
    color: "from-violet-500/20 to-violet-600/10 border-violet-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10 group-hover:bg-violet-500",
    description:
      "Oversees student clubs including Science Club, Debate Society, Environmental Club, Drama, Red Cross, and more. These programs build leadership, teamwork, and practical skills beyond the classroom.",
    responsibilities: ["Club coordination", "Event planning", "Leadership development", "Community service"],
  },
  {
    icon: Leaf,
    name: "Maintenance & Environment",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500",
    description:
      "Ensures school buildings, classrooms, labs, and grounds are well-maintained and aesthetically pleasing. Champions environmental sustainability through tree planting, waste management, and eco-awareness initiatives.",
    responsibilities: ["Building maintenance", "Grounds upkeep", "Environmental programs", "Infrastructure repairs"],
  },
  {
    icon: Shield,
    name: "Security Department",
    color: "from-gray-500/20 to-gray-600/10 border-gray-500/20",
    iconColor: "text-gray-600",
    iconBg: "bg-gray-500/10 group-hover:bg-gray-500",
    description:
      "Provides round-the-clock security for all students, staff, and school property. Manages access control, visitor logging, CCTV monitoring, and emergency protocols to maintain a safe campus environment.",
    responsibilities: ["24/7 campus security", "Access control", "Emergency response", "Visitor management"],
  },
  {
    icon: UtensilsCrossed,
    name: "Catering Department",
    color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/20",
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-500/10 group-hover:bg-yellow-500",
    description:
      "Provides nutritious, hygienic, and balanced meals for students and staff. The catering team follows strict health standards and dietary guidelines, ensuring energy and wellbeing for productive learning days.",
    responsibilities: ["Meal preparation", "Nutritional planning", "Kitchen hygiene", "Dietary accommodations"],
  },
  {
    icon: Bed,
    name: "Hostel / Boarding",
    color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/20",
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10 group-hover:bg-indigo-500",
    description:
      "Offers safe, comfortable boarding facilities for students from outside the local area. Supervised study hours, structured daily routines, and pastoral care create a home-away-from-home atmosphere.",
    responsibilities: ["Boarding supervision", "Evening prep sessions", "Student pastoral care", "Facilities management"],
  },
  {
    icon: Monitor,
    name: "ICT Department",
    color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20",
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10 group-hover:bg-cyan-500",
    description:
      "Manages computer labs, internet infrastructure, e-learning platforms, and technical support for staff and students. Drives the school's digital transformation and prepares students for a technology-driven world.",
    responsibilities: ["Computer lab management", "Internet infrastructure", "E-learning support", "Technical maintenance"],
  },
  {
    icon: Activity,
    name: "Health / First Aid",
    color: "from-rose-500/20 to-rose-600/10 border-rose-500/20",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10 group-hover:bg-rose-500",
    description:
      "Staffed with trained health personnel to provide immediate first aid, routine medical care, and health education. Coordinates with local hospitals for advanced medical needs and promotes preventive health practices.",
    responsibilities: ["First aid provision", "Health screenings", "Medical referrals", "Health education programs"],
  },
  {
    icon: Package,
    name: "Procurement & Stores",
    color: "from-teal-500/20 to-teal-600/10 border-teal-500/20",
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/10 group-hover:bg-teal-500",
    description:
      "Manages the acquisition, storage, and distribution of all school supplies, stationery, textbooks, lab materials, and equipment. Ensures transparent, cost-effective purchasing that meets the needs of every department.",
    responsibilities: ["Supply procurement", "Inventory management", "Supplier relations", "Asset tracking"],
  },
]

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-school-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Structure</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-balance">School Departments</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Sammena School operates through 15 specialized departments, each dedicated to a specific aspect of student life, safety, and academic success.
          </p>
        </div>
      </section>

      {/* Count banner */}
      <div className="bg-school-orange py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-white text-sm font-medium">
          <span>15 Departments</span>
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <span>80+ Staff Members</span>
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <span>1,200+ Students Served</span>
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <span>Complete Campus Coverage</span>
        </div>
      </div>

      {/* Departments Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map(({ icon: Icon, name, description, responsibilities, iconBg }) => (
              <div
                key={name}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-school-orange/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${iconBg}`}>
                  <Icon className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
                <ul className="space-y-1.5">
                  {responsibilities.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-school-orange shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
