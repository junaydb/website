import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  prefetch: { prefetchAll: true },
  integrations: [mdx()],
  image: {
    domains: ["ik.imagekit.io"],
  },
});
