-- Which teacher (portal user) may record attendance and manage timetable for which class.
create table if not exists teacher_class_assignments (
  school_id uuid not null references schools(id) on delete cascade,
  user_id uuid not null,
  class_id uuid not null references classes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, class_id)
);
create index if not exists teacher_class_assignments_school_idx on teacher_class_assignments(school_id, class_id);
alter table teacher_class_assignments enable row level security;
