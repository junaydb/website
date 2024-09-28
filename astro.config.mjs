import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import aws from "astro-sst";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: aws(),
  prefetch: true,
  integrations: [mdx()],
});
