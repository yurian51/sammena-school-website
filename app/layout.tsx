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

export const metadata: Metadata = {
  title: {
    default: 'SAMMENA SCHOOLS | Building Bright Minds. Shaping Better Futures.',
    template: '%s | SAMMENA SCHOOLS',
  },
  description: 'The official digital home of Sammena Schools, including Sammena Pre & Primary School and the planned Sammena Secondary School expansion for 2028.',
  keywords: ['Sammena Schools', 'Sammena Pre & Primary School', 'Sammena Secondary School', 'school Tanzania', 'education Tanzania'],
  openGraph: {
    title: 'SAMMENA SCHOOLS',
    description: 'Building Bright Minds. Shaping Better Futures.',
    type: 'website',
    siteName: 'SAMMENA SCHOOLS',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
