import { cn, getBase64 } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile, Typography, Upload, Modal } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import React, { useCallback, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { FormCreateProduct } from '../FormProduct';

const defaultPreview = {
    images: false,
    imageSmall: false,
    imageMedium: false
}
type KeyImageProduct = 'images' | 'imageSmall' | 'imageMedium'
type FormImageProps = {
    colorName: string;
    media: { imageSmall: UploadFile<any>[]; imageMedium: UploadFile<any>[]; images: UploadFile<any>[] };
}
const FormImage = ({ colorName, media }: FormImageProps) => {
    const { control, formState: { errors } } = useFormContext<FormCreateProduct>()
    const [previewOpen, setPreviewOpen] = useState<Record<KeyImageProduct, boolean>>(defaultPreview);
    const [previewImage, setPreviewImage] = useState<Record<KeyImageProduct, string>>({
        images: '',
        imageSmall: '',
        imageMedium: ''
    });
    const [previewTitle, setPreviewTitle] = useState<Record<KeyImageProduct, string>>({
        images: '',
        imageSmall: '',
        imageMedium: ''
    });
    const handleCancel = useCallback(() => setPreviewOpen(defaultPreview), []);

    const handlePreviewImages = useCallback(async (file: UploadFile, type_image: KeyImageProduct) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(prev => ({
            ...prev,
            [type_image]: file.url || (file.preview as string)
        }));
        setPreviewOpen(prev => ({

            ...prev,
            [type_image]: true
        }));
        setPreviewTitle(prev => ({
            ...prev,
            [type_image]: file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
        }));
    }, []);

    return (
        <div className='flex flex-col gap-4'>
            <Typography.Text className='flex items-center gap-4'>Chọn hình ảnh cho màu <Typography.Title level={5}>[{colorName}]</Typography.Title></Typography.Text>
            <div className=' border border-dashed p-8 rounded-md flex flex-col gap-4'>
                {/* List hình ảnh sản phẩm */}
                <div className='flex flex-col gap-2'>
                    <Typography.Text >Images</Typography.Text>
                    <Controller
                        control={control}
                        name={`medias.${colorName}.images`}
                        rules={{
                            required: {
                                value: true,
                                message: `Vui lòng chọn hình ảnh cho màu [${colorName}] !`
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <div className={cn('border border-dashed p-4 rounded-md', errors.medias?.[colorName]?.images && 'border-error')}>
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-card"
                                    multiple
                                    accept='image/*'
                                    fileList={value}
                                    onPreview={(file) => handlePreviewImages(file, 'images')}
                                    onChange={(info) => onChange(info.fileList)}

                                >
                                    {value.length >= 20 ? null :
                                        <>
                                            <div>
                                                <PlusOutlined rev />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        </>}
                                </Upload>
                                <Modal open={previewOpen.images} title={previewTitle.images} footer={null} onCancel={handleCancel}>
                                    <img alt="" className='w-full' src={previewImage.images} />
                                </Modal>
                            </div>
                        )}
                    />
                        {errors.medias?.[colorName]?.images && <Typography.Text type="danger" >{errors.medias[colorName]?.images?.message}</Typography.Text>}


                </div>
                <div className='flex gap-4'>
                    {/* Handle choose image small */}
                    <div className='flex flex-col gap-2 flex-1'>
                        <Typography.Text >Image small</Typography.Text>
                        <Controller
                            control={control}
                            name={`medias.${colorName}.imageSmall`}
                            rules={{
                                required: {
                                    value: true,
                                    message: `Vui lòng chọn hình ảnh nhỏ cho màu [${colorName}] !`
                                }
                            }}
                            render={({field: {value, onChange}}) => {
                                return (
                                    <div className={cn('border border-dashed p-4 rounded-md', errors.medias?.[colorName]?.imageSmall && 'border-error')}>
                                        <Upload
                                            listType="picture-card"
                                            accept='image/*'
                                            fileList={value}
                                            onPreview={(file) => handlePreviewImages(file, 'imageSmall')}
                                            onChange={(info) => onChange(info.fileList)}
                                        >
                                            <div>
                                                <PlusOutlined rev />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        </Upload>
                                        <Modal open={previewOpen.imageSmall} title={previewTitle.imageSmall} footer={null} onCancel={handleCancel}>
                                            <img alt="" className='w-full' src={previewImage.imageSmall} />
                                        </Modal>
                                    </div>

                                )
                            }}
                        />
                        {errors.medias?.[colorName]?.imageSmall && <Typography.Text type="danger" >{errors.medias[colorName]?.imageSmall?.message}</Typography.Text>}

                    </div>
                    {/* Handle choose image medium */}
                    <div className='flex flex-col gap-2 flex-1'>
                        <Typography.Text >Image medium</Typography.Text>
                        <Controller
                            control={control}
                            name={`medias.${colorName}.imageMedium`}
                            rules={{
                                required: {
                                    value: true,
                                    message: `Vui lòng chọn hình ảnh vừa cho màu [${colorName}] !`
                                }
                            }}
                            render={({field: {value, onChange}}) => <div className={cn('border border-dashed p-4 rounded-md', errors.medias?.[colorName]?.imageMedium && 'border-error')}>
                                <Upload
                                    listType="picture-card"
                                    accept='image/*'
                                    fileList={value}
                                    onPreview={(file) => handlePreviewImages(file, 'imageMedium',)}
                                    onChange={(info) => onChange(info.fileList)}

                                >
                                    <div>
                                        <PlusOutlined rev />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                                <Modal open={previewOpen.imageMedium} title={previewTitle.imageMedium} footer={null} onCancel={handleCancel}>
                                    <img alt="" className='w-full' src={previewImage.imageMedium} />
                                </Modal>
                            </div>}
                        />
                        {errors.medias?.[colorName]?.imageMedium && <Typography.Text type="danger" >{errors.medias[colorName]?.imageMedium?.message}</Typography.Text>}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default FormImage