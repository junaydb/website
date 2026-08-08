import type { ComponentPropsWithoutRef } from "react";

import styles from "./Grid.module.scss";

export default function Grid({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const classes = className ? `${styles.grid} ${className}` : styles.grid;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
