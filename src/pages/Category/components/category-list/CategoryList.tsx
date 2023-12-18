import { usePagination } from '@/hooks/helpers';
import { categoryService } from '@/services';
import { StoreCategory } from '@/types/entities';
import { Breadcrumb, BreadcrumbProps, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { mutate } from 'swr';
import { CategoryItem, FormCategory } from './components';

const CategoryList = () => {
  const [itemsBreadcrumb, setItemsBreadcrumb] = useState<BreadcrumbProps['items']>([
    {
      title: (
        <Typography.Text
          onClick={() => {
            mutate('ListCategory');
          }}
        >
          Categories
        </Typography.Text>
      ),
      path: '',
    },
  ]);
  const [category, setCategory] = useState<StoreCategory | null>(null);
  const { data } = usePagination(
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
                >
                  <Typography.Text>{newCategory.name}</Typography.Text>
                </div>
              ),
              path: newCategory._id,
            },
          ];
      });
    },
    [data],
  );
  const handleChoiceCategory = useCallback((category: StoreCategory) => {
    console.log(category);
    setCategory(category);
  }, []);
  console.log(category);
  return (
    <div className="container flex flex-col gap-4">
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
      <div className="flex gap-6">
        <div className="flex flex-col gap-3 h-[67rem] overflow-y-scroll w-[25rem] px-2 relative flex-2">
          {data?.docs.map((category) => (
            <CategoryItem
              category={category}
              handleAddItemsBreadcrumb={handleAddItemsBreadcrumb}
              handleChoiceCategory={handleChoiceCategory}
              key={category._id}
            />
          ))}
        </div>
        <div className="form-category bg-white rounded p-5  flex-3">
          <FormCategory category={category} />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
