import type { Assessment, Result } from "./supporting-types"

export interface AssessmentRepository {
  readonly schoolId: string
  findById(id: string): Promise<Assessment | null>
  listByTerm(termId: string, subjectId?: string): Promise<Assessment[]>
  create(assessment: Assessment): Promise<Assessment>
}

export interface ResultRepository {
  readonly schoolId: string
  findById(id: string): Promise<Result | null>
  listByStudent(studentId: string, assessmentId?: string): Promise<Result[]>
  save(result: Result): Promise<Result>
}
