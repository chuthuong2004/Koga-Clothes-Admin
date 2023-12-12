import { Card, Space, Typography, Input } from 'antd'
import React, { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormCreateProduct } from '../FormProduct'

import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import { cn } from '@/utils';
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
                    {errors.name && <Typography.Text type='danger'>{errors.name?.message}</Typography.Text>}
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
                    {errors.code && <Typography.Text type='danger'>{errors.code?.message}</Typography.Text>}
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
                            validate: val => {
                                const html = convertToRaw(val.getCurrentContent());
                                return html.blocks[0].text ? true : 'Vui lòng nhập thông tin bảo quản !'
                            },

                        }}
                        render={({ field }) => (
                            <Editor
                                editorState={field.value}
                                wrapperClassName={cn(`border rounded-md transition-all ${errors.description?.message ? 'border-error' : ''}`)}
                                editorClassName="p-4"
                                editorStyle={{ maxHeight: '40vh' }}
                                toolbarClassName='bg-primary border-none'
                                onEditorStateChange={field.onChange}
                                placeholder='Nhập mô tả sản phẩm'
                            />
                        )}
                    />
                    {errors.description && <Typography.Text type='danger' >{errors.description?.message}</Typography.Text>}
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
                            validate: val => {
                                const html = convertToRaw(val.getCurrentContent());
                                return html.blocks[0].text ? true : 'Vui lòng nhập thông tin bảo quản !'
                            },
                        }}
                        render={({ field }) => (
                            <Editor
                                editorState={field.value}
                                wrapperClassName={cn(`border rounded-md transition-all ${errors.preserveInformation?.message ? 'border-error' : ''}`)}
                                editorClassName="p-4"
                                editorStyle={{ maxHeight: '40vh' }}
                                toolbarClassName='bg-primary border-none'
                                onEditorStateChange={field.onChange}
                                placeholder='Nhập thông tin bảo quản'
                            />
                        )}
                    />
                    {errors.preserveInformation && <Typography.Text type='danger'>{errors.preserveInformation?.message}</Typography.Text>}
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
                            validate: val => {
                                const html = convertToRaw(val.getCurrentContent());
                                return html.blocks[0].text ? true : 'Vui lòng nhập chính sách đổi trả !'
                            },
                        }}
                        render={({ field }) => (
                            <Editor
                            editorState={field.value}
                            wrapperClassName={cn(`border rounded-md transition-all ${errors.deliveryReturnPolicy?.message ? 'border-error' : ''}`)}
                            editorClassName="p-4"
                            editorStyle={{ maxHeight: '40vh' }}
                            toolbarClassName='bg-primary border-none'
                            onEditorStateChange={field.onChange}
                                placeholder='Nhập chính sách đổi trả'
                            />

                        )}
                    />
                    {errors.deliveryReturnPolicy && <Typography.Text type='danger'>{errors.deliveryReturnPolicy?.message}</Typography.Text>}
                </div>
                {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
            </Space>
        </Card>
    )
}

export default memo(FormInfoBasic)