import Link from "next/link";

import styles from "./Breadcrumbs.module.scss";

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={styles.root}>
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;
        const content =
          item.url ? (
            <Link
              aria-current={isCurrent ? "page" : undefined}
              className={styles.link}
              href={item.url}
            >
              {item.name}
            </Link>
          ) : (
            <span
              className={styles.current}
              aria-current={isCurrent ? "page" : undefined}
            >
              {item.name}
            </span>
          );

        return (
          <span
            className={styles.line}
            key={`${item.name}-${item.url ?? index}`}
          >
            {content}
            {index < items.length - 1 && (
              <span className={styles.symbol} aria-hidden="true">
                {" ❯ "}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
