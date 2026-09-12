import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink, MapPin, Navigation, Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { schoolLocation } from "@/lib/school-location"

export const metadata: Metadata = {
  title: "School Location",
  description: "Find Sammena Pre & Primary School in Nduruma, Arusha, Tanzania. View the verified map location, address and directions.",
  alternates: { canonical: "/location" },
  openGraph: {
    title: "Sammena School Location",
    description: "Verified Sammena Pre & Primary School location in Nduruma, Arusha, Tanzania.",
    type: "website",
  },
}

const locationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: schoolLocation.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: "P15336",
    addressLocality: schoolLocation.locality,
    addressRegion: schoolLocation.region,
    addressCountry: "TZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: schoolLocation.latitude,
    longitude: schoolLocation.longitude,
  },
  telephone: schoolLocation.phone,
  identifier: [
    { "@type": "PropertyValue", propertyID: "NECTA centre number", value: schoolLocation.centreNumber },
    { "@type": "PropertyValue", propertyID: "Registration number", value: schoolLocation.registrationNumber },
  ],
}

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd) }} />
      <section className="border-b border-slate-200 bg-[#0a3158] pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e2c46c]">Visit Sammena</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Find our school.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">A clear, verified location for families, visitors and partners travelling to Sammena Pre & Primary School.</p>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.35fr_.65fr]">
          <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
            <iframe
              src={schoolLocation.mapEmbed}
              width="100%"
              height="520"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Verified Sammena Pre & Primary School location on Google Maps"
              className="h-[360px] sm:h-[440px] lg:h-[520px]"
            />
          </div>

          <aside className="flex flex-col border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a3158]/5"><MapPin className="h-6 w-6 text-[#9b7728]" aria-hidden="true" /></div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#9b7728]">School address</p>
            <h2 className="mt-2 text-2xl font-bold text-[#0a3158]">{schoolLocation.name}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{schoolLocation.address}</p>

            <dl className="mt-7 space-y-4 border-t border-slate-200 pt-6 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Centre Number</dt><dd className="font-bold text-[#0a3158]">{schoolLocation.centreNumber}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Registration</dt><dd className="font-bold text-[#0a3158]">{schoolLocation.registrationNumber}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Coordinates</dt><dd className="text-right font-mono text-xs font-semibold text-[#0a3158]">{schoolLocation.latitude}, {schoolLocation.longitude}</dd></div>
            </dl>

            <div className="mt-auto grid gap-3 pt-8">
              <a href={schoolLocation.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#c8a64b] px-5 py-3.5 font-bold text-[#071d3b] hover:bg-[#ddc16b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3158]"><Navigation className="h-4 w-4" /> Get directions <ExternalLink className="h-3.5 w-3.5" /></a>
              <a href={schoolLocation.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[#0a3158]/20 px-5 py-3.5 font-bold text-[#0a3158] hover:bg-[#0a3158] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7728]">Open in Google Maps <ExternalLink className="h-3.5 w-3.5" /></a>
              <a href={`tel:${schoolLocation.phone.replaceAll(" ", "")}`} className="inline-flex items-center justify-center gap-2 border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7728]"><Phone className="h-4 w-4" /> Call {schoolLocation.phone}</a>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9b7728]">Need more information?</p><p className="mt-1 text-sm text-slate-600">Admissions, school visits and general enquiries are handled through the official contact channel.</p></div>
          <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-[#8a6a24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7728]">Contact Sammena <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
