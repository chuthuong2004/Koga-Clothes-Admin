import { usePagination } from '@/hooks/helpers';
import { categoryService } from '@/services';
import { StoreCategory } from '@/types/entities';
import { Breadcrumb, BreadcrumbProps, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { mutate } from 'swr';
import { CategoryItem, FormCategory } from './components';
import { Nullable } from '@/types/commons';
import { motion } from 'framer-motion';

const CategoryList = () => {
  const [itemsBreadcrumb, setItemsBreadcrumb] = useState<BreadcrumbProps['items']>([
    {
      title: (
        <Typography.Text
          onClick={() => {
            mutate('ListCategory');
          }}
          className='cursor-pointer'
        >
          Tất cả danh mục
        </Typography.Text>
      ),
      path: '',
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Nullable<StoreCategory>>(null);
  const { data, isLoading, isValidating } = usePagination(
    `ListCategory${itemsBreadcrumb?.[itemsBreadcrumb.length - 1].path}`,
    {
      page: 1,
      limit: 10,
      offset: 0,
      parent: itemsBreadcrumb?.[itemsBreadcrumb.length - 1].path || '',
    },
    categoryService.getAll,
  );

  const handleAddItemsBreadcrumb = useCallback(
    (newCategory: StoreCategory) => {
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
  const handleChoiceCategory = useCallback((category: StoreCategory) => {
    setSelectedCategory(category);
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

            data?.docs.map((category, index) => (
              <motion.div
                key={category._id}
                // initial={{ y: 10 }}
                // animate={{ y: 0 }}
                // transition={{delay: index * 200}}
                layout
              >
                <CategoryItem
                  category={category}
                  handleAddItemsBreadcrumb={handleAddItemsBreadcrumb}
                  handleChoiceCategory={handleChoiceCategory}
                />
              </motion.div>
            ))}
        </div>
        <div className="flex-4">
          <FormCategory category={selectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
