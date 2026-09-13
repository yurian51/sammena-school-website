import { mapDomainError } from "../api/errors"
import { AdmissionsService } from "./service"
import { InMemoryAdmissionsRepository } from "./repository"
import type { CreateApplicationInput } from "./types"
import { validateAdmissionsApplication } from "./validation"

const service = new AdmissionsService(new InMemoryAdmissionsRepository())

export async function createAdmissionFromRequest(request: Request): Promise<Response> {
  const requestId = crypto.randomUUID()

  try {
    const input = (await request.json()) as Partial<CreateApplicationInput>
    const validation = validateAdmissionsApplication(input)

    if (!validation.ok) {
      return Response.json(
        { error: { code: "VALIDATION_ERROR", message: "The submitted information is invalid.", fields: validation.fields, requestId } },
        { status: 400 },
      )
    }

    const application = await service.createDraft(input as CreateApplicationInput)
    return Response.json({ data: application, requestId }, { status: 201 })
  } catch (error) {
    return mapDomainError(error, requestId)
  }
}
