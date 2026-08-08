import { allPosts } from "content-collections";
import type { MetadataRoute } from "next";

import { siteUrl } from "./_lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["/", "/maintenance"].map(
    (path) => ({
      url: new URL(path, siteUrl).toString(),
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: new URL(post._meta.path, siteUrl).toString(),
      lastModified: post.date,
    }));

  return [...staticRoutes, ...postRoutes];
}
