import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ShieldCheck, UserRound } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Leadership & Governance | Sammena Pre & Primary School",
  description: "Sammena Pre & Primary School leadership, governance and accountability structure.",
  alternates: { canonical: "/leadership" },
}

const responsibilities = [
  "Guiding school policies and development plans",
  "Supporting accountable school management",
  "Overseeing responsible use of school resources",
  "Safeguarding the welfare and safety of pupils",
]

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-[#071d3b] pb-20 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Leadership & Governance</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">People, responsibility and accountability</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            A clear public view of the leadership structure behind Sammena, without publishing personal staff details that have not been approved for public use.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4ecd6] text-[#9b7728]">
              <UserRound className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Founder & Director</p>
            <h2 className="mt-2 text-3xl font-bold text-[#0a3158]">Samwel Langdare Menavi</h2>
            <p className="mt-5 leading-8 text-slate-600">
              Samwel Langdare Menavi is identified by the school's public profile as the Founder and Director of Sammena Pre & Primary School. The school's leadership is presented here at an institutional level so that public information remains useful without exposing unnecessary personal details.
            </p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24] hover:underline">
              Read the school story <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-[#f7f7f5] p-8 sm:p-10">
            <ShieldCheck className="h-7 w-7 text-[#9b7728]" aria-hidden="true" />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">School Board</p>
            <h2 className="mt-2 text-3xl font-bold text-[#0a3158]">Governance structure</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The school profile describes a School Board with parent representation and a role in guiding school development, policy and accountability.
            </p>
            <ul className="mt-6 space-y-3">
              {responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8b55b]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-[#0a3158]">Leadership information should stay current</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Staff profiles, committee memberships and official contacts should only be added after Sammena administration confirms the information for public publication.
          </p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0a3158] px-6 py-3 font-bold text-white">
            Contact Sammena <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
