import { getBase64 } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile, Typography, Upload, Modal, Card } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FormCreateProduct } from '../FormProduct';
import { useAppSelector } from '@/types/commons';
import { selectFormMedias } from '@/store/selectors';
import FormImage from '../components/FormImage';

const defaultPreview = {
    images: false,
    imageSmall: false,
    imageMedium: false
}
type KeyImageProduct = 'images' | 'imageSmall' | 'imageMedium'
const FormMedias = () => {
    const formMedias = useAppSelector(selectFormMedias)
    const { control, formState: { errors }, getValues, watch } = useForm<FormCreateProduct>()
    return (
        <Card>
            <Typography.Text >Medias</Typography.Text>
            <Controller
                control={control}
                name='medias'
                render={() => (
                    <div className='flex flex-col gap-12'>
                        {Object.entries(formMedias).map(([colorName, media]) => {
                            return (
                               <FormImage colorName={colorName} media={media} />
                            )
                        })}
                    </div>
                )}
            />
        </Card>
    )
}

export default FormMedias