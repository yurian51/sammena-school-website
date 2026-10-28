alter table "AdmissionApplication"
  add column if not exists "submissionFingerprint" TEXT,
  add column if not exists "idempotencyKey" TEXT;

create unique index if not exists "AdmissionApplication_submissionFingerprint_key"
  on "AdmissionApplication" ("submissionFingerprint")
  where "submissionFingerprint" is not null;

create unique index if not exists "AdmissionApplication_idempotencyKey_key"
  on "AdmissionApplication" ("idempotencyKey")
  where "idempotencyKey" is not null;

create index if not exists "AdmissionApplication_phone_createdAt_idx"
  on "AdmissionGuardian" ("phone", "createdAt" desc);
