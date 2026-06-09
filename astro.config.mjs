import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import imagekit from "@imagekit/astro/integration";

export default defineConfig({
  site: "https://junaydb.com",
  prefetch: { prefetchAll: true },
  integrations: [
    mdx(),
    react(),
    sitemap(),
    imagekit({
      urlEndpoint: "https://ik.imagekit.io/xqhypdkfa",
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "night-owl-light",
        dark: "night-owl",
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
    responsiveStyles: true,
    layout: "constrained",
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: [400],
      fallbacks: ["monospace"],
      display: "swap",
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Mono",
      cssVariable: "--font-ibm-plex-mono",
      weights: [500],
      fallbacks: ["monospace"],
      display: "swap",
    },
  ],
});

