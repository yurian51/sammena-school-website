import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileCheck2, ShieldCheck, Users, BookOpen, HeartHandshake } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Policies & Guidelines | Sammena Pre & Primary School",
  description: "Access published Sammena school policies and operational guidelines.",
  alternates: { canonical: "/policies" },
}

const policyGroups = [
  { icon: ShieldCheck, title: "Safeguarding & child protection", text: "Policies covering pupil safety, welfare, reporting and responsible adult conduct should be published here once approved for public release." },
  { icon: Users, title: "Parent & guardian guidance", text: "Parent responsibilities, communication expectations, attendance and school-community procedures belong in this section." },
  { icon: BookOpen, title: "Academic guidelines", text: "Assessment, examinations, homework, progression and learning-support guidance can be published here in approved versions." },
  { icon: HeartHandshake, title: "School community standards", text: "Behaviour, respect, inclusion, uniforms, attendance and responsible use of school property can be organised here." },
  { icon: FileCheck2, title: "Administrative documents", text: "Approved forms, declarations, fee policies and other operational documents should carry a publication date and version." },
]

export default function PoliciesPage() {
  return <main className="min-h-screen bg-white"><Navbar />
    <section className="bg-[#071d3b] pb-20 pt-36 text-white"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b55b]">School Governance</p><h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Policies & Guidelines</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">A proper institutional home for school policies, operational guidance and approved documents.</p></div></section>
    <section className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">Publishing standard</p><h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-5xl">Approved documents, not invented policy</h2><p className="mt-4 leading-7 text-slate-600">This section is intentionally structured to accept official Sammena documents. Until a policy is published and approved for public use, the website does not manufacture its wording.</p></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{policyGroups.map(({icon:Icon,title,text})=><article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4ecd6] text-[#9b7728]"><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-bold text-[#0a3158]">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Awaiting published document</span></article>)}</div></div></section>
    <section className="bg-[#f7f7f5] py-16"><div className="mx-auto max-w-3xl px-5 text-center"><h2 className="text-3xl font-bold text-[#0a3158]">Need a current policy?</h2><p className="mt-3 leading-7 text-slate-600">Contact Sammena administration for the current approved version rather than relying on an outdated copy.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0a3158] px-6 py-3 font-bold text-white">Contact Sammena <ArrowRight className="h-4 w-4" /></Link></div></section>
    <Footer />
  </main>
}