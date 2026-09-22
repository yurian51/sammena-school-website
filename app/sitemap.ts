import type { MetadataRoute } from 'next'

const routes = [
  '',
  '/about',
  '/academics',
  '/admissions',
  '/admissions/apply',
  '/gallery',
  '/contact',
  '/location',
  '/services',
  '/secondary',
  '/resources',
  '/documents',
  '/facilities',
  '/news',
  '/calendar',
  '/events',
  '/results',
  '/trust',
  '/privacy',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena-school-website.onrender.com'
  const now = new Date()

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency:
      route === '' || route === '/news' || route === '/results' || route === '/calendar' ? 'weekly' : 'monthly',
    priority:
      route === '' ? 1 :
      route === '/admissions' ? 0.95 :
      route === '/admissions/apply' ? 0.9 :
      route === '/results' ? 0.9 :
      route === '/academics' ? 0.85 :
      route === '/services' ? 0.85 :
      route === '/news' || route === '/calendar' ? 0.8 :
      route === '/location' ? 0.85 :
      route === '/trust' || route === '/privacy' ? 0.75 :
      0.7,
  }))
}
