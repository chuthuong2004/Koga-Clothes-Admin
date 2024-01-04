import { routes } from '@/config';
import { brandService, categoryService } from '@/services';
import { FilterProduct } from '@/types/commons';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Space, Select, Button, Typography, SelectProps, Divider } from 'antd'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';


type ProductHeaderProps = {
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeFilter: (value: string[] | string, field: keyof FilterProduct) => void;
}
const ProductHeader = ({ search, onChangeSearch, onChangeFilter }: ProductHeaderProps) => {
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
                        onChange={(value) => onChangeFilter(value, 'brand')}
                        optionLabelProp="label"
                        options={brandOptions}
                        optionRender={(option) => (
                            <Space>
                                {option.label}
                            </Space>
                        )}
                    />
                    {/* <TreeSelect
              style={{ width: '100%' }}
              {...field}
              value={field.value ? field.value : undefined}
              // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={categoriesTree}
              placeholder="Chọn danh mục"
              showSearch
              size="large"

              treeDefaultExpandAll

            /> */}
                    <Select
                        mode="multiple"
                        size="large"
                        className='flex-1'

                        placeholder="Chọn danh mục"
                        onChange={(value) => onChangeFilter(value, 'category')}
                        optionLabelProp="label"
                        options={categoryOptions}
                        optionRender={(option) => (
                            <Space>
                                {option.label}
                            </Space>
                        )}
                    />
                    <Select

                        size="large"
                        className='flex-1'
                        onChange={(value) => onChangeFilter(value, 'gender')}
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

                    <Input size='large' placeholder='Search' value={search} onChange={(e) => onChangeSearch(e.target.value)} />
                </div>
                <Space>
                    <Select
                        size='large'
                        defaultValue="10"
                        style={{ width: 80 }}
                        onChange={(value) => onChangeFilter(value, 'limit')}
                        optionLabelProp="label"
                        placeholder="Limit"
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

export default ProductHeader