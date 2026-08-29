import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, CheckCircle2, CreditCard, GraduationCap, Info, WalletCards } from "lucide-react"
import { FeeCalculator } from "@/components/admissions/fee-calculator"
import { BoardingChecklist } from "@/components/admissions/boarding-checklist"

const nursery = [
  ["School Fees", "90,000", "90,000", "90,000"], ["Food Fees", "90,000", "90,000", "90,000"], ["Report Book", "10,000", "–", "–"], ["Inspection Form", "1,000", "–", "–"], ["Sport Fees", "1,000", "–", "–"], ["Torch", "1,000", "–", "–"], ["New Comer Start", "50,000", "–", "–"],
]
const preUnity = [
  ["School Fees", "90,000", "90,000", "90,000"], ["Food Fees", "90,000", "125,000", "90,000"], ["Inspection Fees", "1,000", "–", "–"], ["Report Book", "10,000", "–", "–"], ["Inspection Form", "1,000", "–", "–"], ["Torch", "1,000", "–", "–"], ["New Comer Start", "50,000", "–", "–"],
]
const primaryA = [
  ["School Fees", "120,000", "120,000", "120,000"], ["Food Fees", "90,000", "165,000", "90,000"], ["Inspection", "1,000", "–", "–"], ["Sport Fees", "1,000", "–", "–"], ["Torch", "1,000", "–", "–"], ["Examination", "100,000", "–", "–"],
]
const primaryB = [
  ["School Fees", "120,000", "120,000", "120,000"], ["Food Fees", "90,000", "90,000", "90,000"], ["Inspection Form", "1,000", "–", "–"], ["Sport Fees", "1,000", "–", "–"], ["Report Book", "10,000", "–", "–"], ["Torch", "1,000", "–", "–"], ["New Comer Start", "50,000", "–", "–"],
]
const boarding = [
  ["Application Form", "15,000", "–", "–"], ["School Fees", "155,000", "155,000", "155,000"], ["Food Fees", "200,000", "200,000", "200,000"], ["Stationery", "15,000", "–", "–"], ["School Uniform", "52,000", "–", "–"], ["Sport Uniform", "30,000", "–", "–"], ["Inspection Form", "1,000", "–", "–"], ["Sport Fees", "1,000", "–", "–"], ["Diary", "5,000", "–", "–"], ["Report Book", "10,000", "–", "–"], ["New Comer Start", "50,000", "–", "–"], ["Shamba Dress", "38,000", "–", "–"], ["All Exam", "84,000", "200,000", "200,000"],
]

function FeeTable({ title, total, rows }: { title: string; total: string; rows: string[][] }) {
  return <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="border-b border-border bg-school-dark px-5 py-4 text-white"><h3 className="font-bold">{title}</h3></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-sm"><thead><tr className="bg-school-neutral text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="px-4 py-3">Item</th><th className="px-4 py-3">Term I</th><th className="px-4 py-3">Term II</th><th className="px-4 py-3">Term III</th></tr></thead><tbody>{rows.map((r)=><tr key={r[0]} className="border-t border-border/70"><td className="px-4 py-3 font-medium">{r[0]}</td><td className="px-4 py-3">{r[1]}</td><td className="px-4 py-3">{r[2]}</td><td className="px-4 py-3">{r[3]}</td></tr>)}</tbody></table></div><div className="flex items-center justify-between border-t border-border bg-school-gold/10 px-5 py-4"><span className="text-sm font-semibold">Annual total</span><strong className="text-lg text-school-dark">TSh {total}</strong></div></div>
}

export default function AdmissionsFeesPage() {
  return <main className="min-h-screen"><Navbar /><section className="bg-school-dark pb-16 pt-32 text-white"><div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"><span className="text-sm font-semibold uppercase tracking-[0.2em] text-school-gold">Admissions · Fees</span><h1 className="mt-3 text-4xl font-bold md:text-5xl">School Fees & Payment Guide</h1><p className="mx-auto mt-4 max-w-3xl text-lg leading-7 text-white/65">A digital reference based on the supplied Sammena Joining Instruction. Amounts below reproduce the document's listed fee schedules.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/admissions/apply" className="inline-flex items-center justify-center gap-2 rounded-xl bg-school-gold px-6 py-3.5 font-bold text-school-dark">Start Application <ArrowRight className="h-4 w-4"/></Link><Link href="/admissions" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold">Admissions Overview</Link></div></div></section>
    <section className="bg-background py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><FeeCalculator /></div></section>
    <section className="bg-school-neutral py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 flex items-start gap-3 rounded-2xl border border-school-gold/20 bg-school-gold/10 p-5"><Info className="mt-0.5 h-5 w-5 shrink-0 text-school-gold"/><p className="text-sm leading-6 text-foreground/75">The joining instruction states that payments should be made before studies begin through the school's designated payment account. Confirm the current fee schedule and payment details with the school before making any payment.</p></div><div className="grid gap-7 lg:grid-cols-2"><FeeTable title="Nursery Section · Baby & Middle" total="603,000" rows={nursery}/><FeeTable title="Pre-Unity" total="638,000" rows={preUnity}/><FeeTable title="Primary Section · Class IV–VII" total="833,000" rows={primaryA}/><FeeTable title="Class I, II, III, V & VI" total="693,000" rows={primaryB}/></div><div className="mt-7"><FeeTable title="Boarding Payments" total="1,211,000" rows={boarding}/></div><p className="mt-4 text-xs text-muted-foreground">Source note: the supplied document labels one table “PRIMARY SECTION (CLASS IV – VII)” and another “CLASS I, II, III, V & VI”. Those headings are preserved exactly rather than silently correcting the source.</p></div></section>
    <section className="bg-background py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><BoardingChecklist /></div></section>
    <section className="bg-school-gold py-14"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-school-dark md:text-3xl">Ready to apply?</h2><p className="mt-3 text-school-dark/70">Use the digital application to provide the learner and guardian information required by the joining instruction.</p><Link href="/admissions/apply" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-school-dark px-6 py-3.5 font-bold text-white">Continue to Application <ArrowRight className="h-4 w-4"/></Link></div></section><Footer/></main>
}
