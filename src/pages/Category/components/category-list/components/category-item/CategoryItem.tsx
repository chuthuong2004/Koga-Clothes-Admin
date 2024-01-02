import { categoryService } from '@/services';
import { StoreCategory } from '@/types/entities';
import { Card, Typography } from 'antd';
import React from 'react';
import { BsTrash } from 'react-icons/bs';

import { FaChevronRight, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
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

  const handleClickCategory = async () => {
    const response = await categoryService.getAll({
      limit: 10,
      page: 0,
      offset: 0,
      parent: category?._id,
    });
    console.log(response.docs);
    mutate(`ListCategory${category._id}`, { ...response });
    handleAddItemsBreadcrumb(category);
  }
  return (
    <Card className="max-w-full animate-slide p-0 " bordered={false}>
      <div className="flex justify-between  flex-1  h-full">
        <div onClick={handleClickCategory} className='flex flex-col gap-2 cursor-pointer'>
          <Typography.Text>{category.name}</Typography.Text>
          <Typography.Text className='text-xl text-slate-400'>Có {category.children.length} danh mục</Typography.Text>
        </div>
        <div className="flex gap-4">
          <FaRegEdit onClick={() => handleChoiceCategory(category)} size={20} className="text-primary cursor-pointer" />
          <FaTrashAlt onClick={() => handleChoiceCategory(category)} size={20} className="text-primary cursor-pointer" />
        </div>
      </div>
    </Card>
  );
};

export default CategoryItem;
