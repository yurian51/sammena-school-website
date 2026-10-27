-- Messages submitted through the public contact form. Only server-side access
-- (DATABASE_URL credentials) reads or writes this table; RLS denies anon/authenticated by default.
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  status text not null default 'NEW' check (status in ('NEW','IN_PROGRESS','RESOLVED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_messages_status_created_idx on contact_messages(status, created_at desc);

alter table contact_messages enable row level security;
