import Link from "next/link"
import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react"

export default function LoginRecoveryPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f8] px-5 py-12 text-slate-800 sm:px-8">
      <div className="mx-auto max-w-xl">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a3158] hover:underline"><ArrowLeft className="h-4 w-4" /> Back to Login</Link>
        <section className="mt-8 border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4ecd6] text-[#8a6a24]"><KeyRound className="h-6 w-6" aria-hidden="true" /></span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">Account recovery</p>
          <h1 className="mt-2 text-3xl font-bold text-[#0a3158]">Forgot your password?</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Password recovery must be handled by the configured Sammena identity provider. This page does not collect passwords or pretend to send recovery messages.</p>
          <div className="mt-7 flex items-start gap-3 border border-slate-200 bg-[#f7f7f5] p-4 text-sm leading-6 text-slate-600"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9b7728]" aria-hidden="true" /><span>When the school identity provider is connected, recovery can be routed through its verified email or phone workflow.</span></div>
          <Link href="/contact" className="mt-7 inline-flex items-center justify-center bg-[#0a3158] px-5 py-3 text-sm font-bold text-white hover:bg-[#071d3b]">Contact Sammena Administration</Link>
        </section>
      </div>
    </main>
  )
}
