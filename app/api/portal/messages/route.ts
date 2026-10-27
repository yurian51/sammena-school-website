export const dynamic = "force-dynamic"
import { getAuthContext } from "@/lib/auth/session"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

/**
 * Messages a parent can see: school-wide, for a class their child attends, or addressed to their child.
 * Only guardians with a linked guardian account (guardian_accounts) and an active school context get results.
 */
export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = await getAuthContext(request)
    if (!context || context.role !== "PARENT" || !context.schoolId) throw new Error("FORBIDDEN")
    const { rows } = await getRuntimeDbClient().query(
      `with my_students as (
         select sg.student_id from guardian_accounts ga
           join student_guardians sg on sg.guardian_id = ga.guardian_id
          where ga.user_id = $2 and ga.school_id = $1),
       my_classes as (
         select distinct e.class_id from enrollments e join my_students ms on ms.student_id = e.student_id
          where e.school_id = $1 and e.status = 'ACTIVE')
       select m.id, m.audience, m.title, m.body, m.created_at as "createdAt"
         from parent_messages m
        where m.school_id = $1 and (
              m.audience = 'ALL'
           or (m.audience = 'CLASS' and m.class_id in (select class_id from my_classes))
           or (m.audience = 'STUDENT' and m.student_id in (select student_id from my_students)))
        order by m.created_at desc limit 100`,
      [context.schoolId, context.userId],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}
