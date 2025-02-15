import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts", "src/routes/**/*"],
    format: "esm",
    outDir: "dist",
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
});
