import type { AdmissionApplicationInput } from "./application-schema"

export function normalizeAdmissionApplication(input: AdmissionApplicationInput): AdmissionApplicationInput {
  return {
    ...input,
    guardian: input.guardian.trim().replace(/\s+/g, " "),
    learner: input.learner.trim().replace(/\s+/g, " "),
    phone: input.phone.replace(/[\s()-]/g, ""),
    email: (input.email ?? "").trim().toLowerCase(),
    previous: input.previous.trim(),
    homeRegion: input.homeRegion.trim(),
    homeDistrict: input.homeDistrict.trim(),
    village: input.village.trim(),
  }
}
