ALTER TABLE "AdmissionGuardian"
  ADD COLUMN "secondaryPhone" TEXT,
  ADD COLUMN "nidaNumber" TEXT NOT NULL DEFAULT '';

ALTER TABLE "AdmissionGuardian"
  ALTER COLUMN "nidaNumber" DROP DEFAULT;
