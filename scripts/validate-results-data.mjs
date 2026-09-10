import fs from "node:fs";

const sourceFile = fs.readFileSync("lib/academic-results.ts", "utf8");
const registry = JSON.parse(fs.readFileSync("data/results-sources.json", "utf8"));

if (registry.centre !== "PS0101160") throw new Error("Unexpected Sammena centre number");
if (registry.school !== "SAMMENA PRIMARY SCHOOL") throw new Error("Unexpected Sammena school name");

const expectedPsleYears = [2022, 2023, 2024, 2025];
const expectedSfnaYears = [2024];
const historicalYears = [2018, 2019, 2020, 2021];
const historicalAuditStatus = "not-located-in-current-indexed-necta-search";

const resultBlocks = [...sourceFile.matchAll(/\{\n\s*year:\s*(\d+),[\s\S]*?\n\s*sourceKind:\s*"(official|secondary)",[\s\S]*?\n\s*\},/g)].map((match) => ({
  year: Number(match[1]),
  sourceKind: match[2],
  block: match[0],
}));

if (resultBlocks.length !== 5) throw new Error(`Unexpected published result count: ${resultBlocks.length}`);

const psleYears = [...sourceFile.matchAll(/year:\s*(\d+),\s*\n\s*type:\s*"PSLE"/g)].map((match) => Number(match[1]));
const sfnaYears = [...sourceFile.matchAll(/year:\s*(\d+),\s*\n\s*type:\s*"SFNA"/g)].map((match) => Number(match[1]));

if (psleYears.join(",") !== expectedPsleYears.join(",")) throw new Error(`Unexpected PSLE coverage: ${psleYears.join(",")}`);
if (sfnaYears.join(",") !== expectedSfnaYears.join(",")) throw new Error(`Unexpected SFNA coverage: ${sfnaYears.join(",")}`);

if (!sourceFile.includes('sourceKind: "official"')) throw new Error("Official result provenance missing");
if (!sourceFile.includes('sourceKind: "secondary"')) throw new Error("Secondary-source provenance missing");
if (!sourceFile.includes("PS0101160")) throw new Error("Missing Sammena centre number");

const expectedInvariants = [
  { label: "PSLE 2022 candidates", pattern: /year:\s*2022,[\s\S]*?type:\s*"PSLE"[\s\S]*?candidates:\s*16/ },
  { label: "PSLE 2023 candidates", pattern: /year:\s*2023,[\s\S]*?type:\s*"PSLE"[\s\S]*?candidates:\s*18/ },
  { label: "PSLE 2024 candidates", pattern: /year:\s*2024,[\s\S]*?type:\s*"PSLE"[\s\S]*?candidates:\s*17/ },
  { label: "PSLE 2025 candidates", pattern: /year:\s*2025,[\s\S]*?type:\s*"PSLE"[\s\S]*?candidates:\s*29/ },
  { label: "SFNA 2024 candidates", pattern: /year:\s*2024,[\s\S]*?type:\s*"SFNA"[\s\S]*?candidates:\s*34/ },
  { label: "PSLE 2022 average", pattern: /year:\s*2022,[\s\S]*?average:\s*210\.9375/ },
  { label: "PSLE 2023 average", pattern: /year:\s*2023,[\s\S]*?average:\s*222\.8889/ },
  { label: "PSLE 2024 average", pattern: /year:\s*2024,[\s\S]*?type:\s*"PSLE"[\s\S]*?average:\s*198\.0588/ },
  { label: "PSLE 2025 average", pattern: /year:\s*2025,[\s\S]*?average:\s*162\.72/ },
  { label: "SFNA 2024 average", pattern: /year:\s*2024,[\s\S]*?type:\s*"SFNA"[\s\S]*?average:\s*174\.1176/ },
  { label: "PSLE 2022 grade", pattern: /year:\s*2022,[\s\S]*?grade:\s*"B"/ },
  { label: "PSLE 2023 grade", pattern: /year:\s*2023,[\s\S]*?grade:\s*"B"/ },
  { label: "PSLE 2024 grade", pattern: /year:\s*2024,[\s\S]*?type:\s*"PSLE"[\s\S]*?grade:\s*"B"/ },
  { label: "PSLE 2025 grade", pattern: /year:\s*2025,[\s\S]*?grade:\s*"B"/ },
  { label: "SFNA 2024 grade", pattern: /year:\s*2024,[\s\S]*?type:\s*"SFNA"[\s\S]*?grade:\s*"C"/ },
];

for (const invariant of expectedInvariants) {
  if (!invariant.pattern.test(sourceFile)) throw new Error(`${invariant.label} invariant failed`);
}

const provenanceInvariants = [
  { label: "PSLE 2022 official", pattern: /year:\s*2022,[\s\S]*?type:\s*"PSLE"[\s\S]*?sourceKind:\s*"official"/ },
  { label: "PSLE 2023 official", pattern: /year:\s*2023,[\s\S]*?type:\s*"PSLE"[\s\S]*?sourceKind:\s*"official"/ },
  { label: "PSLE 2024 official", pattern: /year:\s*2024,[\s\S]*?type:\s*"PSLE"[\s\S]*?sourceKind:\s*"official"/ },
  { label: "PSLE 2025 secondary", pattern: /year:\s*2025,[\s\S]*?type:\s*"PSLE"[\s\S]*?sourceKind:\s*"secondary"/ },
  { label: "SFNA 2024 official", pattern: /year:\s*2024,[\s\S]*?type:\s*"SFNA"[\s\S]*?sourceKind:\s*"official"/ },
];

