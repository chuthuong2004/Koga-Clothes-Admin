import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import React, { ReactNode, memo } from 'react';
const cx = classNames.bind(styles);
export interface PropsButton extends React.HTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  primary?: boolean;
  outline?: boolean;
  disabled?: boolean;
  text?: boolean;
  large?: boolean;
  small?: boolean;
  rounded?: boolean;
  border?: boolean;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  state?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const Button: React.FC<PropsButton> = ({
  to,
  href,
  primary = false,
  outline = false,
  disabled = false,
  text = false,
  large = false,
  small = false,
  rounded = false,
  children,
  className,
  leftIcon,
  rightIcon,
  border,
  icon,
  onClick,
  ...passProps
}) => {
  let Comp: any = 'button';
  const props: any = {
    onClick,
    ...passProps,
  };
  // if (disabled) {
  //     delete props.onClick;
  // }
  // Remove event
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof key === 'function') {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    border,
    [className ? className : '']: className,
  });
  return (
    <Comp className={classes} {...props}>
      {icon && <span className={cx('icon-abs')}>{icon}</span>}
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
};
export default memo(Button);
