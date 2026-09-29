create table if not exists digital_library_resources (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  slug text not null,
  title text not null,
  kind text not null check (kind in ('TEXTBOOK','SUPPLEMENTARY','CURRICULUM_GUIDE','TEACHER_RESOURCE')),
  education_level text not null,
  subject text not null,
  language text not null check (language in ('English','Kiswahili','Bilingual')),
  source_name text not null,
  source_url text not null,
  reader_url text not null,
  download_url text,
  description text not null default '',
  rights_basis text not null,
  status text not null default 'PUBLISHED' check (status in ('DRAFT','PUBLISHED','ARCHIVED')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, slug),
  check ((status = 'PUBLISHED' and published_at is not null) or status <> 'PUBLISHED')
);

create index if not exists digital_library_resources_public_idx
  on digital_library_resources(school_id, kind, education_level, title)
  where status = 'PUBLISHED';

create or replace function touch_digital_library_resource_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists digital_library_resources_updated_at on digital_library_resources;
create trigger digital_library_resources_updated_at
before update on digital_library_resources
for each row execute function touch_digital_library_resource_updated_at();

insert into digital_library_resources
  (school_id, slug, title, kind, education_level, subject, language, source_name, source_url, reader_url, download_url, description, rights_basis, status, published_at)
values
  ('4453b19d-62d7-44df-8502-2e69cfb905ed', 'tie-standard-4-english-language', 'English Language, Standard Four', 'TEXTBOOK', 'Primary • Standard IV', 'English', 'English', 'Tanzania Institute of Education', 'https://ol.tie.go.tz/', 'https://ol.tie.go.tz/uploaded_files/books/primary/Eng/Std4/English/English_Std_4.html', null, 'Curriculum-aligned primary textbook linked to the official TIE digital repository.', 'Official TIE-hosted public reader', 'PUBLISHED', now()),
  ('4453b19d-62d7-44df-8502-2e69cfb905ed', 'tie-standard-4-hisabati', 'Hisabati, Standard Four', 'TEXTBOOK', 'Primary • Standard IV', 'Mathematics', 'Kiswahili', 'Tanzania Institute of Education', 'https://ol.tie.go.tz/', 'https://ol.tie.go.tz/uploaded_files/books/primary/Eng/Std4/Hisabati/Hisabati_Std_4.html', null, 'Primary mathematics learning resource linked to the official TIE digital repository.', 'Official TIE-hosted public reader', 'PUBLISHED', now()),
  ('4453b19d-62d7-44df-8502-2e69cfb905ed', 'tie-standard-4-arts-and-sports', 'Arts and Sports Pupil’s Book, Standard Four', 'TEXTBOOK', 'Primary • Standard IV', 'Arts and Sports', 'English', 'Tanzania Institute of Education', 'https://ol.tie.go.tz/', 'https://ol.tie.go.tz/uploaded_files/books/primary/Eng/Std4/Art_n_Sports/files/basic-html/page2.html', null, 'Primary arts and sports pupil resource hosted in the official TIE digital repository.', 'Official TIE-hosted public reader', 'PUBLISHED', now()),
  ('4453b19d-62d7-44df-8502-2e69cfb905ed', 'tie-primary-curriculum-std-i-vii', 'Curriculum for Primary Education, Standard I–VII', 'CURRICULUM_GUIDE', 'Primary • Standards I–VII', 'Curriculum', 'English', 'Tanzania Institute of Education', 'https://www.tie.go.tz/', 'https://www.tie.go.tz/uploads/files/Curriculum%20for%20Primary%20Education%20STD%20I-VII%20English%20Medium%20Schools.pdf', 'https://www.tie.go.tz/uploads/files/Curriculum%20for%20Primary%20Education%20STD%20I-VII%20English%20Medium%20Schools.pdf', 'Official national primary education curriculum reference for English-medium schools.', 'Official TIE publication', 'PUBLISHED', now())
on conflict (school_id, slug) do update set
  title = excluded.title,
  kind = excluded.kind,
  education_level = excluded.education_level,
  subject = excluded.subject,
  language = excluded.language,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  reader_url = excluded.reader_url,
  download_url = excluded.download_url,
  description = excluded.description,
  rights_basis = excluded.rights_basis,
  status = excluded.status,
  published_at = excluded.published_at,
  updated_at = now();
