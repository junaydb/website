import { defineCollection } from "astro:content";
import { collectionSchema } from "src/schemas/collectionSchema";
import { glob } from "astro/loaders";

const artCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content-v5/art" }),
  schema: collectionSchema,
});

const devCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content-v5/dev" }),
  schema: collectionSchema,
});

export const collections = {
  art: artCollection,
  dev: devCollection,
};
