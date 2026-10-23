import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena.altavox.space'

  return {
    rules: [{
      userAgent: '*',
      allow: ['/', '/api/cms'],
      disallow: ['/api', '/api/', '/portal', '/portal/'],
    }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
