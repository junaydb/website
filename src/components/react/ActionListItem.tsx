import * as React from 'react';
import styles from './ActionListItem.module.scss';

interface ActionListItemProps {
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
  role?: string;
}

const ActionListItem: React.FC<ActionListItemProps> = (props) => {
  const { href, target, onClick, children, icon, style, role } = props;
  const resolvedRole = role || (href ? 'link' : 'button');

  if (href) {
    return (
      <a
        className={styles.item}
        href={href}
        target={target}
        style={style}
        tabIndex={0}
        role={resolvedRole}
      >
        <figure className={styles.icon}>{icon}</figure>
        <span className={styles.text}>{children}</span>
      </a>
    );
  }

  const handleKeyDown =
    role === 'menuitem'
      ? undefined
      : (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            if (event.key === ' ') event.preventDefault();
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
};

export default ActionListItem;
