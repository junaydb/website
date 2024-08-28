import path from "path";
import type { ContentCollectionKey } from "astro:content";

export function getAllCollections() {
  const glob = import.meta.glob("../content/*/*");
  const dirs = [
    ...new Set(
      Object.keys(glob).map(
        (filepath) =>
          path.basename(path.dirname(filepath)) as ContentCollectionKey,
      ),
    ),
  ];
  return dirs;
}
