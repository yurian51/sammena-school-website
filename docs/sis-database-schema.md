# SAMMENA SIS Database Schema Specification

This document is the canonical pre-migration schema contract. It does not claim that these tables already exist in PostgreSQL.

## Core tenancy

### schools
- `id` UUID/text primary key
- `name` text not null
- `code` text not null
- unique `(code)`
- timestamps

### campuses
- `id` primary key
- `school_id` foreign key → schools.id, not null
- `name` text not null
- `code` text not null
- `is_active` boolean not null default true
- unique `(school_id, code)`

### education_levels
- `id` primary key
- `school_id` foreign key → schools.id
- `code` PRE_SCHOOL | PRIMARY | SECONDARY
- `name` text not null
- `is_active` boolean not null default true
- unique `(school_id, code)`

## Academic structure

### academic_years
- `id` primary key
- `school_id` foreign key → schools.id
- `name` text not null
- `starts_on` date not null
- `ends_on` date not null
- `is_current` boolean not null default false
- unique `(school_id, name)`

### terms
- `id` primary key
- `academic_year_id` foreign key → academic_years.id
- `name` text not null
- `starts_on` date not null
- `ends_on` date not null
- `sequence` integer not null
- unique `(academic_year_id, sequence)`

### classes
- `id` primary key
- `school_id` foreign key → schools.id
- `academic_year_id` foreign key → academic_years.id
- `education_level_id` foreign key → education_levels.id
- `name` text not null
- `code` text not null
- unique `(school_id, academic_year_id, code)`

### streams
- `id` primary key
- `class_id` foreign key → classes.id
- `name` text not null
- `code` text not null
- `capacity` integer nullable
- unique `(class_id, code)`

## Learners

### students
- `id` primary key
- `school_id` foreign key → schools.id
- `admission_number` text not null
- `first_name` text not null
- `middle_name` text nullable
- `last_name` text not null
- `date_of_birth` date nullable
- `is_active` boolean not null default true
- unique `(school_id, admission_number)`

### enrollments
- `id` primary key
- `school_id` foreign key → schools.id
- `student_id` foreign key → students.id
- `academic_year_id` foreign key → academic_years.id
- `class_id` foreign key → classes.id
- `stream_id` foreign key → streams.id nullable
- `status` text not null
- `enrolled_at` timestamptz not null
- index `(school_id, student_id, academic_year_id)`

## Design constraints

1. Every tenant-owned table must carry or resolve to `school_id`.
2. Student identity is stable across academic years.
3. Enrollment stores historical placement.
4. Admission numbers are unique per school, not globally.
5. Foreign keys must prevent orphaned academic records.
6. Migration implementation must be reviewed against the actual existing database before execution.
