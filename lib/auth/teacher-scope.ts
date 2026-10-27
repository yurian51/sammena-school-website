import type { AuthContext } from "@/lib/auth/authorization"
import { getRuntimeDbClient } from "@/lib/db/runtime"

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Admins may act on any class in their school. Teachers only on classes assigned to them.
 * Anything else (including a teacher with no assignment) is refused.
 */
export async function canActOnClass(context: AuthContext, classId: string): Promise<boolean> {
  if (!context.schoolId) return false
  if (context.role === "SUPER_ADMIN" || context.role === "SCHOOL_ADMIN") return true
  if (context.role !== "TEACHER" || !UUID.test(context.userId ?? "")) return false
  const { rows } = await getRuntimeDbClient().query<{ ok: boolean }>(
    `select exists(select 1 from teacher_class_assignments where user_id = $1 and class_id = $2 and school_id = $3) as ok`,
    [context.userId, classId, context.schoolId],
  )
  return rows[0]?.ok === true
}

export async function assignedClassIds(context: AuthContext): Promise<string[] | "all"> {
  if (context.role === "SUPER_ADMIN" || context.role === "SCHOOL_ADMIN") return "all"
  if (context.role !== "TEACHER" || !context.schoolId || !UUID.test(context.userId ?? "")) return []
  const { rows } = await getRuntimeDbClient().query<{ class_id: string }>(
    `select class_id from teacher_class_assignments where user_id = $1 and school_id = $2`,
    [context.userId, context.schoolId],
  )
  return rows.map((row) => row.class_id)
}
