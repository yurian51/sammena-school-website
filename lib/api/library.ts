import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import { paginate, type PaginationInput } from "@/lib/api/pagination"
import type { PortalLibraryBook } from "@/lib/portal/types"

const books: PortalLibraryBook[] = [
  { id: "BK-001", accessionNumber: "SAM-LIB-0001", title: "Primary Mathematics Standard I", author: "TIE", category: "Mathematics", quantity: 80, available: 71, issued: 9 },
  { id: "BK-002", accessionNumber: "SAM-LIB-0002", title: "English for Primary Schools", author: "TIE", category: "English", quantity: 90, available: 76, issued: 14 },
  { id: "BK-003", accessionNumber: "SAM-LIB-0003", title: "Sayansi na Teknolojia", author: "TIE", category: "Science", quantity: 72, available: 63, issued: 9 },
  { id: "BK-004", accessionNumber: "SAM-LIB-0004", title: "Kiswahili Darasa la III", author: "TIE", category: "Kiswahili", quantity: 70, available: 58, issued: 12 },
]

export function listPortalLibrary(context: AuthContext | null, category?: string, pagination?: PaginationInput) {
  requirePortalPermission(context, "library:read")
  const filtered = category?.trim()
    ? books.filter((book) => book.category.toLowerCase() === category.trim().toLowerCase())
    : books
  return pagination ? paginate(filtered, pagination) : { data: filtered, meta: { page: 1, pageSize: filtered.length || 1, total: filtered.length, totalPages: 1, hasNextPage: false, hasPreviousPage: false } }
}
