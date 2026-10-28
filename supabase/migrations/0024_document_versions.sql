-- Versioned institutional document metadata for the public resource centre.
-- Files remain at verified publisher/storage URLs; no synthetic documents are inserted.
create table if not exists public.document_versions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  resource_id uuid not null references public.digital_library_resources(id) on delete cascade,
  version_label text not null check (length(trim(version_label)) between 1 and 80),
  document_date date not null,
  effective_from date,
  effective_until date,
  source_url text not null check (source_url ~ '^https://'),
  change_summary text not null default '',
  status text not null default 'DRAFT' check (status in ('DRAFT','PUBLISHED','ARCHIVED')),
  created_by uuid,
  created_at timestamptz not null default now(),
  check (effective_until is null or effective_from is null or effective_until >= effective_from),
  unique (resource_id, version_label)
);
create index if not exists document_versions_public_idx
  on public.document_versions (school_id, resource_id, document_date desc)
  where status = 'PUBLISHED';
alter table public.document_versions enable row level security;
-- Deliberately no browser write policy: writes must pass the server-side permission checks.
drop policy if exists document_versions_public_read on public.document_versions;
create policy document_versions_public_read
  on public.document_versions for select to anon, authenticated
  using (
    status = 'PUBLISHED'
    and exists (
      select 1 from public.digital_library_resources r
      where r.id = document_versions.resource_id
        and r.school_id = document_versions.school_id
        and r.status = 'PUBLISHED'
        and (r.published_at is null or r.published_at <= now())
    )
  );
