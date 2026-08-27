create table if not exists cms_content (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('NEWS','ANNOUNCEMENT')),
  title text not null,
  slug text not null,
  excerpt text,
  body text not null,
  status text not null default 'DRAFT' check (status in ('DRAFT','REVIEW','APPROVED','PUBLISHED','ARCHIVED')),
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(type, slug)
);

create index if not exists cms_content_status_idx on cms_content(status);
create index if not exists cms_content_published_at_idx on cms_content(published_at desc);
