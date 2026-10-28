import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SAMMENA PRE & PRIMARY SCHOOL',
    short_name: 'SAMMENA',
    description: 'Official digital home of Sammena Pre & Primary School in Arusha, Tanzania.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FF6700',
    lang: 'en-TZ',
    categories: ['education', 'school'],
    icons: [
      { src: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/images/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/images/favicon-48x48.png', sizes: '48x48', type: 'image/png', purpose: 'any' },
    ],
  }
}
