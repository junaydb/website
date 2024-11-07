import { defineCollection } from "astro:content";
import { collectionSchema } from "./collectionSchema";
import { glob } from "astro/loaders";

const postCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/markdown/posts" }),
  schema: collectionSchema,
});

export const collections = {
  posts: postCollection,
};
