create extension if not exists pgcrypto;

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  status text not null default 'DRAFT' check (status in ('DRAFT','SUBMITTED','UNDER_REVIEW','ASSESSMENT','DECISION','ACCEPTED','WAITLISTED','DECLINED','ENROLLED')),
  guardian_full_name text not null,
  guardian_phone text not null,
  guardian_email text,
  learner_full_name text not null,
  learner_date_of_birth date not null,
  learner_entry_level text not null,
  learner_previous_school text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_status_idx on applications(status);
create index if not exists applications_created_at_idx on applications(created_at desc);
