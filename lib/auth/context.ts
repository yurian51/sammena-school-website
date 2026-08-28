export type UserRole = "SUPER_ADMIN" | "SCHOOL_ADMIN" | "EDITOR" | "TEACHER" | "PARENT" | "STUDENT"

export interface AuthContext {
  userId: string
  role: UserRole
  schoolId?: string
}

export function requireAuth(context: AuthContext | null): AuthContext {
  if (!context) throw new Error("UNAUTHORIZED")
  return context
}
