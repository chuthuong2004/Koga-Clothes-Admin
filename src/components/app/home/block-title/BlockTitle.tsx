import classNames from 'classnames/bind';
import styles from './BlockTitle.module.scss';
import React, { memo } from 'react';
const cx = classNames.bind(styles);

export type Props = {
  title: string;
  strong: string;
};
const BlockTitle: React.FC<Props> = ({ title, strong }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('block-title')}>{title}</div>
      <strong>{strong}</strong>
    </div>
  );
};
export default memo(BlockTitle);
