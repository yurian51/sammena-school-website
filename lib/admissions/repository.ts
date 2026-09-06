import type { AdmissionApplication, ApplicationStatus } from "./types"

export type DraftInput = Omit<AdmissionApplication, "reference" | "status" | "createdAt" | "updatedAt">

export interface AdmissionsRepository {
  createDraft(reference: string, input: DraftInput): Promise<AdmissionApplication>
  findByReference(reference: string): Promise<AdmissionApplication | null>
  updateStatus(reference: string, status: ApplicationStatus): Promise<AdmissionApplication>
}

export class InMemoryAdmissionsRepository implements AdmissionsRepository {
  private readonly records = new Map<string, AdmissionApplication>()

  async createDraft(reference: string, input: DraftInput) {
    const now = new Date().toISOString()
    const application: AdmissionApplication = {
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
