import { PATTERN_NUMBER } from '@/utils';
import { Card, Space, Typography, Input } from 'antd';
import React, { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormCreateProduct } from '../FormProduct';

const FormPricing = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<FormCreateProduct>();
    return (
        <Card bordered={false}>
            <Space direction="vertical" className="w-full">
                <div className="flex flex-col gap-2">
                    <Typography.Text>Giá</Typography.Text>
                    <Controller
                        control={control}
                        name="price"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập giá sản phẩm !',
                            },
                            pattern: {
                                value: PATTERN_NUMBER,
                                message: 'Giá không hợp lệ !',
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                size="large"
                                placeholder="Nhập giá sản phẩm"
                                status={errors.price && 'error'}
                                {...field}
                                value={
                                    field.value ? PATTERN_NUMBER.test(field.value)
                                        ? parseInt(field.value, 10).toLocaleString('VN')
                                        : ''
                                        : ''
                                }
                                onChange={(e) => {
                                    field.onChange(e.target.value.replaceAll(',', ''));
                                }}
                            />
                        )}
                    />
                    {errors.price && <Typography.Text type="danger">{errors.price?.message}</Typography.Text>}
                </div>
                <div className="flex flex-col gap-2">
                    <Typography.Text>Giảm giá</Typography.Text>
                    <Controller
                        control={control}
                        name="discount"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập giá sản phẩm !',
                            },
                            pattern: {
                                value: PATTERN_NUMBER,
                                message: 'Discount từ 0 tới 100 !',
                            },
                            max: {
                                value: 100,
                                message: 'Giá trị discount lớn nhất là 100 !',
                            },
                            min: {
                                value: 0,
                                message: 'Giá trị discount nhỏ nhất là 0 !',
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                size="large"
                                placeholder="Nhập mã giảm giá"
                                inputMode="numeric"
                                status={errors.discount && 'error'}
                                {...field}
                                value={field.value ? PATTERN_NUMBER.test(field.value) ? field.value : '' : ''}
                            />
                        )}
                    />
                    {errors.discount && (
                        <Typography.Text type="danger">{errors.discount?.message}</Typography.Text>
                    )}
                </div>
            </Space>
        </Card>
    );
};

export default memo(FormPricing);
