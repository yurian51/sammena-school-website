import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import {
  BookOpen, Users, Settings, DollarSign, Scale, ClipboardList,
  Heart, Trophy, Leaf, Shield, UtensilsCrossed, Bed, Monitor,
  Activity, Package, Eye, Target, Gem
} from "lucide-react"

const departments = [
  {
    icon: BookOpen,
    name: "Academic Department",
    description: "Oversees curriculum delivery, teacher performance, and continuous improvement of academic standards across all levels.",
  },
  {
    icon: Settings,
    name: "Administration Department",
    description: "Manages school operations, staff coordination, records, and ensures smooth day-to-day institutional functioning.",
  },
  {
    icon: DollarSign,
    name: "Finance Department",
    description: "Handles fee collection, budgeting, procurement payments, and financial reporting to ensure fiscal accountability.",
  },
  {
    icon: Scale,
    name: "Discipline Department",
    description: "Maintains a structured, respectful school environment by upholding the code of conduct and guiding student behavior.",
  },
  {
    icon: ClipboardList,
    name: "Examination Department",
    description: "Coordinates internal and national examinations, manages assessment schedules, and ensures result integrity.",
  },
  {
    icon: Heart,
    name: "Guidance & Counseling",
    description: "Provides mental health support, career guidance, and personal development services to help every student thrive.",
  },
  {
    icon: Trophy,
    name: "Sports & Games",
    description: "Organizes inter-school and intra-school competitions, physical fitness programs, and talent identification in athletics.",
  },
  {
    icon: Users,
    name: "Clubs & Societies",
    description: "Facilitates student clubs — from debate and science to arts — fostering creativity, teamwork, and leadership skills.",
  },
  {
    icon: Leaf,
    name: "Maintenance & Environment",
    description: "Ensures the school grounds, buildings, and facilities are clean, safe, and well-maintained at all times.",
  },
  {
    icon: Shield,
    name: "Security Department",
    description: "Provides 24/7 campus security, access control, and emergency response to ensure student and staff safety.",
  },
  {
    icon: UtensilsCrossed,
    name: "Catering Department",
    description: "Prepares nutritious, balanced meals for students and staff, maintaining hygiene and dietary standards throughout.",
  },
  {
    icon: Bed,
    name: "Hostel / Boarding",
    description: "Offers comfortable, supervised boarding facilities with structured evening study programs and pastoral care.",
  },
  {
    icon: Monitor,
    name: "ICT Department",
    description: "Supports digital learning through computer labs, internet access, e-learning tools, and technical infrastructure.",
  },
  {
    icon: Activity,
    name: "Health / First Aid",
    description: "Provides immediate medical care, health education, and coordinates with local health facilities for student wellness.",
  },
  {
    icon: Package,
    name: "Procurement & Stores",
    description: "Manages acquisition, storage, and distribution of school supplies, textbooks, and equipment across all departments.",
  },
]

const coreValues = [
  { icon: Eye, title: "Vision", description: "To be a leading center of academic excellence, producing well-rounded graduates who drive positive change in Tanzania and beyond." },
  { icon: Target, title: "Mission", description: "To provide quality education through a nurturing environment that develops intellectual, moral, and social capacity in every learner." },
  { icon: Gem, title: "Excellence", description: "We hold ourselves to the highest standards in teaching, learning, and character, inspiring every student to surpass their own limits." },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-school-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-balance">About Sammena School</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            A proud institution rooted in academic excellence, integrity, and a commitment to transforming lives across Tanzania.
          </p>
        </div>
      </section>

      {/* School Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-5 text-balance">
                More Than a School — A Community of Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sammena School is a premier academic institution located in Tanzania, dedicated to providing high-quality primary and secondary education. Founded on the principles of discipline, dedication, and discovery, our school has grown into a respected center of learning with a proud legacy of top-performing students.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our comprehensive approach to education integrates strong academics with robust co-curricular activities, ensuring that every student graduates not just with qualifications, but with the confidence, skills, and values needed to succeed in life.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With over 1,200 enrolled students, 80+ qualified teachers, and 15 specialized departments, Sammena School is equipped to support learners at every stage of their educational journey.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/about-school.jpg"
                alt="Students at Sammena School"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-school-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Foundation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Mission, Vision & Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {coreValues.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-school-orange/10 flex items-center justify-center mb-5 group-hover:bg-school-orange transition-colors">
                  <Icon className="w-6 h-6 text-school-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Departments</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              15 Specialized Departments
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Every department at Sammena School plays a vital role in creating a complete, world-class educational experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map(({ icon: Icon, name, description }) => (
              <div
                key={name}
                className="group flex gap-4 bg-card rounded-2xl p-5 border border-border hover:border-school-orange/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-school-orange/10 flex items-center justify-center shrink-0 group-hover:bg-school-orange transition-colors">
                  <Icon className="w-5 h-5 text-school-orange group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{name}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
