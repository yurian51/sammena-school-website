import { z } from "zod"
import { admissionEntryLevels, guardianOccupations, guardianRelationships } from "./options"

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD")

const validCalendarDate = (value: string) => {
  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export { admissionEntryLevels, guardianRelationships, guardianOccupations }

export const admissionApplicationSchema = z.object({
  guardian: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  relationship: z.enum(guardianRelationships),
  occupation: z.enum(guardianOccupations).optional().or(z.literal("")),
  guardianNationality: z.string().trim().max(80).optional().default(""),
  address: z.string().trim().max(240).optional().default(""),
  learner: z.string().trim().min(2).max(120),
  dob: isoDate.refine(validCalendarDate, "Invalid calendar date").refine((value) => value <= new Date().toISOString().slice(0, 10), "Date of birth cannot be in the future"),
  age: z.string().max(3).optional().default(""),
  gender: z.enum(["Male", "Female"]),
  nationality: z.string().trim().max(80).optional().default(""),
  homeRegion: z.string().trim().max(100).optional().default(""),
  homeDistrict: z.string().trim().max(100).optional().default(""),
  division: z.string().trim().max(100).optional().default(""),
  village: z.string().trim().max(160).optional().default(""),
  eyeColor: z.string().trim().max(40).optional().default(""),
  height: z.string().trim().max(20).optional().default(""),
  weight: z.string().trim().max(20).optional().default(""),
  religion: z.string().trim().max(80).optional().default(""),
  tribe: z.string().trim().max(80).optional().default(""),
  entry: z.enum(admissionEntryLevels),
  studyType: z.enum(["Day", "Boarding"]),
  academicYear: z.string().trim().regex(/^\d{4}(?:\/\d{4})?$/, "Expected YYYY or YYYY/YYYY"),
  previous: z.string().trim().max(160).optional().default(""),
  previousYear: z.string().trim().max(20).optional().default(""),
  medical: z.string().trim().max(1000).optional().default(""),
  allergies: z.string().trim().max(1000).optional().default(""),
  distance: z.string().trim().max(30).optional().default(""),
  preferredStart: isoDate.refine(validCalendarDate, "Invalid calendar date").optional().or(z.literal("")),
  siblings: z.string().trim().max(120).optional().default(""),
  photoReady: z.boolean().default(false),
  consent: z.literal(true),
})

export type AdmissionApplicationInput = z.infer<typeof admissionApplicationSchema>

export const admissionStatuses = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "MORE_INFORMATION",
  "ACCEPTED",
  "REJECTED",
] as const

export type AdmissionStatus = (typeof admissionStatuses)[number]
