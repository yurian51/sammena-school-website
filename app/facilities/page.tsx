import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Building2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "School Facilities",
  description: "Information about Sammena Pre & Primary School facilities published by the school.",
  alternates: { canonical: "/facilities" },
}

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-[#0a3158] pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e2c46c]">School Environment</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">School Facilities</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Facilities information is published only when it has been confirmed by Sammena School administration.
          </p>
        </div>
      </section>
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0a3158]/5">
            <Building2 className="h-7 w-7 text-[#9b7728]" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#0a3158]">Verified facilities information</h2>
          <p className="mt-4 leading-7 text-slate-600">
            The public platform does not invent a facilities list. Contact the school for the current facilities available to pupils and visitors.
          </p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 bg-[#0a3158] px-6 py-3 font-bold text-white hover:bg-[#082743]">
            Contact Sammena <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
