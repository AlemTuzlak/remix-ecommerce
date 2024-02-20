import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./tests/setup.unit.ts"],
    include: ["./app/**/*.test.{ts,tsx}"],
    exclude: ["./app/**/integration/*.test.{ts,tsx}"],
  },
});
