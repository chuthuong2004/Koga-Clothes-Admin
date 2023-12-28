import { routes } from '@/config';
import { brandService, categoryService } from '@/services';
import { ERoleDefault } from '@/types/enums/role.enum';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Space, Select, Button, Typography, SelectProps, Divider } from 'antd';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

const CustomHeader = () => {
  const navigate = useNavigate();

  const { data: brands } = useSWR('ListBrandsInProducts', () => {
    return brandService.getAll({
      page: 1,
      limit: 99999,
      offset: 0,
    });
  });
  const { data: categories } = useSWR('ListCategoriesInProducts', () => {
    return categoryService.getAll({
      page: 1,
      limit: 999999,
      offset: 0,
    });
  });
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeCategory = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const brandOptions = useMemo<SelectProps['options']>(() => {
    return brands
      ? brands.docs.map((brand) => ({
          label: brand.name,
          value: brand._id,
        }))
      : [];
  }, [brands]);

  const categoryOptions = useMemo<SelectProps['options']>(() => {
    return categories
      ? categories.docs.map((brand) => ({
          label: brand.name,
          value: brand._id,
        }))
      : [];
  }, [categories]);

  const Roles = useMemo(() => {
    return Object.keys(ERoleDefault).map((key) => ({
      value: key,
      label: key,
    }));
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col border-b-slate-100">
        <div className="w-full flex flex-1 items-start">
          <Typography.Title level={4}>Filters</Typography.Title>
        </div>
        <div className="flex justify-between">
          <Select
            size="large"
            defaultValue="10"
            style={{ width: 80 }}
            onChange={handleChange}
            options={[
              { value: '5', label: '5' },
              { value: '10', label: '10' },
              { value: '20', label: '20' },
              { value: '25', label: '25' },
              { value: '50', label: '50' },
            ]}
          />
          <div className="flex gap-10">
            <Input size="large" placeholder="Search" />
            <Select
              mode="multiple"
              size="large"
              onChange={handleChangeCategory}
              optionLabelProp="label"
              style={{ width: 250 }}
              placeholder="Chọn role"
              options={Roles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
