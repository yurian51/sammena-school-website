import Link from "next/link"
import { ChevronRight, Home, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginPortal, type LoginAudience } from "@/components/login-portal"

const validTypes = new Set<LoginAudience>(["parent", "staff", "email", "admin"])

type LoginPageProps = { searchParams: Promise<{ type?: string }> }

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const initial = validTypes.has(params.type as LoginAudience) ? params.type as LoginAudience : "parent"

  return (
    <main className="min-h-screen bg-[#f6f7f8] text-slate-800">
      <Navbar />
      <section className="border-b border-slate-200 bg-[#0a3158] pt-[112px] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e2c46c]">Sammena Digital School</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Login to your account</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">Access the school service assigned to your role. Private student, academic and administrative information is protected by authenticated access.</p>
        </div>
      </section>
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-3 text-xs text-slate-500 sm:px-8"><Link href="/" className="inline-flex items-center gap-1 hover:text-[#0a3158]"><Home className="h-3.5 w-3.5" aria-hidden="true" /> Home</Link><ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /><span className="font-semibold text-[#0a3158]">Login</span></div></nav>
      <section className="px-5 py-10 sm:px-8 sm:py-14"><LoginPortal initial={initial} /></section>
      <section className="border-t border-slate-200 bg-white py-8"><div className="mx-auto flex max-w-6xl items-start gap-3 px-5 text-xs leading-5 text-slate-500 sm:px-8"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9b7728]" aria-hidden="true" /><p>Only use credentials issued for your Sammena account. School systems should never request your password through ordinary messages or public forms.</p></div></section>
      <Footer />
    </main>
  )
}
