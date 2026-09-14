create index if not exists enrollments_school_student_status_created_idx
  on enrollments(school_id, student_id, status, created_at desc);

create index if not exists assessments_school_student_date_idx
  on assessments(school_id, student_id, assessed_at desc, created_at desc);

create index if not exists library_issues_school_book_open_idx
  on library_issues(school_id, book_id)
  where returned_at is null;
