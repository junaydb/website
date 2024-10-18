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

const textRowOrLinkRow = z.union([textRow, linkRow]);

export type linkRowType = z.infer<typeof linkRow.shape.items.element>;

export const collectionSchema = z.object({
  // required
  title: z.string(),
  order: z.number(),

  // optionals
  layout: z.string().optional(),
  coverArt: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  rows: textRowOrLinkRow.array().optional(),
});
