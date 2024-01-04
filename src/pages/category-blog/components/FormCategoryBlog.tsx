import { usePagination } from '@/hooks/helpers';
import { useCategoryBlog } from '@/hooks/services';
import { categoryBlogService } from '@/services';
import { ParamsCreateCategoryBlog } from '@/services/types';
import { ResponseMessage } from '@/types/commons';
import { StoreCategoryBlog } from '@/types/entities';
import { recursiveOptionTree } from '@/utils';
import { Button, Card, Input, TreeSelect, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormCategoryBlogProps = {
  category?: StoreCategoryBlog | null;
  onClearCategorySelected: () => void
};

type FormCreateCategoryBlog = {
  parent: string;
  name: string;
}
const defaultValues: FormCreateCategoryBlog = {
  name: '',
  parent: '',
}

const FormCategoryBlog: React.FC<FormCategoryBlogProps> = ({ category, onClearCategorySelected }) => {
  const { loading, onCreateCategoryBlog, onUpdateCategoryBlog } = useCategoryBlog()
  const { data: listTreeCategories } = usePagination(
    'ListAllCategoriesBlog',
    {
      limit: 100,
      offset: 0,
      page: 1,
    },
    categoryBlogService.getTree,
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    reset
  } = useForm<FormCreateCategoryBlog>({
    defaultValues,
  });


  useEffect(() => {
    if (category) {
      category.parent && setValue('parent', category.parent._id);
      setValue('name', category.name);
      clearErrors()
    }

  }, [category, setValue, clearErrors]);


  const handleCancelForm = useCallback(() => {
    reset(defaultValues)
    onClearCategorySelected()
  }, [onClearCategorySelected, reset])


  const onSubmit = (data: FormCreateCategoryBlog) => {
    const successCallback = (result: StoreCategoryBlog) => {
      toast.success(`${category ? 'Thêm' : 'Cập nhật'} danh mục bài viết thành công !`)
      handleCancelForm()

    }
    const errorCallback = ({ message }: ResponseMessage) => {
      toast.error(message)
    }
    const newData: ParamsCreateCategoryBlog = {
      name: data.name,
      parent: data.parent ? data.parent : undefined
    }
    if (category) {
      onUpdateCategoryBlog(category._id, newData, successCallback, errorCallback)
    } else {
      onCreateCategoryBlog(newData, successCallback, errorCallback)
    }
  };


  const categoriesTree = useMemo<DefaultOptionType[]>(() => {
    return listTreeCategories ? recursiveOptionTree(listTreeCategories.docs) : []
  }, [listTreeCategories])
  return (
    <Card bordered={false}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

        <div className="gap-2 flex flex-col" >
          <Typography.Text>Tên danh mục</Typography.Text>
          <Controller
            control={control}
            name="name"

            rules={{
              required: {
                value: true,
                message: 'Vui lòng nhập tên danh mục !',
              },
            }}
            render={({ field }) => (
              <Input
                size="large"
                placeholder="Nhập tên danh mục"
                status={errors.name && 'error'}
                {...field}
                value={field.value}
              />
            )}
          />
          {errors.name && <Typography.Text type="danger">{errors.name.message}</Typography.Text>}
        </div>

        <div className="gap-2 flex flex-col">
          <Typography.Text>Danh mục cha</Typography.Text>
          <Controller
            control={control}
            name="parent"
            render={({ field }) => (
              <TreeSelect
                style={{ width: '100%' }}
                {...field}
                value={field.value ? field.value : undefined}
                // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={categoriesTree}
                placeholder="Chọn danh mục cha"
                showSearch
                size='large'
                treeDefaultExpandAll
                allowClear

              />
            )}
          />
          {errors.parent && (
            <Typography.Text type="danger">{errors.parent.message}</Typography.Text>
          )}
        </div>
        <div className='flex gap-4'>
          <Button size="large" type="primary" disabled={loading} loading={loading} onClick={handleSubmit(onSubmit)}>
            {category ? 'Cập nhật' : 'Thêm mới'}
          </Button>
          {category &&
            <Button size="large" onClick={handleCancelForm}>
              Huỷ bỏ
            </Button>
          }
        </div>
      </form>
    </Card >
  );
};

export default memo(FormCategoryBlog);