for (const invariant of provenanceInvariants) {
  if (!invariant.pattern.test(sourceFile)) throw new Error(`${invariant.label} provenance invariant failed`);
}

const psle2025 = sourceFile.match(/year:\s*2025,[\s\S]*?type:\s*"PSLE"[\s\S]*?sourceKind:\s*"secondary"[\s\S]*?officialIndexUrl:\s*"([^"]+)"/);
if (!psle2025) throw new Error("PSLE 2025 must retain an official NECTA index link");
if (!psle2025[1].includes("onlinesys.necta.go.tz/results/2025/psle/results/")) throw new Error("PSLE 2025 official index link is not a NECTA results URL");

const psle2025Stats = sourceFile.match(/year:\s*2025,[\s\S]*?type:\s*"PSLE"[\s\S]*?candidates:\s*(\d+),[\s\S]*?passed:\s*(\d+),[\s\S]*?passRate:\s*([\d.]+),[\s\S]*?grades:\s*\{([\s\S]*?)\},/);
if (!psle2025Stats) throw new Error("PSLE 2025 published statistics are incomplete");
const [, candidateCount, passedCount, passRateText, gradeText] = psle2025Stats;
const candidateTotal = Number(candidateCount);
const passed = Number(passedCount);
const passRate = Number(passRateText);
if (passed > candidateTotal) throw new Error("PSLE 2025 passed count exceeds candidates");
if (Math.abs((passed / candidateTotal) * 100 - passRate) > 0.2) throw new Error("PSLE 2025 pass rate does not match passed/candidates");
const psle2025GradeCounts = [...gradeText.matchAll(/(A|B|C|D|E):\s*(\d+)/g)].reduce((sum, match) => sum + Number(match[2]), 0);
if (psle2025GradeCounts !== candidateTotal) throw new Error("PSLE 2025 grade distribution does not match candidates");

const officialUrls = [...sourceFile.matchAll(/sourceKind:\s*"official"[\s\S]*?sourceUrl:\s*"(https:\/\/[^" ]+)"/g)].map((match) => match[1]);
if (officialUrls.length !== 4) throw new Error(`Unexpected official source count: ${officialUrls.length}`);
if (officialUrls.some((url) => !url.startsWith("https://onlinesys.necta.go.tz/"))) throw new Error("Official result sources must point to NECTA");

const sourceUrls = [...sourceFile.matchAll(/https:\/\/[^"` ]+/g)].map((match) => match[0]);
if (sourceUrls.some((url) => url.includes("SFNA2018") || url.includes("SFNA2020"))) throw new Error("Unverified historical SFNA endpoint must not be hard-coded");

const registryPsle = registry.verifiedSchoolLevel.psle.join(",");
if (registryPsle !== "2022,2023,2024,2025") throw new Error("PSLE registry verification coverage changed unexpectedly");
const registrySfna = registry.verifiedSchoolLevel.sfna.join(",");
if (registrySfna !== "2024") throw new Error("SFNA registry verification coverage changed unexpectedly");

if (!Array.isArray(registry.sources) || registry.sources.length < 7) throw new Error("Results provenance registry incomplete");
const registryUrls = registry.sources.flatMap((source) => [source.url, source.officialIndexUrl].filter(Boolean));
for (const url of registryUrls) if (!url.startsWith("https://")) throw new Error(`Insecure provenance URL: ${url}`);

for (const exam of ["psle", "sfna"]) {
  const audit = registry.historicalArchiveAudit?.[exam];
  if (!audit) throw new Error(`Missing historical archive audit for ${exam.toUpperCase()}`);
  for (const year of historicalYears) {
    const entry = audit[String(year)];
    if (!entry) throw new Error(`Missing ${exam.toUpperCase()} ${year} archive audit entry`);
    if (entry.status !== historicalAuditStatus) throw new Error(`Unexpected ${exam.toUpperCase()} ${year} archive status: ${entry.status}`);
    if (entry.searchedCentre !== registry.centre) throw new Error(`Archive audit centre mismatch for ${exam.toUpperCase()} ${year}`);
  }
}

const auditedHistoricalYears = new Set([
  ...historicalYears.map((year) => `PSLE:${year}`),
  ...historicalYears.map((year) => `SFNA:${year}`),
]);
const publishedKeys = new Set(resultBlocks.map(({ year, block }) => `${block.includes('type: "PSLE"') ? "PSLE" : "SFNA"}:${year}`));
for (const key of auditedHistoricalYears) {
  if (publishedKeys.has(key)) throw new Error(`Historically unverified result must not be published: ${key}`);
}
if (publishedKeys.size !== resultBlocks.length) throw new Error("Duplicate published result detected");

console.log("Results archive integrity checks passed.");
console.log(`Historical archive audit passed for ${historicalYears.length * 2} unverified year/exam combinations.`);
