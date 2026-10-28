-- Production tenant identity for Sammena Pre & Primary School.
-- This is a real tenant identifier, not demo content.
insert into schools (id, name, slug)
values (
  '4453b19d-62d7-44df-8502-2e69cfb905ed',
  'Sammena Pre & Primary School',
  'sammena-pre-primary-school'
)
on conflict (id) do update
set name = excluded.name,
    slug = excluded.slug;
