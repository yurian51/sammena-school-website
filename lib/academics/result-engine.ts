export type GradeBand = {
  grade: string
  minimumPercentage: number
  maximumPercentage: number
  label?: string
  passing: boolean
}

export type GradingPolicy = {
  id: string
  name: string
  bands: readonly GradeBand[]
}

export type ResultInput = {
  score: number
  maxScore: number
}

export type CalculatedResult = {
  score: number
  maxScore: number
  percentage: number
  grade: string
  passing: boolean
}

export const SAMMENA_PRIMARY_GRADING_POLICY: GradingPolicy = {
  id: "sammena-primary-default",
  name: "Sammena Primary Percentage Grading",
  bands: [
    { grade: "A", minimumPercentage: 82, maximumPercentage: 100, passing: true },
    { grade: "B", minimumPercentage: 62, maximumPercentage: 81.999999, passing: true },
    { grade: "C", minimumPercentage: 42, maximumPercentage: 61.999999, passing: true },
    { grade: "D", minimumPercentage: 22, maximumPercentage: 41.999999, passing: false },
    { grade: "E", minimumPercentage: 0, maximumPercentage: 21.999999, passing: false },
  ],
}

function assertFiniteNumber(value: number, field: string) {
  if (!Number.isFinite(value)) throw new Error(`INVALID_${field.toUpperCase()}`)
}

export function calculateResult(input: ResultInput, policy: GradingPolicy = SAMMENA_PRIMARY_GRADING_POLICY): CalculatedResult {
  assertFiniteNumber(input.score, "score")
  assertFiniteNumber(input.maxScore, "max_score")
  if (input.maxScore <= 0) throw new Error("INVALID_MAX_SCORE")
  if (input.score < 0 || input.score > input.maxScore) throw new Error("SCORE_OUT_OF_RANGE")

  const percentage = Number(((input.score / input.maxScore) * 100).toFixed(2))
  const band = policy.bands.find(candidate =>
    percentage >= candidate.minimumPercentage && percentage <= candidate.maximumPercentage,
  )
  if (!band) throw new Error("NO_GRADING_BAND")

  return {
    score: input.score,
    maxScore: input.maxScore,
    percentage,
    grade: band.grade,
    passing: band.passing,
  }
}

export function calculateAggregate(results: readonly ResultInput[], policy: GradingPolicy = SAMMENA_PRIMARY_GRADING_POLICY) {
  if (results.length === 0) return { count: 0, averagePercentage: 0, passCount: 0, passRate: 0, grades: {} as Record<string, number> }

  const calculated = results.map(result => calculateResult(result, policy))
  const averagePercentage = Number((calculated.reduce((sum, result) => sum + result.percentage, 0) / calculated.length).toFixed(2))
  const passCount = calculated.filter(result => result.passing).length

  return {
    count: calculated.length,
    averagePercentage,
    passCount,
    passRate: Number(((passCount / calculated.length) * 100).toFixed(2)),
    grades: calculated.reduce<Record<string, number>>((counts, result) => {
      counts[result.grade] = (counts[result.grade] ?? 0) + 1
      return counts
    }, {}),
  }
}
