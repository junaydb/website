import type { ComponentPropsWithoutRef } from "react";

import styles from "./ListItem.module.scss";

export default function ListItem({
  className,
  ...props
}: ComponentPropsWithoutRef<"li">) {
  const classes = className
    ? `${styles.contentListItem} ${className}`
    : styles.contentListItem;

  return <li className={classes} {...props} />;
}
