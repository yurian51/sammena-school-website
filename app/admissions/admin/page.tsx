import Link from "next/link"

export default function AdmissionsAdminUnavailablePage() {
  return (
    <main className="min-h-screen bg-[#f4f1e8] px-5 py-16 text-[#15253f]">
      <section className="mx-auto max-w-2xl rounded-3xl border border-[#d9d4c7] bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a7628]">Sammena Schools · Staff Portal</p>
        <h1 className="mt-3 text-3xl font-bold text-[#071d3b]">Staff authentication is unavailable</h1>
        <p className="mt-4 leading-7 text-slate-600">
          The admissions staff workspace is intentionally unavailable until Sammena is connected to a real school identity provider.
          No demo applicant records or unauthenticated staff actions are exposed from this route.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/admissions" className="inline-flex min-h-11 items-center rounded-xl bg-[#071d3b] px-5 py-3 text-sm font-bold text-white">
            Return to admissions
          </Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center rounded-xl border border-[#d9d4c7] px-5 py-3 text-sm font-bold text-[#071d3b]">
            Contact school office
          </Link>
        </div>
      </section>
    </main>
  )
}
