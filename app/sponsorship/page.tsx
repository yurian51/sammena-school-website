import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, HeartHandshake, GraduationCap, BookOpen, Users, ShieldCheck, ExternalLink, Landmark, Clock3, Handshake, ClipboardList, Wallet, FileText, HardHat, Mail, Globe2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Support Sammena | Sammena Pre & Primary School",
  description: "Explore Sammena's historical fundraising record, partnership opportunities, volunteer coordination and evidence-first school development support.",
  alternates: { canonical: "/sponsorship" },
}

const campaignUrl = "https://www.doneeractie.nl/charity-sammena-school-arusha-tanzania/-2021"

const supportAreas = [
  { icon: GraduationCap, title: "Education support", text: "Discuss support that helps children access learning and continue their education. Any current programme or beneficiary information must be confirmed by school leadership." },
  { icon: BookOpen, title: "Learning materials", text: "Books, classroom resources and teaching materials may be considered after the school confirms quantities, specifications and current priorities." },
  { icon: HardHat, title: "Facilities and school development", text: "Infrastructure proposals should begin with a current needs assessment, scope, budget and approval from the school." },
  { icon: Users, title: "Child welfare", text: "Support involving children must protect their privacy, dignity and safeguarding. Do not publish identifiable learner stories without appropriate permission." },
]

const partnerSteps = [
  { number: "01", title: "Introduce your organisation", text: "Share your organisation, contact person and the kind of support you are considering." },
  { number: "02", title: "Confirm the need", text: "Sammena leadership should confirm the priority, beneficiary scope, quantities and responsible school contact." },
  { number: "03", title: "Agree on delivery and records", text: "Before any transfer or delivery, agree on payment or procurement arrangements, receipts, timelines and evidence." },
  { number: "04", title: "Report the outcome", text: "Record what was received, what was spent, what was completed and any remaining balance, with sensitive information protected." },
]

const evidenceItems = [
  { title: "Original Doneeractie campaign", type: "External historical source", detail: "Published fundraising totals, organiser statement and the needs described at that time.", href: campaignUrl },
  { title: "Sammena school history", type: "School website", detail: "Founding-date discrepancy is flagged for leadership confirmation; founding and formal registration should be recorded separately.", href: "/history" },
  { title: "Contact the school", type: "Official follow-up", detail: "Use the school’s contact channel to request current priorities, approved budgets and supporting documents.", href: "/contact" },
]

