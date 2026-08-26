import type { MetadataRoute } from 'next'

const routes = [
  '', '/about', '/academics', '/admissions', '/gallery', '/contact',
  '/secondary', '/resources', '/news', '/calendar', '/search', '/portal',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena.sch.tz'
  const now = new Date()
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route === '/news' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/admissions' ? 0.95 : 0.7,
  }))
}
