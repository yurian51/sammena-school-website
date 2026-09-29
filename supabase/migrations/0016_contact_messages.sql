create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  sender_name text not null,
  sender_email text not null,
  sender_phone text,
  subject text not null,
  message text not null,
  status text not null default 'UNREAD' check (status in ('UNREAD','READ','REPLIED','ARCHIVED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_messages_school_status_idx on contact_messages(school_id, status);
create index if not exists contact_messages_school_created_idx on contact_messages(school_id, created_at desc);
