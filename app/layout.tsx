import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MobileActionBar } from '@/components/mobile-action-bar'
import { PwaRegister } from '@/components/pwa-register'
import { LanguageProvider } from '@/components/language-provider'
import { schoolIdentity } from '@/lib/academic-results'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena.altavox.space'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SAMMENA SCHOOLS | Building Bright Minds. Shaping Better Futures.',
    template: '%s | SAMMENA SCHOOLS',
  },
  description: 'The official digital home of Sammena Schools, including Sammena Pre & Primary School and verified information about the school’s future development.',
  keywords: ['Sammena Schools', 'Sammena Pre & Primary School', 'primary school Tanzania', 'school Arusha', 'education Tanzania', 'Sammena Nduruma', 'P15336 Nduruma'],
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
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Sammena Pre & Primary School official logo and website' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAMMENA SCHOOLS',
    description: 'Building Bright Minds. Shaping Better Futures.',
    images: [{ url: '/opengraph-image', alt: 'Sammena Pre & Primary School official logo and website' }],
  },
  robots: { index: true, follow: true },
  verification: { google: 'lELeRRdvUGwwD4L0nTHtxNSQeIWl9tp4eoKKjgqa7Fs' },
  manifest: '/images/site.webmanifest',
  icons: {
    icon: [
      { url: '/images/favicon.ico', sizes: 'any' },
      { url: '/images/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/images/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/images/favicon.ico'],
    apple: [{ url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: schoolIdentity.brand,
  alternateName: schoolIdentity.name,
  url: siteUrl,
  description: 'Educational institution serving learners through Sammena Pre & Primary School, with future development information published only when confirmed.',
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
      <head>
        <link rel="preload" as="image" href="/images/Sammena_Pre_Primary_School_Logo_Clean.svg" type="image/svg+xml" fetchPriority="high" />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-school-dark px-4 py-3 text-sm font-semibold text-white shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-school-gold focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <LanguageProvider>
          <div id="main-content" className="pb-20 lg:pb-0">{children}</div>
          <MobileActionBar />
        </LanguageProvider>
        <PwaRegister />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
