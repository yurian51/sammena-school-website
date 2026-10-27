-- Add school scope to CMS content so calendar items remain tenant-bound.
alter table public.cms_content
  add column if not exists school_id uuid references public.schools(id) on delete cascade;
update public.cms_content c
   set school_id = e.school_id
  from public.school_events e
 where c.id = e.id and c.type = 'EVENT' and c.school_id is null;
update public.cms_content
   set school_id = (select id from public.schools where slug = 'sammena-pre-primary-school' limit 1)
 where school_id is null;
create index if not exists cms_content_school_type_status_idx
  on public.cms_content (school_id, type, status, published_at desc);
