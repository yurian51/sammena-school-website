import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, CalendarDays, ClipboardCheck, FileText, GraduationCap, ShieldCheck, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "School Services | Sammena Schools",
  description: "A single entry point for Sammena admissions, family, student, academic and school information services.",
}

const services = [
  { audience: "I’m new to Sammena", title: "Admissions", text: "Understand entry requirements, fees, the application journey and application tracking.", href: "/admissions", icon: ClipboardCheck },
  { audience: "I’m a current parent", title: "Parent & Family", text: "Access the protected family experience for children, attendance, academic information and school communication.", href: "/portal/parent", icon: Users },
  { audience: "I’m a student", title: "Student Hub", text: "Access the protected student workspace for your SIS profile, attendance, assessments and learning links.", href: "/portal/student", icon: GraduationCap },
  { audience: "I need school dates", title: "Academic Calendar", text: "Find published term dates, examinations, meetings and other school activities.", href: "/calendar", icon: CalendarDays },
  { audience: "I need a school document", title: "Resources & Documents", text: "Find published forms, policies, prospectus material and official school resources.", href: "/resources", icon: FileText },
  { audience: "I need school information", title: "School Information", text: "Explore academics, results, school life, location, contact details and institutional information.", href: "/about", icon: BookOpen },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-[#071d3b] pb-20 pt-36 text-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e2c46c]">Sammena digital services</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">One clear route to the school services you need.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">Public information stays public. Student and family records stay behind authenticated service boundaries. A surprisingly sensible arrangement, given that children’s data is not decorative website content.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ audience, title, text, href, icon: Icon }) => (
            <Link key={href} href={href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#c8a64b]/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071d3b] text-[#e2c46c]"><Icon className="h-5 w-5" /></div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b7728]">{audience}</p>
              <h2 className="mt-2 text-xl font-bold text-[#071d3b]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">Open service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[#c8a64b]/30 bg-[#faf7ed] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#8a6a24]" />
            <div>
              <h2 className="font-bold text-[#071d3b]">Data boundary</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Public pages expose institutional information only. Attendance, results, student identity and family records are intended to be served through authenticated APIs with school and role scope.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
