import { Button, Card, Input, Space, Typography } from 'antd'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { FormCreateProduct } from '../FormProduct'

const FormSize = () => {
    const { control, formState: { errors }, } = useFormContext<FormCreateProduct>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sizes'
    })
    return (
        <Card >
            <Space direction='vertical' className='w-full'>
                <div className='flex justify-between items-end'>
                    <Typography.Text>Kích cỡ</Typography.Text>
                </div>
                {fields.map((field, index) => (
                    <div className='flex flex-col'>
                        <div className='flex gap-4'>
                            <Controller
                                control={control}
                                name={`sizes.${index}.sizeName`}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng nhập màu sắc !',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input size='large' {...field} placeholder='Nhập màu sắc' status={errors.sizes?.[index]?.sizeName && 'error'} />
                                )}
                            />
                            <Button size="large" danger onClick={() => remove(index)}>Delete</Button>
                        </div>
                        {errors.sizes?.[index]?.sizeName && <Typography.Text type="danger">{errors.sizes?.[index]?.sizeName?.message}</Typography.Text>}
                    </div>
                ))}
                <Button type="primary" size="large" onClick={() => append({
                    sizeName: ''
                })}>Add Size</Button>
            </Space>
        </Card>

    )
}

export default FormSize