import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { remixDevTools } from "remix-development-tools/vite";

export default defineConfig({
  plugins: [remixDevTools(), remix(), tsconfigPaths()],
  ssr: {
    noExternal: ["remix-i18next"],
  },
});
