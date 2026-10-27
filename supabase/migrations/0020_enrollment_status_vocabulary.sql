-- Align the database with the enrollment lifecycle in lib/sis/enrollment-service.ts.
-- The original inline check (migration 0006) only allowed ACTIVE/TRANSFERRED/GRADUATED/INACTIVE.
alter table enrollments drop constraint if exists enrollments_status_check;
alter table enrollments add constraint enrollments_status_check
  check (status in ('PENDING','ACTIVE','PROMOTED','REPEATED','TRANSFERRED','WITHDRAWN','GRADUATED','CANCELLED','INACTIVE'));
