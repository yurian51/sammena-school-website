create table if not exists contact_message_rate_limits (
  ip_hash text primary key,
  window_started_at timestamptz not null,
  submission_count integer not null default 0 check (submission_count >= 0),
  updated_at timestamptz not null default now()
);

create index if not exists contact_message_rate_limits_updated_idx
  on contact_message_rate_limits(updated_at);

create or replace function cleanup_contact_message_rate_limits()
returns void
language sql
security invoker
as $$
  delete from contact_message_rate_limits
  where updated_at < now() - interval '24 hours';
$$;
