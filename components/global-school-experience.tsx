import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CalendarDays, Globe2, HeartHandshake, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react"

const audiences = [
  { label: "Prospective families", text: "Understand the school, admissions journey, fees and how to begin.", href: "/admissions", icon: Users },
  { label: "Current families", text: "Reach the calendar, notices, resources and parent services quickly.", href: "/portal", icon: ShieldCheck },
  { label: "Visitors & community", text: "Discover Sammena's story, location, learning environment and school life.", href: "/about", icon: Globe2 },
]

const journey = [
  ["01", "Discover", "Explore the school, learning approach, community and facilities.", "/about"],
  ["02", "Visit & enquire", "Find the campus, contact the school and understand entry requirements.", "/contact"],
  ["03", "Apply", "Complete the official admission application with clear guidance at each step.", "/admissions/apply"],
  ["04", "Join the community", "Follow school dates, resources, notices and family services after admission.", "/portal"],
] as const

export function GlobalSchoolExperience() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">A global-standard school experience, rooted in Tanzania</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-[#0a3158] sm:text-4xl">One digital front door for families, learners and the wider community.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">Sammena combines the clarity of a modern international-school website with the trust, directness and official information families expect from a Tanzanian school.</p>
          </div>
          <div className="grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-3">
            {audiences.map(({ label, text, href, icon: Icon }) => (
              <Link key={label} href={href} className="group bg-[#fbfbfa] p-5 transition-colors hover:bg-[#faf8f1] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7728]">
                <Icon className="h-5 w-5 text-[#9b7728]" aria-hidden="true" />
                <h3 className="mt-4 text-sm font-bold text-[#0a3158]">{label}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#8a6a24]">Continue <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 grid overflow-hidden border border-slate-200 bg-[#071d3b] lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[300px] lg:min-h-[410px]">
            <Image src="/images/about-school.jpg" alt="Sammena School learning community" fill className="object-cover" sizes="(min-width: 1024px) 52vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071d3b]/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e2c46c]">Rooted in community</p>
              <p className="mt-2 max-w-xl text-xl font-semibold">Learning, character, responsibility and meaningful opportunity for every child.</p>
            </div>
          </div>
          <div className="p-7 text-white sm:p-9">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e2c46c]"><Sparkles className="h-4 w-4" aria-hidden="true" /> The Sammena difference</div>
            <h3 className="mt-3 text-2xl font-bold">International in ambition. Local in purpose.</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">The experience is designed to feel premium without becoming distant: real school information, clear pathways, human stories and practical services sit together in one coherent system.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="border border-white/15 bg-white/5 p-4"><HeartHandshake className="h-5 w-5 text-[#e2c46c]" aria-hidden="true" /><p className="mt-3 text-sm font-semibold">People first</p><p className="mt-1 text-xs leading-5 text-white/55">Community, wellbeing and family connection are visible parts of the experience.</p></div>
              <div className="border border-white/15 bg-white/5 p-4"><Globe2 className="h-5 w-5 text-[#e2c46c]" aria-hidden="true" /><p className="mt-3 text-sm font-semibold">World-ready</p><p className="mt-1 text-xs leading-5 text-white/55">A digital presence built to present Sammena confidently beyond its local catchment.</p></div>
            </div>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#e2c46c] hover:text-white">Discover Sammena <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex flex-col gap-3 border-b border-slate-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Family journey</p><h3 className="mt-2 text-2xl font-bold text-[#0a3158] sm:text-3xl">From first visit to belonging.</h3></div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">A deliberately simple journey inspired by high-performing international school experiences: fewer dead ends, clearer next actions.</p>
          </div>
          <div className="mt-6 grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-4">
            {journey.map(([number, title, text, href]) => (
              <Link key={number} href={href} className="group bg-white p-6 transition-colors hover:bg-[#faf8f1] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7728]">
                <span className="text-xs font-black tracking-[0.16em] text-[#c8a64b]">{number}</span>
                <h4 className="mt-3 text-lg font-bold text-[#0a3158]">{title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#8a6a24]">Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link href="/calendar" className="flex items-center justify-between border border-slate-200 bg-[#f7f7f5] p-5 transition-colors hover:bg-[#faf8f1]"><span className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-[#9b7728]" aria-hidden="true" /><span><span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#9b7728]">Stay connected</span><span className="mt-1 block text-sm font-semibold text-[#0a3158]">Academic calendar & school events</span></span></span><ArrowRight className="h-4 w-4 text-[#8a6a24]" aria-hidden="true" /></Link>
          <Link href="/location" className="flex items-center justify-between border border-slate-200 bg-[#f7f7f5] p-5 transition-colors hover:bg-[#faf8f1]"><span className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#9b7728]" aria-hidden="true" /><span><span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#9b7728]">Come and see us</span><span className="mt-1 block text-sm font-semibold text-[#0a3158]">Campus location & directions</span></span></span><ArrowRight className="h-4 w-4 text-[#8a6a24]" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}
