import { z } from "zod"

export const educationLevelCodeSchema = z.enum(["PRE_SCHOOL", "PRIMARY", "SECONDARY"])

export const enrollmentStatusSchema = z.enum([
  "PENDING",
  "ACTIVE",
  "PROMOTED",
  "REPEATED",
  "TRANSFERRED",
  "WITHDRAWN",
  "GRADUATED",
  "CANCELLED",
])

const idSchema = z.string().trim().min(1)
const dateSchema = z.string().date()

export const schoolSchema = z.object({
  id: idSchema,
  name: z.string().trim().min(1),
  code: z.string().trim().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const academicYearSchema = z.object({
  id: idSchema,
  schoolId: idSchema,
  name: z.string().trim().min(1),
  startsOn: dateSchema,
  endsOn: dateSchema,
  isCurrent: z.boolean(),
}).refine((value) => value.startsOn <= value.endsOn, {
  message: "Academic year must end on or after its start date",
  path: ["endsOn"],
})

export const enrollmentSchema = z.object({
  id: idSchema,
  schoolId: idSchema,
  studentId: idSchema,
  academicYearId: idSchema,
  classId: idSchema,
  streamId: idSchema.optional(),
  status: enrollmentStatusSchema,
  enrolledAt: z.string().datetime(),
})

export const assessmentSchema = z.object({
  id: idSchema,
  schoolId: idSchema,
  academicYearId: idSchema,
  termId: idSchema,
  subjectId: idSchema,
  name: z.string().trim().min(1),
  maxScore: z.number().positive(),
})

export const resultSchema = z.object({
  id: idSchema,
  schoolId: idSchema,
  assessmentId: idSchema,
  studentId: idSchema,
  score: z.number().nonnegative(),
  grade: z.string().trim().min(1).optional(),
  publishedAt: z.string().datetime().optional(),
})

export const paymentSchema = z.object({
  id: idSchema,
  schoolId: idSchema,
  feeAccountId: idSchema,
  amount: z.number().positive(),
  paidAt: z.string().datetime(),
  reference: z.string().trim().min(1),
  status: z.enum(["PENDING", "CONFIRMED", "REVERSED"]),
})
