create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  request_id text,
  created_at timestamptz not null default now()
);

create index if not exists audit_events_entity_idx on audit_events(entity_type, entity_id);
create index if not exists audit_events_created_at_idx on audit_events(created_at desc);
