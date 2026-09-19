-- Harden tenant boundaries for junction records that do not carry school_id.
-- Both sides of the relationship must belong to the same school.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM student_guardians sg
    JOIN students s ON s.id = sg.student_id
    JOIN guardians g ON g.id = sg.guardian_id
    WHERE s.school_id <> g.school_id
  ) THEN
    RAISE EXCEPTION 'EXISTING_STUDENT_GUARDIAN_SCHOOL_MISMATCH';
  END IF;
END;
$$;

create or replace function enforce_student_guardian_school_integrity()
returns trigger
language plpgsql
as $$
declare
  student_school uuid;
  guardian_school uuid;
begin
  select school_id into student_school from students where id = new.student_id;
  select school_id into guardian_school from guardians where id = new.guardian_id;

  if student_school is null or guardian_school is null or student_school <> guardian_school then
    raise exception 'STUDENT_GUARDIAN_SCHOOL_MISMATCH';
  end if;

  return new;
end;
$$;

drop trigger if exists student_guardians_school_integrity on student_guardians;
create trigger student_guardians_school_integrity
before insert or update on student_guardians
for each row execute function enforce_student_guardian_school_integrity();
