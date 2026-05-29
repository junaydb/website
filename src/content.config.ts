import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const tags = z.object({
  type: z.literal("tags"),
  items: z.string().array(),
});

const links = z.object({
  type: z.literal("links"),
  items: z
    .object({
      text: z.string(),
      href: z.url(),
    })
    .array(),
});

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  order: z.number(),
  published: z.boolean(),
  meta: z.union([tags, links]).array().optional(),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./posts" }),
  schema: postSchema,
});

export const collections = { posts };
