import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { bookUpdate, canReduceTo, idParam } from "@/lib/library/library"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "library:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const bookId = idParam.safeParse((await params).id)
    if (!bookId.success) return apiError("NOT_FOUND", "The book was not found.", 404, id)
    const parsed = bookUpdate.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "Check the book details and try again.", 400, id)

    const db = getRuntimeDbClient()
    const { rows: current } = await db.query<{ quantity: number; onLoan: number }>(
      `select b.quantity, (select count(*)::int from library_issues i where i.book_id = b.id and i.returned_at is null) as "onLoan"
         from library_books b where b.id = $1 and b.school_id = $2`,
      [bookId.data, context.schoolId],
    )
    if (!current[0]) return apiError("NOT_FOUND", "The book was not found.", 404, id)
    const next = parsed.data.quantity ?? current[0].quantity
    if (!canReduceTo(next, current[0].onLoan)) return apiError("VALIDATION_ERROR", "Total copies cannot be lower than the copies currently on loan.", 400, id)

    const d = parsed.data
    const { rows } = await db.query(
      `update library_books set
         accession_number = coalesce($3, accession_number),
         title = coalesce($4, title),
         author = coalesce($5, author),
         category = coalesce($6, category),
         quantity = $7,
         updated_at = now()
       where id = $1 and school_id = $2
       returning id, accession_number as "accessionNumber", title, author, category, quantity`,
      [bookId.data, context.schoolId, d.accessionNumber ?? null, d.title ?? null, d.author ?? null, d.category ?? null, next],
    )
    await auditAction(context, AUDIT_ACTIONS.LIBRARY_BOOK_SAVED, "library_book", bookId.data, id)
    return Response.json({ data: rows[0], requestId: id })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
