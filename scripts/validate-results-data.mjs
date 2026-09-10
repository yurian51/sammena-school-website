import fs from "node:fs";

const sourceFile = fs.readFileSync("lib/academic-results.ts", "utf8");
const registry = JSON.parse(fs.readFileSync("data/results-sources.json", "utf8"));

if (registry.centre !== "PS0101160") throw new Error("Unexpected Sammena centre number");

const expectedPsleYears = [2022, 2023, 2024, 2025];
const expectedSfnaYears = [2024];

const psleYears = [...sourceFile.matchAll(/year:\s*(\d+),\s*\n\s*type:\s*"PSLE"/g)].map((match) => Number(match[1]));
const sfnaYears = [...sourceFile.matchAll(/year:\s*(\d+),\s*\n\s*type:\s*"SFNA"/g)].map((match) => Number(match[1]));

if (psleYears.join(",") !== expectedPsleYears.join(",")) {
  throw new Error(`Unexpected PSLE coverage: ${psleYears.join(",")}`);
}

if (sfnaYears.join(",") !== expectedSfnaYears.join(",")) {
  throw new Error(`Unexpected SFNA coverage: ${sfnaYears.join(",")}`);
}

for (const year of expectedPsleYears) {
  if (!sourceFile.includes(`year: ${year}`)) throw new Error(`Missing PSLE ${year}`);
}

if (!sourceFile.includes('sourceKind: "official"')) throw new Error("Official result provenance missing");
if (!sourceFile.includes('sourceKind: "secondary"')) throw new Error("Secondary-source provenance missing");
if (!sourceFile.includes("PS0101160")) throw new Error("Missing Sammena centre number");

const registryPsle = registry.verifiedSchoolLevel.psle.join(",");
if (registryPsle !== "2022,2023,2024,2025") throw new Error("PSLE registry verification coverage changed unexpectedly");

const registrySfna = registry.verifiedSchoolLevel.sfna.join(",");
if (registrySfna !== "2023,2024,2025") throw new Error("SFNA registry verification coverage changed unexpectedly");

if (!Array.isArray(registry.sources) || registry.sources.length < 7) {
  throw new Error("Results provenance registry incomplete");
}

const sourceUrls = [...sourceFile.matchAll(/https:\/\/[^"\` ]+/g)].map((match) => match[0]);
if (sourceUrls.some((url) => url.includes("SFNA2018") || url.includes("SFNA2020"))) {
  throw new Error("Unverified historical SFNA endpoint must not be hard-coded");
}

console.log("Results archive integrity checks passed.");
