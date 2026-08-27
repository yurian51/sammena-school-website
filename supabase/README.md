# SAMMENA Supabase

This directory contains versioned PostgreSQL migrations for the SAMMENA backend.

## Migration order

1. `0001_core.sql` - schools and admissions applications
2. `0002_cms.sql` - public/editorial content
3. `0003_audit.sql` - audit events

## Safety

Migrations are source-controlled and must be applied in order. Do not edit an already-applied production migration. Create a new numbered migration for changes.

Production credentials and service-role keys must never be committed to this repository.
