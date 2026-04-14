import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  ClipboardList, FileText, CheckCircle, UserCheck, GraduationCap,
  Phone, ArrowRight, AlertCircle, Heart, Home
} from "lucide-react"

const steps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Visit the School",
    description: "Come to our campus to learn about the school, meet the director, and obtain an application form.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Submit Documents",
    description: "Complete the application form and attach all required supporting documents.",
  },
  {
    step: "03",
    icon: CheckCircle,
    title: "Assessment",
    description: "Pupils may be assessed to determine their appropriate class level and any learning support needs.",
  },
  {
    step: "04",
    icon: UserCheck,
    title: "Interview",
    description: "Parents/guardians meet with the school administration to discuss the child's background and needs.",
  },
  {
    step: "05",
    icon: GraduationCap,
    title: "Enrollment",
    description: "Upon acceptance, complete registration and enrollment. Vulnerable children may receive fee support.",
  },
]

const prePrimaryRequirements = [
  "Completed application form",
  "Birth certificate (original + copy)",
  "Two recent passport photographs",
  "Immunization records",
  "Parent/guardian national ID copy",
]

const primaryRequirements = [
  "Completed application form",
  "Birth certificate (original + copy)",
  "Two recent passport photographs",
  "Previous school report cards (if applicable)",
  "Transfer letter from previous school (if applicable)",
  "Parent/guardian national ID copy",
]

const specialSupport = [
  {
    icon: Heart,
    title: "Orphans & Vulnerable Children",
    description: "Special support including reduced or waived school fees, school uniforms, learning materials, and basic needs for orphans and children from very poor families.",
  },
  {
    icon: Home,
    title: "Boarding Facilities",
    description: "Separate dormitories for boys and girls are available for pupils who need boarding. This includes meals, supervision, and pastoral care.",
  },
]

const faqs = [
  {
    q: "When does the academic year begin?",
    a: "The school year follows the Tanzanian academic calendar, typically starting in January. Contact us for specific intake dates.",
  },
  {
    q: "What ages do you accept?",
    a: "We accept children from pre-primary age (around 4-5 years) through Standard 7 (around 13-14 years).",
  },
  {
    q: "Is boarding available?",
    a: "Yes, we have separate dormitories for boys and girls. Boarding is available for both primary pupils and special circumstances.",
  },
  {
    q: "Do you provide support for orphans?",
    a: "Yes. Orphans and children from vulnerable families can receive reduced or waived fees, uniforms, learning materials, and basic needs support.",
  },
  {
    q: "What is the medium of instruction?",
    a: "Sammena is an English-medium school. We teach in English to prepare pupils for secondary education where English is used.",
  },
]

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-school-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Join Us</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-balance">Admissions</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            We welcome children of all backgrounds who are eager to learn. Special consideration is given to orphans and children from vulnerable families.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-school-orange text-white font-semibold rounded-xl hover:bg-school-orange-light transition-colors shadow-lg shadow-school-orange/20"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+255750227073"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> Call Admissions
            </a>
          </div>
        </div>
      </section>

      {/* Special Support Banner */}
      <section className="py-10 bg-school-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {specialSupport.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 bg-white/10 rounded-2xl p-5 border border-white/20">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
                  <p className="text-white/80 text-xs leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section id="apply" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">How to Apply</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              5-Step Admissions Process
            </h2>
          </div>
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-0.5 bg-border z-0" />
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
              {steps.map(({ step, icon: Icon, title, description }) => (
                <div key={step} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-school-dark border-4 border-school-orange flex items-center justify-center mb-4 shadow-lg shadow-school-orange/20">
                    <Icon className="w-6 h-6 text-school-orange" />
                  </div>
                  <div className="text-school-orange font-bold text-xs mb-1 tracking-widest">STEP {step}</div>
                  <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-school-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Documents Needed</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Admission Requirements</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pre-Primary */}
            <div className="bg-card rounded-2xl p-7 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-school-orange/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-school-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Pre-Primary School</h3>
                  <p className="text-muted-foreground text-xs">Nursery & Kindergarten</p>
                </div>
              </div>
              <ul className="space-y-3">
                {prePrimaryRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-school-orange shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Primary */}
            <div className="bg-card rounded-2xl p-7 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-school-orange/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-school-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Primary School</h3>
                  <p className="text-muted-foreground text-xs">Standards 1 – 7</p>
                </div>
              </div>
              <ul className="space-y-3">
                {primaryRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-school-orange shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2.5 bg-school-orange/10 border border-school-orange/20 rounded-xl px-5 py-4">
            <AlertCircle className="w-4 h-4 text-school-orange shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/70">
              For orphans or children from vulnerable families without complete documentation, please contact us directly. We will work with you to find a solution.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-school-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Common Questions</span>
            <h2 className="text-3xl font-bold text-white mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-school-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-balance">
            Ready to Enroll Your Child?
          </h2>
          <p className="text-white/85 mb-7">
            Visit our campus or call us to begin the admissions process. We welcome all children.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+255750227073"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-school-orange font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4" /> +255 750 227 073
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
