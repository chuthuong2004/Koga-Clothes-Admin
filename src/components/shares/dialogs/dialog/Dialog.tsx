import React, { ReactNode, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Dialog.module.scss';
import { CloseIcon } from '../../Icons';
const cx = classNames.bind(styles);

interface Props {
  title: string;
  description: string;
  isOpenDialog: boolean;
  children: ReactNode;
  handleCloseDialog: () => void;
}
const Dialog: React.FC<Props> = ({
  title,
  description,
  isOpenDialog,
  handleCloseDialog,
  children,
}) => {
  return (
    <div className={cx('container', isOpenDialog && 'active')}>
      <div className={cx('close-icon')} onClick={handleCloseDialog}>
        <CloseIcon color="#ffffff" />
      </div>
      <div className={cx('header')}>
        <p className={cx('title')}>{title}</p>
        <p className={cx('description')}>{description}</p>
      </div>
      <div className={cx('actions')}>{children}</div>
    </div>
  );
};

export default memo(Dialog);
