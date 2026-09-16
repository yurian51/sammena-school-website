import { z } from "zod"
import { EVENT_AUDIENCES, EVENT_CATEGORIES, EVENT_STATUSES, type CreateSchoolEventInput, type EventStatus } from "./types"
import { PostgresCalendarRepository } from "../db/repositories/calendar-postgres"

const createSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180),
  description: z.string().max(5000).optional(),
  category: z.enum(EVENT_CATEGORIES),
  audience: z.enum(EVENT_AUDIENCES).optional(),
  startsAt: z.string().datetime({ offset: true }),
  endsAt: z.string().datetime({ offset: true }).optional(),
  allDay: z.boolean().optional(),
  location: z.string().trim().max(240).optional(),
})

export function validateCreateSchoolEvent(input: unknown): CreateSchoolEventInput {
  const parsed = createSchema.safeParse(input)
  if (!parsed.success) throw new Error("VALIDATION_ERROR")
  if (parsed.data.endsAt && new Date(parsed.data.endsAt).getTime() < new Date(parsed.data.startsAt).getTime()) {
    throw new Error("VALIDATION_ERROR")
  }
  return parsed.data
}

export function validateEventStatus(input: unknown): EventStatus {
  const parsed = z.enum(EVENT_STATUSES).safeParse(input)
  if (!parsed.success) throw new Error("VALIDATION_ERROR")
  return parsed.data
}

export function createCalendarRepository(schoolId: string) {
  if (!schoolId.trim()) throw new Error("SCHOOL_SCOPE_REQUIRED")
  return new PostgresCalendarRepository(schoolId)
}
