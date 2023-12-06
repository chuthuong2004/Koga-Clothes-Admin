import classNames from 'classnames/bind';
import { EyeIcon, EyeActiveIcon } from '../../Icons';
import styles from './Input.module.scss';
import React, { useState, useEffect, memo, useId, ClassAttributes, forwardRef } from 'react';

const cx = classNames.bind(styles);
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  ClassAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rounded?: boolean;
  textArea?: boolean;
}
const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  type = 'text',
  placeholder,
  name = '',
  error,
  textArea,
  onChange,
  // rounded,
  ...passProps
}, ref) => {
  const idInput = useId();
  const [displayed, setDisplayed] = useState(false);

  const handleClickEye: React.MouseEventHandler<HTMLDivElement> = () => {
    setDisplayed(!displayed);
  };

  const props: any = {
    onChange,
    ...passProps,
  };

  useEffect(() => {
    setDisplayed(false);
  }, [!props.value]);

  return (
    <div className="w-full">
      {type === 'checkbox' || type === 'radio' ? (
        <div className={cx('checkbox', 'flex-1')}>
          <input
            ref={ref}
            type={type}
            id={idInput}
            checked={props.checked}
            name={name}
            placeholder={placeholder}
            {...props}
            className={`${type === 'radio' ? 'custom-radio' : 'custom-checkbox' } ${props.className}`}
          />
          <label htmlFor={idInput}>
            <span></span>
            {label}
          </label>
        </div>
      ) : (
        <div className={cx('input-container')}>
          {label && (
            <label className={cx('input-label')} htmlFor={idInput}>
              {label}
            </label>
          )}
          <div className={cx('input', error && 'error')}>

            {textArea ? (
              <textarea
                ref
                cols={30}
                rows={10}
                name={name}
                id={idInput}
                placeholder={placeholder}
                {...props}
              ></textarea>
            ) : (
              <input
                ref={ref}
                type={displayed ? 'text' : type}
                name={name}
                id={idInput}
                placeholder={placeholder}
                {...props}
              />
            )}

            {type === 'password' && (
              <div
                onClick={props.value ? handleClickEye : undefined}
                className={cx('icon-eye', !props.value && 'disabled')}
              >
                {displayed ? <EyeActiveIcon /> : <EyeIcon />}
              </div>
            )}

          </div>
        </div>
      )}
      {error && (
        <span className={cx('message-error', 'error')}>
          {error}
        </span>
      )}

    </div>
  );
});

export default memo(Input);
