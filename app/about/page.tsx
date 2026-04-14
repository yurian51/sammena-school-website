import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import {
  BookOpen, Users, Building, Droplets, Home, UtensilsCrossed,
  Eye, Target, Heart, GraduationCap, UserCheck, TreePine, ArrowRight
} from "lucide-react"

const infrastructure = [
  { icon: Building, name: "8 Classroom Buildings", description: "Spacious, well-ventilated classrooms for quality learning." },
  { icon: Home, name: "2 Dormitories", description: "Separate boarding facilities for boys and girls." },
  { icon: UtensilsCrossed, name: "Kitchen & Dining Hall", description: "Nutritious meals prepared daily for all pupils." },
  { icon: Droplets, name: "Piped Water System", description: "Clean water with 3 storage tanks across campus." },
  { icon: Users, name: "Separate Toilet Facilities", description: "Dedicated toilets for boys, girls, and teachers." },
  { icon: TreePine, name: "Green Campus", description: "Flowers and trees creating a safe, child-friendly environment." },
]

const coreValues = [
  {
    icon: Eye,
    title: "Vision",
    description: "To be a leading center of quality education in Tanzania, producing well-rounded graduates who drive positive change and break the cycle of poverty.",
  },
  {
    icon: Target,
    title: "Mission",
    description: "To provide quality education, care, and moral guidance to children — with special focus on orphans and children from vulnerable and disadvantaged backgrounds.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Compassion for the vulnerable, excellence in education, integrity in all we do, and a commitment to transforming lives through learning.",
  },
]

const keyFacts = [
  { value: "2009", label: "Year Founded" },
  { value: "2018", label: "Government Registered" },
  { value: "259", label: "Pupils Enrolled" },
  { value: "34", label: "Orphans Supported" },
  { value: "10", label: "Teachers" },
  { value: "7", label: "Acres of Land" },
]

const boardResponsibilities = [
  "Guiding school policies and development plans",
  "Overseeing transparency and proper use of resources",
  "Supporting school leadership and management",
  "Safeguarding the welfare and safety of pupils",
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
            Founded with a vision to change lives through education, especially for orphans and vulnerable children in Tanzania.
          </p>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">The Founder</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-5 text-balance">
                A Vision Born from Compassion
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                My name is <strong className="text-foreground">Samwel Langdare Menavi</strong>, the Founder and Director of Sammena Pre & Primary School. The school was established in 2009 with the main purpose of providing quality education, care, and moral guidance to children.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The idea of starting this school came from witnessing many children in the community failing to access education due to poverty, orphan hood, and unstable family situations. I strongly believe that <strong className="text-foreground">education is the most powerful tool to change lives</strong> and secure a better future for children.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In 2018, Sammena Pre & Primary School was officially registered by the government, strengthening its management, academic standards, and long-term sustainability.
              </p>
              <div className="flex items-center gap-3 p-4 bg-school-orange/10 border border-school-orange/20 rounded-xl">
                <GraduationCap className="w-8 h-8 text-school-orange shrink-0" />
                <div>
                  <div className="font-semibold text-foreground text-sm">English-Medium Instruction</div>
                  <p className="text-muted-foreground text-xs">Unlike most government schools, we teach in English from an early age, preparing pupils for secondary education.</p>
                </div>
              </div>
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

      {/* Key Facts */}
      <section className="py-12 bg-school-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{fact.value}</div>
                <div className="text-white/80 text-sm">{fact.label}</div>
              </div>
            ))}
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

      {/* Infrastructure */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Facilities</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              School Infrastructure
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Operating on 7 acres of land secured through a formal lease agreement, our campus provides a safe, green, and child-friendly environment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {infrastructure.map(({ icon: Icon, name, description }) => (
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

      {/* Governance */}
      <section className="py-20 bg-school-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Governance</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-5 text-balance">
                School Board & Leadership
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The school is governed by a School Board, mainly composed of parents with children enrolled at the school. In the future, the school plans to invite trusted friends and partners to become part of the Board, bringing diverse ideas and international perspectives.
              </p>
              <h3 className="font-semibold text-foreground mb-3">Board Responsibilities:</h3>
              <ul className="space-y-3 mb-6">
                {boardResponsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <UserCheck className="w-4 h-4 text-school-orange shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-card border border-border rounded-xl">
                <h4 className="font-semibold text-foreground text-sm mb-2">Leadership Continuity</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  The school has a clear management structure in place. Senior teachers and the school management team continue daily operations under the guidance of the School Board, ensuring uninterrupted learning and accountability.
                </p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-bold text-foreground mb-5 text-lg">Pupils & Staff</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-school-orange/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-school-orange" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">259</div>
                    <div className="text-muted-foreground text-sm">Total Pupils</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-school-orange/10 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-school-orange" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">34</div>
                    <div className="text-muted-foreground text-sm">Orphans & Vulnerable Children</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-school-orange/10 flex items-center justify-center">
                    <BookOpen className="w-7 h-7 text-school-orange" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">10</div>
                    <div className="text-muted-foreground text-sm">Teachers</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-school-orange/10 flex items-center justify-center">
                    <UserCheck className="w-7 h-7 text-school-orange" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">3</div>
                    <div className="text-muted-foreground text-sm">Non-Teaching Staff</div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-5 leading-relaxed">
                Orphans and children from very poor families receive special support including reduced or waived fees, school uniforms, learning materials, and basic needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supporters */}
      <section className="py-16 bg-school-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Supporters</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-4">Growing Together</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Both before and after registration, the school has received valuable support from friends and well-wishers, including Tim&apos;s family, Tim&apos;s friends, Dominique&apos;s friends, and committed volunteers, whose support has played a key role in the growth of the school.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-school-orange text-white font-semibold rounded-xl hover:bg-school-orange-light transition-colors shadow-lg shadow-school-orange/20"
          >
            Become a Supporter <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
