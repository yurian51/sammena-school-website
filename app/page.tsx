"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bell, BookOpen, CalendarDays, ChevronRight, FileText, GraduationCap, Users, Phone, MessageCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InstitutionalSections } from "@/components/institutional-sections"

const quickLinks = [
  { href: "/admissions", title: "Admissions", text: "Application information, requirements and guidance.", icon: GraduationCap },
  { href: "/academics", title: "Academics", text: "Learning programmes, subjects and academic information.", icon: BookOpen },
  { href: "/calendar", title: "Academic Calendar", text: "Important school dates, terms and activities.", icon: CalendarDays },
  { href: "/resources", title: "Downloads", text: "Forms, documents, policies and school resources.", icon: FileText },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <Navbar />

      <section className="hero-institutional group relative motion-safe:transition-colors border-b border-slate-200 bg-[#0a3158] pt-[118px] text-white">
        <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-[1.05fr_.95fr]">
          <div className="flex min-h-[500px] flex-col justify-center px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <p className="institutional-rule text-sm font-semibold uppercase tracking-[0.16em] text-[#e2c46c]">SAMMENA SCHOOLS</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight motion-safe:transition-transform motion-safe:duration-500 sm:text-5xl lg:text-6xl group-hover:translate-x-0.5">Sammena Pre & Primary School</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">A learning community committed to strong foundations, character, responsibility and meaningful opportunities for every child.</p>
            <div className="mt-8 flex flex-wrap gap-3 motion-safe:animate-[fadeIn_.7s_ease-out]">
              <Link href="/admissions" className="link-arrow inline-flex items-center gap-2 bg-[#c8a64b] px-6 py-3.5 font-bold text-[#071d3b] transition-colors hover:bg-[#ddc16b]">Admissions <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/about" className="link-arrow inline-flex items-center gap-2 border border-white/35 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10">About the School <ChevronRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="media-frame relative min-h-[330px] lg:min-h-[500px]">
            <Image src="/images/hero-bg.jpg" alt="Sammena school campus" fill priority className="object-cover" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex shrink-0 items-center gap-2 font-bold uppercase tracking-[0.12em] text-[#0a3158]"><Bell className="h-4 w-4 text-[#a17d24]" /> Official Notice</span>
            <span className="hidden h-4 w-px bg-slate-300 sm:block" />
            <span className="truncate text-slate-600">Admissions, academic dates and approved school announcements are published through the official information centre.</span>
            <Link href="/news" className="ml-auto hidden shrink-0 font-semibold text-[#8a6a24] sm:inline-flex">View updates <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#f6f7f8] py-8 sm:py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-3 sm:px-8">
          <a href="/admissions" className="group border-l-4 border-[#9b7728] bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9b7728]">Admissions</p>
            <p className="mt-1 text-sm font-semibold text-[#0a3158]">Start your application <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></p>
          </a>
          <a href="/academics" className="group border-l-4 border-[#0a3158] bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9b7728]">Academics</p>
            <p className="mt-1 text-sm font-semibold text-[#0a3158]">Explore learning programmes <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></p>
          </a>
          <a href="/calendar" className="group border-l-4 border-[#9b7728] bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9b7728]">Calendar</p>
            <p className="mt-1 text-sm font-semibold text-[#0a3158]">See important school dates <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></p>
          </a>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Information centre</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0a3158] sm:text-3xl">Everything families need, in one place.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">Find official information about joining Sammena, learning programmes, important dates and school documents.</p>
          </div>
          <div className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(({ href, title, text, icon: Icon }) => (
            <Link key={href} href={href} className="group bg-white p-6 transition-colors hover:bg-[#faf8f1]">
              <Icon className="h-6 w-6 text-[#9b7728]" />
              <h2 className="mt-4 text-lg font-bold text-[#0a3158]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#8a6a24]">Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
          </div>
        </div>
      </section>

      <InstitutionalSections />

      <section className="border-y border-slate-200 bg-white py-16 motion-safe:animate-[fadeIn_.7s_ease-out] sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9b7728]">Welcome to Sammena</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#0a3158] sm:text-4xl">Education grounded in learning, character and community.</h2>
            <p className="mt-5 leading-8 text-slate-600">Sammena Schools is building a clear education pathway from the early years through primary education, with a long-term vision for secondary education. Our website is designed to give families reliable information about the school, admissions, academics, activities and official resources.</p>
            <Link href="/about" className="link-arrow mt-7 inline-flex items-center gap-2 font-bold text-[#8a6a24]">Read about Sammena <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="media-frame relative aspect-[16/10] overflow-hidden border border-slate-200">
            <Image src="/images/about-school.jpg" alt="Students at Sammena School" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-16 motion-safe:animate-[fadeIn_.7s_ease-out] sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-300 pb-5 sm:flex-row sm:items-end">
            <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9b7728]">School information</p><h2 className="mt-2 text-3xl font-bold text-[#0a3158]">News, notices and school life</h2></div>
            <Link href="/news" className="link-arrow inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">All news and events <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <article className="border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9b7728]">Announcements</p><h3 className="mt-4 text-xl font-bold text-[#0a3158]">Official school notices</h3><p className="mt-3 text-sm leading-7 text-slate-600">Approved announcements and important family information will be published in one place.</p><Link href="/news" className="link-arrow mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">View announcements <ArrowRight className="h-4 w-4" /></Link></article>
            <article className="border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9b7728]">Academic Calendar</p><h3 className="mt-4 text-xl font-bold text-[#0a3158]">Important dates</h3><p className="mt-3 text-sm leading-7 text-slate-600">Term dates, examinations, meetings and school activities can be found in the official calendar.</p><Link href="/calendar" className="link-arrow mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">Open calendar <ArrowRight className="h-4 w-4" /></Link></article>
            <article className="border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9b7728]">School Life</p><h3 className="mt-4 text-xl font-bold text-[#0a3158]">Learning beyond the classroom</h3><p className="mt-3 text-sm leading-7 text-slate-600">Explore school activities, events, student experiences and the wider Sammena community.</p><Link href="/gallery" className="link-arrow mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">View school life <ArrowRight className="h-4 w-4" /></Link></article>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#0a3158] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#e2c46c]">Our community</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">A school is built by its people.</h2><p className="mt-5 max-w-2xl leading-8 text-white/75">Students, teachers, families and the wider community all have a role in creating a respectful and purposeful learning environment.</p></div>
          <div className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2"><div className="bg-[#0a3158] p-5"><Users className="h-5 w-5 text-[#e2c46c]" /><p className="mt-3 text-sm font-semibold">Students & families</p></div><div className="bg-[#0a3158] p-5"><BookOpen className="h-5 w-5 text-[#e2c46c]" /><p className="mt-3 text-sm font-semibold">Teaching & learning</p></div></div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:px-8 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9b7728]">Need assistance?</p><p className="mt-1 text-sm text-slate-600">Speak with the school directly about admissions and general enquiries.</p></div><div className="flex flex-wrap gap-3"><a href="tel:+255750227073" className="inline-flex items-center gap-2 border border-[#0a3158]/20 px-4 py-3 text-sm font-bold text-[#0a3158] hover:bg-[#0a3158] hover:text-white"><Phone className="h-4 w-4" /> Call +255 750 227 073</a><a href="https://wa.me/255750227073" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0a3158] px-4 py-3 text-sm font-bold text-white hover:bg-[#06203b]"><MessageCircle className="h-4 w-4" /> WhatsApp</a></div></div></section>
      <Footer />
    </main>
  )
}