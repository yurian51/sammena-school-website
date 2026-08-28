import type { AuthContext } from "./authorization"

export function requireSchoolScope(context: AuthContext, schoolId: string): void {
  if (!context.schoolId) throw new Error("FORBIDDEN")
  if (context.schoolId !== schoolId) throw new Error("FORBIDDEN")
}
