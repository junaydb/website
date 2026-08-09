"use client";

import Link from "next/link";
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEventHandler,
  ReactNode,
} from "react";

import styles from "./ActionListItem.module.scss";

interface ActionListItemProps {
  children?: ReactNode;
  date: Date;
  href?: string;
  onClick?: MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
  role?: string;
  style?: CSSProperties;
  target?: string;
}

export default function ActionListItem({
  href,
  target,
  onClick,
  children,
  date,
  style,
  role,
}: ActionListItemProps) {
  const resolvedRole = role || (href ? "link" : "button");
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(date)
    .toUpperCase();

  const dateElement = (
    <time className={styles.date} dateTime={date.toISOString()}>
      {formattedDate}
    </time>
  );

  if (href) {
    return (
      <Link
        className={styles.item}
        href={href}
        target={target}
        onClick={onClick}
        style={style}
        tabIndex={0}
        role={resolvedRole}
      >
        <span className={styles.text}>{children}</span>
        {dateElement}
      </Link>
    );
  }

  const handleKeyDown =
    role === "menuitem"
      ? undefined
      : (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            if (event.key === " ") event.preventDefault();
            event.currentTarget.click();
          }
        };

  return (
    <div
      className={styles.item}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={style}
      tabIndex={0}
      role={resolvedRole}
    >
      <span className={styles.text}>{children}</span>
      {dateElement}
    </div>
  );
}
