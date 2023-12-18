import React from 'react';
import { CategoryList, StatsCategory } from './components';
import './_category.scss';

const Category = () => {
  return (
    <div className="h-full flex-col flex gap-12">
      <StatsCategory />
      <CategoryList />
    </div>
  );
};

export default Category;
