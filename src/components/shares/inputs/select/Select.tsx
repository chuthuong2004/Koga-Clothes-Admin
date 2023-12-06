import React, { ClassAttributes, forwardRef, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Select.module.scss';
import { ArrowDownIcon } from '../../Icons';
const cx = classNames.bind(styles);

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
  ClassAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  onChangeSelected?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  error?: string;
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  name,
  children,
  error,
  onChangeSelected = () => { },
  ...passProps
}, ref) => {
  return (
    <div className={cx('container')}>
      <label className={cx('label')} htmlFor="">
        {label}
      </label>
      <div className={cx('wrapper')}>
        <select
          ref={ref}
          name={name}
          onChange={onChangeSelected}
          className={cx('stored-addresses', error && 'error')}
          id=""
          {...passProps}
        >
          {children}
        </select>
        <div className={cx('arrow-down')}>
          <ArrowDownIcon />
        </div>
      </div>
      {error && <p className="message-error">{error}</p>}
    </div>
  );
});

export default memo(Select);
