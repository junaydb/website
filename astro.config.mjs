import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  prefetch: { prefetchAll: true },
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "vitesse-light",
    },
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
  },
});
