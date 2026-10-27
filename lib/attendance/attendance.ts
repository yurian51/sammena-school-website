import { z } from "zod"

export const ATTENDANCE_STATUSES = ["PRESENT", "ABSENT", "LATE", "EXCUSED"] as const
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number]

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")

export const attendanceRosterQuery = z.object({
  classId: z.string().uuid(),
  date: isoDate,
})

export const attendanceSubmission = z.object({
  classId: z.string().uuid(),
  date: isoDate,
  records: z
    .array(z.object({ studentId: z.string().uuid(), status: z.enum(ATTENDANCE_STATUSES) }))
    .min(1)
    .max(500),
})

/** Returns true only for real calendar dates (rejects 2026-02-30 and similar). */
export function isValidCalendarDate(date: string): boolean {
  const parsed = new Date(`${date}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date
}

/** Today's date in Tanzania (UTC+3) as YYYY-MM-DD. Attendance is for the school day, not UTC. */
export function todayInTanzania(now: Date = new Date()): string {
  return new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

/** Attendance cannot be recorded for a future date. Dates compare lexicographically in ISO form. */
export function isNotInFuture(date: string, today: string = todayInTanzania()): boolean {
  return date <= today
}

export function findDuplicateStudents(records: ReadonlyArray<{ studentId?: string }>): string[] {
  const seen = new Set<string>()
  const duplicates = new Set<string>()
  for (const record of records) {
    if (!record.studentId) continue
    if (seen.has(record.studentId)) duplicates.add(record.studentId)
    seen.add(record.studentId)
  }
  return [...duplicates]
}
