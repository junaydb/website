import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.scss";

interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  mode?: "left" | "right" | string;
  title?: ReactNode;
}

export default function Card({
  children,
  mode,
  title,
  className,
  ...props
}: CardProps) {
  const classes = className ? `${styles.card} ${className}` : styles.card;
  const leftClass = mode === "left" ? styles.leftCorner : styles.left;
  const rightClass = mode === "right" ? styles.rightCorner : styles.right;

  return (
    <article className={classes} {...props}>
      <header className={styles.action}>
        <div className={leftClass} aria-hidden="true" />
        {title ? <h2 className={styles.title}>{title}</h2> : null}
        <div className={rightClass} aria-hidden="true" />
      </header>
      <section className={styles.children}>{children}</section>
    </article>
  );
}
