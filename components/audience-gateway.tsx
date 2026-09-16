import Link from "next/link"
import { ArrowRight, BookOpen, GraduationCap, Info, ShieldCheck, UserRound } from "lucide-react"

type AudiencePath = {
  href: string
  label: string
  title: string
  description: string
  icon: typeof GraduationCap
}

const audiencePaths: AudiencePath[] = [
  {
    href: "/admissions",
    label: "Prospective family",
    title: "I am new to Sammena",
    description: "Explore admissions, entry guidance, fees and the application journey.",
    icon: GraduationCap,
  },
  {
    href: "/portal/parent",
    label: "Current family",
    title: "I am a parent or guardian",
    description: "Open the authorised family workspace for children, attendance and academic information.",
    icon: UserRound,
  },
  {
    href: "/portal/student",
    label: "Current learner",
    title: "I am a student",
    description: "Open the authorised student workspace for profile, assessments and learning information.",
    icon: BookOpen,
  },
  {
    href: "/about",
    label: "Visitor",
    title: "I need school information",
    description: "Learn about Sammena, its educational approach, leadership and school life.",
    icon: Info,
  },
  {
    href: "/services",
    label: "School services",
    title: "I need a school service",
    description: "Find admissions, calendar, resources and authenticated school-service entry points.",
    icon: ShieldCheck,
  },
]

export function AudienceGateway() {
  return (
    <section className="border-y border-slate-200 bg-[#f7f7f5] py-12 sm:py-14" aria-labelledby="audience-gateway-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Audience pathways</p>
          <h2 id="audience-gateway-heading" className="mt-2 text-2xl font-bold text-[#0a3158] sm:text-3xl">Start with what you need from Sammena.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">The public website and digital school services serve different people. Choose your route instead of hunting through menus like it is 2007.</p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {audiencePaths.map(({ href, label, title, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex min-h-[190px] flex-col border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c8a64b] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7728] focus-visible:ring-offset-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071d3b] text-[#e2c46c]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9b7728]">{label}</p>
              <h3 className="mt-1 text-base font-bold leading-6 text-[#0a3158]">{title}</h3>
              <p className="mt-2 flex-1 text-xs leading-5 text-slate-500">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#8a6a24]">Continue <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
