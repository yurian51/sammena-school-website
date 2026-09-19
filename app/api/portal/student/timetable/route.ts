import { NextRequest, NextResponse } from "next/server"
import { getAuthContext } from "@/lib/auth/session"
import { getStudentTimetable } from "@/lib/api/student-timetable"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: NextRequest) {
  const id = requestId(request)
  try {
    const context = await getAuthContext(request)
    const data = await getStudentTimetable(context)
    return NextResponse.json({ data, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
