import { Button, Input, Typography } from 'antd'
import React, { Fragment } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import FormSize from './FormSize'
import { FormCreateProduct } from '../FormProduct'
import FormImage from './FormImage'

type FormColorProps = {
    indexStoredProduct: number;
}
const FormColor = ({ indexStoredProduct }: FormColorProps) => {
    const { control, formState: { errors } } = useFormContext<FormCreateProduct>()
    const { fields, append } = useFieldArray({
        control,
        name: `storedProducts.${indexStoredProduct}.colors`
    })
    return null
    // return (
    //     // <>
    //     //     {fields.map((field, indexColor) => (
    //     //         <Fragment key={indexColor}>
    //     //             <div className='flex flex-col gap-4'>
    //     //                 <Typography.Text>Màu sản phẩm</Typography.Text>
    //     //                 <Controller
    //     //                     control={control}
    //     //                     name='name'
    //     //                     rules={{
    //     //                         required: {
    //     //                             value: true,
    //     //                             message: 'Vui lòng nhập màu sản phẩm !'
    //     //                         }
    //     //                     }}
    //     //                     render={({ field }) => (
    //     //                         <Input size="large" placeholder="Nhập màu sản phẩm" status={errors.name && 'error'}  {...field} type='danger' />

    //     //                     )}
    //     //                 />
    //     //                 {errors.name && <Typography.Text type='danger'>{errors.name?.message}</Typography.Text>}
    //     //             </div>

    //     //             <FormImage />
    //     //             <FormSize indexColor={indexColor} />
    //     //         </Fragment>
    //     //     ))}
    //     //     <Button type="primary" size="large" onClick={() => append({
    //     //         imageMedium: '',
    //     //         images: [],
    //     //         imageSmall: '',
    //     //         sizes: [{
    //     //             quantity: '',
    //     //             size: ''
    //     //         }]
    //     //     })}>Add Color</Button>

    //     // </>
    // )
}

export default FormColor