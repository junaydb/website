import * as React from 'react';
import styles from './ActionButton.module.scss';

interface ActionButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
  hotkey?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  rootStyle?: React.CSSProperties;
  isSelected?: boolean;
}

const classNames = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

const isEmpty = (value: React.ReactNode) =>
  value === null || value === undefined || value === false || value === '';

const ActionButton = React.forwardRef<HTMLDivElement, ActionButtonProps>(
  (
    {
      onClick,
      hotkey,
      children,
      style,
      rootStyle,
      isSelected,
      className,
      role = 'button',
      tabIndex = 0,
      ...rest
    },
    ref
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (event.key === ' ') event.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        className={classNames(styles.root, isSelected ? styles.selected : null, className)}
        style={rootStyle}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={tabIndex}
        ref={ref}
        role={role}
        {...rest}
      >
        {isEmpty(hotkey) ? null : <span className={styles.hotkey}>{hotkey}</span>}
        <span className={styles.content} style={style}>
          {children}
        </span>
      </div>
    );
  }
);

ActionButton.displayName = 'ActionButton';

export default ActionButton;
