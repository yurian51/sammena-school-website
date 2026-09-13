create table if not exists academic_years (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null,
  starts_on date not null,
  ends_on date not null,
  is_current boolean not null default false,
  created_at timestamptz not null default now(),
  unique (school_id, name),
  check (ends_on >= starts_on)
);

create unique index if not exists academic_years_one_current_idx on academic_years(school_id) where is_current;

create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null,
  level_order integer not null,
  created_at timestamptz not null default now(),
  unique (school_id, name),
  unique (school_id, level_order)
);

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  admission_number text not null,
  first_name text not null,
  middle_name text,
  last_name text not null,
  gender text not null check (gender in ('MALE','FEMALE')),
  date_of_birth date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, admission_number)
);
create index if not exists students_school_active_idx on students(school_id, is_active);

create table if not exists guardians (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  full_name text not null,
  phone text not null,
  email text,
  relationship text,
  created_at timestamptz not null default now()
);
create index if not exists guardians_school_phone_idx on guardians(school_id, phone);

create table if not exists student_guardians (
  student_id uuid not null references students(id) on delete cascade,
  guardian_id uuid not null references guardians(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (student_id, guardian_id)
);
create unique index if not exists student_guardians_one_primary_idx on student_guardians(student_id) where is_primary;

create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  academic_year_id uuid not null references academic_years(id) on delete restrict,
  class_id uuid not null references classes(id) on delete restrict,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','TRANSFERRED','GRADUATED','INACTIVE')),
  started_on date not null default current_date,
  ended_on date,
  created_at timestamptz not null default now(),
  unique (student_id, academic_year_id),
  check (ended_on is null or ended_on >= started_on)
);
create index if not exists enrollments_school_class_idx on enrollments(school_id, class_id, status);
create index if not exists enrollments_student_idx on enrollments(student_id, academic_year_id);

create table if not exists attendance_records (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  attendance_date date not null,
  status text not null check (status in ('PRESENT','ABSENT','LATE','EXCUSED')),
  recorded_by uuid,
  created_at timestamptz not null default now(),
  unique (student_id, attendance_date)
);
create index if not exists attendance_school_date_idx on attendance_records(school_id, attendance_date);
create index if not exists attendance_student_date_idx on attendance_records(student_id, attendance_date desc);

create table if not exists assessments (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  subject text not null,
  assessment_name text not null,
  term text not null,
  score numeric(7,2) not null,
  max_score numeric(7,2) not null,
  assessed_at date not null,
  created_at timestamptz not null default now(),
  check (score >= 0),
  check (max_score > 0),
  check (score <= max_score)
);
create index if not exists assessments_school_date_idx on assessments(school_id, assessed_at desc);
create index if not exists assessments_student_idx on assessments(student_id, assessed_at desc);

create table if not exists library_books (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  accession_number text not null,
  title text not null,
  author text not null,
  category text not null,
  quantity integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, accession_number),
  check (quantity >= 0)
);

create table if not exists library_issues (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  book_id uuid not null references library_books(id) on delete restrict,
  student_id uuid not null references students(id) on delete restrict,
  issued_at timestamptz not null default now(),
  returned_at timestamptz,
  created_at timestamptz not null default now(),
  check (returned_at is null or returned_at >= issued_at)
);
create index if not exists library_books_school_category_idx on library_books(school_id, category);
create index if not exists library_issues_school_open_idx on library_issues(school_id, returned_at) where returned_at is null;

create table if not exists quality_domains (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (school_id, name)
);

create table if not exists quality_indicators (
  id uuid primary key default gen_random_uuid(),
  domain_id uuid not null references quality_domains(id) on delete cascade,
  name text not null,
  status text not null default 'NOT_ASSESSED' check (status in ('NOT_ASSESSED','MET','PARTIALLY_MET','NOT_MET')),
  score numeric(5,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (domain_id, name),
  check (score is null or (score >= 0 and score <= 100))
);

create table if not exists quality_evidence (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  indicator_id uuid not null references quality_indicators(id) on delete cascade,
  label text not null,
  object_key text not null,
  uploaded_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists quality_actions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  title text not null,
  owner_id uuid,
  due_on date,
  progress integer not null default 0,
  status text not null default 'OPEN' check (status in ('OPEN','IN_PROGRESS','COMPLETED','CANCELLED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (progress between 0 and 100)
);

create index if not exists quality_domains_school_idx on quality_domains(school_id, sort_order);
create index if not exists quality_evidence_indicator_idx on quality_evidence(indicator_id, created_at desc);
create index if not exists quality_actions_school_status_idx on quality_actions(school_id, status, due_on);
