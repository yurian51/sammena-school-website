import type { AcademicYear, Class, Stream } from "./types"
import type { AcademicYearRepository } from "./repository"
import type { ClassRepository, StreamRepository } from "./academic-repository"

export class AcademicYearService {
  constructor(private readonly repository: AcademicYearRepository) {}

  getById(id: string): Promise<AcademicYear | null> {
    return this.repository.findById(id)
  }

  getCurrent(): Promise<AcademicYear | null> {
    return this.repository.findCurrent()
  }
}

export class ClassStreamService {
  constructor(
    private readonly classes: ClassRepository,
    private readonly streams: StreamRepository,
  ) {}

  getClass(id: string): Promise<Class | null> {
    return this.classes.findById(id)
  }

  listClasses(academicYearId: string): Promise<Class[]> {
    return this.classes.listByAcademicYear(academicYearId)
  }

  getStream(id: string): Promise<Stream | null> {
    return this.streams.findById(id)
  }

  listStreams(classId: string): Promise<Stream[]> {
    return this.streams.listByClass(classId)
  }
}
