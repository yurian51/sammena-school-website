import type { AdmissionsApplication, ApplicationStatus } from "./types"

export type DraftInput = Omit<AdmissionsApplication, "reference" | "status" | "createdAt" | "updatedAt">

export interface AdmissionsRepository {
  createDraft(reference: string, input: DraftInput): Promise<AdmissionsApplication>
  findByReference(reference: string): Promise<AdmissionsApplication | null>
  updateStatus(reference: string, status: ApplicationStatus): Promise<AdmissionsApplication>
}

export class InMemoryAdmissionsRepository implements AdmissionsRepository {
  private readonly records = new Map<string, AdmissionsApplication>()

  async createDraft(reference: string, input: DraftInput) {
    const now = new Date().toISOString()
    const application: AdmissionsApplication = {
      ...input,
      reference,
      status: "DRAFT",
      createdAt: now,
      updatedAt: now,
    }
    this.records.set(reference, application)
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
