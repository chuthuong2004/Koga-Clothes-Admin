import { usePagination } from '@/hooks/helpers';
import { categoryBlogService } from '@/services';
import { Nullable } from '@/types/commons';
import { StoreCategoryBlog } from '@/types/entities';
import { Breadcrumb, BreadcrumbProps, Typography } from 'antd';
import { motion } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
import { mutate } from 'swr';
import { CategoryItemBlog, FormCategoryBlog } from '.';

const CategoryBlogList = () => {
  const [itemsBreadcrumb, setItemsBreadcrumb] = useState<BreadcrumbProps['items']>([
    {
      title: (
        <Typography.Text
          onClick={() => {
            mutate('ListCategoryBlog');
          }}
          className='cursor-pointer'
        >
          Tất cả danh mục
        </Typography.Text>
      ),
      path: '',
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Nullable<StoreCategoryBlog>>(null);
  const { data, isLoading, isValidating } = usePagination(
    `ListCategoryBlog${itemsBreadcrumb?.[itemsBreadcrumb.length - 1].path}`,
    {
      page: 1,
      limit: 10,
      offset: 0,
      parent: itemsBreadcrumb?.[itemsBreadcrumb.length - 1].path || '',
    },
    categoryBlogService.getAll,
  );

  const handleAddItemsBreadcrumb = useCallback(
    (newCategory: StoreCategoryBlog) => {
      setItemsBreadcrumb((prev) => {
        if (prev)
          return [
            ...prev,
            {
              title: (
                <div
                  onClick={() => {
                    console.log(itemsBreadcrumb);
                  }}
                  className='cursor-pointer'
                >
                  <Typography.Text>{newCategory.name}</Typography.Text>
                </div>
              ),
              path: newCategory._id,
            },
          ];
      });
    },
    [itemsBreadcrumb],
  );
  const handleChoiceCategory = useCallback((category: StoreCategoryBlog) => {
    setSelectedCategory(category);
  }, []);
  const handleClearCategory = useCallback(() => {
    setSelectedCategory(null);
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <Breadcrumb
          items={itemsBreadcrumb}
          params={{
            test: 'dadad',
          }}
          itemRender={(route, params, routes, path) => {
            return (
              <span
                onClick={() => {
                  const indexCurrent = routes.indexOf(route);
                  const newRoutes = routes.slice(0, indexCurrent + 1);
                  setItemsBreadcrumb(newRoutes);
                }}
              >
                {route.title}
              </span>
            );
          }}
        />
      </div>
      <div className="flex gap-12">
        <div className="flex flex-col gap-4 relative flex-6">
          {isLoading || isValidating ? <Typography.Text>Đang tải...</Typography.Text> :

            data && data.docs.length > 0 ? data?.docs.map((category, index) => (
              <motion.div
                key={category._id}
                // initial={{ y: 10 }}
                // animate={{ y: 0 }}
                // transition={{delay: index * 200}}
                layout
              >
                <CategoryItemBlog
                  category={category}
                  handleAddItemsBreadcrumb={handleAddItemsBreadcrumb}
                  handleChoiceCategory={handleChoiceCategory}
                />
              </motion.div>
            )) : <div>
              <Typography.Text className='text-slate-400'>Không có danh mục nào !</Typography.Text>
            </div>}
        </div>
        <div className="flex-4">
          <FormCategoryBlog category={selectedCategory} onClearCategorySelected={handleClearCategory} />
        </div>
      </div>
    </div>
  );
};

export default memo(CategoryBlogList);
