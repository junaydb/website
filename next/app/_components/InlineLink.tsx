import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./InlineLink.module.scss";

export default function InlineLink({
  children,
  className,
  href,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (!href) {
    throw new TypeError("Inline links must have an href.");
  }

  const classes = className
    ? `${styles.inlineLink} ${className}`
    : styles.inlineLink;

  return (
    <Link
      className={classes}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <Image
        className={styles.icon}
        src="/externalLinkIcon.svg"
        alt="Opens in new tab"
        width={15}
        height={15}
      />
    </Link>
  );
}
