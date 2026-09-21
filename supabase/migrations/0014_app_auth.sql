create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  identifier text not null,
  password_hash text not null,
  role text not null check (role in ('SUPER_ADMIN','SCHOOL_ADMIN','EDITOR','TEACHER','PARENT','STUDENT')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, identifier),
  unique (id, school_id)
);

create index if not exists app_users_school_role_idx on app_users(school_id, role, is_active);
create index if not exists app_users_identifier_idx on app_users(lower(identifier));

create table if not exists app_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  school_id uuid not null references schools(id) on delete cascade,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  last_seen_at timestamptz not null default now(),
  user_agent text,
  ip_hash text,
  created_at timestamptz not null default now(),
  unique (id, user_id, school_id)
);

create index if not exists app_sessions_active_idx
  on app_sessions(user_id, school_id, expires_at)
  where revoked_at is null;

alter table guardian_accounts
  add constraint guardian_accounts_user_school_fk
  foreign key (user_id, school_id) references app_users(id, school_id);

alter table student_accounts
  add constraint student_accounts_user_school_fk
  foreign key (user_id, school_id) references app_users(id, school_id);
