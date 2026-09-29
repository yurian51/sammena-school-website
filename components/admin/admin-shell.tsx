"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, ClipboardList, FileText, LayoutDashboard, LogOut, Mail, Megaphone, Settings, ShieldCheck, Users, X } from "lucide-react"
import { useState } from "react"
import { hasPermission, type Permission, type Role } from "@/lib/auth/roles"

type Props = { children: React.ReactNode; role: string }

const nav: Array<{ label: string; href: string; icon: typeof LayoutDashboard; permission: Permission }> = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, permission: "dashboard.view" },
  { label: "Notices & News", href: "/admin/content", icon: Megaphone, permission: "cms:read" },
  { label: "Events & Calendar", href: "/admin/events", icon: CalendarDays, permission: "cms:read" },
  { label: "Admissions", href: "/admin/admissions", icon: ClipboardList, permission: "admissions:read" },
  { label: "Messages", href: "/admin/messages", icon: Mail, permission: "messages:read" },
  { label: "Students", href: "/admin/students", icon: Users, permission: "sis:students:read" },
  { label: "Audit Log", href: "/admin/audit", icon: ShieldCheck, permission: "audit:read" },
  { label: "Settings", href: "/admin/settings", icon: Settings, permission: "settings:read" },
]

export function AdminShell({ children, role }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.assign("/login?type=admin")
  }

  const Navigation = () => (
    <nav className="space-y-1" aria-label="Administration">
      {nav.filter((item) => hasPermission(role as Role, item.permission)).map(({ label, href, icon: Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-[#f3ead5] text-[#17365d]" : "text-slate-600 hover:bg-slate-50 hover:text-[#17365d]"}`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#172033]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-200 px-5 py-5">
            <Link href="/admin" className="flex items-center gap-3">
              <Image src="/images/Sammena_Pre_Primary_School_Logo_Clean.svg" alt="Sammena Pre & Primary School" width={44} height={44} priority className="h-11 w-11 object-contain" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-[#17365d]">Sammena</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[.15em] text-slate-500">Administration</span>
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-5">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</p>
            <Navigation />
          </div>
          <div className="border-t border-slate-200 p-4">
            <div className="mb-3 flex items-center gap-3 px-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#17365d] text-xs font-bold text-white">SA</div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-800">Administrator</p>
                <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">{role.replaceAll("_", " ")}</p>
              </div>
            </div>
            <button onClick={() => void logout()} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-700">
              <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {open && <button aria-label="Close navigation" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white transition-transform lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
          <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <Image src="/images/Sammena_Pre_Primary_School_Logo_Clean.svg" alt="Sammena Pre & Primary School" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="text-sm font-bold text-[#17365d]">Sammena Administration</span>
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close navigation" className="p-2 text-slate-500"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4"><Navigation /></div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <button onClick={() => setOpen(true)} aria-label="Open navigation" className="rounded-md border border-slate-200 p-2 text-slate-600 lg:hidden">
              <span className="block h-0.5 w-5 bg-current" /><span className="mt-1 block h-0.5 w-5 bg-current" /><span className="mt-1 block h-0.5 w-5 bg-current" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-[.15em] text-[#a27e35]">Sammena Pre & Primary School</p>
              <p className="hidden text-xs text-slate-500 sm:block">Secure administration workspace</p>
            </div>
            <Link href="/" className="text-xs font-bold text-[#17365d] hover:underline">View website</Link>
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}
