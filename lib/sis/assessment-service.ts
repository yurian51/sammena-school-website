export function assertValidScore(score: number, maxScore: number): void {
  if (!Number.isFinite(score) || !Number.isFinite(maxScore)) {
    throw new Error("INVALID_ASSESSMENT_SCORE")
  }
  if (maxScore <= 0 || score < 0 || score > maxScore) {
    throw new Error("INVALID_ASSESSMENT_SCORE")
  }
}
