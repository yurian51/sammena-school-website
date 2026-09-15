import type { ComponentType } from "react"
import Link from "next/link"
import { ArrowRight, CalendarDays, ClipboardCheck, FileText, GraduationCap, LibraryBig, Search, ShieldCheck, Users, WalletCards } from "lucide-react"

type Service = {
  href: string
  title: string
  description: string
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>
}

const publicServices: Service[] = [
  { href: "/admissions", title: "Admissions", description: "Understand entry requirements, the application journey and next steps.", icon: ClipboardCheck },
  { href: "/admissions/fees", title: "Fees & Charges", description: "Review the school fee information currently published by Sammena.", icon: WalletCards },
  { href: "/calendar", title: "School Calendar", description: "Find term dates, examinations, meetings and other published school dates.", icon: CalendarDays },
  { href: "/resources", title: "Resources & Documents", description: "Access the school resources and documents currently published for families and visitors.", icon: FileText },
  { href: "/academics", title: "Academics", description: "Explore learning areas, classes and the academic information available on the site.", icon: GraduationCap },
  { href: "/search", title: "Website Search", description: "Search the public Sammena website for information, resources and published content.", icon: Search },
]

const protectedServices: Service[] = [
  { href: "/portal/parent", title: "Parent & Family Hub", description: "Open the authenticated family workspace for authorised learners, attendance and academic information.", icon: Users },
  { href: "/portal/student", title: "Student Hub", description: "Open the authenticated student workspace for the student profile, attendance, assessments and learning information.", icon: GraduationCap },
  { href: "/portal", title: "School Portal", description: "Use the authenticated operational school workspace when your role is authorised.", icon: ShieldCheck },
  { href: "/portal/library", title: "Digital Library", description: "Open the authenticated learning-resource area when your account is authorized.", icon: LibraryBig },
]

function ServiceCard({ href, title, description, icon: Icon }: Service) {
  return (
    <Link href={href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c8a64b] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#c8a64b] focus:ring-offset-2">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#071d3b] text-[#e2c46c]"><Icon className="h-5 w-5" aria-hidden={true} /></span>
        <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#c8a64b]" aria-hidden={true} />
      </div>
      <h2 className="mt-5 text-lg font-bold text-[#0a3158]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  )
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-[#071d3b] px-6 py-12 text-white shadow-xl sm:px-10 lg:px-14">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e2c46c]">Sammena Digital School</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">School services in one place</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">A single service directory for public school information and authenticated family services. Each destination below maps to an existing Sammena route.</p>
        </section>

        <section className="mt-8" aria-labelledby="public-services-heading">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a27b2b]">Public experience</p><h2 id="public-services-heading" className="mt-2 text-2xl font-extrabold text-[#071d3b]">Information & admissions</h2></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{publicServices.map(service => <ServiceCard key={service.href} {...service} />)}</div>
        </section>

        <section className="mt-10" aria-labelledby="protected-services-heading">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a27b2b]">Authenticated experience</p><h2 id="protected-services-heading" className="mt-2 text-2xl font-extrabold text-[#071d3b]">Family, student & school services</h2></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{protectedServices.map(service => <ServiceCard key={service.href} {...service} />)}</div>
        </section>
      </div>
    </main>
  )
}
