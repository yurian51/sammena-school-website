import type { MetadataRoute } from 'next'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena.altavox.space').replace(/\/$/, '')

const publicCrawlerRules = {
  // Public CMS data is used by the site to render school updates; keep it fetchable.
  allow: ['/', '/api/cms'],
  // Only private or account-specific areas are excluded from search crawlers.
  disallow: ['/admin/', '/portal/', '/login'],
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
