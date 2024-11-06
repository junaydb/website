import { defineCollection } from "astro:content";
import { collectionSchema } from "./collectionSchema";
import { glob } from "astro/loaders";

const artCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/markdown/art" }),
  schema: collectionSchema,
});

const devCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/markdown/dev" }),
  schema: collectionSchema,
});

export const collections = {
  art: artCollection,
  dev: devCollection,
};
