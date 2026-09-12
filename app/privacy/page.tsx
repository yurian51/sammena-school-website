import Link from "next/link"
import { ArrowLeft, ShieldCheck, HeartHandshake } from "lucide-react"
import { schoolIdentity } from "@/lib/academic-results"

export const metadata = {
  title: "Privacy & Data Protection",
  description: "How Sammena Schools approaches personal data, enquiries, admissions and website privacy.",
}

const principles = [
  "Collect only information needed for a clear school purpose, such as an enquiry or admission process.",
  "Use submitted information for the purpose communicated to the person providing it.",
  "Protect personal information with appropriate access controls and reasonable security measures.",
  "Keep information only for as long as there is a legitimate operational, legal or safeguarding reason to retain it.",
  "Respect requests and rights available under applicable Tanzanian data-protection requirements.",
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071d3b]">
      <section className="border-b border-slate-200 bg-[#071d3b] text-white">
        <div className="mx-auto max-w-4xl px-5 pb-14 pt-32 sm:px-8">
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-white/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Sammena
          </Link>
          <div className="mt-10 flex items-start gap-4">
            <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-[#d8b55b]" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Trust & privacy</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Privacy & Data Protection</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">A plain-language overview of how the school website should handle personal information and protect learners, families and staff.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm leading-7 text-slate-600">This page describes the website's privacy approach and is not a substitute for the school's formal policies or legal advice. Where a specific collection form provides additional information, that notice should be read together with this page.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold">Who is responsible?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600"><strong>{schoolIdentity.brand}</strong>, including {schoolIdentity.name}, is the school identity represented by this website.</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-t border-slate-100 pt-3"><dt className="text-slate-500">Registration</dt><dd className="font-bold">{schoolIdentity.registrationNumber}</dd></div>
              <div className="flex justify-between gap-4 border-t border-slate-100 pt-3"><dt className="text-slate-500">Centre number</dt><dd className="font-bold">{schoolIdentity.centreNumber}</dd></div>
            </dl>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold">Information we may receive</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Depending on the service used, this may include a name, contact details, learner or admission information, messages, uploaded documents and technical information needed to keep the website secure.</p>
          </article>
        </div>

        <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-extrabold">Our data-protection principles</h2>
          <ul className="mt-5 space-y-4">
            {principles.map((principle) => <li key={principle} className="flex gap-3 text-sm leading-7 text-slate-600"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c8a64b]" />{principle}</li>)}
          </ul>
        </article>

        <article className="mt-6 rounded-2xl border border-[#0a3158]/15 bg-[#f2f7fb] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <HeartHandshake className="mt-1 h-6 w-6 shrink-0 text-[#0a3158]" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-extrabold">Learner and child safety</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">The website should avoid publishing unnecessary learner personal information. Student profiles, contact details, academic records and other sensitive information should only be available through appropriately protected school systems and to authorised users.</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">School photography and media should be published in accordance with the school's consent, safeguarding and communications procedures. Families should not submit passwords, payment-card details or other secrets through public contact forms.</p>
            </div>
          </div>
        </article>

        <article className="mt-6 rounded-2xl border border-[#c8a64b]/30 bg-[#faf8f1] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">Questions or requests</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">For questions about information submitted through the school website, contact Sammena using the school's official contact channels and include enough detail to identify the relevant enquiry.</p>
          <a href={`tel:${schoolIdentity.phone.replace(/\s/g, "")}`} className="mt-5 inline-flex min-h-11 items-center bg-[#071d3b] px-5 py-3 text-sm font-bold text-white hover:bg-[#0a3158] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">Contact the school</a>
        </article>
      </section>
    </main>
  )
}
