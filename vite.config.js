import { defineConfig } from "vite";
import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import { svelte } from "@sveltejs/vite-plugin-svelte";

function staticSpaRoutes(routes) {
  let outDir;

  return {
    name: "static-spa-routes",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      await Promise.all(
        routes.map(async (route) => {
          const routeDir = resolve(outDir, route);
          await mkdir(routeDir, { recursive: true });
          await copyFile(resolve(outDir, "index.html"), resolve(routeDir, "index.html"));
        }),
      );
    },
  };
}

export default defineConfig({
  plugins: [svelte(), staticSpaRoutes(["talks"])],

  base: "/the-voda/",
});
