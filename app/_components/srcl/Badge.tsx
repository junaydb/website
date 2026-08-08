import type { ComponentPropsWithoutRef } from "react";

import styles from "./Badge.module.scss";

export default function Badge({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  const classes = className ? `${styles.root} ${className}` : styles.root;

  return <span className={classes} {...props} />;
}
