import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { remixDevTools } from "remix-development-tools/vite";
import { routes } from "./remix/config";
import { vercelPreset } from "@vercel/remix/vite";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({ routes, presets: [vercelPreset()] }),
    tsconfigPaths(),
    iconsSpritesheet({
      inputDir: "./resources/icons",
      outputDir: "./app/library/icon/icons",
      withTypes: true,
      fileName: "icon.svg",
    }),
  ],
  define: {
    POSTHOG_API_KEY: JSON.stringify(process.env.POSTHOG_API_KEY),
    POSTHOG_API_ENDPOINT: JSON.stringify(process.env.POSTHOG_API_ENDPOINT),
  },
  ssr: {
    noExternal: ["remix-i18next"],
  },
  server: {
    open: true,
    port: 3000,
  },
});
