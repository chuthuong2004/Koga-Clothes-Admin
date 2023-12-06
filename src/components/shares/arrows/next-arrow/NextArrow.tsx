import React, { ClassAttributes, memo } from 'react';
import { NextArrowIcon } from '../../Icons';

interface Props extends React.HTMLAttributes<HTMLDivElement>, ClassAttributes<HTMLDivElement> {}
const NextArrow: React.FC<Props> = ({ className, ...passProps }) => {
  return (
    <div className={`btn-arrow btn-next ${className}`} {...passProps}>
      <NextArrowIcon />
    </div>
  );
};

export default memo(NextArrow);
