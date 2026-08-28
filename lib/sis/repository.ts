import type { AcademicYear, Enrollment, Guardian, Student } from "./types"
import type { StudentGuardian } from "./supporting-types"

export interface SchoolScopedRepository {
  readonly schoolId: string
}

export interface StudentRepository extends SchoolScopedRepository {
  findById(id: string): Promise<Student | null>
  findByAdmissionNumber(admissionNumber: string): Promise<Student | null>
  create(student: Student): Promise<Student>
}

export interface GuardianRepository extends SchoolScopedRepository {
  findById(id: string): Promise<Guardian | null>
  listForStudent(studentId: string): Promise<StudentGuardian[]>
  attachToStudent(relationship: StudentGuardian): Promise<StudentGuardian>
}

export interface EnrollmentRepository extends SchoolScopedRepository {
  findById(id: string): Promise<Enrollment | null>
  listForStudent(studentId: string, academicYearId?: string): Promise<Enrollment[]>
  create(enrollment: Enrollment): Promise<Enrollment>
}

export interface AcademicYearRepository extends SchoolScopedRepository {
  findById(id: string): Promise<AcademicYear | null>
  findCurrent(): Promise<AcademicYear | null>
}
