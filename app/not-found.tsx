import Link from "next/link"
import { ArrowLeft, ArrowRight, MapPin, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-school-neutral text-foreground">
      <Navbar />
      <section className="flex min-h-[78vh] items-center justify-center px-5 pb-16 pt-36 sm:px-8" aria-labelledby="not-found-title">
        <div className="w-full max-w-3xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-school-orange">404 · Page not found</p>
          <p className="mt-6 text-7xl font-black tracking-tight text-school-dark sm:text-9xl">404</p>
          <h1 id="not-found-title" className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">This page took a wrong turn.</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">The address may have changed or the page may have moved. Fortunately, the rest of Sammena is still where it should be.</p>
          <nav aria-label="404 navigation" className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-school-dark px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-school-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-gold">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back home
            </Link>
            <Link href="/search" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-school-orange hover:text-school-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-gold">
              <Search className="h-4 w-4" aria-hidden="true" /> Search website
            </Link>
            <Link href="/location" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-school-orange hover:text-school-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-gold">
              <MapPin className="h-4 w-4" aria-hidden="true" /> Find the school
            </Link>
          </nav>
          <Link href="/location" className="link-arrow mt-8 inline-flex text-sm font-semibold text-school-orange">Sammena School Location <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
