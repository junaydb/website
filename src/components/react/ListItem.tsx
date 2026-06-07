import * as React from "react";
import styles from "./ListItem.module.scss";

const focusableSelectors = [
  "a[href]",
  "button",
  "input",
  "select",
  "textarea",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(", ");

const findNextFocusable = (
  element: Element | null,
  direction: "next" | "previous" = "next",
): HTMLElement | null => {
  if (!element) return null;

  const focusableElements = Array.from(
    document.querySelectorAll<HTMLElement>(focusableSelectors),
  );
  const currentIndex = focusableElements.indexOf(element as HTMLElement);

  if (currentIndex === -1 || focusableElements.length === 0) return null;

  const nextIndex =
    direction === "next"
      ? (currentIndex + 1) % focusableElements.length
      : (currentIndex - 1 + focusableElements.length) %
        focusableElements.length;

  return focusableElements[nextIndex] ?? null;
};

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  onKeyDown,
  tabIndex = 0,
  ...rest
}) => {
  const itemRef = React.useRef<HTMLLIElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    switch (event.key) {
      case "Enter":
        event.preventDefault();
        itemRef.current?.click();
        break;
      case "ArrowUp":
      case "ArrowLeft": {
        event.preventDefault();
        const previousFocusable = findNextFocusable(
          document.activeElement,
          "previous",
        );
        previousFocusable?.focus();
        break;
      }
      case "ArrowDown":
      case "ArrowRight": {
        event.preventDefault();
        const nextFocusable = findNextFocusable(document.activeElement, "next");
        nextFocusable?.focus();
        break;
      }
      default:
        break;
    }
  };

  return (
    <li
      {...rest}
      className={styles.root}
      tabIndex={tabIndex}
      ref={itemRef}
      onKeyDown={handleKeyDown}
    >
      {children}
    </li>
  );
};

export default ListItem;
