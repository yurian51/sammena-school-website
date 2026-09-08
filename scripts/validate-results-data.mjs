import fs from "node:fs";

const file = fs.readFileSync("app/results/page.tsx", "utf8");

for (const year of ["2018","2019","2020","2021","2022","2023","2024","2025"]) {
  if (!file.includes(year)) throw new Error(`Missing results year: ${year}`);
}

for (const marker of ["const psle = [", "const sfna = [", "PS0101160"]) {
  if (!file.includes(marker)) throw new Error(`Missing results marker: ${marker}`);
}

if (file.includes('source: undefined')) {
  throw new Error("Undefined historical results source");
}

console.log("Results archive integrity checks passed.");

const registry = JSON.parse(fs.readFileSync("data/results-sources.json", "utf8"));
if (registry.centre !== "PS0101160") throw new Error("Unexpected Sammena centre number");
if (registry.verifiedSchoolLevel.psle.join(",") !== "2022,2023,2024,2025") throw new Error("PSLE verification coverage changed unexpectedly");
if (registry.verifiedSchoolLevel.sfna.join(",") !== "2023,2024,2025") throw new Error("SFNA verification coverage changed unexpectedly");
if (!Array.isArray(registry.sources) || registry.sources.length < 7) throw new Error("Results provenance registry incomplete");
