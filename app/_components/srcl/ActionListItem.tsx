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
  href?: string;
  icon?: ReactNode;
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
  icon,
  style,
  role,
}: ActionListItemProps) {
  const resolvedRole = role || (href ? "link" : "button");

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
        <figure className={styles.icon}>{icon}</figure>
        <span className={styles.text}>{children}</span>
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
      <figure className={styles.icon}>{icon}</figure>
      <span className={styles.text}>{children}</span>
    </div>
  );
}
