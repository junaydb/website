import { z } from "astro:content";

export const sectionSchema = z.object({
  // id: Art
  // items:
  //   - enabled: true
  //     title: Example A
  //     href: https://exampleA.com
  //   - enabled: false
  //     title: Example B
  //     href: https://exampleB.com
  id: z.string(),
  items: z
    .object({
      title: z.string(),
      href: z.string().url(),
      enabled: z.boolean(),
    })
    .array(),
});
