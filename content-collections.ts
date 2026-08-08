import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  metaDescription: z.string().max(160),
  date: z.coerce.date(),
  order: z.number(),
  published: z.boolean(),
  tags: z.array(z.string()).optional(),
  links: z
    .array(
      z.object({
        text: z.string(),
        href: z.url(),
      }),
    )
    .optional(),
  content: z.string(),
});

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: ["projects/*.mdx", "essays/*.mdx"],
  schema: postSchema,
});

export default defineConfig({
  content: [posts],
});
