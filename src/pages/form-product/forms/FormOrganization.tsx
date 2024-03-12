import { brandService, categoryService } from '@/services';
import { cn, recursiveOptionTree } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Input, InputRef, Select, Space, Tag, TreeSelect, Typography, theme } from 'antd';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { FormCreateProduct } from '../FormProduct';
import { usePagination } from '@/hooks/helpers';
import { DefaultOptionType } from 'antd/es/select';

const FormOrganization = () => {
  const { data } = useSWR('GetAllBrandsInFormProduct', () =>
    brandService.getAll({
      page: 1,
      limit: 10000,
      offset: 0,
    }),
  );
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
    setValue,
    clearErrors,
  } = useFormContext<FormCreateProduct>();
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (tags: string[]) => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setValue('keywords', [...tags, inputValue]);
      clearErrors('keywords');
    } else {
      setInputVisible(false);
    }
    setInputValue('');
  };

  const categoriesTree = useMemo<DefaultOptionType[]>(() => {
    return listTreeCategories ? recursiveOptionTree(listTreeCategories.docs) : []
  }, [listTreeCategories])
  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
  };
  return (
    <Card bordered={false}>
      <Space direction="vertical" className="w-full">
        <Typography.Text>Tổ chức</Typography.Text>
        <div className="flex flex-col gap-2">
          <Typography.Text>Danh mục</Typography.Text>
          <Controller
            control={control}
            name="category"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn danh mục !',
              },
            }}
            render={({ field }) => (
              <TreeSelect
              style={{ width: '100%' }}
              {...field}
              value={field.value ? field.value : undefined}
              // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={categoriesTree}
              placeholder="Chọn danh mục"
              showSearch
              size="large"

              treeDefaultExpandAll

            />
              // <Select
              //   {...field}
              //   value={field.value ? field.value : undefined}
              //   status={errors.category && 'error'}
              //   placeholder="Chọn danh mục"
              //   options={
              //     categories
              //       ? categories?.docs.map((cat) => ({
              //           value: cat._id,
              //           label: cat.name,
              //         }))
              //       : []
              //   }
              //   showSearch
              //   optionFilterProp="children"
              //   onSearch={onSearch}
              //   filterOption={filterOption}
              //   filterSort={(optionA, optionB) =>
              //     (optionA?.label ?? '')
              //       .toLowerCase()
              //       .localeCompare((optionB?.label ?? '').toLowerCase())
              //   }
              // />
            )}
          />
          {errors.category && (
            <Typography.Text type="danger">{errors.category?.message}</Typography.Text>
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
                  // { value: '', label: 'Chọn collection' },
                  { value: 'man', label: "Man's Clothing" },
                  { value: 'woman', label: "Women's Clothing" },
                  { value: 'kid', label: "Kid's Clothing" },
                  { value: 'unisex', label: "Unisex's Clothing" },
                ]}
              />
            )}
          />
          {errors.gender && (
            <Typography.Text type="danger">{errors.gender?.message}</Typography.Text>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography.Text>Thương hiệu</Typography.Text>
          <Controller
            control={control}
            name="brand"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn thương hiệu !',
              },
            }}
            render={({ field }) => (
              <Select
                size="large"
                {...field}
                value={field.value ? field.value : undefined}
                status={errors.brand && 'error'}
                placeholder="Chọn thương hiệu"
                options={
                  data
                    ? data.docs.map((brand) => ({
                        value: brand._id,
                        label: brand.name,
                      }))
                    : []
                }
              />
            )}
          />
          {errors.brand && <Typography.Text type="danger">{errors.brand?.message}</Typography.Text>}
        </div>
        <div className="flex flex-col gap-2">
          <Typography.Text>Thẻ</Typography.Text>
          <Controller
            control={control}
            name="keywords"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng nhập từ khoá !',
              },
            }}
            render={({ field }) => (
              <>
                <div className="flex flex-wrap gap-2">
                  {field.value.map((tag) => {
                    return (
                      <span key={tag} style={{ display: 'inline-block' }}>
                        <Tag
                          closable
                          onClose={(e) => {
                            e.preventDefault();
                            setValue(
                              'keywords',
                              field.value.filter((item) => item !== tag),
                            );
                          }}
                        >
                          {tag}
                        </Tag>
                      </span>
                    );
                  })}
                </div>
                {inputVisible ? (
                  <Input
                    ref={inputRef}
                    type="text"
                    size="large"
                    style={{ width: '100%' }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={() => handleInputConfirm(field.value)}
                    onPressEnter={() => handleInputConfirm(field.value)}
                  />
                ) : (
                  <Tag
                    onClick={showInput}
                    style={tagPlusStyle}
                    className={cn(
                        'p-4 w-full',
                         'border-dashed',
                         errors.keywords && 'border-error',
                    )}
                  >
                    <PlusOutlined rev size={20} /> New Tag
                  </Tag>
                )}
              </>
            )}
          />
          {errors.keywords && (
            <Typography.Text type="danger">{errors.keywords?.message}</Typography.Text>
          )}
        </div>
      </Space>
    </Card>
  );
};

export default memo(FormOrganization);
