import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  ClipboardList, FileText, CheckCircle, UserCheck, GraduationCap,
  Download, Phone, ArrowRight, AlertCircle
} from "lucide-react"

const steps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Obtain Application Form",
    description: "Visit the school office in person or download the application form from this website. Forms are also available through our admissions hotline.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Submit Documents",
    description: "Complete the form and attach all required supporting documents. Submit in person at the admissions office or send via email.",
  },
  {
    step: "03",
    icon: CheckCircle,
    title: "Entrance Assessment",
    description: "Shortlisted applicants are invited for a written entrance assessment covering Mathematics, English, and Science relevant to their level.",
  },
  {
    step: "04",
    icon: UserCheck,
    title: "Interview & Review",
    description: "Successful candidates and their parents/guardians attend a brief interview with the admissions panel and school administration.",
  },
  {
    step: "05",
    icon: GraduationCap,
    title: "Offer & Enrollment",
    description: "Accepted students receive an official admission letter. Enrollment is finalized upon payment of registration fees and submission of remaining documents.",
  },
]

const primaryRequirements = [
  "Completed application form",
  "Birth certificate (original + copy)",
  "Two recent passport photographs",
  "Previous school report cards (last 2 years)",
  "Transfer letter from previous school (if applicable)",
  "Parent/guardian national ID copy",
]

const secondaryRequirements = [
  "Completed application form",
  "PSLE / NECTA results certificate",
  "Birth certificate (original + copy)",
  "Two recent passport photographs",
  "Previous school academic records",
  "Transfer certificate from previous school",
  "Parent/guardian national ID copy",
]

const downloadForms = [
  { title: "Primary Admissions Form", size: "PDF, 280KB", icon: Download },
  { title: "Secondary Admissions Form (Form 1–4)", size: "PDF, 310KB", icon: Download },
  { title: "A-Level Admissions Form (Form 5–6)", size: "PDF, 295KB", icon: Download },
  { title: "Boarding Application Form", size: "PDF, 265KB", icon: Download },
]

const faqs = [
  {
    q: "When does the academic year begin?",
    a: "The school year at Sammena School begins in January, with admissions intake running from October through December of the preceding year.",
  },
  {
    q: "Are there mid-year admissions?",
    a: "Limited mid-year placements may be available subject to vacancy. Contact our admissions office to inquire about current availability.",
  },
  {
    q: "Is boarding available for all students?",
    a: "Boarding facilities are available for secondary school students. Primary students are day scholars only. Priority is given to students from distant regions.",
  },
  {
    q: "Do you offer scholarships?",
    a: "Yes. Merit-based scholarships are available for exceptionally talented students. Contact the admissions office for scholarship eligibility and application procedures.",
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
            We welcome students of all backgrounds who are eager to learn, grow, and achieve. Here&apos;s everything you need to know about joining Sammena School.
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
            {/* Secondary */}
            <div className="bg-card rounded-2xl p-7 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-school-orange/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-school-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Secondary School</h3>
                  <p className="text-muted-foreground text-xs">Form 1 – 6</p>
                </div>
              </div>
              <ul className="space-y-3">
                {secondaryRequirements.map((req) => (
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
              All submitted documents become the property of Sammena School and will not be returned. Please ensure all copies are legible and certified where required.
            </p>
          </div>
        </div>
      </section>

      {/* Download Forms */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Download</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Application Forms</h2>
            <p className="text-muted-foreground mt-2 text-sm">Download, print, and complete your application form below.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {downloadForms.map(({ title, size, icon: Icon }) => (
              <button
                key={title}
                className="group flex flex-col items-center text-center gap-3 bg-card rounded-2xl p-6 border border-border hover:border-school-orange/40 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-school-orange/10 flex items-center justify-center group-hover:bg-school-orange transition-colors">
                  <Icon className="w-5 h-5 text-school-orange group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm mb-0.5">{title}</div>
                  <div className="text-muted-foreground text-xs">{size}</div>
                </div>
                <span className="text-school-orange text-xs font-semibold group-hover:underline">Download Form</span>
              </button>
            ))}
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
            Have More Questions? We&apos;re Here to Help.
          </h2>
          <p className="text-white/85 mb-7">
            Our admissions team is available Monday–Friday, 8:00am – 5:00pm.
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
