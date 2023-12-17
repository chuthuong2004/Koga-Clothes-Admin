import { routes } from '@/config';
import { brandService, categoryService } from '@/services';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Space, Select, Button, Typography, SelectProps, Divider } from 'antd'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

const CustomerHeader = () => {
    const navigate = useNavigate()

    const { data: brands } = useSWR("ListBrandsInProducts", () => {
        return brandService.getAll({
            page: 1,
            limit: 99999,
            offset: 0
        })
    })
    const { data: categories } = useSWR("ListCategoriesInProducts", () => {
        return categoryService.getAll({
            page: 1,
            limit: 999999,
            offset: 0
        })
    })
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleChangeCategory = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    const brandOptions = useMemo<SelectProps['options']>(() => {
        return brands ? brands.docs.map(brand => ({
            label: brand.name,
            value: brand._id
        })) : []
    }, [brands])

    const categoryOptions = useMemo<SelectProps['options']>(() => {
        return categories ? categories.docs.map(brand => ({
            label: brand.name,
            value: brand._id
        })) : []
    }, [categories])
    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex flex-col border-b-slate-100'>
                <div className='w-full flex flex-1 items-start'>
                    <Typography.Title level={4}>Filters</Typography.Title>
                </div>
                <div className="flex gap-4 " >
                    <Select
                        mode="multiple"
                        size="large"
                        className='flex-1'
                        placeholder="Chọn thương hiệu"
                        onChange={handleChangeCategory}
                        optionLabelProp="label"
                        options={brandOptions}
                        optionRender={(option) => (
                            <Space>
                                {option.label}
                            </Space>
                        )}
                    />
                    <Select
                        mode="multiple"
                        size="large"
                        className='flex-1'

                        placeholder="Chọn danh mục"
                        onChange={handleChangeCategory}
                        optionLabelProp="label"
                        options={categoryOptions}
                        optionRender={(option) => (
                            <Space>
                                {option.label}
                            </Space>
                        )}
                    />
                    <Select

                        mode="multiple"
                        size="large"
                        className='flex-1'
                        onChange={handleChangeCategory}
                        optionLabelProp="label"
                        placeholder="Chọn collection"
                        options={[
                            // { value: '', label: 'Chọn collection' },
                            { value: 'man', label: "Man's Clothing" },
                            { value: 'woman', label: "Women's Clothing" },
                            { value: 'kid', label: "Kid's Clothing" },
                            { value: 'unisex', label: "Unisex's Clothing" },
                        ]}
                    />
                </div>

            </div>
            <Divider />
            <div className='flex w-full justify-between items-center'>
                <div>

                    <Input size='large' placeholder='Search' />
                </div>
                <Space>
                    <Select
                        size='large'
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
                    <Button type="primary" disabled size="large" icon={<UploadOutlined size={20} rev />}>
                        Export
                    </Button>
                    <Button onClick={() => navigate(routes.createProduct)} type="primary" size="large" icon={<PlusOutlined size={20} rev />}>
                        Thêm mới
                    </Button>
                </Space>
            </div>
        </div>
    )
}

export default CustomerHeader