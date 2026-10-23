-- School-managed accounts. Passwords are stored only as scrypt hashes.
create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete restrict,
  email text not null,
  display_name text not null,
  role text not null check (role in ('SCHOOL_ADMIN','EDITOR','TEACHER','PARENT','STUDENT')),
  password_hash text not null,
  is_active boolean not null default true,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, email)
);

create index if not exists app_users_school_role_idx on app_users(school_id, role);
create index if not exists app_users_school_active_idx on app_users(school_id, is_active);

create table if not exists app_auth_audit (
  id bigserial primary key,
  school_id uuid not null references schools(id) on delete restrict,
  actor_id text not null,
  action text not null check (action in ('ACCOUNT_CREATED','ACCOUNT_UPDATED','ACCOUNT_DISABLED','ACCOUNT_ENABLED','ACCOUNT_DELETED','LOGIN_FAILED')),
  target_user_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists app_auth_audit_school_created_idx on app_auth_audit(school_id, created_at desc);
