import type { AdmissionsApplication, ApplicationStatus } from "./types"

export interface AdmissionsRepository {
  createDraft(input: Omit<AdmissionsApplication, "reference" | "status" | "createdAt" | "updatedAt">): Promise<AdmissionsApplication>
  findByReference(reference: string): Promise<AdmissionsApplication | null>
  updateStatus(reference: string, status: ApplicationStatus): Promise<AdmissionsApplication>
}

export class InMemoryAdmissionsRepository implements AdmissionsRepository {
  private readonly records = new Map<string, AdmissionsApplication>()

  async createDraft(input: Omit<AdmissionsApplication, "reference" | "status" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString()
    const application: AdmissionsApplication = {
      ...input,
      reference: input.reference,
      status: "DRAFT",
      createdAt: now,
      updatedAt: now,
    }
    this.records.set(application.reference, application)
    return application
  }

  async findByReference(reference: string) {
    return this.records.get(reference) ?? null
  }

  async updateStatus(reference: string, status: ApplicationStatus) {
    const existing = this.records.get(reference)
    if (!existing) throw new Error("APPLICATION_NOT_FOUND")
    const updated = { ...existing, status, updatedAt: new Date().toISOString() }
    this.records.set(reference, updated)
    return updated
  }
}
