export interface PaginationInput {
  page: number
  pageSize: number
}

export interface PaginationMeta extends PaginationInput {
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

const DEFAULT_PAGE_SIZE = 25
const MAX_PAGE_SIZE = 100

export function parsePagination(searchParams: URLSearchParams): PaginationInput {
  const rawPage = Number(searchParams.get("page") ?? "1")
  const rawPageSize = Number(searchParams.get("pageSize") ?? String(DEFAULT_PAGE_SIZE))
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1
  const pageSize = Number.isInteger(rawPageSize) && rawPageSize > 0 ? Math.min(rawPageSize, MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE
  return { page, pageSize }
}

export function paginate<T>(items: readonly T[], { page, pageSize }: PaginationInput): { data: T[]; meta: PaginationMeta } {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * pageSize
  return {
    data: items.slice(start, start + pageSize),
    meta: { page: safePage, pageSize, total, totalPages, hasNextPage: safePage < totalPages, hasPreviousPage: safePage > 1 },
  }
}
