import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  prefetch: true,
  integrations: [mdx()],
});
