import type { Assessment, Result } from "./supporting-types"
import type { AssessmentRepository, ResultRepository } from "./assessment-repository"
import { assertValidScore } from "./assessment-service"
import { assertResultPublicationState } from "./result-service"

export class AcademicResultsService {
  constructor(
    private readonly schoolId: string,
    private readonly assessments: AssessmentRepository,
    private readonly results: ResultRepository,
  ) {}

  async createAssessment(assessment: Assessment): Promise<Assessment> {
    if (assessment.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
    return this.assessments.create(assessment)
  }

  async saveResult(result: Result, maxScore: number): Promise<Result> {
    if (result.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
    assertValidScore(result.score, maxScore)
    assertResultPublicationState(result.publishedAt)
    return this.results.save(result)
  }
}
