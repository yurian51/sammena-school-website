export const dynamic = "force-dynamic"
import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { isExportDataset, toCsv, type CsvValue } from "@/lib/export/csv"

type Definition = { permission: "sis:students:read" | "library:read" | "inbox:read"; headers: string[]; keys: string[]; sql: string }

const definitions: Record<"students" | "loans" | "inbox", Definition> = {
  students: {
    permission: "sis:students:read",
    headers: ["Admission number", "First name", "Middle name", "Last name", "Gender", "Date of birth", "Active", "Current class"],
    keys: ["admissionNumber", "firstName", "middleName", "lastName", "gender", "dateOfBirth", "isActive", "className"],
    sql: `select s.admission_number as "admissionNumber", s.first_name as "firstName", s.middle_name as "middleName", s.last_name as "lastName",
                 s.gender, s.date_of_birth::text as "dateOfBirth", s.is_active as "isActive", c.name as "className"
            from students s
            left join enrollments e on e.student_id = s.id and e.status = 'ACTIVE'
              and e.academic_year_id in (select id from academic_years where school_id = $1 and is_current)
            left join classes c on c.id = e.class_id
           where s.school_id = $1
           order by s.admission_number
           limit 10000`,
  },
  loans: {
    permission: "library:read",
    headers: ["Accession number", "Book title", "Admission number", "Student", "Issued", "Returned"],
    keys: ["accessionNumber", "bookTitle", "admissionNumber", "student", "issuedAt", "returnedAt"],
    sql: `select b.accession_number as "accessionNumber", b.title as "bookTitle", s.admission_number as "admissionNumber",
                 concat_ws(' ', s.first_name, s.last_name) as student, i.issued_at as "issuedAt", i.returned_at as "returnedAt"
            from library_issues i
            join library_books b on b.id = i.book_id
            join students s on s.id = i.student_id
           where i.school_id = $1
           order by i.issued_at desc
           limit 10000`,
  },
  inbox: {
    permission: "inbox:read",
    headers: ["Received", "Name", "Email", "Phone", "Subject", "Message", "Status"],
    keys: ["createdAt", "name", "email", "phone", "subject", "message", "status"],
    sql: `select created_at as "createdAt", name, email, phone, subject, message, status
            from contact_messages
           where school_id = $1
           order by created_at desc
           limit 10000`,
  },
}

export async function GET(request: Request, { params }: { params: Promise<{ dataset: string }> }) {
  const id = requestId(request)
  try {
    const { dataset } = await params
    if (!isExportDataset(dataset)) return apiError("NOT_FOUND", "Unknown export.", 404, id)
    const definition = definitions[dataset]
    const context = requireAuthorized(await getAuthContext(request), definition.permission)
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")

    // The inbox is not school-scoped in the database yet (single-school deployment), so its query
    // takes the school id only as a presence check. Other datasets filter by school_id.
    const { rows } = await getRuntimeDbClient().query<Record<string, CsvValue>>(definition.sql, [context.schoolId])
    const csv = toCsv(definition.headers, rows, definition.keys)

    await auditAction(context, AUDIT_ACTIONS.DATA_EXPORTED, `export_${dataset}`, undefined, id)
    const stamp = new Date().toISOString().slice(0, 10)
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="sammena-${dataset}-${stamp}.csv"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
