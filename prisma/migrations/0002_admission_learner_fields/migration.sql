ALTER TABLE "AdmissionApplication"
  ADD COLUMN "learnerFullName" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "learnerDateOfBirth" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "learnerPreviousSchool" TEXT;

ALTER TABLE "AdmissionApplication"
  ALTER COLUMN "learnerFullName" DROP DEFAULT,
  ALTER COLUMN "learnerDateOfBirth" DROP DEFAULT;
