import Link from "next/link";
import type { CSSProperties } from "react";

import styles from "./Contents.module.scss";

export interface MarkdownHeading {
  depth: number;
  slug: string;
  text: string;
}

interface ContentsProps {
  headings: readonly MarkdownHeading[];
}

export default function Contents({ headings }: ContentsProps) {
  const links = headings.filter((heading) => heading.slug && heading.text);

  if (links.length === 0) return null;

  return (
    <nav aria-labelledby="contents-heading" className={styles.contents}>
      <h2 id="contents-heading">Contents</h2>
      <ol>
        {links.map((heading) => (
          <li
            key={heading.slug}
            style={
              {
                "--depth": Math.max(0, heading.depth - 2),
              } as CSSProperties
            }
          >
            <Link href={`#${heading.slug}`}>{heading.text}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
