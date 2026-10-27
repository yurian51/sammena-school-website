import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { T } from "@/components/translated-text"
import { AnnouncementsChannel } from "@/components/announcements-channel"
import { createServerServices } from "@/lib/server/repositories"
import type { CmsContent } from "@/lib/cms/types"

export const metadata: Metadata = { title: "News & Announcements", description: "Officially published news and announcements from Sammena Pre & Primary School in Arusha, Tanzania.", alternates: { canonical: "/news" } }
export const dynamic = "force-dynamic"
export const revalidate = 0

async function getPublishedUpdates(): Promise<CmsContent[] | null> {
  try { return await createServerServices({ schoolId: process.env.SAMMENA_SCHOOL_ID ?? "sammena-primary" }).cms.listPublished() }
  catch { return null }
}

export default async function NewsPage() {
  const updates = await getPublishedUpdates()
  return <main className="min-h-screen overflow-x-hidden bg-white text-[#172033]"><Navbar/><section className="bg-[#102846] pb-16 pt-36 text-white sm:pb-20"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d7c28e]"><T text="Official school information" /></p><h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl"><T text="News & announcements" /></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75"><T text="The official Sammena updates channel. Search published notices, filter news, and find important information quickly." /></p></div></section><section className="py-12 sm:py-16 lg:py-20"><div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8"><AnnouncementsChannel items={updates}/></div></section><Footer/></main>
}
