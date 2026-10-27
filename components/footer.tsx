"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const groups = [
  {
    title: "Explore Sammena",
    links: [
      ["/", "Home"],
      ["/about", "About Sammena"],
      ["/history", "Our Story"],
      ["/leadership", "Leadership"],
      ["/academics", "Academics"],
      ["/location", "Our Location"],
    ],
  },
  {
    title: "School Information",
    links: [
      ["/admissions", "Admissions & Applications"],
      ["/calendar", "Academic Calendar"],
      ["/news", "News & Announcements"],
      ["/gallery", "Photo Gallery"],
      ["/policies", "School Policies"],
      ["/sponsorship", "Development & Partnerships"],
    ],
  },
  {
    title: "Family & Learning",
    links: [
      ["/portal", "Parent & Student Hub"],
      ["/results", "Academic Results"],
      ["/library", "Digital Learning Library"],
      ["/resources", "Documents & Resources"],
      ["/contact", "Contact the School"],
    ],
  },
]

export function Footer() {
  const { tr } = useLanguage()

  return (
    <footer className="bg-[#102846] pb-[5.25rem] text-white lg:pb-0">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-white/45 sm:px-6 lg:px-8">
          <span className="font-bold text-[#d7c28e]">SAMMENA PRE & PRIMARY SCHOOL</span>
          <span className="h-px w-8 bg-[#b9964f]/60" />
          <span>{tr("Official School Information")}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 xl:grid-cols-[1.1fr_2fr] xl:gap-16">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3" aria-label="Sammena Pre & Primary School home">
              <span className="grid h-14 w-14 shrink-0 place-items-center bg-white p-1.5 ring-1 ring-[#d7c28e]/60">
                <Image
                  src="/images/Sammena_Pre_Primary_School_Logo_Clean.svg"
                  alt="Sammena Pre & Primary School logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="leading-none">
                <span className="block text-lg font-extrabold tracking-[0.13em]">SAMMENA</span>
                <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d7c28e]">
                  {tr("Pre & Primary School")}
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
              {tr("Building Bright Minds. Shaping Better Futures. A learning community focused on strong foundations, character, responsibility and meaningful opportunities for every child.")}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                ["/admissions", "Admissions"],
                ["/portal", "Family Portal"],
                ["/library", "Digital Library"],
                ["/contact", "Contact Us"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex min-h-10 items-center gap-2 border border-white/15 px-3.5 py-2.5 text-xs font-semibold text-white/80 transition hover:border-[#b9964f]/70 hover:bg-white/[.04] hover:text-white"
                >
                  {tr(label)}
                  <ArrowRight className="h-3.5 w-3.5 text-[#d7c28e]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <nav key={group.title} aria-label={tr(group.title)}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d7c28e]">{tr(group.title)}</p>
                <ul className="mt-4 space-y-3">
                  {group.links.map(([href, label]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="group/link inline-flex items-start text-sm leading-5 text-white/65 transition hover:text-white"
                      >
                        <span>{tr(label)}</span>
                        <ArrowRight className="ml-1 mt-0.5 h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <section aria-label={tr("Contact Us")} className="mt-10 border border-white/10">
          <div className="border-b border-white/10 px-4 py-3 sm:px-5">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d7c28e]">{tr("Contact Us")}</h2>
          </div>
          <div className="grid sm:grid-cols-3 sm:divide-x sm:divide-white/10">
            <Link href="/location" className="flex items-center gap-3 px-4 py-4 text-sm text-white/70 transition hover:bg-white/[.03] hover:text-white sm:px-5">
              <MapPin className="h-4 w-4 shrink-0 text-[#d7c28e]" aria-hidden="true" />
              <span>
                <strong className="block text-xs text-white">{tr("P15336, Nduruma")}</strong>
                <span className="text-xs text-white/50">{tr("Arusha, Tanzania")}</span>
              </span>
            </Link>
            <a href="tel:+255750227073" className="flex items-center gap-3 border-t border-white/10 px-4 py-4 text-sm text-white/70 transition hover:bg-white/[.03] hover:text-white sm:border-t-0 sm:px-5">
              <Phone className="h-4 w-4 shrink-0 text-[#d7c28e]" aria-hidden="true" />
              <span>
                <strong className="block text-xs text-white">{tr("Call the School")}</strong>
                <span className="text-xs text-white/50">+255 750 227 073</span>
              </span>
            </a>
            <div className="flex items-center gap-3 border-t border-white/10 px-4 py-4 sm:border-t-0 sm:px-5">
              <MessageCircle className="h-4 w-4 shrink-0 text-[#d7c28e]" aria-hidden="true" />
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <a href="https://wa.me/255750227073" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/80 hover:text-white">{tr("WhatsApp")}</a>
                <span className="text-white/25" aria-hidden="true">·</span>
                <Link href="/contact" className="font-semibold text-white/80 hover:text-white">{tr("General Enquiries")}</Link>
              </span>
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.08em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SAMMENA PRE & PRIMARY SCHOOL. {tr("All rights reserved.")}</p>
          <nav aria-label={tr("Legal and verification")} className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/trust" className="inline-flex items-center gap-1.5 transition hover:text-white">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />{tr("Trust Centre")}
            </Link>
            <Link href="/privacy" className="transition hover:text-white">{tr("Privacy & Data Protection")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
