import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  prefetch: { prefetchAll: true },
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "dracula",
      },
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
