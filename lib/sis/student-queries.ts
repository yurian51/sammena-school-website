import type { Student } from "./types"
import type { StudentRepository } from "./repository"

export interface StudentListFilters {
  query?: string
  isActive?: boolean
  page?: number
  pageSize?: number
}

export interface StudentListResult {
  items: Student[]
  page: number
  pageSize: number
  total: number
}

export interface StudentListRepository extends StudentRepository {
  list(filters: StudentListFilters): Promise<StudentListResult>
}

export class StudentQueryService {
  constructor(
    private readonly schoolId: string,
    private readonly repository: StudentListRepository,
  ) {}

  async list(filters: StudentListFilters = {}): Promise<StudentListResult> {
    const page = Math.max(1, filters.page ?? 1)
    const pageSize = Math.min(100, Math.max(1, filters.pageSize ?? 25))

    return this.repository.list({
      ...filters,
      page,
      pageSize,
      // Repository implementations must enforce this scope.
      schoolId: this.schoolId,
    } as StudentListFilters & { schoolId: string })
  }
}
