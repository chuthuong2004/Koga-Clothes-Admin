import React from 'react';
import { ProductTable, StatsProduct } from './components';
const Product = () => {
  return (
    <div className="h-full flex-col flex gap-12">
      <StatsProduct />
      <ProductTable />
    </div>
  );
};

export default Product;
