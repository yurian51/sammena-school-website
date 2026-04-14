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
  title: 'Sammena School — Excellence in Education | Tanzania',
  description: 'Sammena School is a premier academic institution in Tanzania, committed to nurturing excellence, character, and lifelong learning in every student.',
  keywords: 'Sammena School, Tanzania school, education Tanzania, secondary school Tanzania, primary school Tanzania',
  generator: 'v0.app',
  openGraph: {
    title: 'Sammena School — Excellence in Education',
    description: 'A premier academic institution in Tanzania committed to nurturing excellence.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
