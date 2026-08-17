import { spawnSync } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";

const outdir = "dist";

async function main() {
  await rm(outdir, { recursive: true, force: true });
  await mkdir(outdir, { recursive: true });

  const shared = {
    entrypoints: ["src/index.ts"],
    target: "node" as const,
    sourcemap: "external" as const,
  };

  const [esm, cjs] = await Promise.all([
    Bun.build({ ...shared, outdir, format: "esm", naming: "[dir]/[name].js" }),
    Bun.build({ ...shared, outdir, format: "cjs", naming: "[dir]/[name].cjs" }),
  ]);

  for (const [label, result] of [
    ["esm", esm],
    ["cjs", cjs],
  ] as const) {
    if (!result.success) {
      console.error(`Bun.build (${label}) failed:`);
      for (const message of result.logs) console.error(String(message));
      process.exit(1);
    }
  }

  // Bun.build doesn't emit .d.ts files, so declarations come from tsc.
  const tsc = spawnSync("tsc", ["-p", "tsconfig.build.json"], {
    stdio: "inherit",
  });
  if (tsc.status !== 0) {
    process.exit(tsc.status ?? 1);
  }

  console.log("Build complete: dist/index.js, dist/index.cjs, dist/index.d.ts");
}

await main();
