import type { Class, Stream } from "./types"
import type { Subject, TeachingAssignment } from "./supporting-types"

export interface ClassRepository {
  readonly schoolId: string
  findById(id: string): Promise<Class | null>
  listByAcademicYear(academicYearId: string): Promise<Class[]>
}

export interface StreamRepository {
  readonly schoolId: string
  findById(id: string): Promise<Stream | null>
  listByClass(classId: string): Promise<Stream[]>
}

export interface SubjectRepository {
  readonly schoolId: string
  findById(id: string): Promise<Subject | null>
  listByEducationLevel(educationLevelId: string): Promise<Subject[]>
}

export interface TeachingAssignmentRepository {
  readonly schoolId: string
  listByTeacher(staffId: string, academicYearId: string): Promise<TeachingAssignment[]>
  listByClass(classId: string, academicYearId: string): Promise<TeachingAssignment[]>
}
