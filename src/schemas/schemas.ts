import { z } from "astro:content";

export const artCollectionSchema = z.object({
	layout: z.string(),
	title: z.string(),
	publishDate: z.date(),
	coverArt: z.object({
		src: z.string(),
		alt: z.string(),
	}),
	softwareList: z.string().array(),
});
export type ArtCollectionSchema = z.infer<typeof artCollectionSchema>;

export const devCollectionSchema = z.object({
	layout: z.string(),
	title: z.string(),
	publishDate: z.date(),
	softwareList: z.string().array(),
});
export type DevCollectionSchema = z.infer<typeof devCollectionSchema>;
