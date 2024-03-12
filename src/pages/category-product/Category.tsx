import { Typography } from 'antd';
import { CategoryProductList } from './components';

const CategoryProduct = () => {
  return (
    <div className="h-full flex-col flex gap-12">
      <Typography.Title level={3}>Danh mục sản phẩm</Typography.Title>
      <CategoryProductList />
    </div>
  );
};

export default CategoryProduct;
