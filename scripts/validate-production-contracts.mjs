import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const fail = (message) => {
  console.error(`[production-contract] FAIL: ${message}`);
  process.exitCode = 1;
};
const ok = (message) => console.log(`[production-contract] OK: ${message}`);

const requiredFiles = [
  "package.json",
  "pnpm-lock.yaml",
  "render.yaml",
  ".env.example",
  "next.config.mjs",
  "app/layout.tsx",
  "app/page.tsx",
  "app/api/health/route.ts",
];

for (const file of requiredFiles) {
  if (fs.existsSync(path.join(root, file))) ok(`required file ${file}`);
  else fail(`missing required file ${file}`);
}

const pkg = JSON.parse(read("package.json"));
if (pkg.packageManager !== "pnpm@10.15.0") {
  fail(`packageManager must be pnpm@10.15.0, found ${pkg.packageManager ?? "missing"}`);
} else ok("package manager is pinned to pnpm@10.15.0");

const requiredScripts = [
  "build",
  "start",
  "typecheck",
  "test",
  "test:unit",
  "test:data",
  "test:portal-schema",
  "db:migrate",
];
for (const script of requiredScripts) {
  if (typeof pkg.scripts?.[script] === "string" && pkg.scripts[script].trim()) {
    ok(`package script ${script}`);
  } else {
    fail(`missing package script ${script}`);
  }
}

const env = read(".env.example");
for (const key of ["DATABASE_URL", "SAMMENA_SCHOOL_ID"]) {
  if (new RegExp(`^\\s*${key}=\`, "m").test(env)) ok(`.env.example declares ${key}`);
  else fail(`.env.example is missing ${key}`);
}

const render = read("render.yaml");
for (const fragment of [
  "buildCommand: pnpm install --frozen-lockfile && pnpm build",
  "startCommand: pnpm start",
  "branch: main",
  "autoDeploy: true",
  "key: DATABASE_URL",
  "key: SAMMENA_SCHOOL_ID",
]) {
  if (render.includes(fragment)) ok(`Render contract: ${fragment}`);
  else fail(`Render contract missing: ${fragment}`);
}

const health = read("app/api/health/route.ts");
if (health.includes('Cache-Control", "no-store"')) ok("health endpoint disables caching");
else fail("health endpoint must disable caching");

if (health.includes("status: data.status === \"ok\" ? 200 : 503")) ok("health endpoint maps degraded state to HTTP 503");
else fail("health endpoint must return HTTP 503 when backend health is not ok");

const layout = read("app/layout.tsx");
if (layout.includes("metadataBase: new URL(siteUrl)")) ok("metadataBase is configured");
else fail("metadataBase is not configured");

const page = read("app/page.tsx");
for (const route of ["/admissions", "/academics", "/calendar", "/library", "/contact", "/location"]) {
  if (page.includes(`href="${route}"`)) ok(`home navigation contract: ${route}`);
  else fail(`home navigation is missing ${route}`);
}

if (process.exitCode) {
  console.error("[production-contract] Production contract validation failed.");
  process.exit(process.exitCode);
}
console.log("[production-contract] All production contracts passed.");
