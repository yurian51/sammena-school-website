-- Prevent tenant-crossing relational records in the portal schema.
-- Existing rows are not rewritten here; future writes are rejected when the
-- child's school_id does not match its referenced school-owned record.

create or replace function enforce_portal_school_integrity()
returns trigger
language plpgsql
as $$
declare
  referenced_school uuid;
begin
  if tg_table_name = 'enrollments' then
    select school_id into referenced_school from students where id = new.student_id;
    if referenced_school is null or referenced_school <> new.school_id then
      raise exception 'ENROLLMENT_SCHOOL_MISMATCH';
    end if;
    select school_id into referenced_school from academic_years where id = new.academic_year_id;
    if referenced_school is null or referenced_school <> new.school_id then
      raise exception 'ENROLLMENT_ACADEMIC_YEAR_SCHOOL_MISMATCH';
    end if;
    select school_id into referenced_school from classes where id = new.class_id;
    if referenced_school is null or referenced_school <> new.school_id then
      raise exception 'ENROLLMENT_CLASS_SCHOOL_MISMATCH';
    end if;
  elsif tg_table_name = 'attendance_records' then
    select school_id into referenced_school from students where id = new.student_id;
    if referenced_school is null or referenced_school <> new.school_id then
      raise exception 'ATTENDANCE_SCHOOL_MISMATCH';
    end if;
  elsif tg_table_name = 'assessments' then
    select school_id into referenced_school from students where id = new.student_id;
    if referenced_school is null or referenced_school <> new.school_id then
      raise exception 'ASSESSMENT_SCHOOL_MISMATCH';
    end if;
  elsif tg_table_name = 'library_issues' then
    select school_id into referenced_school from library_books where id = new.book_id;
    if referenced_school is null or referenced_school <> new.school_id then
      raise exception 'LIBRARY_BOOK_SCHOOL_MISMATCH';
    end if;
    select school_id into referenced_school from students where id = new.student_id;
    if referenced_school is null or referenced_school <> new.school_id then
      raise exception 'LIBRARY_STUDENT_SCHOOL_MISMATCH';
    end if;
  elsif tg_table_name = 'quality_evidence' then
    select qd.school_id into referenced_school
    from quality_indicators qi
    join quality_domains qd on qd.id = qi.domain_id
    where qi.id = new.indicator_id;
    if referenced_school is null or referenced_school <> new.school_id then
      raise exception 'QUALITY_INDICATOR_SCHOOL_MISMATCH';
    end if;
  end if;

  return new;
end;
$$;

create or replace trigger enrollments_school_integrity
before insert or update on enrollments
for each row execute function enforce_portal_school_integrity();

create or replace trigger attendance_school_integrity
before insert or update on attendance_records
for each row execute function enforce_portal_school_integrity();

create or replace trigger assessments_school_integrity
before insert or update on assessments
for each row execute function enforce_portal_school_integrity();

create or replace trigger library_issues_school_integrity
before insert or update on library_issues
for each row execute function enforce_portal_school_integrity();

create or replace trigger quality_evidence_school_integrity
before insert or update on quality_evidence
for each row execute function enforce_portal_school_integrity();
