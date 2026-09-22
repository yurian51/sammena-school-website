import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena-school-website.onrender.com'

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api', '/api/', '/portal', '/portal/'] }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
