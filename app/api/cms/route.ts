import { mapDomainError } from "../../../lib/api/errors"
import { createServerServices } from "../../../lib/server/repositories"
import type { CmsContent } from "../../../lib/cms/types"

export async function GET(request: Request) {
  const requestId = crypto.randomUUID()
  try {
    const value = new URL(request.url).searchParams.get("type")
    const type = value === "NEWS" || value === "ANNOUNCEMENT" ? value as CmsContent["type"] : undefined
    const data = await createServerServices({ schoolId: process.env.SAMMENA_SCHOOL_ID ?? "sammena-primary" }).cms.listPublished(type)
    return Response.json({ data, requestId }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    return mapDomainError(error, requestId)
  }
}
