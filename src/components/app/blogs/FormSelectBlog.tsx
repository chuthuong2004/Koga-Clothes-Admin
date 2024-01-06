import React, { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormCreateBlog } from './FormBlog';
import { EModeBlog } from '@/types/enums';
import { Typography, Select, Space, DatePicker } from 'antd';
import { usePagination } from '@/hooks/helpers';
import { categoryBlogService } from '@/services';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';

const FormSelectBlog = () => {
    const { data: categories } = usePagination(
        'GetAllCategoriesBlog',
        {
            page: 1,
            limit: 1000,
            offset: 0,
        },
        categoryBlogService.getAll,
    );
    const {
        control,
        formState: { errors },
    } = useFormContext<FormCreateBlog>();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    return (
        <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-2">
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
                        <Select
                            size="large"
                            {...field}
                            value={field.value ? field.value : undefined}
                            status={errors.category && 'error'}
                            placeholder="Chọn danh mục"
                            options={
                                categories
                                    ? categories?.docs.map((cat) => ({
                                        value: cat._id,
                                        label: cat.name,
                                    }))
                                    : []
                            }
                            showSearch
                            optionFilterProp="children"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '')
                                    .toLowerCase()
                                    .localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                        />
                    )}
                />
                {errors.category && (
                    <Typography.Text type="danger" className="text-lg">{errors.category?.message}</Typography.Text>
                )}
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <Typography.Text>Trạng thái</Typography.Text>
                <Controller
                    control={control}
                    name="mode"
                    rules={{
                        required: {
                            value: true,
                            message: 'Vui lòng chọn mode !',
                        },
                    }}
                    render={({ field }) => (
                        <Select
                            size="large"
                            {...field}
                            value={field.value && field.value}
                            status={errors.mode && 'error'}
                            placeholder="Chọn trạng thái"
                            options={[
                                { value: EModeBlog.Public, label: 'Công khai' },
                                { value: EModeBlog.Private, label: 'Nội bộ' },
                                { value: EModeBlog.Hidden, label: 'Ẩn' },
                            ]}
                        />
                    )}
                />
                {errors.mode && <Typography.Text type="danger" className="text-lg">{errors.mode?.message}</Typography.Text>}
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <Typography.Text>Thời gian công khai</Typography.Text>
                <Controller
                    control={control}
                    name="time_public"
                    rules={{
                        required: {
                            value: true,
                            message: 'Vui lòng chọn mode !',
                        },
                    }}
                    render={({ field }) => (
                        <Space direction="vertical" size={12}>
                            <DatePicker
                                size="large"
                                showTime
                                onOk={(date) => field.onChange(date)}
                                status={errors.time_public && 'error'}
                                format={'YYYY-MM-DD HH:mm:ss'}
                                value={field.value}
                            />
                        </Space>
                    )}
                />
                {errors.time_public && (
                    <Typography.Text type="danger" className="text-lg">{errors.time_public?.message}</Typography.Text>
                )}
            </div>
        </div>
    );
};

export default memo(FormSelectBlog);
