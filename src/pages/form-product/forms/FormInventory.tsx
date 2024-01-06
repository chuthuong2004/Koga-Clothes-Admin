import { Button, Card, Select, Space, Typography } from 'antd'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { FormCreateProduct } from '../FormProduct'
import { usePagination } from '@/hooks/helpers'
import { repositoryService } from '@/services'

const FormInventory = () => {
    const { data } = usePagination('RepositoriesInFormProduct', {
        page: 1,
        limit: 1000,
        offset: 0
    }, repositoryService.getAll)
    const { control, formState: { errors }, } = useFormContext<FormCreateProduct>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'repositories',

    })


    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    return (
        <Card className='flex-3'>
            <Space direction='vertical' className='w-full'>
                <Typography.Text >Khơ lưu trữ</Typography.Text>
                {fields.map((field, index) => (
                    <div>
                        <div className='flex gap-4'>
                            <Controller
                                control={control}
                                name={`repositories.${index}.repository`}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn kho lưu trữ !',
                                    },
                                }}
                                render={({ field }) => (
                                    <Select
                                    className='flex-1'
                                        size="large"
                                        {...field}
                                        status={errors.repositories?.[index]?.repository && 'error'}
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
                            <Button danger size="large" onClick={() => remove(index)}>Delete</Button>
                        </div>
                        {errors.repositories?.[index]?.repository && <Typography.Text type="danger" className="text-lg">{errors.repositories?.[index]?.repository?.message}</Typography.Text>}
                    </div>

                ))}
                <Button type="primary" size="large" onClick={() => append({
                    repository: ''
                })}>Add Storage</Button>
            </Space>
        </Card>

    )
}

export default FormInventory