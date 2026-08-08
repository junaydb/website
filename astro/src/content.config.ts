import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const projectPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  metaDescription: z.string().max(160),
  date: z.date(),
  order: z.number(),
  published: z.boolean(),
  tags: z.string().array().optional(),
  links: z
    .object({
      text: z.string(),
      href: z.url(),
    })
    .array()
    .optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./posts/projects" }),
  schema: projectPostSchema,
});

export const collections = { projects };
