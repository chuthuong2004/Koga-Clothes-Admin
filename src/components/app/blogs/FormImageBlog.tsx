import React, { memo, useCallback, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormCreateBlog } from './FormBlog'
import { Modal, Typography, Upload, UploadFile } from 'antd'
import { cn, getBase64 } from '@/utils'
import { PlusOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/es/upload'

type KeyImageBlog = 'image';

const defaultPreview: Record<KeyImageBlog, boolean> = {
  image: false,
};


type  FormImageBlogProps = {
    type: 'Add' | 'Edit'
}
const FormImageBlog = ({type}: FormImageBlogProps) => {
    const {control, formState: {errors}} = useFormContext<FormCreateBlog>()
    const [previewOpen, setPreviewOpen] = useState<Record<KeyImageBlog, boolean>>(defaultPreview);
    const [previewImage, setPreviewImage] = useState<Record<KeyImageBlog, string>>({
      image: '',
    });
    const [previewTitle, setPreviewTitle] = useState<Record<KeyImageBlog, string>>({
      image: '',
    }); const handleCancel = useCallback(() => setPreviewOpen(defaultPreview), []);

    const handlePreviewImages = useCallback(async (file: UploadFile, type_image: KeyImageBlog) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }
  
      setPreviewImage((prev) => ({
        ...prev,
        [type_image]: file.url || (file.preview as string),
      }));
      setPreviewOpen((prev) => ({
        ...prev,
        [type_image]: true,
      }));
      setPreviewTitle((prev) => ({
        ...prev,
        [type_image]: file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
      }));
    }, []);
    return (

        <div className="flex gap-4">

            <div className="flex flex-col gap-2 flex-1">
                <Typography.Text>Hình ảnh</Typography.Text>
                <Controller
                    control={control}
                    name="image"
                    rules={{
                        required: {
                            value: type === 'Add',
                            message: `Vui lòng chọn hình ảnh bài viết !`,
                        },
                    }}
                    render={({ field: { value, onChange } }) => (
                        <div
                            className={cn(
                                'border border-dashed p-4 rounded-md',
                                errors.image && 'border-error',
                            )}
                        >
                            <Upload
                                listType="picture-card"
                                accept="image/*"
                                maxCount={1}
                                fileList={typeof value !== 'string' ? value : []}
                                onPreview={(file) => handlePreviewImages(file, 'image')}
                                onChange={(info) => onChange(info.fileList)}
                            >
                                <div>
                                    <PlusOutlined rev />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                            <Modal
                                open={previewOpen.image}
                                title={previewTitle.image}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <img alt="" className="w-full" src={previewImage.image} />
                            </Modal>
                        </div>
                    )}
                />
                {errors.image && (
                    <Typography.Text type="danger">{errors.image?.message}</Typography.Text>
                )}
            </div>
        </div>
    )
}

export default memo(FormImageBlog)