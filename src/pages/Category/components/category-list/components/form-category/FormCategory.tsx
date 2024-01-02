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
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormCategoryProps = {
  category?: StoreCategory | null;
};

type FormCreateCategory = {
  parent: string;
  name: string;
  gender: GenderCategory[]
}

const FormCategory: React.FC<FormCategoryProps> = ({ category }) => {
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
  } = useForm<FormCreateCategory>({
    defaultValues: {
      name: '',
      parent: '',
      gender: [],
    },
  });


  useEffect(() => {
    if (category) {
      setValue('parent', category.parent._id);
      setValue('name', category.name);
      setValue('gender', category.gender);
    }

  }, [category, setValue]);

  const onSubmit = (data: ParamsCreateCategory) => {
    const successCallback = (result: StoreCategory) => {
      console.log(result);

    }
    const errorCallback = ({ message }: ResponseMessage) => {

    }
    if (category) {
      onUpdateCategory(category._id, data, successCallback, errorCallback)
    } else {
      onCreateCategory(data, successCallback, errorCallback)
    }
  };

  const onError = (err: any) => {
    console.log(err);
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
                value={field.value}
                // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={categoriesTree}
                placeholder="Please select"
                showSearch

                treeDefaultExpandAll

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


        <Button size="large" type="primary" onClick={handleSubmit(onSubmit, onError)}>
          {category ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </form>
    </Card >
  );
};

export default FormCategory;

