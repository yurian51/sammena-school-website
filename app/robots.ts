import type { MetadataRoute } from 'next'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena.altavox.space').replace(/\/$/, '')

const publicCrawlerRules = {
  allow: ['/', '/api/cms'],
  // Keep public CMS content fetchable while excluding API endpoints from crawling.
  // The more-specific /api/cms Allow rule takes precedence over /api/*.
  disallow: ['/api/*', '/admin/', '/portal/', '/login'],
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'Googlebot', ...publicCrawlerRules },
      { userAgent: 'Bingbot', ...publicCrawlerRules },
      { userAgent: '*', ...publicCrawlerRules },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
