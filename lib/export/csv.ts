export type CsvValue = string | number | boolean | null | undefined | Date

/**
 * Escapes one cell. Values starting with = + - @ (or tab/CR) are prefixed with a quote so
 * spreadsheet software cannot run them as formulas (CSV injection).
 */
export function escapeCsvCell(value: CsvValue): string {
  if (value === null || value === undefined) return ""
  let text = value instanceof Date ? value.toISOString() : String(value)
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(headers: string[], rows: Record<string, CsvValue>[], keys: string[]): string {
  const lines = [headers.map(escapeCsvCell).join(",")]
  for (const row of rows) lines.push(keys.map((key) => escapeCsvCell(row[key])).join(","))
  return "\uFEFF" + lines.join("\r\n") + "\r\n"
}

export const EXPORT_DATASETS = ["students", "loans", "inbox"] as const
export type ExportDataset = (typeof EXPORT_DATASETS)[number]

export function isExportDataset(value: string): value is ExportDataset {
  return (EXPORT_DATASETS as readonly string[]).includes(value)
}
