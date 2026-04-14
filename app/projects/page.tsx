import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  Bath, Zap, GraduationCap, Egg, Road, ArrowRight, Heart, Target
} from "lucide-react"

const projects = [
  {
    icon: Bath,
    title: "Hostel Toilets Construction",
    description: "Modern and safe toilet facilities for the hostels, separate for boys and girls, to improve hygiene, health, dignity, and safety for boarding pupils.",
    scope: "Toilet blocks, water connection, hand washing facilities",
    cost: "TZS 25,000,000",
    priority: 1,
  },
  {
    icon: Zap,
    title: "Electricity Installation",
    description: "Reliable electricity to support lighting, administration, ICT use, security, and extended study hours for pupils.",
    scope: "Power connection, wiring, lighting, and basic electrical fittings",
    cost: "TZS 20,000,000",
    priority: 2,
  },
  {
    icon: GraduationCap,
    title: "Secondary School Buildings",
    description: "Establish Sammena Secondary School to ensure educational continuity for vulnerable children after primary education.",
    scope: "Classrooms, teachers' offices, laboratories (phased approach)",
    cost: "TZS 350,000,000",
    priority: 3,
  },
  {
    icon: Egg,
    title: "School Poultry Farming",
    description: "A sustainable income-generating project to support school operations and assist orphans with food and basic needs.",
    scope: "Poultry house, chicks, feed, equipment, training",
    cost: "TZS 7,000,000",
    priority: 4,
  },
  {
    icon: Road,
    title: "Infrastructure & Access Road",
    description: "Improve safety, accessibility, and learning conditions by upgrading internal infrastructure and the road leading to the school.",
    scope: "School pathways, drainage, fencing improvements, and access road grading",
    cost: "TZS 95,000,000",
    priority: 5,
  },
]

const projectGoals = [
  "Improve safety, health, and learning environment",
  "Ensure long-term life opportunities for orphans",
  "Build financial sustainability for the school",
  "Enable expansion of education to secondary level",
]

export default function ProjectsPage() {
  const totalCost = "TZS 497,000,000"

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-school-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Vision</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-balance">Development Projects</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            To strengthen sustainability, safety, and long-term impact for orphans and vulnerable children, we have identified five priority development projects.
          </p>
        </div>
      </section>

      {/* Total Cost Banner */}
      <section className="py-8 bg-school-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white/80 text-sm mb-1">Total Estimated Cost</div>
          <div className="text-3xl md:text-4xl font-bold text-white">{totalCost}</div>
          <div className="text-white/70 text-sm mt-1">(Approximately USD $190,000)</div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {projects.map(({ icon: Icon, title, description, scope, cost, priority }) => (
              <div
                key={title}
                className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Priority Badge & Icon */}
                  <div className="lg:w-48 bg-school-neutral p-6 flex lg:flex-col items-center lg:justify-center gap-4 lg:gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-school-orange/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-school-orange" />
                    </div>
                    <div className="lg:text-center">
                      <div className="text-school-orange font-bold text-xs uppercase tracking-wider">Priority</div>
                      <div className="text-3xl font-bold text-foreground">{priority}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{description}</p>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Estimated Cost</div>
                        <div className="text-xl font-bold text-school-orange">{cost}</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Project Scope</div>
                      <p className="text-foreground text-sm">{scope}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-20 bg-school-neutral">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Target className="w-10 h-10 text-school-orange mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-3">Project Goals</h2>
            <p className="text-muted-foreground">These projects aim to create lasting impact for our pupils and community.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {projectGoals.map((goal) => (
              <div key={goal} className="flex items-center gap-3 bg-card rounded-xl p-5 border border-border">
                <div className="w-8 h-8 rounded-lg bg-school-orange/10 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-school-orange" />
                </div>
                <span className="text-foreground font-medium text-sm">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-school-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 text-balance">
            Partner With Us
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            With your support, Sammena Pre & Primary School will continue to grow, improve its facilities, and support more vulnerable children toward a brighter future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-school-orange text-white font-semibold rounded-xl hover:bg-school-orange-light transition-colors shadow-lg shadow-school-orange/20"
            >
              Contact Us to Support <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Learn About Our Story
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