export default function SponsorshipPage() {
  return <main className="min-h-screen bg-white"><Navbar />
    <section className="bg-[#071d3b] pb-20 pt-36 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b55b]">Support Sammena</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Help strengthen a child’s learning journey</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">A practical starting point for donors, partners and volunteers who want to support Sammena through verified needs, clear records and responsible follow-through.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#d8b55b] px-6 py-3 font-bold text-[#071d3b]">Discuss support <ArrowRight className="h-4 w-4" /></Link>
          <a href={campaignUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/10">View historical campaign <ExternalLink className="h-4 w-4" /></a>
        </div>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-[#faf8f1] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">Historical community support</p><h2 className="mt-3 text-3xl font-bold leading-tight text-[#0a3158] md:text-4xl">A documented fundraising campaign for Sammena</h2><p className="mt-4 text-sm leading-7 text-slate-600">A public Doneeractie campaign titled “Charity Sammena School Arusha Tanzania” was organised by Dominique Swinkels, who described volunteering at the school through IVHQ. It is a historical record, not an open donation channel or proof of a current donor relationship.</p></div>
          <article className="border border-[#d8c99e] bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#8a6a24]"><Landmark className="h-4 w-4" /> Doneeractie public record</span><span className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600"><Clock3 className="h-3.5 w-3.5" /> Campaign closed</span></div>
            <h3 className="mt-5 text-xl font-bold text-[#0a3158]">Charity Sammena School Arusha Tanzania</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="bg-[#f7f7f5] p-4"><p className="text-xs text-slate-500">Raised, as reported</p><p className="mt-1 text-2xl font-black text-[#0a3158]">€5,804</p></div>
              <div className="bg-[#f7f7f5] p-4"><p className="text-xs text-slate-500">Original target</p><p className="mt-1 text-2xl font-black text-[#0a3158]">€4,650</p></div>
              <div className="col-span-2 bg-[#f7f7f5] p-4 sm:col-span-1"><p className="text-xs text-slate-500">Donations recorded</p><p className="mt-1 text-2xl font-black text-[#0a3158]">87</p></div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">These are the campaign’s published totals only. They do not establish Sammena’s current balance, prove the amount received directly by the school, show how the money was ultimately spent, or describe current funding needs.</p>
            <a href={campaignUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 bg-[#0a3158] px-5 py-3 text-sm font-bold text-white hover:bg-[#17365d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9964f]">Read original campaign <ExternalLink className="h-4 w-4" /></a>
          </article>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="border border-slate-200 bg-white p-6"><h3 className="font-bold text-[#0a3158]">What the campaign said the money was for</h3><p className="mt-3 text-sm leading-7 text-slate-600">At the time, the organiser described a larger school building project: two offices and one classroom were said to be ready, while three classrooms and toilets for pupils and teachers were still being built. Flooring, roofing and toilet materials were listed as needs then.</p><p className="mt-3 text-xs leading-5 text-slate-500">Historical needs only. Current school leadership must confirm what was completed and what is needed today before this information is used for a new appeal.</p></article>
          <article className="border border-slate-200 bg-white p-6"><h3 className="font-bold text-[#0a3158]">Historical school information to verify</h3><p className="mt-3 text-sm leading-7 text-slate-600">The campaign describes Sammena as a private pre-primary and primary school founded in 2010 by Samwel Menavi and Mosses Mollel. Other material on this website gives different establishment dates. This discrepancy is flagged for school leadership to confirm, rather than silently treating one date as official.</p><Link href="/history" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24] hover:underline">Review school history <ArrowRight className="h-4 w-4" /></Link></article>
        </div>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <figure className="overflow-hidden border border-slate-200 bg-[#f7f7f5]">
            <img src="https://cdn.doneeractie.nl/campaign/2021/cce3ba8e-3bd7-48a5-8228-2c71c2b1dae4.jpg" alt="Historical group photograph from the Sammena School fundraising campaign" className="block h-auto w-full object-cover" loading="lazy" />
            <figcaption className="p-4 text-xs leading-5 text-slate-500">Historical photograph published with the Doneeractie fundraising campaign. The image reflects the time of that campaign, not necessarily the current school environment. <a href={campaignUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">View original source</a>.</figcaption>
          </figure>
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">From the original campaign</p><h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-4xl">People and school life behind the story</h2><p className="mt-4 leading-7 text-slate-600">These images are displayed as historical material from the public Doneeractie campaign, with attribution. They are not presented as a current school photo gallery or as evidence that the building works described at the time remain unfinished.</p><a href={campaignUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24] hover:underline">Open original campaign <ExternalLink className="h-4 w-4" /></a></div>
        </div>
      </div>
    </section>

    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">A volunteer who raised awareness</p><h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-4xl">Dominique Swinkels</h2><p className="mt-4 leading-7 text-slate-600">In the campaign, Dominique describes spending four weeks volunteering at Sammena through IVHQ, with three more weeks planned at the time of writing. She shared firsthand observations about crowded early-years classroom space and the school expansion then underway, and invited friends and family to contribute to that effort.</p><p className="mt-3 leading-7 text-slate-600">The campaign identifies Dominique as its organiser and describes her volunteer work at Sammena through IVHQ. The portrait below is the profile image displayed beside her name on the original campaign page. The group photograph is also taken from that public campaign record; both are shown here with a source link and historical context.</p>
            <figure className="mt-6 max-w-sm overflow-hidden border border-slate-200 bg-white">
              <img src="https://cdn.doneeractie.nl/profileimages/2580/ee263ff6-512b-435a-915d-35018722e6af.jpg" alt="Profile photograph displayed for Dominique Swinkels on the original Doneeractie campaign" className="block aspect-square w-full object-cover" loading="lazy" />
              <figcaption className="p-3 text-xs leading-5 text-slate-500">Profile image as displayed by Doneeractie. Source: <a href={campaignUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">original campaign</a>.</figcaption>
            </figure><a href={campaignUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24] hover:underline">Read Dominique’s original account <ExternalLink className="h-4 w-4" /></a></div>
          <aside className="border-l-4 border-[#d8b55b] bg-[#faf8f1] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a24]">Why this record matters</p><p className="mt-3 text-lg font-semibold leading-8 text-[#0a3158]">It documents an earlier moment when a volunteer described classroom pressure and a building project, while showing why current school needs and financial records must be re-confirmed before another fundraising appeal.</p><p className="mt-4 text-sm text-slate-600">Source: Doneeractie campaign, “Charity Sammena School Arusha Tanzania”.</p></aside>
        </div>
      </div>
    </section>

    <section className="bg-[#f7f7f5] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">Feature 1 · Donor & partner centre</p><h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-4xl">A clear route for donors and partners</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">The website now gives potential supporters a single starting point to discuss corporate partnerships, in-kind contributions, classroom resources or approved development work. No donor names or partnerships are invented.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="border border-slate-200 bg-white p-6"><Handshake className="h-7 w-7 text-[#9b7728]" /><h3 className="mt-4 text-xl font-bold text-[#0a3158]">For organisations and individuals</h3><p className="mt-2 text-sm leading-7 text-slate-600">Use the official contact route to introduce your offer, discuss an approved priority and agree on the right contact person, delivery process and follow-up records.</p><Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">Contact Sammena <ArrowRight className="h-4 w-4" /></Link></article>
          <article className="border border-slate-200 bg-white p-6"><ClipboardList className="h-7 w-7 text-[#9b7728]" /><h3 className="mt-4 text-xl font-bold text-[#0a3158]">Partner process</h3><ol className="mt-4 space-y-3">{partnerSteps.map((step)=><li key={step.number} className="flex gap-3"><span className="font-black text-[#9b7728]">{step.number}</span><div><p className="font-semibold text-[#0a3158]">{step.title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p></div></li>)}</ol></article>
        </div>
      </div>
    </section>

    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">Feature 2 · School development projects</p><h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-4xl">Projects begin with verified needs</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">The campaign’s historic construction notes are preserved as context, not advertised as current unfinished work. Each future project should be published only after school approval and a documented scope.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {supportAreas.map(({icon:Icon,title,text})=><article key={title} className="border border-slate-200 bg-white p-6"><Icon className="h-7 w-7 text-[#9b7728]" /><h3 className="mt-4 text-xl font-bold text-[#0a3158]">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></article>)}
        </div>
        <div className="mt-6 border border-[#d8c99e] bg-[#faf8f1] p-5 text-sm leading-7 text-slate-700"><strong>Project information required before publication:</strong> confirmed need, school owner, location, estimated cost, approved budget, timeline, procurement method, status, evidence of completion and a date for the next update.</div>
      </div>
    </section>

    <section className="bg-[#0a3158] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e2c36d]">Feature 3 · Donations and financial transparency</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">Keep fundraising records separate from school accounts</h2><p className="mt-4 max-w-3xl leading-7 text-white/75">The historical campaign totals are displayed with their source and limitations. They must not be treated as a current balance, audited account or proof of expenditure.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="border border-white/20 p-6"><Wallet className="h-7 w-7 text-[#e2c36d]" /><h3 className="mt-4 font-bold">Record incoming support</h3><p className="mt-2 text-sm leading-7 text-white/75">Future public reports should identify the reporting period, currency, confirmed amount received by the school and source of verification.</p></article>
          <article className="border border-white/20 p-6"><ShieldCheck className="h-7 w-7 text-[#e2c36d]" /><h3 className="mt-4 font-bold">Show spending evidence</h3><p className="mt-2 text-sm leading-7 text-white/75">Publish approved summaries, receipts or completion evidence where appropriate, while removing account numbers and private donor details.</p></article>
          <article className="border border-white/20 p-6"><Clock3 className="h-7 w-7 text-[#e2c36d]" /><h3 className="mt-4 font-bold">Date every update</h3><p className="mt-2 text-sm leading-7 text-white/75">Mark each report’s period and publication date. If figures have not been verified, say so rather than displaying estimates as facts.</p></article>
        </div>
      </div>
    </section>

    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">Feature 4 · Volunteer and sponsorship programme</p><h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-4xl">Work with the school responsibly</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">Volunteers, sponsors and visiting organisations should coordinate with school leadership before making arrangements. The historical IVHQ reference is context only and does not confirm that Sammena currently has an active agreement with IVHQ.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="border border-slate-200 p-6"><Users className="h-7 w-7 text-[#9b7728]" /><h3 className="mt-4 font-bold text-[#0a3158]">Volunteer enquiries</h3><p className="mt-2 text-sm leading-7 text-slate-600">Describe your skills, availability and proposed activities. School approval, safeguarding checks and supervision must be agreed before placement.</p></article>
          <article className="border border-slate-200 p-6"><HeartHandshake className="h-7 w-7 text-[#9b7728]" /><h3 className="mt-4 font-bold text-[#0a3158]">Sponsorship proposals</h3><p className="mt-2 text-sm leading-7 text-slate-600">Discuss the purpose, duration, responsibilities and reporting expectations with the school before making a commitment.</p></article>
          <article className="border border-slate-200 p-6"><Mail className="h-7 w-7 text-[#9b7728]" /><h3 className="mt-4 font-bold text-[#0a3158]">Start with official contact</h3><p className="mt-2 text-sm leading-7 text-slate-600">Do not send money, identity documents or sensitive pupil information to unverified individuals or old campaign links.</p><Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#8a6a24]">Contact the school <ArrowRight className="h-4 w-4" /></Link></article>
        </div>
      </div>
    </section>

    <section className="bg-[#faf8f1] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7728]">Feature 5 · Reports and evidence library</p><h2 className="mt-3 text-3xl font-bold text-[#0a3158] md:text-4xl">Read the source, not just the summary</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">This evidence area distinguishes third-party historical statements from information the school has independently confirmed. Future reports should be dated and approved before being published here.</p>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200 bg-white">
          {evidenceItems.map((item)=><article key={item.title} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div className="flex gap-4"><FileText className="mt-1 h-6 w-6 shrink-0 text-[#9b7728]" /><div><p className="text-xs font-bold uppercase tracking-wide text-[#8a6a24]">{item.type}</p><h3 className="mt-1 font-bold text-[#0a3158]">{item.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p></div></div><a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#8a6a24] hover:underline">Open resource <ArrowRight className="h-4 w-4" /></a></article>)}
        </div>
      </div>
    </section>

    <section className="border-t border-slate-200 py-16"><div className="mx-auto max-w-4xl px-5 text-center"><Globe2 className="mx-auto h-8 w-8 text-[#9b7728]" /><h2 className="mt-4 text-3xl font-bold text-[#0a3158]">Support that can be accounted for</h2><p className="mt-3 leading-7 text-slate-600">Before sending funds or personal information, contact the school through its official channels and confirm the current request, authorised recipient and payment instructions. The historical Doneeractie campaign is closed and is not an active payment route.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0a3158] px-6 py-3 font-bold text-white">Contact the school <ArrowRight className="h-4 w-4" /></Link></div></section>
    <Footer />
  </main>
}
