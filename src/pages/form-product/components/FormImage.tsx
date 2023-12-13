import { getBase64 } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile, Typography, Upload, Modal } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import React, { useCallback, useState } from 'react'
import { useAppDispatch } from '@/types/commons';
import { setFileChangeMedias } from '@/store/actions';

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
    const dispatch = useAppDispatch()
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
    const [fileList, setFileList] = useState<Record<KeyImageProduct, UploadFile[]>>({
        images: [],
        imageSmall: [],
        imageMedium: []
    })
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

    const handleChange = useCallback(({ fileList: newFileList }: UploadChangeParam<UploadFile<any>>, type_image: KeyImageProduct) =>
        setFileList(prev => ({
            ...prev,
            [type_image]: newFileList
        })), []);


    return (
        <div className='flex flex-col gap-4'>
            <Typography.Text className='flex items-center gap-4'>Chọn hình ảnh cho màu <Typography.Title level={5}>[{colorName}]</Typography.Title></Typography.Text>
            <div className=' border border-dashed p-8 rounded-md flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <Typography.Text >Images</Typography.Text>
                    <div className='border border-dashed p-4 rounded-md'>
                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture-card"
                            multiple
                            accept='image/*'
                            fileList={fileList.images}
                            onPreview={(file) => handlePreviewImages(file, 'images')}
                            onChange={(info) => handleChange(info, 'images')}
                        >
                            {fileList.images.length >= 20 ? null :
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

                </div>
                <div className='flex gap-4'>
                    <div className='flex flex-col gap-2 flex-1'>
                        <Typography.Text >Image small</Typography.Text>
                        <div className='border border-dashed p-4 rounded-md'>
                            <Upload
                                listType="picture-card"
                                accept='image/*'
                                fileList={fileList.imageSmall}
                                onPreview={(file) => handlePreviewImages(file, 'imageSmall')}
                                onChange={(info) => handleChange(info, 'imageSmall')}
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

                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                        <Typography.Text >Image medium</Typography.Text>
                        <div className='border border-dashed p-4 rounded-md'>
                            <Upload
                                listType="picture-card"
                                accept='image/*'
                                fileList={fileList.imageMedium}
                                onPreview={(file) => handlePreviewImages(file, 'imageMedium')}
                                onChange={(info) => handleChange(info, 'imageMedium')}
                            >
                                <div>
                                    <PlusOutlined rev />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                            <Modal open={previewOpen.imageMedium} title={previewTitle.imageMedium} footer={null} onCancel={handleCancel}>
                                <img alt="" className='w-full' src={previewImage.imageMedium} />
                            </Modal>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default FormImage