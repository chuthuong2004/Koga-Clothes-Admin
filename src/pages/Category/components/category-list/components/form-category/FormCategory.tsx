import { usePagination } from '@/hooks/helpers';
import { categoryService } from '@/services';
import { ParamsCreateCategory } from '@/services/types';
import { StoreCategory } from '@/types/entities';
import { optionsGenderCategory } from '@/utils/constants/category.constant';
import { Button, Input, Select, Space, Typography } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { defaultValues } from '../../../../../../hooks/helpers/useAddress';

type FormCategoryProps = {
  category?: StoreCategory | null;
};
const FormCategory: React.FC<FormCategoryProps> = ({ category }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ParamsCreateCategory>({
    defaultValues: {
      name: '',
      parent: category?._id!,
      gender: [],
    },
  });

  const { data: listCategory } = usePagination(
    'ListAllCategories',
    {
      limit: 1000,
      offset: 0,
      page: 1,
    },
    categoryService.getAll,
  );

  const options = useMemo(() => {
    return listCategory
      ? listCategory?.docs.map((repo) => ({
          value: repo._id,
          label: repo.name,
        }))
      : [];
  }, [listCategory]);
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  const onSubmit = async (data: ParamsCreateCategory) => {
    console.log(data);
    let newCategory = null;
    if (category) {
      newCategory = await categoryService.update(category._id, data);
    } else {
      newCategory = await categoryService.create(data);
    }
    console.log(newCategory);
  };

  const onError = (err: any) => {
    console.log(err);
  };
  useEffect(() => {
    setValue('parent', category?._id!);
    setValue('name', category?.name!);
    setValue('gender', category?.gender!);
  }, [category]);

  return (
    <div>
      <form>
        <div className="w-full gap-2 flex flex-col">
          <Typography.Text>Category</Typography.Text>

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
                message: 'Vui lòng chọn parent !',
              },
            }}
          />
          {errors.parent && (
            <Typography.Text type="danger">{errors.parent.message}</Typography.Text>
          )}

          <Typography.Text>Gender</Typography.Text>

          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                mode="multiple"
                size="large"
                {...field}
                options={optionsGenderCategory}
                status={errors.gender && 'error'}
                showSearch
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
                message: 'Vui lòng chọn gender !',
              },
            }}
          />
          {errors.gender && (
            <Typography.Text type="danger">{errors.gender.message}</Typography.Text>
          )}

          <Typography.Text>Name</Typography.Text>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                size="large"
                placeholder="Nhập ten"
                inputMode="numeric"
                status={errors.name && 'error'}
                {...field}
                value={field.value}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Vui lòng nhập tên !',
              },
            }}
          />
          {errors.name && <Typography.Text type="danger">{errors.name.message}</Typography.Text>}
          <Button size="large" type="primary" onClick={handleSubmit(onSubmit, onError)}>
            {category ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormCategory;
