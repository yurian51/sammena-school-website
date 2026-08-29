export type PaginationInput = { page?: number; pageSize?: number }

export function paginate<T>(items: T[], input: PaginationInput = {}) {
  const page = Math.max(1, Math.floor(input.page ?? 1))
  const pageSize = Math.min(100, Math.max(1, Math.floor(input.pageSize ?? 25)))
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * pageSize
  return { items: items.slice(start, start + pageSize), page: safePage, pageSize, total, totalPages, hasNext: safePage < totalPages, hasPrevious: safePage > 1 }
}
