import path from "path";
import type { CollectionKey } from "astro:content";

export function getAllCollectionNames() {
  const glob = import.meta.glob("./markdown/*/*");
  const dirs = [
    ...new Set(
      Object.keys(glob).map(
        (filepath) => path.basename(path.dirname(filepath)) as CollectionKey,
      ),
    ),
  ];
  return dirs;
}
