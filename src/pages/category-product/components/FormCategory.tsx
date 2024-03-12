import { usePagination } from '@/hooks/helpers';
import { useCategory } from '@/hooks/services';
import { categoryService } from '@/services';
import { ParamsCreateCategory } from '@/services/types';
import { ResponseMessage } from '@/types/commons';
import { StoreCategory } from '@/types/entities';
import { GenderCategory } from '@/types/unions';
import { recursiveOptionTree } from '@/utils';
import { Button, Card, Input, Select, TreeSelect, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

type FormCategoryProps = {
  category?: StoreCategory | null;
  onClearCategorySelected: () => void
};

type FormCreateCategory = {
  parent: string;
  name: string;
  gender: GenderCategory[]
}
const defaultValues: FormCreateCategory = {
  name: '',
  parent: '',
  gender: [],
}

const FormCategory: React.FC<FormCategoryProps> = ({ category, onClearCategorySelected }) => {
  const { mutate } = useSWRConfig()
  const { loading, onCreateCategory, onUpdateCategory } = useCategory()
  const { data: listTreeCategories } = usePagination(
    'ListAllCategories',
    {
      limit: 100,
      offset: 0,
      page: 1,
    },
    categoryService.getTree,
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    reset
  } = useForm<FormCreateCategory>({
    defaultValues,
  });


  useEffect(() => {
    if (category) {
      category.parent && setValue('parent', category.parent._id);
      setValue('name', category.name);
      setValue('gender', category.gender);
      clearErrors()
    }

  }, [category, setValue, clearErrors]);


  const handleCancelForm = useCallback(() => {
    reset(defaultValues)
    onClearCategorySelected()
  }, [onClearCategorySelected, reset])


  const onSubmit = (data: ParamsCreateCategory) => {
    const successCallback = (result: StoreCategory) => {
      toast.success(`${category ? 'Thêm' : 'Cập nhật'} danh mục thành công !`)
      handleCancelForm()

    }
    const errorCallback = ({ message }: ResponseMessage) => {
      toast.error(message)
    }
    const newData: ParamsCreateCategory = {
      gender: data.gender,
      name: data.name,
      parent: data.parent ? data.parent : undefined
    }
    if (category) {
      onUpdateCategory(category._id, newData, successCallback, errorCallback)
    } else {
      onCreateCategory(newData, successCallback, errorCallback)
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
        {/* <div className="gap-2 flex flex-col">
          <Typography.Text>Danh mục cha</Typography.Text>
          <Controller
            control={control}
            name="parent"
            render={({ field }) => (
              <Select
                size="large"
                {...field}
                options={options}
                showSearch
                optionFilterProp="children"
                status={errors.parent && 'error'}
                placeholder="Chọn danh mục cha"
                onSearch={onSearch}
                filterOption={filterOption}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn danh mục cha !',
              },
            }}
          />
          {errors.parent && (
            <Typography.Text type="danger">{errors.parent.message}</Typography.Text>
          )}
        </div> */}

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

        <div className="flex flex-col gap-2">
          <Typography.Text>Collection</Typography.Text>
          <Controller
            control={control}
            name="gender"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn collection !',
              },
            }}
            render={({ field }) => (
              <Select
                mode="multiple"
                size="large"
                {...field}
                value={field.value && field.value}
                status={errors.gender && 'error'}
                placeholder="Chọn collection"
                options={[
                  { value: 'Man', label: "Man's Clothing" },
                  { value: 'Women', label: "Women's Clothing" },
                  { value: 'Unisex', label: "Unisex's Clothing" },
                ]}
              />
            )}
          />
          {errors.gender && (
            <Typography.Text type="danger">{errors.gender?.message}</Typography.Text>
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

export default FormCategory;

