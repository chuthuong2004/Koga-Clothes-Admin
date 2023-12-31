import { FormBrand } from '@/components/app';
import { usePagination } from '@/hooks/helpers';
import { staffService } from '@/services';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Space, Select, Button, Typography, SelectProps, Divider } from 'antd'
import { memo, useCallback, useMemo, useState } from 'react'
import { FilterBrand } from '../BlogTable';

type BrandHeaderProps = {
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeFilter: (value: string[] | string, field: keyof FilterBrand) => void;
}
const BrandHeader = ({ search, onChangeSearch, onChangeFilter }: BrandHeaderProps) => {
    const [openModal, setOpenModal] = useState(false);
    const { data: staff } = usePagination("GetAllStaffInBrand", {
        page: 1,
        limit: 1999999,
        offset: 0,
    }, staffService.getAllStaff)
    // ** Handle show modal create brand
    const showModal = useCallback(() => {
        setOpenModal(true);
    }, []);
    const handleCloseModal = useCallback(() => {
        setOpenModal(false)
    }, []);


    const staffOptions = useMemo<SelectProps['options']>(() => {
        return staff ? staff.docs.map(staff => ({
            label: staff.firstName + ' ' + staff.lastName,
            value: staff._id
        })) : []
    }, [staff])




    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex flex-col border-b-slate-100'>
                <div className='w-full flex flex-1 items-start'>
                    <Typography.Title level={4}>Danh sách thương hiệu</Typography.Title>
                </div>
            </div>
            <Divider />
            <div className='flex w-full justify-between items-center'>
                <div>

                    <Input size='large' placeholder='Search' value={search} onChange={(e) => onChangeSearch(e.target.value)} />
                </div>
                <Space>
                    <Select
                        mode="multiple"
                        size="large"

                        style={{ minWidth: 200 }}
                        className='flex-1'
                        onChange={(value) => onChangeFilter(value, 'creator')}
                        optionLabelProp="label"
                        placeholder="Chọn người tạo"
                        options={staffOptions}
                    />
                    <Button type="primary" disabled size="large" icon={<UploadOutlined size={20} rev />}>
                        Export
                    </Button>
                    <Button onClick={showModal} type="primary" size="large" icon={<PlusOutlined size={20} rev />}>
                        Thêm mới
                    </Button>
                </Space>
            </div>
            <FormBrand open={openModal} onClose={handleCloseModal} />
        </div>
    )
}

export default memo(BrandHeader)