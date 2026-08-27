import { mapDomainError } from "../api/errors"
import { CmsService } from "./service"
import { InMemoryCmsRepository } from "./repository"
import type { CmsContent } from "./types"

const service = new CmsService(new InMemoryCmsRepository())

export async function listPublishedCms(type?: CmsContent["type"]): Promise<Response> {
  const requestId = crypto.randomUUID()

  try {
    const data = await service.listPublished(type)
    return Response.json({ data, requestId }, { status: 200 })
  } catch (error) {
    return mapDomainError(error, requestId)
  }
}
