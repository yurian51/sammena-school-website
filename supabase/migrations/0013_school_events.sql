create table if not exists school_events (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  title text not null,
  slug text not null,
  description text not null default '',
  category text not null check (category in ('ACADEMIC','EXAMINATION','ACTIVITY','MEETING','ADMISSIONS','HOLIDAY','CEREMONY','OTHER')),
  audience text not null default 'PUBLIC' check (audience in ('PUBLIC','PARENTS','STUDENTS','TEACHERS','STAFF')),
  starts_at timestamptz not null,
  ends_at timestamptz,
  all_day boolean not null default false,
  location text,
  status text not null default 'DRAFT' check (status in ('DRAFT','REVIEW','APPROVED','PUBLISHED','ARCHIVED')),
  published_at timestamptz,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, slug),
  check (ends_at is null or ends_at >= starts_at),
  check ((status = 'PUBLISHED' and published_at is not null) or status <> 'PUBLISHED')
);

create index if not exists school_events_public_window_idx
  on school_events(school_id, starts_at, ends_at)
  where status = 'PUBLISHED' and audience = 'PUBLIC';

create index if not exists school_events_status_idx
  on school_events(school_id, status, starts_at);

create index if not exists school_events_audience_idx
  on school_events(school_id, audience, starts_at);

create or replace function touch_school_event_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists school_events_updated_at on school_events;
create trigger school_events_updated_at
before update on school_events
for each row execute function touch_school_event_updated_at();
