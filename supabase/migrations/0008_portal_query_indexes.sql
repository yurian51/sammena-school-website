-- Composite indexes for the school-scoped portal aggregates.
-- These match the actual predicates used by attendance, assessment and
-- library subqueries so tenant filtering does not force broad scans as data grows.

create index if not exists attendance_student_school_date_idx
  on attendance_records(student_id, school_id, attendance_date desc);

create index if not exists assessments_student_school_date_idx
  on assessments(student_id, school_id, assessed_at desc);

create index if not exists library_issues_book_school_open_idx
  on library_issues(book_id, school_id, returned_at)
  where returned_at is null;

create index if not exists library_issues_student_school_open_idx
  on library_issues(student_id, school_id, returned_at)
  where returned_at is null;
