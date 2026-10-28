-- Fee and payment records. Amounts, fee items and payment methods are entered by the school
-- administration; nothing here hard-codes a fee schedule or a payment provider.
create sequence if not exists receipt_number_seq;

create table if not exists fee_items (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  academic_year_id uuid not null references academic_years(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 120),
  term text not null check (length(trim(term)) between 1 and 40),
  amount numeric(12,2) not null check (amount >= 0),
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete restrict,
  academic_year_id uuid not null references academic_years(id) on delete restrict,
  term text not null,
  total numeric(12,2) not null check (total >= 0),
  created_at timestamptz not null default now()
);
create index if not exists invoices_school_student_idx on invoices(school_id, student_id);

create table if not exists invoice_lines (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  fee_item_id uuid references fee_items(id) on delete set null,
  description text not null,
  amount numeric(12,2) not null check (amount >= 0)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  invoice_id uuid not null references invoices(id) on delete restrict,
  amount numeric(12,2) not null check (amount > 0),
  method text not null check (method in ('CASH','BANK_TRANSFER','MOBILE_MONEY','CHEQUE','OTHER')),
  reference text,
  receipt_number text not null,
  received_on date not null default current_date,
  recorded_by uuid,
  created_at timestamptz not null default now(),
  unique (school_id, receipt_number)
);
create index if not exists payments_invoice_idx on payments(invoice_id);
alter table fee_items enable row level security;
alter table invoices enable row level security;
alter table invoice_lines enable row level security;
alter table payments enable row level security;
