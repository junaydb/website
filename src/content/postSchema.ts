import { z } from "astro:content";

const textRow = z.object({
  type: z.literal("text"),
  title: z.string(),
  items: z.string().array(),
});

const linkRow = z.object({
  type: z.literal("links"),
  title: z.string(),
  items: z
    .object({
      text: z.string(),
      href: z.string().url(),
    })
    .array(),
});

export type textRowType = z.infer<typeof textRow.shape.items.element>;

export type linkRowType = z.infer<typeof linkRow.shape.items.element>;

export const postSchema = z.object({
  // required
  title: z.string(),
  date: z.date(),
  order: z.number(),
  published: z.boolean(),

  // optionals
  layout: z.string().optional(),
  coverArt: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  description: z.string().optional(),
  rows: z.union([textRow, linkRow]).array().optional(),
});
