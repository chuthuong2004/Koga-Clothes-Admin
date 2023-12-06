import React, { memo, useEffect } from 'react';

interface HelmetProps {
  title?: string;
  children: JSX.Element;
}
const Helmet: React.FC<HelmetProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = title ? title : 'www.kogaclothes.shop';
  }, [title]);
  return children;
};

export default memo(Helmet);
