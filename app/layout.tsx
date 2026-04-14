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
  title: 'Sammena Pre & Primary School — Changing Lives Through Education | Tanzania',
  description: 'Sammena Pre & Primary School in Tanzania provides quality English-medium education with special focus on orphans and vulnerable children. Founded in 2009 by Samwel Langdare Menavi.',
  keywords: 'Sammena School, Tanzania primary school, English medium school Tanzania, orphan support Tanzania, education Tanzania, pre-primary school Tanzania',
  generator: 'v0.app',
  openGraph: {
    title: 'Sammena Pre & Primary School — Changing Lives Through Education',
    description: 'Quality English-medium education for children in Tanzania, with special support for orphans and vulnerable families. Founded 2009.',
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
