import { defineCollection } from "astro:content";
import { postSchema } from "./postSchema";
import { sectionSchema } from "./sectionSchema";
import { glob, file } from "astro/loaders";

const postCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/markdown/content" }),
  schema: postSchema,
});

const sectionCollection = defineCollection({
  loader: file("./src/markdown/content/sections.yaml"),
  schema: sectionSchema,
});

export const collections = {
  posts: postCollection,
  sections: sectionCollection,
};
