-- Messages from the school to parents. Audience: ALL families, one CLASS, or one STUDENT's guardians.
create table if not exists parent_messages (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  audience text not null check (audience in ('ALL','CLASS','STUDENT')),
  class_id uuid references classes(id) on delete cascade,
  student_id uuid references students(id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 160),
  body text not null check (length(trim(body)) between 1 and 5000),
  created_by uuid,
  created_at timestamptz not null default now(),
  check ((audience = 'ALL') or (audience = 'CLASS' and class_id is not null) or (audience = 'STUDENT' and student_id is not null))
);
create index if not exists parent_messages_school_idx on parent_messages(school_id, created_at desc);
alter table parent_messages enable row level security;
