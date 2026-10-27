import { z } from "zod"

const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use 24-hour time such as 08:00")

export const timetableInput = z
  .object({
    classId: z.string().uuid(),
    dayOfWeek: z.number().int().min(1).max(7),
    periodNumber: z.number().int().min(1).max(12),
    startsAt: hhmm,
    endsAt: hhmm,
    subject: z.string().trim().min(1).max(120),
    teacherName: z.string().trim().max(120).optional().default(""),
    room: z.string().trim().max(60).optional().default(""),
  })
  .refine((value) => value.endsAt > value.startsAt, { message: "The period must end after it starts", path: ["endsAt"] })

/** Two periods on the same day overlap when each starts before the other ends. */
export function periodsOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return aStart < bEnd && bStart < aEnd
}
