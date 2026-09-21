-- Production integrity hardening for the existing SIS tables.
-- This migration is additive and does not rewrite historical data.

create unique index if not exists assessments_duplicate_guard_idx
  on assessments(student_id, school_id, subject, assessment_name, term, assessed_at);

create or replace function enforce_assessment_student_school_integrity()
returns trigger
language plpgsql
as $$
begin
  if not exists (
    select 1 from students s
    where s.id = new.student_id
      and s.school_id = new.school_id
  ) then
    raise exception 'ASSESSMENT_STUDENT_SCHOOL_MISMATCH';
  end if;
  if new.score < 0 or new.score > new.max_score then
    raise exception 'ASSESSMENT_SCORE_OUT_OF_RANGE';
  end if;
  return new;
end;
$$;

drop trigger if exists assessment_student_school_integrity on assessments;
create trigger assessment_student_school_integrity
before insert or update on assessments
for each row execute function enforce_assessment_student_school_integrity();

create or replace function enforce_enrollment_school_integrity()
returns trigger
language plpgsql
as $$
begin
  if not exists (select 1 from students s where s.id = new.student_id and s.school_id = new.school_id) then
    raise exception 'ENROLLMENT_STUDENT_SCHOOL_MISMATCH';
  end if;
  if not exists (select 1 from academic_years ay where ay.id = new.academic_year_id and ay.school_id = new.school_id) then
    raise exception 'ENROLLMENT_ACADEMIC_YEAR_SCHOOL_MISMATCH';
  end if;
  if not exists (select 1 from classes c where c.id = new.class_id and c.school_id = new.school_id) then
    raise exception 'ENROLLMENT_CLASS_SCHOOL_MISMATCH';
  end if;
  return new;
end;
$$;

drop trigger if exists enrollment_school_integrity on enrollments;
create trigger enrollment_school_integrity
before insert or update on enrollments
for each row execute function enforce_enrollment_school_integrity();

create unique index if not exists active_enrollment_per_student_year_idx
  on enrollments(student_id, academic_year_id)
  where status = 'ACTIVE';

create or replace function enforce_attendance_student_school_integrity()
returns trigger
language plpgsql
as $$
begin
  if not exists (
    select 1 from students s
    where s.id = new.student_id
      and s.school_id = new.school_id
  ) then
    raise exception 'ATTENDANCE_STUDENT_SCHOOL_MISMATCH';
  end if;
  return new;
end;
$$;

drop trigger if exists attendance_student_school_integrity on attendance_records;
create trigger attendance_student_school_integrity
before insert or update on attendance_records
for each row execute function enforce_attendance_student_school_integrity();
