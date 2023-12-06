import React, { ClassAttributes, memo } from 'react';
import { PrevArrowIcon } from '../../Icons';

interface Props extends React.HTMLAttributes<HTMLDivElement>, ClassAttributes<HTMLDivElement> {}

const PrevArrow: React.FC<Props> = ({ className, ...passProps }) => {
  return (
    <div className={`btn-arrow btn-prev ${className}`} {...passProps}>
      <PrevArrowIcon />
    </div>
  );
};

export default memo(PrevArrow);
