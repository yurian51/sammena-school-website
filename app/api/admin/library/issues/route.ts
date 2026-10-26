export const dynamic = "force-dynamic"
import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { ensurePostgresDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { issueInput } from "@/lib/library/library"

/** Open loans (not yet returned), newest first. */
export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "library:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const { rows } = await ensurePostgresDbClient().query(
      `select i.id, i.issued_at as "issuedAt", b.title as "bookTitle", b.accession_number as "accessionNumber",
              s.first_name as "firstName", s.last_name as "lastName", s.admission_number as "admissionNumber"
         from library_issues i
         join library_books b on b.id = i.book_id
         join students s on s.id = i.student_id
        where i.school_id = $1 and i.returned_at is null
        order by i.issued_at desc
        limit 500`,
      [context.schoolId],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

/** Issues one copy. Row locks on the book keep concurrent loans from exceeding the stock. */
export async function POST(request: Request) {
  const id = requestId(request)
  const client = await ensurePostgresDbClient().connect()
  try {
    const context = requireAuthorized(await getAuthContext(request), "library:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = issueInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "A book and a student are required.", 400, id)

    await client.query("begin")
    const { rows: book } = await client.query<{ quantity: number; onLoan: number }>(
      `select b.quantity, (select count(*)::int from library_issues i where i.book_id = b.id and i.returned_at is null) as "onLoan"
         from library_books b where b.id = $1 and b.school_id = $2 for update`,
      [parsed.data.bookId, context.schoolId],
    )
    if (!book[0]) { await client.query("rollback"); return apiError("NOT_FOUND", "The book was not found.", 404, id) }
    if (book[0].onLoan >= book[0].quantity) { await client.query("rollback"); return apiError("CONFLICT", "No copies are available to issue.", 409, id) }

    const { rows: student } = await client.query(
      `select id from students where id = $1 and school_id = $2 and is_active = true`,
      [parsed.data.studentId, context.schoolId],
    )
    if (!student[0]) { await client.query("rollback"); return apiError("NOT_FOUND", "The student was not found or is inactive.", 404, id) }

    const { rows } = await client.query<{ id: string }>(
      `insert into library_issues (school_id, book_id, student_id) values ($1, $2, $3) returning id`,
      [context.schoolId, parsed.data.bookId, parsed.data.studentId],
    )
    await client.query("commit")
    await auditAction(context, AUDIT_ACTIONS.LIBRARY_BOOK_ISSUED, "library_issue", rows[0]?.id, id)
    return Response.json({ data: { id: rows[0]?.id }, requestId: id }, { status: 201 })
  } catch (error) {
    await client.query("rollback").catch((): undefined => undefined)
    return mapDomainError(error, id)
  } finally {
    client.release()
  }
}
