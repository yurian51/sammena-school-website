import { getAuthContext } from "@/lib/auth/session"
import { updateStaffAdmissionStatus } from "@/lib/api/admin-admissions"
import { mapDomainError } from "@/lib/api/errors"
import { readJson, requestId } from "@/lib/api/request"
import type { ApplicationStatus } from "@/lib/admissions/types"

const statuses = new Set<ApplicationStatus>(["DRAFT", "SUBMITTED", "UNDER_REVIEW", "ASSESSMENT", "DECISION", "ACCEPTED", "WAITLISTED", "DECLINED", "ENROLLED"])

export async function PATCH(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  const id = requestId(request)
  try {
    const body = await readJson<{ status?: unknown }>(request)
    if (typeof body.status !== "string" || !statuses.has(body.status as ApplicationStatus)) throw new Error("VALIDATION_ERROR")
    const { reference } = await params
    const data = await updateStaffAdmissionStatus(await getAuthContext(request), reference, body.status as ApplicationStatus, id)
    return Response.json({ data, requestId: id }, { status: 200 })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
