import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  prefetch: true,
  integrations: [mdx()],
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
