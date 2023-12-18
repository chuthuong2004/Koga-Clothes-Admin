import { categoryService } from '@/services';
import { StoreCategory } from '@/types/entities';
import { Card, Typography } from 'antd';
import React from 'react';

import { FaChevronRight, FaRegEdit } from 'react-icons/fa';
import { useSWRConfig } from 'swr';

type CategoryItemProps = {
  category: StoreCategory;
  handleAddItemsBreadcrumb: (newCategory: StoreCategory) => void;
  handleChoiceCategory: (category: StoreCategory) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  handleAddItemsBreadcrumb,
  handleChoiceCategory,
}) => {
  const { mutate } = useSWRConfig();
  return (
    <Card className="max-w-full animate-slide p-0">
      <div className="flex justify-between  flex-1  h-full">
        <Typography.Text>{category.name}</Typography.Text>
        <div className="flex flex-col justify-between ">
          {category.children?.length > 0 ? (
            <span
              className="cursor-pointer"
              onClick={async () => {
                const response = await categoryService.getAll({
                  limit: 10,
                  page: 0,
                  offset: 0,
                  parent: category?._id,
                });
                console.log(response.docs);
                mutate(`ListCategory${category._id}`, { ...response });
                handleAddItemsBreadcrumb(category);
              }}
            >
              <FaChevronRight />
            </span>
          ) : null}
          <span
            onClick={() => {
              console.log('click', category);
              handleChoiceCategory(category);
            }}
            className="cursor-pointer"
          >
            <FaRegEdit />
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CategoryItem;
