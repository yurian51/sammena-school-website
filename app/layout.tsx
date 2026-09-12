import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MobileActionBar } from '@/components/mobile-action-bar'
import { schoolIdentity } from '@/lib/academic-results'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena.sch.tz'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SAMMENA SCHOOLS | Building Bright Minds. Shaping Better Futures.',
    template: '%s | SAMMENA SCHOOLS',
  },
  description: 'The official digital home of Sammena Schools, including Sammena Pre & Primary School and the planned Sammena Secondary School expansion for 2028.',
  keywords: ['Sammena Schools', 'Sammena Pre & Primary School', 'Sammena Secondary School', 'primary school Tanzania', 'school Arusha', 'education Tanzania', 'Sammena Nduruma', 'P15336 Nduruma'],
  alternates: { canonical: '/' },
  category: 'education',
  applicationName: 'Sammena Schools',
  referrer: 'strict-origin-when-cross-origin',
  openGraph: {
    url: siteUrl,
    title: 'SAMMENA SCHOOLS',
    description: 'Building Bright Minds. Shaping Better Futures.',
    type: 'website',
    siteName: 'SAMMENA SCHOOLS',
    locale: 'en_TZ',
  },
  twitter: { card: 'summary_large_image', title: 'SAMMENA SCHOOLS', description: 'Building Bright Minds. Shaping Better Futures.' },
  robots: { index: true, follow: true },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: schoolIdentity.brand,
  alternateName: schoolIdentity.name,
  url: siteUrl,
  description: 'Educational institution serving learners through Sammena Pre & Primary School and a planned secondary expansion for 2028.',
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'NECTA centre number', value: schoolIdentity.centreNumber },
    { '@type': 'PropertyValue', propertyID: 'Registration number', value: schoolIdentity.registrationNumber },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'P15336',
    addressLocality: 'Nduruma',
    addressRegion: 'Arusha',
    addressCountry: 'TZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: schoolIdentity.latitude,
    longitude: schoolIdentity.longitude,
  },
  telephone: schoolIdentity.phone,
  areaServed: { '@type': 'AdministrativeArea', name: 'Arusha, Tanzania' },
  brand: { '@type': 'Brand', name: schoolIdentity.brand },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sammena Schools',
  url: siteUrl,
  inLanguage: 'en-TZ',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-TZ" className={`${poppins.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {children}
        <MobileActionBar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
