create table if not exists guardian_accounts (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  guardian_id uuid not null references guardians(id) on delete cascade,
  user_id uuid not null,
  created_at timestamptz not null default now(),
  unique (school_id, user_id),
  unique (guardian_id, user_id)
);

create index if not exists guardian_accounts_guardian_idx on guardian_accounts(guardian_id);
create index if not exists guardian_accounts_user_school_idx on guardian_accounts(user_id, school_id);

create or replace view parent_linked_students as
select
  ga.user_id,
  ga.school_id,
  s.id as student_id
from guardian_accounts ga
join student_guardians sg on sg.guardian_id = ga.guardian_id
join students s on s.id = sg.student_id and s.school_id = ga.school_id;
