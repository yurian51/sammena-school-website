import type { AcademicYear, Class, Enrollment, Stream } from "./types"
import type { Guardian } from "./supporting-types"

export interface StudentProfileFeatureSources {
  findAcademicYear(id: string): Promise<AcademicYear | null>
  findClass(id: string): Promise<Class | null>
  findStream(id: string): Promise<Stream | null>
}

export interface StudentProfileAcademicContext {
  academicYear: AcademicYear | null
  class: Class | null
  stream: Stream | null
}

export interface StudentProfileFeatureSummary {
  primaryGuardian: Guardian | null
  currentEnrollment: Enrollment | null
  academicContext: StudentProfileAcademicContext
  flags: {
    hasGuardian: boolean
    hasActiveEnrollment: boolean
    hasStream: boolean
  }
}

export async function enrichStudentProfile(
  primaryGuardian: Guardian | null,
  currentEnrollment: Enrollment | null,
  sources: StudentProfileFeatureSources,
): Promise<StudentProfileFeatureSummary> {
  if (!currentEnrollment) {
    return {
      primaryGuardian,
      currentEnrollment: null,
      academicContext: { academicYear: null, class: null, stream: null },
      flags: {
        hasGuardian: Boolean(primaryGuardian),
        hasActiveEnrollment: false,
        hasStream: false,
      },
    }
  }

  const [academicYear, classRecord, stream] = await Promise.all([
    sources.findAcademicYear(currentEnrollment.academicYearId),
    sources.findClass(currentEnrollment.classId),
    currentEnrollment.streamId
      ? sources.findStream(currentEnrollment.streamId)
      : Promise.resolve(null),
  ])

  return {
    primaryGuardian,
    currentEnrollment,
    academicContext: { academicYear, class: classRecord, stream },
    flags: {
      hasGuardian: Boolean(primaryGuardian),
      hasActiveEnrollment: true,
      hasStream: Boolean(stream),
    },
  }
}
