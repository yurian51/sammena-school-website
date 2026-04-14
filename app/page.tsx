import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap, BookOpen, Users, Trophy, ArrowRight, Star,
  ChevronRight, Shield, Lightbulb, Heart
} from "lucide-react"

const stats = [
  { value: "1,200+", label: "Students Enrolled" },
  { value: "80+", label: "Qualified Teachers" },
  { value: "15+", label: "Departments" },
  { value: "95%", label: "Pass Rate" },
]

const features = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description: "Rigorous curriculum with a focus on critical thinking, science, mathematics, and the arts — preparing students for national and international exams.",
  },
  {
    icon: Users,
    title: "Holistic Development",
    description: "Beyond academics, we nurture character, leadership, and social skills through clubs, sports, and community service programs.",
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description: "Consistently ranked among the top-performing schools in Tanzania with outstanding NECTA and CSEE examination results.",
  },
  {
    icon: Shield,
    title: "Safe & Supportive",
    description: "A secure, inclusive environment with professional counseling, dedicated boarding facilities, and 24/7 security on campus.",
  },
]

const testimonials = [
  {
    name: "Mrs. Amina Hassan",
    role: "Parent",
    quote: "Sammena School transformed my daughter's confidence and academic performance. The teachers are dedicated and the environment is truly nurturing.",
    rating: 5,
  },
  {
    name: "James Mwangi",
    role: "Form 6 Graduate, 2023",
    quote: "I gained so much more than grades here. The guidance counselors and sports programs shaped who I am today. I am proud to be a Sammena alumnus.",
    rating: 5,
  },
  {
    name: "Dr. Peter Kimaro",
    role: "Parent",
    quote: "The ICT and science facilities are world-class. My son is passionate about technology and Sammena gave him every tool to succeed.",
    rating: 5,
  },
]

const values = [
  { icon: Lightbulb, label: "Innovation" },
  { icon: Shield, label: "Integrity" },
  { icon: Heart, label: "Compassion" },
  { icon: Trophy, label: "Excellence" },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Sammena School campus"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-school-dark/70" />
        {/* Orange accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-school-orange" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-school-orange/20 border border-school-orange/30 rounded-full px-4 py-1.5 mb-6">
            <GraduationCap className="w-4 h-4 text-school-orange" />
            <span className="text-school-orange text-sm font-medium">Tanzania&apos;s Premier School</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight">
            Shaping Tomorrow&apos;s<br />
            <span className="text-school-orange">Leaders</span> Today
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sammena School provides a world-class education rooted in excellence, discipline, and innovation — empowering every student to achieve their highest potential.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-school-orange text-white font-semibold rounded-xl hover:bg-school-orange-light transition-all shadow-xl shadow-school-orange/30 text-base"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all text-base"
            >
              Discover More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-white/20" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-school-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center py-2">
                <div className="text-3xl md:text-4xl font-bold text-school-orange mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">About Sammena</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-5 text-balance">
                A Legacy of Academic Excellence in Tanzania
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Sammena School stands as one of Tanzania&apos;s leading educational institutions, offering both primary and secondary education with an unwavering commitment to academic rigor, moral character, and holistic development.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our dedicated faculty, modern facilities, and comprehensive programs create an environment where every student can discover their potential and grow into confident, responsible citizens.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {values.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 bg-school-neutral rounded-lg">
                    <Icon className="w-4 h-4 text-school-orange" />
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-school-orange font-semibold hover:gap-3 transition-all"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/images/about-school.jpg"
                  alt="Students at Sammena School"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-school-dark rounded-2xl px-5 py-4 shadow-xl">
                <div className="text-3xl font-bold text-school-orange">15+</div>
                <div className="text-white/70 text-xs mt-0.5">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="py-20 bg-school-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Why Sammena</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Education Built for the Future
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-school-orange/10 flex items-center justify-center mb-4 group-hover:bg-school-orange transition-colors">
                  <Icon className="w-5 h-5 text-school-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              What Our Community Says
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-school-orange text-school-orange" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-muted-foreground text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-school-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            Ready to Join the Sammena Family?
          </h2>
          <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">
            Enroll your child in Tanzania&apos;s premier school and give them the foundation for a lifetime of success.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-school-orange text-white font-semibold rounded-xl hover:bg-school-orange-light transition-colors shadow-lg shadow-school-orange/20"
            >
              Start Application <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
