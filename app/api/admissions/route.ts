import { mapDomainError } from "../../../lib/api/errors"
import { readJson, requestId } from "../../../lib/api/request"
import { sanitizeAdmissionsInput } from "../../../lib/admissions/sanitize"
import type { CreateApplicationInput } from "../../../lib/admissions/types"
import { createServerServices } from "../../../lib/server/repositories"

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const input = sanitizeAdmissionsInput(await readJson<CreateApplicationInput>(request))
    const application = await createServerServices({ schoolId: process.env.SCHOOL_ID ?? "sammena-primary" }).admissions.createDraft(input)
    return Response.json({ data: application, requestId: id }, { status: 201 })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
