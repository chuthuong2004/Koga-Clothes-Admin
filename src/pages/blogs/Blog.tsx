import React from 'react';
import { StatsBrand, BrandTable } from './components';
const Brand = () => {
  return (
    <div className="h-full flex-col flex gap-12">
      <StatsBrand />
      <BrandTable />
    </div>
  );
};

export default Brand;
