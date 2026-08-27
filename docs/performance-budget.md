# SAMMENA Performance Budget

## Targets

- Fast first meaningful render on mid-range mobile devices.
- Avoid shipping unnecessary client JavaScript.
- Prefer server components for public content where interactivity is not required.
- Optimize images with responsive sizes and modern formats when the deployment path supports it.
- Lazy-load below-the-fold media.
- Avoid autoplay video with sound.
- Keep third-party scripts to a minimum.

## Suggested release targets

- Lighthouse Performance: >= 90 on representative public routes where practical.
- Accessibility: >= 95 where practical.
- No critical console errors.
- No known broken navigation on mobile.

## Monitoring

Track Core Web Vitals in production and review regressions after major UI changes.
