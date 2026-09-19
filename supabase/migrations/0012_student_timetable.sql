create table if not exists student_timetable_entries (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  academic_year_id uuid not null references academic_years(id) on delete cascade,
  class_id uuid not null references classes(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 1 and 7),
  period_number smallint not null check (period_number between 1 and 12),
  starts_at time not null,
  ends_at time not null check (ends_at > starts_at),
  subject text not null check (length(trim(subject)) between 1 and 120),
  teacher_name text,
  room text,
  created_at timestamptz not null default now(),
  unique (school_id, academic_year_id, class_id, day_of_week, period_number)
);

create index if not exists student_timetable_scope_idx
  on student_timetable_entries(school_id, academic_year_id, class_id, day_of_week, period_number);

create or replace function enforce_student_timetable_school_integrity()
returns trigger
language plpgsql
as $$
begin
  if not exists (
    select 1 from academic_years ay
    where ay.id = new.academic_year_id and ay.school_id = new.school_id
  ) then
    raise exception 'STUDENT_TIMETABLE_ACADEMIC_YEAR_SCHOOL_MISMATCH';
  end if;
  if not exists (
    select 1 from classes c
    where c.id = new.class_id and c.school_id = new.school_id
  ) then
    raise exception 'STUDENT_TIMETABLE_CLASS_SCHOOL_MISMATCH';
  end if;
  return new;
end;
$$;

drop trigger if exists student_timetable_school_integrity on student_timetable_entries;
create trigger student_timetable_school_integrity
before insert or update on student_timetable_entries
for each row execute function enforce_student_timetable_school_integrity();
