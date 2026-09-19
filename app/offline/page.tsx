import Link from "next/link"

export const metadata = {
  title: "Offline | Sammena Schools",
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-16 text-[#183252]">
      <section className="mx-auto max-w-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Sammena Schools</p>
        <h1 className="mt-3 text-3xl font-bold">You are offline</h1>
        <p className="mt-4 leading-7 text-slate-600">
          The network connection is unavailable. Public pages you have already visited may still be available from this device.
          Private student and staff services are intentionally not cached offline.
        </p>
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center bg-[#0a3158] px-5 py-3 text-sm font-bold text-white">
          Return to Sammena
        </Link>
      </section>
    </main>
  )
}
