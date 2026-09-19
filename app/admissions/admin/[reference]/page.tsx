import Link from "next/link"

export default function ApplicantReviewUnavailablePage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-16 text-[#183252]">
      <section className="mx-auto max-w-2xl rounded-3xl border border-[#dce4ed] bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a7628]">Sammena Schools · Staff Portal</p>
        <h1 className="mt-3 text-3xl font-bold text-[#071d3b]">Applicant review requires staff authentication</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Applicant review is fail-closed until a real school identity provider is connected. No applicant record, review action,
          or internal note is exposed to unauthenticated visitors.
        </p>
        <Link href="/admissions/admin" className="mt-7 inline-flex min-h-11 items-center rounded-xl bg-[#071d3b] px-5 py-3 text-sm font-bold text-white">
          Return to staff portal
        </Link>
      </section>
    </main>
  )
}
