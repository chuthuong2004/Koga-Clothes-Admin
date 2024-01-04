import { Typography } from 'antd';
import { CategoryBlogList } from './components';

const CategoryBlog = () => {
  return (
    <div className="h-full flex-col flex gap-12">
      <Typography.Title level={3}>Danh mục bài viết</Typography.Title>
      <CategoryBlogList />
    </div>
  );
};

export default CategoryBlog;
