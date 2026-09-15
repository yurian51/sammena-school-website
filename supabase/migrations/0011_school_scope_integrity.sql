-- Enforce tenant/school boundaries at the database layer.
-- This migration was added after the original 0007 portal integrity migration,
-- so it receives a unique version instead of colliding with 0007.

create unique index if not exists academic_years_id_school_uidx on academic_years(id, school_id);
create unique index if not exists classes_id_school_uidx on classes(id, school_id);
create unique index if not exists students_id_school_uidx on students(id, school_id);
create unique index if not exists guardians_id_school_uidx on guardians(id, school_id);

alter table enrollments
  add constraint enrollments_student_school_fk
  foreign key (student_id, school_id) references students(id, school_id);

alter table enrollments
  add constraint enrollments_academic_year_school_fk
  foreign key (academic_year_id, school_id) references academic_years(id, school_id);

alter table enrollments
  add constraint enrollments_class_school_fk
  foreign key (class_id, school_id) references classes(id, school_id);

alter table attendance_records
  add constraint attendance_student_school_fk
  foreign key (student_id, school_id) references students(id, school_id);

alter table assessments
  add constraint assessments_student_school_fk
  foreign key (student_id, school_id) references students(id, school_id);

alter table student_guardians add column if not exists school_id uuid;

update student_guardians sg
set school_id = s.school_id
from students s
where s.id = sg.student_id
  and sg.school_id is null;

alter table student_guardians alter column school_id set not null;

alter table student_guardians
  add constraint student_guardians_student_school_fk
  foreign key (student_id, school_id) references students(id, school_id);

alter table student_guardians
  add constraint student_guardians_guardian_school_fk
  foreign key (guardian_id, school_id) references guardians(id, school_id);

create index if not exists student_guardians_school_idx on student_guardians(school_id, student_id, guardian_id);

create unique index if not exists library_books_id_school_uidx on library_books(id, school_id);

alter table library_issues
  add constraint library_issues_book_school_fk
  foreign key (book_id, school_id) references library_books(id, school_id);

alter table library_issues
  add constraint library_issues_student_school_fk
  foreign key (student_id, school_id) references students(id, school_id);

alter table quality_indicators add column if not exists school_id uuid;

update quality_indicators qi
set school_id = qd.school_id
from quality_domains qd
where qd.id = qi.domain_id
  and qi.school_id is null;

alter table quality_indicators alter column school_id set not null;

create unique index if not exists quality_indicators_id_school_uidx on quality_indicators(id, school_id);
create unique index if not exists quality_domains_id_school_uidx on quality_domains(id, school_id);

alter table quality_indicators
  add constraint quality_indicators_domain_school_fk
  foreign key (domain_id, school_id) references quality_domains(id, school_id);

alter table quality_evidence
  add constraint quality_evidence_indicator_school_fk
  foreign key (indicator_id, school_id) references quality_indicators(id, school_id);
