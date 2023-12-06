import classNames from 'classnames/bind';
import styles from './Popper.module.scss';
import React, { memo } from 'react';
const cx = classNames.bind(styles);

type Props = {
  children: React.ReactNode;
  className?: string;
};
const Wrapper: React.FC<Props> = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>;
};
export default memo(Wrapper);
