-- Scope public enquiries to a school. Nullable on purpose: existing rows are backfilled below
-- where the school exists; the application always writes and filters by school_id.
alter table contact_messages add column if not exists school_id uuid references schools(id) on delete cascade;
update contact_messages
   set school_id = (select id from schools where slug = 'sammena-pre-primary-school' limit 1)
 where school_id is null;
create index if not exists contact_messages_school_status_idx on contact_messages(school_id, status, created_at desc);
