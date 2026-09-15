create table if not exists student_accounts (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  user_id uuid not null,
  created_at timestamptz not null default now(),
  unique (school_id, user_id),
  unique (student_id),
  unique (student_id, user_id)
);

create index if not exists student_accounts_student_idx on student_accounts(student_id);
create index if not exists student_accounts_user_school_idx on student_accounts(user_id, school_id);

create or replace view student_linked_accounts as
select sa.user_id, sa.school_id, s.id as student_id
from student_accounts sa
join students s on s.id = sa.student_id and s.school_id = sa.school_id;

create index if not exists assessments_student_school_date_idx on assessments(student_id, school_id, assessed_at desc);
create index if not exists attendance_student_school_date_idx on attendance_records(student_id, school_id, attendance_date desc);
