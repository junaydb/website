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
      enabled: z.boolean(),
      title: z.string(),
      href: z.string().url(),
    })
    .array(),
});
