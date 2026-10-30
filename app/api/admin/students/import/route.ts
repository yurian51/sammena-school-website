export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getAuthContext } from "@/lib/auth/session"
import { requirePermission } from "@/lib/auth/authorization"
import { getDbClient } from "@/lib/db/client"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

const importRowSchema = z.object({
  admissionNumber: z.string().trim().min(1).max(40),
  firstName: z.string().trim().min(1).max(80),
  middleName: z.string().trim().max(80).optional().default(""),
  lastName: z.string().trim().min(1).max(80),
  gender: z.preprocess((value) => {
    if (typeof value !== "string") return value
    const normalized = value.trim().toUpperCase()
    if (["M", "MALE", "ME"].includes(normalized)) return "MALE"
    if (["F", "FEMALE", "KE"].includes(normalized)) return "FEMALE"
    return normalized
  }, z.enum(["MALE", "FEMALE"])),
  dateOfBirth: z.string().trim().optional().default("").refine(
    value => value === "" || /^\\d{4}-\\d{2}-\\d{2}$/.test(value),
    "Date of birth must use YYYY-MM-DD.",
  ),
})

const payloadSchema = z.object({
  rows: z.array(importRowSchema).min(1).max(500),
  dryRun: z.boolean().optional().default(false),
})

export async function POST(request: NextRequest) {
  const id = requestId(request)
  try {
    const auth = requirePermission(await getAuthContext(request), "sis:students:write")
    if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")

    const body = payloadSchema.parse(await request.json())
    const seen = new Set<string>()
    const duplicateInFile: string[] = []
    for (const row of body.rows) {
      const key = row.admissionNumber.trim().toLocaleLowerCase()
      if (seen.has(key)) duplicateInFile.push(row.admissionNumber)
      seen.add(key)
    }
    if (duplicateInFile.length) {
      return NextResponse.json({
        error: {
          code: "DUPLICATE_ADMISSION_NUMBERS_IN_FILE",
          message: "The import contains repeated admission numbers. Correct the file and upload it again.",
          admissionNumbers: [...new Set(duplicateInFile)],
          requestId: id,
        },
      }, { status: 422, headers: { "Cache-Control": "private, no-store" } })
    }

    if (body.dryRun) {
      return NextResponse.json({
        data: { validated: body.rows.length, ready: body.rows.length, inserted: 0, dryRun: true },
        requestId: id,
      }, { headers: { "Cache-Control": "private, no-store" } })
    }

    const db = getDbClient()
    const result = await db.query<{ id: string; admissionNumber: string }>(
      `with incoming as (
         select *
         from jsonb_to_recordset($2::jsonb) as row_data(
           "admissionNumber" text,
           "firstName" text,
           "middleName" text,
           "lastName" text,
           gender text,
           "dateOfBirth" text
         )
       ),
       inserted as (
         insert into students (
           school_id, admission_number, first_name, middle_name,
           last_name, gender, date_of_birth
         )
         select
           $1::uuid,
           trim("admissionNumber"),
           trim("firstName"),
           nullif(trim("middleName"), ''),
           trim("lastName"),
           gender,
           nullif("dateOfBirth", '')::date
         from incoming
         on conflict (school_id, admission_number) do nothing
         returning id, admission_number
       ),
       audit as (
         insert into audit_events (action, entity_type, entity_id, request_id)
         select 'STUDENT_IMPORTED', 'student', id, $3
         from inserted
         returning entity_id
       )
       select id::text, admission_number as "admissionNumber"
       from inserted
       order by admission_number`,
      [
        auth.schoolId,
        JSON.stringify(body.rows),
        id,
      ],
    )

    const inserted = result.rows.length
    const skippedExisting = body.rows.length - inserted
    return NextResponse.json({
      data: {
        received: body.rows.length,
        inserted,
        skippedExisting,
        dryRun: false,
        importedAdmissionNumbers: result.rows.map(row => row.admissionNumber),
      },
      requestId: id,
    }, { status: 200, headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Some import rows are invalid. Check required columns, gender values, and date formats.",
          issues: error.issues.map(issue => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
          requestId: id,
        },
      }, { status: 422, headers: { "Cache-Control": "private, no-store" } })
    }
    return mapDomainError(error, id)
  }
}
