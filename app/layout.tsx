import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  keywords: ['Sammena Schools', 'Sammena Pre & Primary School', 'Sammena Secondary School', 'school Tanzania', 'education Tanzania'],
  alternates: { canonical: '/' },
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
  name: 'SAMMENA SCHOOLS',
  url: siteUrl,
  description: 'Educational institution serving learners through Sammena Pre & Primary School and a planned secondary expansion for 2028.',
  brand: { '@type': 'Brand', name: 'SAMMENA SCHOOLS' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
