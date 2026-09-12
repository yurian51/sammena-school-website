import { z } from "zod"

export const admissionApplicationSchema = z.object({
  guardian: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  relationship: z.enum(["Parent", "Guardian", "Other authorized caregiver"]),
  occupation: z.string().trim().max(120).optional().default(""),
  guardianNationality: z.string().trim().max(80).optional().default(""),
  address: z.string().trim().max(240).optional().default(""),
  learner: z.string().trim().min(2).max(120),
  dob: z.string().min(1),
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
  entry: z.enum(["Pre-Unity", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII"]),
  studyType: z.enum(["Day", "Boarding"]),
  academicYear: z.string().trim().min(4).max(20),
  previous: z.string().trim().max(160).optional().default(""),
  previousYear: z.string().trim().max(20).optional().default(""),
  medical: z.string().trim().max(1000).optional().default(""),
  allergies: z.string().trim().max(1000).optional().default(""),
  distance: z.string().trim().max(30).optional().default(""),
  preferredStart: z.string().optional().default(""),
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
