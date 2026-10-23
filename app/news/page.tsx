import { AlertCircle, Bell, Newspaper } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createServerServices } from "@/lib/server/repositories"
import type { CmsContent } from "@/lib/cms/types"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function getPublishedUpdates(): Promise<CmsContent[] | null> {
  try {
    const services = createServerServices({ schoolId: process.env.SAMMENA_SCHOOL_ID ?? "sammena-primary" })
    return await services.cms.listPublished()
  } catch {
    return null
  }
}

function formatPublishedDate(item: CmsContent) {
  const value = item.publishedAt ?? item.createdAt
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat("en-TZ", { dateStyle: "long" }).format(date)
}

export default async function NewsPage() {
  const updates = await getPublishedUpdates()

  return <main className="min-h-screen overflow-x-hidden bg-white text-[#172033]">
    <Navbar />
    <section className="bg-[#102846] pb-16 pt-36 text-white sm:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d7c28e]">Official school information</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">News & announcements</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Published updates from Sammena Pre & Primary School. Only items approved and published by the school appear here.</p>
      </div>
    </section>
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {updates === null && <div className="mx-auto flex max-w-2xl items-start gap-4 border border-amber-200 bg-amber-50 p-6" role="status"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" /><div><h2 className="font-bold text-amber-950">Updates are temporarily unavailable</h2><p className="mt-2 text-sm leading-6 text-amber-900">The school publishing service could not be reached. Please try again later.</p></div></div>}
        {updates !== null && updates.length === 0 && <div className="mx-auto max-w-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center"><Newspaper className="mx-auto h-8 w-8 text-[#b9964f]" /><h2 className="mt-4 text-xl font-semibold text-[#102846]">No published updates yet</h2><p className="mt-2 text-sm leading-6 text-slate-600">When the school publishes an approved news item or announcement, it will appear here.</p></div>}
        {updates && updates.length > 0 && <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{updates.map((item) => {
          const isNews = item.type === "NEWS"
          const summary = isNews ? item.excerpt : item.summary
          const date = formatPublishedDate(item)
          return <article key={item.id} className="flex h-full flex-col border border-slate-200 bg-white p-6 transition hover:border-[#b9964f]/60 hover:shadow-sm sm:p-7">
            <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8d713b]">{isNews ? <Newspaper className="h-4 w-4" /> : <Bell className="h-4 w-4" />}{isNews ? item.category : "Announcement"}</span>{!isNews && item.priority === "IMPORTANT" && <span className="border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-900">Important</span>}</div>
            <h2 className="mt-5 text-xl font-semibold leading-snug text-[#17365d]">{item.title}</h2>
            {date && <time className="mt-2 text-xs text-slate-500" dateTime={item.publishedAt ?? item.createdAt}>{date}</time>}
            <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-7 text-slate-600">{summary || "Please contact the school for further information."}</p>
          </article>
        })}</div>}
      </div>
    </section>
    <Footer />
  </main>
}
