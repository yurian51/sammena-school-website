import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('health route exposes a no-store GET contract', async () => {
  const source = await readFile('app/api/health/route.ts', 'utf8')

  assert.match(source, /export async function GET\(\)/)
  assert.match(source, /status: data\.status === "ok" \? 200 : 503/)
  assert.match(source, /Cache-Control/)
  assert.match(source, /no-store/)
})
