import React, { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { FormCreateBlog } from './FormBlog';
import { cn } from '@/utils';
import { Typography, Input } from 'antd';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const FormContentBlog = () => {
    const { control, formState: { errors } } = useFormContext<FormCreateBlog>()
    return (
        <>
            <div className="flex flex-col">
                <Typography.Text>Tiêu đề</Typography.Text>
                <Controller
                    control={control}
                    name="title"
                    rules={{
                        required: {
                            value: true,
                            message: 'Vui lòng nhập tiêu đề bài viết !',
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            size="large"
                            placeholder="Nhập tiêu đề bài viết"
                            {...field}
                            status={errors.title && 'error'}
                        />
                    )}
                />
                {errors.title && (
                    <Typography.Text type="danger" className="text-lg">
                        {errors.title.message}
                    </Typography.Text>
                )}
            </div>
            <div className="flex flex-col">
                <Typography.Text>Tóm tăt</Typography.Text>
                <Controller
                    control={control}
                    name="summary"
                    rules={{
                        required: {
                            value: true,
                            message: 'Vui lòng nhập nội dung tóm tắt !',
                        },
                        validate: (val) => {
                            const html = convertToRaw(val.getCurrentContent());
                            return html.blocks[0].text ? true : 'Vui lòng nhập tóm tắt bài viết !';
                        },
                    }}
                    render={({ field }) => (
                        <Editor
                            editorState={field.value}
                            wrapperClassName={cn(
                                `border rounded-md transition-all ${errors.summary?.message ? 'border-error' : ''
                                }`,
                            )}
                            editorClassName="p-4"
                            editorStyle={{ maxHeight: '40vh' }}
                            toolbarClassName="bg-primary border-none"
                            onEditorStateChange={field.onChange}
                            placeholder="Nhập tóm tắt bài viết"
                        />
                    )}
                />
                {errors.summary && (
                    <Typography.Text type="danger" className="text-lg">
                        {errors.summary?.message}
                    </Typography.Text>
                )}
            </div>
            <div className="flex flex-col">
                <Typography.Text>Nội dung</Typography.Text>
                <Controller
                    control={control}
                    name="content"
                    rules={{
                        required: {
                            value: true,
                            message: 'Vui lòng nhập nội dung tóm tắt !',
                        },
                        validate: (val) => {
                            const html = convertToRaw(val.getCurrentContent());
                            return html.blocks[0].text ? true : 'Vui lòng nhập tóm tắt bài viết !';
                        },
                    }}
                    render={({ field }) => (
                        <Editor
                            editorState={field.value}
                            wrapperClassName={cn(
                                `border rounded-md transition-all ${errors.content?.message ? 'border-error' : ''
                                }`,
                            )}
                            editorClassName="p-4"
                            editorStyle={{ maxHeight: '40vh' }}
                            toolbarClassName="bg-primary border-none"
                            onEditorStateChange={field.onChange}
                            placeholder="Nhập nội dung bài viết"
                        />
                    )}
                />
                {errors.content && (
                    <Typography.Text type="danger" className="text-lg">
                        {errors.content?.message}
                    </Typography.Text>
                )}
            </div>
        </>
    )
}

export default memo(FormContentBlog)