import { defineCollection } from "astro:content";
import { collectionSchema } from "src/schemas/collectionSchema";

const artCollection = defineCollection({
  type: "content",
  schema: collectionSchema,
});

const devCollection = defineCollection({
  type: "content",
  schema: collectionSchema,
});

export const collections = {
  art: artCollection,
  dev: devCollection,
};
