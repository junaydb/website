import * as React from 'react';
import styles from './BreadCrumbs.module.scss';

interface BreadCrumbsItem {
  url?: string;
  name: string;
}

interface BreadCrumbsProps {
  items: BreadCrumbsItem[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className={styles.root}>
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;
        const content =
          item.url && !isCurrent ? (
            <a className={styles.link} href={item.url}>
              {item.name}
            </a>
          ) : (
            <span className={styles.current} aria-current={isCurrent ? 'page' : undefined}>
              {item.name}
            </span>
          );

        return (
          <span className={styles.line} key={index}>
            {content}
            {index < items.length - 1 && <span className={styles.symbol}> ❯ </span>}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;
