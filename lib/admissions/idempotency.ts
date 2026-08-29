export type IdempotencyRecord = { key: string; reference: string; createdAt: string }

const records = new Map<string, IdempotencyRecord>()

export function getIdempotencyRecord(key: string) { return records.get(key) }
export function rememberIdempotencyKey(key: string, reference: string) {
  const record = { key, reference, createdAt: new Date().toISOString() }
  records.set(key, record)
  return record
}
export function clearIdempotencyRecords() { records.clear() }
