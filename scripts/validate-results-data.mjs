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
