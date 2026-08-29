CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "AdmissionGuardian" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "fullName" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "relationship" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AdmissionGuardian_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AdmissionApplication" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "reference" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "academicYear" TEXT NOT NULL,
  "entry" TEXT NOT NULL,
  "studyType" TEXT NOT NULL,
  "submittedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "guardianId" UUID NOT NULL,
  CONSTRAINT "AdmissionApplication_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AdmissionApplication_reference_key" ON "AdmissionApplication"("reference");
CREATE INDEX "AdmissionApplication_status_idx" ON "AdmissionApplication"("status");
CREATE INDEX "AdmissionApplication_submittedAt_idx" ON "AdmissionApplication"("submittedAt");
CREATE INDEX "AdmissionGuardian_phone_idx" ON "AdmissionGuardian"("phone");
ALTER TABLE "AdmissionApplication" ADD CONSTRAINT "AdmissionApplication_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "AdmissionGuardian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "AdmissionDocument" ("id" UUID NOT NULL DEFAULT gen_random_uuid(), "applicationId" UUID NOT NULL, "key" TEXT NOT NULL, "label" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'MISSING', "objectKey" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "AdmissionDocument_pkey" PRIMARY KEY ("id"));
CREATE INDEX "AdmissionDocument_applicationId_status_idx" ON "AdmissionDocument"("applicationId", "status");
ALTER TABLE "AdmissionDocument" ADD CONSTRAINT "AdmissionDocument_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "AdmissionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "AdmissionReviewerAssignment" ("id" UUID NOT NULL DEFAULT gen_random_uuid(), "applicationId" UUID NOT NULL, "reviewerId" TEXT NOT NULL, "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AdmissionReviewerAssignment_pkey" PRIMARY KEY ("id"));
CREATE INDEX "AdmissionReviewerAssignment_reviewerId_idx" ON "AdmissionReviewerAssignment"("reviewerId");
ALTER TABLE "AdmissionReviewerAssignment" ADD CONSTRAINT "AdmissionReviewerAssignment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "AdmissionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "AdmissionReviewNote" ("id" UUID NOT NULL DEFAULT gen_random_uuid(), "applicationId" UUID NOT NULL, "authorId" TEXT NOT NULL, "body" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AdmissionReviewNote_pkey" PRIMARY KEY ("id"));
CREATE INDEX "AdmissionReviewNote_applicationId_createdAt_idx" ON "AdmissionReviewNote"("applicationId", "createdAt");
ALTER TABLE "AdmissionReviewNote" ADD CONSTRAINT "AdmissionReviewNote_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "AdmissionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "AdmissionAuditEvent" ("id" UUID NOT NULL DEFAULT gen_random_uuid(), "applicationId" UUID NOT NULL, "action" TEXT NOT NULL, "actorId" TEXT, "fromStatus" TEXT, "toStatus" TEXT, "reason" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AdmissionAuditEvent_pkey" PRIMARY KEY ("id"));
CREATE INDEX "AdmissionAuditEvent_applicationId_createdAt_idx" ON "AdmissionAuditEvent"("applicationId", "createdAt");
ALTER TABLE "AdmissionAuditEvent" ADD CONSTRAINT "AdmissionAuditEvent_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "AdmissionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "AdmissionNotification" ("id" UUID NOT NULL DEFAULT gen_random_uuid(), "applicationId" UUID NOT NULL, "channel" TEXT NOT NULL, "event" TEXT NOT NULL, "deliveryState" TEXT NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AdmissionNotification_pkey" PRIMARY KEY ("id"));
CREATE INDEX "AdmissionNotification_deliveryState_createdAt_idx" ON "AdmissionNotification"("deliveryState", "createdAt");
ALTER TABLE "AdmissionNotification" ADD CONSTRAINT "AdmissionNotification_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "AdmissionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
