# SAMMENA Supabase

This directory contains versioned PostgreSQL migrations for the SAMMENA backend.

## Migration order

1. `0001_core.sql` - schools and admissions applications
2. `0002_cms.sql` - public/editorial content
3. `0003_audit.sql` - audit events
4. `0004_cms_indexes.sql` - CMS query indexes
5. `0005_cms_metadata.sql` - CMS metadata fields
6. `0006_portal_data.sql` - academic years, classes, students, guardians, attendance, assessments, library and quality data
7. `0007_portal_school_integrity.sql` - school-scope integrity triggers
8. `0008_portal_query_indexes.sql` - portal query indexes
9. `0009_portal_relationship_indexes.sql` - relationship indexes
10. `0010_parent_hub.sql` - guardian accounts and linked students
11. `0011_school_scope_integrity.sql` - composite school-scope constraints
12. `0012_student_hub.sql` - student accounts and linked student view
13. `0013_school_events.sql` - persisted school calendar events and publication controls

## Safety

Migrations are source-controlled and must be applied in order. Do not edit an already-applied production migration. Create a new numbered migration for changes.

Production credentials and service-role keys must never be committed to this repository.
