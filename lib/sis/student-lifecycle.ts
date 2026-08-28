import type { Student } from "./types"

export type StudentLifecycleAction = "ACTIVATE" | "DEACTIVATE" | "ARCHIVE"

export function applyStudentLifecycleAction(
  student: Student,
  action: StudentLifecycleAction,
): Student {
  switch (action) {
    case "ACTIVATE":
      return { ...student, isActive: true }
    case "DEACTIVATE":
      return { ...student, isActive: false }
    case "ARCHIVE":
      return { ...student, isActive: false }
  }
}
