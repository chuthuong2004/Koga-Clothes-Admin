import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import ReactLoading from 'react-loading';
import { memo } from 'react';
const cx = classNames.bind(styles);
const Loading = () => {
  return (
    <div className={cx('container')}>
      <ReactLoading type="bubbles" color="#2E2E2E" width={120} height={120} delay={10} />
    </div>
  );
};

export default memo(Loading);
