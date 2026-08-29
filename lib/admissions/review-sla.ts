export type ReviewSla = { submittedAt: string; dueAt: string; overdue: boolean }

export function calculateReviewSla(submittedAt: string, hours = 48, now = new Date()) {
  const submitted = new Date(submittedAt)
  const due = new Date(submitted.getTime() + hours * 60 * 60 * 1000)
  return { submittedAt: submitted.toISOString(), dueAt: due.toISOString(), overdue: now.getTime() > due.getTime() }
}
