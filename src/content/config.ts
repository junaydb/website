import { defineCollection } from "astro:content";
import { artCollectionSchema, devCollectionSchema } from "src/schemas/schemas";

const artCollection = defineCollection({
	type: "content",
	schema: artCollectionSchema,
});

const devCollection = defineCollection({
	type: "content",
	schema: devCollectionSchema,
});

export const collections = {
	art: artCollection,
	dev: devCollection,
};
