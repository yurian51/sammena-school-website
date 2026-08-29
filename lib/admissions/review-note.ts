export type ReviewNote = { noteId: string; reference: string; authorId: string; body: string; createdAt: string }

const notes = new Map<string, ReviewNote[]>()

export function addReviewNote(reference: string, authorId: string, body: string): ReviewNote {
  const note = { noteId: crypto.randomUUID(), reference, authorId, body: body.trim(), createdAt: new Date().toISOString() }
  notes.set(reference, [...(notes.get(reference) ?? []), note])
  return note
}

export function listReviewNotes(reference: string) { return notes.get(reference) ?? [] }
export function clearReviewNotes() { notes.clear() }
