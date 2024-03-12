import { Button, Card, Input, Space, Typography } from 'antd'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { FormCreateProduct } from '../FormProduct'
import { PATTERN_NUMBER } from '@/utils'

const FormVariants = () => {
    const { control, formState: { errors }, } = useFormContext<FormCreateProduct>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'colors'
    })
    return (
        <Card >
            <Space direction='vertical' className='w-full'>
                <div className='flex justify-between items-end'>
                    <Typography.Text>Màu sắc</Typography.Text>
                </div>
                {fields.map((field, index) => (
                    <div className='flex flex-col'>
                        <div className='flex gap-4'>
                            <Controller
                                control={control}
                                name={`colors.${index}.colorName`}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng nhập màu sắc !',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input size='large' {...field} placeholder='Nhập màu sắc' status={errors.colors?.[index]?.colorName && 'error'} />
                                )}
                            />
                            <Button size="large" danger onClick={() => remove(index)}>Delete</Button>
                        </div>
                        {errors.colors?.[index]?.colorName && <Typography.Text type="danger">{errors.colors?.[index]?.colorName?.message}</Typography.Text>}
                    </div>
                ))}
                <Button type="primary" size="large" onClick={() => append({
                    colorName: ''
                })}>Add Color</Button>
            </Space>
        </Card>

    )
}

export default FormVariants