import { Button, Input, Typography } from 'antd'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { FormCreateProduct } from '../FormProduct'

type FormSizeProps = {
    indexColor: number
}
const FormSize = ({ indexColor }: FormSizeProps) => {
    const { control } = useFormContext<FormCreateProduct>()
    const { fields, append } = useFieldArray({
        control,
        name: `storedProducts.${indexColor}.colors.${indexColor}.sizes`
    })
    return (
        <div>
            {fields.map((field, index) => {
                return (
                    <div className='flex gap-4' key={index}>
                        <div className='flex-1 gap-2 flex flex-col'>
                            <Typography.Text >Size</Typography.Text>
                            <Controller
                                control={control}
                                name={`storedProducts.${indexColor}.colors.${indexColor}.sizes.${index}.size`}
                                render={({ field }) => (

                                    <Input size="large" placeholder='Size' {...field} />
                                )}
                            />
                        </div>
                        <div className='flex-1 gap-2 flex flex-col'>
                            <Typography.Text >Quantity</Typography.Text>
                            <Controller
                                control={control}
                                name={`storedProducts.${indexColor}.colors.${indexColor}.sizes.${index}.quantity`}
                                render={({ field }) => (

                                    <Input size="large" placeholder='Quantity' {...field} />
                                )}
                            />
                        </div>
                    </div>
                )
            })}

            <Button type='primary' onClick={() => append({
                quantity: '',
                size: ''
            })}>Add Size</Button>
        </div>
    )
}

export default FormSize