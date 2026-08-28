import type { Enrollment, EnrollmentRepository } from "@/lib/sis"
import { getDbClient } from "../client"
import type { EnrollmentRow } from "../sis-rows"
import { mapEnrollmentRow } from "../mappers/sis-enrollment"

export class PostgresEnrollmentRepository implements EnrollmentRepository {
  constructor(public readonly schoolId: string) {}

  async findById(id: string): Promise<Enrollment | null> {
    const result = await getDbClient().query<EnrollmentRow>(
      `select id, school_id, student_id, academic_year_id, class_id, stream_id, status, enrolled_at
       from enrollments where id = $1 and school_id = $2 limit 1`,
      [id, this.schoolId],
    )
    return result.rows[0] ? mapEnrollmentRow(result.rows[0]) : null
  }

  async listForStudent(studentId: string, academicYearId?: string): Promise<Enrollment[]> {
    const result = academicYearId
      ? await getDbClient().query<EnrollmentRow>(
          `select id, school_id, student_id, academic_year_id, class_id, stream_id, status, enrolled_at
           from enrollments where student_id = $1 and academic_year_id = $2 and school_id = $3
           order by enrolled_at desc`,
          [studentId, academicYearId, this.schoolId],
        )
      : await getDbClient().query<EnrollmentRow>(
          `select id, school_id, student_id, academic_year_id, class_id, stream_id, status, enrolled_at
           from enrollments where student_id = $1 and school_id = $2
           order by enrolled_at desc`,
          [studentId, this.schoolId],
        )

    return result.rows.map(mapEnrollmentRow)
  }

  async create(enrollment: Enrollment): Promise<Enrollment> {
    if (enrollment.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }

    const result = await getDbClient().query<EnrollmentRow>(
      `insert into enrollments
        (id, school_id, student_id, academic_year_id, class_id, stream_id, status, enrolled_at)
       values ($1, $2, $3, $4, $5, $6, $7, $8)
       returning id, school_id, student_id, academic_year_id, class_id, stream_id, status, enrolled_at`,
      [
        enrollment.id,
        enrollment.schoolId,
        enrollment.studentId,
        enrollment.academicYearId,
        enrollment.classId,
        enrollment.streamId ?? null,
        enrollment.status,
        enrollment.enrolledAt,
      ],
    )

    return mapEnrollmentRow(result.rows[0])
  }
}
