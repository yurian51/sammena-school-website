import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071d3b]">
      <Navbar />
      <section className="flex min-h-[78vh] items-center justify-center px-5 pb-16 pt-36 sm:px-8">
        <div className="w-full max-w-2xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#9b7728]">404 · Page not found</p>
          <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-7xl">This page took a wrong turn.</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">The address may have changed, the page may have moved, or someone finally discovered that URLs are not a reliable substitute for navigation.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 bg-[#0a3158] px-5 py-3 text-sm font-bold text-white hover:bg-[#071d3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]"><ArrowLeft className="h-4 w-4" /> Back home</Link>
            <Link href="/search" className="inline-flex min-h-11 items-center gap-2 border border-[#0a3158]/15 bg-white px-5 py-3 text-sm font-bold text-[#0a3158] hover:bg-[#faf8f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]"><Search className="h-4 w-4" /> Search website</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
