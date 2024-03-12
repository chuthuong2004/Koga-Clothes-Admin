import { useCategory } from '@/hooks/services';
import { categoryService } from '@/services';
import { StoreCategory } from '@/types/entities';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Card, Modal, Typography } from 'antd';
import React, { memo } from 'react';

import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
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
  const {loading, onDeleteCategory } = useCategory()
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
  const showDeleteConfirm = () => {
    Modal.confirm({
        title: `Bạn có chắc chắn muốn xoá danh mục [${category.name}] ?`,
        icon: <ExclamationCircleFilled rev />,
        content: 'Bạn sẽ không thể khôi phục lại sản phẩm này.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        centered: true,

        onOk() {
          onDeleteCategory(category._id, () => {
                toast.success("Xoá danh mục thành công !")
            }, ({ message }) => {
                toast.error(message)
            })
        },
        onCancel() {
            console.log('Cancel');
        },
        okButtonProps: {
          loading: loading,
          disabled: loading
        }
    });
};
  return (
    <Card className="max-w-full animate-slide p-0 " bordered={false}>
      <div className="flex justify-between  flex-1  h-full">
        <div onClick={handleClickCategory} className='flex flex-col gap-2 cursor-pointer'>
          <Typography.Text>{category.name}</Typography.Text>
          <Typography.Text className='text-xl text-slate-400'>Có {category.children.length} danh mục</Typography.Text>
        </div>
        <div className="flex gap-4">
          <FaRegEdit onClick={() => handleChoiceCategory(category)} size={20} className="text-primary cursor-pointer" />
          <FaTrashAlt onClick={showDeleteConfirm} size={20} className="text-primary cursor-pointer" />
        </div>
      </div>
    </Card>
  );
};

export default memo(CategoryItem);
