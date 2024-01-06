import { TinyEditor } from '@/components/shares';
import { Input, Typography } from 'antd';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormCreateBlog } from './FormBlog';

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
                    }}
                    render={({ field }) => (
                        <TinyEditor
                            value={field.value}
                            onEditorChange={(a, editor) => {
                                field.onChange(a)
                            }}
                            init={{
                                placeholder: 'Vui lòng nhập nội dung tóm tắt'
                            }}
                            error={!!errors.summary}
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
                    }}
                    render={({ field }) => (
                        <TinyEditor
                            value={field.value}
                            onEditorChange={(a, editor) => {
                                field.onChange(a)
                            }}
                            init={{
                                placeholder: 'Vui lòng nhập nội dung'
                            }}
                            error={!!errors.content}
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