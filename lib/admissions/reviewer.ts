export type ReviewerAssignment = { reference: string; reviewerId: string; assignedAt: string }

const assignments = new Map<string, ReviewerAssignment>()

export function assignReviewer(reference: string, reviewerId: string): ReviewerAssignment {
  const assignment = { reference, reviewerId, assignedAt: new Date().toISOString() }
  assignments.set(reference, assignment)
  return assignment
}

export function getReviewerAssignment(reference: string) { return assignments.get(reference) }
export function clearReviewerAssignments() { assignments.clear() }
