import { Button, Card, Input, Select, Space, Typography } from 'antd'
import { Controller, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { FormCreateProduct } from '../FormProduct'
import { usePagination } from '@/hooks/helpers'
import { repositoryService } from '@/services'
import FormImage from '../components/FormImage'
import FormColor from '../components/FormColor'
import { Fragment } from 'react'

const FormVariants = () => {
    const { data } = usePagination('RepositoriesInFormProduct', {
        page: 1,
        limit: 1000,
        offset: 0
    }, repositoryService.getAll)
    const { control, formState: { errors }, } = useFormContext<FormCreateProduct>()
    const { fields, append } = useFieldArray({
        control,
        name: 'storedProducts',
        
    })


    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    return (
        <>
            <Card bordered={false} >
                <Space direction='vertical' className='w-full h-full'>
                    <Typography.Text >Storage</Typography.Text>
                    {fields.map((field, indexStoredProduct) => (
                        <Fragment>
                            <div className='flex flex-col gap-4'>
                                <Typography.Text>Kho lưu trữ</Typography.Text>
                                <Controller
                                    control={control}
                                    name={`storedProducts.${indexStoredProduct}.repository`}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng chọn kho lưu trữ !',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            size="large"
                                            {...field}
                                            status={errors.category && 'error'}
                                            placeholder="Chọn kho lưu trữ"
                                            options={
                                                data
                                                    ? data?.docs.map((repo) => ({
                                                        value: repo._id,
                                                        label: repo.name,
                                                    }))
                                                    : []
                                            }
                                            showSearch
                                            optionFilterProp="children"
                                            onSearch={onSearch}
                                            filterOption={filterOption}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '')
                                                    .toLowerCase()
                                                    .localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                        />
                                    )}
                                />
                                {errors.brand && <Typography.Text type="danger">{errors.brand?.message}</Typography.Text>}
                            </div>
                            <FormColor indexStoredProduct={indexStoredProduct} />
                        </Fragment>
                    ))}


                </Space>
                <Button type="primary" size="large" onClick={() => append({
                    colors: [{
                        imageMedium: '', images: [], imageSmall: '', sizes: [{
                            quantity: '',
                            size: ''
                        }]
                    }],
                    repository: ''
                })}>Add Storage</Button>

            </Card>
        </>

    )
}

export default FormVariants