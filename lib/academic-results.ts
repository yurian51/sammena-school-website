export type ResultType = "PSLE" | "SFNA"
export type ResultSourceKind = "official" | "secondary"

export type SchoolResult = {
  year: number
  type: ResultType
  candidates: number
  average: number
  grade: string
  passed?: number
  passRate?: number
  grades: Record<string, number>
  sourceUrl: string
  sourceLabel: string
  sourceKind: ResultSourceKind
  officialIndexUrl?: string
}

export const schoolIdentity = {
  name: "Sammena Primary School",
  brand: "Sammena Schools",
  centreNumber: "PS0101160",
  registrationNumber: "EM.17569",
  location: "Nduruma, Arusha, Tanzania",
  phone: "+255 750 227 073",
}

export const verifiedResults: SchoolResult[] = [
  {
    year: 2022,
    type: "PSLE",
    candidates: 16,
    average: 210.9375,
    grade: "B",
    grades: { A: 3, B: 10, C: 3, D: 0, E: 0 },
    sourceUrl: "https://onlinesys.necta.go.tz/results/2022/psle/results/shl_ps0101160.htm",
    sourceLabel: "NECTA PSLE 2022",
    sourceKind: "official",
  },
  {
    year: 2023,
    type: "PSLE",
    candidates: 18,
    average: 222.8889,
    grade: "B",
    grades: { A: 0, B: 17, C: 1, D: 0, E: 0 },
    sourceUrl: "https://onlinesys.necta.go.tz/results/2023/psle/results/shl_ps0101160.htm",
    sourceLabel: "NECTA PSLE 2023",
    sourceKind: "official",
  },
  {
    year: 2024,
    type: "PSLE",
    candidates: 17,
    average: 198.0588,
    grade: "B",
    grades: { A: 2, B: 9, C: 5, D: 1, E: 0 },
    sourceUrl: "https://onlinesys.necta.go.tz/results/2024/psle/results/shl_ps0101160.htm",
    sourceLabel: "NECTA PSLE 2024",
    sourceKind: "official",
  },
  {
    year: 2025,
    type: "PSLE",
    candidates: 29,
    average: 162.72,
    grade: "B",
    passed: 27,
    passRate: 93.1,
    grades: { A: 0, B: 7, C: 20, D: 2, E: 0 },
    sourceUrl: "https://shuleyetu.co.tz/shuleni/school/ps0101160-sammena-primary-school-arusha-dc",
    sourceLabel: "SchoolYetu published summary",
    sourceKind: "secondary",
    officialIndexUrl: "https://onlinesys.necta.go.tz/results/2025/psle/results/distr_0101.htm",
  },
  {
    year: 2024,
    type: "SFNA",
    candidates: 34,
    average: 174.1176,
    grade: "C",
    grades: { A: 1, B: 17, C: 12, D: 3, Referred: 1 },
    sourceUrl: "https://onlinesys.necta.go.tz/results/2024/sfna/results/ps0101160.htm",
    sourceLabel: "NECTA SFNA 2024",
    sourceKind: "official",
  },
]

export function getResults(type?: ResultType) {
  return type ? verifiedResults.filter((result) => result.type === type) : verifiedResults
}

export function getLatestResult(type: ResultType) {
  return [...getResults(type)].sort((a, b) => b.year - a.year)[0]
}
