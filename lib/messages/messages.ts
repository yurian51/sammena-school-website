import { z } from "zod"

export const messageInput = z
  .object({
    audience: z.enum(["ALL", "CLASS", "STUDENT"]),
    classId: z.string().uuid().optional(),
    studentId: z.string().uuid().optional(),
    title: z.string().trim().min(1).max(160),
    body: z.string().trim().min(1).max(5000),
  })
  .refine((v) => v.audience !== "CLASS" || !!v.classId, { message: "A class is required", path: ["classId"] })
  .refine((v) => v.audience !== "STUDENT" || !!v.studentId, { message: "A student is required", path: ["studentId"] })
