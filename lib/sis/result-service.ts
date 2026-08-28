export function assertResultScore(score: number, maxScore: number): void {
  if (!Number.isFinite(score) || !Number.isFinite(maxScore) || maxScore <= 0) {
    throw new Error("INVALID_RESULT_SCORE")
  }
  if (score < 0 || score > maxScore) {
    throw new Error("INVALID_RESULT_SCORE")
  }
}

export function assertResultPublicationState(publishedAt?: string): void {
  if (publishedAt !== undefined && Number.isNaN(Date.parse(publishedAt))) {
    throw new Error("INVALID_RESULT_PUBLICATION_DATE")
  }
}
