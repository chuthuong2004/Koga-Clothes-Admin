import { Card, Input, Space, Typography } from 'antd';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormCreateProduct } from '../FormProduct';

import { TinyEditor } from '@/components/shares';
const FormInfoBasic = () => {
    const { control, formState: { errors } } = useFormContext<FormCreateProduct>()
    return (
        <Card bordered={false}>
            <Space direction="vertical" className='w-full'>
                <Typography.Text>Thông tin sản phẩm</Typography.Text>
                <div className='flex flex-col'>
                    <Typography.Text>Tên sản phẩm</Typography.Text>
                    <Controller
                        control={control}
                        name='name'
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập tên sản phẩm !'
                            }
                        }}
                        render={({ field }) => (
                            <Input size="large" placeholder="Nhập tên sản phẩm" status={errors.name && 'error'}  {...field} type='danger' />

                        )}
                    />
                    {errors.name && <Typography.Text type='danger' className="text-lg">{errors.name?.message}</Typography.Text>}
                </div>
                <div className='flex flex-col'>
                    <Typography.Text>Mã sản phẩm</Typography.Text>
                    <Controller
                        control={control}
                        name='code'
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập mã sản phẩm !'
                            }
                        }}
                        render={({ field }) => (
                            <Input size="large" placeholder="Nhập mã sản phẩm" status={errors.code && 'error'}  {...field} type='danger' />

                        )}
                    />
                    {errors.code && <Typography.Text type='danger' className="text-lg">{errors.code?.message}</Typography.Text>}
                </div>
                <div className='flex flex-col'>
                    <Typography.Text>Mô tả</Typography.Text>
                    <Controller
                        control={control}
                        name="description"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập mô tả sản phẩm !'
                            },

                        }}
                        render={({ field }) => (
                            <TinyEditor
                                value={field.value}
                                onEditorChange={a => field.onChange(a)}
                                init={{
                                    placeholder: 'Nhập mô tả sản phẩm'
                                }}
                                error={!!errors.description}
                            />
                        )}
                    />
                    {errors.description && <Typography.Text type='danger' className="text-lg" >{errors.description?.message}</Typography.Text>}
                </div>

                <div className='flex flex-col'>
                    <Typography.Text>Thông tin bảo quản</Typography.Text>
                    <Controller
                        control={control}
                        name="preserveInformation"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập thông tin bảo quản !'
                            },
                        }}
                        render={({ field }) => (
                            <TinyEditor
                                value={field.value}
                                onEditorChange={(a) => field.onChange(a)}
                                init={{
                                    placeholder: 'Nhập thông tin bảo quản'
                                }}
                                error={!!errors.preserveInformation}
                            />
                        )}
                    />
                    {errors.preserveInformation && <Typography.Text type='danger' className="text-lg">{errors.preserveInformation?.message}</Typography.Text>}
                </div>

                <div className='flex flex-col'>
                    <Typography.Text>Chính sách đổi trả</Typography.Text>
                    <Controller
                        control={control}
                        name="deliveryReturnPolicy"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập chính sách đổi trả !'
                            },
                        }}
                        render={({ field }) => (
                            <TinyEditor
                                value={field.value}
                                onEditorChange={(a) => field.onChange(a)}
                                init={{
                                    placeholder: 'Nhập chính sách đổi trả'
                                }}
                                error={!!errors.deliveryReturnPolicy}
                            />

                        )}
                    />
                    {errors.deliveryReturnPolicy && <Typography.Text type='danger' className="text-lg">{errors.deliveryReturnPolicy?.message}</Typography.Text>}
                </div>
                {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
            </Space>
        </Card>
    )
}

export default memo(FormInfoBasic)