import { z } from "zod"

// Enrollment statuses match lib/sis/enrollment-service.ts. Migration 0020 aligns the database check constraint.
export const ENROLLMENT_CLOSE_STATUSES = ["TRANSFERRED", "WITHDRAWN", "GRADUATED"] as const
export const GUARDIAN_RELATIONSHIPS = ["PARENT", "GUARDIAN", "SPONSOR", "OTHER"] as const

export const placeInput = z.object({ studentId: z.string().uuid(), classId: z.string().uuid() })
export const moveInput = z.object({ classId: z.string().uuid() })
export const closeInput = z.object({ status: z.enum(ENROLLMENT_CLOSE_STATUSES) })

export const guardianInput = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(20).regex(/^[+\d][\d\s-]{6,19}$/, "Enter a valid phone number"),
  email: z.string().trim().email().max(254).optional().or(z.literal("")),
  relationship: z.enum(GUARDIAN_RELATIONSHIPS),
  isPrimary: z.boolean().default(false),
})

export const uuid = z.string().uuid()
