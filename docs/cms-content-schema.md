# SAMMENA CMS Content Schema

## Content types

### Announcement
- id
- title
- slug
- summary
- body
- published_at
- expires_at
- priority
- status
- author

### News
- id
- title
- slug
- excerpt
- body
- cover_image
- category
- published_at
- status
- author

### Event
- id
- title
- slug
- description
- start_at
- end_at
- location
- audience
- status

### Resource
- id
- title
- description
- category
- file_key
- mime_type
- published_at
- status

## Editorial lifecycle

DRAFT -> REVIEW -> APPROVED -> PUBLISHED -> ARCHIVED

## Rules

- Draft content is never publicly accessible.
- Only approved content can be published.
- Published content should retain author and publication metadata.
- Files must use private storage with authorized download endpoints when sensitive.
- The CMS must support scheduled publishing and expiry for announcements.
