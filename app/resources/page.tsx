import Link from "next/link"
import { ArrowRight, Download, FileText, ShieldCheck } from "lucide-react"

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="border-b border-border bg-school-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-school-orange">Resources</p>
          <h1 className="text-4xl font-bold md:text-5xl">Sammena Resource Centre</h1>
          <p className="mt-5 max-w-2xl text-white/70">Official forms, policies, prospectus materials, calendars and other school resources will be organised here.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [FileText, "Forms & Applications", "Admission and administrative forms published by the school."],
            [ShieldCheck, "Policies & Guidelines", "Approved school policies and institutional guidance."],
            [Download, "Prospectus & Downloads", "Official prospectus documents, notices and downloadable resources."],
          ].map(([Icon, title, text]) => {
            const ResourceIcon = Icon as typeof FileText
            return <div key={title as string} className="rounded-2xl border border-border bg-card p-7 shadow-sm"><ResourceIcon className="h-8 w-8 text-school-orange" /><h2 className="mt-5 text-xl font-bold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p><div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-school-orange">Resource catalogue <ArrowRight className="h-4 w-4" /></div></div>
          })}
        </div>
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-school-neutral p-8 text-center"><p className="font-semibold">Resource publishing is managed centrally.</p><p className="mt-2 text-sm text-muted-foreground">Only approved Sammena documents should be published as official resources.</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 font-semibold text-school-orange">Contact the school <ArrowRight className="h-4 w-4" /></Link></div>
      </section>
    </main>
  )
}
