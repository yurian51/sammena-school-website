import Link from "next/link"
import { GraduationCap, MessageCircle, Phone } from "lucide-react"

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-2 shadow-[0_-8px_30px_rgba(7,29,59,0.10)] backdrop-blur lg:hidden" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
      <div className="mx-auto grid max-w-2xl grid-cols-3 gap-2">
        <a href="tel:+255750227073" className="flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-[#0a3158]/15 text-xs font-bold text-[#0a3158] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
        <a href="https://wa.me/255750227073" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-[#0a3158]/15 text-xs font-bold text-[#0a3158] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a64b]">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <Link href="/admissions" className="flex min-h-11 items-center justify-center gap-1.5 rounded-md bg-[#c8a64b] text-xs font-extrabold text-[#071d3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3158]">
          <GraduationCap className="h-4 w-4" aria-hidden="true" />
          Apply
        </Link>
      </div>
    </div>
  )
}
