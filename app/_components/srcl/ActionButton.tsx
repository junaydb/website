"use client";

import { forwardRef } from "react";
import type {
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from "react";

import styles from "./ActionButton.module.scss";

interface ActionButtonProps extends HTMLAttributes<HTMLDivElement> {
  hotkey?: ReactNode;
  isSelected?: boolean;
  rootStyle?: CSSProperties;
}

const classNames = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const isEmpty = (value: ReactNode) =>
  value === null || value === undefined || value === false || value === "";

const ActionButton = forwardRef<HTMLDivElement, ActionButtonProps>(
  (
    {
      onClick,
      hotkey,
      children,
      style,
      rootStyle,
      isSelected,
      className,
      role = "button",
      tabIndex = 0,
      ...props
    },
    ref,
  ) => {
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (event.key === "Enter" || event.key === " ") {
        if (event.key === " ") event.preventDefault();
        event.currentTarget.click();
      }
    }

    return (
      <div
        className={classNames(
          styles.root,
          isSelected && styles.selected,
          className,
        )}
        style={rootStyle}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={tabIndex}
        ref={ref}
        role={role}
        {...props}
      >
        {isEmpty(hotkey) ? null : (
          <span className={styles.hotkey}>{hotkey}</span>
        )}
        <span className={styles.content} style={style}>
          {children}
        </span>
      </div>
    );
  },
);

ActionButton.displayName = "ActionButton";

export default ActionButton;
