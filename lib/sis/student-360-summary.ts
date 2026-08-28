export type AttendanceSummary = {
  present: number
  absent: number
  late: number
  excused: number
  total: number
  attendanceRate: number
}

export type AcademicSummary = {
  subjects: number
  average: number | null
  grade: string | null
  position: number | null
}

export type FeeSummary = {
  billed: number
  paid: number
  balance: number
  paymentRate: number
}

export type DocumentSummary = {
  total: number
  verified: number
  missing: number
}

export type Student360Summary = {
  attendance: AttendanceSummary
  academics: AcademicSummary
  fees: FeeSummary
  documents: DocumentSummary
}

function percentage(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0
  return Math.round((numerator / denominator) * 10000) / 100
}

export function buildAttendanceSummary(input: Omit<AttendanceSummary, "total" | "attendanceRate">): AttendanceSummary {
  const total = input.present + input.absent + input.late + input.excused
  return { ...input, total, attendanceRate: percentage(input.present + input.late + input.excused, total) }
}

export function buildFeeSummary(billed: number, paid: number): FeeSummary {
  const safeBilled = Math.max(0, billed)
  const safePaid = Math.max(0, paid)
  return {
    billed: safeBilled,
    paid: safePaid,
    balance: Math.max(0, safeBilled - safePaid),
    paymentRate: percentage(Math.min(safePaid, safeBilled), safeBilled),
  }
}

export function buildDocumentSummary(total: number, verified: number): DocumentSummary {
  const safeTotal = Math.max(0, total)
  const safeVerified = Math.min(safeTotal, Math.max(0, verified))
  return { total: safeTotal, verified: safeVerified, missing: safeTotal - safeVerified }
}

export function buildAcademicSummary(
  subjects: number,
  average: number | null,
  grade: string | null,
  position: number | null,
): AcademicSummary {
  return {
    subjects: Math.max(0, subjects),
    average: average === null ? null : Math.max(0, Math.min(100, average)),
    grade,
    position: position === null ? null : Math.max(1, position),
  }
}
