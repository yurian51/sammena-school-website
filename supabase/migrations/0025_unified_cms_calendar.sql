-- Consolidate editorial news, announcements and calendar events into the CMS content table.
alter table public.cms_content drop constraint if exists cms_content_type_check;
alter table public.cms_content
  add constraint cms_content_type_check check (type in ('NEWS','ANNOUNCEMENT','EVENT'));

alter table public.cms_content
  add column if not exists event_category text,
  add column if not exists event_audience text,
  add column if not exists starts_at timestamptz,
  add column if not exists ends_at timestamptz,
  add column if not exists all_day boolean not null default false,
  add column if not exists location text,
  add column if not exists created_by uuid;

create index if not exists cms_content_calendar_idx
  on public.cms_content (starts_at, status)
  where type = 'EVENT';

-- Preserve existing event IDs, dates and publication states while moving the source of truth.
insert into public.cms_content
  (id, type, title, slug, body, status, published_at, created_at, updated_at,
   event_category, event_audience, starts_at, ends_at, all_day, location, created_by)
select id, 'EVENT', title, slug, description, status, published_at, created_at, updated_at,
       category, audience, starts_at, ends_at, all_day, location, case when created_by ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}
from public.school_events
on conflict do nothing;

alter table public.cms_content enable row level security;
drop policy if exists cms_public_read_published on public.cms_content;
create policy cms_public_read_published
  on public.cms_content for select to anon, authenticated
  using (
    status = 'PUBLISHED'
    and (published_at is null or published_at <= now())
    and (expires_at is null or expires_at > now())
  );
 then created_by::uuid else null end
from public.school_events
on conflict do nothing;

alter table public.cms_content enable row level security;
drop policy if exists cms_public_read_published on public.cms_content;
create policy cms_public_read_published
  on public.cms_content for select to anon, authenticated
  using (
    status = 'PUBLISHED'
    and (published_at is null or published_at <= now())
    and (expires_at is null or expires_at > now())
  );
