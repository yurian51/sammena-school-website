import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import type { PortalStudent } from "@/lib/portal/types"

const students: PortalStudent[] = [
  { id: "STU-0001", admissionNumber: "SAM-2026-001", fullName: "Amani Joseph", gender: "MALE", className: "Standard I", status: "ACTIVE", attendanceRate: 96.2, academicAverage: 78.4 },
  { id: "STU-0002", admissionNumber: "SAM-2026-002", fullName: "Neema Pamba", gender: "FEMALE", className: "Standard I", status: "ACTIVE", attendanceRate: 98.1, academicAverage: 84.7 },
  { id: "STU-0003", admissionNumber: "SAM-2026-003", fullName: "Baraka Mwita", gender: "MALE", className: "Standard II", status: "ACTIVE", attendanceRate: 91.4, academicAverage: 71.2 },
  { id: "STU-0004", admissionNumber: "SAM-2026-004", fullName: "Rehema Elias", gender: "FEMALE", className: "Standard III", status: "ACTIVE", attendanceRate: 95.7, academicAverage: 81.5 },
]

export function listPortalStudents(context: AuthContext | null, className?: string) {
  requirePortalPermission(context, "students:read")
  const filtered = className ? students.filter((student) => student.className.toLowerCase() === className.toLowerCase()) : students
  return filtered
}
